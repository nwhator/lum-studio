# Supabase Setup Instructions

This document explains how to set up Supabase for the LUM Studios booking system.

## 1. Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project

## 2. Create the Bookings Table

Run this SQL in the Supabase SQL Editor:

```sql
-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  payment_confirmed BOOLEAN DEFAULT false,
  notes TEXT,
  package_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

## 3. Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert bookings (for public booking form)
CREATE POLICY "Anyone can create bookings" 
ON bookings FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Policy: Anyone can read bookings (for checking available slots)
CREATE POLICY "Anyone can read bookings" 
ON bookings FOR SELECT 
TO anon, authenticated 
USING (true);

-- Policy: Only authenticated users can update bookings
CREATE POLICY "Authenticated users can update bookings" 
ON bookings FOR UPDATE 
TO authenticated 
USING (true);

-- Policy: Only authenticated users can delete bookings
CREATE POLICY "Authenticated users can delete bookings" 
ON bookings FOR DELETE 
TO authenticated 
USING (true);
```

## 4. Create Admin User

In Supabase Authentication:

1. Go to Authentication → Users
2. Click "Add user"
3. Create admin user with email and password
4. Save the credentials securely

## 5. Get Your API Keys

From Supabase Project Settings → API:

1. **Project URL**: `https://xxxxx.supabase.co`
2. **Anon Public Key**: `eyJhbGc...` (safe for client-side)
3. **Service Role Key**: `eyJhbGc...` (keep secret, server-side only)

## 6. Configure Environment Variables

Add these to your `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email (Gmail SMTP)
SMTP_EMAIL=your-email@gmail.com
SMTP_PASS=your-app-password

# WhatsApp
WA_PHONE=2348145538164

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://thelumstudios.com
NEXT_PUBLIC_STUDIO_NAME=LUM Studios
```

## 7. Gmail App Password Setup

To use Gmail SMTP:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security → App Passwords
4. Generate an app password for "Mail"
5. Use this password in `SMTP_PASS` (not your regular Gmail password)

## 8. Deploy to Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Add all environment variables in Netlify dashboard under Site settings → Environment variables
4. Deploy!

## 9. Test the System

1. Visit `/booking` to test booking creation
2. Check emails are sent
3. Visit `/admin/login` to access admin dashboard
4. Test booking management features

## Troubleshooting

### Emails Not Sending

- Verify SMTP credentials
- Ensure Gmail App Password is used (not regular password)
- Check Gmail account has 2FA enabled

### Authentication Fails

- Verify Supabase keys are correct
- Check admin user exists in Supabase Auth
- Ensure RLS policies are applied

### Bookings Not Saving

- Check Supabase table exists
- Verify API keys in environment variables
- Check browser console for errors

## Optional: Migrate Existing SQLite Data

If you have existing bookings in SQLite, you can migrate them:

```javascript
// Run this script once to migrate data
const Database = require('better-sqlite3');
const { createClient } = require('@supabase/supabase-js');

const db = new Database('./db/bookings.sqlite');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const rows = db.prepare('SELECT * FROM bookings').all();

for (const row of rows) {
  await supabase.from('bookings').insert({
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.package,
    date: row.date,
    time: row.time_slots ? JSON.parse(row.time_slots)[0] : '',
    status: row.status === 'paid' ? 'confirmed' : 'pending',
    payment_confirmed: row.status === 'paid',
    notes: row.notes,
    created_at: row.created_at,
  });
}
```

## Next Steps

- Customize email templates in `src/lib/email.ts`
- Adjust time slots in `src/app/api/slots/available/route.ts`
- Add more admin features as needed
