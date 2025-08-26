@echo off
echo Starting Drug GENIE Development Servers...
echo.

REM Start backend server in new window
start "Backend Server" cmd /k "cd /d %~dp0backend && npm run dev"

REM Wait 3 seconds for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend server in new window
start "Frontend Server" cmd /k "cd /d %~dp0my-app && npm run dev"

REM Wait 5 seconds then open browser
timeout /t 5 /nobreak > nul
start http://localhost:5173

echo Both servers started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause
