import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Shield, Zap } from 'lucide-react';

export function Navbar({ onQuoteClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about', num: '01' },
    { name: 'PRODUCTS', href: '#products', num: '02' },
    { name: 'ANATOMY', href: '#construction', num: '03' },
    { name: 'INDUSTRIES', href: '#industries', num: '04' },
    { name: 'QUALITY', href: '#quality', num: '05' },
    { name: 'FACILITIES', href: '#manufacturing', num: '06' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090B]/90 backdrop-blur-md border-b border-[#1A222D] py-3.5'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-7 h-7 border-2 border-[#168CFF] group-hover:border-white transition-colors flex items-center justify-center bg-[#07090B]">
            <div className="w-2.5 h-2.5 bg-[#FF7A18] group-hover:bg-[#168CFF] transition-colors" />
          </div>
          <div>
            <span className="font-display font-black text-lg sm:text-xl tracking-wider text-white uppercase block leading-none">
              NEXOR
            </span>
            <span className="font-mono-tech text-[8px] tracking-widest text-[#9CA3AF] uppercase block mt-0.5">
              INDUSTRIAL CABLE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="group flex items-center gap-1.5 text-xs font-mono-tech tracking-wider text-[#9CA3AF] hover:text-white transition-colors"
            >
              <span className="text-[9px] text-[#168CFF] opacity-60 group-hover:opacity-100 transition-opacity">
                {link.num}
              </span>
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onQuoteClick}
            className="px-5 py-2.5 bg-[#0D1219] hover:bg-[#168CFF] text-[#F5F5F5] hover:text-white border border-[#2A3644] hover:border-[#168CFF] font-mono-tech text-xs tracking-wider uppercase font-semibold transition-all duration-300 flex items-center gap-2 group"
          >
            <span>REQUEST QUOTE</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#168CFF] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#9CA3AF] hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07090B] border-b border-[#1A222D] px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="flex items-center justify-between text-sm font-mono-tech py-2 text-[#D1D5DB] border-b border-[#141B24]"
            >
              <span>{link.name}</span>
              <span className="text-xs text-[#168CFF]">{link.num}</span>
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onQuoteClick();
              }}
              className="w-full py-3 bg-[#168CFF] text-white font-mono-tech text-xs uppercase tracking-wider font-semibold"
            >
              REQUEST A QUOTE
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
