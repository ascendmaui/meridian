#!/bin/bash
# Start server in background
node server.js > server.out 2>&1 &
SERVER_PID=$!

# Function to check if server is ready
check_server() {
  curl -s http://localhost:8080/ > /dev/null 2>&1
}

# Wait for server to start with timeout
TIMEOUT=30
ELAPSED=0
while [ $ELAPSED -lt $TIMEOUT ]; do
  if check_server; then
    echo "Server is ready"
    break
  fi
  echo "Waiting for server to start..."
  sleep 2
  ELAPSED=$((ELAPSED + 2))
done

if [ $ELAPSED -ge $TIMEOUT ]; then
  echo "Server failed to start within $TIMEOUT seconds"
  kill $SERVER_PID 2>/dev/null || true
  exit 1
fi

# Run performance audit
npm run audit:performance
EXIT_CODE=$?

# Kill the server
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true

exit $EXIT_CODE
