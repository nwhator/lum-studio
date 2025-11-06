import { createClient } from '@supabase/supabase-js';

// Supabase client for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only throw error at runtime, not during build
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('Missing Supabase environment variables');
}

// Create client with fallback values for build time
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// For admin operations with service role key (bypasses RLS)
export const getSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    // During build time, return a dummy client
    if (typeof window === 'undefined' && !serviceRoleKey) {
      return createClient(
        supabaseUrl || 'https://placeholder.supabase.co',
        'placeholder-key'
      );
    }
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY for admin operations');
  }
  
  return createClient(supabaseUrl, serviceRoleKey);
};

// Database types for TypeScript
export type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  payment_confirmed: boolean;
  notes?: string;
  package_info?: any;
  created_at: string;
  updated_at?: string;
};
