#!/bin/bash
set -euo pipefail

# Configuration
SERVER_PORT=8080
MAX_STARTUP_ATTEMPTS=30
STARTUP_CHECK_INTERVAL=1

# Kill any existing process on port 8080
echo "Checking for existing processes on port $SERVER_PORT..."
lsof -ti:$SERVER_PORT | xargs kill -9 2>/dev/null || true

# Start server in background
echo "Starting server..."
node server.js > server.out 2>&1 &
SERVER_PID=$!
echo "Server started with PID $SERVER_PID"

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
  kill $SERVER_PID 2>/dev/null || true
  wait $SERVER_PID 2>/dev/null || true
  exit 1
fi

echo "Server is ready and responding with HTTP 200!"

# Run performance audit
echo "Running agentic browsing audit..."
npx lighthouse --only-categories=agentic-browsing --output=json --output-path=./lighthouse-agentic.json http://localhost:8080
EXIT_CODE=$?

# Kill server
echo "Stopping server..."
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true

exit $EXIT_CODE
