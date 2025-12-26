'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const EducationSection = () => {
  const educationData = [
    {
      year: "2024-2025",
      degree: "Master of Science: M.Sc Computer Science",
      institution: "MIT-WPU University, PUNE",
      gpa: "GPA: 6.20 / 10.0"
    },
    {
      year: "2020-2023",
      degree: "Bachelor: B.Sc Information technology",
      institution: "GLS University, GUJARAT",
      gpa: "GPA: 7.84 / 10.0"
    },
    {
      year: "2020",
      degree: "12th Commerce",
      institution: "Wardiere University",
      gpa: "GPA: 54.85%"
    },
    {
      year: "2018",
      degree: "10th",
      institution: "Shree Narayan Guru Vidyalaya",
      gpa: "GPA: 88.19%"
    }
  ];

  return (
    <section 
      id="education" 
      className="py-20 bg-gradient-to-b from-black to-gray-900 text-white"
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
            Education
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
          {educationData.map((edu, index) => (
            <motion.div 
              key={index}
              className="mb-10 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <h3 className="text-xl font-semibold text-blue-400">{edu.degree}</h3>
                <span className="inline-block px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm mt-2 md:mt-0">
                  {edu.year}
                </span>
              </div>
              <p className="text-gray-300 mb-2">{edu.institution}</p>
              <p className="text-gray-400 italic">{edu.gpa}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;