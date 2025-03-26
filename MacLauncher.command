cd "$(dirname "$0")..\2024-2025-project-4-web-fpga-team-3\Web-FPGA"	
echo ❌ Error Cannot navigate to the project directory.
	exit 1

echo ========================================
echo 🟢 Installing dependencies...
echo ========================================

# Install dependencies
npm install
if [ $ -ne 0 ]; then
	echo ❌ Error during npm install!
	read -p Press Enter to exit.
	exit 1
else
	echo ✅ Dependencies installed successfully.
fi

echo ========================================
echo ✅ Starting Web-FPGA simulation...
echo ========================================

# Start npm dev server in the background
npm run dev &
NPM_PID=$!

# Give some time for the server to start
sleep 5

echo ========================================
echo 🌐 Server should be available at
echo httplocalhost5173
echo ========================================
echo Press Ctrl+C to stop the server.

# Wait for the npm run dev process
wait $NPM_PID