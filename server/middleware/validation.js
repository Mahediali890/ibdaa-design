/**
 * Validation Middleware
 * Input validation for IBDA'A contact form
 */

const { body, validationResult } = require('express-validator');

const DISPOSABLE_EMAIL_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'yopmail.com',
  'throwaway.email', 'temp-mail.org', 'fakeinbox.com', 'sharklasers.com',
  'guerrillamailblock.com', 'grr.la', 'dispostable.com', 'mailnesia.com',
  'maildrop.cc', 'discard.email', 'trashmail.com', 'trashmail.net',
  'mytemp.email', 'getnada.com', 'tempail.com', 'mohmal.com',
  'burnermail.io', 'mailcatch.com', 'tempr.email', 'tempinbox.com',
  'trash-mail.com', 'harakirimail.com', 'tmail.ws', 'mailnull.com',
  'jetable.org', 'spam4.me', 'greymail.com'
];

const contactValidationRules = [
  // Honeypot field - must be empty (bots fill this)
  body('website')
    .optional()
    .custom((value) => {
      if (value && value.trim().length > 0) {
        throw new Error('Invalid submission');
      }
      return true;
    }),

  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .customSanitizer((value) => {
      // Remove control characters that could be used for header injection
      return value.replace(/[\r\n\t\0]/g, '');
    }),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .custom((value) => {
      if (/\.{2,}/.test(value)) {
        throw new Error('Email contains invalid characters');
      }
      const domain = value.split('@')[1].toLowerCase();
      const tld = domain.split('.').pop();
      if (tld.length < 2 || /^\d+$/.test(tld)) {
        throw new Error('Email has an invalid domain');
      }
      if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
        throw new Error('Disposable/temporary emails are not allowed.');
      }
      return true;
    }),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .custom((value) => {
      const stripped = value.replace(/[\s\-\(\)\.+]/g, '');
      if (!/^\d+$/.test(stripped)) {
        throw new Error('Phone number must contain only digits');
      }
      if (stripped.length < 10 || stripped.length > 12) {
        throw new Error('Phone number must be 10-12 digits');
      }
      if (/^(\d)\1+$/.test(stripped)) {
        throw new Error('Please provide a real phone number');
      }
      return true;
    }),

  body('service')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['architecture', 'interior', 'renovation', 'consultation', '3d', ''])
    .withMessage('Invalid service selection'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 20, max: 2000 })
    .withMessage('Message must be between 20 and 2000 characters')
    .customSanitizer((value) => {
      // Remove null bytes
      return value.replace(/\0/g, '');
    }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];

    // Honeypot triggered - silently fake success (don't reveal bot detection)
    if (firstError.path === 'website') {
      return res.status(201).json({
        success: true,
        message: 'Thank you for your message. We will get back to you within 24 hours.',
        data: { id: 0, createdAt: new Date().toISOString() }
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
        .filter(err => err.path !== 'website')
        .map(err => ({
          field: err.path,
          message: err.msg
        }))
    });
  }

  next();
};

module.exports = {
  contactValidationRules,
  validate
};
