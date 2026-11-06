@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Necesitas instalar Node.js para abrir la vista local.
  pause
  exit /b 1
)
node vista-local.cjs
pause
