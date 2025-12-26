'use client';

import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const CertificatesSection = () => {
  // Certificate data - in a real app, this could be fetched dynamically
  const certificates = [
    {
      id: 1,
      name: 'Certificate 1',
      issuer: 'Issuing Organization',
      date: 'January 2024',
      image: '/Certificates/cert1.jpg'
    },
    {
      id: 2,
      name: 'Certificate 2',
      issuer: 'Issuing Organization',
      date: 'February 2024',
      image: '/Certificates/cert2.jpg'
    }
  ];

  return (
    <AnimatedSection>
      <div className="py-20 px-4" id="certificates">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-4 text-white"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Certificates
          </motion.h2>
          
          <motion.p 
            className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Here are some of my professional certificates and achievements
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{certificate.name}</h3>
                  <p className="text-blue-400 font-medium mb-1">{certificate.issuer}</p>
                  <p className="text-gray-400 text-sm mb-4">{certificate.date}</p>
                  
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <img 
                      src={certificate.image} 
                      alt={certificate.name}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        // Fallback if image doesn't load
                        e.currentTarget.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <motion.a
                      href={certificate.image}
                      download={certificate.name}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download Certificate
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default CertificatesSection;