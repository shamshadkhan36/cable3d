import React from 'react';
import { Factory, Cog, Flame, Eye, Layers, Gauge } from 'lucide-react';

const PROCESSES = [
  {
    step: '01',
    title: 'RIGID CAGE COPPER STRANDING',
    icon: Cog,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    description: 'High-speed planetary stranding cages spin up to 61 annealed electrolytic copper wires in opposing concentric layers, compacting individual wires to achieve 98% geometrical circularity without tensile distortion.'
  },
  {
    step: '02',
    title: '180M VCV VERTICAL VULCANIZATION',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    description: 'Conductor cores descend vertically from our 180-meter tower while conductor screen, XLPE insulation, and insulation screen are extruded simultaneously in a triple-head die, eliminating gravitational sag.'
  },
  {
    step: '03',
    title: 'PRESSURIZED NITROGEN DRY CURING',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    description: 'Polymer cross-linking occurs inside high-pressure dry nitrogen tubes (CDCC process) preventing water micro-voids and guaranteeing a clean dielectric matrix rated for 500 kV operation.'
  },
  {
    step: '04',
    title: 'HELI-BRAID ARMOURING & SHEATHING',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
    description: 'High-tensile galvanized steel wires are counter-braided under calibrated pneumatic tension, followed by heavy-duty outer polymer jacket extrusion with online ultrasonic thickness verification.'
  }
];

export function Manufacturing() {
  return (
    <section id="manufacturing" className="py-32 px-6 sm:px-12 lg:px-20 bg-[#07090B] border-t border-[#141B24]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[1px] bg-[#168CFF]" />
              <span className="font-mono-tech text-xs tracking-widest uppercase text-[#168CFF]">
                06 / ADVANCED INFRASTRUCTURE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase">
              CINEMATIC ADVANCED
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9CA3AF]">
                MANUFACTURING
              </span>
            </h2>
          </div>
          <p className="text-sm font-mono-tech text-[#9CA3AF] max-w-md">
            Operating one of the world's most advanced vertical vulcanization towers and precision robotic stranding complexes.
          </p>
        </div>

        {/* Manufacturing Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {PROCESSES.map((proc, index) => {
            const Icon = proc.icon;
            return (
              <div
                key={proc.step}
                className="bg-[#0A0D12] border border-[#18202C] hover:border-[#168CFF] overflow-hidden transition-all duration-500 group flex flex-col justify-between"
              >
                <div className="relative h-64 w-full overflow-hidden bg-[#0D1219]">
                  <img
                    src={proc.image}
                    alt={proc.title}
                    className="w-full h-full object-cover object-center opacity-35 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/40 to-transparent" />

                  {/* Step Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#07090B]/90 border border-[#168CFF]/50 text-xs font-mono-tech text-[#168CFF] font-bold tracking-widest">
                      STAGE {proc.step}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 w-9 h-9 bg-[#07090B]/80 border border-[#1E2633] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#168CFF]" />
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black font-display text-white uppercase mb-3 group-hover:text-[#168CFF] transition-colors">
                    {proc.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {proc.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Facility Key Numbers Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-[#0B0F15] border border-[#1E2633]">
          <div>
            <span className="text-3xl sm:text-4xl font-black font-display text-white block mb-1">
              180 M
            </span>
            <span className="text-xs font-mono-tech text-[#9CA3AF] uppercase">
              VCV TOWER HEIGHT
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black font-display text-[#168CFF] block mb-1">
              12 LINES
            </span>
            <span className="text-xs font-mono-tech text-[#9CA3AF] uppercase">
              TRIPLE EXTRUSION SUITES
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black font-display text-[#FF7A18] block mb-1">
              45,000 T
            </span>
            <span className="text-xs font-mono-tech text-[#9CA3AF] uppercase">
              ANNUAL Cu/Al THROUGHPUT
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-black font-display text-white block mb-1">
              100%
            </span>
            <span className="text-xs font-mono-tech text-[#9CA3AF] uppercase">
              INLINE LASER SCREENED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
