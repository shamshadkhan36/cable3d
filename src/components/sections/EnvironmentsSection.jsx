import React, { useRef, useState, useEffect } from 'react';
import { addLenisScrollListener } from '../../hooks/useLenisScroll';

export function EnvironmentsSection({ onEnvChange }) {
  const sectionRef = useRef(null);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalDistance = sectionRef.current.offsetHeight - window.innerHeight;
      if (totalDistance <= 0) return;

      const raw = -rect.top / totalDistance;
      const p = Math.max(0, Math.min(1, raw));
      setLocalProgress(p);

      // Determine active environment index (0 to 3)
      const envIdx = Math.min(3, Math.floor(p * 4));
      if (onEnvChange) onEnvChange(envIdx, p);
    };

    calculateProgress();
    const unsubscribe = addLenisScrollListener(calculateProgress);
    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [onEnvChange]);

  const activeEnvIdx = Math.min(3, Math.floor(localProgress * 4));

  const environments = [
    {
      num: '01',
      subtitle: 'Steel · Cement · Glass · Foundry',
      title: 'High-Temperature Industry',
      desc: 'Silicone and mica-taped constructions that keep conducting beside furnaces, ladles and kilns.',
      specs: [
        { label: 'Rated', value: 'Up to 250 °C' },
        { label: 'Jacket', value: 'Silicone / FEP' },
        { label: 'Fire', value: 'IEC 60331' }
      ]
    },
    {
      num: '02',
      subtitle: 'Harness · Charging · Battery systems',
      title: 'Automotive & EV',
      desc: 'High-flex, halogen-free cables for EV harnesses, DC fast-charging and battery energy storage.',
      specs: [
        { label: 'Voltage', value: 'Up to 1.5 kV DC' },
        { label: 'Jacket', value: 'Halogen-free' },
        { label: 'Flex', value: 'Class 5 / 6' }
      ]
    },
    {
      num: '03',
      subtitle: 'Robotics · Drag chains · Machine tools',
      title: 'Machinery & Automation',
      desc: 'Screened control and servo cables built for continuous motion, coolant and oil exposure.',
      specs: [
        { label: 'Flex life', value: '10 M cycles' },
        { label: 'Jacket', value: 'PUR, oil-resistant' },
        { label: 'Screen', value: 'Tinned Cu braid' }
      ]
    },
    {
      num: '04',
      subtitle: 'Substations · Solar · Grid',
      title: 'Energy & Utilities',
      desc: 'LT and HT power cables trusted by state utilities, EPC contractors and renewable developers.',
      specs: [
        { label: 'Range', value: 'Up to 33 kV' },
        { label: 'Sizes', value: '1.5 – 1000 mm²' },
        { label: 'Tested', value: 'Every drum' }
      ]
    }
  ];

  const scrollToEnv = (idx) => {
    if (!sectionRef.current) return;
    const targetProgress = (idx + 0.5) / 4;
    const totalDistance = sectionRef.current.offsetHeight - window.innerHeight;
    const sectionTop = sectionRef.current.offsetTop;
    window.scrollTo({
      top: sectionTop + totalDistance * targetProgress,
      behavior: 'smooth'
    });
  };

  return (
    <section
      ref={sectionRef}
      id="environments"
      className="relative h-[420svh] lg:h-[520vh]"
      aria-label="Applications"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden pointer-events-none">
        
        {/* Environment Light Sweep Line */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-[linear-gradient(90deg,transparent,rgba(255,214,170,0.12)_45%,rgba(255,255,255,0.25)_50%,rgba(150,190,255,0.12)_55%,transparent)] transition-all duration-300"
          style={{
            transform: `translateX(${localProgress * 100}vw)`,
            opacity: localProgress > 0.02 && localProgress < 0.98 ? 1 : 0
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto h-full max-w-7xl px-5 sm:px-8">
          
          {/* Eyebrow Top Left */}
          <p className="eyebrow absolute left-5 top-24 sm:left-8 lg:top-28">
            Built for every environment
          </p>

          {/* Top Right 4-step Progress Indicator */}
          <div className="absolute inset-x-5 top-32 sm:inset-x-8 lg:left-auto lg:right-8 lg:top-28 lg:w-[22rem] pointer-events-auto">
            <div className="relative h-px bg-white/10 overflow-hidden">
              <span
                className="absolute inset-0 origin-left bg-gradient-to-r from-copper-light to-volt transition-transform duration-150"
                style={{ transform: `scaleX(${Math.max(0, Math.min(1, localProgress))})` }}
              />
            </div>
            <ol className="mt-3 hidden justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-white lg:flex">
              {['01', '02', '03', '04'].map((tick, i) => (
                <li
                  key={tick}
                  onClick={() => scrollToEnv(i)}
                  className={`cursor-pointer transition-opacity ${
                    activeEnvIdx === i ? 'opacity-100 text-copper-light' : 'opacity-30 hover:opacity-60'
                  }`}
                >
                  {tick}
                </li>
              ))}
            </ol>
          </div>

          {/* 4 Environment Cards */}
          {environments.map((env, idx) => {
            const isCurrent = activeEnvIdx === idx;
            return (
              <div
                key={env.num}
                className={`absolute inset-x-5 bottom-[6svh] sm:inset-x-8 lg:bottom-[10vh] transition-all duration-700 pointer-events-auto ${
                  isCurrent
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
              >
                <p className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">
                  <span className="font-display text-base tracking-normal text-copper-light font-bold">
                    {env.num}
                  </span>
                  <span className="h-px w-10 bg-white/20" />
                  <span>{env.subtitle}</span>
                </p>

                <h2 className="mt-5 max-w-5xl font-display text-[clamp(2.6rem,7.6vw,8.4rem)] font-extrabold uppercase leading-[0.86] text-white">
                  <span className="text-metal">{env.title}</span>
                </h2>

                <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-16">
                  <p className="max-w-md text-[15px] leading-relaxed text-white/60">
                    {env.desc}
                  </p>

                  <dl className="hidden gap-10 sm:flex">
                    {env.specs.map((spec) => (
                      <div key={spec.label}>
                        <dt className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                          {spec.label}
                        </dt>
                        <dd className="mt-1.5 font-display text-xl font-bold text-white">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
