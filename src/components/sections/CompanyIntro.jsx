import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Cpu, Gauge, Globe2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CompanyIntro() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      textRef.current?.children || [],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const metrics = [
    { value: '500 kV', label: 'HIGHEST VOLTAGE RATING', desc: 'Extra-high voltage (EHV) certified' },
    { value: '99.999%', label: 'DIELECTRIC RELIABILITY', desc: 'Zero discharge failure tolerance' },
    { value: '65+ ', label: 'GLOBAL MARKETS', desc: 'Critical infrastructure deployed' },
    { value: '40 YRS', label: 'DESIGN LIFESPAN', desc: 'Tested for continuous thermal cycling' }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 sm:py-44 px-6 sm:px-12 lg:px-20 bg-[#07090B] border-t border-[#141B24] overflow-hidden"
    >
      {/* Subtle blueprint accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#168CFF]/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-8 flex items-center gap-3">
          <span className="w-10 h-[1px] bg-[#168CFF]" />
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#168CFF]">
            01 / COMPANY INTRODUCTION
          </span>
        </div>

        {/* Large Typography Statement */}
        <div ref={textRef} className="space-y-4 mb-20">
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black font-display tracking-tight text-[#F5F5F5] leading-[0.88] uppercase">
            PRECISION.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#168CFF] to-[#38BDF8]">
              ENGINEERING.
            </span>
            <br />
            <span className="text-[#9CA3AF]">
              RELIABILITY.
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
            <div className="lg:col-span-7">
              <p className="text-lg sm:text-xl text-[#D1D5DB] font-light leading-relaxed">
                Nexor Industrial designs and manufactures critical-mission power cable architectures for the world's most demanding environments. From subsea interconnects in the North Sea to nuclear-grade containment grids and 500kV smart distribution networks, our metallurgy and polymer extrusion technologies establish the benchmark for operational resilience.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-end">
              <p className="text-sm text-[#9CA3AF] leading-relaxed border-l-2 border-[#168CFF] pl-4 font-mono-tech">
                Every meter of conductor is subjected to laser geometry measurement, 100% helium leak screening, and high-frequency partial discharge acoustic analysis before leaving our facility.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-[#1A222D]">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#0B0F15] border border-[#18202C] hover:border-[#168CFF]/50 transition-colors duration-300 group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white group-hover:text-[#168CFF] transition-colors mb-2">
                {item.value}
              </div>
              <div className="text-xs font-mono-tech font-bold text-[#F5F5F5] tracking-wider mb-1">
                {item.label}
              </div>
              <div className="text-[11px] text-[#6B7280]">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
