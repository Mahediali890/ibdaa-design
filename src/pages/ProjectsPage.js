import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';
import { HiOutlineLocationMarker, HiArrowRight } from 'react-icons/hi';
import projects from '../data/projects';
import heroBg from '../assets/images/projects/ammar-residence-evening.jpg';

const categories = ['All', 'Villa', 'Contemporary', 'Residential'];

export default function ProjectsPage() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <>
      {/* ======================== PAGE HERO ======================== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Ammar Residence evening view" fetchpriority="high" className="w-full h-full object-cover" />
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
            Our Portfolio
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4"
          >
            Featured
            <br />
            <span className="font-accent italic text-accent">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-body text-white/50 text-lg mt-6 max-w-2xl mx-auto"
          >
            A curated selection of our finest work — each project reflecting our
            dedication to design excellence and client satisfaction.
          </motion.p>
        </div>
      </section>

      {/* ======================== PROJECTS GRID ======================== */}
      <section className="section-padding bg-navy-900">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`font-display text-sm font-medium tracking-wider px-6 py-3 min-h-[44px] rounded-full transition-all duration-300 ${
                    active === cat
                      ? 'bg-accent text-white shadow-lg shadow-accent/20'
                      : 'bg-navy-800 text-white/50 hover:text-white hover:bg-navy-700 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Project Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
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

                        {/* Always visible bottom gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-navy-900/30 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="inline-block px-3 py-1 bg-accent/20 backdrop-blur-sm text-accent text-xs font-display rounded-full mb-3">
                            {project.category}
                          </span>
                          <h3 className="font-display text-xl font-bold text-white mb-2">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-1 text-white/50 text-sm">
                            <HiOutlineLocationMarker className="text-accent" />
                            {project.location}
                          </div>
                          <div className="flex items-center gap-2 mt-3 text-accent text-sm font-display opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View Project <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ======================== CTA ======================== */}
      <section className="section-padding bg-navy-950">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="font-body text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Let's collaborate and create something extraordinary together. Your vision, our expertise.
            </p>
            <Link to="/contact" className="btn-primary rounded-full">
              Start Your Project <HiArrowRight />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
