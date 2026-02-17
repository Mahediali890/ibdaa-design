/**
 * Contact Controller
 * Handles contact form submissions for IBDA'A Design Studio
 */

const { contactSubmissions } = require('../data/submissions');
const { sendContactNotification, sendAutoReply } = require('../services/emailService');

/**
 * Submit contact form
 * @route POST /api/contact
 */
const submitContact = async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  const submission = {
    id: contactSubmissions.length + 1,
    name,
    email,
    phone: phone || null,
    service: service || null,
    message,
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  contactSubmissions.push(submission);

  // Log without sensitive data
  console.log(`New contact submission #${submission.id} at ${submission.createdAt}`);

  // Send email notification to admin
  try {
    await sendContactNotification(submission);
    console.log(`Email notification sent for submission #${submission.id}`);
  } catch (emailError) {
    console.error(`Failed to send admin notification for #${submission.id}:`, emailError.message);
  }

  // Send auto-reply to customer
  try {
    await sendAutoReply(submission);
    console.log(`Auto-reply sent for submission #${submission.id}`);
  } catch (emailError) {
    console.error(`Failed to send auto-reply for #${submission.id}:`, emailError.message);
  }

  res.status(201).json({
    success: true,
    message: 'Thank you for your message. We will get back to you within 24 hours.',
    data: {
      id: submission.id,
      createdAt: submission.createdAt
    }
  });
};

module.exports = { submitContact };
