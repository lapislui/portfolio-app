'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const ExperienceSection = () => {
  const experienceData = [
    {
      period: "2025-06 - Current",
      position: "Dev Secops",
      company: "AphelionCyber",
      description: "Making cyber security tools"
    },
    {
      period: "2025-02 - 2025-06",
      position: "Python Developer Intern",
      company: "Codage Habitation",
      description: "Learned Django and Flask Web development"
    }
  ];

  return (
    <section 
      id="experience" 
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
            Experience
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {experienceData.map((exp, index) => (
            <motion.div 
              key={index}
              className="mb-10 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400">{exp.position}</h3>
                  <p className="text-gray-300">{exp.company}</p>
                </div>
                <span className="inline-block px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>
              <p className="text-gray-400">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;