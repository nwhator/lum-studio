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

-- Fix RLS policies to allow updates and deletes with anon key
-- (Admin authentication is handled at the API level, not database level)

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can delete bookings" ON bookings;

-- Recreate with anon access (admin auth is at API layer)
CREATE POLICY "Anyone can update bookings" 
ON bookings FOR UPDATE 
TO anon, authenticated 
USING (true);

CREATE POLICY "Anyone can delete bookings" 
ON bookings FOR DELETE 
TO anon, authenticated 
USING (true);

