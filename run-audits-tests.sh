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
node server.js &
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
  if [ -f server.log ]; then
    tail -10 server.log
  fi
  kill $SERVER_PID 2>/dev/null || true
  wait $SERVER_PID 2>/dev/null || true
  exit 1
fi

echo "Server is ready and responding with HTTP 200!"

# Run audits
echo "Running performance audit..."
npm run audit:performance
echo "Running accessibility audit..."
npm run audit:accessibility
echo "Running security audit..."
npm run audit:security
echo "Running content audit..."
npm run audit:content
echo "Running compatibility audit..."
npm run audit:compatibility

# Run tests
echo "Running tests..."
npm test

# Kill server
echo "Stopping server..."
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true
echo "Done."
