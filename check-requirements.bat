@echo off
echo ========================================
echo   Verification des Prerequis MarketHub
echo ========================================
echo.

echo [1/3] Verification de Node.js...
where node >nul 2>&1
if %errorlevel% == 0 (
    node --version
    echo ✓ Node.js installe
) else (
    echo ✗ Node.js NON installe
    echo   Telechargez depuis: https://nodejs.org/
)
echo.

echo [2/3] Verification de npm...
where npm >nul 2>&1
if %errorlevel% == 0 (
    npm --version
    echo ✓ npm installe
) else (
    echo ✗ npm NON installe
)
echo.

echo [3/3] Verification de Python...
where python >nul 2>&1
if %errorlevel% == 0 (
    python --version
    echo ✓ Python installe
) else (
    echo ✗ Python NON installe
    echo   Telechargez depuis: https://www.python.org/
)
echo.

echo ========================================
echo   Verification des Ports
echo ========================================
echo.

echo Port 4200 (Frontend):
netstat -an | findstr :4200 >nul
if %errorlevel% == 0 (
    echo ✗ OCCUPE - Fermez l'application utilisant ce port
) else (
    echo ✓ DISPONIBLE
)

echo Port 8086 (AI Service):
netstat -an | findstr :8086 >nul
if %errorlevel% == 0 (
    echo ✗ OCCUPE - Fermez l'application utilisant ce port
) else (
    echo ✓ DISPONIBLE
)

echo.
echo ========================================
pause
