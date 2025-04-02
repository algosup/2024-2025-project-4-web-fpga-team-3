#!/bin/bash

echo "========================================"
echo ":large_green_circle: Installing dependencies..."
echo "========================================"
# Install dependencies
npm install
if [ $? -ne 0 ]; then
  echo ":x: Error during npm install!"
  read -p "Press Enter to exit."
  exit 1
else
  echo ":white_check_mark: Dependencies installed successfully."
fi
echo "========================================"
echo ":white_check_mark: Starting Web-FPGA simulation..."
echo "========================================"
# Start npm dev server in the background
npm run dev &
NPM_PID=$!
# Give some time for the server to start
sleep 5
echo "========================================"
echo ":globe_with_meridians: Server should be available at"
echo "http://localhost:5173"
echo "========================================"
open "http://localhost:5173"
echo "Press Ctrl+C to stop the server."
# Wait for the npm run dev process
wait $NPM_PID