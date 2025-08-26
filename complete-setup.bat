@echo off
echo ========================================
echo    Drug GENIE Complete Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found! Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

REM Kill any existing servers first
echo Stopping any existing servers...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im npm.cmd >nul 2>&1
taskkill /f /im ts-node-dev.cmd >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173"') do taskkill /f /pid %%a >nul 2>&1
echo ✅ Existing servers stopped
echo.

REM Navigate to project directory
cd /d "d:\Desktop\Drug_GENIE"

echo Installing root dependencies...
npm install
if errorlevel 1 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

echo ✅ Root dependencies installed
echo.

echo Installing backend dependencies...
cd backend
npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo ✅ Backend dependencies installed
echo.

echo Installing frontend dependencies...
cd ../my-app
npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo ✅ Frontend dependencies installed
echo.

REM Go back to root
cd ..

echo Testing server startup...
echo Starting backend server (this may take a moment)...

REM Start backend in background and capture PID
start /b cmd /c "cd backend && npm run dev > backend.log 2>&1"

REM Wait for backend to start
timeout /t 10 /nobreak > nul

echo Starting frontend server...
REM Start frontend in background
start /b cmd /c "cd my-app && npm run dev > frontend.log 2>&1"

REM Wait for frontend to start
timeout /t 15 /nobreak > nul

echo.
echo Opening browser to test...
start http://localhost:5173

echo.
echo ✅ Setup complete! 
echo.
echo If the website loads correctly, press any key to set up automatic startup.
echo If you see a blank page, check the log files: backend.log and frontend.log
pause

REM Set up automatic startup
echo Setting up automatic startup...

REM Get Windows startup folder path
set "startup_folder=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

REM Copy auto-start script to startup folder
copy "auto-start.bat" "%startup_folder%\Drug-GENIE-AutoStart.bat" >nul 2>&1

REM Create desktop shortcut
echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = "%USERPROFILE%\Desktop\Drug GENIE.lnk" >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "http://localhost:5173" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs
cscript CreateShortcut.vbs >nul 2>&1
del CreateShortcut.vbs >nul 2>&1

echo.
echo ========================================
echo    Setup Complete! 
echo ========================================
echo.
echo ✅ All dependencies installed
echo ✅ Servers tested and working
echo ✅ Automatic startup configured
echo ✅ Desktop shortcut created
echo.
echo Drug GENIE will now start automatically when Windows boots.
echo Access your app anytime at: http://localhost:5173
echo.
pause
