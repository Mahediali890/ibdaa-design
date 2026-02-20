import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { HiArrowDown, HiOutlinePhone } from "react-icons/hi";
import heroBg from "../../assets/images/projects/modern-villa-front.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="IBDA'A Design Studio Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/70 via-charcoal-900/50 to-charcoal-900/80" />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-12 md:left-24 w-[1px] h-full bg-white/10 z-10" />
      <div className="absolute top-0 right-12 md:right-24 w-[1px] h-full bg-white/10 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-block font-body text-accent text-sm tracking-[0.4em] uppercase">
            Architecture & Interior Design
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-[1.1] mb-6"
        >
          Crafting Spaces
          <br />
          <span className="text-accent italic font-medium">That Inspire</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-body text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          We transform your vision into extraordinary architectural experiences,
          blending innovation with timeless elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="projects"
            smooth
            duration={800}
            offset={-80}
            className="cursor-pointer px-10 py-4 bg-accent text-white font-body text-sm tracking-[0.15em] uppercase hover:bg-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
          >
            View Our Work
          </Link>
          <Link
            to="contact"
            smooth
            duration={800}
            offset={-80}
            className="cursor-pointer flex items-center gap-3 px-10 py-4 border border-white/30 text-white font-body text-sm tracking-[0.15em] uppercase hover:border-accent hover:text-accent transition-all duration-300 group"
          >
            <span className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
              <HiOutlinePhone className="text-accent group-hover:text-white" />
            </span>
            Free Consultation
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <Link
          to="about"
          smooth
          duration={800}
          offset={-80}
          className="cursor-pointer flex flex-col items-center gap-2 group"
        >
          <span className="font-body text-white/50 text-xs tracking-[0.3em] uppercase group-hover:text-accent transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <HiArrowDown className="text-accent text-xl" />
          </motion.div>
        </Link>
      </motion.div>

    </section>
  );
}
