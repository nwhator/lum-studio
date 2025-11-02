# LUM Studios Booking System Migration Guide

This guide explains the migration from SQLite to Supabase for the booking system.

## What's New

### ✅ Improvements

- **Cloud Database**: Supabase (PostgreSQL) instead of SQLite - works perfectly on Netlify
- **Admin Authentication**: Secure login with Supabase Auth
- **Email Notifications**: Automated emails to admin and customers
- **Real-time Slot Management**: Proper conflict detection and slot availability
- **Better Admin Dashboard**: Modern UI with filters, statistics, and bulk actions
- **Production Ready**: Serverless-friendly, no file system dependencies

### 📁 New Files Created

#### Core Libraries

- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/email.ts` - Email notification service with Nodemailer

#### API Routes

- `src/app/api/bookings/create/route.ts` - Create new bookings
- `src/app/api/bookings/list/route.ts` - List all bookings (admin)
- `src/app/api/bookings/update/route.ts` - Update booking status/payment
- `src/app/api/slots/available/route.ts` - Get available time slots
- `src/app/api/admin/login/route.ts` - Admin authentication

#### Admin Pages

- `src/app/admin/login/new-page.tsx` - New admin login page
- `src/app/admin/dashboard/page.tsx` - New admin dashboard

#### Documentation

- `SUPABASE_SETUP.md` - Complete setup instructions
- `.env.local.example` - Environment variables template

### 🗑️ Files to Remove (Old SQLite System)

After confirming the new system works, you can safely delete:

```bash
# Old database files
rm -rf db/

# Old database code
rm src/db/database.ts

# Old API route (replaced by new modular routes)
rm src/app/api/bookings/route.ts
rm src/app/api/bookings/[id]/route.ts

# Old admin pages (replaced by new ones)
rm src/app/admin/page.tsx
rm src/app/admin/bookings/page.tsx
rm src/app/admin/login/page.tsx  # After renaming new-page.tsx to page.tsx
```

## Setup Steps

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
```

Remove old dependencies:

```bash
npm uninstall better-sqlite3 mongodb
```

### 2. Set Up Supabase

Follow the detailed instructions in `SUPABASE_SETUP.md`:

1. Create Supabase account and project
2. Run SQL to create bookings table
3. Set up Row Level Security (RLS)
4. Create admin user
5. Get API keys

### 3. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SMTP_EMAIL=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
WA_PHONE=2348145538164
```

### 4. Update Booking Page

The booking page (`src/app/booking/page.tsx`) needs to be updated to use the new API:

**Old API call:**

```javascript
const response = await fetch('/api/bookings', { ... });
```

**New API call:**

```javascript
const response = await fetch('/api/bookings/create', { ... });
```

I can update this file for you if needed.

### 5. Rename New Admin Pages

After testing the new admin pages:

```bash
# Replace old login page with new one
rm src/app/admin/login/page.tsx
mv src/app/admin/login/new-page.tsx src/app/admin/login/page.tsx
```

### 6. Test Locally

```bash
npm run dev
```

Test these features:

- [ ] Create a booking at `/booking`
- [ ] Check email notifications
- [ ] Login at `/admin/login`
- [ ] View bookings in dashboard
- [ ] Update booking status
- [ ] Toggle payment confirmation
- [ ] Check slot availability

### 7. Deploy to Netlify

1. Push code to GitHub
2. In Netlify dashboard, add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SMTP_EMAIL`
   - `SMTP_PASS`
   - `WA_PHONE`
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_STUDIO_NAME`

3. Deploy!

## API Reference

### Public Endpoints

#### Create Booking

```md
POST /api/bookings/create

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "08012345678",
  "service": "Portrait Session",
  "date": "2025-11-15",
  "time": "10:00 AM",
  "notes": "Optional notes",
  "packageInfo": { ... },
  "payment": {
    "accountName": "John Doe",
    "bankName": "Example Bank",
    "transactionId": "TXN123"
  }
}

Response:
{
  "success": true,
  "booking": { ... },
  "waLink": "https://wa.me/..."
}
```

#### Get Available Slots

```md
GET /api/slots/available?date=2025-11-15

Response:
{
  "success": true,
  "availableSlots": ["09:00 AM", "10:00 AM", ...],
  "bookedSlots": ["02:00 PM", ...]
}
```

### Admin Endpoints

#### Login

```md
POST /api/admin/login

Body:
{
  "email": "admin@lumstudios.com",
  "password": "your-password"
}

Response:
{
  "success": true,
  "token": "...",
  "user": { ... }
}
```

#### List Bookings

```md
GET /api/bookings/list?status=pending

Response:
{
  "success": true,
  "bookings": [ ... ]
}
```

#### Update Booking

```md
PATCH /api/bookings/update

Body:
{
  "id": "booking-id",
  "status": "confirmed",
  "payment_confirmed": true
}

Response:
{
  "success": true,
  "booking": { ... }
}
```

## Troubleshooting

### Common Issues

1."Missing Supabase environment variables"

- Check `.env.local` file exists
- Verify all Supabase keys are set
- Restart dev server after changing env vars

2.Emails not sending

- Use Gmail App Password, not regular password
- Enable 2FA on Gmail account
- Check SMTP_EMAIL and SMTP_PASS are correct

3.Can't login to admin**

- Verify admin user exists in Supabase Auth
- Check credentials match
- Clear browser localStorage and try again

4.Slots showing as available when booked

- Check booking status is 'confirmed' or 'pending'
- Verify date format is YYYY-MM-DD
- Check Supabase table has data

5.Netlify build fails

- Ensure all environment variables are set in Netlify
- Check package.json has correct dependencies
- Verify no references to old SQLite code remain

## Data Migration

If you have existing bookings in SQLite, see `SUPABASE_SETUP.md` for migration script.

## Support

For issues:

1. Check browser console for errors
2. Check Supabase logs
3. Verify all environment variables
4. Check API responses in Network tab

## Next Steps

After successful migration:

- [ ] Remove old SQLite files
- [ ] Update booking page to use new API
- [ ] Test all features thoroughly
- [ ] Deploy to production
- [ ] Monitor email delivery
- [ ] Train admin users on new dashboard
