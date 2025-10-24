import React, { useEffect, useState } from 'react';
import { Terminal, ChevronDown } from 'lucide-react';

const AlterEgoHero = ({ data }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    // Typing animation
    let index = 0;
    const fullText = data.personal.title;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [data.personal.title]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Note: CyberBackground with 3D particles is rendered by parent AlterEgoApp */}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">
        {/* Terminal Header */}
        <div className="mb-8 flex items-center justify-center gap-2 text-cyan-400 font-mono text-sm">
          <Terminal className="w-4 h-4 animate-pulse" />
          <span className="opacity-70">SYSTEM_ONLINE</span>
          <span className="animate-blink">_</span>
        </div>

        {/* Name with Gradient */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 font-mono">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient">
            {data.personal.name}
          </span>
        </h1>

        {/* Typing Title */}
        <div className="min-h-[60px] md:min-h-[80px] mb-8">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-mono text-cyan-300">
            <span className="text-purple-400">{'> '}</span>
            {displayText}
            <span className="animate-blink text-cyan-400">|</span>
          </h2>
        </div>

        {/* Tagline with Holographic Effect */}
        <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
          <span className="relative inline-block">
            <span className="relative z-10">{data.personal.tagline}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-sm" />
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          <button className="group relative px-6 md:px-8 py-3 md:py-4 font-mono text-sm md:text-lg overflow-hidden w-full sm:w-auto">
            <span className="relative z-10 text-cyan-400 group-hover:text-black transition-colors duration-300">
              EXPLORE_PROJECTS
            </span>
            <div className="absolute inset-0 border-2 border-cyan-400 group-hover:border-cyan-300 transition-colors" />
            <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>

          <button className="group relative px-6 md:px-8 py-3 md:py-4 font-mono text-sm md:text-lg overflow-hidden w-full sm:w-auto">
            <span className="relative z-10 text-black">
              INITIALIZE_CONTACT
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="mt-8 md:mt-16 grid grid-cols-3 gap-2 md:gap-4 max-w-2xl mx-auto px-4">
          {[
            { label: 'PROJECTS', value: '15+' },
            { label: 'IMPACT', value: '150%' },
            { label: 'SYSTEMS', value: '5' }
          ].map((stat, i) => (
            <div key={i} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative border border-cyan-400/30 bg-black/50 backdrop-blur-sm p-2 md:p-4 hover:border-cyan-400 transition-colors">
                <div className="text-xl md:text-3xl font-bold font-mono text-cyan-400">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-mono text-gray-400 mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown className="w-8 h-8 text-cyan-400 animate-bounce" />
      </div>

      {/* Corner Decorations - Mobile Responsive */}
      <div className="absolute top-0 left-0 w-16 md:w-32 h-16 md:h-32 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-0 right-0 w-16 md:w-32 h-16 md:h-32 border-r-2 border-t-2 border-purple-500/50" />
      <div className="absolute bottom-0 left-0 w-16 md:w-32 h-16 md:h-32 border-l-2 border-b-2 border-purple-500/50" />
      <div className="absolute bottom-0 right-0 w-16 md:w-32 h-16 md:h-32 border-r-2 border-b-2 border-cyan-400/50" />
    </section>
  );
};

export default AlterEgoHero;
