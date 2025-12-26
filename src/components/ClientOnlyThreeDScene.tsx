'use client';

import { useState, useEffect } from 'react';
import ThreeDScene from './ThreeDScene';

const ClientOnlyThreeDScene = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to avoid the strict mode double call issue
    const raf = requestAnimationFrame(() => {
      setHasMounted(true);
    });
    
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!hasMounted) {
    // Render a placeholder during SSR to avoid hydration mismatch
    return <div className="absolute inset-0 w-full h-full" />;
  }

  return <ThreeDScene />;
};

export default ClientOnlyThreeDScene;