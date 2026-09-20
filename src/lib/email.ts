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

// Shared styles and footer builder for LUM Studios emails
const PHONE_NUMBER = '+234 806 540 7503';
const WHATSAPP_NUMBER = '+234 814 553 8164';
const WHATSAPP_LINK = 'https://wa.me/2348145538164';
const INSTAGRAM_LINK = 'https://instagram.com/lum_studios/';
const TIKTOK_LINK = 'https://www.tiktok.com/@lumphotographystudios';
const FACEBOOK_LINK = 'https://www.facebook.com/share/1VahucgBSv/';

function renderEmailLayout({
  headerTitle,
  headerSubtitle,
  headerGradient = 'linear-gradient(135deg, #111111 0%, #1f2408 100%)',
  badgeText = 'LUM STUDIOS',
  badgeColor = '#B7C435',
  contentHtml,
  callToAction,
}: {
  headerTitle: string;
  headerSubtitle?: string;
  headerGradient?: string;
  badgeText?: string;
  badgeColor?: string;
  contentHtml: string;
  callToAction?: { text: string; url: string };
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${headerTitle}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #2d3748;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6f8; padding: 30px 10px;">
        <tr>
          <td align="center">
            <!-- Email Container -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 25px rgba(0,0,0,0.06); border: 1px solid #e9ecef;">
              
              <!-- Header Bar -->
              <tr>
                <td style="background: ${headerGradient}; padding: 35px 30px 30px; text-align: center; border-bottom: 3px solid #B7C435;">
                  <div style="display: inline-block; background: rgba(183, 196, 53, 0.18); border: 1px solid rgba(183, 196, 53, 0.4); color: ${badgeColor}; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 12px;">
                    ${badgeText}
                  </div>
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; line-height: 1.3;">
                    ${headerTitle}
                  </h1>
                  ${headerSubtitle ? `<p style="margin: 8px 0 0; color: #e2e8f0; font-size: 14px;">${headerSubtitle}</p>` : ''}
                </td>
              </tr>

              <!-- Body Content -->
              <tr>
                <td style="padding: 35px 30px;">
                  ${contentHtml}

                  ${
                    callToAction
                      ? `
                    <div style="text-align: center; margin: 35px 0 10px;">
                      <a href="${callToAction.url}" style="background-color: #B7C435; color: #111111; padding: 14px 32px; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 50px; display: inline-block; box-shadow: 0 4px 15px rgba(183, 196, 53, 0.35);">
                        ${callToAction.text}
                      </a>
                    </div>
                  `
                      : ''
                  }
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding: 0 30px;">
                  <div style="height: 1px; background-color: #edf2f7;"></div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #fafbfc; padding: 30px; text-align: center;">
                  
                  <!-- Contact Info Grid -->
                  <div style="margin-bottom: 20px;">
                    <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #1a202c; text-transform: uppercase; letter-spacing: 0.5px;">
                      Need Assistance or Have Questions?
                    </h4>
                    <p style="margin: 4px 0; font-size: 13px; color: #4a5568;">
                      📞 Phone: <a href="tel:${PHONE_NUMBER.replace(/\s+/g, '')}" style="color: #6d7807; font-weight: 600; text-decoration: none;">${PHONE_NUMBER}</a>
                    </p>
                    <p style="margin: 4px 0; font-size: 13px; color: #4a5568;">
                      💬 WhatsApp: <a href="${WHATSAPP_LINK}" style="color: #25D366; font-weight: 600; text-decoration: none;">${WHATSAPP_NUMBER}</a>
                    </p>
                    <p style="margin: 4px 0; font-size: 13px; color: #4a5568;">
                      ✉️ Email: <a href="mailto:${ADMIN_EMAIL}" style="color: #6d7807; font-weight: 600; text-decoration: none;">${ADMIN_EMAIL}</a>
                    </p>
                    <p style="margin: 4px 0; font-size: 13px; color: #4a5568;">
                      🌐 Website: <a href="${SITE_URL}" style="color: #6d7807; font-weight: 600; text-decoration: none;">thelumstudios.com</a>
                    </p>
                  </div>

                  <!-- Social Links Badges -->
                  <div style="margin: 20px 0 25px;">
                    <a href="${INSTAGRAM_LINK}" style="display: inline-block; background: #ffffff; border: 1px solid #e2e8f0; color: #1a202c; padding: 6px 14px; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 20px; margin: 3px;">
                      📷 Instagram
                    </a>
                    <a href="${TIKTOK_LINK}" style="display: inline-block; background: #ffffff; border: 1px solid #e2e8f0; color: #1a202c; padding: 6px 14px; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 20px; margin: 3px;">
                      🎵 TikTok
                    </a>
                    <a href="${FACEBOOK_LINK}" style="display: inline-block; background: #ffffff; border: 1px solid #e2e8f0; color: #1a202c; padding: 6px 14px; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 20px; margin: 3px;">
                      📘 Facebook
                    </a>
                    <a href="${WHATSAPP_LINK}" style="display: inline-block; background: #ffffff; border: 1px solid #e2e8f0; color: #1a202c; padding: 6px 14px; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 20px; margin: 3px;">
                      💬 WhatsApp
                    </a>
                  </div>

                  <!-- Copyright -->
                  <p style="margin: 0; font-size: 12px; color: #a0aec0; line-height: 1.5;">
                    &copy; ${new Date().getFullYear()} ${STUDIO_NAME}. All rights reserved.<br>
                    Capturing timeless moments and luxury visual experiences across Nigeria.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
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
      <div style="background-color: #fbfdf3; border: 1px solid #e2ebb0; border-left: 4px solid #B7C435; padding: 18px 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin: 0 0 12px; font-size: 15px; color: #4a5404; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">📦 Package &amp; Pricing</h3>
        ${pkg.packageName || pkg.packageLabel ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Package Tier:</strong> ${pkg.packageName || pkg.packageLabel}</p>` : ''}
        ${pkg.option ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Option:</strong> ${pkg.option}</p>` : ''}
        ${pkg.looks ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Number of Looks:</strong> ${pkg.looks}</p>` : ''}
        ${pkg.imagesEdited ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Edited Images:</strong> ${pkg.imagesEdited}</p>` : ''}
        ${pkg.imagesUnedited ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Unedited Images:</strong> ${pkg.imagesUnedited}</p>` : ''}
        ${pkg.priceFormatted || pkg.price ? `<p style="margin: 10px 0 0; font-size: 18px; font-weight: 800; color: #6d7807;"><strong>Total:</strong> ${pkg.priceFormatted || `₦${Number(pkg.price).toLocaleString()}`}</p>` : ''}
        ${pkg.deposit ? `<p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #B7C435;"><strong>70% Deposit:</strong> ₦${Number(pkg.deposit).toLocaleString()}</p>` : ''}
      </div>
    `;
  }

  const dateStr = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const contentHtml = `
    <p style="font-size: 15px; margin: 0 0 20px; color: #4a5568;">
      A new booking request has been submitted by <strong>${booking.name}</strong> through the LUM Studios website.
    </p>

    <!-- Customer Card -->
    <div style="background-color: #ffffff; border: 1px solid #edf2f7; border-radius: 10px; padding: 18px 20px; margin-bottom: 16px;">
      <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #1a202c; text-transform: uppercase; letter-spacing: 0.5px;">
        👤 Customer Information
      </h3>
      <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #4a5568;">
        <tr>
          <td width="30%" style="font-weight: 600; color: #718096;">Full Name:</td>
          <td style="font-weight: 700; color: #1a202c;">${booking.name}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #718096;">Email:</td>
          <td><a href="mailto:${booking.email}" style="color: #6d7807; text-decoration: none; font-weight: 600;">${booking.email}</a></td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #718096;">Phone:</td>
          <td><a href="tel:${booking.phone}" style="color: #6d7807; text-decoration: none; font-weight: 600;">${booking.phone}</a></td>
        </tr>
      </table>
    </div>

    <!-- Schedule Card -->
    <div style="background-color: #ffffff; border: 1px solid #edf2f7; border-radius: 10px; padding: 18px 20px; margin-bottom: 16px;">
      <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #1a202c; text-transform: uppercase; letter-spacing: 0.5px;">
        📅 Session &amp; Schedule
      </h3>
      <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #4a5568;">
        <tr>
          <td width="30%" style="font-weight: 600; color: #718096;">Service / Event:</td>
          <td style="font-weight: 700; color: #1a202c;">${booking.service}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #718096;">Date:</td>
          <td style="font-weight: 600; color: #2d3748;">${dateStr}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #718096;">Time / Slots:</td>
          <td style="font-weight: 600; color: #2d3748;">${booking.time}</td>
        </tr>
      </table>
    </div>

    ${packageDetailsHtml}

    ${
      booking.notes
        ? `
      <div style="background-color: #ffffff; border: 1px solid #edf2f7; border-radius: 10px; padding: 18px 20px; margin-bottom: 16px;">
        <h3 style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #1a202c; text-transform: uppercase; letter-spacing: 0.5px;">
          📝 Client Notes &amp; Requests
        </h3>
        <p style="margin: 0; font-size: 14px; color: #4a5568; line-height: 1.6;">${booking.notes}</p>
      </div>
    `
        : ''
    }
  `;

  const html = renderEmailLayout({
    headerTitle: '✨ New Booking Request',
    headerSubtitle: `From ${booking.name} • ${booking.service}`,
    contentHtml,
    callToAction: {
      text: 'Open Admin Dashboard →',
      url: `${SITE_URL}/admin/dashboard`,
    },
  });

  return sendEmail(ADMIN_EMAIL, `New Booking: ${booking.name} (${booking.service})`, html);
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
  packageInfo?: any;
}) {
  const dateStr = new Date(booking.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let packageSummaryHtml = '';
  if (booking.packageInfo) {
    const pkg = booking.packageInfo;
    packageSummaryHtml = `
      <div style="background-color: #fbfdf3; border: 1px solid #e2ebb0; border-left: 4px solid #B7C435; padding: 16px 20px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin: 0 0 8px; font-size: 14px; color: #4a5404; font-weight: 700;">Package Summary</h4>
        ${pkg.packageName || pkg.packageLabel ? `<p style="margin: 4px 0; font-size: 13px;"><strong>Package:</strong> ${pkg.packageName || pkg.packageLabel}</p>` : ''}
        ${pkg.priceFormatted || pkg.price ? `<p style="margin: 8px 0 0; font-size: 16px; font-weight: 800; color: #6d7807;">Total: ${pkg.priceFormatted || `₦${Number(pkg.price).toLocaleString()}`}</p>` : ''}
      </div>
    `;
  }

  const contentHtml = `
    <p style="font-size: 16px; margin: 0 0 16px; color: #2d3748;">
      Hi <strong>${booking.name}</strong>,
    </p>
    <p style="font-size: 14px; margin: 0 0 20px; color: #4a5568; line-height: 1.6;">
      Thank you for choosing <strong>${STUDIO_NAME}</strong>! We have received your booking request and our team is currently preparing for your session.
    </p>

    <!-- Session Details Card -->
    <div style="background-color: #ffffff; border: 1px solid #edf2f7; border-radius: 10px; padding: 18px 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #1a202c; text-transform: uppercase; letter-spacing: 0.5px;">
        📸 Your Session Details
      </h3>
      <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #4a5568;">
        <tr>
          <td width="35%" style="font-weight: 600; color: #718096;">Service:</td>
          <td style="font-weight: 700; color: #1a202c;">${booking.service}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #718096;">Date:</td>
          <td style="font-weight: 600; color: #2d3748;">${dateStr}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #718096;">Time Slot:</td>
          <td style="font-weight: 600; color: #2d3748;">${booking.time}</td>
        </tr>
      </table>
    </div>

    ${packageSummaryHtml}

    <div style="background-color: #fafbfc; border-radius: 8px; padding: 16px 20px; margin-bottom: 10px; font-size: 13px; color: #4a5568; line-height: 1.6;">
      <p style="margin: 0 0 8px;"><strong>What happens next?</strong></p>
      <p style="margin: 0;">Our studio coordinator will review your session schedule and connect with you on WhatsApp to finalize looks, timing, and styling tips.</p>
    </div>
  `;

  const html = renderEmailLayout({
    headerTitle: '🎉 Booking Request Received!',
    headerSubtitle: `Thank you for booking with ${STUDIO_NAME}`,
    contentHtml,
    callToAction: {
      text: 'Chat with us on WhatsApp →',
      url: WHATSAPP_LINK,
    },
  });

  return sendEmail(booking.email, `Booking Confirmation — ${STUDIO_NAME}`, html);
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
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const contentHtml = `
    <p style="font-size: 16px; margin: 0 0 16px; color: #2d3748;">
      Hi <strong>${booking.name}</strong>,
    </p>
    <p style="font-size: 14px; margin: 0 0 20px; color: #4a5568; line-height: 1.6;">
      ${
        isConfirmed
          ? `Great news! Your booking with <strong>${STUDIO_NAME}</strong> has been officially <strong>confirmed</strong>. We are thrilled to capture your special moments!`
          : `We regret to inform you that your booking with <strong>${STUDIO_NAME}</strong> has been cancelled. If you would like to reschedule or have questions, please reach out to us directly.`
      }
    </p>

    <!-- Booking Details Card -->
    <div style="background-color: #ffffff; border: 1px solid #edf2f7; border-radius: 10px; padding: 18px 20px; margin-bottom: 20px;">
      <h3 style="margin: 0 0 12px; font-size: 14px; font-weight: 700; color: #1a202c; text-transform: uppercase; letter-spacing: 0.5px;">
        Booking Overview
      </h3>
      <table width="100%" border="0" cellspacing="0" cellpadding="4" style="font-size: 14px; color: #4a5568;">
        <tr>
          <td width="35%" style="font-weight: 600; color: #718096;">Service:</td>
          <td style="font-weight: 700; color: #1a202c;">${booking.service}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #718096;">Date:</td>
          <td style="font-weight: 600; color: #2d3748;">${dateStr}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #718096;">Time:</td>
          <td style="font-weight: 600; color: #2d3748;">${booking.time}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #718096;">Status:</td>
          <td style="font-weight: 700; color: ${isConfirmed ? '#28a745' : '#dc3545'}; text-transform: uppercase;">
            ${booking.status}
          </td>
        </tr>
      </table>
    </div>
  `;

  const html = renderEmailLayout({
    headerTitle: isConfirmed ? '🎉 Booking Confirmed!' : '❌ Booking Cancelled',
    headerSubtitle: isConfirmed ? 'Your photography session is locked in' : 'Status Update on your booking',
    headerGradient: isConfirmed
      ? 'linear-gradient(135deg, #111111 0%, #1f2408 100%)'
      : 'linear-gradient(135deg, #2b1111 0%, #1a1a1a 100%)',
    badgeText: isConfirmed ? 'CONFIRMED' : 'STATUS UPDATE',
    badgeColor: isConfirmed ? '#B7C435' : '#e53e3e',
    contentHtml,
    callToAction: {
      text: isConfirmed ? 'Message Us on WhatsApp →' : 'Contact Support →',
      url: WHATSAPP_LINK,
    },
  });

  return sendEmail(
    booking.email,
    `${isConfirmed ? 'Booking Confirmed' : 'Booking Cancelled'} — ${STUDIO_NAME}`,
    html
  );
}

