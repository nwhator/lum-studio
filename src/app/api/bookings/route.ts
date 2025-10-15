import { NextRequest, NextResponse } from 'next/server';
import { sendBookingConfirmation, sendAdminNotification } from '@/utils/email';

// Type definition for booking
interface Booking {
  id: string;
  date: string;
  timeSlots: string[];
  package: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// This will be replaced with actual database calls
// For now, we'll use in-memory storage (will reset on server restart)
// TODO: Replace with Vercel Postgres, MongoDB, or Supabase
// Use global storage to persist across API routes
const getBookingsStore = (): Booking[] => {
  if (typeof global !== 'undefined') {
    if (!(global as any).bookings) {
      (global as any).bookings = [];
    }
    return (global as any).bookings as Booking[];
  }
  return [];
};

// GET - Fetch all bookings or booked slots for a specific date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const bookings = getBookingsStore();

    if (date) {
      // Return booked slots for a specific date
      const bookedSlots = bookings
        .filter((booking: Booking) => {
          const bookingDate = new Date(booking.date).toDateString();
          const requestedDate = new Date(date).toDateString();
          return bookingDate === requestedDate && booking.status === 'confirmed';
        })
        .flatMap((booking: Booking) => booking.timeSlots);

      // Remove duplicates
      const uniqueSlots = bookedSlots.filter((slot: string, index: number, self: string[]) => 
        self.indexOf(slot) === index
      );

      return NextResponse.json({ 
        success: true, 
        bookedSlots: uniqueSlots
      });
    }

    // Return all bookings (for admin)
    return NextResponse.json({ 
      success: true, 
      bookings: bookings.sort((a: Booking, b: Booking) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, timeSlots, package: packageType, name, email, phone, message } = body;
    const bookings = getBookingsStore();

    // Validate required fields
    if (!date || !timeSlots || !packageType || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slots are already booked
    const requestedDate = new Date(date).toDateString();
    const conflictingBookings = bookings.filter((booking: any) => {
      const bookingDate = new Date(booking.date).toDateString();
      return bookingDate === requestedDate && 
             booking.status === 'confirmed' &&
             booking.timeSlots.some((slot: string) => timeSlots.includes(slot));
    });

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Some time slots are already booked' },
        { status: 409 }
      );
    }

    // Create new booking
    const newBooking: Booking = {
      id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date,
      timeSlots,
      package: packageType,
      name,
      email,
      phone,
      message: message || '',
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    bookings.push(newBooking);

    // Send email notifications
    try {
      // Send confirmation to customer
      await sendBookingConfirmation({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(', '),
        location: 'Location will be confirmed',
        phone,
        specialRequests: message
      });

      // Send notification to admin
      await sendAdminNotification({
        customerName: name,
        customerEmail: email,
        packageType,
        date,
        time: timeSlots.join(', '),
        location: 'Location will be confirmed',
        phone,
        specialRequests: message
      });
      
      console.log('Email notifications sent successfully');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue even if email fails - booking is still created
    }

    return NextResponse.json({ 
      success: true, 
      booking: newBooking,
      message: 'Booking created successfully'
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// Email notification function (placeholder)
async function sendBookingNotification(booking: any) {
  // TODO: Implement email sending with Resend, SendGrid, or Nodemailer
  console.log('Sending booking notification:', {
    to: booking.email,
    subject: 'Booking Confirmation - LUM Studios',
    bookingDetails: booking
  });

  // Example with Resend (after setup):
  /*
  import { Resend } from 'resend';
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'bookings@thelumstudios.com',
    to: [booking.email, 'admin@thelumstudios.com'],
    subject: 'Booking Confirmation - LUM Studios',
    html: `
      <h2>Booking Confirmed!</h2>
      <p>Hi ${booking.name},</p>
      <p>Your booking has been confirmed for:</p>
      <ul>
        <li>Package: ${booking.package}</li>
        <li>Date: ${new Date(booking.date).toLocaleDateString()}</li>
        <li>Time: ${booking.timeSlots.join(', ')}</li>
      </ul>
      <p>We'll see you soon!</p>
    `
  });
  */
}
