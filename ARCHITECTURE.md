# System Architecture - Supabase Booking System

## Architecture Overview

```md
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                          │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │  Booking Page   │  │   Admin Login    │  │ Admin Dashboard│ │
│  │  /booking       │  │  /admin/login    │  │ /admin/dashboard│ │
│  └────────┬────────┘  └────────┬─────────┘  └────────┬───────┘ │
└───────────┼──────────────────────┼──────────────────────┼────────┘
            │                      │                      │
            ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js API Routes (Serverless)              │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐  │
│  │/api/bookings/│  │/api/slots/   │  │/api/admin/login     │  │
│  │  create      │  │  available   │  └──────────┬──────────┘  │
│  └──────┬───────┘  └──────┬───────┘             │             │
│  ┌──────────────┐  ┌──────────────┐             │             │
│  │/api/bookings/│  │/api/bookings/│             │             │
│  │  list        │  │  update      │             │             │
│  └──────┬───────┘  └──────┬───────┘             │             │
└─────────┼──────────────────┼─────────────────────┼──────────────┘
          │                  │                     │
          │                  │                     │
          ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Supabase (Cloud Backend)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                     │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │  bookings table                                    │  │  │
│  │  │  - id, name, email, phone, service                 │  │  │
│  │  │  - date, time, status, payment_confirmed           │  │  │
│  │  │  - notes, package_info, created_at, updated_at     │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  │                                                            │  │
│  │  Row Level Security (RLS) Policies:                       │  │
│  │  ✓ Public can INSERT (create bookings)                   │  │
│  │  ✓ Public can SELECT (check availability)                │  │
│  │  ✓ Authenticated can UPDATE/DELETE                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Authentication (Supabase Auth)                          │  │
│  │  - Admin user management                                 │  │
│  │  - JWT token-based authentication                        │  │
│  │  - Session management                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
          │
          ├─────────────────────────────────────┐
          │                                     │
          ▼                                     ▼
┌───────────────────────┐           ┌────────────────────────┐
│   Email Service       │           │   WhatsApp Service     │
│   (Gmail SMTP)        │           │   (wa.me links)        │
│                       │           │                        │
│  Sends to:            │           │  Pre-filled message    │
│  - Admin (new booking)│           │  - Customer details    │
│  - Customer (confirm) │           │  - Booking info        │
└───────────────────────┘           └────────────────────────┘
```

## Data Flow Diagrams

### 1. Customer Booking Flow

```md
Customer visits /booking
        │
        ├─ Selects: date, time, service, package
        │
        ├─ Fills: name, email, phone, notes
        │
        ├─ Provides payment details (optional)
        │
        ▼
POST /api/bookings/create
        │
        ├─ Validates required fields
        │
        ├─ Checks slot availability (Supabase query)
        │   │
        │   ├─ If booked → Return 409 error
        │   │
        │   └─ If available → Continue
        │
        ├─ Inserts booking into Supabase
        │   │
        │   └─ Status: 'confirmed' if payment provided, else 'pending'
        │
        ├─ Sends email to admin (async)
        │
        ├─ Sends email to customer if confirmed (async)
        │
        ├─ Generates WhatsApp link with formatted message
        │
        └─ Returns: { success, booking, waLink }
                │
                └─ Customer clicks WhatsApp link → Opens WhatsApp
```

### 2. Admin Workflow

```md
Admin visits /admin/login
        │
        ├─ Enters email & password
        │
        ▼
POST /api/admin/login
        │
        ├─ Authenticates with Supabase Auth
        │
        ├─ Returns JWT token + user info
        │
        └─ Stores token in localStorage
                │
                └─ Redirects to /admin/dashboard
                        │
                        ▼
                GET /api/bookings/list?status=all
                        │
                        ├─ Fetches bookings from Supabase
                        │
                        └─ Returns bookings array
                                │
                                └─ Dashboard displays:
                                    - Statistics cards
                                    - Filter buttons
                                    - Bookings table
                                    - Action buttons
```

### 3. Slot Availability Check

```md
Customer selects date on /booking
        │
        ▼
GET /api/slots/available?date=2025-11-15
        │
        ├─ Queries Supabase for bookings on that date
        │   WHERE status IN ('pending', 'confirmed')
        │
        ├─ Extracts booked times
        │
        ├─ Compares with all available slots
        │
        └─ Returns: { availableSlots, bookedSlots }
                │
                └─ UI disables booked time slots
```

### 4. Admin Updates Booking

```md
Admin clicks "Confirm" on pending booking
        │
        ▼
PATCH /api/bookings/update
        │
        ├─ Body: { id, status: 'confirmed' }
        │
        ├─ Updates booking in Supabase
        │
        ├─ Returns updated booking
        │
        └─ Dashboard refreshes
                │
                └─ Booking now shows "confirmed" badge
```

## Component Integration

### Frontend Components

```md
src/app/
├── booking/
│   └── page.tsx ──────────┐
│                           │ Calls create API
│                           ▼
├── admin/
│   ├── login/
│   │   └── new-page.tsx ──┐
│   │                       │ Calls login API
│   │                       ▼
│   └── dashboard/
│       └── page.tsx ──────┐
│                           │ Calls list & update APIs
│                           ▼
└── api/
    ├── bookings/
    │   ├── create/route.ts ◄──── Uses supabase client
    │   ├── list/route.ts   ◄──── Uses supabase client
    │   └── update/route.ts ◄──── Uses supabase client
    ├── slots/
    │   └── available/route.ts ◄─ Uses supabase client
    └── admin/
        └── login/route.ts ◄────── Uses supabase auth
```

### Backend Services

```md
src/lib/
├── supabase.ts ─────┐
│                    │ Exports:
│                    ├─ supabase (client)
│                    ├─ getSupabaseAdmin()
│                    └─ Booking type
│
└── email.ts ────────┐
                     │ Exports:
                     ├─ sendBookingNotification()
                     └─ sendCustomerConfirmation()
```

## Security Architecture

### Public Access (No Auth Required)

- Create bookings (`/api/bookings/create`)
- Check slot availability (`/api/slots/available`)

### Authenticated Access (Admin Only)

- List bookings (`/api/bookings/list`)
- Update bookings (`/api/bookings/update`)
- Admin dashboard (`/admin/dashboard`)

### Row Level Security (Supabase)

```sql
-- Public can create bookings
CREATE POLICY "Anyone can create bookings" 
ON bookings FOR INSERT TO anon WITH CHECK (true);

-- Public can read (for availability checks)
CREATE POLICY "Anyone can read bookings" 
ON bookings FOR SELECT TO anon USING (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update bookings" 
ON bookings FOR UPDATE TO authenticated USING (true);
```

### API Key Management

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Client-side (safe to expose)
- `SUPABASE_SERVICE_ROLE_KEY` → Server-side only (never expose)
- `SMTP_PASS` → Server-side only (Gmail app password)

## Deployment Architecture

### Netlify Serverless Functions

```md
Next.js API Routes → Netlify Functions
        │
        ├─ Each API route becomes a serverless function
        ├─ No persistent filesystem (stateless)
        ├─ Environment variables injected at build time
        └─ Cold starts handled by Netlify

Supabase Connection
        │
        ├─ Connection pooling (built-in to Supabase)
        ├─ No connection limits (serverless-optimized)
        └─ Global CDN edge functions
```

### Environment Flow

```md
Development (.env.local)
        │
        └─ Local testing with Supabase dev project

Production (Netlify Environment Variables)
        │
        ├─ NEXT_PUBLIC_* → Available client-side
        └─ Secret keys → Server-side only
```

## Performance Optimizations

### Database Indexes

```sql
CREATE INDEX idx_bookings_date ON bookings(date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
```

### Caching Strategy

- Slot availability: Can be cached per date (invalidate on new booking)
- Booking list: Real-time (no caching needed)
- Static assets: Netlify CDN caching

### Email Optimization

- Non-blocking sends (doesn't delay API response)
- Fails gracefully (booking succeeds even if email fails)

---

**Legend:**

- `┌─┐` Containers/Services
- `│` Connections
- `▼` Data flow direction
- `◄──` Import/Usage relationships
