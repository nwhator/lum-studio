import { NextRequest, NextResponse } from 'next/server';
import { getBookingsCollection } from '@/lib/mongodb';

if (!process.env.MONGODB_URI) {
  // For API routes:
  return Response.json({ error: "Database disabled" }, { status: 503 });
  // For utility files, just return early or throw an error.
}

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

    const collection = await getBookingsCollection();

    // Update the booking
    const result = await collection.findOneAndUpdate(
      { id: bookingId },
      { 
        $set: { 
          status, 
          updatedAt: new Date().toISOString() 
        } 
      },
      { returnDocument: 'after' } // Return updated document
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking status updated successfully',
      booking: result
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel a booking (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookingId = params.id;
    const collection = await getBookingsCollection();
    
    // Soft delete by changing status to 'cancelled'
    const result = await collection.findOneAndUpdate(
      { id: bookingId },
      { 
        $set: { 
          status: 'cancelled', 
          updatedAt: new Date().toISOString() 
        } 
      },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking cancelled successfully',
      booking: result
    });
  } catch (error) {
    console.error('Error canceling booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
