import React from 'react';
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
  // Keep RealityTear visual effect but don't navigate anywhere
  const handlePortalActivate = () => {
    // No navigation - just visual effect
    console.log('Reality Tear activated - visual effect only');
  };

  return (
    <div className="relative">
      {/* Reality Tear Effect - Visual only, no navigation */}
      <RealityTear 
        onComplete={handlePortalActivate} 
        isActive={false}
      />

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
