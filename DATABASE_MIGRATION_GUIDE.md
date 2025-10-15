# 🗄️ Database Migration Guide - LUM Studios

## Complete Step-by-Step Tutorial

**Current Status**: In-memory storage (resets on server restart)  
**Goal**: Persistent database storage (Vercel Postgres, Supabase, or MongoDB)

---

## 📋 Table of Contents

1. [Choose Your Database](#choose-your-database)
2. [Option A: Vercel Postgres (Recommended)](#option-a-vercel-postgres-recommended)
3. [Option B: Supabase (Free Forever)](#option-b-supabase-free-forever)
4. [Option C: MongoDB Atlas (NoSQL)](#option-c-mongodb-atlas-nosql)
5. [Testing Your Database](#testing-your-database)
6. [Troubleshooting](#troubleshooting)

---

## Choose Your Database

### Comparison Table

| Feature | Vercel Postgres | Supabase | MongoDB Atlas |
|---------|----------------|----------|---------------|
| **Cost** | Free tier (60 hours/month) | Free forever | Free forever |
| **Type** | PostgreSQL (SQL) | PostgreSQL (SQL) | NoSQL (Documents) |
| **Setup Time** | 5 minutes | 10 minutes | 10 minutes |
| **Best For** | Vercel deployments | Scalability | Flexibility |
| **Integration** | Seamless with Vercel | Easy REST API | Mongoose ORM |
| **Learning Curve** | Easy | Easy | Medium |

### Recommendation

**For Vercel deployment**: Choose **Vercel Postgres** (easiest integration)  
**For maximum free tier**: Choose **Supabase** (unlimited free storage)  
**For flexibility**: Choose **MongoDB** (NoSQL, great for changing schemas)

---

## Option A: Vercel Postgres (Recommended)

### Step 1: Create Database on Vercel

1. **Go to Vercel Dashboard**:
   - Visit: https://vercel.com/dashboard
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
   - Go to: https://supabase.com
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
   - Go to: https://www.mongodb.com/cloud/atlas
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

## 🎉 Success!

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
