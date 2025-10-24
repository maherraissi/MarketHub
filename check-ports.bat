@echo off
echo Checking available ports for MarketHub services...
echo.

echo Checking port 4200 (Angular):
netstat -an | findstr :4200
if %errorlevel% == 0 (
    echo Port 4200 is in use
) else (
    echo Port 4200 is available
)

echo.
echo Checking port 8081 (Catalog Service):
netstat -an | findstr :8081
if %errorlevel% == 0 (
    echo Port 8081 is in use
) else (
    echo Port 8081 is available
)

echo.
echo Checking port 8086 (AI Service):
netstat -an | findstr :8086
if %errorlevel% == 0 (
    echo Port 8086 is in use
) else (
    echo Port 8086 is available
)

echo.
echo Checking port 8087 (AI Service Alternative):
netstat -an | findstr :8087
if %errorlevel% == 0 (
    echo Port 8087 is in use
) else (
    echo Port 8087 is available
)

echo.
echo If ports are in use, you can:
echo 1. Stop the services using those ports
echo 2. Use alternative ports
echo 3. Use Docker Compose for isolated environments
echo.
pause
