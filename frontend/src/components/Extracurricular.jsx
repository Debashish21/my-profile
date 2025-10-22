import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Award, Users, TrendingUp } from 'lucide-react';

const Extracurricular = ({ data }) => {
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

  return (
    <section id="extracurricular" ref={sectionRef} className="py-20 px-6 bg-[#0A192F] relative">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-4">
              <span className="text-[#64FFDA] font-mono text-2xl mr-2">05.</span>
              Leadership & Entrepreneurship
            </h2>
            <div className="w-32 h-1 bg-[#64FFDA]"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {data.extracurricular.map((activity, index) => (
              <Card
                key={activity.id}
                className={`p-8 bg-[#112240] border-[#1d3557] hover:border-[#64FFDA] transition-all duration-700 transform hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-[#0A192F] rounded-lg border border-[#64FFDA]">
                    {index === 0 ? (
                      <Award className="w-6 h-6 text-[#64FFDA]" />
                    ) : (
                      <Users className="w-6 h-6 text-[#64FFDA]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#CCD6F6] mb-1">{activity.organization}</h3>
                    <p className="text-[#64FFDA] font-semibold mb-2">{activity.role}</p>
                    <p className="text-[#8892B0] text-sm font-mono">{activity.duration}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {activity.achievements.map((achievement, i) => (
                    <li key={i} className="text-[#8892B0] text-sm flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-[#00D9FF] mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Extracurricular;