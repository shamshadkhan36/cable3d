import React from 'react';
import { X, CheckCircle2, Shield, Activity, FileText } from 'lucide-react';

export function LayerDetailModal({ layer, onClose }) {
  if (!layer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#0D1219] border border-[#2A3644] p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1E2633] mb-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-mono-tech font-bold border border-[#168CFF] text-[#168CFF] bg-[#168CFF]/10">
              LAYER {layer.number}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-wider text-[#F5F5F5]">
              {layer.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-[#1E2633] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#6B7280] block mb-1">
              MATERIAL COMPOSITION
            </span>
            <p className="text-base font-semibold text-[#168CFF]">
              {layer.material}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#6B7280] block mb-1">
              TECHNICAL OVERVIEW
            </span>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              {layer.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-[#07090B] border border-[#1E2633]">
            {layer.thickness && (
              <div>
                <span className="text-[10px] font-mono-tech text-[#6B7280] block">WALL THICKNESS</span>
                <span className="text-sm font-mono-tech font-bold text-[#F5F5F5]">{layer.thickness}</span>
              </div>
            )}
            {layer.temperature && (
              <div>
                <span className="text-[10px] font-mono-tech text-[#6B7280] block">OPERATING TEMP</span>
                <span className="text-sm font-mono-tech font-bold text-[#FF7A18]">{layer.temperature}</span>
              </div>
            )}
            {layer.coverage && (
              <div>
                <span className="text-[10px] font-mono-tech text-[#6B7280] block">OPTICAL COVERAGE</span>
                <span className="text-sm font-mono-tech font-bold text-[#F5F5F5]">{layer.coverage}</span>
              </div>
            )}
            {layer.tensile && (
              <div>
                <span className="text-[10px] font-mono-tech text-[#6B7280] block">TENSILE RATING</span>
                <span className="text-sm font-mono-tech font-bold text-[#168CFF]">{layer.tensile}</span>
              </div>
            )}
            {layer.ratedVoltage && (
              <div>
                <span className="text-[10px] font-mono-tech text-[#6B7280] block">VOLTAGE CLASS</span>
                <span className="text-sm font-mono-tech font-bold text-[#168CFF]">{layer.ratedVoltage}</span>
              </div>
            )}
            {layer.conductivity && (
              <div>
                <span className="text-[10px] font-mono-tech text-[#6B7280] block">CONDUCTIVITY</span>
                <span className="text-sm font-mono-tech font-bold text-[#FF7A18]">{layer.conductivity}</span>
              </div>
            )}
          </div>

          {/* Key Engineering Specifications */}
          {layer.specs && (
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#6B7280] block mb-3">
                CERTIFIED STANDARDS & TOLERANCES
              </span>
              <div className="space-y-2">
                {layer.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#D1D5DB]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#168CFF] flex-shrink-0" />
                    <span className="font-mono-tech">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#1E2633] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#168CFF] hover:bg-[#0070E0] text-white font-mono-tech text-xs tracking-wider uppercase font-semibold transition-colors"
          >
            DISMISS INSPECTOR
          </button>
        </div>
      </div>
    </div>
  );
}
