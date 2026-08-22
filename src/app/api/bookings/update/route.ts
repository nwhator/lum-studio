import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, getSupabaseServerClient } from '@/lib/supabase';
import { sendStatusChangeNotification } from '@/lib/email';

/**
 * PATCH /api/bookings/update
 * Updates booking status or payment confirmation
 * Sends email notification when status changes to confirmed or cancelled
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, payment_confirmed } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing booking ID' },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Database is not configured' },
        { status: 500 }
      );
    }

    const client = getSupabaseServerClient() || supabase;

    // Fetch current booking data before update (to get email for notification)
    const { data: currentBooking, error: fetchError } = await client
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !currentBooking) {
      console.error('Error fetching booking:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    const updates: any = {};
    if (status) updates.status = status;
    if (typeof payment_confirmed === 'boolean') updates.payment_confirmed = payment_confirmed;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await client
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to update booking', 
          details: error.message || 'Unknown error',
          code: error.code 
        },
        { status: 500 }
      );
    }

    // Send email notification when status changes to confirmed or cancelled
    if (status && (status === 'confirmed' || status === 'cancelled') && currentBooking.email) {
      const dateStr = currentBooking.date || data.date;
      const timeStr = currentBooking.time || data.time;
      const serviceStr = currentBooking.service || data.service || 'Photography Session';

      sendStatusChangeNotification({
        name: currentBooking.name || 'Valued Customer',
        email: currentBooking.email,
        service: serviceStr,
        date: dateStr,
        time: timeStr,
        status: status as 'confirmed' | 'cancelled',
      }).catch((err) => console.error('Status change email failed:', err));
    }

    return NextResponse.json({
      success: true,
      booking: data,
      message: 'Booking updated successfully',
    });

  } catch (error) {
    console.error('Error in booking update:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
