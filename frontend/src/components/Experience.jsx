import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Building2, Calendar, TrendingUp } from 'lucide-react';

const Experience = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    } 

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="min-h-screen py-20 px-6 bg-[#0f2847] relative">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-4">
              <span className="text-[#64FFDA] font-mono text-2xl mr-2">02.</span>
              Professional Journey
            </h2>
            <div className="w-32 h-1 bg-[#64FFDA]"></div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#64FFDA] transform md:-translate-x-1/2"></div>

            {data.experience.map((exp, index) => (
              <div 
                key={exp.id}
                className={`relative mb-12 transition-all duration-700 transform ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-50px]'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className={`md:flex md:items-center md:justify-between ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[#64FFDA] rounded-full border-4 border-[#0A192F] transform md:-translate-x-1/2 z-10"></div>

                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'
                  }`}>
                    <Card className={`p-6 bg-[#112240] border-2 transition-all duration-300 transform hover:scale-105 ${
                      activeIndex === index ? 'border-[#64FFDA] shadow-lg shadow-[#64FFDA]/20' : 'border-[#1d3557]'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-[#64FFDA]" />
                        <h3 className="text-xl font-bold text-[#CCD6F6]">{exp.company}</h3>
                      </div>
                      
                      <h4 className="text-lg font-semibold text-[#64FFDA] mb-2">{exp.role}</h4>
                      
                      <div className="flex items-center gap-2 text-[#8892B0] text-sm mb-4">
                        <Calendar className="w-4 h-4" />
                        <span className="font-mono">{exp.duration}</span>
                      </div>

                      <ul className="space-y-2 mb-4 text-left">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-[#8892B0] text-sm flex items-start gap-2">
                            <span className="text-[#64FFDA] mt-1">▹</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.techStack.map((tech, i) => (
                          <Badge 
                            key={i} 
                            className="bg-[#0A192F] text-[#64FFDA] border border-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0A192F] text-xs font-mono"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-[#1d3557]">
                        <TrendingUp className="w-4 h-4 text-[#00D9FF]" />
                        <span className="text-[#00D9FF] text-sm font-semibold">{exp.impact}</span>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Internships */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-[#CCD6F6] mb-8">
              Internships
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {data.internships.map((intern, index) => (
                <Card 
                  key={intern.id}
                  className={`p-6 bg-[#112240] border-[#1d3557] hover:border-[#64FFDA] transition-all duration-500 transform hover:scale-105 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(data.experience.length + index) * 200}ms` }}
                >
                  <h4 className="text-lg font-bold text-[#CCD6F6] mb-2">{intern.company}</h4>
                  <p className="text-[#64FFDA] font-semibold mb-2">{intern.role}</p>
                  <p className="text-[#8892B0] text-sm font-mono mb-4">{intern.duration}</p>
                  
                  <ul className="space-y-2">
                    {intern.achievements.map((achievement, i) => (
                      <li key={i} className="text-[#8892B0] text-sm flex items-start gap-2">
                        <span className="text-[#64FFDA]">▹</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;