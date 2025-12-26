'use client';

import { Canvas } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';


const Stars = (props: React.JSX.IntrinsicAttributes) => {
  const sphere = useMemo(() => {
    // Create a stable set of random positions
    const positions = new Float32Array(1000 * 3);
    // Use a seed-based approach to generate stable "random" positions
    for (let i = 0; i < 1000; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.sin(i * 1.234) - 0.5) * 10;
      positions[i3 + 1] = (Math.cos(i * 2.345) - 0.5) * 10;
      positions[i3 + 2] = (Math.sin(i * 3.456) - 0.5) * 10;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  return (
    <primitive object={new THREE.Points(sphere, new THREE.PointsMaterial({
      color: '#64748b',
      size: 0.005,
      transparent: true,
      sizeAttenuation: true
    }))} />
  );
};

const ThreeDScene = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default ThreeDScene;