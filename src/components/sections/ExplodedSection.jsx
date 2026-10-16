import React, { useRef, useState, useEffect } from 'react';
import { addLenisScrollListener } from '../../hooks/useLenisScroll';

export function ExplodedSection({ onProgressChange, onSelectLayerModal }) {
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
      if (onProgressChange) onProgressChange(p);
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
  }, [onProgressChange]);

  // Determine active step index (-1: intro, 0: jacket, 1: armour, 2: bedding, 3: cores, 4: copper, 5: outro)
  let activeStep = -1;
  if (localProgress < 0.14) {
    activeStep = -1;
  } else if (localProgress < 0.32) {
    activeStep = 0;
  } else if (localProgress < 0.48) {
    activeStep = 1;
  } else if (localProgress < 0.64) {
    activeStep = 2;
  } else if (localProgress < 0.80) {
    activeStep = 3;
  } else if (localProgress < 0.90) {
    activeStep = 4;
  } else {
    activeStep = 5;
  }

  const stepsData = [
    {
      num: '01',
      layerLabel: 'Layer 01 / 05',
      title: 'Outer Jacket',
      material: 'FR-LSH PVC · Type ST-2',
      desc: 'A flame-retardant, low-smoke sheath extruded in a single pass. It shrugs off UV, oil, moisture and abrasion in open trays and buried ducts.',
      specs: [
        { label: 'Thickness', value: '1.8 mm' },
        { label: 'Oxygen index', value: '≥ 29%' },
        { label: 'Standard', value: 'IS 5831' }
      ]
    },
    {
      num: '02',
      layerLabel: 'Layer 02 / 05',
      title: 'Braid & Shield',
      material: 'Galvanised steel braid · Al-PET foil · Copper tape',
      desc: 'Mechanical armour and electromagnetic screening in one assembly: a woven steel braid over a moisture-barrier foil, binder and overlapped copper tape.',
      specs: [
        { label: 'Braid cover', value: '85%' },
        { label: 'Foil cover', value: '100%' },
        { label: 'Screen', value: '0.05 mm Cu' }
      ]
    },
    {
      num: '03',
      layerLabel: 'Layer 03 / 05',
      title: 'Insulation & Bedding',
      material: 'Extruded PVC inner sheath · PP filler',
      desc: 'The inner sheath and non-hygroscopic filler keep the geometry perfectly round and cushion the cores from the metal layers above.',
      specs: [
        { label: 'Bedding', value: '0.6 mm' },
        { label: 'Filler', value: 'PP yarn' },
        { label: 'Moisture', value: 'Non-absorbent' }
      ]
    },
    {
      num: '04',
      layerLabel: 'Layer 04 / 05',
      title: 'Inner Cores',
      material: 'XLPE insulation · Colour-coded to IEC 60445',
      desc: 'Each conductor is insulated with cross-linked polyethylene, cured under heat and pressure, then colour-coded for error-free identification on site.',
      specs: [
        { label: 'Continuous', value: '90 °C' },
        { label: 'Short circuit', value: '250 °C' },
        { label: 'Voltage', value: '0.6 / 1.1 kV' }
      ]
    },
    {
      num: '05',
      layerLabel: 'Layer 05 / 05',
      title: 'Copper Conductors',
      material: '99.97% electrolytic-grade copper',
      desc: 'Drawn in-house from copper rod into 19-wire Class 2 strands, annealed for flexibility and compacted for the lowest possible resistance.',
      specs: [
        { label: 'Purity', value: '99.97% Cu' },
        { label: 'Conductivity', value: '≥ 100% IACS' },
        { label: 'Standard', value: 'IS 8130' }
      ]
    }
  ];

  const layerTicks = [
    '01 · Outer Jacket',
    '02 · Braid & Shield',
    '03 · Insulation & Bedding',
    '04 · Inner Cores',
    '05 · Copper Conductors'
  ];

  const scrollToStep = (idx) => {
    if (!sectionRef.current) return;
    const targets = [0.22, 0.38, 0.54, 0.70, 0.84];
    const targetProgress = targets[idx] || 0;
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
      id="exploded"
      className="relative h-[480svh] lg:h-[640vh]"
      aria-label="Cable anatomy"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden pointer-events-none">
        <div className="relative mx-auto h-full max-w-7xl px-5 sm:px-8">
          
          {/* INTRO CARD */}
          <div
            className={`absolute inset-x-5 bottom-[8svh] sm:inset-x-8 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:w-[26rem] transition-all duration-700 pointer-events-auto ${
              activeStep === -1
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <p className="eyebrow">Anatomy</p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2.6rem,6vw,5.6rem)] font-extrabold uppercase leading-[0.9] text-white">
              Five layers.<br />
              <span className="text-metal">One standard.</span>
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55 sm:text-base">
              Scroll to take a Vishwakarma cable apart, from the outer jacket to the copper at its heart.
            </p>
          </div>

          {/* 5 EXPLODED STEP CARDS */}
          {stepsData.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={step.num}
                className={`absolute inset-x-5 bottom-[4svh] sm:inset-x-8 lg:bottom-auto lg:top-1/2 lg:w-[26rem] lg:-translate-y-1/2 transition-all duration-700 pointer-events-auto ${
                  isCurrent
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none'
                }`}
              >
                <article>
                  <p className="flex items-baseline gap-4">
                    <span className="font-display text-5xl font-extrabold text-white/20 lg:text-7xl">
                      {step.num}
                    </span>
                    <span className="eyebrow">{step.layerLabel}</span>
                  </p>
                  <h3 className="mt-3 font-display text-[2.4rem] font-extrabold uppercase leading-[0.92] text-white lg:text-6xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-copper-light/90">
                    {step.material}
                  </p>
                  <p className="mt-4 hidden text-[15px] leading-relaxed text-white/60 sm:block">
                    {step.desc}
                  </p>

                  <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                    {step.specs.map((spec) => (
                      <div key={spec.label}>
                        <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                          {spec.label}
                        </dt>
                        <dd className="mt-1.5 font-display text-lg font-bold leading-tight text-white">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {onSelectLayerModal && (
                    <button
                      onClick={() => onSelectLayerModal(step)}
                      className="mt-6 text-xs font-semibold uppercase tracking-wider text-copper-light hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Engineering Specs</span>
                      <span>→</span>
                    </button>
                  )}
                </article>
              </div>
            );
          })}

          {/* OUTRO / REASSEMBLED CARD */}
          <div
            className={`absolute inset-x-5 bottom-[8svh] sm:inset-x-8 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:w-[26rem] transition-all duration-700 pointer-events-auto ${
              activeStep === 5
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <p className="eyebrow">Reassembled</p>
            <h3 className="mt-5 max-w-lg font-display text-[clamp(2.4rem,5vw,4.6rem)] font-extrabold uppercase leading-[0.92] text-white">
              Every layer,<br />
              <span className="text-metal-copper">tested together.</span>
            </h3>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55 sm:text-base">
              The conductors, insulation, armour and jacket reunite into an impenetrable monolithic cable tested to withstand extreme heat, voltage, and mechanical stress.
            </p>
          </div>

          {/* DESKTOP 5-LAYER PROGRESS BAR */}
          <div className="absolute inset-x-8 bottom-10 hidden lg:block pointer-events-auto">
            <div className="relative h-px bg-white/10 overflow-hidden">
              <span
                className="absolute inset-0 origin-left bg-gradient-to-r from-copper-light to-copper transition-transform duration-150 ease-out"
                style={{ transform: `scaleX(${Math.max(0, Math.min(1, localProgress))})` }}
              />
            </div>
            <ol className="mt-4 grid grid-cols-5">
              {layerTicks.map((label, i) => (
                <li
                  key={label}
                  onClick={() => scrollToStep(i)}
                  className={`text-[11px] font-semibold uppercase tracking-[0.24em] cursor-pointer transition-colors ${
                    activeStep === i
                      ? 'text-copper-light'
                      : activeStep > i
                      ? 'text-white/70'
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {label}
                </li>
              ))}
            </ol>
          </div>

          {/* MOBILE PROGRESS LINE */}
          <div className="absolute inset-x-5 top-24 h-px bg-white/10 lg:hidden pointer-events-none">
            <span
              className="absolute inset-0 origin-left bg-copper-light transition-transform duration-100"
              style={{ transform: `scaleX(${Math.max(0, Math.min(1, localProgress))})` }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
