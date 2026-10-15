#!/bin/bash
# Start server in background
node server.js < /dev/null > server.out 2>&1 &
SERVER_PID=$!
# Wait for server to start
sleep 2
# Check if server is up
if ! curl -s http://localhost:8080/ >/dev/null; then
  echo "Server failed to start"
  kill $SERVER_PID
  exit 1
fi
# Run e2e tests
npm run test:e2e
# Kill the server
kill $SERVER_PID
