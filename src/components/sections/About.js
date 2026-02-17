import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';
import { HiOutlineLightBulb, HiOutlineHome, HiOutlineSparkles } from 'react-icons/hi';
import aboutImg from '../../assets/images/projects/modern-villa-angle.jpg';

const stats = [
  { number: '150+', label: 'Projects Completed' },
  { number: '5+', label: 'Years of Experience' },
  { number: '120+', label: 'Happy Clients' },
  { number: '15+', label: 'Design Awards' },
];

const values = [
  {
    icon: <HiOutlineLightBulb className="text-3xl" />,
    title: 'Innovative Vision',
    desc: 'Every space tells a story. We bring fresh, creative perspectives to each project, ensuring designs that are both functional and extraordinary.',
  },
  {
    icon: <HiOutlineHome className="text-3xl" />,
    title: 'Crafted Excellence',
    desc: 'From concept to completion, we maintain the highest standards of quality, paying meticulous attention to every detail that defines your space.',
  },
  {
    icon: <HiOutlineSparkles className="text-3xl" />,
    title: 'Timeless Design',
    desc: 'We believe in creating spaces that transcend trends — designs that feel as relevant and inspiring decades from now as they do today.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* Main About */}
      <div className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Background text */}
          <div className="bg-text -top-8 left-0 opacity-40">ABOUT</div>

          <div className="relative grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <ScrollReveal direction="left">
              <div className="relative">
                <div className="relative overflow-hidden">
                  <img
                    src={aboutImg}
                    alt="IBDA'A Design Studio project"
                    loading="lazy"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                {/* Accent frame */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent -z-10" />
                {/* Experience badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-6 -left-6 bg-charcoal-700 text-white p-6 shadow-2xl"
                >
                  <span className="block font-heading text-4xl font-bold text-accent">5+</span>
                  <span className="font-body text-sm tracking-wider uppercase">Years of<br />Excellence</span>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Text Side */}
            <div>
              <ScrollReveal>
                <span className="font-body text-accent text-sm tracking-[0.3em] uppercase font-medium">
                  Who We Are
                </span>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="section-title mt-4 mb-6">
                  Where Creativity
                  <br />
                  <span className="text-accent italic">Meets Structure</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="accent-line mb-8" />
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="font-body text-charcoal-400 leading-relaxed text-lg mb-6">
                  <strong className="text-charcoal-700">IBDA'A Design Studio</strong> is a
                  distinguished architecture and interior design practice dedicated to
                  creating spaces that resonate with purpose, beauty, and innovation. The
                  word <em>"Ibda'a"</em> means <em>"creativity"</em> in Arabic — and that
                  ethos is woven into every project we undertake.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <p className="font-body text-charcoal-400 leading-relaxed text-lg mb-8">
                  With over five years of experience in architectural design and interior
                  styling, our studio has delivered a diverse portfolio spanning residential
                  homes, commercial spaces, luxury interiors, and urban planning projects.
                  We believe that great design is not just about aesthetics — it is about
                  creating environments that enhance life, elevate mood, and stand the test
                  of time.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <p className="font-body text-charcoal-400 leading-relaxed text-lg">
                  Our approach is deeply collaborative. We listen, we envision, and we
                  build — transforming raw concepts into refined realities. Every line drawn
                  and every material chosen reflects our unwavering commitment to quality,
                  sustainability, and the unique story of each client.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-charcoal-700 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.15} direction="up">
              <div className="text-center">
                <motion.span
                  className="block font-heading text-4xl md:text-5xl font-bold text-accent mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.span>
                <span className="font-body text-white/70 text-sm tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="section-padding bg-warm">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="font-body text-accent text-sm tracking-[0.3em] uppercase font-medium">
                Our Philosophy
              </span>
              <h2 className="section-title mt-4">
                What Drives <span className="text-accent italic">Us</span>
              </h2>
              <div className="accent-line mx-auto mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-10">
            {values.map((val, i) => (
              <ScrollReveal key={val.title} delay={i * 0.2} direction="up">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-10 shadow-sm hover:shadow-xl transition-shadow duration-500 group"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {val.icon}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-charcoal-700 mb-4">
                    {val.title}
                  </h3>
                  <p className="font-body text-charcoal-400 leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
