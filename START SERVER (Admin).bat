@echo off
:: Auto-elevate to Administrator (needed for LAN IP binding on port 8080)
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting Administrator access for LAN network binding...
    powershell -Command "Start-Process cmd -ArgumentList '/c \"%~f0\"' -Verb RunAs"
    exit /b
)

title SafeCare Hospital Server [ADMIN]
color 0A
echo.
echo  =========================================
echo    SafeCare Hospital Incident Reporting
echo    Web Server  [Running as Administrator]
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

echo  Starting server...
echo  Local PC:   http://localhost:8080/index.html
echo  Phones/QR:  http://192.168.9.58:8080/index.html
echo.
echo  [Keep this window OPEN while using the system]
echo  [Close this window to stop the server]
echo.

:: Open browser after 2 seconds
timeout /t 2 /nobreak >nul
start http://localhost:8080/index.html

powershell -NoProfile -File "%~dp0server.ps1"

pause
