import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';
import {
  HiOutlineOfficeBuilding,
  HiOutlineCube,
  HiOutlineColorSwatch,
  HiOutlinePencilAlt,
  HiOutlineTemplate,
  HiOutlineSun,
  HiArrowRight,
  HiCheck,
} from 'react-icons/hi';
import heroBg from '../assets/images/projects/contemporary-residence-day.jpg';
import imgModernVilla from '../assets/images/projects/modern-villa-front.jpg';
import imgArabian from '../assets/images/projects/arabian-villa.jpg';
import imgSohel from '../assets/images/projects/sohel-house.jpg';
import imgAmmarNight from '../assets/images/projects/ammar-residence-night.jpg';
import imgCompact from '../assets/images/projects/compact-house-night.jpg';
import imgContemporary from '../assets/images/projects/contemporary-residence-day.jpg';

const services = [
  {
    icon: <HiOutlineOfficeBuilding className="text-4xl" />,
    title: 'Architectural Design',
    description:
      'Comprehensive architectural solutions from concept to construction — residential, commercial, and institutional projects designed with precision and purpose.',
    image: imgModernVilla,
  },
  {
    icon: <HiOutlineCube className="text-4xl" />,
    title: 'Interior Design',
    description:
      'Bespoke interior spaces that harmonize form and function. We curate every element — furniture, lighting, textures — to craft interiors that feel like home.',
    image: imgArabian,
  },
  {
    icon: <HiOutlineColorSwatch className="text-4xl" />,
    title: 'Space Planning',
    description:
      'Strategic spatial layouts that maximize flow, comfort, and utility. We optimize every square foot to serve your lifestyle and business needs.',
    image: imgSohel,
  },
  {
    icon: <HiOutlinePencilAlt className="text-4xl" />,
    title: '3D Visualization',
    description:
      'Photorealistic renders and walkthroughs that bring your project to life before construction begins. See your future space in vivid detail.',
    image: imgAmmarNight,
  },
  {
    icon: <HiOutlineTemplate className="text-4xl" />,
    title: 'Renovation & Remodeling',
    description:
      'Breathing new life into existing structures. We reimagine and revitalize spaces while respecting their original character and your evolving needs.',
    image: imgCompact,
  },
  {
    icon: <HiOutlineSun className="text-4xl" />,
    title: 'Sustainable Design',
    description:
      'Eco-conscious design strategies that reduce environmental impact without compromising beauty. Green materials, energy efficiency, and natural harmony.',
    image: imgContemporary,
  },
];

const processSteps = [
  { step: '01', title: 'Consultation', desc: 'We begin with a deep dive into your vision, needs, and aspirations for the space.' },
  { step: '02', title: 'Concept Design', desc: 'Our team develops creative concepts and preliminary designs tailored to your brief.' },
  { step: '03', title: 'Development', desc: 'Detailed drawings, 3D visualizations, and material specifications bring the design to life.' },
  { step: '04', title: 'Execution', desc: 'We oversee every aspect of construction to ensure the final result matches our shared vision.' },
];

export default function ServicesPage() {
  return (
    <>
      {/* ======================== PAGE HERO ======================== */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Contemporary urban residence" fetchpriority="high" className="w-full h-full object-cover" />
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
            Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-4"
          >
            What We
            <br />
            <span className="font-accent italic text-accent">Offer</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-body text-white/50 text-lg mt-6 max-w-2xl mx-auto"
          >
            From initial concept to final execution, we offer a comprehensive suite
            of design services tailored to your unique vision.
          </motion.p>
        </div>
      </section>

      {/* ======================== SERVICES GRID ======================== */}
      <section className="section-padding bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-navy-800 border border-white/5 rounded-2xl overflow-hidden hover:border-accent/20 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy-900/50 group-hover:bg-navy-900/30 transition-all duration-500" />
                    <div className="absolute top-4 left-4 w-14 h-14 flex items-center justify-center bg-navy-800/90 backdrop-blur-sm text-accent rounded-xl border border-white/10">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="font-body text-white/50 leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== PROCESS ======================== */}
      <section className="section-padding bg-navy-950">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="section-tag">How We Work</span>
              <h2 className="section-title mt-4">
                Our <span className="font-accent italic text-accent">Process</span>
              </h2>
              <div className="accent-line mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.15} direction="up">
                <div className="relative group">
                  <span className="font-display text-7xl font-bold text-white/5 group-hover:text-accent/10 transition-colors duration-500">
                    {step.step}
                  </span>
                  <div className="mt-[-20px]">
                    <h3 className="font-display text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="font-body text-white/50 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 right-0 w-full h-[1px] bg-white/5" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== WHY CHOOSE US ======================== */}
      <section className="section-padding bg-navy-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={imgSohel}
                  alt="Why choose IBDA'A"
                  loading="lazy"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <span className="section-tag">Why Choose Us</span>
                <h2 className="section-title mt-4 mb-8 text-3xl md:text-4xl">
                  Building Dreams with
                  <br />
                  <span className="font-accent italic text-accent">Innovative Structures</span>
                </h2>
              </ScrollReveal>

              <div className="space-y-5">
                {[
                  'Award-winning architectural designs',
                  '5+ years of industry experience',
                  'Sustainable & eco-friendly approaches',
                  'Collaborative design process',
                  'On-time project delivery',
                  'Post-completion support',
                ].map((item, i) => (
                  <ScrollReveal key={item} delay={i * 0.1}>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center bg-accent/10 text-accent rounded-lg flex-shrink-0">
                        <HiCheck />
                      </div>
                      <span className="font-body text-white/60">{item}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.5}>
                <Link to="/contact" className="btn-primary rounded-full mt-10 inline-flex">
                  Start Your Project <HiArrowRight />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
