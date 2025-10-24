@echo off
echo Starting MarketHub - All Services
echo ================================

echo.
echo 1. Starting AI Service (FastAPI)...
start "AI Service" cmd /k "cd ai-service && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8086 --host 0.0.0.0"

echo.
echo 2. Waiting 5 seconds for AI service to start...
timeout /t 5 /nobreak > nul

echo.
echo 3. Starting Frontend (Angular)...
start "Frontend" cmd /k "cd frontend\webapp-ng && npm install && npm start"

echo.
echo 4. Services starting...
echo - AI Service: http://localhost:8086
echo - Frontend: http://localhost:4200
echo - AI Health: http://localhost:8086/ai/health
echo.
echo Note: Backend services (catalog-service) need to be started separately
echo or use Docker Compose for full stack deployment.
echo.
pause
