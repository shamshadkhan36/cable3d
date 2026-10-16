import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#06080c] py-10 relative z-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-xs text-white/40 sm:flex-row sm:justify-between sm:items-center sm:px-8">
        <p>© 2026 Shree Vishwakarma Wires &amp; Cables. All rights reserved.</p>
        <p>GIDC Metoda, Rajkot, Gujarat · engineering@vishwakarmacables.example</p>
        <div className="flex items-center gap-6">
          <p>ISO 9001 · ISI Certified · Made in India</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-copper-light hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
