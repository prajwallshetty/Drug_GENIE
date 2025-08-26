@echo off
REM Auto-start Drug GENIE servers on Windows boot
cd /d "d:\Desktop\Drug_GENIE"

REM Start backend server minimized
start /min "Drug GENIE Backend" cmd /c "cd backend && npm run dev"

REM Wait 5 seconds for backend to initialize
timeout /t 5 /nobreak > nul

REM Start frontend server minimized
start /min "Drug GENIE Frontend" cmd /c "cd my-app && npm run dev"

REM Create a log file to confirm startup
echo %date% %time% - Drug GENIE servers started automatically >> startup.log

exit
