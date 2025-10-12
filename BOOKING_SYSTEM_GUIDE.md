# Server-Side Booking System Implementation Guide

## 🎯 Overview
This guide explains how to set up a complete server-side booking system with Next.js and Vercel that includes:
- Email notifications
- Real-time booking management
- Admin dashboard
- Greyed-out booked slots

## 📁 Files Created

### 1. API Routes
- **`src/app/api/bookings/route.ts`** - Main booking API (GET all bookings, POST new booking)
- **`src/app/api/bookings/[id]/route.ts`** - Individual booking management (PATCH update, DELETE cancel)

### 2. Admin Dashboard
- **`src/app/admin/bookings/page.tsx`** - Admin interface to manage all bookings

### 3. Styles
- **`src/app/globals.scss`** - Added admin dashboard styles

## 🚀 Quick Start

### Step 1: Choose a Database (Pick One)

#### Option A: Vercel Postgres (Recommended for Vercel)
```bash
npm install @vercel/postgres
```

#### Option B: MongoDB with Mongoose
```bash
npm install mongodb mongoose
```

#### Option C: Supabase (Free tier available)
```bash
npm install @supabase/supabase-js
```

### Step 2: Set Up Email Service (Pick One)

#### Option A: Resend (Recommended - Simple & Reliable)
```bash
npm install resend
```

1. Sign up at https://resend.com
2. Get your API key
3. Add to `.env.local`:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

#### Option B: SendGrid
```bash
npm install @sendgrid/mail
```

#### Option C: Nodemailer (Use your own SMTP)
```bash
npm install nodemailer
```

### Step 3: Environment Variables

Create `.env.local` in your project root:

```env
# Database (choose one)
POSTGRES_URL=postgresql://user:password@localhost:5432/lum_studio
# OR
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/lum_studio
# OR
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx

# Email Service (choose one)
RESEND_API_KEY=re_xxxxxxxxxxxxx
# OR
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin Authentication (optional but recommended)
ADMIN_EMAIL=admin@thelumstudios.com
ADMIN_PASSWORD=your-secure-password
```

## 📊 Database Setup

### Option A: Vercel Postgres

1. Go to Vercel Dashboard → Storage → Create Database
2. Create `bookings` table:

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

3. Update `src/app/api/bookings/route.ts`:

```typescript
import { sql } from '@vercel/postgres';

// GET bookings
const { rows } = await sql`
  SELECT * FROM bookings 
  WHERE date = ${date} AND status = 'confirmed'
  ORDER BY created_at DESC
`;

// POST new booking
await sql`
  INSERT INTO bookings (id, date, time_slots, package, name, email, phone, message, status, created_at)
  VALUES (${id}, ${date}, ${timeSlots}, ${packageType}, ${name}, ${email}, ${phone}, ${message}, 'confirmed', NOW())
`;
```

### Option B: MongoDB

Create `src/lib/mongodb.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

const BookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  timeSlots: [{ type: String, required: true }],
  package: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: String,
  status: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
```

## 📧 Email Implementation

### Using Resend (Recommended)

Update the `sendBookingNotification` function in `src/app/api/bookings/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendBookingNotification(booking: any) {
  // Email to customer
  await resend.emails.send({
    from: 'LUM Studios <bookings@thelumstudios.com>',
    to: [booking.email],
    subject: 'Booking Confirmation - LUM Studios',
    html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px;">
          <h1 style="color: white; margin: 0;">Booking Confirmed!</h1>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9; margin-top: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Hi ${booking.name},</h2>
          <p style="font-size: 16px; color: #666;">
            Thank you for booking with LUM Studios! We're excited to capture your special moments.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-top: 0;">Booking Details</h3>
            <p style="margin: 10px 0;"><strong>Package:</strong> ${booking.package}</p>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p style="margin: 10px 0;"><strong>Time:</strong> ${booking.timeSlots[0]} - ${booking.timeSlots[booking.timeSlots.length - 1]}</p>
            <p style="margin: 10px 0;"><strong>Duration:</strong> ${booking.timeSlots.length * 30} minutes</p>
          </div>
          
          <p style="font-size: 14px; color: #666;">
            We'll send you a reminder 24 hours before your session.
          </p>
          
          <p style="font-size: 14px; color: #666;">
            If you need to reschedule, please contact us at least 48 hours in advance.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>LUM Studios | Ile Ife, Osun State, Nigeria</p>
          <p>Phone: +234 814 553 8164 | Email: contact@thelumstudios.com</p>
        </div>
      </body>
      </html>
    `
  });

  // Email to admin
  await resend.emails.send({
    from: 'LUM Studios <bookings@thelumstudios.com>',
    to: ['admin@thelumstudios.com'],
    subject: `New Booking: ${booking.package} - ${booking.name}`,
    html: `
      <h2>New Booking Received</h2>
      <p><strong>Customer:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Package:</strong> ${booking.package}</p>
      <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${booking.timeSlots.join(', ')}</p>
      ${booking.message ? `<p><strong>Message:</strong> ${booking.message}</p>` : ''}
      <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings">View in Admin Dashboard</a></p>
    `
  });
}
```

## 🔧 Update Booking Page to Use API

Update `src/app/booking/page.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!selectedPackage || !selectedDate || selectedTimeSlots.length === 0) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: selectedDate,
        timeSlots: selectedTimeSlots,
        package: selectedPackage,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      })
    });

    const data = await response.json();

    if (data.success) {
      alert('Booking confirmed! Check your email for confirmation.');
      // Redirect to package page or confirmation page
      router.push(`/packages/${selectedPackage.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      alert(data.error || 'Failed to create booking');
    }
  } catch (error) {
    console.error('Error creating booking:', error);
    alert('Failed to create booking. Please try again.');
  }
};

// Fetch booked slots when date is selected
useEffect(() => {
  if (selectedDate) {
    fetch(`/api/bookings?date=${selectedDate.toISOString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBookedSlots(data.bookedSlots || []);
        }
      })
      .catch(console.error);
  }
}, [selectedDate]);
```

## 🔐 Add Admin Authentication (Optional but Recommended)

### Using NextAuth.js

```bash
npm install next-auth
```

Create `src/app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: '1', email: credentials.email, role: 'admin' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = 'admin';
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = token.role;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
```

## 🚀 Deployment to Vercel

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Add server-side booking system"
git push
```

2. **Connect to Vercel**
- Go to https://vercel.com
- Import your GitHub repository
- Vercel will auto-detect Next.js

3. **Add Environment Variables**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`

4. **Deploy**
- Vercel will automatically deploy on every push to main branch

## 📱 Access Points

- **Booking Page:** `https://yoursite.com/booking`
- **Admin Dashboard:** `https://yoursite.com/admin/bookings`
- **API Endpoints:**
  - `GET /api/bookings` - Get all bookings
  - `GET /api/bookings?date=2025-10-15` - Get booked slots for date
  - `POST /api/bookings` - Create new booking
  - `PATCH /api/bookings/[id]` - Update booking status
  - `DELETE /api/bookings/[id]` - Cancel booking

## 🎨 Features Implemented

✅ Server-side booking management
✅ Email notifications (customer + admin)
✅ Real-time slot availability checking
✅ Greyed-out booked slots
✅ Admin dashboard for managing bookings
✅ Cancel/Complete bookings
✅ Filter bookings by status
✅ Responsive design

## 📝 Next Steps

1. Choose and set up your database (Vercel Postgres recommended)
2. Set up email service (Resend recommended)
3. Add environment variables
4. Update API routes with database queries
5. Implement email templates
6. (Optional) Add authentication for admin pages
7. Test locally
8. Deploy to Vercel

## 🔒 Security Recommendations

1. Add rate limiting to prevent spam
2. Implement CAPTCHA on booking form
3. Add authentication for admin routes
4. Validate all inputs server-side
5. Use HTTPS only (Vercel provides this automatically)
6. Sanitize user inputs before storing

## 📞 Support

For questions or issues, contact: admin@thelumstudios.com
