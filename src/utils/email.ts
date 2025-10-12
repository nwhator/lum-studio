import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  packageType: string;
  date: string;
  time: string;
  location: string;
  phone: string;
  specialRequests?: string;
}

// Send booking confirmation to customer
export async function sendBookingConfirmation(data: BookingEmailData) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: data.customerEmail,
      subject: `Booking Confirmation - ${data.packageType} Package`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
            .detail-row { margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
            .label { font-weight: bold; color: #667eea; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Booking Confirmed!</h1>
              <p>Thank you for choosing The Lum Studios</p>
            </div>
            <div class="content">
              <p>Dear ${data.customerName},</p>
              <p>Your photography session has been successfully booked. Here are your booking details:</p>
              
              <div class="detail-row">
                <span class="label">Package:</span> ${data.packageType}
              </div>
              <div class="detail-row">
                <span class="label">Date:</span> ${data.date}
              </div>
              <div class="detail-row">
                <span class="label">Time:</span> ${data.time}
              </div>
              <div class="detail-row">
                <span class="label">Location:</span> ${data.location}
              </div>
              <div class="detail-row">
                <span class="label">Contact Phone:</span> ${data.phone}
              </div>
              ${data.specialRequests ? `
              <div class="detail-row">
                <span class="label">Special Requests:</span> ${data.specialRequests}
              </div>
              ` : ''}
              
              <p style="margin-top: 30px;">
                We're excited to capture your special moments! If you need to make any changes, 
                please contact us at ${process.env.ADMIN_EMAIL || 'admin@thelumstudios.com'}.
              </p>
            </div>
            <div class="footer">
              <p>The Lum Studios | ${process.env.NEXT_PUBLIC_SITE_URL || 'https://thelumstudios.com'}</p>
              <p>This is an automated confirmation email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation sent to:', data.customerEmail);
    return { success: true };
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return { success: false, error };
  }
}

// Send booking notification to admin
export async function sendAdminNotification(data: BookingEmailData) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking - ${data.packageType} - ${data.date}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 20px; }
            .content { background: #f9f9f9; padding: 30px; }
            .detail-row { margin: 10px 0; padding: 10px; background: white; border-left: 4px solid #667eea; }
            .label { font-weight: bold; display: inline-block; width: 150px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>📸 New Booking Received</h2>
            </div>
            <div class="content">
              <div class="detail-row">
                <span class="label">Customer Name:</span> ${data.customerName}
              </div>
              <div class="detail-row">
                <span class="label">Email:</span> ${data.customerEmail}
              </div>
              <div class="detail-row">
                <span class="label">Phone:</span> ${data.phone}
              </div>
              <div class="detail-row">
                <span class="label">Package:</span> ${data.packageType}
              </div>
              <div class="detail-row">
                <span class="label">Date:</span> ${data.date}
              </div>
              <div class="detail-row">
                <span class="label">Time:</span> ${data.time}
              </div>
              <div class="detail-row">
                <span class="label">Location:</span> ${data.location}
              </div>
              ${data.specialRequests ? `
              <div class="detail-row">
                <span class="label">Special Requests:</span> ${data.specialRequests}
              </div>
              ` : ''}
              
              <p style="margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/bookings" 
                   style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  View in Admin Dashboard
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Admin notification sent to:', process.env.ADMIN_EMAIL);
    return { success: true };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error };
  }
}

// Send booking cancellation email
export async function sendCancellationEmail(data: BookingEmailData) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: data.customerEmail,
      subject: `Booking Cancelled - ${data.packageType} Package`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc3545; color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Cancelled</h1>
            </div>
            <div class="content">
              <p>Dear ${data.customerName},</p>
              <p>Your booking for ${data.date} at ${data.time} has been cancelled.</p>
              <p>If you have any questions or would like to reschedule, please contact us.</p>
              <p>Thank you,<br>The Lum Studios</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    return { success: false, error };
  }
}
