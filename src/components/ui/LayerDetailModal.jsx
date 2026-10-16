import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export function LayerDetailModal({ layer, onClose }) {
  if (!layer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-[#090c12] border border-white/15 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 rounded-2xl">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full border border-copper text-copper-light bg-copper/10">
              LAYER {layer.number || layer.num}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-wider text-white">
              {layer.name || layer.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40 block mb-1">
              MATERIAL COMPOSITION
            </span>
            <p className="text-base font-semibold text-copper-light">
              {layer.material}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40 block mb-1">
              TECHNICAL OVERVIEW
            </span>
            <p className="text-sm text-white/70 leading-relaxed">
              {layer.description || layer.desc}
            </p>
          </div>

          {/* Quick Metrics */}
          {layer.specs && Array.isArray(layer.specs) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#05070a] border border-white/10 rounded-xl">
              {layer.specs.map((spec, i) => {
                if (typeof spec === 'object') {
                  return (
                    <div key={i}>
                      <span className="text-[10px] uppercase text-white/40 block">{spec.label}</span>
                      <span className="text-sm font-display font-bold text-white">{spec.value}</span>
                    </div>
                  );
                }
                return (
                  <div key={i} className="col-span-2 sm:col-span-1">
                    <span className="text-xs text-white/80 font-mono">{spec}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary py-2 px-6 text-sm"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
