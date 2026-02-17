import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineClock,
} from 'react-icons/hi';
import ctaBg from '../../assets/images/projects/sohel-house.jpg';

const contactInfo = [
  {
    icon: <HiOutlineLocationMarker className="text-2xl" />,
    title: 'Visit Us',
    lines: ['D2, City Centre Complex', 'Marida Bhagol, Nadiad', 'Gujarat 387001'],
  },
  {
    icon: <HiOutlineMail className="text-2xl" />,
    title: 'Email Us',
    lines: ['hello@ibdaadesign.com', 'info@ibdaadesign.com'],
  },
  {
    icon: <HiOutlinePhone className="text-2xl" />,
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 12345 67890'],
  },
  {
    icon: <HiOutlineClock className="text-2xl" />,
    title: 'Working Hours',
    lines: ['Mon - Sat: 10:00 AM - 7:00 PM', 'Sunday: By Appointment'],
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you shortly.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* CTA Banner */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ctaBg} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-charcoal-900/80" />
        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Let's Build Something
              <br />
              <span className="text-accent italic">Extraordinary Together</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-white/60 text-lg mt-6 max-w-2xl mx-auto">
              Have a project in mind? We'd love to hear about it. Reach out and let's
              start a conversation about transforming your space.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Contact Form & Info */}
      <div className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-text -top-8 right-0 opacity-40">CONTACT</div>

          <div className="relative grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <span className="font-body text-accent text-sm tracking-[0.3em] uppercase font-medium">
                  Get In Touch
                </span>
                <h2 className="section-title mt-4 mb-6 text-3xl md:text-4xl">
                  Contact <span className="text-accent italic">Us</span>
                </h2>
                <div className="accent-line mb-8" />
                <p className="font-body text-charcoal-400 leading-relaxed mb-10">
                  Whether you're dreaming of a new home, renovating an existing space, or
                  need expert design consultation — we're here to help bring your vision
                  to life.
                </p>
              </ScrollReveal>

              <div className="space-y-8">
                {contactInfo.map((info, i) => (
                  <ScrollReveal key={info.title} delay={i * 0.1} direction="left">
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-heading text-lg font-semibold text-charcoal-700 mb-1">
                          {info.title}
                        </h4>
                        {info.lines.map((line) => (
                          <p key={line} className="font-body text-charcoal-400 text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <form onSubmit={handleSubmit} className="bg-warm p-8 md:p-12">
                  <h3 className="font-heading text-2xl font-bold text-charcoal-700 mb-8">
                    Send Us a Message
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block font-body text-sm text-charcoal-500 tracking-wider uppercase mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-charcoal-100 font-body text-charcoal-700 focus:border-accent focus:outline-none transition-colors duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm text-charcoal-500 tracking-wider uppercase mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-charcoal-100 font-body text-charcoal-700 focus:border-accent focus:outline-none transition-colors duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block font-body text-sm text-charcoal-500 tracking-wider uppercase mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-charcoal-100 font-body text-charcoal-700 focus:border-accent focus:outline-none transition-colors duration-300"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-sm text-charcoal-500 tracking-wider uppercase mb-2">
                        Service Needed
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-charcoal-100 font-body text-charcoal-700 focus:border-accent focus:outline-none transition-colors duration-300"
                      >
                        <option value="">Select a service</option>
                        <option value="architecture">Architectural Design</option>
                        <option value="interior">Interior Design</option>
                        <option value="renovation">Renovation</option>
                        <option value="consultation">Design Consultation</option>
                        <option value="3d">3D Visualization</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block font-body text-sm text-charcoal-500 tracking-wider uppercase mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-charcoal-100 font-body text-charcoal-700 focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-accent text-white font-body text-sm tracking-[0.2em] uppercase hover:bg-primary-500 transition-colors duration-300 shadow-lg shadow-accent/20"
                  >
                    Send Message
                  </motion.button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
