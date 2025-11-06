import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  const email = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASS;

  if (!email || !pass) {
    console.error('Missing SMTP credentials. Email notifications will not work.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: pass, // Use App Password for Gmail
    },
  });
};

/**
 * Send booking confirmation email to admin
 */
export async function sendBookingNotification(booking: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  packageInfo?: any;
}) {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.warn('Email transporter not configured. Skipping email notification.');
    return { success: false, error: 'Email not configured' };
  }

  // Use ADMIN_EMAIL if set, otherwise fall back to SMTP_EMAIL
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL;
  const studioName = process.env.NEXT_PUBLIC_STUDIO_NAME || 'LUM Studios';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #B7C435, #8FA62E); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #555; display: inline-block; width: 120px; }
        .value { color: #222; }
        .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✨ New Booking Request</h1>
        </div>
        <div class="content">
          <p>You have received a new booking request from <strong>${booking.name}</strong>.</p>
          
          <div class="booking-details">
            <div class="detail-row">
              <span class="label">Name:</span>
              <span class="value">${booking.name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${booking.email}">${booking.email}</a></span>
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span class="value"><a href="tel:${booking.phone}">${booking.phone}</a></span>
            </div>
            <div class="detail-row">
              <span class="label">Service:</span>
              <span class="value">${booking.service}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date:</span>
              <span class="value">${new Date(booking.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time:</span>
              <span class="value">${booking.time}</span>
            </div>
            ${booking.notes ? `
            <div class="detail-row">
              <span class="label">Notes:</span>
              <span class="value">${booking.notes}</span>
            </div>
            ` : ''}
          </div>

          <p style="margin-top: 20px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/dashboard" 
               style="background: #B7C435; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Dashboard
            </a>
          </p>
        </div>
        <div class="footer">
          <p>${studioName} Booking System</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"${studioName}" <${adminEmail}>`,
      to: adminEmail,
      subject: `New Booking Request from ${booking.name}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send booking confirmation email to customer
 */
export async function sendCustomerConfirmation(booking: {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
}) {
  const transporter = createTransporter();
  
  if (!transporter) {
    return { success: false, error: 'Email not configured' };
  }

  const adminEmail = process.env.SMTP_EMAIL;
  const studioName = process.env.NEXT_PUBLIC_STUDIO_NAME || 'LUM Studios';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #B7C435, #8FA62E); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-summary { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${booking.name}</strong>,</p>
          <p>Thank you for booking with ${studioName}! Your booking request has been received.</p>
          
          <div class="booking-summary">
            <h3>Booking Details</h3>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
          </div>

          <p>We'll review your booking and confirm shortly. If you have any questions, feel free to reach out!</p>
        </div>
        <div class="footer">
          <p>${studioName}</p>
          <p>Email: ${adminEmail}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"${studioName}" <${adminEmail}>`,
      to: booking.email,
      subject: `Booking Confirmation - ${studioName}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending customer email:', error);
    return { success: false, error: String(error) };
  }
}
