import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar({ onOpenConsultation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Engineering', href: '#exploded' },
    { name: 'Applications', href: '#environments' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#top' },
    { name: 'Contact', href: '#contact' },
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#06080c]/90 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Brand Logo & Name */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, '#top')}
          className="group flex items-center gap-3"
          aria-label="Shree Vishwakarma Wires & Cables home"
        >
          <svg viewBox="0 0 48 48" className="h-11 w-11 shrink-0" aria-hidden="true">
            <defs>
              <linearGradient id="nav-logo-cu" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffd2a1" />
                <stop offset="55%" stopColor="#e8843a" />
                <stop offset="100%" stopColor="#9c3f0f" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="22.5" fill="none" stroke="url(#nav-logo-cu)" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <circle cx="32.50" cy="24.00" r="3.6" fill="url(#nav-logo-cu)" />
            <circle cx="28.25" cy="31.36" r="3.6" fill="url(#nav-logo-cu)" />
            <circle cx="19.75" cy="31.36" r="3.6" fill="url(#nav-logo-cu)" />
            <circle cx="15.50" cy="24.00" r="3.6" fill="url(#nav-logo-cu)" />
            <circle cx="19.75" cy="16.64" r="3.6" fill="url(#nav-logo-cu)" />
            <circle cx="28.25" cy="16.64" r="3.6" fill="url(#nav-logo-cu)" />
            <circle cx="24" cy="24" r="3.6" fill="#3d8bff" />
          </svg>
          <span className="leading-none">
            <span className="block font-display text-2xl font-extrabold tracking-[0.12em] text-white">
              VISHWAKARMA
            </span>
            <span className="mt-1 block text-[10px] font-medium tracking-[0.42em] text-[#ffb46b]/90">
              WIRES & CABLES · EST. 1968
            </span>
          </span>
        </a>

        {/* Center Desktop Links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-sm font-medium tracking-wide text-white/75 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[#e8843a] after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA / Phone */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="tel:+911800000000"
            className="text-sm font-medium text-white/60 hover:text-white transition-colors"
          >
            1800-000-000
          </a>
          <button
            onClick={onOpenConsultation}
            className="rounded-full bg-gradient-to-r from-[#ff9d4d] to-[#d9631f] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_30px_-6px_rgba(255,140,60,0.7)] transition-all hover:brightness-110 active:scale-95"
          >
            Technical Consultation
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          aria-label="Open menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#06080c]/95 backdrop-blur-xl px-6 py-6 space-y-4 lg:hidden animate-in slide-in-from-top-2 duration-200">
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block py-2 text-base font-medium text-white/80 hover:text-[#ffb46b] border-b border-white/5"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-2 flex flex-col gap-3">
            <a
              href="tel:+911800000000"
              className="text-center text-sm text-white/60 py-2"
            >
              Call: 1800-000-000
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="w-full rounded-full bg-gradient-to-r from-[#ff9d4d] to-[#d9631f] py-3 text-sm font-semibold text-black shadow-lg"
            >
              Technical Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
