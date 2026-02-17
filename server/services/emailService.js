/**
 * Email Service for IBDA'A Design Studio
 * Handles sending emails using Nodemailer + Gmail SMTP
 */

const nodemailer = require('nodemailer');

/**
 * Escape HTML special characters to prevent injection
 */
const escapeHtml = (str) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Sanitize string for use in email headers (prevent header injection)
 */
const sanitizeForHeader = (str) => {
  return String(str).replace(/[\r\n\t\0]/g, '').trim().substring(0, 200);
};

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

// Service label mapping
const SERVICE_LABELS = {
  architecture: 'Architectural Design',
  interior: 'Interior Design',
  renovation: 'Renovation',
  consultation: 'Design Consultation',
  '3d': '3D Visualization',
};

/**
 * Send contact form notification email to admin
 */
const sendContactNotification = async (contactData) => {
  const { name, email, phone, service, message, createdAt } = contactData;
  const serviceLabel = SERVICE_LABELS[service] || escapeHtml(service) || 'Not specified';

  const safeName = sanitizeForHeader(name);
  const safeEmail = sanitizeForHeader(email);
  const htmlName = escapeHtml(name);
  const htmlEmail = escapeHtml(email);
  const htmlPhone = phone ? escapeHtml(phone) : '';
  const htmlMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const transporter = createTransporter();

  const mailOptions = {
    from: `"IBDA'A Design Studio Website" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL_RECIPIENT,
    replyTo: { name: safeName, address: safeEmail },
    subject: `New Contact Form: ${safeName} - ${serviceLabel}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0C1821 0%, #1B2838 100%); padding: 24px; text-align: center;">
          <h1 style="color: #C9A96E; margin: 0; font-size: 24px;">IBDA'A Design Studio</h1>
          <p style="color: #8899A6; margin: 5px 0 0; font-size: 14px;">New Contact Form Submission</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1B2838; margin-top: 0;">Contact Details</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 120px;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1B2838;">${htmlName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1B2838;">
                <a href="mailto:${safeEmail}" style="color: #C9A96E;">${htmlEmail}</a>
              </td>
            </tr>
            ${htmlPhone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1B2838;">
                <a href="tel:${htmlPhone}" style="color: #C9A96E;">${htmlPhone}</a>
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Service:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1B2838;">${serviceLabel}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;"><strong>Submitted:</strong></td>
              <td style="padding: 10px 0; color: #1B2838;">${new Date(createdAt).toLocaleString()}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <h3 style="color: #1B2838; margin-bottom: 10px;">Message:</h3>
            <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; color: #334155; line-height: 1.6;">
              ${htmlMessage}
            </div>
          </div>

          <div style="margin-top: 25px; text-align: center;">
            <a href="mailto:${safeEmail}?subject=Re: IBDA'A Design Studio Inquiry"
               style="display: inline-block; background: #C9A96E; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reply to ${htmlName}
            </a>
          </div>
        </div>

        <div style="background: #0C1821; padding: 15px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 12px;">
            This email was sent from the IBDA'A Design Studio website contact form.
          </p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission - IBDA'A Design Studio

Contact Details:
----------------
Name: ${safeName}
Email: ${safeEmail}
${phone ? `Phone: ${sanitizeForHeader(phone)}` : ''}
Service: ${serviceLabel}
Submitted: ${new Date(createdAt).toLocaleString()}

Message:
--------
${message}

---
Reply to this message by emailing ${safeEmail}
    `
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send auto-reply confirmation email to customer
 */
const sendAutoReply = async (contactData) => {
  const { name, email, service, message } = contactData;
  const serviceLabel = SERVICE_LABELS[service] || escapeHtml(service) || 'General Inquiry';

  const safeName = sanitizeForHeader(name);
  const safeEmail = sanitizeForHeader(email);
  const htmlName = escapeHtml(name);
  const htmlMessage = escapeHtml(message.substring(0, 200)) + (message.length > 200 ? '...' : '');

  const contactPhone = process.env.CONTACT_PHONE || '+91 84900 59240';
  const contactEmail = process.env.CONTACT_EMAIL_RECIPIENT;
  const contactAddress = process.env.CONTACT_ADDRESS || 'D2, City Centre Complex, Marida Bhagol, Nadiad, Gujarat 387001';

  const transporter = createTransporter();

  const mailOptions = {
    from: `"IBDA'A Design Studio" <${process.env.EMAIL_USER}>`,
    to: safeEmail,
    subject: `Thank you for contacting IBDA'A Design Studio`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0C1821 0%, #1B2838 100%); padding: 24px; text-align: center;">
          <h1 style="color: #C9A96E; margin: 0; font-size: 24px;">IBDA'A Design Studio</h1>
          <p style="color: #8899A6; margin: 5px 0 0; font-size: 14px;">Thank You for Reaching Out!</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1B2838; margin-top: 0;">Dear ${htmlName},</h2>

          <p style="color: #334155; line-height: 1.6;">
            Thank you for contacting <strong>IBDA'A Design Studio</strong>. We have received your message and our team will review it shortly.
          </p>

          <p style="color: #334155; line-height: 1.6;">
            We typically respond within <strong>24 hours</strong> during business days. If your matter is urgent, please feel free to call us directly.
          </p>

          <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
            <h3 style="color: #1B2838; margin-top: 0; font-size: 14px;">Your Message Summary:</h3>
            <p style="color: #64748b; margin: 5px 0;"><strong>Service:</strong> ${serviceLabel}</p>
            <p style="color: #64748b; margin: 5px 0;"><strong>Message:</strong></p>
            <p style="color: #334155; font-style: italic; margin: 5px 0;">"${htmlMessage}"</p>
          </div>

          <div style="background: #0C1821; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #C9A96E; margin-top: 0;">Contact Information</h3>
            <p style="color: #8899A6; margin: 5px 0;">
              <strong style="color: #fff;">Phone:</strong> ${escapeHtml(contactPhone)}
            </p>
            <p style="color: #8899A6; margin: 5px 0;">
              <strong style="color: #fff;">Email:</strong> ${escapeHtml(contactEmail)}
            </p>
            <p style="color: #8899A6; margin: 5px 0;">
              <strong style="color: #fff;">Address:</strong> ${escapeHtml(contactAddress)}
            </p>
          </div>

          <p style="color: #334155; line-height: 1.6;">
            Best regards,<br>
            <strong>IBDA'A Design Studio Team</strong>
          </p>
        </div>

        <div style="background: #0C1821; padding: 15px; text-align: center;">
          <p style="color: #64748b; margin: 0 0 10px; font-size: 12px;">
            Follow us on social media
          </p>
          <p style="margin: 0;">
            <a href="https://www.instagram.com/ibdaa_design_studio" style="color: #C9A96E; text-decoration: none;">Instagram</a>
          </p>
          <p style="color: #475569; margin: 15px 0 0; font-size: 11px;">
            &copy; ${new Date().getFullYear()} IBDA'A Design Studio. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `
Dear ${safeName},

Thank you for contacting IBDA'A Design Studio. We have received your message and our team will review it shortly.

We typically respond within 24 hours during business days. If your matter is urgent, please feel free to call us directly.

Your Message Summary:
Service: ${serviceLabel}
Message: "${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"

Contact Information:
Phone: ${contactPhone}
Email: ${contactEmail}
Address: ${contactAddress}

Best regards,
IBDA'A Design Studio Team
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactNotification,
  sendAutoReply
};
