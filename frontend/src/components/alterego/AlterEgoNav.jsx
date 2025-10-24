import React, { useState, useEffect } from 'react';
import { Terminal, X } from 'lucide-react';

const AlterEgoNav = ({ onExit }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'product', label: 'PRODUCT', icon: '⚡' },
    { id: 'marketing', label: 'GROWTH', icon: '🚀' },
    { id: 'data', label: 'DATA', icon: '📊' },
    { id: 'business', label: 'BIZDEV', icon: '🤝' },
    { id: 'ai', label: 'AI', icon: '🤖' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-40
      transition-all duration-300
      ${isScrolled 
        ? 'bg-black/80 backdrop-blur-md border-b border-cyan-400/30' 
        : 'bg-transparent'}
    `}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 group"
          >
            <Terminal className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="font-mono text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              DEBASHISH.RAM
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  const element = document.getElementById(section.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`
                  group relative font-mono text-sm
                  ${activeSection === section.id ? 'text-cyan-400' : 'text-gray-400'}
                  hover:text-cyan-400 transition-colors
                `}
              >
                <span className="mr-1">{section.icon}</span>
                {section.label}
                
                {/* Underline Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ))}
            
            {/* Exit Button */}
            {onExit && (
              <button
                onClick={onExit}
                className="ml-4 p-2 border border-purple-500/50 rounded-lg text-purple-400 hover:text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 transition-all group"
                title="Exit Alter Ego"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-2">
            {/* Exit Button - Always visible on mobile */}
            {onExit && (
              <button
                onClick={onExit}
                className="p-2 border border-purple-500/50 rounded-lg text-purple-400 hover:text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 transition-all"
                title="Exit Alter Ego"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-cyan-400 hover:text-cyan-300"
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-current" />
                <div className="w-6 h-0.5 bg-current" />
                <div className="w-6 h-0.5 bg-current" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Scan Line Effect */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
      )}
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-cyan-400/30">
          <div className="px-6 py-4 space-y-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  const element = document.getElementById(section.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left font-mono text-sm text-gray-400 hover:text-cyan-400 transition-colors py-2 border-b border-gray-800 last:border-0"
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AlterEgoNav;
