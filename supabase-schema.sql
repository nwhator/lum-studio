-- =======================================================
-- LUM STUDIOS - SUPABASE DATABASE SCHEMA
-- Table: bookings
-- =======================================================

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    payment_confirmed BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    package_info JSONB,
    package_type TEXT,
    num_looks INT,
    images_edited INT,
    images_unedited INT,
    total_cost NUMERIC,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create indices for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings (date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- Allow anyone (public/anon) to read bookings to check slot availability
CREATE POLICY "Allow public read for availability"
    ON public.bookings
    FOR SELECT
    USING (true);

-- Allow anyone (public/anon) to insert new bookings from the booking form
CREATE POLICY "Allow public insert bookings"
    ON public.bookings
    FOR INSERT
    WITH CHECK (true);

-- Allow service role full access for admin operations (updates, deletes)
CREATE POLICY "Allow service role full access"
    ON public.bookings
    FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');
