import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, getSupabaseServerClient } from '@/lib/supabase';

/**
 * GET /api/slots/available?date=YYYY-MM-DD
 * Returns available time slots for a specific date
 */
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { success: false, error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const allSlots = [
      '09:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '01:00 PM',
      '02:00 PM',
      '03:00 PM',
      '04:00 PM',
      '05:00 PM',
      '06:00 PM',
    ];

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: true,
        availableSlots: allSlots,
        bookedSlots: [],
      });
    }

    const client = getSupabaseServerClient() || supabase;
    // Fetch all confirmed or pending bookings for this date
    const { data: bookings, error } = await client
      .from('bookings')
      .select('time')
      .eq('date', date)
      .in('status', ['pending', 'confirmed']);

    if (error) {
      console.warn('Database error fetching booked slots (returning all available):', error.message || error);
      return NextResponse.json({
        success: true,
        availableSlots: allSlots,
        bookedSlots: [],
      });
    }

    // Extract booked times
    const bookedTimes = bookings?.map(b => b.time) || [];

    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    return NextResponse.json({
      success: true,
      availableSlots,
      bookedSlots: bookedTimes,
    });

  } catch (error) {
    console.error('Error in slots availability:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
