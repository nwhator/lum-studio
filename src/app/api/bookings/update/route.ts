import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * PATCH /api/bookings/update
 * Updates booking status or payment confirmation
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

    const updates: any = {};
    if (status) updates.status = status;
    if (typeof payment_confirmed === 'boolean') updates.payment_confirmed = payment_confirmed;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
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
