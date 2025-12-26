'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingParticle {
  id: number;
  size: number;
  position: { x: number; y: number };
  duration: number;
  delay: number;
  opacity: number;
  direction: number;
}

const FloatingParticles: React.FC = () => {
  // Predefined particle data to avoid Math.random() calls during render
  const particles = [
    { id: 0, size: 8, position: { x: 10, y: 20 }, duration: 12, delay: 0.2, opacity: 0.3, direction: 20 },
    { id: 1, size: 12, position: { x: 30, y: 40 }, duration: 15, delay: 1.5, opacity: 0.4, direction: -20 },
    { id: 2, size: 6, position: { x: 50, y: 60 }, duration: 10, delay: 0.5, opacity: 0.2, direction: 20 },
    { id: 3, size: 10, position: { x: 70, y: 30 }, duration: 14, delay: 1.0, opacity: 0.5, direction: -20 },
    { id: 4, size: 7, position: { x: 90, y: 70 }, duration: 11, delay: 0.8, opacity: 0.3, direction: 20 },
    { id: 5, size: 9, position: { x: 20, y: 80 }, duration: 13, delay: 0.3, opacity: 0.4, direction: -20 },
    { id: 6, size: 11, position: { x: 40, y: 10 }, duration: 16, delay: 1.2, opacity: 0.3, direction: 20 },
    { id: 7, size: 5, position: { x: 60, y: 50 }, duration: 12, delay: 0.7, opacity: 0.2, direction: -20 },
    { id: 8, size: 13, position: { x: 80, y: 90 }, duration: 14, delay: 1.8, opacity: 0.5, direction: 20 },
    { id: 9, size: 8, position: { x: 5, y: 55 }, duration: 11, delay: 0.4, opacity: 0.3, direction: -20 },
    { id: 10, size: 10, position: { x: 25, y: 35 }, duration: 13, delay: 0.9, opacity: 0.4, direction: 20 },
    { id: 11, size: 7, position: { x: 45, y: 75 }, duration: 10, delay: 0.6, opacity: 0.2, direction: -20 },
    { id: 12, size: 12, position: { x: 65, y: 25 }, duration: 15, delay: 1.3, opacity: 0.5, direction: 20 },
    { id: 13, size: 6, position: { x: 85, y: 45 }, duration: 12, delay: 0.1, opacity: 0.3, direction: -20 },
    { id: 14, size: 9, position: { x: 15, y: 85 }, duration: 14, delay: 1.6, opacity: 0.4, direction: 20 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.position.x}%`,
            top: `${particle.position.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.direction, 0],
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 0.7, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;