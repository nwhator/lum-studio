# Netlify + Supabase Setup Guide

Complete step-by-step guide to deploy your LUM Studios booking system on Netlify with Supabase backend.

## 📋 Prerequisites

Before you start, make sure you have:

- ✅ GitHub account (with lum-studio repository)
- ✅ Netlify account → [Sign up free](https://app.netlify.com/signup)
- ✅ Supabase account → [Sign up free](https://supabase.com)
- ✅ Gmail account (for SMTP email notifications)
- ✅ Code pushed to GitHub repository

**Time Required:** 30-40 minutes total

---

## 🎯 Overview - What You'll Do

Here's the complete deployment process:

1. **Supabase Setup** (10 min)
   - Create project
   - Run SQL to create database table
   - Create admin user
   - Get API keys

2. **Gmail Setup** (5 min)
   - Enable 2-Factor Authentication
   - Generate App Password

3. **Netlify Deployment** (15 min)
   - Connect GitHub repository
   - Configure build settings
   - Add environment variables (8 variables)
   - Deploy site

4. **Testing** (5 min)
   - Test booking form
   - Test admin login
   - Verify emails work

5. **Custom Domain** (Optional - 5 min)
   - Add your domain
   - Configure DNS

**Let's get started! 🚀**

---

## Part 1: Supabase Setup (10 minutes)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New Project"**
3. Sign in with GitHub (recommended)
4. Click **"New project"**
5. Fill in:
   - **Name**: `lum-studios-booking` (or your preference)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free
6. Click **"Create new project"**
7. Wait 2-3 minutes for setup to complete

### Step 2: Create Database Table

1. In your Supabase project, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Copy and paste this SQL:

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

-- Create indexes for better performance
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

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert bookings (public booking form)
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

4.Click **"Run"** (or press `Ctrl+Enter`)
5.You should see: **"Success. No rows returned"**

### Step 3: Create Admin User

1. Click **"Authentication"** in the left sidebar
2. Click **"Users"** tab
3. Click **"Add user"** → **"Create new user"**
4. Fill in:
   - **Email**: Your admin email (e.g., `lummedia01@gmail.com`)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Check this box
5. Click **"Create user"**
6. **Save these credentials** - you'll need them to login to `/admin/login`

### Step 4: Get Your API Keys

1. Click **"Project Settings"** (gear icon in sidebar)
2. Click **"API"** in the left menu
3. You'll see three important values:

   **Copy these (you'll need them for Netlify):**

   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
   - **service_role** key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (different long string)

   ⚠️ **Important**: Keep the `service_role` key secret! Never commit it to Git.

---

## Part 2: Gmail App Password Setup (5 minutes)

### Step 1: Enable 2-Factor Authentication

1. Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Find **"2-Step Verification"**
3. Click **"Get Started"** and follow the prompts
4. Complete 2FA setup (required for app passwords)

### Step 2: Generate App Password

1. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Or: Google Account → Security → 2-Step Verification → App passwords
2. Click **"Select app"** → Choose **"Mail"**
3. Click **"Select device"** → Choose **"Other (Custom name)"**
4. Enter: **"LUM Studios Booking"**
5. Click **"Generate"**
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)
7. **Save this password** - you can't view it again!

---

## Part 3: Netlify Deployment (15 minutes)

### Step 1: Prepare Your Repository

**Before deploying, ensure:**

```bash
# Check you have all required files
ls -la src/lib/supabase.ts        # Should exist
ls -la src/lib/email.ts            # Should exist
ls -la src/app/api/bookings/create # Should exist

# Check package.json has Supabase
grep "supabase" package.json       # Should show @supabase/supabase-js
```

### Step 2: Push Code to GitHub

1. **Check Git status:**

   ```bash
   git status
   ```

2. **Add all changes:**

   ```bash
   git add .
   ```

3. **Commit with clear message:**

   ```bash
   git commit -m "Add Supabase booking system with Netlify support"
   ```

4. **Push to GitHub:**

   ```bash
   git push origin main
   ```

5. **Verify on GitHub:**
   - Open your repository on GitHub
   - Check that all new files are visible
   - Confirm the commit appears in the history

### Step 3: Sign Up / Login to Netlify

1. **Go to [https://app.netlify.com](https://app.netlify.com)**

2. **Sign up options:**
   - ✅ **Recommended:** Sign up with GitHub (easier integration)
   - Or use Email

3. **If using GitHub:**
   - Click "GitHub" login button
   - Authorize Netlify access
   - You'll be redirected to Netlify dashboard

### Step 4: Create New Site on Netlify

1. **In Netlify Dashboard:**
   - Click the green **"Add new site"** button
   - Or click **"Sites"** tab → **"Add new site"**

2. **Choose deployment method:**
   - Click **"Import an existing project"**
   - Select **"Deploy with GitHub"**

3. **Authorize GitHub (if first time):**
   - Click **"Authorize Netlify"**
   - You may need to enter your GitHub password
   - Grant Netlify access to your repositories

4. **Select Repository:**
   - You'll see a list of your repositories
   - Search for: `lum-studio`
   - Click on **`lum-studio`** repository

### Step 5: Configure Build Settings

**Netlify should auto-detect Next.js settings. Verify:**

1. **Site Settings (should auto-fill):**

   ```md
   Owner: [Your GitHub username]
   Branch to deploy: main
   ```

2. **Build Settings:**

   ```md
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: .next
   Functions directory: (leave empty)
   ```

3. **If settings are wrong, manually set:**
   - Click **"Edit settings"**
   - Update each field
   - Click **"Save"**

4. **Important:** Click **"Show advanced"** button (below build settings)

### Step 3: Configure Build Settings

Netlify should auto-detect Next.js. Verify these settings:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Functions directory**: (leave empty - Next.js handles this)

Click **"Show advanced"** and continue to environment variables.

### Step 6: Add Environment Variables

**This is the most important step!** All your Supabase and email settings go here.

1. **In the "Advanced build settings" section:**
   - Click **"New variable"** button

2. **Add each variable one by one:**

#### ✅ Variable 1: NEXT_PUBLIC_SUPABASE_URL

```
Key:   NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxxxxxxxxxx.supabase.co
```

**Where to get:**

- Open Supabase dashboard
- Go to: Project Settings (gear icon) → API
- Copy the "Project URL"
- Should look like: `https://abcdefghijklmno.supabase.co`

**Add it:**

- Click "New variable"
- Paste `NEXT_PUBLIC_SUPABASE_URL` in Key field
- Paste your Supabase URL in Value field
- Click "Add"

---

#### ✅ Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY

```
Key:   NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to get:**

- Same Supabase API page
- Copy the **"anon public"** key (long string)
- Starts with: `eyJhbGc...`

**Add it:**

- Click "New variable"
- Paste `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Key
- Paste the anon key in Value
- Click "Add"

---

#### ✅ Variable 3: SUPABASE_SERVICE_ROLE_KEY

```
Key:   SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to get:**

- Same Supabase API page
- Copy the **"service_role"** key
- ⚠️ **Different** from anon key!

**Add it:**

- Click "New variable"
- Paste `SUPABASE_SERVICE_ROLE_KEY` in Key
- Paste the service_role key in Value
- Click "Add"

---

#### ✅ Variable 4: SMTP_EMAIL

```
Key:   SMTP_EMAIL
Value: your-email@gmail.com
```

**What to enter:**

- Your Gmail address
- Example: `your-email@gmail.com`

---

#### ✅ Variable 5: SMTP_PASS

```
Key:   SMTP_PASS
Value: abcd efgh ijkl mnop
```

**What to enter:**

- The 16-character Gmail App Password from Part 2
- **NOT your regular Gmail password!**
- Remove any spaces: `abcdefghijklmnop`

---

#### ✅ Variable 6: WA_PHONE (Optional)

```
Key:   WA_PHONE
Value: 2348145538164
```

**What to enter:**

- WhatsApp number (no + or spaces)
- Example: `2348145538164`

---

#### ✅ Variable 7: NEXT_PUBLIC_SITE_URL (Add after deploy)

```
Key:   NEXT_PUBLIC_SITE_URL
Value: https://your-site.netlify.app
```

**What to enter:**

- Leave empty for now
- You'll add this after first deployment
- Or use: `https://thelumstudios.com` if you have custom domain

---

#### ✅ Variable 8: NEXT_PUBLIC_STUDIO_NAME (Optional)

```
Key:   NEXT_PUBLIC_STUDIO_NAME
Value: LUM Studios
```

**What to enter:**

- Your studio name
- Used in emails and UI

---

**Double-check your variables:**

After adding all variables, you should see 8 environment variables listed:

- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ✅ SUPABASE_SERVICE_ROLE_KEY
- ✅ SMTP_EMAIL
- ✅ SMTP_PASS
- ✅ WA_PHONE
- ✅ NEXT_PUBLIC_SITE_URL (can be empty initially)
- ✅ NEXT_PUBLIC_STUDIO_NAME (optional)

**Common mistakes to avoid:**

- ❌ Don't add quotes around values
- ❌ Don't include `=` signs
- ❌ Don't add spaces in keys
- ❌ Don't swap anon and service_role keys
- ❌ Don't use regular Gmail password (must be App Password)

### Step 7: Deploy Your Site

1. **After adding all environment variables:**
   - Scroll down
   - Click the big **"Deploy [your-site-name]"** button

2. **Wait for build to complete:**
   - You'll see "Site deploy in progress"
   - Build typically takes 3-5 minutes
   - You can click "Deploying your site" to see logs

3. **Monitor the build:**
   - Click **"Deploying your site"** link
   - You'll see real-time build logs
   - Look for:

     ```
     ✓ Building
     ✓ Uploading
     ✓ Deploy successful!
     ```

4. **Build successful:**
   - You'll see: **"Site is live ✓"**
   - Your URL will be: `https://random-name-123456.netlify.app`
   - Click the URL to open your site

5. **If build fails:**
   - Click on the failed deploy
   - Read the error logs
   - Common issues:
     - Missing environment variables
     - TypeScript errors
     - Missing dependencies
   - See troubleshooting section below

### Step 8: Update Site URL Environment Variable

**Now that your site is live, update the URL:**

1. **Copy your Netlify URL:**
   - It's shown at the top: `https://your-site.netlify.app`

2. **Go to Site Settings:**
   - Click **"Site settings"** (or **"Site configuration"**)
   - Click **"Environment variables"** in left menu

3. **Update NEXT_PUBLIC_SITE_URL:**
   - Find `NEXT_PUBLIC_SITE_URL` in the list
   - Click **"Edit"**
   - Update value to: `https://your-site.netlify.app`
   - Click **"Save"**

4. **Trigger a new deploy:**
   - Go back to **"Deploys"** tab
   - Click **"Trigger deploy"** dropdown
   - Click **"Deploy site"**
   - Wait for the new build to complete

### Step 9: Set Custom Domain (Optional)

1. In Netlify, go to **"Domain settings"**
2. Click **"Add custom domain"**
3. Enter your domain: `thelumstudios.com`
4. Follow the DNS setup instructions
5. Netlify will automatically provision SSL certificate

---

## Part 4: Testing Your Deployment

### Test 1: Booking Form

1. Visit: `https://your-site.netlify.app/booking`
2. Fill out the booking form
3. Submit
4. ✅ Check: Email received in Gmail
5. ✅ Check: WhatsApp link opens correctly
6. ✅ Check: Booking appears in Supabase (Supabase → Table Editor → bookings)

### Test 2: Admin Login

1. Visit: `https://your-site.netlify.app/admin/login`
2. Login with the admin credentials from Part 1, Step 3
3. ✅ Check: Redirects to dashboard
4. ✅ Check: Bookings are displayed

### Test 3: Admin Dashboard

1. In dashboard, try:
   - Filter by status (All, Pending, Confirmed, Cancelled)
   - Click "Confirm" on a pending booking
   - Toggle payment confirmation
   - Update booking status
2. ✅ Check: Changes save correctly
3. ✅ Check: Data updates in Supabase

---

## Part 5: Post-Deployment Configuration

### Update Site URL in Supabase (Important!)

1. Go to Supabase → **Authentication** → **URL Configuration**
2. Add your Netlify URL to **Site URL**:
   - `https://your-site.netlify.app`
3. Add to **Redirect URLs**:
   - `https://your-site.netlify.app/admin/dashboard`
   - `https://your-site.netlify.app/admin/login`

### Update Environment Variables in Netlify

1. Go to Netlify → **Site settings** → **Environment variables**
2. Update `NEXT_PUBLIC_SITE_URL` to your actual Netlify URL
3. Click **"Save"**
4. Redeploy: **Deploys** → **Trigger deploy** → **Deploy site**

---

## 🔧 Troubleshooting

### Build Fails on Netlify

**Error: "Cannot find module '@supabase/supabase-js'"**

✅ **Fix**: Make sure `package.json` includes:

```json
"dependencies": {
  "@supabase/supabase-js": "^2.39.0"
}
```

Run `npm install` locally and push to GitHub.

---

**Error: "Missing environment variables"**

✅ **Fix**:

1. Go to Netlify → Site settings → Environment variables
2. Verify all required variables are set
3. Check for typos in variable names
4. Redeploy after adding variables

---

### Emails Not Sending

**Error: "Invalid login: 535-5.7.8 Username and Password not accepted"**

✅ **Fix**:

1. Verify you're using Gmail **App Password**, not regular password
2. Remove any spaces from the 16-character password
3. Make sure 2FA is enabled on Gmail account
4. Try generating a new app password

---

**No errors but emails not arriving**

✅ **Fix**:

1. Check spam/junk folder
2. Verify `SMTP_EMAIL` is correct
3. Test email manually: Gmail → Settings → Forwarding/IMAP → Enable IMAP
4. Check Netlify function logs: Site → Functions → View logs

---

### Admin Login Fails

**Error: "Invalid credentials"**

✅ **Fix**:

1. Verify admin user exists in Supabase → Authentication → Users
2. Check email and password are correct
3. Make sure "Auto Confirm User" was checked when creating user
4. Try resetting password in Supabase

---

**Error: "Authentication failed"**

✅ **Fix**:

1. Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
2. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
3. Check Supabase project is active (not paused)
4. Clear browser cache and cookies

---

### Bookings Not Saving

**Error: "Failed to create booking"**

✅ **Fix**:

1. Check Supabase → SQL Editor → run: `SELECT * FROM bookings LIMIT 1;`
2. If error, table doesn't exist → Run the SQL from Part 1, Step 2
3. Verify RLS policies are set up correctly
4. Check browser console for detailed error messages

---

**Slots showing as available when booked**

✅ **Fix**:

1. Verify bookings have `status = 'pending'` or `'confirmed'`
2. Check date format is `YYYY-MM-DD`
3. Test slot API directly: `/api/slots/available?date=2025-11-15`

---

### Function Errors in Netlify

**Error: "Function returned status code 500"**

✅ **Fix**:

1. Go to Netlify → Functions → View logs
2. Look for error details
3. Common issues:
   - Missing environment variables
   - Supabase connection error
   - SMTP authentication error
4. Check all env vars are set correctly
5. Redeploy after fixing

---

## 📊 Monitoring & Maintenance

### Check Supabase Usage

1. Go to Supabase → **Settings** → **Usage**
2. Monitor:
   - Database size (500 MB free tier limit)
   - Monthly Active Users
   - Storage used
3. Free tier limits:
   - 500 MB database
   - 1 GB file storage
   - 2 GB bandwidth/month
   - 50,000 monthly active users

### Check Netlify Usage

1. Go to Netlify → **Analytics** → **Usage**
2. Monitor:
   - Build minutes (300 min/month free)
   - Bandwidth (100 GB/month free)
   - Serverless function executions

### Backup Bookings Data

**Option 1: Via Supabase Dashboard**

1. Go to Supabase → **Database** → **Backups**
2. Click **"Download backup"**
3. Save `.sql` file locally

**Option 2: Export to CSV**

1. Go to Supabase → **Table Editor** → **bookings**
2. Click **"Export"** → **"CSV"**
3. Save file

---

## 🚀 Performance Optimization

### Enable Netlify Edge Functions (Optional)

1. Go to Netlify → **Site settings** → **Functions**
2. Enable **"Edge Functions"**
3. This reduces latency by running functions closer to users

### Configure Supabase Connection Pooling

Connection pooling is enabled by default in Supabase for serverless.
No configuration needed!

### Add Custom Domain SSL

Netlify automatically provisions SSL certificates for custom domains.

1. Add custom domain (Part 3, Step 6)
2. Update DNS records
3. Wait 24-48 hours for DNS propagation
4. SSL certificate auto-provisions

---

## 📱 Mobile App Integration (Future)

Your API routes are ready for mobile apps:

### Endpoints Available

- `POST /api/bookings/create` - Create booking
- `GET /api/slots/available?date=YYYY-MM-DD` - Get available slots
- `POST /api/admin/login` - Admin authentication
- `GET /api/bookings/list` - List bookings (requires auth)
- `PATCH /api/bookings/update` - Update booking (requires auth)

### Example Usage (React Native/Flutter)

```javascript
// Create booking
const response = await fetch('https://your-site.netlify.app/api/bookings/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '08012345678',
    service: 'Portrait Session',
    date: '2025-11-15',
    time: '10:00 AM',
  })
});

const data = await response.json();
```

---

## ✅ Final Checklist

- [ ] Supabase project created
- [ ] Database table created with SQL
- [ ] Admin user created in Supabase Auth
- [ ] API keys copied from Supabase
- [ ] Gmail 2FA enabled
- [ ] Gmail App Password generated
- [ ] Code pushed to GitHub
- [ ] Netlify site created
- [ ] All environment variables added to Netlify
- [ ] Site deployed successfully
- [ ] Test booking form works
- [ ] Test admin login works
- [ ] Test admin dashboard works
- [ ] Email notifications received
- [ ] WhatsApp links work
- [ ] Custom domain configured (if applicable)
- [ ] Site URL updated in Netlify env vars
- [ ] Supabase redirect URLs configured

---

## 📌 Quick Reference Card

Save this for future reference!

### Netlify Dashboard URLs

```
Main Dashboard:    https://app.netlify.com/sites/YOUR-SITE-NAME
Deploys:          https://app.netlify.com/sites/YOUR-SITE-NAME/deploys
Environment Vars: https://app.netlify.com/sites/YOUR-SITE-NAME/settings/env
Domain Settings:  https://app.netlify.com/sites/YOUR-SITE-NAME/settings/domain
Function Logs:    https://app.netlify.com/sites/YOUR-SITE-NAME/functions
```

### Supabase Dashboard URLs

```
Project Home:     https://app.supabase.com/project/YOUR-PROJECT-ID
SQL Editor:       https://app.supabase.com/project/YOUR-PROJECT-ID/sql
Table Editor:     https://app.supabase.com/project/YOUR-PROJECT-ID/editor
Authentication:   https://app.supabase.com/project/YOUR-PROJECT-ID/auth/users
API Settings:     https://app.supabase.com/project/YOUR-PROJECT-ID/settings/api
```

### Environment Variables Checklist

Copy this list when adding variables to Netlify:

```bash
# Required (Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Required (Gmail)
SMTP_EMAIL=your-email@gmail.com
SMTP_PASS=16-char-app-password

# Optional
WA_PHONE=2348145538164
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
NEXT_PUBLIC_STUDIO_NAME=LUM Studios
```

### Common Netlify Commands

**Trigger Manual Deploy:**

1. Deploys tab → Trigger deploy → Deploy site

**View Build Logs:**

1. Deploys tab → Click on deploy → View logs

**Update Environment Variable:**

1. Site settings → Environment variables → Edit

**Enable Deploy Notifications:**

1. Site settings → Build & deploy → Deploy notifications

**Download Deploy Logs:**

1. Deploys tab → Click deploy → Download logs

### Common Supabase Tasks

**View All Bookings:**

1. Table Editor → bookings table → View data

**Run SQL Query:**

1. SQL Editor → New query → Paste SQL → Run

**Check Auth Users:**

1. Authentication → Users → View list

**Reset Admin Password:**

1. Authentication → Users → Click user → Reset password

**Check API Usage:**

1. Settings → Usage → View metrics

### Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Build fails | Check env vars are set, check logs for errors |
| Emails not sending | Verify SMTP_PASS is App Password (not regular password) |
| Can't login to admin | Check admin user exists in Supabase Auth |
| 404 errors | Redeploy site after adding routes |
| Slow builds | Enable Netlify build cache in settings |
| Function timeout | Check Supabase connection, optimize queries |

### File Locations Reference

```
API Routes:
├─ /api/bookings/create     → Create new booking
├─ /api/bookings/list       → List all bookings (admin)
├─ /api/bookings/update     → Update booking status
├─ /api/slots/available     → Get available time slots
└─ /api/admin/login         → Admin authentication

Frontend Pages:
├─ /booking                 → Public booking form
├─ /admin/login            → Admin login page
└─ /admin/dashboard        → Admin booking management

Configuration:
├─ src/lib/supabase.ts     → Supabase client
├─ src/lib/email.ts        → Email service
└─ .env.local              → Local environment variables
```

### Emergency Contacts & Links

- **Netlify Status:** <https://www.netlifystatus.com>
- **Supabase Status:** <https://status.supabase.com>
- **Gmail SMTP Issues:** <https://support.google.com/mail/answer/7126229>
- **Netlify Support:** <https://www.netlify.com/support>
- **Supabase Support:** <https://supabase.com/support>

---

## 🎉 You're Live

Your booking system is now running on Netlify with Supabase backend!

### Important Links

- **Your Site**: `https://your-site.netlify.app`
- **Booking Page**: `https://your-site.netlify.app/booking`
- **Admin Login**: `https://your-site.netlify.app/admin/login`
- **Admin Dashboard**: `https://your-site.netlify.app/admin/dashboard`
- **Netlify Dashboard**: `https://app.netlify.com`
- **Supabase Dashboard**: `https://app.supabase.com`

### Admin Credentials

- **Email**: (The email you set in Part 1, Step 3)
- **Password**: (The password you set in Part 1, Step 3)

### Need Help?

- Check the troubleshooting section above
- Review function logs in Netlify
- Check database in Supabase Table Editor
- See `MIGRATION_GUIDE.md` for API reference
- See `QUICKSTART.md` for local development

---

**Congratulations! Your booking system is live! 🎊**

---

## 🚀 Post-Deployment Optimization

### Enable Build Cache (Faster Builds)

1. Netlify Dashboard → Site settings → Build & deploy
2. Scroll to "Build settings"
3. Enable "Cache Next.js build"
4. Next deploy will be faster (30-60% faster)

### Set Up Deploy Notifications

Get notified when deploys succeed or fail:

1. Site settings → Build & deploy → Deploy notifications
2. Click "Add notification"
3. Choose:
   - **Email:** Get email on deploy success/failure
   - **Slack:** Post to Slack channel
   - **Webhook:** Custom webhook URL
4. Configure and save

### Enable Form Detection (Bonus)

Netlify can handle form submissions:

1. Site settings → Forms
2. Enable form detection
3. You can collect form data in Netlify dashboard

### Monitor Performance

**Netlify Analytics (Paid):**

- Site overview → Analytics → Enable
- See real-time traffic, page views, bandwidth

**Free Alternative - Google Analytics:**

1. Get Google Analytics ID
2. Add to your Next.js app
3. Track visitors and conversions

### Set Up Automatic Deploys

Already enabled by default! Every push to `main` branch triggers deploy.

**To deploy from other branches:**

1. Site settings → Build & deploy → Deploy contexts
2. Add branch (e.g., `staging`)
3. Each branch gets its own URL

### Enable HTTPS (Already Done!)

Netlify auto-provisions SSL certificates. Check:

- Site settings → Domain management → HTTPS
- Should show "HTTPS enabled"

### Schedule Database Backups

**Supabase Automatic Backups:**

1. Supabase → Settings → Backups
2. Free tier: Daily backups (7 days retention)
3. Pro tier: Point-in-time recovery

**Manual Backup Script:**

```bash
# Export bookings to JSON
curl https://your-site.netlify.app/api/bookings/list > backup-$(date +%Y%m%d).json
```

### Monitoring & Alerts

**Set up Netlify notifications for:**

- Deploy failures → Email alert
- Build time > 5 min → Email alert
- Site downtime → Email alert

**Set up Supabase monitoring:**

1. Supabase → Settings → Usage
2. Enable email alerts for:
   - Database size > 80%
   - API requests spike
   - Auth failures spike

---

## 📚 Additional Resources

### Documentation

- **This Project:**
  - `QUICKSTART.md` - Local development setup
  - `MIGRATION_GUIDE.md` - API reference & troubleshooting
  - `IMPLEMENTATION_SUMMARY.md` - What was built
  - `ARCHITECTURE.md` - System architecture

- **External:**
  - [Netlify Docs](https://docs.netlify.com)
  - [Supabase Docs](https://supabase.com/docs)
  - [Next.js Docs](https://nextjs.org/docs)

### Community & Support

- **Netlify Community:** <https://answers.netlify.com>
- **Supabase Discord:** <https://discord.supabase.com>
- **Next.js GitHub:** <https://github.com/vercel/next.js>

### Upgrade Considerations

**When to upgrade from free tier:**

**Netlify Free Limits:**

- 300 build minutes/month → Upgrade if you deploy frequently
- 100 GB bandwidth/month → Upgrade if traffic grows

**Supabase Free Limits:**

- 500 MB database → Upgrade when data grows
- 2 GB bandwidth/month → Upgrade if API usage increases
- Pauses after 7 days inactivity → Upgrade for production

**Pricing:**

- Netlify Pro: $19/month (unlimited builds)
- Supabase Pro: $25/month (8 GB database, better support)

---

## 🎓 What You've Accomplished

✅ **You've successfully:**

- Set up a production-ready booking system
- Deployed to Netlify (serverless, scalable)
- Configured Supabase database (cloud PostgreSQL)
- Set up email notifications (Gmail SMTP)
- Created admin authentication
- Built a modern admin dashboard
- Enabled WhatsApp integration
- Secured with environment variables
- Enabled HTTPS/SSL

✅ **Your system can now:**

- Accept bookings 24/7
- Send automatic emails
- Check slot availability in real-time
- Manage bookings via admin panel
- Scale to thousands of users
- Handle concurrent bookings safely

✅ **You've learned:**

- Netlify deployment workflow
- Supabase setup and configuration
- Environment variable management
- Next.js API routes deployment
- Email service integration
- Database security (RLS policies)

**Great job! You're now running a professional booking system! 🎉**

---
