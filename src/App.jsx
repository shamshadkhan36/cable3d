import React from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { Hero3DSection } from './components/hero/Hero3DSection';

export default function App() {
  useLenisScroll();

  return (
    <div className="relative min-h-screen bg-[#07090B] text-[#F5F5F5] selection:bg-[#168CFF] selection:text-white">
      {/* Pure 3D Product Animation Showcase */}
      <main className="w-full">
        <Hero3DSection />
      </main>
    </div>
  );
}
