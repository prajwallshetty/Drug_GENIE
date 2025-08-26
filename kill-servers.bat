@echo off
echo Stopping all Drug GENIE servers...

REM Kill all Node.js processes
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im npm.cmd >nul 2>&1
taskkill /f /im ts-node-dev.cmd >nul 2>&1

REM Kill processes using ports 5000 and 5173
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173"') do taskkill /f /pid %%a >nul 2>&1

echo ✅ All servers stopped
echo Ports 5000 and 5173 are now free
pause
