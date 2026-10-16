import React, { useState } from 'react';
import { X, CheckCircle2, Send, Phone, Mail, Clock } from 'lucide-react';

export function ConsultationModal({ isOpen, onClose, initialProduct = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: initialProduct || 'LT Power Cables',
    voltage: '1.1 kV – 33 kV',
    environment: 'High-Temperature Industrial',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = `VK-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090c12] border border-white/15 p-6 sm:p-10 shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-copper/20 border border-copper flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-copper-light" />
            </div>

            <div>
              <p className="eyebrow justify-center mb-2">Inquiry Confirmed</p>
              <h3 className="font-display text-3xl font-bold uppercase text-white">
                Technical Request Transmitted
              </h3>
              <p className="mt-2 text-sm text-white/60 max-w-md mx-auto">
                Your specifications have been routed to our senior cable design engineers in Rajkot, Gujarat. You will receive an engineering datasheet and proposal within 24 hours.
              </p>
            </div>

            <div className="p-4 bg-[#05070a] border border-white/10 rounded-xl max-w-sm mx-auto text-xs text-left font-mono space-y-2">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/40">REFERENCE ID:</span>
                <span className="text-copper-light font-bold">{ticketId}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/40">PRODUCT:</span>
                <span className="text-white">{formData.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">CLIENT:</span>
                <span className="text-white">{formData.name} ({formData.company})</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="btn-primary"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <p className="eyebrow">Engineering Consultation</p>
            <h3 className="mt-3 font-display text-3xl font-extrabold uppercase text-white sm:text-4xl">
              Request Technical Consultation
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Submit your voltage requirements, environment criteria, and project timeline for direct consultation with our application engineers.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full bg-[#05070a] border border-white/10 focus:border-copper px-4 py-3 text-sm text-white rounded-lg outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Tata Power / Adani Energy"
                    className="w-full bg-[#05070a] border border-white/10 focus:border-copper px-4 py-3 text-sm text-white rounded-lg outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sharma@company.com"
                    className="w-full bg-[#05070a] border border-white/10 focus:border-copper px-4 py-3 text-sm text-white rounded-lg outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#05070a] border border-white/10 focus:border-copper px-4 py-3 text-sm text-white rounded-lg outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                    Cable Category
                  </label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-copper px-4 py-3 text-sm text-white rounded-lg outline-none transition-colors"
                  >
                    <option value="LT Power Cables">LT Power Cables (IS 7098)</option>
                    <option value="Control & Instrumentation">Control &amp; Instrumentation (IS 1554)</option>
                    <option value="Heavy Industrial Cables">Heavy Industrial (High-Temp 250°C)</option>
                    <option value="Automation & EV Cables">Automation &amp; EV Cables (Class 5/6)</option>
                    <option value="HT / EHV Power Cables">HT / EHV Power Cables (Up to 33 kV)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                    Operating Voltage / Target Duty
                  </label>
                  <select
                    value={formData.voltage}
                    onChange={(e) => setFormData({ ...formData, voltage: e.target.value })}
                    className="w-full bg-[#05070a] border border-white/10 focus:border-copper px-4 py-3 text-sm text-white rounded-lg outline-none transition-colors"
                  >
                    <option value="1.1 kV LT">1.1 kV (Low Voltage)</option>
                    <option value="3.3 kV – 11 kV Medium Voltage">3.3 kV – 11 kV (Medium Voltage)</option>
                    <option value="22 kV – 33 kV High Voltage">22 kV – 33 kV (High Voltage)</option>
                    <option value="1.5 kV DC Automotive / Solar">1.5 kV DC (Solar / EV Fast Charging)</option>
                    <option value="Custom High-Flex / Robot Chain">Custom High-Flex / Drag Chain</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-1.5">
                  Project Notes &amp; Specifications
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention conductor size (e.g. 3.5C x 300 sq mm), armour requirements, insulation type (XLPE / PVC / Silicone), and quantity..."
                  className="w-full bg-[#05070a] border border-white/10 focus:border-copper px-4 py-3 text-sm text-white rounded-lg outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-primary btn-sweep w-full justify-center py-3.5 text-sm uppercase tracking-wider font-bold"
                >
                  <span>Submit Specification</span>
                  <Send className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
