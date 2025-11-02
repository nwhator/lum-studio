# Quick Start Guide - Supabase Booking System

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install @supabase/supabase-js
```

### Step 2: Set Up Supabase

1. **Create Account**: Go to [supabase.com](https://supabase.com) and create a free account
2. **Create Project**: Click "New Project" and choose a name
3. **Run SQL**: In Supabase SQL Editor, paste this:

```sql
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

CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can create" ON bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public can read" ON bookings FOR SELECT TO anon USING (true);
CREATE POLICY "Auth can update" ON bookings FOR UPDATE TO authenticated USING (true);
```

1. **Create Admin User**:
   - Go to Authentication → Users
   - Click "Add user"
   - Email: <your-email@example.com>
   - Password: your-secure-password

2. **Get API Keys**:
   - Go to Project Settings → API
   - Copy "Project URL" and "anon public" key

### Step 3: Configure Environment

Create `.env.local` in your project root:

```env
# Supabase (from step 2)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUz...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUz...

# Gmail SMTP
SMTP_EMAIL=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional
WA_PHONE=2348145538164
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_STUDIO_NAME=LUM Studios
```

### Step 4: Get Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Generate password for "Mail"
5. Copy the 16-character password to `SMTP_PASS`

### Step 5: Test Locally

```bash
npm run dev
```

Visit:

- <http://localhost:3000/booking> - Test creating a booking
- <http://localhost:3000/admin/login> - Login with your Supabase admin credentials
- <http://localhost:3000/admin/dashboard> - View and manage bookings

### Step 6: Clean Up Old System (AFTER TESTING!)

**Windows:**

```bash
cleanup-old-system.bat
```

**Mac/Linux:**

```bash
chmod +x cleanup-old-system.sh
./cleanup-old-system.sh
```

Or manually:

```bash
npm uninstall better-sqlite3 mongodb
rm -rf db/
rm src/db/database.ts
rm src/app/api/bookings/route.ts
```

### Step 7: Deploy to Netlify

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Migrate to Supabase booking system"
   git push
   ```

2. **Add Environment Variables in Netlify**:
   - Go to Site settings → Environment variables
   - Add all variables from `.env.local`

3. **Deploy!**

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] SQL table created successfully
- [ ] Admin user created in Supabase Auth
- [ ] `.env.local` file configured
- [ ] Gmail App Password generated
- [ ] `npm install` completed
- [ ] Local dev server running
- [ ] Test booking creation works
- [ ] Email notifications received
- [ ] Admin login works
- [ ] Admin dashboard displays bookings
- [ ] Old system cleaned up
- [ ] Deployed to Netlify
- [ ] Production environment variables set

## 🆘 Common Issues

### "Missing Supabase environment variables"

→ Check `.env.local` exists and has correct keys
→ Restart dev server: `Ctrl+C` then `npm run dev`

### Emails not sending

→ Use Gmail **App Password**, not regular password
→ Enable 2FA first, then create app password

### Can't login to admin

→ Check admin user exists in Supabase Auth
→ Try the email/password you created in Step 2.4

### Build fails on Netlify

→ Add all env vars in Netlify dashboard
→ Make sure `@supabase/supabase-js` is in dependencies

## 📚 Full Documentation

- **Detailed Setup**: See `SUPABASE_SETUP.md`
- **Migration Guide**: See `MIGRATION_GUIDE.md`
- **API Reference**: See `MIGRATION_GUIDE.md` → API Reference section

## 🎉 You're Done

Your booking system is now:

- ✅ Cloud-hosted (Supabase)
- ✅ Serverless-friendly (works on Netlify)
- ✅ Secure (authentication + RLS)
- ✅ Feature-rich (emails, admin dashboard, slot management)

Need help? Check the troubleshooting section in `MIGRATION_GUIDE.md`
