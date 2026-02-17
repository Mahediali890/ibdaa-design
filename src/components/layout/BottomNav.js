import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBriefcase,
  HiOutlineCollection,
  HiOutlineMail,
} from 'react-icons/hi';

const navItems = [
  { to: '/', label: 'Home', icon: HiOutlineHome },
  { to: '/about', label: 'About', icon: HiOutlineUser },
  { to: '/services', label: 'Services', icon: HiOutlineBriefcase },
  { to: '/projects', label: 'Projects', icon: HiOutlineCollection },
  { to: '/contact', label: 'Contact', icon: HiOutlineMail },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
      className="lg:hidden fixed z-50 bottom-4 inset-x-0 flex justify-center"
    >
      <nav className="flex items-center gap-2 px-3 py-2.5 bg-navy-800/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/40">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className="relative"
            >
              <div
                className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                  ${isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className="text-xl" />
                {isActive && (
                  <motion.div
                    layoutId="bottomNavActive"
                    className="absolute inset-0 bg-accent rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            </NavLink>
          );
        })}
      </nav>
    </motion.div>
  );
}
