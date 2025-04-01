#!/bin/bash

# Navigate to your project directory
cd "$(dirname "$0")/Web-FPGA" || {
	echo "❌ Failed to navigate to project directory."
	read -p "Press [Enter] to exit."
	exit 1
}

echo "========================================"
echo "🟢 Installing dependencies..."
echo "========================================"

# Open npm install in a new terminal window
gnome-terminal -- bash -c "npm install && echo '✅ npm install done.' || echo '❌ npm install failed.'; bash"

# Wait for install to complete
sleep 5

echo "========================================"
echo "✅ Starting Web-FPGA simulation server..."
echo "========================================"

# Open npm run dev in another new terminal window
gnome-terminal -- bash -c "npm run dev || echo '❌ npm run dev failed.'; bash"

# Wait a few seconds to let server start
sleep 5

echo "========================================"
echo "🌐 Server should be available at:"
echo "http://localhost:5173"
echo "========================================"

open "http://localhost:5173"

# Keep the main window open
read -p "✅ Press [Enter] to close this window."