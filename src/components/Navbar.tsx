import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/site';

interface NavbarProps {
  onNavigateToEnquiry?: (prefill?: { eventType?: string }) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition color once scrolled past 50px
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Rate Cards', href: '#rates' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Services', href: '#services' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    setIsMobileMenuOpen(false);
    if (onNavigateToEnquiry) {
      onNavigateToEnquiry();
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#111111]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl text-[#F5F0E7]'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="group flex flex-col text-left shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8B58C]"
            aria-label="Main Character Media Homepage"
          >
            <span
              className={`font-serif text-2xl md:text-3xl font-medium tracking-tight leading-none transition-colors ${
                isScrolled
                  ? 'text-[#F5F0E7] group-hover:text-[#C8B58C]'
                  : 'text-white group-hover:text-[#C8B58C]'
              }`}
            >
              {siteConfig.brandName}
            </span>
            <span
              className={`text-[10px] tracking-[0.22em] uppercase mt-1 font-sans font-medium transition-colors ${
                isScrolled ? 'text-[#C8B58C]' : 'text-white/70'
              }`}
            >
              Cinematic Event Stories
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.16em] font-medium transition-colors ${
              isScrolled ? 'text-neutral-300' : 'text-white/90'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#C8B58C] hover:after:w-full after:transition-all after:duration-200`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={handleCtaClick}
              className={`hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold tracking-[0.16em] uppercase transition-all duration-200 active:scale-98 whitespace-nowrap focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white cursor-pointer ${
                isScrolled
                  ? 'bg-[#F5F0E7] text-[#111111] hover:bg-[#C8B58C] hover:text-[#111111] shadow-md'
                  : 'bg-[#C8B58C] text-[#111111] hover:bg-white hover:text-[#111111] shadow-lg'
              }`}
            >
              <span>Let's Create</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8B58C] ${
                isScrolled ? 'text-[#F5F0E7] hover:text-[#C8B58C]' : 'text-white hover:text-[#C8B58C]'
              }`}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Slide-out Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-[#111111]/80 backdrop-blur-md transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#161616] border-l border-white/10 p-8 flex flex-col justify-between shadow-2xl transition-transform text-[#F5F0E7]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-serif text-xl font-medium tracking-tight text-white">
                  The Main Character Media
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white/70 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-5 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="font-serif text-2xl text-neutral-200 hover:text-[#C8B58C] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <p className="text-xs text-[#C8B58C] tracking-wider uppercase font-mono">
                Founder: Prachi Pamnani
              </p>
              <button
                onClick={handleCtaClick}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C8B58C] text-[#111111] text-xs font-bold tracking-[0.16em] uppercase hover:bg-white transition-colors"
              >
                <span>Let's Create</span>
                <ArrowUpRight className="w-4 h-4 text-[#111111]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
