import { createClient } from '@supabase/supabase-js';

// Supabase client for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only throw error at runtime, not during build
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('Missing Supabase environment variables');
}

export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (supabaseUrl.includes('placeholder') || supabaseUrl.includes('your-project-id')) return false;
  if (supabaseAnonKey.includes('placeholder') || supabaseAnonKey.includes('your-anon-key')) return false;
  return true;
};

// Create client with fallback values for build time
export const supabase = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-key'
);

// For server operations (prefers service role key to bypass RLS, falls back to anon key or null)
export const getSupabaseServerClient = () => {
  if (!isSupabaseConfigured()) return null;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey && !serviceRoleKey.includes('placeholder') && !serviceRoleKey.includes('your-service-role')) {
    return createClient(supabaseUrl, serviceRoleKey);
  }
  return supabase;
};

// For admin operations with service role key (bypasses RLS)
export const getSupabaseAdmin = () => {
  return getSupabaseServerClient();
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
