# 🚀 Vercel Deployment Guide for thelumstudios.com

## 🔴 PROBLEM IDENTIFIED

Your domain `thelumstudios.com` is currently pointing to **216.198.79.1**, but Vercel's IP is **76.76.21.21**.

This is why you're getting `ERR_NAME_NOT_RESOLVED` - the domain is resolving to the wrong server!

---

## ✅ SOLUTION: 3 Simple Steps

### Step 1: Add Domain in Vercel Dashboard

1. **Login to Vercel:** <https://vercel.com/dashboard>
2. **Select your project:** `lum-studio` (or whatever it's named)
3. **Go to Settings → Domains**
4. **Click "Add"** and enter:
   - First: `thelumstudios.com`
   - Then: `www.thelumstudios.com`

Vercel will show you the required DNS configuration.

---

### Step 2: Update DNS Records at Your Domain Registrar

**Where did you buy the domain?** (GoDaddy, Namecheap, Google Domains, etc.)

Login to your domain registrar and **REPLACE** the current DNS records:

#### ❌ REMOVE (Current - Wrong)

```md
A Record: @ → 216.198.79.1
```

#### ✅ ADD (New - Correct)

```md
A Record
Name: @
Value: 76.76.21.21
TTL: 3600 (or Auto)

CNAME Record
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

---

### Step 3: Wait for DNS Propagation

- **Time:** 5 minutes to 48 hours (usually 15-30 minutes)
- **Check status:** <https://dnschecker.org/#A/thelumstudios.com>

Once DNS propagates:

- ✅ Vercel will automatically provision an SSL certificate
- ✅ Your site will be live at <https://thelumstudios.com>
- ✅ HTTP will auto-redirect to HTTPS

---

## 🔍 Verify Your Deployment

### Check if your project is deployed on Vercel

```bash
# Option 1: Check via CLI
npx vercel ls

# Option 2: Check in browser
# Visit your Vercel dashboard and look for deployments
```

### If you haven't deployed yet

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Confirm settings
# - Deploy!
```

---

## 📋 Quick Checklist

- [ ] **Vercel Project Created?** (Check dashboard)
- [ ] **Latest code deployed?** (Should auto-deploy from GitHub)
- [ ] **Domain added in Vercel?** (Settings → Domains)
- [ ] **DNS updated at registrar?** (A record: 76.76.21.21)
- [ ] **Wait 15-30 minutes** (DNS propagation)
- [ ] **Test:** <https://thelumstudios.com>

---

## 🆘 Troubleshooting

### "I don't see my project in Vercel"

You need to deploy first:

```bash
# Make sure you're in the project directory
cd c:/Users/ADDIS/OneDrive/Documents/lum-studio

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### "Vercel shows an error when adding domain"

Make sure:

1. You own the domain
2. You're adding it to the correct project
3. No other Vercel project is using this domain

### "DNS isn't updating"

Some registrars cache aggressively:

1. Log out and back in to registrar
2. Try using their "flush DNS" or "refresh" option
3. Contact registrar support if stuck

---

## 🎯 Current Project Configuration

I've added `vercel.json` with:

- ✅ Auto-deployment from main branch
- ✅ Security headers
- ✅ Asset caching (1 year for static files)
- ✅ Proper redirects
- ✅ Framework detection (Next.js)

Your `next.config.mjs` is already configured for:

- ✅ Image optimization (WebP, quality 85)
- ✅ Remote images from `**.thelumstudios.com`
- ✅ Production optimizations
- ✅ Bundle size analysis

---

## 🔗 Helpful Links

- **Vercel Dashboard:** <https://vercel.com/dashboard>
- **Vercel Docs - Custom Domains:** <https://vercel.com/docs/concepts/projects/domains>
- **DNS Checker:** <https://dnschecker.org/#A/thelumstudios.com>
- **SSL Check:** <https://www.ssllabs.com/ssltest/analyze.html?d=thelumstudios.com>

---

## 📞 Next Steps

1. **Right now:** Update DNS at your domain registrar (change A record to 76.76.21.21)
2. **In Vercel:** Add the domain to your project
3. **Wait:** 15-30 minutes for DNS to propagate
4. **Test:** Visit <https://thelumstudios.com>

**Need help finding where to update DNS?** Tell me your domain registrar (GoDaddy, Namecheap, etc.) and I can provide specific instructions!
