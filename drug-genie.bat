@echo off
title Drug GENIE - All-in-One Manager
color 0A

:MENU
cls
echo.
echo ╔══════════════════════════════════════╗
echo ║        🏥 DRUG GENIE MANAGER 🏥       ║
echo ╚══════════════════════════════════════╝
echo.
echo [1] 🚀 Quick Start (Daily Use)
echo [2] ⚙️  Complete Setup (First Time)
echo [3] 🛑 Stop All Servers
echo [4] 🔧 Install as Windows Service
echo [5] 🗑️  Remove Windows Service
echo [6] 📊 Check Server Status
echo [7] ❌ Exit
echo.
set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" goto QUICK_START
if "%choice%"=="2" goto COMPLETE_SETUP
if "%choice%"=="3" goto STOP_SERVERS
if "%choice%"=="4" goto INSTALL_SERVICE
if "%choice%"=="5" goto REMOVE_SERVICE
if "%choice%"=="6" goto CHECK_STATUS
if "%choice%"=="7" goto EXIT
goto MENU

:QUICK_START
echo 🚀 Starting Drug GENIE servers...
taskkill /f /im node.exe >nul 2>&1
npm run dev
goto MENU

:COMPLETE_SETUP
echo ⚙️ Running complete setup...
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found! Please install Node.js first.
    pause
    goto MENU
)

echo Installing root dependencies...
npm install

echo Installing backend dependencies...
cd backend
npm install
cd ..

echo Installing frontend dependencies...
cd my-app
npm install
cd ..

echo 🚀 Starting servers...
npm run dev
goto MENU

:STOP_SERVERS
echo 🛑 Stopping all servers...
taskkill /f /im node.exe >nul 2>&1
echo ✅ All servers stopped!
pause
goto MENU

:INSTALL_SERVICE
echo 🔧 Installing Drug GENIE as Windows service...

REM Create daemon script
echo @echo off > drug-genie-service.bat
echo cd /d "%~dp0" >> drug-genie-service.bat
echo taskkill /f /im node.exe ^>nul 2^>^&1 >> drug-genie-service.bat
echo npm run dev ^> service.log 2^>^&1 >> drug-genie-service.bat

REM Register scheduled task
schtasks /create /tn "Drug_GENIE_AutoStart" /tr "%~dp0drug-genie-service.bat" /sc onstart /ru "%USERNAME%" /f >nul 2>&1

REM Create desktop shortcut
echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = "%USERPROFILE%\Desktop\Drug GENIE.lnk" >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "http://localhost:5173" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs
cscript CreateShortcut.vbs >nul 2>&1
del CreateShortcut.vbs >nul 2>&1

echo ✅ Service installed! Will auto-start on Windows boot
echo ✅ Desktop shortcut created
pause
goto MENU

:REMOVE_SERVICE
echo 🗑️ Removing Drug GENIE service...
schtasks /delete /tn "Drug_GENIE_AutoStart" /f >nul 2>&1
del drug-genie-service.bat >nul 2>&1
del service.log >nul 2>&1
echo ✅ Service removed!
pause
goto MENU

:CHECK_STATUS
echo 📊 Checking server status...
echo.
netstat -ano | findstr :5000 >nul 2>&1
if errorlevel 1 (
    echo ❌ Backend (Port 5000): Not Running
) else (
    echo ✅ Backend (Port 5000): Running
)

netstat -ano | findstr :5173 >nul 2>&1
if errorlevel 1 (
    echo ❌ Frontend (Port 5173): Not Running
) else (
    echo ✅ Frontend (Port 5173): Running
)
echo.
pause
goto MENU

:EXIT
echo 👋 Goodbye!
exit
