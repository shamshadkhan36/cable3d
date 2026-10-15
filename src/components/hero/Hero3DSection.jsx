import React, { useRef, useState, useEffect } from 'react';
import { CableScene } from '../canvas/CableScene';
import { TechnicalLabelsOverlay } from '../canvas/TechnicalLabelsOverlay';
import { HeroOverlay } from './HeroOverlay';
import { LayerDetailModal } from '../ui/LayerDetailModal';
import { QuoteForm } from '../sections/QuoteForm';
import { addLenisScrollListener, getLenis, scrollState } from '../../hooks/useLenisScroll';
import { CABLE_ENVIRONMENTS, PRODUCT_CATEGORIES } from '../../config/cableConfig';
import { X } from 'lucide-react';

export function Hero3DSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [labels, setLabels] = useState([]);
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeEnvIndex, setActiveEnvIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(PRODUCT_CATEGORIES[0]);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const playDirection = useRef(1);
  const autoPlayAnimId = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync scrollProgress smoothly via Lenis with optimized render throttling
  useEffect(() => {
    let lastReportedProgress = -1;

    const syncFromWindow = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const p = Math.max(0, Math.min(1, window.scrollY / totalScrollable));
        scrollState.progress = p;
        if (Math.abs(p - lastReportedProgress) > 0.002 || p === 0 || p === 1) {
          lastReportedProgress = p;
          setScrollProgress(p);
        }
      }
    };
    syncFromWindow();

    const unsubscribe = addLenisScrollListener((e) => {
      if (isPlayingRef.current) return;
      if (typeof e.progress === 'number') {
        scrollState.progress = e.progress;
        // Throttle React state re-renders to prevent GC pressure and frame drops
        if (Math.abs(e.progress - lastReportedProgress) > 0.002 || e.progress === 0 || e.progress === 1) {
          lastReportedProgress = e.progress;
          setScrollProgress(e.progress);
        }
      }
    });

    const handleWindowScroll = () => {
      if (isPlayingRef.current) return;
      const lenis = getLenis();
      if (!lenis) {
        syncFromWindow();
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  // Auto-play animation loop
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    const lenis = getLenis();

    if (!isPlaying) {
      if (autoPlayAnimId.current) cancelAnimationFrame(autoPlayAnimId.current);
      if (lenis) lenis.start();
      return;
    }

    if (lenis) lenis.stop();

    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      setScrollProgress((prev) => {
        let next = prev + dt * 0.08 * playDirection.current;
        if (next >= 1) {
          next = 1;
          playDirection.current = -1;
        } else if (next <= 0) {
          next = 0;
          playDirection.current = 1;
        }

        scrollState.progress = next;

        const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollable > 0 && lenis) {
          lenis.scrollTo(totalScrollable * next, { immediate: true });
        }

        return next;
      });

      autoPlayAnimId.current = requestAnimationFrame(loop);
    };

    autoPlayAnimId.current = requestAnimationFrame(loop);

    return () => {
      if (autoPlayAnimId.current) cancelAnimationFrame(autoPlayAnimId.current);
      if (lenis) lenis.start();
    };
  }, [isPlaying]);

  const handleScrubState = (targetProgress) => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    scrollState.progress = targetProgress;
    setScrollProgress(targetProgress);

    const lenis = getLenis();
    const totalDistance = document.documentElement.scrollHeight - window.innerHeight;
    if (lenis && totalDistance > 0) {
      lenis.scrollTo(totalDistance * targetProgress, {
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else if (totalDistance > 0) {
      window.scrollTo({
        top: totalDistance * targetProgress,
        behavior: 'smooth'
      });
    }
  };

  const handleSliderChange = (newProgress) => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    scrollState.progress = newProgress;
    setScrollProgress(newProgress);

    const lenis = getLenis();
    const totalDistance = document.documentElement.scrollHeight - window.innerHeight;
    if (lenis && totalDistance > 0) {
      lenis.scrollTo(totalDistance * newProgress, { immediate: true });
    } else if (totalDistance > 0) {
      window.scrollTo(0, totalDistance * newProgress);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setIsPlaying(false);
    handleScrubState(0);
  };

  const handleExplodeToggle = () => {
    setIsPlaying(false);
    if (scrollProgress >= 0.35 && scrollProgress <= 0.65) {
      handleScrubState(0);
    } else {
      handleScrubState(0.48);
    }
  };

  // Compute active background gradient based on environments
  const effectiveEnvIdx =
    activeEnvIndex !== null
      ? activeEnvIndex
      : scrollProgress >= 0.78 && scrollProgress <= 0.90
      ? Math.min(3, Math.floor(((scrollProgress - 0.78) / 0.12) * 4))
      : 3;
  const currentEnv = CABLE_ENVIRONMENTS[effectiveEnvIdx] || CABLE_ENVIRONMENTS[3];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[650vh] bg-[#07090B]"
    >
      <div
        style={{
          background: currentEnv.backgroundGradient,
          transition: 'background 0.8s ease'
        }}
        className="fixed inset-0 w-full h-full overflow-hidden bg-[#07090B] z-0"
      >
        {/* Subtle engineering grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

        {/* 3D Canvas Scene */}
        <CableScene
          scrollProgress={scrollProgress}
          onUpdateLabels={setLabels}
          activeLayerId={activeLayer?.id}
          onSelectLayer={setActiveLayer}
          activeCategory={activeCategory}
          activeEnvIndex={effectiveEnvIdx}
          isMobile={isMobile}
        />

        {/* Technical Callout Connector Lines & Cards */}
        <TechnicalLabelsOverlay
          labels={labels}
          activeLayerId={activeLayer?.id}
          onSelectLayer={setActiveLayer}
          isVisible={scrollProgress >= 0.25 && scrollProgress <= 0.70}
        />

        {/* Hero Overlay with Animation Controls & Scrubber */}
        <HeroOverlay
          scrollProgress={scrollProgress}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onReset={handleReset}
          onExplodeToggle={handleExplodeToggle}
          onScrubState={handleScrubState}
          onSliderChange={handleSliderChange}
          activeEnvIndex={effectiveEnvIdx}
          onSelectEnvironment={setActiveEnvIndex}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Layer Specification Inspector Modal */}
        {activeLayer && (
          <LayerDetailModal
            layer={activeLayer}
            onClose={() => setActiveLayer(null)}
          />
        )}

        {/* Technical Consultation Modal */}
        {isConsultationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-4xl bg-[#0D1219] border border-[#2A3644] p-6 sm:p-10 shadow-2xl animate-in fade-in duration-200 my-8">
              <button
                onClick={() => setIsConsultationOpen(false)}
                className="absolute top-6 right-6 text-[#9CA3AF] hover:text-white p-2"
              >
                <X className="w-5 h-5" />
              </button>
              <QuoteForm preselectedProduct={activeCategory?.name} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
