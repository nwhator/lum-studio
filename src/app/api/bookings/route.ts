import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendBookingNotification, sendCustomerConfirmation } from '@/lib/email';

/**
 * GET /api/bookings?date=YYYY-MM-DD
 * Fetches booked time slots for a specific date
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { success: false, error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Fetch all bookings for the given date with pending or confirmed status
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('time')
      .eq('date', date)
      .in('status', ['pending', 'confirmed']);

    if (error) {
      console.error('Error fetching bookings:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }

    // Extract booked time slots
    const bookedSlots = bookings ? bookings.map((b) => b.time) : [];

    return NextResponse.json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    console.error('Error in GET /api/bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Creates a booking or initiates WhatsApp flow
 * - finalize=false: Just generates WhatsApp link, checks availability
 * - finalize=true: Actually creates the booking in database
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      package: packageSlug,
      date,
      timeSlots,
      notes,
      packageInfo,
      sellerPayment,
      payment,
      finalize = false,
      paid = false,
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !timeSlots || timeSlots.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For booking storage, we'll store the first time slot as the primary time
    const primaryTime = timeSlots[0];

    // Check if any of the time slots are already booked
    const { data: existingBookings, error: checkError } = await supabase
      .from('bookings')
      .select('time')
      .eq('date', date)
      .in('status', ['pending', 'confirmed']);

    if (checkError) {
      console.error('Error checking existing bookings:', checkError);
      return NextResponse.json(
        { success: false, error: 'Failed to check availability' },
        { status: 500 }
      );
    }

    // Check for conflicts
    const bookedTimes = existingBookings ? existingBookings.map((b) => b.time) : [];
    const hasConflict = timeSlots.some((slot: string) => bookedTimes.includes(slot));

    if (hasConflict) {
      return NextResponse.json(
        { success: false, error: 'One or more selected time slots are already booked' },
        { status: 409 }
      );
    }

    // Generate WhatsApp message
    const waPhone = process.env.WA_PHONE?.replace(/^\+/, '') || '2348145538164';
    const waMessage = generateWhatsAppMessage({
      name,
      email,
      phone,
      service: packageInfo?.category || packageSlug || 'Photography Session',
      date,
      timeSlots,
      notes,
      packageInfo,
      sellerPayment,
      payment,
    });
    const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

    // If finalize is false, just return the WhatsApp link
    if (!finalize) {
      return NextResponse.json({
        success: true,
        waLink,
        message: 'WhatsApp link generated. Please send the message to complete your booking.',
      });
    }

    // If finalize is true, create the booking in the database
    const status = paid ? 'confirmed' : 'pending';
    const paymentConfirmed = paid;

    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert({
        name,
        email,
        phone,
        service: packageInfo?.category || packageSlug || 'Photography Session',
        date,
        time: primaryTime,
        status,
        payment_confirmed: paymentConfirmed,
        notes: notes || null,
        package_info: packageInfo || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating booking:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    // Send email notification to admin (non-blocking)
    sendBookingNotification({
      name,
      email,
      phone,
      service: packageInfo?.category || packageSlug || 'Photography Session',
      date,
      time: primaryTime,
      notes,
      packageInfo,
    }).catch((err) => console.error('Email notification failed:', err));

    // Send confirmation email to customer (non-blocking)
    if (status === 'confirmed') {
      sendCustomerConfirmation({
        name,
        email,
        service: packageInfo?.category || packageSlug || 'Photography Session',
        date,
        time: primaryTime,
      }).catch((err) => console.error('Customer email failed:', err));
    }

    return NextResponse.json(
      {
        success: true,
        booking,
        waLink,
        message: 'Booking created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Generate formatted WhatsApp message
 */
function generateWhatsAppMessage(data: any): string {
  const lines: string[] = [];

  lines.push('✨ NEW BOOKING REQUEST ✨');
  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push('👤 CUSTOMER INFORMATION');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push(`• Name: ${data.name}`);
  lines.push(`• Email: ${data.email}`);
  lines.push(`• Phone: ${data.phone}`);
  lines.push('');
  lines.push('📦 SERVICE DETAILS');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push(`• Service: ${data.service}`);

  if (data.packageInfo) {
    const pkg = data.packageInfo;
    if (pkg.packageLabel) lines.push(`• Package: ${pkg.packageLabel}`);
    if (pkg.option) lines.push(`• Option: ${pkg.option}`);
    if (pkg.imagesEdited) lines.push(`• Edited Images: ${pkg.imagesEdited}`);
    if (pkg.imagesUnedited) lines.push(`• Unedited Images: ${pkg.imagesUnedited}`);
    if (pkg.priceFormatted) lines.push(`• Price: ${pkg.priceFormatted}`);
  }

  lines.push('');
  lines.push('📅 SCHEDULE');
  lines.push('━━━━━━━━━━━━━━━━━━━━');

  try {
    const dateStr = new Date(data.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    lines.push(`• Date: ${dateStr}`);
  } catch {
    lines.push(`• Date: ${data.date}`);
  }

  if (data.timeSlots && data.timeSlots.length > 0) {
    lines.push(`• Time: ${data.timeSlots[0]}`);
    if (data.timeSlots.length > 1) {
      lines.push(`• Additional slots: ${data.timeSlots.slice(1).join(', ')}`);
    }
  }

  if (data.sellerPayment) {
    lines.push('');
    lines.push('💰 PAYMENT DETAILS');
    lines.push('━━━━━━━━━━━━━━━━━━━━');
    lines.push(`• Account Number: ${data.sellerPayment.accountNumber}`);
    lines.push(`• Bank: ${data.sellerPayment.bankName}`);
    lines.push(`• Account Name: ${data.sellerPayment.accountName}`);
  }

  if (data.payment) {
    lines.push('');
    lines.push('💳 PAYMENT CONFIRMATION');
    lines.push('━━━━━━━━━━━━━━━━━━━━');
    lines.push(`• Paid from Account: ${data.payment.accountName || 'N/A'}`);
    lines.push(`• Sender Bank: ${data.payment.bankName || 'N/A'}`);
  }

  if (data.notes) {
    lines.push('');
    lines.push('📝 NOTES');
    lines.push('━━━━━━━━━━━━━━━━━━━━');
    lines.push(data.notes);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push('✉ Sent from LUM Studios');
  lines.push('www.thelumstudios.com');

  return lines.join('\n');
}
