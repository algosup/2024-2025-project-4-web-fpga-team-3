@echo off
cd /d "./Web-FPGA"

echo ========================================
echo  🟢 Installing dependencies...
echo ========================================
REM Open npm install in a separate window and keep it open
start cmd /k "npm install && echo Dependencies installed successfully. || echo Error during npm install! "

REM Wait before starting the dev server
timeout /t 3 >nul

echo ✅ Starting Web-FPGA simulation...
REM Open npm run dev in a separate window and keep it open
start cmd /k "npm run dev || (echo Error during npm run dev)"

REM Display server info directly
timeout /t 5 >nul
echo ========================================
echo 🌐 Server should be available at:
echo 	    http://localhost:5173
echo ========================================
start "" http://localhost:5173
pause
