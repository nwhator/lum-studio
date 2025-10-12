# Environment Setup Guide for thelumstudios.com

## 📍 Location
Your environment file is located at:
```
c:\Users\ADDIS\OneDrive\Documents\lum-studio\.env.local
```

## ✅ Already Done
✅ `.env.local` created with domain: **thelumstudios.com**
✅ File is in `.gitignore` (won't be committed to Git)
✅ Template created for team members

## 🚀 Quick Setup (3 Steps)

### Step 1: Setup Email Service (5 minutes)

**Recommended: Resend (Easiest)**

1. **Sign up:** Go to https://resend.com
2. **Get API Key:** Dashboard → API Keys → Create
3. **Add to `.env.local`:**
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
   ```
4. **Verify Domain (for production):**
   - Add DNS records for `thelumstudios.com`
   - Resend will give you the DNS records to add

**For now, you can use their test mode to send to verified emails.**

### Step 2: Setup Database (10 minutes)

**Recommended: Vercel Postgres (Free tier)**

1. **Login to Vercel:** https://vercel.com
2. **Go to Storage:** Dashboard → Storage
3. **Create Database:** Create → Postgres Database
4. **Get Connection String:** Copy all the environment variables
5. **Add to `.env.local`:**
   ```env
   POSTGRES_URL=postgres://...
   POSTGRES_PRISMA_URL=postgres://...
   POSTGRES_URL_NON_POOLING=postgres://...
   ```

6. **Create Table:** Run this SQL in Vercel Postgres Query tab:
   ```sql
   CREATE TABLE bookings (
     id VARCHAR(255) PRIMARY KEY,
     date TIMESTAMP NOT NULL,
     time_slots TEXT[] NOT NULL,
     package VARCHAR(255) NOT NULL,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     phone VARCHAR(50) NOT NULL,
     message TEXT,
     status VARCHAR(50) DEFAULT 'confirmed',
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE INDEX idx_bookings_date ON bookings(date);
   CREATE INDEX idx_bookings_status ON bookings(status);
   ```

### Step 3: Set Admin Password

In `.env.local`, update:
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!
```

**Change `YourSecurePassword123!` to something secure!**

## 📧 Email Configuration Details

### Domain Setup for thelumstudios.com

**For Resend:**
1. Domain → Add Domain → `thelumstudios.com`
2. Add these DNS records to your domain registrar:

   | Type  | Name | Value (from Resend) |
   |-------|------|---------------------|
   | TXT   | @    | resend-verification |
   | MX    | @    | feedback-smtp.resend.com |
   | TXT   | @ or _dmarc | DMARC record |

3. Wait for verification (usually 5-30 minutes)
4. You can now send from `bookings@thelumstudios.com`

### Email Templates Already Configured

Emails will be sent from:
- **From:** `bookings@thelumstudios.com`
- **Reply-To:** `admin@thelumstudios.com`
- **To Customer:** Booking confirmation
- **To Admin:** New booking notification

## 🔄 Current vs Production Setup

### Current State (Development)
```env
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=https://thelumstudios.com
```

### For Production (Vercel)
1. Add all environment variables to Vercel:
   - Project Settings → Environment Variables
2. Variables are automatically encrypted
3. Can set different values for Production/Preview/Development

## 🧪 Testing Locally

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test booking:**
   - Go to: http://localhost:3000/booking
   - Create a test booking
   - Check: http://localhost:3000/admin/bookings

3. **Check email (if configured):**
   - Look in your email inbox
   - Check spam folder if not received

## 📝 Current Configuration

Your `.env.local` is configured for:
- ✅ Domain: `thelumstudios.com`
- ✅ Email: `bookings@thelumstudios.com`
- ✅ Admin: `admin@thelumstudios.com`
- ⏳ Database: Needs setup (Vercel Postgres recommended)
- ⏳ Email Service: Needs API key (Resend recommended)
- ⏳ Admin Password: Needs secure password

## 🔒 Security Best Practices

✅ **DO:**
- Keep `.env.local` secret (never share)
- Use strong admin password
- Rotate API keys regularly
- Use different passwords for dev/production

❌ **DON'T:**
- Commit `.env.local` to Git (it's already in .gitignore)
- Share API keys in Slack/Email
- Use simple passwords like "password123"
- Put sensitive data in code

## 📞 Next Steps

1. **Get Resend API Key:** https://resend.com (2 minutes)
2. **Setup Vercel Postgres:** https://vercel.com (5 minutes)
3. **Test booking system:** Create a test booking
4. **Verify emails:** Check confirmation emails work

## 🆘 Troubleshooting

**Problem:** "RESEND_API_KEY is not defined"
**Solution:** Add your Resend API key to `.env.local` and restart dev server

**Problem:** "Cannot connect to database"
**Solution:** Check POSTGRES_URL is correct in `.env.local`

**Problem:** Emails not sending
**Solution:** 
1. Check RESEND_API_KEY is valid
2. Verify domain in Resend dashboard
3. Check spam folder

**Problem:** Changes to `.env.local` not working
**Solution:** Restart dev server (`npm run dev`)

## 📚 Additional Resources

- **Resend Docs:** https://resend.com/docs
- **Vercel Postgres:** https://vercel.com/docs/storage/vercel-postgres
- **Next.js Env Variables:** https://nextjs.org/docs/basic-features/environment-variables

---

**Ready to go!** Just add your Resend API key and Vercel Postgres connection string to get started! 🚀
