'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AnimatedText from './AnimatedText';
import AnimatedSection from './AnimatedSection';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900"></div>
      </div>
      
      {/* Content */}
      <AnimatedSection className="relative z-10 text-center px-4 py-20">
        <AnimatedText className="text-4xl md:text-6xl font-bold text-white mb-4">
          Hi, I&apos;m <span className="text-blue-400">Keval Patel</span>
        </AnimatedText>
        
        <motion.h2 
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Full Stack Web Developer
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive.
          Even if you don{'}t hire me, I hope you{'}ll take a look at my work.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link 
            href="#projects"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            View My Work
          </Link>
          <Link 
            href="#contact"
            className="px-8 py-3 bg-transparent border-2 border-blue-600 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Contact Me
          </Link>
        </motion.div>
      </AnimatedSection>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg 
          className="w-6 h-6 animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;