import React from 'react';
import { ArrowUpRight, Zap, Building2, Factory, Flame, Wind, Train } from 'lucide-react';

const INDUSTRIES = [
  {
    id: 'energy',
    title: 'ENERGY & UTILITIES',
    badge: 'TRANSMISSION & GRIDS',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80',
    description: 'Bulk electrical power transmission across metropolitan interconnects, gas-insulated substations (GIS), and high-capacity national grids.',
    specs: ['Up to 500 kV EHV', 'Substation interconnects', 'Low dielectric loss']
  },
  {
    id: 'infrastructure',
    title: 'INFRASTRUCTURE & RAIL',
    badge: 'RAPID TRANSIT & TUNNELS',
    icon: Train,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80',
    description: 'Critical trackside signalling, traction power delivery, and emergency ventilation circuits engineered with zero-halogen low-smoke safety.',
    specs: ['25 kV Catenary feeds', 'EN 50124 Compliance', 'Zero toxic smoke release']
  },
  {
    id: 'manufacturing',
    title: 'ADVANCED MANUFACTURING',
    badge: 'ROBOTICS & HEAVY INDUSTRY',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    description: 'Continuous torsional duty and electromagnetic shielding for automotive assembly plants, automated smelters, and semiconductor cleanrooms.',
    specs: ['10M+ Flex cycles', 'EMC shielded', 'Heavy chemical resistance']
  },
  {
    id: 'construction',
    title: 'CONSTRUCTION & DATA CENTERS',
    badge: 'CRITICAL MISSION POWER',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    description: 'High-density busway feeds, hyperscale data center continuous power uptime, and skyscraper vertical riser distribution networks.',
    specs: ['99.999% uptime rating', 'Class AG4 impact rating', 'Compact riser designs']
  },
  {
    id: 'oil-gas',
    title: 'OIL, GAS & PETROCHEM',
    badge: 'EXPLOSION PROOF ZONE 1/2',
    icon: Flame,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    description: 'Impervious hydrocarbon-resistant sheathing and mud-resistant compounds formulated for offshore drilling rigs and coastal refineries.',
    specs: ['NEK 606 Mud resistant', 'ATEX / IECEx certified', 'Lead-sheathed barriers']
  },
  {
    id: 'renewables',
    title: 'RENEWABLE ENERGY',
    badge: 'OFFSHORE WIND & SOLAR',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80',
    description: 'Inter-array 66kV dynamic cables for floating offshore wind turbines, DC solar collector feeds, and battery storage energy systems (BESS).',
    specs: ['Dynamic subsea flex', '1500V DC Photovoltaic', 'Salt-fog corrosion immunity']
  }
];

export function Industries() {
  return (
    <section id="industries" className="py-32 px-6 sm:px-12 lg:px-20 bg-[#07090B] border-t border-[#141B24]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[1px] bg-[#168CFF]" />
              <span className="font-mono-tech text-xs tracking-widest uppercase text-[#168CFF]">
                04 / SECTOR APPLICATIONS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase">
              DEPLOYED IN CRITICAL
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9CA3AF]">
                GLOBAL INDUSTRIES
              </span>
            </h2>
          </div>
          <p className="text-sm font-mono-tech text-[#9CA3AF] max-w-md">
            Providing unbreakable electrical transmission architectures where component failure is not an option.
          </p>
        </div>

        {/* 6 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-[#0A0D12] border border-[#18202C] hover:border-[#168CFF] overflow-hidden transition-all duration-500 flex flex-col justify-between"
              >
                {/* Background Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-[#0D1219]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/50 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#07090B]/90 border border-[#1E2633] group-hover:border-[#168CFF]/60 text-[9px] font-mono-tech text-[#168CFF] uppercase tracking-wider backdrop-blur-sm transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon badge */}
                  <div className="absolute top-4 right-4 w-9 h-9 bg-[#07090B]/80 border border-[#1E2633] group-hover:border-[#168CFF] group-hover:bg-[#168CFF] flex items-center justify-center transition-all duration-300">
                    <Icon className="w-4 h-4 text-[#9CA3AF] group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-white uppercase mb-3 group-hover:text-[#168CFF] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Technical capabilities */}
                  <div className="pt-4 border-t border-[#141B24] space-y-1.5 font-mono-tech text-[10px] text-[#6B7280]">
                    {item.specs.map((sp, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#168CFF]" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
