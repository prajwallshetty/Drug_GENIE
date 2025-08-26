@echo off
echo Setting up Drug GENIE for automatic startup...

REM Get Windows startup folder path
set "startup_folder=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

REM Copy auto-start script to startup folder
copy "auto-start.bat" "%startup_folder%\Drug-GENIE-AutoStart.bat"

REM Create desktop shortcut
echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = "%USERPROFILE%\Desktop\Drug GENIE.lnk" >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "http://localhost:5173" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs
cscript CreateShortcut.vbs
del CreateShortcut.vbs

echo.
echo ✅ Setup Complete!
echo.
echo Drug GENIE will now:
echo   • Start automatically when Windows boots
echo   • Run servers in background (minimized)
echo   • Be accessible at http://localhost:5173
echo.
echo Desktop shortcut created for easy access.
echo.
echo Restart your computer to test automatic startup.
pause
