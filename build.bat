@echo off
echo ========================================
echo    AquaMeter - Mobile App Builder
echo ========================================
echo.

:menu
echo What would you like to do?
echo.
echo 1. Test in Browser (Web Version)
echo 2. Build for Mobile
echo 3. Open Android Studio
echo 4. Open Xcode (Mac only)
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto web
if "%choice%"=="2" goto build
if "%choice%"=="3" goto android
if "%choice%"=="4" goto ios
if "%choice%"=="5" goto end
echo Invalid choice!
goto menu

:web
echo.
echo Starting web server...
echo Open http://localhost:5173 in your browser
echo Press Ctrl+C to stop
npm run dev
goto end

:build
echo.
echo Building production version...
call npm run build
echo.
echo Build complete!
echo.
echo Now syncing to mobile platforms...
call npx cap sync
echo.
echo Done! Your mobile apps are updated.
echo.
pause
goto menu

:android
echo.
echo Opening Android Studio...
call npx cap open android
goto menu

:ios
echo.
echo Opening Xcode...
call npx cap open ios
goto menu

:end
echo.
echo Thank you for using AquaMeter Builder!
pause
