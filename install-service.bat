@echo off
echo Installing Drug GENIE as Windows Service...

REM Install PM2 globally
npm install -g pm2
npm install -g pm2-windows-startup

REM Navigate to project directory
cd /d "d:\Desktop\Drug_GENIE"

REM Install PM2 Windows service
pm2-startup install

REM Start backend with PM2
cd backend
pm2 start npm --name "drug-genie-backend" -- run dev

REM Start frontend with PM2
cd ../my-app
pm2 start npm --name "drug-genie-frontend" -- run dev

REM Save PM2 configuration
pm2 save

echo.
echo Drug GENIE installed as Windows service!
echo Servers will now start automatically on boot.
echo.
echo To manage services:
echo   pm2 list        - View running services
echo   pm2 stop all    - Stop all services
echo   pm2 restart all - Restart all services
echo   pm2 delete all  - Remove all services
echo.
pause
