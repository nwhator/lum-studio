import { NextRequest, NextResponse } from 'next/server';

// Import the bookings array from the main route
// In production, this would use a database
// For development, we need to share the same in-memory storage
const getBookingsStore = () => {
  if (typeof global !== 'undefined') {
    if (!(global as any).bookings) {
      (global as any).bookings = [];
    }
    return (global as any).bookings;
  }
  return [];
};

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

    // Get bookings from global store
    const bookings = getBookingsStore();
    
    // Find and update the booking
    const bookingIndex = bookings.findIndex((b: any) => b.id === bookingId);
    if (bookingIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    bookings[bookingIndex].status = status;
    bookings[bookingIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({ 
      success: true, 
      message: 'Booking status updated successfully',
      booking: bookings[bookingIndex]
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel a booking (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    
    // Get bookings from global store
    const bookings = getBookingsStore();
    
    // Find and mark as cancelled
    const bookingIndex = bookings.findIndex((b: any) => b.id === bookingId);
    if (bookingIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    bookings[bookingIndex].status = 'cancelled';
    bookings[bookingIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({ 
      success: true, 
      message: 'Booking cancelled successfully',
      booking: bookings[bookingIndex]
    });
  } catch (error) {
    console.error('Error canceling booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
