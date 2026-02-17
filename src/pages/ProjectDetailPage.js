import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineViewGrid,
  HiCheck,
  HiX,
  HiZoomIn,
} from 'react-icons/hi';
import projects from '../data/projects';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const relatedProjects = projects
    .filter((p) => p.id !== id && p.tags.some((t) => project.tags.includes(t)))
    .slice(0, 3);

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      {/* ======================== HERO IMAGE ======================== */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-navy-900/20" />
          {/* Zoom hint */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <HiZoomIn className="text-white text-2xl" />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 pt-32">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-6"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-white/50 hover:text-accent transition-colors font-body text-sm"
            >
              <HiArrowLeft /> Back to Projects
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-block px-4 py-1.5 bg-accent/20 backdrop-blur-sm text-accent text-xs font-display rounded-full mb-4"
          >
            {project.category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          >
            {project.title}
          </motion.h1>
        </div>
      </section>

      {/* ======================== PROJECT INFO ======================== */}
      <section className="section-padding bg-navy-900">
        <div className="max-w-7xl mx-auto">
          {/* Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ScrollReveal delay={0.1}>
              <div className="card-dark p-6 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-accent/10 text-accent rounded-xl">
                  <HiOutlineLocationMarker className="text-2xl" />
                </div>
                <div>
                  <span className="block font-body text-white/40 text-xs uppercase tracking-wider">Location</span>
                  <span className="font-display text-white font-medium">{project.location}</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="card-dark p-6 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-accent/10 text-accent rounded-xl">
                  <HiOutlineCalendar className="text-2xl" />
                </div>
                <div>
                  <span className="block font-body text-white/40 text-xs uppercase tracking-wider">Year</span>
                  <span className="font-display text-white font-medium">{project.year}</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="card-dark p-6 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-accent/10 text-accent rounded-xl">
                  <HiOutlineViewGrid className="text-2xl" />
                </div>
                <div>
                  <span className="block font-body text-white/40 text-xs uppercase tracking-wider">Area</span>
                  <span className="font-display text-white font-medium">{project.area}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Description */}
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2 className="font-display text-3xl font-bold text-white mb-6">
                  About This Project
                </h2>
                <div className="accent-line mb-8" />
                <p className="font-body text-white/50 text-lg leading-relaxed mb-6">
                  {project.details}
                </p>
                <p className="font-body text-white/40 leading-relaxed">
                  {project.description}
                </p>
              </ScrollReveal>
            </div>

            {/* Features */}
            <div>
              <ScrollReveal delay={0.2}>
                <h3 className="font-display text-xl font-bold text-white mb-6">
                  Key Features
                </h3>
                <div className="space-y-4">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-7 h-7 flex items-center justify-center bg-accent/10 text-accent rounded-lg flex-shrink-0">
                        <HiCheck className="text-sm" />
                      </div>
                      <span className="font-body text-white/60 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Full Image - Clickable */}
          <ScrollReveal>
            <div
              className="mt-16 rounded-3xl overflow-hidden cursor-pointer relative group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition-all duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <HiZoomIn className="text-white text-2xl" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ======================== NAVIGATION ======================== */}
      <section className="bg-navy-800 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group p-8 md:p-12 flex items-center gap-4 hover:bg-navy-700/50 transition-colors duration-300 border-r border-white/5"
            >
              <HiArrowLeft className="text-2xl text-accent group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="block font-body text-white/30 text-xs uppercase tracking-wider">Previous</span>
                <span className="font-display text-white font-medium text-sm md:text-base">{prevProject.title}</span>
              </div>
            </Link>
          ) : (
            <div className="p-8 md:p-12 border-r border-white/5" />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group p-8 md:p-12 flex items-center justify-end gap-4 hover:bg-navy-700/50 transition-colors duration-300 text-right"
            >
              <div>
                <span className="block font-body text-white/30 text-xs uppercase tracking-wider">Next</span>
                <span className="font-display text-white font-medium text-sm md:text-base">{nextProject.title}</span>
              </div>
              <HiArrowRight className="text-2xl text-accent group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="p-8 md:p-12" />
          )}
        </div>
      </section>

      {/* ======================== RELATED PROJECTS ======================== */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-navy-900">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="section-tag">More Projects</span>
                  <h2 className="font-display text-3xl font-bold text-white mt-3">
                    Related <span className="font-accent italic text-accent">Work</span>
                  </h2>
                </div>
                <Link to="/projects" className="btn-outline rounded-full text-sm">
                  View All <HiArrowRight />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.1} direction="up">
                  <Link to={`/projects/${p.id}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="group relative overflow-hidden rounded-2xl cursor-pointer"
                    >
                      <div className="relative h-72 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="inline-block px-3 py-1 bg-accent/20 backdrop-blur-sm text-accent text-xs font-display rounded-full mb-2">
                            {p.category}
                          </span>
                          <h3 className="font-display text-lg font-bold text-white">
                            {p.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================== LIGHTBOX ======================== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-white transition-all duration-300"
            >
              <HiX className="text-2xl" />
            </button>

            {/* Project title */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="font-body text-white/40 text-xs tracking-wider uppercase">
                {project.category}
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                {project.title}
              </h3>
            </div>

            {/* Full HD Image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              src={project.image}
              alt={project.title}
              className="max-w-full max-h-full object-contain rounded-lg cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
