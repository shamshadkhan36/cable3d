import React, { useState } from 'react';
import { ArrowRight, Layers, ShieldCheck, Cpu, Zap } from 'lucide-react';

export function ProductsSection({ onSelectProduct }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const products = [
    {
      id: 'lt-power',
      badge: 'IS 7098',
      title: 'LT Power Cables',
      desc: 'XLPE & PVC insulated, armoured and unarmoured, 1.5 to 1000 sq mm.',
      accent: '#e8843a',
      icon: Zap,
      gradient: 'linear-gradient(135deg, #1f1812 0%, #0d0e12 100%)',
      glow: 'rgba(232, 132, 58, 0.25)'
    },
    {
      id: 'control-inst',
      badge: 'IS 1554',
      title: 'Control & Instrumentation',
      desc: 'Multi-core, foil and braid screened for noise-free signal transmission.',
      accent: '#3d8bff',
      icon: Cpu,
      gradient: 'linear-gradient(135deg, #121926 0%, #0d0e12 100%)',
      glow: 'rgba(61, 139, 255, 0.25)'
    },
    {
      id: 'heavy-ind',
      badge: '250 °C',
      title: 'Heavy Industrial',
      desc: 'Heat, oil and abrasion resistant cables for steel, cement and power plants.',
      accent: '#ff7a18',
      icon: ShieldCheck,
      gradient: 'linear-gradient(135deg, #24160d 0%, #0d0e12 100%)',
      glow: 'rgba(255, 122, 24, 0.25)'
    },
    {
      id: 'auto-ev',
      badge: '10M cycles',
      title: 'Automation & EV',
      desc: 'High-flex harness cables for robotics, drag chains and EV charging.',
      accent: '#00f0ff',
      icon: Layers,
      gradient: 'linear-gradient(135deg, #0e1e24 0%, #0d0e12 100%)',
      glow: 'rgba(0, 240, 255, 0.25)'
    }
  ];

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    setHoveredCard(index);
  };

  const manufacturingStages = [
    {
      step: '01',
      title: 'Wire Drawing',
      desc: 'In-house rod breakdown and annealing for uniform conductivity.'
    },
    {
      step: '02',
      title: 'Insulation & Sheathing',
      desc: 'Triple-layer extrusion lines with laser diameter control.'
    },
    {
      step: '03',
      title: 'Tested Every Drum',
      desc: 'High-voltage, spark and resistance tests in our NABL lab.'
    }
  ];

  return (
    <section
      id="products"
      className="relative bg-gradient-to-b from-transparent via-[#06080c]/95 via-[18vh] to-[#06080c] z-10"
    >
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-[28vh] sm:px-8 sm:pb-36">
        
        {/* Header */}
        <div className="max-w-2xl">
          <p className="eyebrow">What we manufacture</p>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,5.6vw,5.6rem)] font-extrabold uppercase leading-[0.9] text-white">
            Engineered <span className="text-metal-copper">layer by layer.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/60 sm:text-base">
            Fourteen controlled stages from copper rod to tested drum, trusted by state utilities, EPC contractors and OEMs across the world.
          </p>
        </div>

        {/* 4 Interactive Perspective Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: '1200px' }}>
          {products.map((item, index) => {
            const isHovered = hoveredCard === index;
            const tiltX = isHovered ? (mousePos.y - 0.5) * -12 : 0;
            const tiltY = isHovered ? (mousePos.x - 0.5) * 12 : 0;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectProduct && onSelectProduct(item)}
                className="cursor-pointer group relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#090c12] transition-transform duration-300 ease-out"
                style={{
                  transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
                  transformStyle: 'preserve-3d',
                  background: item.gradient
                }}
              >
                {/* Subtle Radial Glow Follower */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${item.glow}, transparent 55%)`
                  }}
                />

                {/* Top Badge */}
                <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[11px] font-semibold tracking-wider text-copper-light backdrop-blur">
                  {item.badge}
                </span>

                {/* Card Icon Header */}
                <div className="p-6">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-white/30 transition-colors">
                    <Icon className="w-5 h-5 text-copper-light" />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div
                  className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#06080c] via-[#06080c]/80 to-transparent"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-white group-hover:text-copper-light transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {item.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-copper-light group-hover:translate-x-1 transition-transform">
                    View range <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Manufacturing Process Highlights */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {manufacturingStages.map((stage) => (
            <div key={stage.step} className="bg-[#080b10] p-8 hover:bg-[#0c1017] transition-colors">
              <p className="font-display text-sm font-bold tracking-[0.3em] text-copper">
                {stage.step}
              </p>
              <p className="mt-3 font-display text-2xl font-bold uppercase text-white">
                {stage.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
