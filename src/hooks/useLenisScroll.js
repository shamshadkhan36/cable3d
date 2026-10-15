import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let globalLenis = null;
const scrollListeners = new Set();

export function getLenis() {
  return globalLenis;
}

export function addLenisScrollListener(callback) {
  scrollListeners.add(callback);
  return () => scrollListeners.delete(callback);
}

export function useLenisScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      autoResize: true,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;
    if (typeof window !== 'undefined') {
      window.lenis = lenis;
    }

    // Connect Lenis scroll updates to GSAP ScrollTrigger
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      scrollListeners.forEach((fn) => {
        try {
          fn(e);
        } catch (err) {
          console.error('Lenis listener error:', err);
        }
      });
    });

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(rafCallback);
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

  return { scrollTo, lenis: lenisRef.current, getLenis };
}
