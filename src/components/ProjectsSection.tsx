'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const ProjectsSection = () => {
  const projects = [
    {
      title: "Luphonix (Flask Website)",
      description: "Developed a Flask based company site with GitHub OAuth, tech showcase, and real-time org/project data via GitHub & Firebase APIs.",
      technologies: ["Python", "Flask", "GitHub API", "Firebase"]
    },
    {
      title: "NextKart (Django E-commerce Website)",
      description: "Built a feature-rich Django e-commerce site with Stripe payments and admin dashboard for orders and products.",
      technologies: ["Python", "Django", "Stripe", "PostgreSQL"]
    },
    {
      title: "blogsie (Django + Wagtail CMS)",
      description: "Built a feature-rich Django e-commerce site with Stripe payments and admin dashboard for orders and products.",
      technologies: ["Python", "Django", "Wagtail CMS", "PostgreSQL"]
    },
    {
      title: "Fall Detection System using IoT",
      description: "An embedded IoT system for elderly people and children for accidental situations.",
      technologies: ["IoT", "Embedded Systems", "Sensors", "Python"]
    }
  ];

  return (
    <section 
      id="projects" 
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
            Projects
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-500 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-3">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;