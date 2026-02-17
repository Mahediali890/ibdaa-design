import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';
import {
  HiOutlineOfficeBuilding,
  HiOutlineCube,
  HiOutlineColorSwatch,
  HiOutlinePencilAlt,
  HiOutlineTemplate,
  HiOutlineSun,
} from 'react-icons/hi';
import imgModernVilla from '../../assets/images/projects/modern-villa-front.jpg';
import imgArabian from '../../assets/images/projects/arabian-villa.jpg';
import imgSohel from '../../assets/images/projects/sohel-house.jpg';
import imgAmmarNight from '../../assets/images/projects/ammar-residence-night.jpg';
import imgCompact from '../../assets/images/projects/compact-house-night.jpg';
import imgContemporary from '../../assets/images/projects/contemporary-residence-day.jpg';

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

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden">
      <div className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Background text */}
          <div className="bg-text -top-8 right-0 opacity-40">SERVICES</div>

          <ScrollReveal>
            <div className="text-center mb-20 relative">
              <span className="font-body text-accent text-sm tracking-[0.3em] uppercase font-medium">
                What We Do
              </span>
              <h2 className="section-title mt-4">
                Our <span className="text-accent italic">Expertise</span>
              </h2>
              <div className="accent-line mx-auto mt-6" />
              <p className="section-subtitle mt-6 max-w-2xl mx-auto">
                From initial concept to final execution, we offer a comprehensive suite
                of design services tailored to your unique vision.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white border border-charcoal-50 overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal-900/40 group-hover:bg-charcoal-900/20 transition-all duration-500" />
                    <div className="absolute top-4 left-4 w-14 h-14 flex items-center justify-center bg-white/90 text-accent">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="font-heading text-xl font-bold text-charcoal-700 mb-3 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="font-body text-charcoal-400 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 font-body text-accent text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
