import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const RealityTear = ({ onComplete, onProgress, isActive }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [zipperOpen, setZipperOpen] = useState(0); // 0-100%
  const [isResetting, setIsResetting] = useState(false);
  const [isTouched, setIsTouched] = useState(false); // Track touch/hover state
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
        if (!isActive && !isResetting) {
          onComplete();
        }
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
  
  // No more text hint timeout as we're using an animated tear puller instead
  
  const handleDragStart = () => {
    setIsDragging(true);
    setIsTouched(true);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
    setIsTouched(false);
    
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
      className="fixed inset-0 pointer-events-none"
      style={{ 
        display: isActive ? 'none' : 'block',
        zIndex: 20,
      }}
    >
      {/* Cyber Tear Effect - Only where pulled */}
      {zipperOpen > 0 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
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
          onTouchStart={() => setIsTouched(true)}
          onTouchEnd={() => setIsTouched(false)}
          onMouseEnter={() => setIsTouched(true)}
          onMouseLeave={() => !isDragging && setIsTouched(false)}
          style={{ 
            x: sliderY,
            zIndex: 2,
            touchAction: 'none',
          }}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing pointer-events-auto"
        >
          {/* Chain/Pull Tab */}
          <motion.div
            animate={{
              scale: isDragging ? [1, 1.05, 1] : [1, 1.08, 1],
              rotate: isDragging ? [0, 5, -5, 0] : 0,
            }}
            transition={{ 
              duration: isDragging ? 0.5 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Cyber Pull - Holographic (Smaller on mobile, translucent until touched) */}
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              {/* Outer ring - translucent on mobile, lights up on touch */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 bg-black backdrop-blur-sm"
                animate={{
                  borderColor: isTouched ? 'rgba(6, 182, 212, 0.8)' : 'rgba(6, 182, 212, 0.3)',
                  opacity: isTouched ? 1 : 0.4,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Energy core - brighter when touched */}
              <motion.div
                className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500"
                animate={{
                  opacity: isTouched ? 1 : 0.5,
                  boxShadow: isDragging 
                    ? ['0 0 15px #06b6d4', '0 0 25px #8b5cf6', '0 0 15px #06b6d4']
                    : isTouched
                    ? '0 0 20px #06b6d4'
                    : '0 0 8px #06b6d4',
                }}
                transition={{ duration: isDragging ? 0.8 : 0.2, repeat: isDragging ? Infinity : 0 }}
              >
                {/* Inner glow */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent"
                  animate={{ opacity: isTouched ? 0.6 : 0.3 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              
              {/* Holographic lines - more visible when touched */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    style={{ rotate: `${i * 60}deg` }}
                    animate={{ 
                      opacity: isTouched ? [0.5, 1, 0.5] : [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>
              
              {/* Center icon (smaller on mobile, brighter when touched) */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs md:text-sm z-10"
                animate={{ opacity: isTouched ? 1 : 0.6 }}
                transition={{ duration: 0.2 }}
              >
                ⚡
              </motion.div>
              
              {/* Enhanced drag indicator - cyber gradient arrow */}
              <motion.div
                className="absolute -right-5 md:-right-6 top-1/2 -translate-y-1/2 text-2xl md:text-3xl font-bold"
                style={{
                  background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))'
                }}
                animate={{ 
                  x: [0, 12, 0], 
                  opacity: isTouched ? [0.9, 1, 0.9] : [0.6, 1, 0.6],
                  filter: [
                    'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))',
                    'drop-shadow(0 0 15px rgba(139, 92, 246, 0.9))',
                    'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))'
                  ]
                }}
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
