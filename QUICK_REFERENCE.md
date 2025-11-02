# 🚀 Quick Reference - LUM Studios Booking System

## 📋 What You Need to Configure

### 1. Supabase (Get from: <https://app.supabase.com>)

```
Project Settings → API:
├─ Project URL → NEXT_PUBLIC_SUPABASE_URL
├─ anon public → NEXT_PUBLIC_SUPABASE_ANON_KEY
└─ service_role → SUPABASE_SERVICE_ROLE_KEY
```

### 2. Gmail App Password (Get from: <https://myaccount.google.com/apppasswords>)

```
Enable 2FA → App Passwords → Generate:
├─ Your Gmail → SMTP_EMAIL
└─ 16-char password → SMTP_PASS
```

### 3. WhatsApp (Already set)

```
WA_PHONE=2348145538164 ✅
```

---

## 📝 Current .env.local Status

✅ **Already Configured:**

- SMTP_EMAIL (<nwhator@gmail.com>)
- SMTP_PASS (app password set)
- WA_PHONE (2348145538164)
- NEXT_PUBLIC_SITE_URL (thelumstudios.com)

⚠️ **Need to Add (from Supabase):**

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

---

## 🎯 Next Steps (In Order)

### Step 1: Create Supabase Project (5 min)

1. Go to <https://supabase.com>
2. Create new project: `lum-studios-booking`
3. Wait for setup to complete

### Step 2: Run SQL (2 min)

1. Supabase → SQL Editor
2. Copy SQL from `NETLIFY_SUPABASE_SETUP.md` (Part 1, Step 2)
3. Run query

### Step 3: Create Admin User (1 min)

1. Supabase → Authentication → Users
2. Add user with your email & password
3. Check "Auto Confirm User"

### Step 4: Get API Keys (1 min)

1. Supabase → Settings → API
2. Copy 3 values to `.env.local`:
   - Project URL
   - anon public key
   - service_role key

### Step 5: Test Locally (2 min)

```bash
npm run dev
```

- Visit: <http://localhost:3000/booking>
- Visit: <http://localhost:3000/admin/login>

### Step 6: Deploy to Netlify (10 min)

Follow: `NETLIFY_SUPABASE_SETUP.md` (Part 3)

---

## 🔑 Admin Login Credentials

**Where to login:** <https://thelumstudios.com/admin/login>

**Credentials:** Use the email & password you created in Supabase Auth (Step 3)

⚠️ **Note:** This is different from the old ADMIN_USERNAME/ADMIN_PASSWORD (which are now deprecated)

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `.env.local` | Your local environment variables |
| `NETLIFY_SUPABASE_SETUP.md` | **⭐ Complete deployment guide** |
| `QUICKSTART.md` | 5-minute local setup |
| `SUPABASE_SETUP.md` | Detailed Supabase config |
| `MIGRATION_GUIDE.md` | API reference & troubleshooting |

---

## 🛠️ Useful Commands

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Remove old system (AFTER testing!)
./cleanup-old-system.bat   # Windows
./cleanup-old-system.sh    # Mac/Linux
```

---

## 📞 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/bookings/create` | POST | Create booking |
| `/api/bookings/list` | GET | List bookings (admin) |
| `/api/bookings/update` | PATCH | Update booking (admin) |
| `/api/slots/available` | GET | Get available slots |
| `/api/admin/login` | POST | Admin authentication |

---

## ✅ Testing Checklist

- [ ] Supabase project created
- [ ] SQL table created
- [ ] Admin user created in Supabase
- [ ] `.env.local` updated with Supabase keys
- [ ] `npm run dev` works locally
- [ ] Can create booking at `/booking`
- [ ] Email received (check spam folder)
- [ ] WhatsApp link works
- [ ] Can login at `/admin/login`
- [ ] Dashboard shows bookings
- [ ] Can update booking status
- [ ] Deployed to Netlify
- [ ] Environment variables added to Netlify
- [ ] Production site works

---

## 🆘 Quick Troubleshooting

### "Missing Supabase environment variables"

→ Add the 3 Supabase keys to `.env.local`
→ Restart dev server (`Ctrl+C` then `npm run dev`)

### Email not sending

→ Make sure `SMTP_PASS` is Gmail **App Password** (16 chars)
→ Check spam folder

### Can't login to admin

→ Use credentials from Supabase Auth (not old ADMIN_USERNAME)
→ Check user exists: Supabase → Authentication → Users

### Build fails on Netlify

→ Make sure all env vars are added in Netlify dashboard
→ Check `package.json` has `@supabase/supabase-js`

---

## 📊 Free Tier Limits

**Supabase Free:**

- 500 MB database
- 1 GB file storage
- 2 GB bandwidth/month
- 50,000 monthly active users

**Netlify Free:**

- 300 build minutes/month
- 100 GB bandwidth/month
- Unlimited sites

---

## 🎉 You're Almost Done

Just need to:

1. Create Supabase project
2. Add 3 keys to `.env.local`
3. Test locally
4. Deploy to Netlify

**Start here:** `NETLIFY_SUPABASE_SETUP.md`

---

**Questions?** Check the troubleshooting section in each guide! 📚
