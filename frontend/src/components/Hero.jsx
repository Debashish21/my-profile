import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

const Hero = ({ data }) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isHovering, setIsHovering] = useState(false);
  const fullText = data.personal.title;

  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [fullText]);

  const handleMouseMove = (e) => {
    if (isHovering) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Position stays where it was
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#0A192F] via-[#0f2847] to-[#0A192F] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#64FFDA 1px, transparent 1px), linear-gradient(90deg, #64FFDA 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Mouse-tracking glow effect with heartbeat pulse */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none animate-heartbeat"
        style={{
          background: 'radial-gradient(circle, rgba(100, 255, 218, 0.25) 0%, rgba(100, 255, 218, 0.15) 30%, rgba(100, 255, 218, 0.08) 50%, transparent 70%)',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(50px)',
          transition: isHovering ? 'none' : 'left 0.3s ease-out, top 0.3s ease-out'
        }}
      ></div>

      <div className={`relative z-10 max-w-5xl mx-auto px-6 text-center transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="mb-6">
          <span className="text-[#64FFDA] font-mono text-sm md:text-base tracking-wider">Hi, my name is</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#CCD6F6] mb-4 tracking-tight">
          {data.personal.name}
        </h1>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#8892B0] mb-8 min-h-[60px] md:min-h-[80px]">
          <span className="font-mono">{displayText}</span>
          <span className="animate-blink">|</span>
        </h2>
        
        <p className="text-lg md:text-xl text-[#8892B0] max-w-2xl mx-auto mb-12 leading-relaxed">
          {data.personal.tagline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('projects')}
            className="bg-transparent border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0A192F] px-8 py-6 text-lg font-mono transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </Button>
          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#00D9FF] px-8 py-6 text-lg font-mono transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-[#64FFDA]" />
      </div>
    </section>
  );
};

export default Hero;