import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import './AlterEgo.css';
import { portfolioData } from './data';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Extracurricular from './components/Extracurricular';
import Contact from './components/Contact';
import RealityTear from './components/RealityTear';
import AlterEgoApp from './components/alterego/AlterEgoApp';
import CyberBackground from './components/CyberBackground';

// V2 Hyper-Future (Alternative)
// import './Future.css';
// import MagneticPortalOrb from './components/MagneticPortalOrb';
// import WormholeTransition from './components/WormholeTransition';
// import FutureApp from './components/future/FutureApp';
 
function App() {
  const [isAlterEgo, setIsAlterEgo] = useState(false);
  const [tearProgress, setTearProgress] = useState(0);
  const [isSplitting, setIsSplitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [alterEgoOpacity, setAlterEgoOpacity] = useState(0);
  const transitionTimeoutRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  console.log(tearProgress,"tearProgress")
  const handlePortalActivate = useCallback(() => {
    console.log('🌀 Portal activated - transitioning to AlterEgo');
    // Start transition phase
    setIsTransitioning(true);
    
    // Animate AlterEgo fade-in
    fadeTimeoutRef.current = setTimeout(() => {
      setAlterEgoOpacity(1);
    }, 200);
    
    // Complete transition
    transitionTimeoutRef.current = setTimeout(() => {
      setIsAlterEgo(true);
      setIsTransitioning(false);
    }, 1000);
  }, []);
  
  const handleTearProgress = (progress) => {
    // Don't update progress if we're already in AlterEgo or transitioning out
    if (isAlterEgo || isTransitioning) {
      return;
    }
    
    setTearProgress(progress);
    
    if (progress >= 100 && !isSplitting) {
      setIsSplitting(true);
    }
  };

  const handleExit = useCallback(() => {
    console.log('🔙 Exit button clicked - returning to main portfolio');
    
    // Cancel any pending transitions
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
    
    // Immediately hide AlterEgo and show main content
    setIsAlterEgo(false);
    setIsTransitioning(false);
    setTearProgress(0);
    setIsSplitting(false);
    setAlterEgoOpacity(0);
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Cyber Background - Always visible with varying opacity */}
      <div 
        className="fixed inset-0 transition-opacity duration-500"
        style={{
          opacity: isAlterEgo ? 1 : (tearProgress / 100),
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'opacity', // Optimize opacity transitions
        }}
      >
        <CyberBackground />
      </div>
      
      {/* Reality Tear Effect */}
      <div 
        className="transition-opacity duration-1000"
        style={{ 
          opacity: isAlterEgo ? 0 : 1,
          pointerEvents: 'none',
          zIndex: 20
        }}
      >
        <RealityTear 
          onComplete={handlePortalActivate}
          onProgress={handleTearProgress}
          isActive={isAlterEgo || isTransitioning}
        />
      </div>
      
      {/* AlterEgo Transition Layer - Only visible when transitioning or active */}
      {(isTransitioning || isAlterEgo) && (
        <div 
          className="transition-opacity duration-1000"
          style={{ 
            opacity: isAlterEgo ? 1 : alterEgoOpacity,
            zIndex: isAlterEgo ? 30 : 25,
            pointerEvents: isAlterEgo ? 'auto' : 'none',
            position: isAlterEgo ? 'relative' : 'fixed',
            inset: isAlterEgo ? 'auto' : 0,
            minHeight: isAlterEgo ? '100vh' : 'auto',
            willChange: 'opacity', // Optimize opacity transitions
          }}
        >
          <AlterEgoApp onExit={handleExit} />
        </div>
      )}

      {/* Main Content with peeling effect */}
      <div 
        className="relative min-h-screen"
        style={{
          opacity: 1 - tearProgress / 100,
          pointerEvents: isAlterEgo ? 'none' : 'auto',
          perspective: '1000px',
          perspectiveOrigin: 'center center',
          transition: 'opacity 1s ease-out',
          zIndex: isAlterEgo ? 0 : 10,
        }}
      >
        {/* Normal scrollable content - peel effect only when tearing */}
        {tearProgress === 0 ? (
          /* Normal scrollable view when no tear */
          <div className="App" style={{ position: 'relative', zIndex: 1 }}>
            <Navigation />
            <ScrollToTop />
            <Hero data={portfolioData} />
            <About data={portfolioData} />
            <Experience data={portfolioData} />
            <Projects data={portfolioData} />
            <Skills data={portfolioData} />
            <Extracurricular data={portfolioData} />
            <Education data={portfolioData} />
            <Contact data={portfolioData} />
          </div>
        ) : (
          <>
            {/* Top Half - Peels away */}
            <div
              className="fixed inset-x-0 top-0 overflow-hidden transition-all duration-1000 ease-out"
              style={{
                height: '50%',
                transform: tearProgress > 80
                  ? `translateY(-${tearProgress - 80}%) translateZ(-${tearProgress * 2}px) rotateX(${tearProgress/4}deg) scale(${1 - tearProgress/200})` 
                  : 'translateY(0) translateZ(0) rotateX(0) scale(1)',
                transformOrigin: 'bottom center',
                opacity: tearProgress > 90 ? (100 - tearProgress) / 10 : 1,
                filter: `blur(${(tearProgress > 80) ? (tearProgress - 80) / 5 : 0}px)`,
                zIndex: 1,
              }}
            >
              <div className="App" style={{ transform: 'translateY(0)' }}>
                <Navigation />
                <ScrollToTop />
                <Hero data={portfolioData} />
                <About data={portfolioData} />
                <Experience data={portfolioData} />
                <Projects data={portfolioData} />
                <Skills data={portfolioData} />
                <Extracurricular data={portfolioData} />
              </div>
            </div>

            {/* Bottom Half - Peels away */}
            <div
              className="fixed inset-x-0 bottom-0 overflow-hidden transition-all duration-1000 ease-out"
              style={{
                height: '50%',
                transform: tearProgress > 80
                  ? `translateY(${tearProgress - 80}%) translateZ(-${tearProgress * 2}px) rotateX(-${tearProgress/4}deg) scale(${1 - tearProgress/200})` 
                  : 'translateY(0) translateZ(0) rotateX(0) scale(1)',
                transformOrigin: 'top center',
                opacity: tearProgress > 90 ? (100 - tearProgress) / 10 : 1,
                filter: `blur(${(tearProgress > 80) ? (tearProgress - 80) / 5 : 0}px)`,
                zIndex: 1,
              }}
            >
              <div 
                className="App" 
                style={{ 
                  transform: 'translateY(-50vh)',
                }}
              >
                <Navigation />
                <ScrollToTop />
                <Hero data={portfolioData} />
                <About data={portfolioData} />
                <Experience data={portfolioData} />
                <Projects data={portfolioData} />
                <Skills data={portfolioData} />
                <Extracurricular data={portfolioData} />
                <Education data={portfolioData} />
                <Contact data={portfolioData} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* AlterEgo is now rendered in the transition layer above */}
    </div>
  );
}

export default App;