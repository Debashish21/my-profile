import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { portfolioData } from '../data';
import Navigation from '../components/Navigation';
import ScrollToTop from '../components/ScrollToTop';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Extracurricular from '../components/Extracurricular';
import Education from '../components/Education';
import Contact from '../components/Contact';
import RealityTear from '../components/RealityTear';

const MainPortfolio = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePortalActivate = () => {
    setIsTransitioning(true);
    
    // Smooth fade and navigate
    setTimeout(() => {
      navigate('/alter-ego');
    }, 600);
  };

  return (
    <div className="relative">
      {/* Reality Tear Effect */}
      <RealityTear 
        onComplete={handlePortalActivate} 
        isActive={false}
      />

      {/* Transition Overlay */}
      {isTransitioning && (
        <div 
          className="fixed inset-0 z-[100] bg-black animate-fadeIn"
          style={{ 
            animation: 'fadeIn 0.6s ease-in-out forwards'
          }}
        />
      )}

      {/* Main Content */}
      <div className="App">
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
  );
};

export default MainPortfolio;
