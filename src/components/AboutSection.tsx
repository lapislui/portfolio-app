'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const AboutSection = () => {
  return (
    <section 
      id="about" 
      className="py-20 bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="container mx-auto px-4 md:px-8">
        <AnimatedSection className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </AnimatedSection>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="md:w-1/3 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-800 border-2 border-blue-500 rounded-full w-64 h-64 flex items-center justify-center overflow-hidden">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-60 h-60" />
            </div>
          </motion.div>

          <motion.div 
            className="md:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">Get to know me</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I&apos;m a passionate Full Stack Web Developer dedicated to creating exceptional digital experiences.
              My journey in web development started with a curiosity about how things work on the internet, 
              which evolved into a full-fledged passion for building interactive and responsive applications.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              As an organized and dependable candidate, I successfully manage multiple priorities with a positive attitude. 
              I&apos;m always willing to take on added responsibilities to meet team goals and consistently deliver quality results.
            </p>
            <p className="text-gray-300 leading-relaxed">
              My expertise spans across various technologies including Python, Django, Flask, JavaScript, HTML/CSS, 
              and modern frameworks. I&apos;m constantly learning and adapting to new technologies to stay current 
              in this rapidly evolving field.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;