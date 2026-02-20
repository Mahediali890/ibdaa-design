import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "../components/common/ScrollReveal";
import {
  HiArrowRight,
  HiOutlineLocationMarker,
  HiOutlineOfficeBuilding,
  HiOutlineCube,
  HiOutlinePencilAlt,
  HiOutlinePhone,
} from "react-icons/hi";
import heroBg from "../assets/images/projects/modern-villa-front.jpg";
import aboutImg from "../assets/images/projects/modern-villa-angle.jpg";
import featuredImg from "../assets/images/projects/ammar-residence-evening.jpg";
import projects from "../data/projects";

const featuredServices = [
  {
    icon: <HiOutlineOfficeBuilding className="text-3xl" />,
    title: "Architectural Design",
    desc: "Comprehensive architectural solutions from concept to construction — residential, commercial, and institutional.",
  },
  {
    icon: <HiOutlineCube className="text-3xl" />,
    title: "Interior Design",
    desc: "Bespoke interior spaces that harmonize form and function with curated elements and textures.",
  },
  {
    icon: <HiOutlinePencilAlt className="text-3xl" />,
    title: "3D Visualization",
    desc: "Photorealistic renders and walkthroughs that bring your project to life before construction begins.",
  },
];

const stats = [
  { number: "50+", label: "Projects" },
  { number: "5+", label: "Years" },
  { number: "60+", label: "Clients" },
  { number: "5+", label: "Awards" },
];

const featuredProjects = projects.slice(0, 6);

export default function HomePage() {
  return (
    <>
      {/* ======================== HERO ======================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="Modern villa architecture" fetchpriority="high" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/70 to-navy-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/30" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <span className="section-tag">
                  Architecture & Interior Design
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mt-5 mb-6"
              >
                Crafted for
                <br />
                <span className="font-accent italic text-accent">
                  Modern Living
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="font-body text-white/60 text-lg max-w-lg mb-8 leading-relaxed"
              >
                Modern architecture, prestigious settings, timeless design. We
                transform your vision into extraordinary architectural
                experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link to="/projects" className="btn-primary rounded-full">
                  Discover More <HiArrowRight />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline rounded-full group"
                >
                  <span className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                    <HiOutlinePhone className="text-accent group-hover:text-white" />
                  </span>
                  Free Consultation
                </Link>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="flex gap-8"
              >
                {stats.map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <span className="block font-display text-2xl md:text-3xl font-bold text-accent">
                      {stat.number}
                    </span>
                    <span className="font-body text-white/50 text-xs tracking-wider uppercase">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-black/30 max-w-sm ml-auto"
                >
                  {/* Card Header */}
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-charcoal-500">
                      <HiOutlineLocationMarker className="text-accent" />
                      <span className="font-display text-sm font-medium text-charcoal-700">
                        Vaso
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-charcoal-50 rounded-full text-xs font-display text-charcoal-600">
                        3 Bedroom
                      </span>
                      <span className="px-3 py-1 bg-charcoal-50 rounded-full text-xs font-display text-charcoal-600">
                        3 Bathroom
                      </span>
                    </div>
                  </div>

                  {/* Card Image */}
                  <div className="relative h-52 overflow-hidden mx-4 rounded-2xl">
                    <img
                      src={featuredImg}
                      alt="Ammar Residence"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-charcoal-800">
                      Ammar Residence
                    </h3>
                    <span className="font-display text-accent font-bold">
                      Featured
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 bg-accent rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ======================== ABOUT PREVIEW ======================== */}
      <section className="section-padding bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={aboutImg}
                    alt="IBDA'A Design Studio project"
                    loading="lazy"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                </div>
                {/* Experience badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-2xl shadow-accent/20"
                >
                  <span className="block font-display text-4xl font-bold">
                    5+
                  </span>
                  <span className="font-body text-sm text-white/80">
                    Years of
                    <br />
                    Excellence
                  </span>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <div>
              <ScrollReveal>
                <span className="section-tag">Who We Are</span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="section-title mt-4 mb-6">
                  Transforming Ideas into
                  <br />
                  <span className="font-accent italic text-accent">
                    Iconic Spaces
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="accent-line mb-8" />
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="font-body text-white/50 leading-relaxed text-lg mb-6">
                  <strong className="text-white">IBDA'A Design Studio</strong>{" "}
                  is a distinguished architecture and interior design practice
                  dedicated to creating spaces that resonate with purpose,
                  beauty, and innovation.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="font-body text-white/50 leading-relaxed mb-8">
                  With over five years of experience, our studio has delivered a
                  diverse portfolio spanning residential homes, commercial
                  spaces, luxury interiors, and urban planning projects.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <Link to="/about" className="btn-primary rounded-full">
                  Learn More <HiArrowRight />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== SERVICES PREVIEW ======================== */}
      <section className="section-padding bg-navy-950">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-tag">What We Do</span>
              <h2 className="section-title mt-4">
                Our{" "}
                <span className="font-accent italic text-accent">
                  Expertise
                </span>
              </h2>
              <div className="accent-line mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.15} direction="up">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="card-dark p-8 group"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-accent/10 text-accent rounded-2xl mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-body text-white/50 leading-relaxed text-sm">
                    {service.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 font-display text-accent text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more{" "}
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-14">
              <Link to="/services" className="btn-outline rounded-full">
                View All Services <HiArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ======================== FEATURED PROJECTS ======================== */}
      <section className="section-padding bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="section-tag">Our Portfolio</span>
                <h2 className="section-title mt-4">
                  Featured{" "}
                  <span className="font-accent italic text-accent">
                    Projects
                  </span>
                </h2>
              </div>
              <Link to="/projects" className="btn-outline rounded-full">
                View All <HiArrowRight />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 0.1} direction="up">
                <Link to={`/projects/${project.id}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent opacity-60 group-hover:opacity-100 transition-all duration-500" />

                      {/* Content on hover */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 bg-accent/20 backdrop-blur-sm text-accent text-xs font-display rounded-full mb-3">
                          {project.category}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-1 mt-2 text-white/50 text-sm">
                          <HiOutlineLocationMarker className="text-accent" />
                          {project.location}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== CTA SECTION ======================== */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={projects[5].image}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/85" />
        </div>
        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Let's Build Something
              <br />
              <span className="font-accent italic text-accent">
                Extraordinary Together
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="font-body text-white/50 text-lg mt-6 max-w-2xl mx-auto mb-10">
              Have a project in mind? We'd love to hear about it. Reach out and
              let's start a conversation about transforming your space.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link to="/contact" className="btn-primary rounded-full text-base">
              Start Your Project <HiArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
