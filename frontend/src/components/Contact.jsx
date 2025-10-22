import React, { useEffect, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';

const Contact = ({ data }) => {
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
    <section id="contact" ref={sectionRef} className="min-h-screen py-20 px-6 bg-[#0A192F] relative flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-4">
              <span className="text-[#64FFDA] font-mono text-2xl mr-2">07.</span>
              Get In Touch
            </h2>
            <div className="w-32 h-1 bg-[#64FFDA] mx-auto mb-6"></div>
            <p className="text-[#8892B0] text-lg max-w-2xl mx-auto">
              I'm currently open to new opportunities and interesting projects. Whether you have a question or just want to say hi, feel free to reach out!
            </p>
          </div>

          <Card className="p-8 md:p-12 bg-[#112240] border-2 border-[#1d3557] hover:border-[#64FFDA] transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#CCD6F6] mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <a 
                    href={`mailto:${data.personal.email}`}
                    className="flex items-center gap-4 p-4 bg-[#0A192F] rounded-lg border border-[#1d3557] hover:border-[#64FFDA] transition-all duration-300 group"
                  >
                    <div className="p-3 bg-[#112240] rounded-lg border border-[#64FFDA] group-hover:bg-[#64FFDA] transition-colors duration-300">
                      <Mail className="w-5 h-5 text-[#64FFDA] group-hover:text-[#0A192F]" />
                    </div>
                    <div>
                      <p className="text-[#8892B0] text-xs uppercase tracking-wider mb-1">Email</p>
                      <p className="text-[#CCD6F6] font-mono">{data.personal.email}</p>
                    </div>
                  </a>

                  <a 
                    href={`tel:${data.personal.phone}`}
                    className="flex items-center gap-4 p-4 bg-[#0A192F] rounded-lg border border-[#1d3557] hover:border-[#64FFDA] transition-all duration-300 group"
                  >
                    <div className="p-3 bg-[#112240] rounded-lg border border-[#64FFDA] group-hover:bg-[#64FFDA] transition-colors duration-300">
                      <Phone className="w-5 h-5 text-[#64FFDA] group-hover:text-[#0A192F]" />
                    </div>
                    <div>
                      <p className="text-[#8892B0] text-xs uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-[#CCD6F6] font-mono">{data.personal.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-[#0A192F] rounded-lg border border-[#1d3557]">
                    <div className="p-3 bg-[#112240] rounded-lg border border-[#64FFDA]">
                      <MapPin className="w-5 h-5 text-[#64FFDA]" />
                    </div>
                    <div>
                      <p className="text-[#8892B0] text-xs uppercase tracking-wider mb-1">Location</p>
                      <p className="text-[#CCD6F6] font-mono">{data.personal.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA and Social */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#CCD6F6] mb-6">Let's Connect</h3>
                  <p className="text-[#8892B0] mb-6">
                    I'm always interested in hearing about new projects and opportunities. Drop me a line and let's create something amazing together!
                  </p>
                  
                  <Button
                    onClick={() => window.location.href = `mailto:${data.personal.email}`}
                    className="w-full bg-[#64FFDA] text-[#0A192F] hover:bg-[#00D9FF] font-mono text-lg py-6 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Email
                  </Button>
                </div>

                <div className="mt-8">
                  <h4 className="text-[#CCD6F6] font-semibold mb-4">Find me on:</h4>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="p-3 bg-[#0A192F] rounded-lg border border-[#1d3557] hover:border-[#64FFDA] transition-all duration-300 group"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-[#64FFDA] group-hover:text-[#00D9FF]" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-[#0A192F] rounded-lg border border-[#1d3557] hover:border-[#64FFDA] transition-all duration-300 group"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5 text-[#64FFDA] group-hover:text-[#00D9FF]" />
                    </a>
                    <a
                      href="#"
                      className="p-3 bg-[#0A192F] rounded-lg border border-[#1d3557] hover:border-[#64FFDA] transition-all duration-300 group"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5 text-[#64FFDA] group-hover:text-[#00D9FF]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;