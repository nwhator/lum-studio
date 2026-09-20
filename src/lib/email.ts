import nodemailer from 'nodemailer';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_API_URL = 'https://api.resend.com/emails';

const STUDIO_NAME = 'LUM Studios';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'lummedia01@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM || `LUM Studios <bookings@thelumstudios.com>`;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thelumstudios.com';
const LOGO_URL = `${SITE_URL}/assets/img/logo/logo.webp`;

// Transporter for SMTP fallback (e.g. Gmail SMTP)
const createSmtpTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

async function sendEmail(to: string, subject: string, html: string) {
  // 1. Try SMTP first if SMTP credentials are provided in environment
  const smtpTransporter = createSmtpTransporter();
  if (smtpTransporter) {
    try {
      const info = await smtpTransporter.sendMail({
        from: process.env.SMTP_FROM || `"${STUDIO_NAME}" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
      });
      console.log('Email sent via SMTP successfully:', info.messageId);
      return { success: true, id: info.messageId };
    } catch (smtpError) {
      console.error('SMTP send failed, falling back to Resend API:', smtpError);
    }
  }

  // 2. Try Resend API
  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API error:', data);
      return {
        success: false,
        error: data.message || 'Email send failed',
        details: data,
      };
    }

    console.log('Email sent via Resend successfully:', data.id);
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send booking notification email to admin
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
  let packageDetailsHtml = '';
  if (booking.packageInfo) {
    const pkg = booking.packageInfo;
    packageDetailsHtml = `
      <div style="background: #f0f8ff; border-left: 4px solid #B7C435; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #8FA62E;">📦 Package Details</h3>
        ${pkg.packageLabel ? `<p style="margin: 8px 0;"><strong>Package:</strong> ${pkg.packageLabel}</p>` : ''}
        ${pkg.option ? `<p style="margin: 8px 0;"><strong>Option:</strong> ${pkg.option}</p>` : ''}
        ${pkg.looks ? `<p style="margin: 8px 0;"><strong>Number of Looks:</strong> ${pkg.looks}</p>` : ''}
        ${pkg.imagesEdited ? `<p style="margin: 8px 0;"><strong>Edited Images:</strong> ${pkg.imagesEdited}</p>` : ''}
        ${pkg.imagesUnedited ? `<p style="margin: 8px 0;"><strong>Unedited Images:</strong> ${pkg.imagesUnedited}</p>` : ''}
        ${pkg.priceFormatted ? `<p style="margin: 8px 0; font-size: 18px; font-weight: bold; color: #B7C435;"><strong>Total Cost:</strong> ${pkg.priceFormatted}</p>` : ''}
      </div>
    `;
  }

  const dateStr = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #B7C435, #8FA62E); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">✨ New Booking Request</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>You have received a new booking request from <strong>${booking.name}</strong>.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #8FA62E;">👤 Customer Information</h3>
            <p><strong>Name:</strong> ${booking.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${booking.email}">${booking.email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${booking.phone}">${booking.phone}</a></p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #8FA62E;">📅 Schedule</h3>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Date:</strong> ${dateStr}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
          </div>

          ${packageDetailsHtml}

          ${booking.notes ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #8FA62E;">📝 Notes</h3>
            <p style="margin: 0;">${booking.notes}</p>
          </div>` : ''}

          <p style="margin-top: 20px;">
            <a href="${SITE_URL}/admin/dashboard" 
               style="background: #B7C435; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Dashboard
            </a>
          </p>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <img src="${LOGO_URL}" alt="${STUDIO_NAME}" style="width: 80px; height: auto; margin-bottom: 10px;" />
          <p>${STUDIO_NAME} Booking System</p>
          <p>This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(ADMIN_EMAIL, `New Booking Request from ${booking.name}`, html);
}

/**
 * Send email notification when booking status changes (confirmed or cancelled)
 */
export async function sendStatusChangeNotification(booking: {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'cancelled';
}) {
  const isConfirmed = booking.status === 'confirmed';

  const dateStr = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, ${isConfirmed ? '#B7C435, #8FA62E' : '#d9534f, #c9302c'}); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">${isConfirmed ? '🎉 Booking Confirmed!' : '❌ Booking Cancelled'}</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Hi <strong>${booking.name}</strong>,</p>
          <p>${isConfirmed
            ? `Great news! Your booking with ${STUDIO_NAME} has been confirmed.`
            : `We regret to inform you that your booking with ${STUDIO_NAME} has been cancelled.`
          }</p>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details</h3>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Date:</strong> ${dateStr}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
          </div>

          ${isConfirmed
            ? `<p>We look forward to seeing you! If you have any questions, feel free to reach out.</p>`
            : `<p>If you have any questions or would like to rebook, please don't hesitate to contact us.</p>`
          }
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <img src="${LOGO_URL}" alt="${STUDIO_NAME}" style="width: 80px; height: auto; margin-bottom: 10px;" />
          <p>${STUDIO_NAME}</p>
          <p>Email: ${ADMIN_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(booking.email, isConfirmed
    ? `Booking Confirmed - ${STUDIO_NAME}`
    : `Booking Cancelled - ${STUDIO_NAME}`,
    html
  );
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
  const dateStr = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #B7C435, #8FA62E); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">🎉 Booking Confirmed!</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
          <p>Hi <strong>${booking.name}</strong>,</p>
          <p>Thank you for booking with ${STUDIO_NAME}! Your booking request has been received.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details</h3>
            <p><strong>Service:</strong> ${booking.service}</p>
            <p><strong>Date:</strong> ${dateStr}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
          </div>

          <p>We'll review your booking and confirm shortly. If you have any questions, feel free to reach out!</p>
        </div>
        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <img src="${LOGO_URL}" alt="${STUDIO_NAME}" style="width: 80px; height: auto; margin-bottom: 10px;" />
          <p>${STUDIO_NAME}</p>
          <p>Email: ${ADMIN_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(booking.email, `Booking Confirmation - ${STUDIO_NAME}`, html);
}
