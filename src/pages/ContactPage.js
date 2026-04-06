import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineClock,
  HiArrowRight,
} from 'react-icons/hi';
import { FaInstagram } from 'react-icons/fa';
import { contactApi } from '../services/api';
import heroBg from '../assets/images/projects/compact-house-night.jpg';

// Disposable/temporary email domains to block
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

/**
 * Validate email: format + disposable domain check + TLD check
 */
const validateEmail = (email) => {
  if (!email.trim()) return 'Email is required';

  const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';

  if (/\.{2,}/.test(email)) return 'Email contains invalid characters';

  const domain = email.split('@')[1].toLowerCase();
  const tld = domain.split('.').pop();

  if (tld.length < 2 || /^\d+$/.test(tld)) return 'Email has an invalid domain';

  if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
    return 'Disposable/temporary emails are not allowed. Please use your business or personal email.';
  }

  return null;
};

/**
 * Validate phone number (Indian format)
 */
const validatePhone = (phone) => {
  if (!phone.trim()) return null; // Phone is optional

  const stripped = phone.replace(/[\s\-().+]/g, '');

  if (!/^\d+$/.test(stripped)) return 'Phone number must contain only digits';

  if (stripped.length < 10 || stripped.length > 12) {
    return 'Phone number must be 10-12 digits';
  }

  if (/^(\d)\1+$/.test(stripped)) return 'Please enter a real phone number';

  return null;
};

const contactInfo = [
  {
    icon: <HiOutlineLocationMarker className="text-2xl" />,
    title: 'Visit Us',
    lines: ['D2, City Center Complex', 'Marida Bhagol, Nadiad', 'Gujarat 387001'],
  },
  {
    icon: <HiOutlineMail className="text-2xl" />,
    title: 'Email Us',
    lines: ['ibdaadesignstudio@gmail.com'],
  },
  {
    icon: <HiOutlinePhone className="text-2xl" />,
    title: 'Call Us',
    lines: ['+91 84900 59240'],
  },
  {
    icon: <HiOutlineClock className="text-2xl" />,
    title: 'Working Hours',
    lines: ['Mon - Sat: 10:00 AM - 7:00 PM', 'Sunday: By Appointment'],
  },
];

const emptyForm = { name: '', email: '', phone: '', service: '', message: '', website: '' };

export default function ContactPage() {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [, setFieldValidated] = useState({});

  // Auto-dismiss success/error messages after 8 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 8000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
      setFieldValidated((prev) => ({ ...prev, [name]: false }));
    }
  };

  // Real-time validation on blur
  const handleBlur = (fieldName) => {
    let fieldError = null;

    if (fieldName === 'email') {
      fieldError = validateEmail(formData.email);
    } else if (fieldName === 'phone') {
      fieldError = validatePhone(formData.phone);
    } else if (fieldName === 'name') {
      if (!formData.name.trim()) fieldError = 'Name is required';
    } else if (fieldName === 'message') {
      if (!formData.message.trim()) fieldError = 'Message is required';
      else if (formData.message.length < 20) fieldError = 'Message must be at least 20 characters';
    }

    if (fieldError) {
      setValidationErrors((prev) => ({ ...prev, [fieldName]: fieldError }));
      setFieldValidated((prev) => ({ ...prev, [fieldName]: false }));
    } else if (formData[fieldName] && formData[fieldName].trim()) {
      setValidationErrors((prev) => ({ ...prev, [fieldName]: null }));
      setFieldValidated((prev) => ({ ...prev, [fieldName]: true }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Name is required';

    const emailErr = validateEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) errors.phone = phoneErr;

    if (!formData.message.trim()) errors.message = 'Message is required';
    else if (formData.message.length < 20) errors.message = 'Message must be at least 20 characters';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    // Honeypot: if filled, silently fake success (bot detected)
    if (formData.website) {
      setSuccess('Thank you! Your message has been sent successfully.');
      setFormData(emptyForm);
      setFieldValidated({});
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { website, ...cleanData } = formData;
      const submitData = {
        ...cleanData,
        phone: cleanData.phone.replace(/[\s\-().]/g, ''),
      };
      const response = await contactApi.submit(submitData);
      setSuccess(response.message || 'Thank you for reaching out! We will get back to you shortly.');
      setFormData(emptyForm);
      setFieldValidated({});
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ======================== PAGE HERO ======================== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Compact modern dwelling at night" fetchpriority="high" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-900/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/50" />
        </div>
        <div className="relative z-10 text-center px-6 pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-tag"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4"
          >
            Let's Start a
            <br />
            <span className="font-accent italic text-accent">Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-body text-white/50 text-lg mt-6 max-w-2xl mx-auto"
          >
            Have a project in mind? We'd love to hear about it. Reach out and let's
            start transforming your space.
          </motion.p>
        </div>
      </section>

      {/* ======================== CONTACT FORM & INFO ======================== */}
      <section className="section-padding bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <span className="section-tag">Contact Info</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
                Reach <span className="font-accent italic text-accent">Out</span>
              </h2>
              <div className="accent-line mb-8" />
              <p className="font-body text-white/50 leading-relaxed mb-10">
                Whether you're dreaming of a new home, renovating an existing space, or
                need expert design consultation — we're here to help bring your vision
                to life.
              </p>

              <div className="space-y-8">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-accent/10 text-accent rounded-xl group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-display text-lg font-semibold text-white mb-1">
                        {info.title}
                      </h4>
                      {info.lines.map((line) => (
                        <p key={line} className="font-body text-white/50 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-10"
              >
                <h4 className="font-display text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
                  Follow Us
                </h4>
                <motion.a
                  href="https://www.instagram.com/ibdaa_design_studio?utm_source=qr&igsh=ZWNvbXZvMGl2bmow"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="inline-flex items-center gap-3 px-5 py-3 border border-white/10 text-white/60 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 rounded-full"
                >
                  <FaInstagram className="text-lg" />
                  <span className="font-display text-sm font-medium">Instagram</span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} noValidate className="card-dark p-8 md:p-12">
                <h3 className="font-display text-2xl font-bold text-white mb-8">
                  Send Us a Message
                </h3>

                {/* Success message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-display text-green-400 font-semibold text-sm">Message Sent!</h4>
                        <p className="font-body text-green-300/80 text-xs">{success}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-display text-red-400 font-semibold text-sm">Something went wrong</h4>
                        <p className="font-body text-red-300/80 text-xs">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Honeypot anti-spam field */}
                <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-body text-xs text-white/50 tracking-wider uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      required
                      disabled={loading}
                      className={`w-full px-4 py-3.5 bg-navy-700/50 border rounded-xl font-body text-white placeholder:text-white/20 focus:border-accent focus:outline-none transition-colors duration-300 ${validationErrors.name ? 'border-red-500/50' : 'border-white/10'}`}
                      placeholder="Your name"
                    />
                    {validationErrors.name && (
                      <p className="font-body text-red-400 text-xs mt-1">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-xs text-white/50 tracking-wider uppercase mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      required
                      disabled={loading}
                      className={`w-full px-4 py-3.5 bg-navy-700/50 border rounded-xl font-body text-white placeholder:text-white/20 focus:border-accent focus:outline-none transition-colors duration-300 ${validationErrors.email ? 'border-red-500/50' : 'border-white/10'}`}
                      placeholder="your@email.com"
                    />
                    {validationErrors.email && (
                      <p className="font-body text-red-400 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-body text-xs text-white/50 tracking-wider uppercase mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={() => handleBlur('phone')}
                      disabled={loading}
                      className={`w-full px-4 py-3.5 bg-navy-700/50 border rounded-xl font-body text-white placeholder:text-white/20 focus:border-accent focus:outline-none transition-colors duration-300 ${validationErrors.phone ? 'border-red-500/50' : 'border-white/10'}`}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {validationErrors.phone && (
                      <p className="font-body text-red-400 text-xs mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-xs text-white/50 tracking-wider uppercase mb-2">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-full px-4 py-3.5 bg-navy-700/50 border border-white/10 rounded-xl font-body text-white focus:border-accent focus:outline-none transition-colors duration-300"
                    >
                      <option value="" className="bg-navy-800">Select a service</option>
                      <option value="architecture" className="bg-navy-800">Architectural Design</option>
                      <option value="interior" className="bg-navy-800">Interior Design</option>
                      <option value="renovation" className="bg-navy-800">Renovation</option>
                      <option value="consultation" className="bg-navy-800">Design Consultation</option>
                      <option value="3d" className="bg-navy-800">3D Visualization</option>
                    </select>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block font-body text-xs text-white/50 tracking-wider uppercase mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    required
                    disabled={loading}
                    rows={5}
                    className={`w-full px-4 py-3.5 bg-navy-700/50 border rounded-xl font-body text-white placeholder:text-white/20 focus:border-accent focus:outline-none transition-colors duration-300 resize-none ${validationErrors.message ? 'border-red-500/50' : 'border-white/10'}`}
                    placeholder="Tell us about your project..."
                  />
                  {validationErrors.message && (
                    <p className="font-body text-red-400 text-xs mt-1">{validationErrors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  disabled={loading}
                  className="w-full py-4 bg-accent text-white font-display text-sm font-medium tracking-wider uppercase rounded-full hover:bg-accent-light transition-all duration-300 shadow-lg shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <HiArrowRight />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
