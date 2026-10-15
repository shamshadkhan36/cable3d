import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CableScene } from '../canvas/CableScene';
import { TechnicalLabelsOverlay } from '../canvas/TechnicalLabelsOverlay';
import { HeroOverlay } from './HeroOverlay';
import { LayerDetailModal } from '../ui/LayerDetailModal';

gsap.registerPlugin(ScrollTrigger);

export function Hero3DSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [labels, setLabels] = useState([]);
  const [activeLayer, setActiveLayer] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  // Window scroll event listener for 100% reliable progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (isPlaying) return;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const p = Math.max(0, Math.min(1, window.scrollY / totalScrollable));
        setScrollProgress(p);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isPlaying]);

  // GSAP ScrollTrigger synchronization
  useEffect(() => {
    const trigger = containerRef.current;
    if (!trigger) return;

    const st = ScrollTrigger.create({
      trigger: trigger,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        if (!isPlaying) {
          setScrollProgress(self.progress);
        }
      }
    });

    return () => {
      st.kill();
    };
  }, [isPlaying]);

  // Wheel listener: directly scrub scroll position on wheel for effortless control
  useEffect(() => {
    const handleWheel = (e) => {
      if (isPlaying) return;
      // Allow wheel to scrub scroll position smoothly
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const delta = e.deltaY;
      const nextY = Math.max(0, Math.min(totalScrollable, window.scrollY + delta));
      window.scrollTo(0, nextY);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isPlaying]);

  // Auto-play animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayAnimId.current) cancelAnimationFrame(autoPlayAnimId.current);
      return;
    }

    let lastTime = performance.now();

    const loop = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      setScrollProgress((prev) => {
        let next = prev + dt * 0.16 * playDirection.current;
        if (next >= 1) {
          next = 1;
          playDirection.current = -1;
        } else if (next <= 0) {
          next = 0;
          playDirection.current = 1;
        }

        // Keep window scroll in sync during autoplay
        const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollable > 0) {
          window.scrollTo(0, totalScrollable * next);
        }

        return next;
      });

      autoPlayAnimId.current = requestAnimationFrame(loop);
    };

    autoPlayAnimId.current = requestAnimationFrame(loop);

    return () => {
      if (autoPlayAnimId.current) cancelAnimationFrame(autoPlayAnimId.current);
    };
  }, [isPlaying]);

  const handleScrubState = (targetProgress) => {
    setIsPlaying(false);
    setScrollProgress(targetProgress);

    const totalDistance = document.documentElement.scrollHeight - window.innerHeight;
    if (totalDistance > 0) {
      window.scrollTo({
        top: totalDistance * targetProgress,
        behavior: 'smooth'
      });
    }
  };

  const handleSliderChange = (newProgress) => {
    setIsPlaying(false);
    setScrollProgress(newProgress);

    const totalDistance = document.documentElement.scrollHeight - window.innerHeight;
    if (totalDistance > 0) {
      window.scrollTo({
        top: totalDistance * newProgress,
        behavior: 'auto'
      });
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
    if (scrollProgress > 0.5) {
      handleScrubState(0);
    } else {
      handleScrubState(1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[350vh] bg-[#07090B]"
    >
      {/* 
        FIXED VIEWPORT:
        Locks the 3D Canvas permanently to the screen so it NEVER scrolls out of view.
        No matter how much the user scrolls, the 3D cable animation stays 100% visible!
      */}
      <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#07090B] z-0">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        {/* 3D Canvas Scene */}
        <CableScene
          scrollProgress={scrollProgress}
          onUpdateLabels={setLabels}
          activeLayerId={activeLayer?.id}
          onSelectLayer={setActiveLayer}
          isMobile={isMobile}
        />

        {/* Technical Callout Connector Lines & Cards */}
        <TechnicalLabelsOverlay
          labels={labels}
          activeLayerId={activeLayer?.id}
          onSelectLayer={setActiveLayer}
          isVisible={scrollProgress > 0.12}
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
        />

        {/* Layer Specification Inspector Modal */}
        {activeLayer && (
          <LayerDetailModal
            layer={activeLayer}
            onClose={() => setActiveLayer(null)}
          />
        )}
      </div>
    </div>
  );
}
