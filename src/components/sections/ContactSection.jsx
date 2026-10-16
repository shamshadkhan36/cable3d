import React from 'react';
import { Mail, Phone, Clock, ArrowRight } from 'lucide-react';

export function ContactSection({ onOpenConsultation }) {
  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] items-end pb-16 pt-24 lg:items-center lg:pb-0 lg:pt-0 z-10"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="lg:ml-[52%] lg:pl-6">
          <p className="eyebrow">Start a project</p>
          
          <h2 className="mt-6 font-display text-[clamp(2.6rem,5.6vw,5.8rem)] font-extrabold uppercase leading-[0.9] text-white">
            Engineered<br />
            <span className="text-metal">around your</span><br />
            <span className="text-metal-copper">requirement.</span>
          </h2>

          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/60 sm:text-base">
            Share your voltage, environment and installation conditions. Our application engineers will propose a construction, test plan and lead time within 24 hours.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={onOpenConsultation}
              className="btn-primary btn-sweep"
            >
              <span>Request Technical Consultation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <a
              href="tel:+911800000000"
              className="btn-ghost"
            >
              Discuss Your Requirement
            </a>
          </div>

          {/* Direct Engineering Desk Info */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-white/50 font-sans">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                <Clock className="w-4 h-4 text-copper-light" />
              </div>
              <div>
                <p className="text-white font-medium">Rapid Proposal</p>
                <p>24-hour turnaround on technical RFQs</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                <Mail className="w-4 h-4 text-copper-light" />
              </div>
              <div>
                <p className="text-white font-medium">Direct Engineering Desk</p>
                <p>engineering@vishwakarmacables.example</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
