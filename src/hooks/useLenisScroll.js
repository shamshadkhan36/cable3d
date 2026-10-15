import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let globalLenis = null;
const scrollListeners = new Set();

// Synchronous global scroll state for 120 FPS WebGL useFrame access with zero React latency
export const scrollState = {
  progress: 0,
  scroll: 0,
  velocity: 0,
};

export function getLenis() {
  return globalLenis;
}

export function getScrollProgress() {
  return scrollState.progress;
}

export function addLenisScrollListener(callback) {
  scrollListeners.add(callback);
  return () => scrollListeners.delete(callback);
}

export function useLenisScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Premium cinematic heavy scroll configuration (smooth, heavy, controlled, physically believable)
    const lenis = new Lenis({
      duration: 1.6, // Longer duration for heavy, majestic industrial deceleration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.88, // Refined wheel sensitivity
      touchMultiplier: 1.2,
      infinite: false,
      autoResize: true,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;
    if (typeof window !== 'undefined') {
      window.lenis = lenis;
    }

    // Update synchronous scroll state immediately on every scroll tick
    lenis.on('scroll', (e) => {
      scrollState.progress = e.progress;
      scrollState.scroll = e.scroll;
      scrollState.velocity = e.velocity;

      scrollListeners.forEach((fn) => {
        try {
          fn(e);
        } catch (err) {
          console.error('Lenis listener error:', err);
        }
      });
    });

    // Native requestAnimationFrame loop with sub-millisecond precision
    let rafId;
    const rafLoop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(rafLoop);
    };
    rafId = requestAnimationFrame(rafLoop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
      if (typeof window !== 'undefined' && window.lenis === lenis) {
        delete window.lenis;
      }
    };
  }, []);

  const scrollTo = (target, options = {}) => {
    if (globalLenis) {
      globalLenis.scrollTo(target, options);
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollTo, lenis: lenisRef.current, getLenis, getScrollProgress };
}
