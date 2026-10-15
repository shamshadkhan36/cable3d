import React, { useState } from 'react';
import { ArrowRight, Send, CheckCircle2, ShieldAlert, FileText, Phone, Mail, Building } from 'lucide-react';

export function QuoteForm({ preselectedProduct = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: preselectedProduct || 'POWER CABLES',
    voltage: '132 kV – 500 kV EHV',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomTicket = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(randomTicket);
    setSubmitted(true);
  };

  return (
    <section id="quote" className="py-32 px-6 sm:px-12 lg:px-20 bg-[#07090B] border-t border-[#141B24]">
      <div className="max-w-7xl mx-auto">
        {/* Large Cinematic CTA Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[1px] bg-[#168CFF]" />
            <span className="font-mono-tech text-xs tracking-widest uppercase text-[#168CFF]">
              07 / TECHNICAL RFQ DISPATCH
            </span>
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-[#F5F5F5] uppercase leading-[0.9]">
            HAVE A CABLE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#168CFF] to-[#38BDF8]">
              REQUIREMENT?
            </span>
          </h2>
          <div className="mt-4 flex items-center gap-2 text-xl sm:text-2xl font-mono-tech font-bold text-[#FF7A18]">
            <span>REQUEST A QUOTE</span>
            <span>→</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-base sm:text-lg text-[#D1D5DB] leading-relaxed">
              Our applications engineering team reviews project specifications within 24 hours. Submit your design criteria, voltage thresholds, and environmental constraints for custom factory quotation and certified CAD drawings.
            </p>

            <div className="p-6 bg-[#0B0F15] border border-[#1E2633] space-y-4">
              <div className="text-xs font-mono-tech text-[#168CFF] uppercase font-bold">
                ENGINEERING SUPPORT DIRECTORY
              </div>
              <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <Mail className="w-4 h-4 text-[#168CFF]" />
                <span>rfq@nexor-industrial.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <Phone className="w-4 h-4 text-[#168CFF]" />
                <span>+1 (800) 582-2930 / Desk 4</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                <Building className="w-4 h-4 text-[#168CFF]" />
                <span>Heavy Infrastructure Solutions Division</span>
              </div>
            </div>

            <div className="p-4 bg-[#0A0D12] border-l-2 border-[#FF7A18] text-xs font-mono-tech text-[#9CA3AF]">
              All technical submittals are encrypted and covered under standard non-disclosure engineering agreements.
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-[#0B0F15] border border-[#1E2633] p-8 sm:p-12 relative">
            {submitted ? (
              <div className="py-12 text-center space-y-6 animate-in fade-in">
                <div className="w-16 h-16 bg-[#168CFF]/15 border border-[#168CFF] rounded-none flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#168CFF]" />
                </div>

                <div>
                  <span className="text-xs font-mono-tech text-[#168CFF] tracking-widest uppercase block mb-1">
                    SUBMISSION CONFIRMED
                  </span>
                  <h3 className="text-3xl font-black font-display text-white uppercase mb-2">
                    ENQUIRY TRANSMITTED
                  </h3>
                  <p className="text-sm text-[#9CA3AF] max-w-md mx-auto">
                    Your request has been routed to our senior electrical cable design engineers. You will receive an official technical datasheet and preliminary quote within 1 business day.
                  </p>
                </div>

                <div className="p-4 bg-[#07090B] border border-[#1E2633] max-w-sm mx-auto font-mono-tech text-xs text-left">
                  <div className="flex justify-between py-1 border-b border-[#1A222D]">
                    <span className="text-[#6B7280]">REFERENCE TICKET:</span>
                    <span className="text-white font-bold">{ticketId}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1A222D]">
                    <span className="text-[#6B7280]">PRODUCT:</span>
                    <span className="text-[#168CFF]">{formData.product}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#6B7280]">CLIENT:</span>
                    <span className="text-white">{formData.name} ({formData.company})</span>
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#168CFF] hover:bg-[#0070E0] text-white font-mono-tech text-xs tracking-wider uppercase"
                >
                  SUBMIT ANOTHER ENQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-[#9CA3AF] mb-2">
                      NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Arthur Vance"
                      className="w-full bg-[#07090B] border border-[#1E2633] focus:border-[#168CFF] px-4 py-3 text-sm text-white font-sans outline-none transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-[#9CA3AF] mb-2">
                      COMPANY *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Siemens Energy / Grid Dynamics"
                      className="w-full bg-[#07090B] border border-[#1E2633] focus:border-[#168CFF] px-4 py-3 text-sm text-white font-sans outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-[#9CA3AF] mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vance@energy.com"
                      className="w-full bg-[#07090B] border border-[#1E2633] focus:border-[#168CFF] px-4 py-3 text-sm text-white font-sans outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-[#9CA3AF] mb-2">
                      PHONE *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#07090B] border border-[#1E2633] focus:border-[#168CFF] px-4 py-3 text-sm text-white font-sans outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Product Required */}
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-[#9CA3AF] mb-2">
                      PRODUCT REQUIRED *
                    </label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full bg-[#07090B] border border-[#1E2633] focus:border-[#168CFF] px-4 py-3 text-sm text-white font-mono-tech outline-none transition-colors"
                    >
                      <option value="POWER CABLES">POWER CABLES (HV / EHV)</option>
                      <option value="CONTROL CABLES">CONTROL CABLES (ARMOURED)</option>
                      <option value="INSTRUMENTATION CABLES">INSTRUMENTATION CABLES</option>
                      <option value="INDUSTRIAL CABLES">INDUSTRIAL CABLES (SEVERE-DUTY)</option>
                      <option value="SPECIALIZED CABLES">SPECIALIZED CABLES (SUBSEA / NUCLEAR)</option>
                    </select>
                  </div>

                  {/* Voltage Class */}
                  <div>
                    <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-[#9CA3AF] mb-2">
                      ESTIMATED VOLTAGE CLASS
                    </label>
                    <select
                      name="voltage"
                      value={formData.voltage}
                      onChange={handleChange}
                      className="w-full bg-[#07090B] border border-[#1E2633] focus:border-[#168CFF] px-4 py-3 text-sm text-white font-mono-tech outline-none transition-colors"
                    >
                      <option value="0.6 / 1.0 kV Low Voltage">0.6 / 1.0 kV (Low Voltage)</option>
                      <option value="11 kV – 33 kV Medium Voltage">11 kV – 33 kV (Medium Voltage)</option>
                      <option value="66 kV – 132 kV High Voltage">66 kV – 132 kV (High Voltage)</option>
                      <option value="220 kV – 500 kV Extra-High Voltage">220 kV – 500 kV (Extra-High Voltage)</option>
                      <option value="Custom DC Subsea / Umbilical">Custom DC Subsea / Umbilical</option>
                    </select>
                  </div>
                </div>

                {/* Requirement / Message */}
                <div>
                  <label className="block text-[11px] font-mono-tech uppercase tracking-wider text-[#9CA3AF] mb-2">
                    REQUIREMENT / MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specify project route, conductor cross-section (e.g. 3x240 mm² Cu), operating temperature, armouring requirements, and target delivery volume..."
                    className="w-full bg-[#07090B] border border-[#1E2633] focus:border-[#168CFF] px-4 py-3 text-sm text-white font-sans outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#168CFF] hover:bg-[#0070E0] text-white font-mono-tech text-xs tracking-widest uppercase font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(22,140,255,0.35)] hover:shadow-[0_0_35px_rgba(22,140,255,0.5)] flex items-center justify-center gap-3"
                >
                  <span>TRANSMIT RFQ SPECIFICATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
