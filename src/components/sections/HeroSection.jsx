import React from 'react';

export function HeroSection({ onOpenConsultation }) {
  const scrollToExploded = (e) => {
    e.preventDefault();
    const el = document.getElementById('exploded');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end pb-14 pt-28 lg:items-center lg:pb-0 lg:pt-20 overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="hero-glow pointer-events-none fixed left-1/2 top-1/2 z-[1] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 relative z-10">
        <div className="max-w-[46rem]">
          {/* Eyebrow with Hindi branding */}
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] text-white/55">
            <span lang="hi" className="text-sm normal-case tracking-normal text-copper-light font-bold">
              विश्वकर्मा
            </span>
            <span className="h-px w-8 bg-white/25" />
            <span>Wires &amp; Cables · Since 1968</span>
          </p>

          {/* Majestic Hero Headline */}
          <h1 className="mt-6 font-display text-[clamp(2.9rem,7.4vw,7.4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.005em] text-white">
            <span className="mr-[0.22em] inline-block text-metal">Engineered</span>
            <span className="mr-[0.22em] inline-block text-metal">
              for
              <br className="hidden sm:block" />
            </span>
            <span className="mr-[0.22em] inline-block text-metal-copper">Extreme</span>
            <span className="mr-[0.22em] inline-block text-metal-copper">Environments.</span>
          </h1>

          {/* Copper Gradient Rule */}
          <span className="mt-9 block h-px w-40 origin-left bg-gradient-to-r from-copper-light via-white/40 to-transparent" />

          {/* Description */}
          <p className="mt-8 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
            Power, control and industrial cables built layer by layer for furnaces, factories, vehicles and the grid, and tested drum by drum.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#exploded"
              onClick={scrollToExploded}
              className="btn-primary"
            >
              Explore the Engineering
            </a>
            <button
              onClick={onOpenConsultation}
              className="btn-ghost"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom metrics & scroll cue (Desktop) */}
      <div className="absolute inset-x-0 bottom-8 hidden lg:block z-10">
        <div className="mx-auto flex max-w-7xl items-end justify-between px-8">
          <dl className="flex gap-14">
            <div>
              <dt className="sr-only">Established</dt>
              <dd className="font-display text-2xl font-bold text-white tracking-wider">1968</dd>
              <dd className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">Established</dd>
            </div>
            <div>
              <dt className="sr-only">Cable constructions</dt>
              <dd className="font-display text-2xl font-bold text-white tracking-wider">1,200+</dd>
              <dd className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">Cable constructions</dd>
            </div>
            <div>
              <dt className="sr-only">Export countries</dt>
              <dd className="font-display text-2xl font-bold text-white tracking-wider">40</dd>
              <dd className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">Export countries</dd>
            </div>
          </dl>

          <span className="flex items-center gap-4 text-[10px] uppercase tracking-[0.34em] text-white/40">
            Scroll to explore
            <span className="relative block h-10 w-px overflow-hidden bg-white/15">
              <span className="scroll-cue absolute inset-x-0 top-0 h-4 bg-copper-light" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
