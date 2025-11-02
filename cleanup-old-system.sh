#!/bin/bash

# Cleanup Script for Old Booking System
# This removes SQLite-based files after Supabase migration is confirmed working

echo "🧹 LUM Studios - Cleanup Old Booking System"
echo "============================================"
echo ""
echo "⚠️  WARNING: This will permanently delete old SQLite booking files."
echo "Make sure the new Supabase system is working before proceeding."
echo ""
read -p "Have you tested the new system? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Cleanup cancelled. Test the new system first!"
  exit 1
fi

echo ""
echo "Starting cleanup..."

# Remove SQLite database directory
if [ -d "db" ]; then
  echo "🗑️  Removing db/ directory..."
  rm -rf db/
  echo "✓ Removed db/"
fi

# Remove old database code
if [ -f "src/db/database.ts" ]; then
  echo "🗑️  Removing src/db/database.ts..."
  rm src/db/database.ts
  echo "✓ Removed src/db/database.ts"
  
  # Remove empty directory if it exists
  if [ -d "src/db" ] && [ -z "$(ls -A src/db)" ]; then
    rmdir src/db
    echo "✓ Removed empty src/db/ directory"
  fi
fi

# Remove old API routes
if [ -f "src/app/api/bookings/route.ts" ]; then
  echo "🗑️  Removing old src/app/api/bookings/route.ts..."
  rm src/app/api/bookings/route.ts
  echo "✓ Removed old booking route"
fi

if [ -f "src/app/api/bookings/[id]/route.ts" ]; then
  echo "🗑️  Removing src/app/api/bookings/[id]/route.ts..."
  rm -rf src/app/api/bookings/[id]
  echo "✓ Removed old [id] route"
fi

# Remove old admin pages
if [ -f "src/app/admin/page.tsx" ]; then
  echo "🗑️  Removing old src/app/admin/page.tsx..."
  rm src/app/admin/page.tsx
  echo "✓ Removed old admin page"
fi

if [ -f "src/app/admin/bookings/page.tsx" ]; then
  echo "🗑️  Removing old src/app/admin/bookings/page.tsx..."
  rm -rf src/app/admin/bookings
  echo "✓ Removed old admin bookings page"
fi

# Rename new admin login page
if [ -f "src/app/admin/login/new-page.tsx" ]; then
  echo "📝 Activating new admin login page..."
  if [ -f "src/app/admin/login/page.tsx" ]; then
    rm src/app/admin/login/page.tsx
  fi
  mv src/app/admin/login/new-page.tsx src/app/admin/login/page.tsx
  echo "✓ Activated new login page"
fi

# Remove lib/mongodb.ts if it exists
if [ -f "src/lib/mongodb.ts" ]; then
  echo "🗑️  Removing src/lib/mongodb.ts..."
  rm src/lib/mongodb.ts
  echo "✓ Removed MongoDB connection file"
fi

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Run: npm install"
echo "2. Run: npm uninstall better-sqlite3 mongodb"
echo "3. Test the application: npm run dev"
echo "4. Commit changes to git"
echo ""
