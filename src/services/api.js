/**
 * API Service
 * Uses FormSubmit.co for contact form (no backend needed, works on GitHub Pages)
 * First submission will send a verification email — confirm it once, then all future submissions work.
 */

const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/mominfarmanali292@gmail.com';

/**
 * Contact API calls
 */
export const contactApi = {
  submit: async (formData) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      service: formData.service || 'Not specified',
      message: formData.message,
      _subject: `New Inquiry from ${formData.name} — IBDA'A Design Studio`,
      _template: 'table',
      _captcha: 'false',
    };

    try {
      const response = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.success) {
        throw {
          success: false,
          error: data.message || 'Failed to send message. Please try again.',
        };
      }

      return {
        success: true,
        message: 'Thank you for your message. We will get back to you within 24 hours.',
      };
    } catch (error) {
      if (error.success === false) throw error;
      throw {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    }
  },
};
