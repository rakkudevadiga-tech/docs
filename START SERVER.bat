@echo off
title SafeCare Hospital Server
color 0A
echo.
echo  =========================================
echo    SafeCare Hospital Incident Reporting
echo    Web Server Starting...
echo  =========================================
echo.

:: Check if port 8080 is already in use
netstat -an | find ":8080 " | find "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo  [OK] Server already running on port 8080!
    echo.
    echo  Opening browser...
    start http://localhost:8080/index.html
    echo.
    pause
    exit
)

echo  Starting server on http://localhost:8080/
echo  Phones on Wi-Fi use: http://192.168.9.58:8080/
echo.
echo  [Keep this window open while using the system]
echo  [Close this window to stop the server]
echo.

start http://localhost:8080/index.html

powershell -NoProfile -File "%~dp0server.ps1"

pause
