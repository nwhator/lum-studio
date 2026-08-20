import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, getSupabaseServerClient } from '@/lib/supabase';

/**
 * GET /api/bookings/list
 * Returns all bookings (admin access)
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        bookings: [],
        message: 'Supabase database is not configured.',
      });
    }

    const client = getSupabaseServerClient() || supabase;
    let query = client
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by status if provided
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: bookings, error } = await query;

    if (error) {
      console.warn('Error fetching bookings from Supabase:', error.message || error);
      return NextResponse.json({
        success: true,
        bookings: [],
        error: error.message,
      });
    }

    return NextResponse.json({
      success: true,
      bookings: bookings || [],
    });

  } catch (error) {
    console.error('Error in bookings list:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
