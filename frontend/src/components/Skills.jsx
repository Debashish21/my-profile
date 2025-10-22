import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';

const Skills = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars
          setTimeout(() => {
            const allSkills = {
              ...data.skills.frontend.reduce((acc, skill) => ({ ...acc, [skill.name]: skill.level }), {}),
              ...data.skills.backend.reduce((acc, skill) => ({ ...acc, [skill.name]: skill.level }), {}),
              ...data.skills.tools.reduce((acc, skill) => ({ ...acc, [skill.name]: skill.level }), {}),
              ...data.skills.other.reduce((acc, skill) => ({ ...acc, [skill.name]: skill.level }), {})
            };
            setAnimatedSkills(allSkills);
          }, 300);
        }
      },
      { threshold: 0.2 }
    );
 
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [data.skills]);

  const SkillBar = ({ name, level, delay }) => (
    <div 
      className={`mb-6 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-[#CCD6F6] font-mono text-sm">{name}</span>
        <span className="text-[#64FFDA] font-mono text-sm font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-[#1d3557] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#64FFDA] to-[#00D9FF] rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: animatedSkills[name] ? `${animatedSkills[name]}%` : '0%',
            transitionDelay: `${delay}ms`
          }}
        ></div>
      </div>
    </div>
  );

  const skillCategories = [
    { title: 'Frontend Development', skills: data.skills.frontend, color: '#64FFDA' },
    { title: 'Backend & Database', skills: data.skills.backend, color: '#00D9FF' },
    { title: 'AI & Development Tools', skills: data.skills.tools, color: '#64FFDA' },
    { title: 'Product & Management', skills: data.skills.other, color: '#00D9FF' }
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
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, catIndex) => (
              <Card
                key={catIndex}
                className="p-8 bg-[#112240] border-[#1d3557] hover:border-[#64FFDA] transition-all duration-500"
              >
                <h3 className="text-2xl font-bold text-[#CCD6F6] mb-6 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></span>
                  {category.title}
                </h3>
                
                <div>
                  {category.skills.map((skill, index) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={(catIndex * 200) + (index * 100)}
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