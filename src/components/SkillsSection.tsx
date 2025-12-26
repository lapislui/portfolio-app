'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaPython, FaCss3Alt, FaHtml5, FaJs, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiDjango, SiFlask, SiMysql, SiCplusplus, SiMongodb } from 'react-icons/si';
import { LiaToolsSolid } from 'react-icons/lia';
import AnimatedSection from './AnimatedSection';

const SkillsSection = () => {
  const skills = [
    { name: "Python", level: 90, icon: FaPython },
    { name: "Django", level: 85, icon: SiDjango },
    { name: "Flask", level: 80, icon: SiFlask },
    { name: "JavaScript", level: 75, icon: FaJs },
    { name: "HTML/CSS", level: 85, icon: null }, // Will use both FaHtml5 and FaCss3Alt
    { name: "MySQL", level: 70, icon: SiMysql },
    { name: "Docker", level: 75, icon: FaDocker },
    { name: "Git", level: 80, icon: FaGitAlt },
    { name: "C", level: 70, icon: SiCplusplus },
    { name: "Collaboration", level: 90, icon: LiaToolsSolid }
  ];

  return (
    <section 
      id="skills" 
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
            Skills
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <motion.div 
                className="mb-4 text-4xl text-blue-400"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {skill.name === "HTML/CSS" ? (
                  <div className="flex space-x-2">
                    <FaHtml5 />
                    <FaCss3Alt />
                  </div>
                ) : (
                  skill.icon && React.createElement(skill.icon)
                )}
              </motion.div>
              <motion.span 
                className="font-medium text-center"
                whileHover={{ y: -5 }}
              >
                {skill.name}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;