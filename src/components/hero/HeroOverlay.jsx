import React, { useState } from 'react';
import {
  ArrowDown,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Shield,
  Layers,
  Thermometer,
  Cpu,
  Factory,
  CheckCircle,
  Image,
  X,
  ChevronRight
} from 'lucide-react';
import {
  CABLE_ENVIRONMENTS,
  PRODUCT_CATEGORIES,
  MANUFACTURING_STEPS
} from '../../config/cableConfig';

export function HeroOverlay({
  scrollProgress = 0,
  isPlaying = false,
  onTogglePlay,
  onReset,
  onExplodeToggle,
  onScrubState,
  onSliderChange,
  activeEnvIndex,
  onSelectEnvironment,
  activeCategory,
  onSelectCategory,
  onOpenConsultation
}) {
  const [showRefImage, setShowRefImage] = useState(false);

  // Narrative chapter definitions mapped to scroll progress
  const chapters = [
    {
      id: 'hero',
      number: '01',
      title: 'MONOLITHIC CABLE',
      subtitle: 'PRECISION ENGINEERING',
      range: [0.0, 0.12]
    },
    {
      id: 'rotation',
      number: '02',
      title: 'AXIAL ROTATION',
      subtitle: 'GEOMETRIC REVEAL',
      range: [0.12, 0.28]
    },
    {
      id: 'exploded',
      number: '03',
      title: 'EXPLODED VIEW',
      subtitle: 'LAYER-BY-LAYER DISPERSION',
      range: [0.28, 0.58]
    },
    {
      id: 'inspection',
      number: '04',
      title: 'INTERNAL INSPECTION',
      subtitle: 'TRAVELLING INSIDE CABLE',
      range: [0.58, 0.68]
    },
    {
      id: 'reassembly',
      number: '05',
      title: 'REASSEMBLY SEQUENCE',
      subtitle: 'CONCENTRIC RESTORATION',
      range: [0.68, 0.78]
    },
    {
      id: 'environments',
      number: '06',
      title: 'EXTREME ENVIRONMENTS',
      subtitle: '4 CINEMATIC ATMOSPHERES',
      range: [0.78, 0.90]
    },
    {
      id: 'products',
      number: '07',
      title: 'PRODUCT PORTFOLIO',
      subtitle: 'INTERACTIVE SYSTEMS',
      range: [0.90, 0.96]
    },
    {
      id: 'cta',
      number: '08',
      title: 'TECHNICAL CTA',
      subtitle: 'ENGINEERING CONSULTATION',
      range: [0.96, 1.0]
    }
  ];

  // Determine current chapter
  const currentChapter =
    chapters.find((c) => scrollProgress >= c.range[0] && scrollProgress <= c.range[1]) ||
    chapters[0];

  // Helper opacities for contextual chapter titles
  const heroOpacity = Math.max(0, 1 - scrollProgress * 7.5);
  const rotOpacity = Math.max(0, Math.min(1, 1 - Math.abs(scrollProgress - 0.20) * 10));
  const inspectOpacity = Math.max(0, Math.min(1, 1 - Math.abs(scrollProgress - 0.63) * 12));
  const reassembleOpacity = Math.max(0, Math.min(1, 1 - Math.abs(scrollProgress - 0.73) * 12));
  const envOpacity = Math.max(0, Math.min(1, 1 - Math.abs(scrollProgress - 0.84) * 9));
  const prodOpacity = Math.max(0, Math.min(1, 1 - Math.abs(scrollProgress - 0.93) * 18));
  const ctaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.96) * 25));

  const isExplodedState = scrollProgress >= 0.35 && scrollProgress <= 0.65;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-5 sm:p-8 md:p-12 overflow-hidden select-none">
      {/* Target Reference Image Flyout */}
      {showRefImage && (
        <div className="absolute top-20 right-6 z-50 pointer-events-auto bg-[#0D1219]/95 border border-[#168CFF] p-4 shadow-2xl max-w-sm sm:max-w-md animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1E2633]">
            <span className="text-[10px] font-mono-tech text-[#168CFF] font-bold uppercase tracking-wider">
              TARGET SPECIFICATION (product.png)
            </span>
            <button
              onClick={() => setShowRefImage(false)}
              className="text-[#9CA3AF] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <img
            src="/product.png"
            alt="Reference Cable"
            className="w-full h-auto object-cover border border-[#1E2633]"
          />
          <p className="mt-2 text-[10px] text-[#9CA3AF] font-mono-tech">
            100% Geometry & Material Match: 3-Core Cutaway, Braided Steel Armour, 57 Copper Strands, and Polyethylene Jacket.
          </p>
        </div>
      )}

      {/* Top Telemetry & Control Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#168CFF] animate-pulse" />
          <span className="text-xs font-mono-tech tracking-widest text-[#F5F5F5] uppercase font-bold">
            NEXOR INDUSTRIAL
          </span>
          <span className="text-[10px] font-mono-tech px-2 py-0.5 border border-[#168CFF]/40 text-[#168CFF] bg-[#168CFF]/10">
            500 kV CUTAWAY FILM
          </span>
        </div>

        {/* State Indicators and Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Active Chapter Pill */}
          <div className="flex items-center gap-2 border border-[#1E2633] bg-[#0A0D12]/90 px-3 py-1.5 font-mono-tech text-[10px] sm:text-[11px] backdrop-blur-md">
            <span className="text-[#168CFF] font-bold">
              {currentChapter.number} {currentChapter.title}
            </span>
            <span className="text-[#4B5563]">|</span>
            <span className="text-[#9CA3AF]">{Math.round(scrollProgress * 100)}%</span>
          </div>

          {/* Quick Chapter Navigation Buttons (01 - 08) */}
          <div className="hidden xl:flex items-center gap-1 bg-[#0A0D12]/90 border border-[#1E2633] p-1 backdrop-blur-md">
            {chapters.map((ch, idx) => (
              <button
                key={`chapter-btn-${ch.id}`}
                onClick={() => onScrubState && onScrubState(ch.range[0])}
                title={`${ch.number} ${ch.title}`}
                className={`px-2 py-1 flex items-center gap-1 font-mono-tech text-[9px] transition-all ${
                  currentChapter.id === ch.id
                    ? 'bg-[#168CFF] text-white font-bold shadow-[0_0_12px_rgba(22,140,255,0.5)]'
                    : 'text-[#6B7280] hover:text-[#F5F5F5] hover:bg-[#1A2230]'
                }`}
              >
                <span>{ch.number}</span>
              </button>
            ))}
          </div>

          {/* Auto Play / Pause Toggle Button */}
          <button
            onClick={onTogglePlay}
            className={`px-3 py-1.5 border font-mono-tech text-[11px] tracking-wider uppercase font-semibold transition-all flex items-center gap-2 backdrop-blur-md ${
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

          {/* Reference Photo Toggle */}
          <button
            onClick={() => setShowRefImage(!showRefImage)}
            className={`px-2.5 py-1.5 border font-mono-tech text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 backdrop-blur-md ${
              showRefImage
                ? 'bg-[#168CFF]/20 border-[#168CFF] text-[#168CFF]'
                : 'bg-[#0D1219]/90 border-[#2A3644] text-[#9CA3AF] hover:text-white hover:border-[#168CFF]'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">REF</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CONTEXTUAL CINEMATIC CHAPTER OVERLAYS */}
      {/* ============================================================== */}
      <div className="relative my-auto max-w-4xl">
        {/* CHAPTER 1: HERO LOAD (0.00 -> 0.12) */}
        {heroOpacity > 0.02 && (
          <div
            style={{
              opacity: heroOpacity,
              transform: `translate3d(0, ${scrollProgress * -60}px, 0)`,
              pointerEvents: heroOpacity > 0.3 ? 'auto' : 'none'
            }}
            className="transition-transform duration-200"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 border border-[#168CFF]/40 bg-[#168CFF]/10 text-[#168CFF] text-xs font-mono-tech tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5 text-[#168CFF]" />
              <span>PRECISION INDUSTRIAL CABLE ENGINEERING</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black font-display tracking-tight text-[#F5F5F5] leading-[0.92] uppercase mb-4">
              ENGINEERED
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#94A3B8]">
                FOR POWER.
              </span>
              <br />
              <span className="text-2xl sm:text-4xl lg:text-5xl text-[#9CA3AF] font-bold block mt-2">
                BUILT FOR PERFORMANCE.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-lg mb-8 leading-relaxed font-sans">
              Scroll down to witness the layer-by-layer axial explosion, internal conductor inspection, and extreme industrial environment testing.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExplodeToggle}
                className="group relative px-7 py-3.5 bg-[#168CFF] hover:bg-[#0070E0] text-white font-mono-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(22,140,255,0.4)] hover:shadow-[0_0_35px_rgba(22,140,255,0.6)] flex items-center gap-3"
              >
                <span>{isExplodedState ? 'ASSEMBLE CABLE' : 'EXPLODE CABLE'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={onReset}
                className="px-6 py-3.5 bg-[#0D1219]/90 hover:bg-[#141C26] text-[#F5F5F5] hover:text-white border border-[#2A3644] hover:border-[#168CFF] font-mono-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET TIMELINE</span>
              </button>
            </div>
          </div>
        )}

        {/* CHAPTER 2: AXIAL ROTATION (0.12 -> 0.28) */}
        {rotOpacity > 0.05 && (
          <div
            style={{
              opacity: rotOpacity,
              pointerEvents: rotOpacity > 0.4 ? 'auto' : 'none'
            }}
            className="p-6 bg-[#0A0D12]/85 border-l-2 border-[#168CFF] max-w-lg backdrop-blur-md"
          >
            <span className="text-[10px] font-mono-tech text-[#168CFF] uppercase tracking-widest block mb-1">
              CHAPTER 02 / AXIAL ROTATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white uppercase mb-2">
              CONSTRUCTION REVEAL
            </h2>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              As the cable rotates on its longitudinal axis, the precision cutaway exposes the three-core XLPE insulation matrix, concentric galvanized wire armour, and compact stranded copper conductors.
            </p>
          </div>
        )}

        {/* CHAPTER 4: INTERNAL INSPECTION (0.58 -> 0.68) */}
        {inspectOpacity > 0.05 && (
          <div
            style={{
              opacity: inspectOpacity,
              pointerEvents: inspectOpacity > 0.4 ? 'auto' : 'none'
            }}
            className="p-6 bg-[#0A0D12]/90 border border-[#168CFF]/50 max-w-lg backdrop-blur-md shadow-[0_0_30px_rgba(22,140,255,0.2)]"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#168CFF] animate-ping" />
              <span className="text-[10px] font-mono-tech text-[#168CFF] uppercase tracking-widest font-bold">
                CHAPTER 04 / MACRO INSPECTION
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white uppercase mb-2">
              INSIDE THE CABLE
            </h2>
            <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
              Travelling deep into the internal conductor core. 57 electrolytic copper strands compressed to &gt;98% circularity with triple-extruded super-clean XLPE insulation screen.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-tech text-[#CBD5E1]">
              <div className="p-2 bg-[#07090B] border border-[#1E2633]">
                <span className="text-[#6B7280] block">CONDUCTIVITY</span>
                <span className="text-[#FF7A18] font-bold">&gt; 100% IACS</span>
              </div>
              <div className="p-2 bg-[#07090B] border border-[#1E2633]">
                <span className="text-[#6B7280] block">PARTIAL DISCHARGE</span>
                <span className="text-[#168CFF] font-bold">&lt; 2 pC @ 500 kV</span>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 5: REASSEMBLY (0.68 -> 0.78) */}
        {reassembleOpacity > 0.05 && (
          <div
            style={{
              opacity: reassembleOpacity,
              pointerEvents: reassembleOpacity > 0.4 ? 'auto' : 'none'
            }}
            className="p-6 bg-[#0A0D12]/85 border-l-2 border-[#FF7A18] max-w-lg backdrop-blur-md"
          >
            <span className="text-[10px] font-mono-tech text-[#FF7A18] uppercase tracking-widest block mb-1">
              CHAPTER 05 / PRECISION REASSEMBLY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white uppercase mb-2">
              HERMETIC INTEGRITY RESTORED
            </h2>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Copper conductors retract, phase cores align, inner bedding seats, steel wire armour locks into compression, and the outer protective jacket seals the monolithic assembly.
            </p>
          </div>
        )}

        {/* CHAPTER 6: EXTREME ENVIRONMENTS (0.78 -> 0.90) */}
        {envOpacity > 0.05 && (
          <div
            style={{
              opacity: envOpacity,
              pointerEvents: envOpacity > 0.4 ? 'auto' : 'none'
            }}
            className="p-6 sm:p-8 bg-[#0A0D12]/95 border border-[#1E2633] max-w-2xl backdrop-blur-md shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E2633]">
              <div>
                <span className="text-[10px] font-mono-tech text-[#168CFF] uppercase tracking-widest font-bold block">
                  CHAPTER 06 / EXTREME ENVIRONMENT TESTING
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-white uppercase">
                  ONE CABLE. FOUR ENVIRONMENTS.
                </h2>
              </div>
            </div>

            <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6">
              The exact same 3D cable engineered to withstand extreme industrial conditions. Select or scroll to crossfade environments:
            </p>

            {/* 4 Environment Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {CABLE_ENVIRONMENTS.map((env) => {
                const isSelected = activeEnvIndex === env.index;
                return (
                  <button
                    key={env.id}
                    onClick={() => onSelectEnvironment && onSelectEnvironment(env.index)}
                    className={`p-2.5 text-left border font-mono-tech text-[10px] transition-all ${
                      isSelected
                        ? 'border-[#168CFF] bg-[#168CFF]/15 text-white shadow-[0_0_15px_rgba(22,140,255,0.3)]'
                        : 'border-[#1E2633] bg-[#07090B] text-[#9CA3AF] hover:border-[#384860] hover:text-white'
                    }`}
                  >
                    <span className="text-[9px] block text-[#6B7280]">ENV 0{env.index + 1}</span>
                    <span className="font-bold block truncate">{env.title.split('/')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Environment Details */}
            {(() => {
              const activeEnv = CABLE_ENVIRONMENTS[activeEnvIndex || 0] || CABLE_ENVIRONMENTS[0];
              return (
                <div className="p-4 bg-[#07090B] border border-[#1E2633] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-[#168CFF] font-bold">{activeEnv.title}</span>
                    <span className="text-[#FF7A18]">{activeEnv.tag}</span>
                  </div>
                  <p className="text-xs text-[#D1D5DB] font-sans leading-relaxed">
                    {activeEnv.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2 text-[10px] font-mono-tech text-[#9CA3AF]">
                    {activeEnv.metrics.map((m, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#0D1219] border border-[#1A222D]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* CHAPTER 7: PRODUCT PORTFOLIO (0.90 -> 0.96) */}
        {prodOpacity > 0.05 && (
          <div
            style={{
              opacity: prodOpacity,
              pointerEvents: prodOpacity > 0.4 ? 'auto' : 'none'
            }}
            className="p-6 sm:p-8 bg-[#0A0D12]/95 border border-[#1E2633] max-w-2xl backdrop-blur-md shadow-2xl"
          >
            <span className="text-[10px] font-mono-tech text-[#168CFF] uppercase tracking-widest font-bold block mb-1">
              CHAPTER 07 / PRODUCT CATEGORY FOCUS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white uppercase mb-4">
              ENGINEERED CABLE SYSTEMS
            </h2>

            {/* 6 Category Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {PRODUCT_CATEGORIES.map((cat) => {
                const isSelected = activeCategory?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory && onSelectCategory(cat)}
                    className={`p-2.5 text-left border font-mono-tech text-[10px] transition-all ${
                      isSelected
                        ? 'border-[#168CFF] bg-[#168CFF]/15 text-white'
                        : 'border-[#1E2633] bg-[#07090B] text-[#9CA3AF] hover:text-white hover:border-[#384860]'
                    }`}
                  >
                    <span className="font-bold block truncate">{cat.name}</span>
                    <span className="text-[9px] text-[#6B7280] block truncate">{cat.voltage}</span>
                  </button>
                );
              })}
            </div>

            {activeCategory && (
              <div className="p-4 bg-[#07090B] border border-[#1E2633] text-xs font-mono-tech">
                <span className="text-[#168CFF] font-bold block mb-1">{activeCategory.subtitle}</span>
                <p className="text-[#9CA3AF] font-sans text-xs mb-2">{activeCategory.description}</p>
                <span className="text-[#FF7A18] text-[10px]">SPEC: {activeCategory.specs}</span>
              </div>
            )}
          </div>
        )}

        {/* CHAPTER 8: FINAL CTA & MANUFACTURING (0.96 -> 1.00) */}
        {ctaOpacity > 0.05 && (
          <div
            style={{
              opacity: ctaOpacity,
              pointerEvents: ctaOpacity > 0.4 ? 'auto' : 'none'
            }}
            className="p-6 sm:p-10 bg-[#0A0D12]/95 border border-[#1E2633] max-w-xl backdrop-blur-md shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#168CFF]" />
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#168CFF] font-bold">
                CHAPTER 08 / CONCLUSION OF THE ENGINEERING STORY
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black font-display text-white uppercase tracking-tight leading-[0.95] mb-4">
              REQUEST
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#168CFF] to-[#38BDF8]">
                TECHNICAL
              </span>
              <br />
              CONSULTATION
            </h2>

            <p className="text-xs sm:text-sm text-[#9CA3AF] mb-6 leading-relaxed font-sans">
              Connect directly with our senior cable systems engineering team for custom conductor sizing, thermal calculations, and certified manufacturing schedules.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenConsultation}
                className="px-7 py-3.5 bg-[#168CFF] hover:bg-[#0070E0] text-white font-mono-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(22,140,255,0.4)] flex items-center justify-center gap-2"
              >
                <span>REQUEST TECHNICAL CONSULTATION →</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-5 py-3.5 bg-[#0D1219] hover:bg-[#151D28] text-[#D1D5DB] hover:text-white border border-[#2A3644] font-mono-tech text-xs tracking-wider uppercase transition-colors text-center"
              >
                CONTACT ENGINEERING TEAM
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* BOTTOM INTERACTIVE TIMELINE SCRUBBER */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        <div className="w-full bg-[#0A0D12]/90 border border-[#1E2633] p-3.5 backdrop-blur-md flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#9CA3AF] whitespace-nowrap">
              TIMELINE:
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
              step="0.001"
              value={scrollProgress}
              onChange={(e) => onSliderChange && onSliderChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#1E2633] rounded-none appearance-none cursor-pointer accent-[#168CFF] focus:outline-none"
            />
          </div>

          {/* Quick jump actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onScrubState && onScrubState(0)}
              className="px-2.5 py-1 text-[10px] font-mono-tech border border-[#1E2633] hover:border-[#168CFF] text-[#9CA3AF] hover:text-white uppercase transition-colors whitespace-nowrap"
            >
              HERO
            </button>
            <button
              onClick={() => onScrubState && onScrubState(0.48)}
              className="px-2.5 py-1 text-[10px] font-mono-tech border border-[#1E2633] hover:border-[#FF7A18] text-[#9CA3AF] hover:text-[#FF7A18] uppercase transition-colors whitespace-nowrap"
            >
              EXPLODED
            </button>
            <button
              onClick={() => onScrubState && onScrubState(0.84)}
              className="px-2.5 py-1 text-[10px] font-mono-tech border border-[#1E2633] hover:border-[#10B981] text-[#9CA3AF] hover:text-[#10B981] uppercase transition-colors whitespace-nowrap"
            >
              ENVIRONMENTS
            </button>
            <button
              onClick={() => onScrubState && onScrubState(1.0)}
              className="px-2.5 py-1 text-[10px] font-mono-tech border border-[#1E2633] hover:border-[#168CFF] text-[#9CA3AF] hover:text-[#168CFF] uppercase transition-colors whitespace-nowrap"
            >
              CTA
            </button>
          </div>
        </div>

        {/* Scroll Helper */}
        <div className="flex justify-between items-center text-[10px] font-mono-tech text-[#6B7280]">
          <div className="flex items-center gap-3">
            <span className="text-[#9CA3AF]">PRECISION 3D STORY:</span>
            <span>01 HERO</span>
            <span>→</span>
            <span>02 ROTATE</span>
            <span>→</span>
            <span>03 EXPLODE</span>
            <span>→</span>
            <span>04 INSPECT</span>
            <span>→</span>
            <span>05 RECONNECT</span>
            <span>→</span>
            <span>06 ENVIRONMENTS</span>
            <span>→</span>
            <span>07 CTA</span>
          </div>

          <div
            style={{ opacity: heroOpacity }}
            className="flex items-center gap-2 text-[#9CA3AF] tracking-widest uppercase"
          >
            <span>SCROLL TO EXPLORE STORY</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#168CFF] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
