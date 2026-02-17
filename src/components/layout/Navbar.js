import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import whiteLogo from "../../assets/images/logo/white_logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-xl shadow-lg shadow-black/20 py-2"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={whiteLogo}
            alt="IBDA'A Design Studio"
            className="h-16 md:h-14 lg:h-16 w-auto object-contain transition-all duration-300"
          />
        </Link>

        {/* Desktop - Nav Links + Get Started */}
        <div className="hidden lg:flex items-center gap-4">
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`relative px-5 py-2.5 font-display text-sm font-medium tracking-wider transition-all duration-300 rounded-full ${
                    isActive ? "text-accent" : "text-white/100 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 bg-accent/20 border border-accent/35 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          <Link
            to="/contact"
            className="px-7 py-3 bg-accent text-white font-display text-sm font-medium tracking-wider hover:bg-accent-light transition-all duration-300 rounded-full hover:shadow-lg hover:shadow-accent/20"
          >
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
