# 🗄️ MongoDB Atlas Migration Guide - LUM Studios

## Complete Step-by-Step Tutorial for MongoDB Atlas

**Current Status**: In-memory storage (resets on server restart)  
**Goal**: Persistent MongoDB Atlas database (free forever, flexible NoSQL)

---

## 📋 Table of Contents

1. [Why MongoDB Atlas?](#why-mongodb-atlas)
2. [Step 1: Create MongoDB Atlas Account](#step-1-create-mongodb-atlas-account)
3. [Step 2: Set Up Your Cluster](#step-2-set-up-your-cluster)
4. [Step 3: Configure Database Access](#step-3-configure-database-access)
5. [Step 4: Configure Network Access](#step-4-configure-network-access)
6. [Step 5: Get Connection String](#step-5-get-connection-string)
7. [Step 6: Install Dependencies](#step-6-install-dependencies)
8. [Step 7: Create MongoDB Client](#step-7-create-mongodb-client)
9. [Step 8: Update API Routes](#step-8-update-api-routes)
10. [Step 9: Environment Variables](#step-9-environment-variables)
11. [Step 10: Test Your Database](#step-10-test-your-database)
12. [Troubleshooting](#troubleshooting)

---

## Why MongoDB Atlas?

### ✅ Benefits

- **Free Forever**: 512MB storage, no credit card required
- **NoSQL Flexibility**: Easy to modify schema as your needs change
- **Global Distribution**: Fast access from anywhere
- **Automatic Backups**: Built-in data protection
- **Easy Scaling**: Upgrade when you need more
- **Great Documentation**: Extensive guides and support

### 📊 Perfect For

- Flexible data structures
- Rapid development
- Scalable applications

---

## Step 1: Create MongoDB Atlas Account

### 1.1 Sign Up (2 minutes)

1. **Go to MongoDB Atlas**:
   - Visit: <https://www.mongodb.com/cloud/atlas/register>

2. **Sign Up**:
   - Click **"Try Free"** or **"Start Free"**
   - Choose sign-up method:
     - **Email** (recommended): Enter email and create password
     - **Google**: Sign up with Google account
     - **GitHub**: Sign up with GitHub account

3. **Verify Email**:
   - Check your email inbox
   - Click verification link
   - Complete account setup

### 1.2 Complete Onboarding

1. **Tell us about yourself** (optional survey):
   - You can skip this or fill it out
   - Choose "Building a new application"
   - Click **Continue**

2. **Choose deployment option**:
   - Select **"M0 FREE"** (this is what we want!)
   - Click **Continue**

---

## Step 2: Set Up Your Cluster

### 2.1 Create Free Cluster (3 minutes)

1. **Deploy a cloud database**:
   - Click **"Build a Database"**
   - Or if you see options, select **"Create"**

2. **Choose FREE Tier**:
   - Select **"M0"** (Free tier)
   - Look for the **"FREE"** badge
   - Scroll down if you don't see it immediately

3. **Provider & Region**:
   - **Provider**: Choose **AWS** (Amazon Web Services) - most reliable
   - **Region**: Select closest to your users or yourself
     - Examples: `us-east-1` (US), `eu-west-1` (Europe), `ap-south-1` (Asia)
   - Keep **"M0 Sandbox"** selected

4. **Cluster Name**:
   - Default is usually `Cluster0`
   - Or rename to: `lum-studios` (optional)
   - Click **"Create"**

5. **Wait for Deployment**:
   - Takes 1-3 minutes
   - You'll see "Your cluster is being created..."
   - ☕ Take a quick break!

---

## Step 3: Configure Database Access

### 3.1 Create Database User (2 minutes)

**Important**: This is different from your MongoDB Atlas account!

1. **Security Quickstart** appears (or go to **Security** → **Database Access**):

2. **Create a database user**:
   - Authentication Method: **Password** (default)
   - Username: `lum_admin` (or any name you prefer)
   - Password: Click **"Autogenerate Secure Password"**
     - **IMPORTANT**: Copy this password immediately!
     - Save it somewhere safe (you'll need it soon)
     - Or create your own strong password

3. **Database User Privileges**:
   - Select **"Read and write to any database"**
   - Or choose **"Atlas Admin"** for full access

4. **Click "Create User"**

5. **Save Your Credentials**:

   ```
   Username: lum_admin
   Password: [your-password-here]
   ```

   ⚠️ **Save this now! You cannot view it again later!**

---

## Step 4: Configure Network Access

### 4.1 Whitelist IP Addresses (2 minutes)

MongoDB Atlas needs to know which IPs can connect to your database.

1. **Network Access** (or **Security** → **Network Access**):

2. **Add IP Address**:
   - Click **"Add IP Address"**

3. **For Development** (Testing locally):
   - Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (all IPs)
   - ⚠️ **This is fine for development, but restrict in production!**

4. **For Production** (Later):
   - Add specific Vercel IP addresses
   - Or use **"Add Current IP Address"**
   - For security, limit to specific IPs

5. **Confirm**:
   - Click **"Confirm"**
   - Wait for status to change to **"Active"** (green dot)

---

## Step 5: Get Connection String

### 5.1 Get MongoDB URI (3 minutes)

1. **Go to Database**:
   - Click **"Database"** in left sidebar
   - Or click **"Go to Databases"**

2. **Connect to Your Cluster**:
   - Find your cluster (e.g., `Cluster0` or `lum-studios`)
   - Click **"Connect"** button

3. **Choose Connection Method**:
   - Select **"Drivers"** (previously "Connect your application")
   - **Driver**: Node.js
   - **Version**: 5.5 or later (latest)

4. **Copy Connection String**:
   - You'll see something like:

   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Modify the Connection String**:

   **Original**:

   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

   **Replace**:
   - `<username>` → `lum_admin` (your database username)
   - `<password>` → Your actual password (from Step 3)
   - Add `/lum_studios` before the `?` (database name)

   **Final Result**:

   ```
   mongodb+srv://lum_admin:YourActualPassword123@cluster0.xxxxx.mongodb.net/lum_studios?retryWrites=true&w=majority
   ```

6. **Save This Connection String**:
   - You'll add it to `.env.local` soon
   - Keep it safe and **never commit it to GitHub!**

---

## Step 6: Install Dependencies

### 6.1 Install MongoDB Driver

Open your terminal in the project folder and run:

```bash
npm install mongodb
```

This installs the official MongoDB Node.js driver.

**Expected output**:

```
added 1 package, and audited X packages in Xs
```

---

## Step 7: Create MongoDB Client

### 7.1 Create Connection File

Create a new file: **`src/lib/mongodb.ts`**

```typescript
import { MongoClient, Db, Collection } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Check if MongoDB URI is configured
if (!process.env.MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection
  // across hot reloads (Next.js fast refresh)
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, create a new client for each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Database and collection names
export const DB_NAME = 'lum_studios';
export const BOOKINGS_COLLECTION = 'bookings';

// Booking document interface
export interface BookingDocument {
  id: string;
  date: string;
  timeSlots: string[];
  package: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// Helper function to get bookings collection
export async function getBookingsCollection(): Promise<Collection<BookingDocument>> {
  const client = await clientPromise;
  const db: Db = client.db(DB_NAME);
  return db.collection<BookingDocument>(BOOKINGS_COLLECTION);
}

// Create indexes for better performance (run once on first connection)
export async function createIndexes() {
  try {
    const collection = await getBookingsCollection();
    
    // Index on date for faster date queries
    await collection.createIndex({ date: 1 });
    
    // Index on status for filtering
    await collection.createIndex({ status: 1 });
    
    // Index on createdAt for sorting (descending)
    await collection.createIndex({ createdAt: -1 });
    
    // Compound index for date + status queries
    await collection.createIndex({ date: 1, status: 1 });
    
    console.log('✅ MongoDB indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}
```

**What this does**:

- ✅ Connects to MongoDB Atlas
- ✅ Reuses connection in development (faster)
- ✅ Provides type-safe collection access
- ✅ Creates performance indexes

---

## Step 8: Update API Routes

### 8.1 Update Main Bookings Route

**Replace the entire content of `src/app/api/bookings/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getBookingsCollection, createIndexes } from '@/lib/mongodb';
import { sendBookingConfirmation, sendAdminNotification } from '@/utils/email';

// Initialize indexes on first import
let indexesCreated = false;
async function ensureIndexes() {
  if (!indexesCreated) {
    await createIndexes();
    indexesCreated = true;
  }
}

// GET - Fetch all bookings or booked slots for a specific date
export async function GET(request: NextRequest) {
  try {
    await ensureIndexes();
    
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const collection = await getBookingsCollection();

    if (date) {
      // Return booked slots for a specific date
      const bookings = await collection
        .find({ date, status: 'confirmed' })
        .toArray();

      // Flatten all time slots and remove duplicates
      const bookedSlots = bookings
        .flatMap(booking => booking.timeSlots)
        .filter((slot, index, self) => self.indexOf(slot) === index);

      return NextResponse.json({ 
        success: true, 
        bookedSlots 
      });
    }

    // Return all bookings (for admin dashboard)
    const bookings = await collection
      .find({})
      .sort({ createdAt: -1 }) // Most recent first
      .toArray();

    return NextResponse.json({ 
      success: true, 
      bookings 
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST - Create a new booking
export async function POST(request: NextRequest) {
  try {
    await ensureIndexes();
    
    const body = await request.json();
    const { date, timeSlots, package: packageType, name, email, phone, message } = body;

    // Validate required fields
    if (!date || !timeSlots || !packageType || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const collection = await getBookingsCollection();

    // Check if any of the requested time slots are already booked
    const conflictingBooking = await collection.findOne({
      date,
      status: 'confirmed',
      timeSlots: { $in: timeSlots }
    });

    if (conflictingBooking) {
      return NextResponse.json(
        { success: false, error: 'Some time slots are already booked' },
        { status: 409 }
      );
    }

    // Create new booking document
    const newBooking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date,
      timeSlots,
      package: packageType,
      name,
      email,
      phone,
      message: message || '',
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Insert into MongoDB
    await collection.insertOne(newBooking);

    // Send email notifications
    try {
      await sendBookingConfirmation({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(', '),
        location: 'Location will be confirmed',
        phone,
        specialRequests: message
      });

      await sendAdminNotification({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(', '),
        location: 'Location will be confirmed',
        phone,
        specialRequests: message
      });
      
      console.log('✅ Email notifications sent successfully');
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError);
      // Continue even if email fails - booking is still created
    }

    return NextResponse.json({ 
      success: true, 
      booking: newBooking,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

### 8.2 Update Booking ID Route

**Replace the entire content of `src/app/api/bookings/[id]/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getBookingsCollection } from '@/lib/mongodb';

// PATCH - Update booking status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const collection = await getBookingsCollection();

    // Update the booking
    const result = await collection.findOneAndUpdate(
      { id: bookingId },
      { 
        $set: { 
          status, 
          updatedAt: new Date().toISOString() 
        } 
      },
      { returnDocument: 'after' } // Return updated document
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking status updated successfully',
      booking: result
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel a booking (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    const collection = await getBookingsCollection();
    
    // Soft delete by changing status to 'cancelled'
    const result = await collection.findOneAndUpdate(
      { id: bookingId },
      { 
        $set: { 
          status: 'cancelled', 
          updatedAt: new Date().toISOString() 
        } 
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking cancelled successfully',
      booking: result
    });
  } catch (error) {
    console.error('Error canceling booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
```

---

## Step 9: Environment Variables

### 9.1 Add to Local Environment

**Edit `.env.local`** and add your MongoDB connection string:

```bash
# MongoDB Atlas Connection
MONGODB_URI="mongodb+srv://lum_admin:YourPassword123@cluster0.xxxxx.mongodb.net/lum_studios?retryWrites=true&w=majority"

# Email Configuration (existing - keep these)
ADMIN_EMAIL_1=nwhator@gmail.com
ADMIN_EMAIL_2=hnxnddbwegyvwnwk
ADMIN_EMAIL=contact@thelumstudios.com

# SMTP Configuration (existing - keep these)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=nwhator@gmail.com
SMTP_PASSWORD=hnxnddbwegyvwnwk
EMAIL_FROM=LUM Studios <nwhator@gmail.com>

# Admin Authentication (existing - keep these)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Lum@Studio

# NextAuth Secret (existing - keep these)
NEXTAUTH_SECRET=lum-studio-secret-key-change-in-production
NEXTAUTH_URL=http://localhost:3000

# Site URL (existing - keep these)
NEXT_PUBLIC_SITE_URL=https://thelumstudios.com
```

**⚠️ IMPORTANT**:

- Replace the `MONGODB_URI` value with YOUR actual connection string
- Never commit `.env.local` to GitHub (it's already in `.gitignore`)
- Keep your password secure!

### 9.2 Add to Vercel (For Production)

When you deploy to Vercel:

1. Go to **Vercel Dashboard** → Your Project
2. Click **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environments**: Production, Preview, Development (check all)
4. Click **Save**
5. Redeploy your application

---

## Step 10: Test Your Database

### 10.1 Start Development Server

```bash
npm run dev
```

Wait for:

```
✓ Ready in Xs
○ Local:   http://localhost:3000
```

### 10.2 Test Booking Creation

1. **Open your browser**:
   - Go to: <http://localhost:3000/booking>

2. **Fill out the booking form**:
   - Select a package
   - Choose a date (today or future)
   - Select a time slot
   - Fill in your details:
     - Name: `Test User`
     - Email: `test@example.com`
     - Phone: `1234567890`

3. **Submit the form**:
   - Click submit
   - Should see success message

4. **Check MongoDB Atlas**:
   - Go to MongoDB Atlas dashboard
   - Click **Database** → **Browse Collections**
   - Select your cluster
   - You should see:
     - Database: `lum_studios`
     - Collection: `bookings`
     - Your test booking document!

### 10.3 Test Admin Dashboard

1. **Login**:
   - Go to: <http://localhost:3000/admin/login>
   - Username: `admin`
   - Password: `Lum@Studio`

2. **View Bookings**:
   - Should redirect to `/admin/bookings`
   - Your test booking should appear in the list!

3. **Test Actions**:
   - Click **"Mark Complete"** on your booking
   - Refresh MongoDB Atlas → status should be "completed"
   - Click **"Restore Booking"** → status back to "confirmed"
   - Click **"Cancel Booking"** → status becomes "cancelled"

### 10.4 Test Double-Booking Prevention

1. **Create another booking**:
   - Go back to `/booking`
   - Select **same date and time** as before

2. **Submit**:
   - Should see error: "Some time slots are already booked"
   - Booking should NOT be created

3. **Check in booking form**:
   - Select the date of your previous booking
   - The booked time slot should appear:
     - Red background
     - Strikethrough text
     - ⊗ icon
     - Cannot be clicked

### 10.5 Test Persistence

1. **Stop the server**:

   ```bash
   # Press Ctrl+C in terminal
   ```

2. **Start again**:

   ```bash
   npm run dev
   ```

3. **Check admin dashboard**:
   - Go to `/admin/bookings`
   - **Your bookings should still be there!** ✅
   - This proves data is persisted in MongoDB!

---

## Troubleshooting

### Connection Errors

**Error: "MongoServerError: bad auth"**

**Problem**: Wrong username or password

**Solution**:

1. Go to MongoDB Atlas → Security → Database Access
2. Verify your username (`lum_admin`)
3. Reset password if needed:
   - Click "Edit" on user
   - Click "Edit Password"
   - Generate new password
   - Update `.env.local` with new password

---

**Error: "connect ETIMEDOUT" or "connection timeout"**

**Problem**: IP not whitelisted or network issue

**Solution**:

1. Go to MongoDB Atlas → Security → Network Access
2. Check if your current IP is listed
3. Add "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Wait 1-2 minutes for changes to take effect
5. Restart your dev server

---

**Error: "Please add MONGODB_URI to .env.local"**

**Problem**: Environment variable not set

**Solution**:

1. Check `.env.local` exists in project root
2. Verify `MONGODB_URI=` line is present
3. Make sure connection string is in quotes
4. Restart dev server (`npm run dev`)

---

### Data Not Appearing

**Bookings don't show in admin dashboard**

**Solutions**:

1. **Check MongoDB Atlas**:
   - Go to Database → Browse Collections
   - Verify `lum_studios` database exists
   - Verify `bookings` collection has documents

2. **Check console for errors**:
   - Open browser dev tools (F12)
   - Look for red errors
   - Check terminal for server errors

3. **Verify API is working**:
   - Go to: <http://localhost:3000/api/bookings>
   - Should see JSON response with bookings array

---

### Slow Queries

**Database feels slow**

**Solutions**:

1. **Indexes not created**: Run this once:

   ```bash
   # In browser console or test file
   await createIndexes()
   ```

2. **Too many documents**: Free tier has limits
   - M0 Free tier: 512MB storage
   - If you hit limits, consider upgrading

3. **Region too far**: Choose closer region
   - Go to Atlas → Create new cluster
   - Select region closer to you

---

### Schema/Type Errors

**Error: "Property 'timeSlots' does not exist"**

**Problem**: MongoDB stores data as-is, no schema enforcement

**Solution**:

- Our code uses `timeSlots` (camelCase) consistently
- Check your booking creation code
- Verify the field name matches exactly

---

## 🎉 Success Checklist

After completing all steps, verify:

- ✅ MongoDB Atlas cluster created and running
- ✅ Database user created with password
- ✅ IP address whitelisted (0.0.0.0/0 for dev)
- ✅ Connection string copied and added to `.env.local`
- ✅ `mongodb` package installed
- ✅ `src/lib/mongodb.ts` file created
- ✅ API routes updated (route.ts and [id]/route.ts)
- ✅ Can create bookings from booking form
- ✅ Bookings appear in MongoDB Atlas dashboard
- ✅ Bookings appear in admin dashboard
- ✅ Can update booking status (complete/cancel/restore)
- ✅ Double-booking prevention works (shows error + disabled slots)
- ✅ Data persists after server restart

---

## What You've Accomplished

🎊 **Congratulations!** You now have:

1. ✅ **Persistent Database** - Bookings saved forever in MongoDB Atlas
2. ✅ **Cloud Storage** - Data accessible from anywhere
3. ✅ **Scalable Solution** - Can handle thousands of bookings
4. ✅ **Free Hosting** - 512MB free forever
5. ✅ **Automatic Backups** - MongoDB handles this for you
6. ✅ **Production Ready** - Ready to deploy to Vercel

---

## Next Steps

### For Production Deployment

1. **Update Network Access**:
   - Remove "0.0.0.0/0" (allow anywhere)
   - Add specific Vercel IP addresses
   - Or use Vercel's static outbound IPs

2. **Add to Vercel**:
   - Go to Vercel → Project → Settings → Environment Variables
   - Add `MONGODB_URI` with your connection string
   - Deploy!

3. **Monitor Usage**:
   - Check MongoDB Atlas dashboard
   - Monitor storage usage (512MB limit on free tier)
   - Upgrade if needed

4. **Security**:
   - Create separate users for dev/production
   - Use different passwords
   - Restrict IP access in production

---

## Additional Resources

- 📖 **MongoDB Atlas Docs**: <https://docs.atlas.mongodb.com/>
- 💡 **MongoDB Node.js Driver**: <https://mongodb.github.io/node-mongodb-native/>
- 🎓 **MongoDB University**: <https://university.mongodb.com/> (free courses)
- 💬 **MongoDB Community**: <https://community.mongodb.com/>

---

**Need Help?**

- Check error messages carefully - they usually tell you what's wrong
- Review each step to make sure nothing was skipped
- MongoDB Atlas has excellent documentation and support

**🌟 Your LUM Studios booking system now has professional, scalable database storage! 🌟**

---

## Option A: Vercel Postgres (Recommended)

### Step 1: Create Database on Vercel

1. **Go to Vercel Dashboard**:
   - Visit: <https://vercel.com/dashboard>
   - Select your project (or create one)

2. **Create Postgres Database**:
   - Click **Storage** tab
   - Click **Create Database**
   - Select **Postgres**
   - Choose region closest to your users
   - Click **Create**

3. **Get Connection String**:
   - After creation, go to **Settings** → **Environment Variables**
   - Vercel automatically adds these variables:

     ```
     POSTGRES_URL
     POSTGRES_PRISMA_URL
     POSTGRES_URL_NON_POOLING
     ```

   - Copy `POSTGRES_URL` for local development

### Step 2: Install Dependencies

```bash
npm install @vercel/postgres
```

### Step 3: Create Database Schema

Create file: `src/lib/db-schema.sql`

```sql
-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(255) PRIMARY KEY,
  date DATE NOT NULL,
  time_slots JSONB NOT NULL,
  package VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_booking UNIQUE (date, time_slots)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### Step 4: Run Schema (One-Time Setup)

Create file: `src/scripts/init-db.ts`

```typescript
import { sql } from '@vercel/postgres';

async function initDatabase() {
  try {
    console.log('Creating bookings table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(255) PRIMARY KEY,
        date DATE NOT NULL,
        time_slots JSONB NOT NULL,
        package VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Creating indexes...');
    
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC)`;

    console.log('✅ Database initialized successfully!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

initDatabase();
```

**Run it once**:

```bash
# Add to .env.local first:
POSTGRES_URL="your-connection-string-from-vercel"

# Then run:
npx tsx src/scripts/init-db.ts
```

### Step 5: Update API Routes

**Update `src/app/api/bookings/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { sendBookingConfirmation, sendAdminNotification } from '@/utils/email';

// Type definition for booking
interface Booking {
  id: string;
  date: string;
  time_slots: string[]; // Changed from timeSlots to match DB column
  package: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

// GET - Fetch all bookings or booked slots for a specific date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (date) {
      // Return booked slots for a specific date
      const { rows } = await sql`
        SELECT time_slots 
        FROM bookings 
        WHERE date = ${date} 
        AND status = 'confirmed'
      `;

      // Flatten all time slots and remove duplicates
      const bookedSlots = rows
        .flatMap(row => row.time_slots)
        .filter((slot, index, self) => self.indexOf(slot) === index);

      return NextResponse.json({ 
        success: true, 
        bookedSlots 
      });
    }

    // Return all bookings (for admin)
    const { rows } = await sql`
      SELECT * FROM bookings 
      ORDER BY created_at DESC
    `;

    // Convert time_slots to timeSlots for frontend compatibility
    const bookings = rows.map(row => ({
      ...row,
      timeSlots: row.time_slots,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));

    return NextResponse.json({ 
      success: true, 
      bookings 
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, timeSlots, package: packageType, name, email, phone, message } = body;

    // Validate required fields
    if (!date || !timeSlots || !packageType || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slots are already booked
    const { rows: conflicts } = await sql`
      SELECT id FROM bookings 
      WHERE date = ${date} 
      AND status = 'confirmed'
      AND time_slots::jsonb ?| ${timeSlots}
    `;

    if (conflicts.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Some time slots are already booked' },
        { status: 409 }
      );
    }

    // Create new booking
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const { rows } = await sql`
      INSERT INTO bookings (
        id, date, time_slots, package, name, email, phone, message, status
      ) VALUES (
        ${bookingId}, 
        ${date}, 
        ${JSON.stringify(timeSlots)}::jsonb, 
        ${packageType}, 
        ${name}, 
        ${email}, 
        ${phone}, 
        ${message || ''}, 
        'confirmed'
      )
      RETURNING *
    `;

    const newBooking = rows[0];

    // Send email notifications
    try {
      await sendBookingConfirmation({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(', '),
        location: 'Location will be confirmed',
        phone,
        specialRequests: message
      });

      await sendAdminNotification({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(', '),
        location: 'Location will be confirmed',
        phone,
        specialRequests: message
      });
      
      console.log('Email notifications sent successfully');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      booking: {
        ...newBooking,
        timeSlots: newBooking.time_slots,
        createdAt: newBooking.created_at,
        updatedAt: newBooking.updated_at
      },
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

**Update `src/app/api/bookings/[id]/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// PATCH - Update booking status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update booking
    const { rows } = await sql`
      UPDATE bookings 
      SET status = ${status}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${bookingId}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    const updatedBooking = rows[0];

    return NextResponse.json({ 
      success: true, 
      message: 'Booking status updated successfully',
      booking: {
        ...updatedBooking,
        timeSlots: updatedBooking.time_slots,
        createdAt: updatedBooking.created_at,
        updatedAt: updatedBooking.updated_at
      }
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel a booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    
    // Soft delete by setting status to cancelled
    const { rows } = await sql`
      UPDATE bookings 
      SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${bookingId}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    const cancelledBooking = rows[0];

    return NextResponse.json({ 
      success: true, 
      message: 'Booking cancelled successfully',
      booking: {
        ...cancelledBooking,
        timeSlots: cancelledBooking.time_slots,
        createdAt: cancelledBooking.created_at,
        updatedAt: cancelledBooking.updated_at
      }
    });
  } catch (error) {
    console.error('Error canceling booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
```

### Step 6: Add to Environment Variables

**Local Development** (`.env.local`):

```bash
POSTGRES_URL="postgres://user:pass@host/db"
```

**Production** (Vercel Dashboard):

1. Go to project → Settings → Environment Variables
2. Vercel should auto-add `POSTGRES_URL` after creating database
3. If not, add it manually

### Step 7: Test Migration

```bash
# 1. Run the init script
npx tsx src/scripts/init-db.ts

# 2. Start dev server
npm run dev

# 3. Test booking creation
# Go to http://localhost:3000/booking
# Create a test booking

# 4. Check admin dashboard
# Go to http://localhost:3000/admin/login
# Login and verify booking appears

# 5. Test double-booking
# Try to book the same date/time again
# Should show error message
```

---

## Option B: Supabase (Free Forever)

### Step 1: Create Supabase Project

1. **Sign Up**:
   - Go to: <https://supabase.com>
   - Click "Start your project"
   - Sign up with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Name: `lum-studios-bookings`
   - Database Password: (generate strong password)
   - Region: Choose closest to your users
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get API Keys**:
   - Go to **Settings** → **API**
   - Copy:
     - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon/public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` key → `SUPABASE_SERVICE_KEY`

### Step 2: Install Dependencies

```bash
npm install @supabase/supabase-js
```

### Step 3: Create Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste this SQL:

```sql
-- Create bookings table
CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL,
  time_slots JSONB NOT NULL,
  package TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now - restrict later)
CREATE POLICY "Allow all access to bookings" 
ON bookings FOR ALL 
USING (true);

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

4. Click **Run** (or press Ctrl+Enter)

### Step 4: Create Supabase Client

Create file: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type for database
export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          date: string;
          time_slots: string[];
          package: string;
          name: string;
          email: string;
          phone: string;
          message: string | null;
          status: 'confirmed' | 'cancelled' | 'completed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          date: string;
          time_slots: string[];
          package: string;
          name: string;
          email: string;
          phone: string;
          message?: string;
          status?: string;
        };
        Update: {
          status?: string;
          updated_at?: string;
        };
      };
    };
  };
}
```

### Step 5: Update API Routes (Supabase Version)

**Update `src/app/api/bookings/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendBookingConfirmation, sendAdminNotification } from '@/utils/email';

// GET - Fetch all bookings or booked slots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (date) {
      // Get booked slots for date
      const { data, error } = await supabase
        .from('bookings')
        .select('time_slots')
        .eq('date', date)
        .eq('status', 'confirmed');

      if (error) throw error;

      const bookedSlots = data
        .flatMap(row => row.time_slots)
        .filter((slot, index, self) => self.indexOf(slot) === index);

      return NextResponse.json({ success: true, bookedSlots });
    }

    // Get all bookings
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Convert to frontend format
    const bookings = data.map(row => ({
      ...row,
      timeSlots: row.time_slots,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST - Create booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, timeSlots, package: packageType, name, email, phone, message } = body;

    // Validate
    if (!date || !timeSlots || !packageType || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check for conflicts
    const { data: conflicts } = await supabase
      .from('bookings')
      .select('id')
      .eq('date', date)
      .eq('status', 'confirmed')
      .contains('time_slots', timeSlots);

    if (conflicts && conflicts.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Some time slots are already booked' },
        { status: 409 }
      );
    }

    // Create booking
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        id: bookingId,
        date,
        time_slots: timeSlots,
        package: packageType,
        name,
        email,
        phone,
        message: message || '',
        status: 'confirmed'
      })
      .select()
      .single();

    if (error) throw error;

    // Send emails
    try {
      await sendBookingConfirmation({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(', '),
        location: 'Location will be confirmed',
        phone,
        specialRequests: message
      });

      await sendAdminNotification({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(', '),
        location: 'Location will be confirmed',
        phone,
        specialRequests: message
      });
    } catch (emailError) {
      console.error('Email failed:', emailError);
    }

    return NextResponse.json({ 
      success: true, 
      booking: {
        ...data,
        timeSlots: data.time_slots,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      },
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

**Update `src/app/api/bookings/[id]/route.ts`** (similar pattern)

### Step 6: Environment Variables

**`.env.local`**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
```

**Vercel** (add same variables to dashboard)

---

## Option C: MongoDB Atlas (NoSQL)

### Step 1: Create MongoDB Cluster

1. **Sign Up**:
   - Go to: <https://www.mongodb.com/cloud/atlas>
   - Sign up (free)

2. **Create Cluster**:
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select region
   - Click "Create"

3. **Setup Access**:
   - **Database Access**: Create user with password
   - **Network Access**: Add IP (0.0.0.0/0 for development)

4. **Get Connection String**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password

### Step 2: Install Dependencies

```bash
npm install mongodb
```

### Step 3: Create MongoDB Client

Create file: `src/lib/mongodb.ts`

```typescript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add MONGODB_URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development, use global variable to preserve across hot reloads
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, create new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Database and collection names
export const DB_NAME = 'lum_studios';
export const BOOKINGS_COLLECTION = 'bookings';

// Helper to get bookings collection
export async function getBookingsCollection() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(BOOKINGS_COLLECTION);
}
```

### Step 4: Update API Routes (MongoDB Version)

**Update `src/app/api/bookings/route.ts`**:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getBookingsCollection } from '@/lib/mongodb';
import { sendBookingConfirmation, sendAdminNotification } from '@/utils/email';

// GET
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const collection = await getBookingsCollection();

    if (date) {
      const bookings = await collection
        .find({ date, status: 'confirmed' })
        .toArray();

      const bookedSlots = bookings
        .flatMap(b => b.timeSlots)
        .filter((slot, index, self) => self.indexOf(slot) === index);

      return NextResponse.json({ success: true, bookedSlots });
    }

    const bookings = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ 
      success: true, 
      bookings: bookings.map(b => ({ ...b, _id: b._id.toString() }))
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, timeSlots, package: packageType, name, email, phone, message } = body;

    if (!date || !timeSlots || !packageType || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const collection = await getBookingsCollection();

    // Check conflicts
    const conflicts = await collection.findOne({
      date,
      status: 'confirmed',
      timeSlots: { $in: timeSlots }
    });

    if (conflicts) {
      return NextResponse.json(
        { success: false, error: 'Some time slots are already booked' },
        { status: 409 }
      );
    }

    // Create booking
    const newBooking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date,
      timeSlots,
      package: packageType,
      name,
      email,
      phone,
      message: message || '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await collection.insertOne(newBooking);

    // Send emails...

    return NextResponse.json({ 
      success: true, 
      booking: newBooking,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

### Step 5: Environment Variables

**`.env.local`**:

```bash
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/lum_studios?retryWrites=true&w=majority"
```

---

## Testing Your Database

### Test Checklist

```bash
# 1. Create a booking
✅ Go to /booking
✅ Fill form and submit
✅ Check success message

# 2. Verify in database
✅ Vercel Postgres: Check Vercel dashboard → Data tab
✅ Supabase: Check Table Editor
✅ MongoDB: Check Collections in Atlas

# 3. Check admin dashboard
✅ Login at /admin/login
✅ Verify booking appears
✅ Check all details correct

# 4. Test double-booking prevention
✅ Try to book same date/time
✅ Should show error

# 5. Test admin actions
✅ Mark booking as complete
✅ Cancel booking
✅ Restore booking
✅ Verify database updates

# 6. Restart server
✅ Stop and restart dev server
✅ Check if bookings still exist (should persist!)
```

---

## Troubleshooting

### Connection Issues

**Error: "Failed to connect to database"**

```bash
# Check:
1. Is POSTGRES_URL/MONGODB_URI in .env.local?
2. Is the connection string correct?
3. Is your IP whitelisted (MongoDB/Supabase)?
4. Restart dev server after adding env vars
```

### Schema Issues

**Error: "relation 'bookings' does not exist"**

```bash
# Run init script:
npx tsx src/scripts/init-db.ts

# Or create table manually in dashboard
```

### Type Errors

**Error: "Property 'time_slots' does not exist"**

```bash
# Database uses snake_case (time_slots)
# Frontend uses camelCase (timeSlots)
# Always convert in API:
timeSlots: row.time_slots
```

---

## 🎉 Success

After migration, you'll have:

- ✅ Persistent storage (survives server restarts)
- ✅ Scalable database (handles many bookings)
- ✅ Production-ready (can deploy to Vercel)
- ✅ Real-time conflict detection
- ✅ Data backup (automatic with all services)

---

## Next Steps

1. **Choose your database** (Vercel Postgres recommended)
2. **Follow the steps above** for your choice
3. **Test thoroughly** before deploying
4. **Deploy to Vercel** with environment variables
5. **Done!** 🚀

---

**Need Help?** Check the error messages carefully - they usually tell you exactly what's wrong!

**Pro Tip**: Start with Vercel Postgres for the easiest setup. You can always migrate to another database later if needed.
