import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';

import imgModernVillaFront from '../../assets/images/projects/modern-villa-front.jpg';
import imgModernVillaAngle from '../../assets/images/projects/modern-villa-angle.jpg';
import imgContemporaryDay from '../../assets/images/projects/contemporary-residence-day.jpg';
import imgContemporaryAngle from '../../assets/images/projects/contemporary-residence-angle.jpg';
import imgArabianVilla from '../../assets/images/projects/arabian-villa.jpg';
import imgAmmarEvening from '../../assets/images/projects/ammar-residence-evening.jpg';
import imgAmmarNight from '../../assets/images/projects/ammar-residence-night.jpg';
import imgSohelHouse from '../../assets/images/projects/sohel-house.jpg';
import imgCompactNight from '../../assets/images/projects/compact-house-night.jpg';

const categories = ['All', 'Villa', 'Contemporary', 'Residential'];

const projects = [
  {
    id: 1,
    title: 'Modern Villa Residence',
    category: 'Villa',
    tags: ['Villa', 'Residential'],
    image: imgModernVillaFront,
    description: 'Contemporary villa featuring decorative jali screens, lush landscaping, and a bold geometric facade.',
  },
  {
    id: 2,
    title: 'Modern Villa - Evening View',
    category: 'Villa',
    tags: ['Villa', 'Residential'],
    image: imgModernVillaAngle,
    description: 'The same villa captured at golden hour, showcasing the interplay of warm light and modern materials.',
  },
  {
    id: 3,
    title: 'Contemporary Urban House',
    category: 'Contemporary',
    tags: ['Contemporary', 'Residential'],
    image: imgContemporaryDay,
    description: 'A sleek three-story residence blending wood cladding, stone textures, and glass for a striking street presence.',
  },
  {
    id: 4,
    title: 'Arabian Heritage Villa',
    category: 'Villa',
    tags: ['Villa', 'Residential'],
    image: imgArabianVilla,
    description: 'An elegant villa inspired by Islamic architectural traditions with ornate arched jali patterns and warm desert tones.',
  },
  {
    id: 5,
    title: 'Ammar Residence',
    category: 'Contemporary',
    tags: ['Contemporary', 'Residential'],
    image: imgAmmarEvening,
    description: 'A warm contemporary home with wooden accents, jali screens, and beautiful evening ambience.',
  },
  {
    id: 6,
    title: 'Sohel House',
    category: 'Residential',
    tags: ['Villa', 'Residential'],
    image: imgSohelHouse,
    description: 'A grand residential project with cantilevered wooden ceilings, stone cladding, and expansive glazing.',
  },
  {
    id: 7,
    title: 'Ammar Residence - Night View',
    category: 'Contemporary',
    tags: ['Contemporary', 'Residential'],
    image: imgAmmarNight,
    description: 'The dramatic night perspective showcasing accent lighting, textured walls, and jali pattern detailing.',
  },
  {
    id: 8,
    title: 'Compact Modern Dwelling',
    category: 'Contemporary',
    tags: ['Contemporary', 'Residential'],
    image: imgCompactNight,
    description: 'A compact yet elegant home design with warm wooden cladding and ambient uplighting for a cozy night appeal.',
  },
  {
    id: 9,
    title: 'Contemporary Residence - Street View',
    category: 'Contemporary',
    tags: ['Contemporary', 'Residential'],
    image: imgContemporaryAngle,
    description: 'The full street elevation revealing the layered massing and material harmony of this urban residence.',
  },
];

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? projects
      : projects.filter((p) => p.tags.includes(active));

  return (
    <section id="projects" className="relative overflow-hidden">
      <div className="section-padding bg-warm">
        <div className="max-w-7xl mx-auto">
          {/* Background text */}
          <div className="bg-text -top-8 left-0 opacity-30">PROJECTS</div>

          <ScrollReveal>
            <div className="text-center mb-16 relative">
              <span className="font-body text-accent text-sm tracking-[0.3em] uppercase font-medium">
                Our Portfolio
              </span>
              <h2 className="section-title mt-4">
                Featured <span className="text-accent italic">Projects</span>
              </h2>
              <div className="accent-line mx-auto mt-6" />
              <p className="section-subtitle mt-6 max-w-2xl mx-auto">
                A curated selection of our finest work — each project reflecting our
                dedication to design excellence and client satisfaction.
              </p>
            </div>
          </ScrollReveal>

          {/* Filter Tabs */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative font-body text-sm tracking-[0.15em] uppercase px-6 py-3 transition-all duration-300 ${
                    active === cat
                      ? 'bg-accent text-white shadow-lg shadow-accent/20'
                      : 'bg-white text-charcoal-400 hover:text-accent hover:shadow-md'
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
                  className="group relative overflow-hidden cursor-pointer"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="font-body text-accent text-xs tracking-[0.2em] uppercase">
                          {project.category}
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-white mt-2">
                          {project.title}
                        </h3>
                        <p className="font-body text-white/60 text-sm mt-2 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-accent border-l-[60px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-14">
              <span className="inline-block px-10 py-4 border-2 border-accent text-accent font-body text-sm tracking-[0.15em] uppercase hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer">
                View All Projects
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
