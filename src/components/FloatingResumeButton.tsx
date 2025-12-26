'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const FloatingResumeButton = () => {
  const handleDownload = () => {
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = '/keval-patel-resume.pdf';
    link.download = 'keval-patel-resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.button
        onClick={handleDownload}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-full shadow-lg border border-blue-500 backdrop-blur-sm"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
        }}
        whileTap={{ scale: 0.95 }}
        aria-label="Download Resume"
      >
        <FaDownload className="text-lg" />
        <span className="hidden sm:block">Download Resume</span>
      </motion.button>
    </motion.div>
  );
};

export default FloatingResumeButton;