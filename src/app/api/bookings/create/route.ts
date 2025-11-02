import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendBookingNotification, sendCustomerConfirmation } from '@/lib/email';

/**
 * POST /api/bookings/create
 * Creates a new booking, sends WhatsApp notification and email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      service,
      date,
      time,
      notes,
      packageInfo,
      payment,
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if the time slot is already booked
    const { data: existingBookings, error: checkError } = await supabase
      .from('bookings')
      .select('*')
      .eq('date', date)
      .eq('time', time)
      .in('status', ['pending', 'confirmed']);

    if (checkError) {
      console.error('Error checking existing bookings:', checkError);
      return NextResponse.json(
        { success: false, error: 'Failed to check availability' },
        { status: 500 }
      );
    }

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { success: false, error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    // Determine initial status based on payment
    const hasPayment = payment && payment.transactionId;
    const status = hasPayment ? 'confirmed' : 'pending';
    const paymentConfirmed = hasPayment;

    // Create booking in Supabase
    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert({
        name,
        email,
        phone,
        service,
        date,
        time,
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
      service,
      date,
      time,
      notes,
      packageInfo,
    }).catch(err => console.error('Email notification failed:', err));

    // Send confirmation email to customer (non-blocking)
    if (status === 'confirmed') {
      sendCustomerConfirmation({
        name,
        email,
        service,
        date,
        time,
      }).catch(err => console.error('Customer email failed:', err));
    }

    // Generate WhatsApp link
    const waPhone = process.env.WA_PHONE?.replace(/^\+/, '') || '2348145538164';
    const waMessage = generateWhatsAppMessage({
      name,
      email,
      phone,
      service,
      date,
      time,
      notes,
      packageInfo,
      payment,
    });
    const waLink = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

    return NextResponse.json({
      success: true,
      booking,
      waLink,
      message: 'Booking created successfully',
    });

  } catch (error) {
    console.error('Error in booking creation:', error);
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
  
  lines.push(`• Time: ${data.time}`);
  
  if (data.payment && data.payment.transactionId) {
    lines.push('');
    lines.push('💳 PAYMENT CONFIRMATION');
    lines.push('━━━━━━━━━━━━━━━━━━━━');
    lines.push(`• Account Name: ${data.payment.accountName || 'N/A'}`);
    lines.push(`• Bank: ${data.payment.bankName || 'N/A'}`);
    lines.push(`• Transaction ID: ${data.payment.transactionId}`);
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
