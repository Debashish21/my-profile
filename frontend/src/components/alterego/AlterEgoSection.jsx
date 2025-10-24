import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AlterEgoSection = ({ section, sectionKey }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const canvasRef = useRef(null);
  const cardsRef = useRef([]);

  const getItems = () => {
    if (section.projects) return section.projects;
    if (section.campaigns) return section.campaigns;
    if (section.initiatives) return section.initiatives;
    return [];
  };

  const items = getItems();

  // Map section keys to IDs
  const sectionIdMap = {
    productManagement: 'product',
    marketing: 'marketing',
    dataAnalysis: 'data',
    businessDevelopment: 'business',
    aiAutomation: 'ai'
  };

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Animate title
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotateX: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      }
    });

    // Parallax background effect
    if (canvasRef.current) {
      gsap.to(canvasRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items.length]);

  return (
    <section 
      ref={sectionRef}
      id={sectionIdMap[sectionKey] || sectionKey}
      className="min-h-screen py-12 md:py-20 px-4 md:px-6 relative overflow-hidden"
    >
      {/* Animated Background - CSS-based for performance */}
      <div ref={canvasRef} className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: sectionKey === 'marketing' ? 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)' :
                       sectionKey === 'businessDevelopment' ? 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)' :
                       sectionKey === 'aiAutomation' ? 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)' :
                       'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
            animationDuration: '4s'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
            animationDuration: '5s',
            animationDelay: '1s'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="mb-8 md:mb-16 text-center">
          <div className="inline-block mb-3 md:mb-4">
            <span className="text-4xl md:text-6xl">{section.icon}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono mb-3 md:mb-4 px-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {section.title}
            </span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 font-mono px-4">{section.subtitle}</p>
          
          {/* Decorative Line */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-[2px] w-20 bg-gradient-to-r from-transparent to-cyan-400" />
            <div className="w-2 h-2 bg-cyan-400 rotate-45" />
            <div className="h-[2px] w-20 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow Effect */}
              <div className={`
                absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 
                blur-xl transition-all duration-500
                ${hoveredCard === index ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}
              `} />

              {/* Card - Enhanced Translucent Futuristic Box */}
              <div className="relative h-full border border-cyan-400/30 bg-black/40 backdrop-blur-md rounded-lg p-6 hover:border-cyan-400 hover:bg-black/60 transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30">
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-purple-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-purple-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400" />

                {/* Content */}
                <div className="space-y-4">
                  {/* Timeline Badge */}
                  <div className="inline-block px-3 py-1 bg-cyan-500/20 border border-cyan-400/50 font-mono text-xs text-cyan-400">
                    {item.timeline}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-mono text-cyan-300 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Company/Organization */}
                  <p className="text-sm text-purple-400 font-mono">
                    {item.company || item.organization}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  {item.achievements && (
                    <ul className="space-y-2">
                      {item.achievements.slice(0, 2).map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Metrics */}
                  {item.metrics && (
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-cyan-400/20">
                      {Object.entries(item.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                          <span className="text-xs font-mono text-gray-400">
                            {key}: <span className="text-cyan-400">{value}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover Scan Line */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlterEgoSection;
