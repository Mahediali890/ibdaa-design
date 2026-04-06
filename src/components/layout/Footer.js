import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowUp, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi';
import { FaInstagram } from 'react-icons/fa';
import whiteLogo from '../../assets/images/logo/white_logo.png';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const services = [
  'Architectural Design',
  'Interior Design',
  'Space Planning',
  '3D Visualization',
  'Renovation',
  'Sustainable Design',
];

const INSTAGRAM_URL = 'https://www.instagram.com/ibdaa_design_studio?utm_source=qr&igsh=ZWNvbXZvMGl2bmow';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-navy-950 relative border-t border-white/5">
      {/* Back to top */}
      <div className="flex justify-center -mt-7">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -4, scale: 1.1 }}
          aria-label="Back to top"
          className="w-14 h-14 bg-accent text-white flex items-center justify-center rounded-full shadow-lg shadow-accent/30 hover:bg-accent-light transition-colors duration-300"
        >
          <HiOutlineArrowUp className="text-xl" />
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <img
              src={whiteLogo}
              alt="IBDA'A Design Studio"
              className="h-16 md:h-20 w-auto mb-6"
            />
            <p className="font-body text-white/50 text-sm leading-relaxed mb-6">
              Transforming spaces into timeless experiences. We bring creativity,
              precision, and passion to every project we undertake.
            </p>
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="inline-flex items-center gap-3 px-5 py-3 border border-white/10 text-white/40 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 rounded-full"
              aria-label="Instagram"
            >
              <FaInstagram className="text-lg" />
              <span className="font-display text-sm font-medium">Instagram</span>
            </motion.a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-white/50 text-sm hover:text-accent hover:pl-2 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="font-body text-white/50 text-sm hover:text-accent transition-colors duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiOutlineLocationMarker className="text-accent text-lg mt-0.5 flex-shrink-0" />
                <span className="font-body text-white/50 text-sm leading-relaxed">
                  D2, City Center Complex,<br />Marida Bhagol, Nadiad,<br />Gujarat 387001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlinePhone className="text-accent text-lg flex-shrink-0" />
                <a href="tel:+918490059240" className="font-body text-white/50 text-sm hover:text-accent transition-colors duration-300">
                  +91 84900 59240
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineMail className="text-accent text-lg flex-shrink-0" />
                <a href="mailto:ibdaadesignstudio@gmail.com" className="font-body text-white/50 text-sm hover:text-accent transition-colors duration-300">
                  ibdaadesignstudio@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiOutlineClock className="text-accent text-lg flex-shrink-0" />
                <span className="font-body text-white/50 text-sm">
                  Mon - Sat: 10 AM - 7 PM
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-white/30 text-sm">
            &copy; {new Date().getFullYear()} IBDA'A Design Studio. All rights reserved.
          </p>
          <p className="font-body text-white/20 text-xs">
            Crafted with passion for architecture & design
          </p>
        </div>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-20 lg:h-0" />
    </footer>
  );
}
