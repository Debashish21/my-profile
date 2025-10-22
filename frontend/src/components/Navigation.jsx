import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'extracurricular', label: 'Leadership' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id === 'hero' ? '' : sections[i].id);
        if (section) {
          const sectionTop = sections[i].id === 'hero' ? 0 : section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A192F]/95 backdrop-blur-md shadow-lg border-b border-[#1d3557]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Name */}
            <button
              onClick={() => scrollToSection('hero')}
              className="text-[#64FFDA] font-mono text-xl font-bold hover:text-[#00D9FF] transition-colors duration-300"
            >
              &lt;DR /&gt;
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {sections.slice(1).map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`font-mono text-sm transition-all duration-300 relative group ${
                    activeSection === section.id ? 'text-[#64FFDA]' : 'text-[#8892B0] hover:text-[#64FFDA]'
                  }`}
                >
                  <span className="text-[#64FFDA] mr-1">0{sections.indexOf(section)}.</span>
                  {section.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#64FFDA] transition-all duration-300 ${
                    activeSection === section.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#64FFDA] p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#112240] border-t border-[#1d3557]">
            <div className="px-6 py-4 space-y-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full text-left font-mono text-sm py-2 transition-colors duration-300 ${
                    activeSection === section.id ? 'text-[#64FFDA]' : 'text-[#8892B0]'
                  }`}
                >
                  <span className="text-[#64FFDA] mr-2">0{sections.indexOf(section)}.</span>
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Vertical Section Indicators - Desktop Only */}
      <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative"
              aria-label={`Go to ${section.label}`}
            >
              <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === section.id 
                  ? 'bg-[#64FFDA] border-[#64FFDA] scale-125' 
                  : 'bg-transparent border-[#8892B0] hover:border-[#64FFDA]'
              }`}></div>
              
              {/* Tooltip */}
              <span className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-[#112240] text-[#64FFDA] px-3 py-1 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#64FFDA]">
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;