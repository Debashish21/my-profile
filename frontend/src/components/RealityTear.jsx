import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Particle field visible through the zipper
const ParticleField = () => {
  const pointsRef = useRef();
  
  const particles = React.useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      const color = new THREE.Color();
      color.setHSL(0.5 + Math.random() * 0.2, 1, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const RealityTear = ({ onComplete, onProgress, isActive }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [zipperOpen, setZipperOpen] = useState(0); // 0-100%
  const [showHint, setShowHint] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const containerRef = useRef(null);
  const sliderY = useMotionValue(0);
  
  // Track slider position and update progress (horizontal)
  useEffect(() => {
    const unsubscribe = sliderY.on('change', (latest) => {
      // Don't update if we're resetting or already active
      if (isResetting || isActive) {
        return;
      }
      
      // Need to drag most of the screen width to complete
      const progress = Math.min(Math.max((latest / (window.innerWidth * 0.85)) * 100, 0), 100);
      console.log('Slider X:', latest, 'Progress:', progress, 'isActive:', isActive, 'isResetting:', isResetting);
      setZipperOpen(progress);
      
      if (onProgress) {
        onProgress(progress);
      }
    });
    
    return () => unsubscribe();
  }, [sliderY, onProgress, isActive, isResetting]);
  
  useEffect(() => {
    console.log('Zipper open:', zipperOpen, 'isActive:', isActive, 'isResetting:', isResetting);
    if (zipperOpen >= 100 && !isActive && !isResetting) {
      console.log('🎉 Zipper fully open! Triggering transition...');
      // Zipper fully open, complete transition
      setTimeout(() => {
        onComplete();
      }, 500);
    }
  }, [zipperOpen, isActive, isResetting, onComplete]);
  
  // Reset tear when component becomes visible again (after exit)
  const prevActiveRef = useRef(isActive);
  useEffect(() => {
    // Detect transition from active (true) to inactive (false) - user exited
    if (prevActiveRef.current === true && isActive === false) {
      console.log('Resetting tear after exit...');
      setIsResetting(true);
      // Reset the tear position
      animate(sliderY, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
      setZipperOpen(0);
      // Clear resetting flag after animation
      setTimeout(() => {
        setIsResetting(false);
      }, 500);
    }
    prevActiveRef.current = isActive;
  }, [isActive, sliderY]);
  
  useEffect(() => {
    // Auto-hide hint after 5 seconds
    const timer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleDragStart = () => {
    setIsDragging(true);
    setShowHint(false);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    
    if (zipperOpen < 100) {
      // Snap back if not complete
      animate(sliderY, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
      setZipperOpen(0);
      
      if (onProgress) {
        onProgress(0);
      }
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-auto"
      style={{ 
        display: isActive ? 'none' : 'block',
      }}
    >
      {/* Hint - Mobile Responsive */}
      {showHint && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-1/2 left-4 md:left-32 -translate-y-1/2 pointer-events-none"
        >
          <div className="backdrop-blur-xl bg-black/50 border border-cyan-400/50 rounded-2xl px-4 md:px-6 py-3 md:py-4 text-center shadow-2xl">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl md:text-4xl mb-1 md:mb-2"
            >
              ➡️
            </motion.div>
            <p className="text-cyan-400 font-mono text-xs md:text-sm font-bold whitespace-nowrap">
              Drag Right to Unzip
            </p>
            <div className="absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 md:border-t-8 border-t-transparent border-b-6 md:border-b-8 border-b-transparent border-r-6 md:border-r-8 border-r-cyan-400/50" />
          </div>
        </motion.div>
      )}
      
      {/* 3D Particle Field - Visible through zipper */}
      {zipperOpen > 0 && (
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            opacity: zipperOpen / 100,
            zIndex: 45,
          }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <color attach="background" args={['#0a0a0f']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
            <ParticleField />
          </Canvas>
        </div>
      )}
      
      {/* Cyber Tear Effect - Only where pulled */}
      {zipperOpen > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 55 }}>
          <defs>
            {/* Gradient for tear edges */}
            <linearGradient id="tearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glowFilter">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Top tear edge - Uneven */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: zipperOpen / 100 }}
            transition={{ duration: 0.3 }}
            d={`M 0 ${window.innerHeight / 2 - 30} 
                Q ${window.innerWidth * 0.1} ${window.innerHeight / 2 - 40},
                  ${window.innerWidth * 0.2} ${window.innerHeight / 2 - 25}
                Q ${window.innerWidth * 0.3} ${window.innerHeight / 2 - 35},
                  ${window.innerWidth * 0.4} ${window.innerHeight / 2 - 30}
                Q ${window.innerWidth * 0.5} ${window.innerHeight / 2 - 20},
                  ${window.innerWidth * 0.6} ${window.innerHeight / 2 - 35}
                Q ${window.innerWidth * 0.7} ${window.innerHeight / 2 - 25},
                  ${window.innerWidth * 0.8} ${window.innerHeight / 2 - 30}
                Q ${window.innerWidth * 0.9} ${window.innerHeight / 2 - 40},
                  ${window.innerWidth} ${window.innerHeight / 2 - 30}`}
            stroke="url(#tearGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#glowFilter)"
            strokeLinecap="round"
          />
          
          {/* Bottom tear edge - Uneven */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: zipperOpen / 100 }}
            transition={{ duration: 0.3 }}
            d={`M 0 ${window.innerHeight / 2 + 30}
                Q ${window.innerWidth * 0.1} ${window.innerHeight / 2 + 35},
                  ${window.innerWidth * 0.2} ${window.innerHeight / 2 + 25}
                Q ${window.innerWidth * 0.3} ${window.innerHeight / 2 + 40},
                  ${window.innerWidth * 0.4} ${window.innerHeight / 2 + 30}
                Q ${window.innerWidth * 0.5} ${window.innerHeight / 2 + 20},
                  ${window.innerWidth * 0.6} ${window.innerHeight / 2 + 35}
                Q ${window.innerWidth * 0.7} ${window.innerHeight / 2 + 28},
                  ${window.innerWidth * 0.8} ${window.innerHeight / 2 + 32}
                Q ${window.innerWidth * 0.9} ${window.innerHeight / 2 + 38},
                  ${window.innerWidth} ${window.innerHeight / 2 + 30}`}
            stroke="url(#tearGradient)"
            strokeWidth="3"
            fill="none"
            filter="url(#glowFilter)"
            strokeLinecap="round"
          />
          
          {/* Jagged tear particles */}
          {Array.from({ length: 20 }).map((_, i) => {
            const x = (i / 20) * window.innerWidth * (zipperOpen / 100);
            const yTop = window.innerHeight / 2 - 30 + Math.sin(i) * 10;
            const yBottom = window.innerHeight / 2 + 30 + Math.cos(i) * 10;
            
            return (
              <g key={i}>
                <motion.circle
                  cx={x}
                  cy={yTop}
                  r="2"
                  fill="#06b6d4"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                />
                <motion.circle
                  cx={x}
                  cy={yBottom}
                  r="2"
                  fill="#ec4899"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 + 0.5 }}
                />
              </g>
            );
          })}
        </svg>
      )}
        
        {/* Zipper Slider/Pull */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: window.innerWidth * 0.85 }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ 
            x: sliderY,
            zIndex: 60,
            touchAction: 'none',
          }}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing pointer-events-auto"
        >
          {/* Chain/Pull Tab */}
          <motion.div
            animate={{
              scale: isDragging ? [1, 1.05, 1] : 1,
              rotate: isDragging ? [0, 5, -5, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
            className="relative"
          >
            {/* Cyber Pull - Holographic (Smaller) */}
            <div className="relative w-16 h-16">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 bg-black/80 backdrop-blur-sm" />
              
              {/* Energy core */}
              <motion.div
                className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500"
                animate={{
                  boxShadow: isDragging 
                    ? ['0 0 15px #06b6d4', '0 0 25px #8b5cf6', '0 0 15px #06b6d4']
                    : '0 0 10px #06b6d4',
                }}
                transition={{ duration: 0.8, repeat: isDragging ? Infinity : 0 }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
              </motion.div>
              
              {/* Holographic lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    style={{ rotate: `${i * 60}deg` }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm z-10">
                ⚡
              </div>
              
              {/* Drag indicator */}
              <motion.div
                className="absolute -right-6 top-1/2 -translate-y-1/2 text-cyan-400 text-xl"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ➤
              </motion.div>
            </div>
            
            {/* Glow ring when dragging */}
            {isDragging && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-lg border-2 border-cyan-400"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>
        </motion.div>
      
      {/* Progress Indicator */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-black/30 border border-cyan-400/30 rounded-full px-6 py-3"
        >
          <div className="flex items-center gap-3">
            <div className="text-cyan-400 font-mono text-sm font-bold">
              {Math.round(zipperOpen)}%
            </div>
            <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
                style={{ width: `${zipperOpen}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RealityTear;
