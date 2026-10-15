import React, { useState } from 'react';
import { ArrowUpRight, Zap, Shield, Layers, Gauge, Cpu, Check, X } from 'lucide-react';

const PRODUCTS = [
  {
    id: 'power',
    title: 'POWER CABLES',
    subtitle: 'HIGH & EXTRA-HIGH VOLTAGE (HV/EHV)',
    voltage: '66 kV – 500 kV',
    conductor: 'Compacted Cu / Al up to 2500 mm²',
    insulation: 'Triple-extruded Super-Clean XLPE',
    standard: 'IEC 60840 / IEC 62067 / CIGRE',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    description: 'Engineered for primary grid interconnects, utility-scale power transmission, and heavy industrial substations with zero-discharge tolerance.',
    features: [
      'Triple extruded dry-cured vulcanization',
      'Corrugated aluminum or copper wire screen',
      'Continuous thermal rating up to 90°C (250°C short circuit)',
      'Integrated optical fiber temperature monitoring (DTS)'
    ]
  },
  {
    id: 'control',
    title: 'CONTROL CABLES',
    subtitle: 'ARMOURED MULTI-CONDUCTOR AUTOMATION',
    voltage: '0.6 / 1.0 kV',
    conductor: 'Class 5 Flexible Plain Annealed Copper',
    insulation: 'XLPE / Heavy Duty PVC / LSOH',
    standard: 'BS 5467 / IEC 60502-1',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Designed for control circuits, switchgear monitoring, industrial automation, and robotic machinery requiring high signal integrity.',
    features: [
      'Galvanized steel wire armour (SWA) for mechanical crush defense',
      'Flame retardant low-smoke zero-halogen jacket',
      'Up to 61 uniquely numbered conductors',
      'Superior oil and hydrocarbon splash immunity'
    ]
  },
  {
    id: 'instrumentation',
    title: 'INSTRUMENTATION CABLES',
    subtitle: 'SHIELDED PRECISION SIGNAL TRANSMISSION',
    voltage: '300 / 500 V',
    conductor: 'Class 2 Stranded Tinned Copper',
    insulation: 'PE / XLPE / Cross-Linked Polymer',
    standard: 'EN 50288-7 / BS 5308',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-low capacitance signal conductors engineered for SCADA networks, DCS systems, and hazardous petrochemical instrumentation.',
    features: [
      'Individual and collective aluminum/polyester shielding (100% coverage)',
      'Tinned copper drain wire for rapid static discharge',
      'Crosstalk rejection > 85 dB @ 1 kHz',
      'Approved for ATEX intrinsically safe Zone 0/1/2 circuits'
    ]
  },
  {
    id: 'industrial',
    title: 'INDUSTRIAL CABLES',
    subtitle: 'SEVERE-DUTY REELING & TRAILING',
    voltage: '1.8 / 3.0 kV to 35 kV',
    conductor: 'Fine Stranded Electrolytic Copper (Class 5/6)',
    insulation: 'Ethylene Propylene Rubber (EPR)',
    standard: 'AS/NZS 2802 / VDE 0250',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    description: 'Engineered for drag chains, open-cast mining excavators, automated gantry cranes, and continuous torsional flexing.',
    features: [
      'Heavy-duty chloroprene or polyurethane outer jacket',
      'Torsional tolerance up to ±100° per meter',
      'Tensile reinforcement with aramid center core',
      'Extreme abrasion, ozone, and microbial resistance'
    ]
  },
  {
    id: 'specialized',
    title: 'SPECIALIZED CABLES',
    subtitle: 'SUBSEA DYNAMIC & NUCLEAR GRADE',
    voltage: 'Up to 220 kV AC / 525 kV DC',
    conductor: 'Segmented Milliken Copper Conductor',
    insulation: 'Deep-Water Subsea Barrier / PEEK',
    standard: 'IEEE 383 / CIGRE Subsea Elective',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    description: 'Bespoke dynamic subsea power umbilicals, deep-sea floating wind interconnects, and nuclear containment cables certified for 60-year radiation life.',
    features: [
      'Double layer counter-wound high-tensile steel armouring',
      'Integrated dynamic fiber optics and hydraulic conduits',
      'Hermetically sealed lead alloy moisture barrier',
      'Radiation resistance up to 200 Mrad (2 MGy)'
    ]
  }
];

export function ProductSection({ onSelectProductForQuote }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section id="products" className="py-32 px-6 sm:px-12 lg:px-20 bg-[#07090B] border-t border-[#141B24]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[1px] bg-[#168CFF]" />
              <span className="font-mono-tech text-xs tracking-widest uppercase text-[#168CFF]">
                02 / PRODUCT SYSTEMS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase">
              ENGINEERED CABLE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9CA3AF]">
                PORTFOLIO
              </span>
            </h2>
          </div>
          <p className="text-sm font-mono-tech text-[#9CA3AF] max-w-md">
            Custom conductor metallurgy and proprietary cross-linked compounding tailored for critical utility, heavy marine, and automated industrial plants.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((prod, index) => {
            const isWide = index === 0 || index === 3;
            return (
              <div
                key={prod.id}
                onClick={() => setSelectedProduct(prod)}
                className={`group relative overflow-hidden bg-[#0A0D12] border border-[#18202C] hover:border-[#168CFF] cursor-pointer transition-all duration-500 flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Background image with cinematic dark overlay */}
                <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#0D1219]">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover object-center opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/40 to-transparent" />

                  {/* Corner Voltage Class Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#07090B]/90 border border-[#1E2633] group-hover:border-[#168CFF]/60 text-[10px] font-mono-tech text-[#168CFF] uppercase tracking-wider backdrop-blur-sm transition-colors">
                      {prod.voltage}
                    </span>
                  </div>

                  {/* Top Right Action Arrow */}
                  <div className="absolute top-4 right-4 w-9 h-9 bg-[#07090B]/80 border border-[#1E2633] group-hover:border-[#168CFF] group-hover:bg-[#168CFF] flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono-tech tracking-widest text-[#6B7280] uppercase block mb-1">
                      {prod.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wide uppercase mb-3 group-hover:text-[#168CFF] transition-colors">
                      {prod.title}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] line-clamp-2 mb-6">
                      {prod.description}
                    </p>
                  </div>

                  {/* Technical Meta Footer */}
                  <div className="pt-4 border-t border-[#141B24] flex items-center justify-between text-[11px] font-mono-tech text-[#6B7280]">
                    <span>STD: {prod.standard.split('/')[0]}</span>
                    <span className="text-[#168CFF] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      VIEW SPECIFICATIONS →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Datasheet Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0D1219] border border-[#2A3644] p-6 sm:p-8 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-[#1E2633] mb-6">
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-mono-tech border border-[#168CFF] text-[#168CFF] bg-[#168CFF]/10 uppercase mb-2 inline-block">
                  {selectedProduct.voltage}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white uppercase">
                  {selectedProduct.title}
                </h3>
                <p className="text-xs font-mono-tech text-[#9CA3AF] uppercase">
                  {selectedProduct.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-[#1E2633]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#D1D5DB] leading-relaxed mb-6">
              {selectedProduct.description}
            </p>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#07090B] border border-[#1E2633] mb-6 text-xs font-mono-tech">
              <div>
                <span className="text-[#6B7280] block text-[10px]">CONDUCTOR SIZING</span>
                <span className="text-white font-semibold">{selectedProduct.conductor}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block text-[10px]">DIELECTRIC SYSTEM</span>
                <span className="text-[#168CFF] font-semibold">{selectedProduct.insulation}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[#6B7280] block text-[10px]">COMPLIANCE STANDARDS</span>
                <span className="text-[#FF7A18] font-semibold">{selectedProduct.standard}</span>
              </div>
            </div>

            {/* Key Engineering Features */}
            <div className="space-y-2 mb-8">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#6B7280] block mb-2">
                ENGINEERING ATTRIBUTES
              </span>
              {selectedProduct.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#E5E7EB]">
                  <Check className="w-3.5 h-3.5 text-[#168CFF] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#1E2633]">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2.5 bg-transparent border border-[#2A3644] text-[#9CA3AF] hover:text-white font-mono-tech text-xs tracking-wider uppercase"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  if (onSelectProductForQuote) onSelectProductForQuote(selectedProduct.title);
                  setSelectedProduct(null);
                  const el = document.getElementById('quote');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-2.5 bg-[#168CFF] hover:bg-[#0070E0] text-white font-mono-tech text-xs tracking-wider uppercase font-semibold"
              >
                REQUEST RFQ SPECIFICATION →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
