import React from 'react';
import { ShieldCheck, Activity, Award, CheckCircle, FileCheck2, Cpu } from 'lucide-react';

const TESTS = [
  {
    title: 'PARTIAL DISCHARGE SCREENING',
    standard: 'IEC 60840 / ICEA S-108-720',
    threshold: '< 2.0 pC @ 1.73 U0',
    description: 'Each production reel passes automated 30-minute high-frequency resonance testing to ensure absolute absence of microscopic electrical voids.'
  },
  {
    title: 'LIGHTNING IMPULSE RESISTANCE',
    standard: 'IEC 60230 / IEEE 82',
    threshold: '1200 kV Peak / 1.2/50 μs',
    description: 'Verifies the cable system dielectric insulation integrity against severe atmospheric lightning surges and substation switching transients.'
  },
  {
    title: 'THERMAL AGING & OVERLOAD',
    standard: 'IEC 60811-401',
    threshold: '20,000 hrs @ 135°C',
    description: 'Accelerated thermal endurance in circulating air ovens proving retention of over 95% elongation and tensile strength throughout a 40-year operational life.'
  },
  {
    title: 'FLAME & HALOGEN ACID TEST',
    standard: 'IEC 60332-3-24 / IEC 60754',
    threshold: 'Zero Halogen / pH > 4.3',
    description: 'Tests fire propagation resistance and confirms virtually zero emission of toxic or corrosive acid gases during forced combustion events.'
  }
];

const ACCREDITATIONS = [
  { code: 'BASEC', name: 'British Approvals Service for Cables', country: 'United Kingdom' },
  { code: 'KEMA-KEUR', name: 'DNV KEMA High-Voltage Laboratories', country: 'Netherlands' },
  { code: 'ISO 9001:2015', name: 'Global Quality Management System', country: 'International' },
  { code: 'UL LISTED', name: 'Underwriters Laboratories Heavy Duty', country: 'United States' },
  { code: 'VDE VERIFIED', name: 'Association for Electrical Technologies', country: 'Germany' },
  { code: 'ISO 14001', name: 'Environmental Management Standards', country: 'International' }
];

export function QualityCertification() {
  return (
    <section id="quality" className="py-32 px-6 sm:px-12 lg:px-20 bg-[#07090B] border-t border-[#141B24]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[1px] bg-[#168CFF]" />
              <span className="font-mono-tech text-xs tracking-widest uppercase text-[#168CFF]">
                05 / VERIFICATION & COMPLIANCE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase">
              QUALITY CONTROL &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#9CA3AF]">
                ACCREDITATIONS
              </span>
            </h2>
          </div>
          <p className="text-sm font-mono-tech text-[#9CA3AF] max-w-md">
            Subjecting every conductor cross-section to stringent electrical, thermal, and mechanical destruction thresholds.
          </p>
        </div>

        {/* Quality Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {TESTS.map((test, index) => (
            <div
              key={index}
              className="p-8 bg-[#0B0F15] border border-[#18202C] hover:border-[#168CFF]/50 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-tech text-[#168CFF] font-semibold">
                  {test.standard}
                </span>
                <span className="px-2.5 py-1 bg-[#168CFF]/10 text-[#168CFF] border border-[#168CFF]/30 text-[10px] font-mono-tech">
                  {test.threshold}
                </span>
              </div>
              <h3 className="text-xl font-bold font-display text-white uppercase mb-3">
                {test.title}
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                {test.description}
              </p>
            </div>
          ))}
        </div>

        {/* Accreditation Logos / Badges Grid */}
        <div className="border border-[#1A222D] bg-[#0A0D12] p-8 sm:p-12">
          <div className="text-center mb-8">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#6B7280]">
              INTERNATIONALLY RECOGNIZED ACCREDITATION BODIES
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ACCREDITATIONS.map((acc, i) => (
              <div
                key={i}
                className="p-4 bg-[#07090B] border border-[#18202C] hover:border-[#168CFF] text-center flex flex-col justify-between items-center transition-colors group"
              >
                <Award className="w-6 h-6 text-[#168CFF] group-hover:scale-110 transition-transform mb-2" />
                <span className="text-xs font-mono-tech font-bold text-white block mb-1">
                  {acc.code}
                </span>
                <span className="text-[9px] text-[#6B7280] block">
                  {acc.country}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
