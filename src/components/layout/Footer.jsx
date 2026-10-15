import React from 'react';
import { ShieldCheck, Award, ArrowUp, Cpu, Globe2, Radio } from 'lucide-react';

export function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050709] border-t border-[#141B24] text-[#9CA3AF] font-sans pt-20 pb-12 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#141B24]">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-[#168CFF] flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#FF7A18]" />
              </div>
              <span className="font-display font-black text-xl tracking-wider text-white">
                NEXOR INDUSTRIAL
              </span>
            </div>
            <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-sm">
              Global manufacturer of precision-engineered high-voltage and severe-duty cable architectures. Delivering critical power transmission infrastructure to over 65 nations with zero-defect tolerance.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[11px] font-mono-tech text-[#6B7280]">
              <span className="flex items-center gap-1.5 text-[#168CFF]">
                <Radio className="w-3 h-3 text-[#168CFF] animate-pulse" />
                SYSTEM ONLINE
              </span>
              <span>•</span>
              <span>BASEC / KEMA CERTIFIED</span>
            </div>
          </div>

          {/* Column: Company */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono-tech text-white uppercase tracking-wider font-semibold">
              COMPANY
            </div>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li><a href="#about" className="hover:text-[#168CFF] transition-colors">About Nexor</a></li>
              <li><a href="#construction" className="hover:text-[#168CFF] transition-colors">Metallurgy & R&D</a></li>
              <li><a href="#manufacturing" className="hover:text-[#168CFF] transition-colors">180m VCV Tower</a></li>
              <li><a href="#quality" className="hover:text-[#168CFF] transition-colors">Testing Labs</a></li>
              <li><a href="#quote" className="hover:text-[#168CFF] transition-colors">Executive Team</a></li>
            </ul>
          </div>

          {/* Column: Products */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono-tech text-white uppercase tracking-wider font-semibold">
              PRODUCTS
            </div>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li><a href="#products" className="hover:text-[#168CFF] transition-colors">Power Cables (EHV)</a></li>
              <li><a href="#products" className="hover:text-[#168CFF] transition-colors">Control Cables</a></li>
              <li><a href="#products" className="hover:text-[#168CFF] transition-colors">Instrumentation</a></li>
              <li><a href="#products" className="hover:text-[#168CFF] transition-colors">Industrial Drag-Chain</a></li>
              <li><a href="#products" className="hover:text-[#168CFF] transition-colors">Specialized Subsea</a></li>
            </ul>
          </div>

          {/* Column: Industries */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono-tech text-white uppercase tracking-wider font-semibold">
              INDUSTRIES
            </div>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li><a href="#industries" className="hover:text-[#168CFF] transition-colors">Energy & Grids</a></li>
              <li><a href="#industries" className="hover:text-[#168CFF] transition-colors">Infrastructure & Rail</a></li>
              <li><a href="#industries" className="hover:text-[#168CFF] transition-colors">Manufacturing</a></li>
              <li><a href="#industries" className="hover:text-[#168CFF] transition-colors">Construction</a></li>
              <li><a href="#industries" className="hover:text-[#168CFF] transition-colors">Oil & Gas</a></li>
              <li><a href="#industries" className="hover:text-[#168CFF] transition-colors">Renewables & Wind</a></li>
            </ul>
          </div>

          {/* Column: Contact & Global */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono-tech text-white uppercase tracking-wider font-semibold">
              CONTACT
            </div>
            <div className="text-xs space-y-2 font-mono-tech text-[#9CA3AF]">
              <div>
                <span className="text-white block font-bold">EUROPE HQ</span>
                <span>Industriepark 42, Frankfurt</span>
              </div>
              <div>
                <span className="text-white block font-bold">AMERICAS</span>
                <span>Energy Corridor, Houston TX</span>
              </div>
              <div className="pt-2">
                <a
                  href="#quote"
                  className="inline-block text-[#168CFF] hover:underline"
                >
                  ENGINEERING INQUIRIES →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-tech text-[#6B7280]">
          <div>
            © 2026 NEXOR INDUSTRIAL TECHNOLOGIES AG. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <a href="#quote" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#quote" className="hover:text-white transition-colors">Terms of Supply</a>
            <a href="#quote" className="hover:text-white transition-colors">IEC Compliance</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#168CFF] hover:text-white transition-colors ml-4"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
