import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, BarChart3 } from 'lucide-react';

const Projects = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
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
    <section id="projects" ref={sectionRef} className="min-h-screen py-20 px-6 bg-[#0A192F] relative">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-4">
              <span className="text-[#64FFDA] font-mono text-2xl mr-2">03.</span>
              Featured Projects
            </h2>
            <div className="w-32 h-1 bg-[#64FFDA]"></div>
          </div>

          <div className="space-y-12">
            {data.projects.map((project, index) => (
              <Card
                key={project.id}
                className={`group relative overflow-hidden bg-[#112240] border-[#1d3557] hover:border-[#64FFDA] transition-all duration-700 transform hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-30px]'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <ExternalLink className="w-5 h-5 text-[#64FFDA]" />
                        <h3 className="text-2xl font-bold text-[#CCD6F6] group-hover:text-[#64FFDA] transition-colors duration-300">
                          {project.title}
                        </h3>
                      </div>
                      
                      <p className="text-[#00D9FF] text-sm font-semibold mb-4">{project.company}</p>
                      
                      <p className="text-[#8892B0] text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <Badge
                            key={i}
                            className="bg-[#0A192F] text-[#64FFDA] border border-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0A192F] font-mono text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="md:w-64">
                      <div className="bg-[#0A192F] rounded-lg p-6 border border-[#1d3557]">
                        <div className="flex items-center gap-2 mb-4">
                          <BarChart3 className="w-5 h-5 text-[#64FFDA]" />
                          <h4 className="text-[#CCD6F6] font-semibold">Impact Metrics</h4>
                        </div>
                        
                        <div className="space-y-4">
                          {Object.entries(project.metrics).map(([key, value], i) => (
                            <div key={i} className="border-l-2 border-[#64FFDA] pl-3">
                              <p className="text-[#8892B0] text-xs uppercase tracking-wider mb-1">{key}</p>
                              <p className="text-[#CCD6F6] text-lg font-bold">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA]/0 to-[#64FFDA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;