# Gmail SMTP Setup Guide for The Lum Studios

This guide will help you set up Gmail SMTP for sending booking notification emails.

## Prerequisites
- A Gmail account
- Two-factor authentication enabled on your Google account

## Step 1: Enable Two-Factor Authentication (if not already enabled)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", select **2-Step Verification**
3. Follow the prompts to enable 2-Step Verification

## Step 2: Generate App Password

Since regular Gmail passwords won't work with SMTP, you need to create an **App Password**:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", select **2-Step Verification**
3. Scroll down and select **App passwords** (you may need to verify your password)
4. In the "Select app" dropdown, choose **Mail**
5. In the "Select device" dropdown, choose **Other (Custom name)**
6. Enter a name like "Lum Studios Booking System"
7. Click **Generate**
8. Google will display a 16-character password (e.g., `abcd efgh ijkl mnop`)
9. **Copy this password** - you won't be able to see it again!

## Step 3: Update .env.local File

Open your `.env.local` file and update the following values:

```env
# Email Service Configuration
# Gmail SMTP Configuration (Active)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com              # Replace with your Gmail address
SMTP_PASSWORD=abcdefghijklmnop               # Replace with the 16-char app password (remove spaces)
SMTP_SECURE=false

# Email addresses
EMAIL_FROM=bookings@thelumstudios.com        # Or use your Gmail address
ADMIN_EMAIL=your-email@gmail.com             # Your Gmail address for receiving notifications
```

### Important Notes:
- **SMTP_USER**: Your full Gmail address (e.g., `youremail@gmail.com`)
- **SMTP_PASSWORD**: The 16-character app password (remove the spaces)
- **EMAIL_FROM**: Can be your Gmail address or a custom "from" name (Gmail will send from your account regardless)
- **ADMIN_EMAIL**: Where you want to receive booking notifications

## Step 4: Install Required Package

The email functionality requires the `nodemailer` package. Install it:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Step 5: Test the Email Setup

After updating the environment variables, restart your development server:

```bash
npm run dev
```

Then test by making a booking through your website. You should receive:
1. A confirmation email to the customer's email address
2. A notification email to your admin email address

## Troubleshooting

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"
- Make sure you're using an **App Password**, not your regular Gmail password
- Verify that 2-Step Verification is enabled
- Check that there are no extra spaces in the app password

### Error: "Connection timeout"
- Check your internet connection
- Some networks block SMTP ports - try port 465 with `SMTP_SECURE=true`
- Check if your firewall is blocking outbound connections

### Emails not being received
- Check your spam/junk folder
- Verify the email addresses in `.env.local` are correct
- Check the terminal console for error messages

### Using Port 465 (Alternative)
If port 587 doesn't work, try using port 465 with SSL:

```env
SMTP_PORT=465
SMTP_SECURE=true
```

## Gmail Sending Limits

Free Gmail accounts have sending limits:
- **500 emails per day** for regular Gmail accounts
- **2,000 emails per day** for Google Workspace accounts

For your booking system, this should be more than enough. With 500 emails/day:
- Each booking sends 2 emails (customer + admin)
- You can handle **250 bookings per day**

## Alternative Email Services

If you need higher limits or professional email branding, consider:

1. **Resend** - 3,000 emails/month free, easy setup
2. **SendGrid** - 100 emails/day free
3. **Google Workspace** - $6/user/month, 2,000 emails/day
4. **Mailgun** - 5,000 emails free for 3 months

## Email Templates

The system includes three email templates:

1. **Booking Confirmation** (`sendBookingConfirmation`)
   - Sent to customers after booking
   - Includes all booking details
   - Professional design with company branding

2. **Admin Notification** (`sendAdminNotification`)
   - Sent to admin email when new booking is made
   - Includes customer contact information
   - Link to admin dashboard

3. **Cancellation Email** (`sendCancellationEmail`)
   - Sent when a booking is cancelled
   - Informs customer of cancellation

## Security Best Practices

1. **Never commit .env.local to Git** - It's already in `.gitignore`
2. **Use App Passwords only** - Don't use your main Gmail password
3. **Rotate app passwords periodically** - Create new ones every 6-12 months
4. **Revoke unused app passwords** - Remove old passwords from Google Security settings
5. **Monitor email activity** - Check your Gmail sent folder for unauthorized emails

## Production Deployment

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the same variables from `.env.local`:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASSWORD`
   - `SMTP_SECURE`
   - `EMAIL_FROM`
   - `ADMIN_EMAIL`

4. Redeploy your application

## Support

If you encounter issues:
1. Check the terminal console for error messages
2. Verify all environment variables are set correctly
3. Test with a simple booking
4. Review the [nodemailer documentation](https://nodemailer.com/about/)

---

**Setup Complete!** Your booking system is now configured to send emails via Gmail SMTP.
