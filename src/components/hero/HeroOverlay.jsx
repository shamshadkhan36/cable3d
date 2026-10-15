import React from 'react';
import { ArrowDown, Play, Pause, RotateCcw, Zap, Layers, Sparkles } from 'lucide-react';

export function HeroOverlay({
  scrollProgress = 0,
  isPlaying = false,
  onTogglePlay,
  onReset,
  onExplodeToggle,
  onScrubState,
  onSliderChange
}) {
  // Fade out large title as user begins scrolling into exploded states
  const titleOpacity = Math.max(0, 1 - scrollProgress * 2.8);

  // States description
  const states = [
    { label: 'STATE 0 — ASSEMBLED', desc: 'Monolithic Power Cable' },
    { label: 'STATE 1 — ZOOM IN', desc: 'Camera approaches cable' },
    { label: 'STATE 2 — SHEATH RETRACTION', desc: 'Outer sheath moves backward' },
    { label: 'STATE 3 — ARMOUR REVEAL', desc: 'Galvanized steel wire braid' },
    { label: 'STATE 4 — ARMOUR EXPANSION', desc: 'Radial separation from bedding' },
    { label: 'STATE 5 — BEDDING & SHEATH', desc: 'Extruded water-blocking buffer' },
    { label: 'STATE 6 — 3-CORE DISPERSION', desc: 'Blue, black, white phase cores separate' },
    { label: 'STATE 7 — COPPER FLARING', desc: 'Annealed Cu strands slide forward' },
    { label: 'STATE 8 — TECHNICAL CALLOUTS', desc: 'Full engineering specification' }
  ];

  const currentStateIndex = Math.min(8, Math.floor(scrollProgress * 9));
  const currentState = states[currentStateIndex] || states[0];
  const isExploded = scrollProgress > 0.7;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden select-none">
      {/* Top Telemetry & Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-opacity duration-300 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#168CFF] animate-pulse" />
          <span className="text-xs font-mono-tech tracking-widest text-[#F5F5F5] uppercase font-bold">
            NEXOR INDUSTRIAL
          </span>
          <span className="text-[10px] font-mono-tech px-2 py-0.5 border border-[#168CFF]/40 text-[#168CFF] bg-[#168CFF]/10">
            500 kV CUTAWAY
          </span>
        </div>

        {/* State Indicators and Controls */}
        <div className="flex items-center gap-3">
          {/* Active State Pill */}
          <div className="flex items-center gap-2 border border-[#1E2633] bg-[#0A0D12]/80 px-3.5 py-1.5 font-mono-tech text-[11px] backdrop-blur-sm">
            <span className="text-[#168CFF] font-bold">{currentState.label}</span>
            <span className="text-[#4B5563]">|</span>
            <span className="text-[#9CA3AF]">{Math.round(scrollProgress * 100)}%</span>
          </div>

          {/* Quick Scrub State Buttons (0 - 8) */}
          <div className="hidden md:flex items-center gap-1 bg-[#0A0D12]/90 border border-[#1E2633] p-1 backdrop-blur-sm">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((sIndex) => (
              <button
                key={`state-pill-${sIndex}`}
                onClick={() => onScrubState && onScrubState(sIndex / 8)}
                title={states[sIndex].label}
                className={`w-6 h-6 flex items-center justify-center font-mono-tech text-[10px] transition-all ${
                  currentStateIndex === sIndex
                    ? 'bg-[#168CFF] text-white font-bold shadow-[0_0_10px_rgba(22,140,255,0.5)]'
                    : 'text-[#6B7280] hover:text-[#F5F5F5] hover:bg-[#1A2230]'
                }`}
              >
                {sIndex}
              </button>
            ))}
          </div>

          {/* Auto Play / Pause Toggle Button */}
          <button
            onClick={onTogglePlay}
            className={`px-3.5 py-1.5 border font-mono-tech text-xs tracking-wider uppercase font-semibold transition-all flex items-center gap-2 backdrop-blur-sm ${
              isPlaying
                ? 'bg-[#FF7A18]/20 border-[#FF7A18] text-[#FF7A18] shadow-[0_0_15px_rgba(255,122,24,0.3)]'
                : 'bg-[#0D1219]/90 border-[#2A3644] text-[#F5F5F5] hover:border-[#168CFF]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-[#FF7A18]" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-[#168CFF]" />
                <span>AUTO PLAY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editorial Title (Fades smoothly as cable begins exploding) */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${scrollProgress * -70}px)`,
          pointerEvents: titleOpacity > 0.3 ? 'auto' : 'none'
        }}
        className="my-auto max-w-4xl transition-transform duration-200"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-[#168CFF]/40 bg-[#168CFF]/10 text-[#168CFF] text-xs font-mono-tech tracking-widest uppercase">
          <Zap className="w-3.5 h-3.5 text-[#168CFF]" />
          <span>PRECISION ENGINEERED CABLE SYSTEMS</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#F5F5F5] leading-[0.92] uppercase mb-4">
          ENGINEERED
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#94A3B8]">
            FOR POWER.
          </span>
          <br />
          <span className="text-3xl sm:text-5xl lg:text-6xl text-[#9CA3AF] font-bold block mt-3">
            BUILT FOR PERFORMANCE.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-[#9CA3AF] max-w-lg mb-8 leading-relaxed font-sans">
          Scroll down or use the interactive timeline to explode the outer sheath, metallic armour, phase insulation, and stranded copper conductor.
        </p>

        {/* Action Animation Triggers */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExplodeToggle}
            className="group relative px-7 py-3.5 bg-[#168CFF] hover:bg-[#0070E0] text-white font-mono-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(22,140,255,0.4)] hover:shadow-[0_0_35px_rgba(22,140,255,0.6)] flex items-center gap-3"
          >
            <span>{isExploded ? 'ASSEMBLE CABLE' : 'EXPLODE CABLE'}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            onClick={onReset}
            className="px-6 py-3.5 bg-[#0D1219]/90 hover:bg-[#141C26] text-[#F5F5F5] hover:text-white border border-[#2A3644] hover:border-[#168CFF] font-mono-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET TO 0%</span>
          </button>
        </div>
      </div>

      {/* Bottom Interactive Timeline Scrubber & Indicators */}
      <div className="flex flex-col gap-4 pointer-events-auto">
        {/* Interactive Scrub Slider */}
        <div className="w-full bg-[#0A0D12]/90 border border-[#1E2633] p-4 backdrop-blur-md flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#9CA3AF] whitespace-nowrap">
              SCRUB TIMELINE:
            </span>
            <span className="text-xs font-mono-tech font-bold text-[#168CFF]">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Range Slider */}
          <div className="w-full relative flex items-center">
            <input
              type="range"
              min="0"
              max="1"
              step="0.002"
              value={scrollProgress}
              onChange={(e) => onSliderChange && onSliderChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#1E2633] rounded-none appearance-none cursor-pointer accent-[#168CFF] focus:outline-none"
            />
          </div>

          {/* Quick jump to ends */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onScrubState && onScrubState(0)}
              className="px-2.5 py-1 text-[10px] font-mono-tech border border-[#1E2633] hover:border-[#168CFF] text-[#9CA3AF] hover:text-white uppercase transition-colors"
            >
              ASSEMBLED
            </button>
            <button
              onClick={() => onScrubState && onScrubState(1)}
              className="px-2.5 py-1 text-[10px] font-mono-tech border border-[#1E2633] hover:border-[#FF7A18] text-[#9CA3AF] hover:text-[#FF7A18] uppercase transition-colors"
            >
              EXPLODED
            </button>
          </div>
        </div>

        {/* Status bar & scroll helper */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono-tech text-[#6B7280]">
          <div className="flex items-center gap-4">
            <span className="text-[#9CA3AF]">CONTROLS:</span>
            <span>SCROLL WHEEL / TRACKPAD</span>
            <span>•</span>
            <span>DRAG SLIDER</span>
            <span>•</span>
            <span>CLICK NUMBERS 0-8</span>
          </div>

          <div
            style={{ opacity: titleOpacity }}
            className="flex items-center gap-2 text-xs text-[#9CA3AF] tracking-widest uppercase mt-2 sm:mt-0"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#168CFF] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
