#!/bin/bash
set -euo pipefail

# Configuration
SERVER_PORT=8080
MAX_STARTUP_ATTEMPTS=30
STARTUP_CHECK_INTERVAL=1
MAX_AUDIT_RETRIES=3

# Kill any existing process on port 8080
echo "Checking for existing processes on port $SERVER_PORT..."
lsof -ti:$SERVER_PORT | xargs kill -9 2>/dev/null || true

# Start server in background
echo "Starting server..."
node server.js > server.out 2>&1 &
SERVER_PID=$!
echo "Server started with PID $SERVER_PID"

cleanup() {
  if [ -n "${SERVER_PID:-}" ]; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
    SERVER_PID=""
  fi
}
trap cleanup EXIT

# Wait for server to be ready
echo "Waiting for server to be ready on port $SERVER_PORT..."
ATTEMPT=0
SERVER_READY=false

while [ $ATTEMPT -lt $MAX_STARTUP_ATTEMPTS ]; do
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$SERVER_PORT/ || echo "000")
  if [ "$HTTP_CODE" = "200" ]; then
    SERVER_READY=true
    break
  fi
  ATTEMPT=$((ATTEMPT + 1))
  echo "Attempt $ATTEMPT/$MAX_STARTUP_ATTEMPTS: Server not ready yet (HTTP $HTTP_CODE)..."
  sleep $STARTUP_CHECK_INTERVAL
done

if [ "$SERVER_READY" = false ]; then
  echo "Error: Server failed to start after $MAX_STARTUP_ATTEMPTS attempts"
  echo "Checking server logs:"
  if [ -f server.out ]; then
    tail -10 server.out
  fi
  exit 1
fi

echo "Server is ready and responding with HTTP 200!"

# Run performance audit with retries for interstitial errors
echo "Running performance audit..."
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_AUDIT_RETRIES ]; do
  echo "Running performance audit (attempt $((RETRY_COUNT+1))/$MAX_AUDIT_RETRIES)..."
  # Command substitutions fail the script immediately under `set -e`, which
  # drops Lighthouse's stderr before it can be printed or retried.
  set +e
  OUTPUT=$(npm run audit:performance 2>&1)
  EXIT_CODE=$?
  set -e
  echo "$OUTPUT"
  if [ $EXIT_CODE -eq 0 ]; then
    echo "Performance audit passed."
    break
  else
    if echo "$OUTPUT" | grep -q "Chrome prevented page load with an interstitial"; then
      echo "Interstitial error detected. Retrying..."
      RETRY_COUNT=$((RETRY_COUNT+1))
      if [ $RETRY_COUNT -lt $MAX_AUDIT_RETRIES ]; then
        echo "Waiting before retry..."
        sleep 2
      fi
      continue
    else
      echo "Performance audit failed with non-interstitial error."
      break
    fi
  fi
done

if [ "$EXIT_CODE" -ne 0 ]; then
  echo "Performance audit failed."
  exit "$EXIT_CODE"
fi

exit "$EXIT_CODE"
