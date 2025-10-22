import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-20 px-6 bg-[#0f2847] relative">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-4">
              <span className="text-[#64FFDA] font-mono text-2xl mr-2">06.</span>
              Education
            </h2>
            <div className="w-32 h-1 bg-[#64FFDA]"></div>
          </div>

          <Card className="p-8 md:p-12 bg-[#112240] border-2 border-[#1d3557] hover:border-[#64FFDA] transition-all duration-500 transform hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="p-6 bg-[#0A192F] rounded-xl border-2 border-[#64FFDA]">
                <GraduationCap className="w-16 h-16 text-[#64FFDA]" />
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-bold text-[#CCD6F6] mb-3">{data.education.degree}</h3>
                <p className="text-xl text-[#64FFDA] font-semibold mb-4">{data.education.institution}</p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex items-center gap-2 text-[#8892B0]">
                    <Calendar className="w-5 h-5 text-[#00D9FF]" />
                    <span className="font-mono">{data.education.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#8892B0]">
                    <MapPin className="w-5 h-5 text-[#00D9FF]" />
                    <span className="font-mono">Vellore, India</span>
                  </div>
                </div>

                <div className="p-6 bg-[#0A192F] rounded-lg border border-[#1d3557]">
                  <h4 className="text-[#CCD6F6] font-semibold mb-3">Key Highlights:</h4>
                  <ul className="space-y-2">
                    <li className="text-[#8892B0] flex items-start gap-2">
                      <span className="text-[#64FFDA] mt-1">▹</span>
                      <span>Specialized in Web Development and Data Structures</span>
                    </li>
                    <li className="text-[#8892B0] flex items-start gap-2">
                      <span className="text-[#64FFDA] mt-1">▹</span>
                      <span>Active member of DreamMerchants Business Club</span>
                    </li>
                    <li className="text-[#8892B0] flex items-start gap-2">
                      <span className="text-[#64FFDA] mt-1">▹</span>
                      <span>Entrepreneur Lead at IIT Madras Innovation Centre</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Education;