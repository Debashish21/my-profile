import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Code2, Rocket, Users, Zap } from 'lucide-react';

const About = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
 
  const highlights = [
    { icon: Code2, text: '2+ Years Experience', color: '#64FFDA' },
    { icon: Rocket, text: 'Lead Engineer at PepsiCo', color: '#00D9FF' },
    { icon: Zap, text: 'AI-Powered Development', color: '#64FFDA' },
    { icon: Users, text: 'Cross-Functional Leader', color: '#00D9FF' }
  ];

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-20 px-6 bg-[#0A192F] relative">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-4">
              <span className="text-[#64FFDA] font-mono text-2xl mr-2">01.</span>
              About Me
            </h2>
            <div className="w-32 h-1 bg-[#64FFDA]"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-[#8892B0] text-lg leading-relaxed">
                {data.personal.bio}
              </p>
              
              <p className="text-[#8892B0] text-lg leading-relaxed">
                I combine technical proficiency, curiosity, and problem-solving acumen to deliver 
                thoughtful, impactful solutions. My experience spans the entire product development 
                lifecycle with a strong focus on building scalable, user-centric web applications.
              </p>

              <div className="pt-4">
                <h3 className="text-[#CCD6F6] font-semibold text-xl mb-4">Quick Highlights:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#112240] border border-[#1d3557] hover:border-[#64FFDA] transition-all duration-300 transform hover:scale-105"
                      >
                        <Icon className="w-5 h-5" style={{ color: item.color }} />
                        <span className="text-[#CCD6F6] text-sm">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <Card className="p-8 bg-[#112240] border-[#1d3557] hover:border-[#64FFDA] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#CCD6F6] font-semibold text-2xl">Daily Stack</h3>
                <a 
                  href="#skills" 
                  className="text-[#64FFDA] text-xs font-mono hover:underline transition-all duration-300 flex items-center gap-1 group"
                >
                  View all skills
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
              <p className="text-[#8892B0] text-sm mb-6">Tools & technologies I'm actively working with</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[#64FFDA] font-mono text-sm mb-3">Development</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React JS'].map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-[#0A192F] text-[#64FFDA] rounded-full text-sm font-mono border border-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0A192F] transition-all duration-300 cursor-pointer"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[#64FFDA] font-mono text-sm mb-3">AI Development Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {['GitHub Copilot', 'Claude AI', 'Cursor', 'Windsurf'].map((tool, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-[#0A192F] text-[#00D9FF] rounded-full text-sm font-mono border border-[#00D9FF] hover:bg-[#00D9FF] hover:text-[#0A192F] transition-all duration-300 cursor-pointer"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[#64FFDA] font-mono text-sm mb-3">Product Management</h4>
                  <div className="flex flex-wrap gap-2">
                    {['GTM Strategy', 'Agile', 'UI/UX', 'Feature Grooming', 'Stakeholder Management', 'Product Roadmap'].map((skill, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-[#0A192F] text-[#8892B0] rounded-full text-sm font-mono border border-[#8892B0] hover:bg-[#8892B0] hover:text-[#0A192F] transition-all duration-300 cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;