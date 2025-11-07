# Booking Details & Email Notification Update

## ✅ Changes Completed

### 1. **Email Notifications Now Show Full Details**

The email sent to **lummedia01@gmail.com** now includes:
- ✨ **Package Information**
  - Package type (Classic/Walk-in)
  - Option details
  - Number of looks
  - Number of edited images
  - Number of unedited images
  - **Total cost** (highlighted in large green text)
- 👤 Customer information (name, email, phone)
- 📅 Schedule (service, date, time)
- 📝 Notes (if provided)

### 2. **Admin Dashboard Now Shows Package Details**

Added a new **"Package Details"** column in the admin dashboard table that displays:
- 📦 Package type (Classic/Walk-in)
- 👗 Number of looks
- ✨ Number of edited images
- 📷 Number of unedited images
- 💰 **Total cost in Naira** (formatted with currency symbol)

### 3. **Database Schema Updated**

New columns added to the `bookings` table for quick access:
- `package_type` - Package label (Classic/Walk-in)
- `num_looks` - Number of looks/outfits
- `images_edited` - Number of edited images
- `images_unedited` - Number of unedited images
- `total_cost` - Total booking cost in Naira

These columns are automatically populated when a booking is created.

### 4. **Email Now Sends to Your Original Address**

Changed email recipient back to: **lummedia01@gmail.com**
- Removed dependency on `ADMIN_EMAIL` environment variable
- Emails now always go to lummedia01@gmail.com

---

## 📋 What You Need to Do

### 1. Run the Database Migration SQL

Go to your **Supabase SQL Editor** and run this SQL:

```sql
-- Add additional columns to bookings table for better admin dashboard display
-- These columns will store denormalized data from package_info for quick access

ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS package_type TEXT,
ADD COLUMN IF NOT EXISTS num_looks INTEGER,
ADD COLUMN IF NOT EXISTS images_edited INTEGER,
ADD COLUMN IF NOT EXISTS images_unedited INTEGER,
ADD COLUMN IF NOT EXISTS total_cost DECIMAL(10,2);

-- Update existing records to populate new columns from package_info JSONB
-- Run this if you have existing bookings
UPDATE bookings
SET 
  package_type = package_info->>'packageLabel',
  num_looks = CASE 
    WHEN package_info->>'looks' IS NOT NULL 
    THEN (package_info->>'looks')::INTEGER 
    ELSE NULL 
  END,
  images_edited = CASE 
    WHEN package_info->>'imagesEdited' IS NOT NULL 
    THEN (package_info->>'imagesEdited')::INTEGER 
    ELSE NULL 
  END,
  images_unedited = CASE 
    WHEN package_info->>'imagesUnedited' IS NOT NULL 
    THEN (package_info->>'imagesUnedited')::INTEGER 
    ELSE NULL 
  END,
  total_cost = CASE 
    WHEN package_info->>'price' IS NOT NULL 
    THEN (package_info->>'price')::DECIMAL 
    ELSE NULL 
  END
WHERE package_info IS NOT NULL;

-- Create index for filtering by cost
CREATE INDEX IF NOT EXISTS idx_bookings_total_cost ON bookings(total_cost);

-- Comment on columns
COMMENT ON COLUMN bookings.package_type IS 'Package type (Classic/Walk-in) extracted from package_info for quick access';
COMMENT ON COLUMN bookings.num_looks IS 'Number of looks/outfits in the booking';
COMMENT ON COLUMN bookings.images_edited IS 'Number of edited images included';
COMMENT ON COLUMN bookings.images_unedited IS 'Number of unedited images included';
COMMENT ON COLUMN bookings.total_cost IS 'Total cost in Naira for the booking';
```

### 2. Deploy to Netlify

Commit and push your changes:

```bash
git add .
git commit -m "feat: add full booking details to emails and admin dashboard, update email to lummedia01@gmail.com"
git push
```

Netlify will automatically redeploy.

---

## 📧 Email Format Preview

Your emails will now look like this:

```
✨ NEW BOOKING REQUEST

You have received a new booking request from John Doe.

👤 CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━
Name: John Doe
Email: john@example.com
Phone: +234 XXX XXX XXXX

📅 SCHEDULE
━━━━━━━━━━━━━━━━━━━━
Service: Portraits
Date: Friday, November 8, 2025
Time: 10:00 AM

📦 PACKAGE DETAILS
━━━━━━━━━━━━━━━━━━━━
Package: Classic Package
Option: 2 Looks with Studio Session
Number of Looks: 2
Edited Images: 10
Unedited Images: 20
Total Cost: ₦50,000

📝 NOTES
━━━━━━━━━━━━━━━━━━━━
Customer wants outdoor shots

[View in Admin Dashboard Button]
```

---

## 🎯 Admin Dashboard Preview

The admin dashboard table now shows:

| Customer | Service | **Package Details** | Date & Time | Status | Payment | Actions |
|----------|---------|---------------------|-------------|--------|---------|---------|
| John Doe | Portraits | **Classic Package**<br>👗 2 looks<br>✨ 10 edited<br>📷 20 unedited<br>**₦50,000** | Nov 8, 2025<br>10:00 AM | Confirmed | ✓ Paid | Cancel |

---

## 🔧 Files Modified

1. **src/lib/email.ts** - Enhanced email template with full package details
2. **src/app/api/bookings/route.ts** - Save denormalized fields to database
3. **src/app/admin/dashboard/page.tsx** - Display package details in table
4. **DATABASE_UPDATE.sql** - SQL migration file (new)

---

## ✅ Testing Checklist

After deploying:
- [ ] Create a test booking with package details
- [ ] Verify email arrives at lummedia01@gmail.com with all details
- [ ] Check admin dashboard shows package details column
- [ ] Confirm total cost displays correctly with ₦ symbol
- [ ] Verify existing bookings updated (if any existed before)

---

All changes are complete and ready for deployment! 🚀
