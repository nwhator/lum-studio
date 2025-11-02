@echo off
REM Cleanup Script for Old Booking System (Windows)
REM This removes SQLite-based files after Supabase migration is confirmed working

echo.
echo 🧹 LUM Studios - Cleanup Old Booking System
echo ============================================
echo.
echo ⚠️  WARNING: This will permanently delete old SQLite booking files.
echo Make sure the new Supabase system is working before proceeding.
echo.
set /p confirm="Have you tested the new system? (yes/no): "

if /i not "%confirm%"=="yes" (
  echo ❌ Cleanup cancelled. Test the new system first!
  exit /b 1
)

echo.
echo Starting cleanup...

REM Remove SQLite database directory
if exist "db" (
  echo 🗑️  Removing db\ directory...
  rmdir /s /q "db"
  echo ✓ Removed db\
)

REM Remove old database code
if exist "src\db\database.ts" (
  echo 🗑️  Removing src\db\database.ts...
  del "src\db\database.ts"
  echo ✓ Removed src\db\database.ts
  
  REM Remove empty directory if it exists
  if exist "src\db" (
    rmdir "src\db" 2>nul
    if not exist "src\db" echo ✓ Removed empty src\db\ directory
  )
)

REM Remove old API routes
if exist "src\app\api\bookings\route.ts" (
  echo 🗑️  Removing old src\app\api\bookings\route.ts...
  del "src\app\api\bookings\route.ts"
  echo ✓ Removed old booking route
)

if exist "src\app\api\bookings\[id]" (
  echo 🗑️  Removing src\app\api\bookings\[id]\...
  rmdir /s /q "src\app\api\bookings\[id]"
  echo ✓ Removed old [id] route
)

REM Remove old admin pages
if exist "src\app\admin\page.tsx" (
  echo 🗑️  Removing old src\app\admin\page.tsx...
  del "src\app\admin\page.tsx"
  echo ✓ Removed old admin page
)

if exist "src\app\admin\bookings" (
  echo 🗑️  Removing old src\app\admin\bookings\...
  rmdir /s /q "src\app\admin\bookings"
  echo ✓ Removed old admin bookings page
)

REM Rename new admin login page
if exist "src\app\admin\login\new-page.tsx" (
  echo 📝 Activating new admin login page...
  if exist "src\app\admin\login\page.tsx" del "src\app\admin\login\page.tsx"
  ren "src\app\admin\login\new-page.tsx" "page.tsx"
  echo ✓ Activated new login page
)

REM Remove lib/mongodb.ts if it exists
if exist "src\lib\mongodb.ts" (
  echo 🗑️  Removing src\lib\mongodb.ts...
  del "src\lib\mongodb.ts"
  echo ✓ Removed MongoDB connection file
)

echo.
echo ✅ Cleanup complete!
echo.
echo Next steps:
echo 1. Run: npm install
echo 2. Run: npm uninstall better-sqlite3 mongodb
echo 3. Test the application: npm run dev
echo 4. Commit changes to git
echo.
pause
