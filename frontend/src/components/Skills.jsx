import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';

const Skills = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
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

  const SkillPill = ({ name, description, delay }) => (
    <div 
      className={`group relative transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHoveredSkill(name)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      <div className="px-5 py-3 bg-[#112240] border border-[#1d3557] rounded-full 
                    hover:border-[#64FFDA] hover:bg-[#1d3557] hover:shadow-lg 
                    hover:shadow-[#64FFDA]/20 hover:scale-105 transition-all duration-300 
                    cursor-pointer">
        <span className="text-[#CCD6F6] font-mono text-sm group-hover:text-[#64FFDA] 
                       transition-colors duration-300">
          {name}
        </span>
      </div>
      
      {/* Tooltip on hover */}
      {hoveredSkill === name && description && (
        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                      px-3 py-2 bg-[#0a192f] border border-[#64FFDA] rounded-lg 
                      whitespace-nowrap animate-fadeIn">
          <p className="text-xs text-[#8892B0]">{description}</p>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                        border-4 border-transparent border-t-[#64FFDA]"></div>
        </div>
      )}
    </div>
  );

  const skillCategories = [
    { title: 'Technical Skills', skills: data.skills.technical, icon: '💻' },
    { title: 'Product & Management', skills: data.skills.productManagement, icon: '📊' },
    { title: 'Marketing & Branding', skills: data.skills.marketing, icon: '📢' }
  ];

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen py-20 px-6 bg-[#0f2847] relative">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-4">
              <span className="text-[#64FFDA] font-mono text-2xl mr-2">04.</span>
              Skills & Expertise
            </h2>
            <div className="w-32 h-1 bg-[#64FFDA]"></div>
            <p className="text-[#8892B0] mt-4 text-lg">
              Hover over any skill to see what I do with it
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, catIndex) => (
              <Card
                key={catIndex}
                className="p-8 bg-[#112240] border-[#1d3557] hover:border-[#64FFDA] 
                         transition-all duration-500 group"
              >
                <h3 className="text-2xl font-bold text-[#CCD6F6] mb-6 flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, index) => (
                    <SkillPill
                      key={skill.name}
                      name={skill.name}
                      description={skill.description}
                      delay={(catIndex * 100) + (index * 50)}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;