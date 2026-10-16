import React, { useState, useEffect } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { CableScene } from './components/canvas/CableScene';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ExplodedSection } from './components/sections/ExplodedSection';
import { EnvironmentsSection } from './components/sections/EnvironmentsSection';
import { ProductsSection } from './components/sections/ProductsSection';
import { ContactSection } from './components/sections/ContactSection';
import { ConsultationModal } from './components/ui/ConsultationModal';
import { LayerDetailModal } from './components/ui/LayerDetailModal';

export default function App() {
  useLenisScroll();

  const [explodedProgress, setExplodedProgress] = useState(0);
  const [activeEnvIndex, setActiveEnvIndex] = useState(3);
  const [envProgress, setEnvProgress] = useState(0);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [activeLayerModal, setActiveLayerModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleEnvChange = (idx, prog) => {
    setActiveEnvIndex(idx);
    setEnvProgress(prog);
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod.title);
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#06080c] text-[#e9edf3] selection:bg-[#e8843a] selection:text-black">
      
      {/* 1. FIXED BACKGROUND 3D CANVAS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CableScene
          explodedProgress={explodedProgress}
          envProgress={envProgress}
          activeEnvIndex={activeEnvIndex}
          isMobile={isMobile}
        />
      </div>

      {/* 2. SUBTLE DARK GRADIENT OVERLAY (Guarantees 100% text legibility on left while cable shines on right) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden bg-[linear-gradient(90deg,rgba(6,8,12,0.85)_0%,rgba(6,8,12,0.38)_32%,transparent_58%)] lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[58svh] bg-gradient-to-t from-[#06080c] via-[#06080c]/80 to-transparent lg:hidden"
        aria-hidden="true"
      />

      {/* 3. FIXED HEADER NAVBAR */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* 4. SCROLLABLE PAGE CONTENT */}
      <div className="relative z-10">
        <main className="flex-1">
          {/* Section 1: Hero (#top) */}
          <HeroSection onOpenConsultation={() => setIsConsultationOpen(true)} />

          {/* Section 2: Cable Anatomy / Exploded View (#exploded) */}
          <ExplodedSection
            onProgressChange={setExplodedProgress}
            onSelectLayerModal={setActiveLayerModal}
          />

          {/* Section 3: Applications / Extreme Environments (#environments) */}
          <EnvironmentsSection onEnvChange={handleEnvChange} />

          {/* Section 4: What we manufacture (#products) */}
          <ProductsSection onSelectProduct={handleSelectProduct} />

          {/* Section 5: Start a project / Contact (#contact) */}
          <ContactSection onOpenConsultation={() => setIsConsultationOpen(true)} />
        </main>

        {/* 5. FOOTER */}
        <Footer />
      </div>

      {/* 6. TECHNICAL CONSULTATION MODAL */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialProduct={selectedProduct}
      />

      {/* 7. LAYER SPECIFICATION INSPECTOR MODAL */}
      {activeLayerModal && (
        <LayerDetailModal
          layer={activeLayerModal}
          onClose={() => setActiveLayerModal(null)}
        />
      )}

    </div>
  );
}
