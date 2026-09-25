import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAssistant: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAssistant,
  onOpenReservation
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & listen for Escape
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#090a0ce8] backdrop-blur-md border-b border-white/[0.08] shadow-2xl py-3'
            : 'bg-gradient-to-b from-black/85 via-black/30 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#hero"
            className="group flex flex-col items-start transition-opacity hover:opacity-90 shrink-0"
            aria-label="AURELIA Home"
          >
            <span className="text-lg sm:text-2xl font-serif tracking-[0.25em] sm:tracking-[0.3em] text-[#f7f5f0] group-hover:text-[#c9a84e] transition-colors uppercase">
              {RESTAURANT_INFO.name}
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-[#7d7a71] uppercase font-light hidden sm:block">
              Gastronomy & Wine Lounge
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] uppercase tracking-[0.22em] font-medium text-[#a8a59c]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#c9a84e] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c9a84e] hover:after:w-full after:transition-all after:duration-300 focus-visible:outline-none focus-visible:text-[#c9a84e]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sommelier AI Concierge Trigger (Tablet & Desktop) */}
            <button
              onClick={onOpenAssistant}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] font-medium text-[#c9a84e] hover:text-[#f2dfa0] bg-white/[0.03] hover:bg-white/[0.06] border border-[#c9a84e]/30 hover:border-[#c9a84e]/60 rounded-sm transition-all duration-200 min-h-[36px]"
              title="Consult Head Sommelier & Concierge AI"
            >
              <Sparkles className="w-3 h-3 text-[#c9a84e]" />
              <span>Sommelier AI</span>
            </button>

            {/* Tasting Experience Bag */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-[#d1ceca] hover:text-[#c9a84e] transition-colors rounded-sm hover:bg-white/5 min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label={`View tasting flight selection, ${cartCount} items selected`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#c9a84e] text-[#090a0c] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Table Reservation CTA */}
            <button
              onClick={onOpenReservation}
              className="px-3.5 sm:px-5 py-2 text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium text-[#090a0c] bg-[#c9a84e] hover:bg-[#d8b85c] rounded-sm transition-all duration-200 whitespace-nowrap active:scale-95 shadow-sm min-h-[38px] flex items-center justify-center"
            >
              <span className="hidden xs:inline">Reserve </span>Table
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-[#d1ceca] hover:text-[#c9a84e] focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu with Full Touch Target Sizing */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 lg:hidden bg-[#090a0cf8] backdrop-blur-2xl pt-20 px-6 flex flex-col justify-between pb-8 overflow-y-auto animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-1 pt-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold border-b border-white/10 pb-2 mb-2">
              Sanctuary Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif tracking-wider text-[#e6e3dd] hover:text-[#c9a84e] transition-colors py-2.5 min-h-[44px] flex items-center border-b border-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10 mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="w-full min-h-[44px] py-2.5 flex items-center justify-center gap-2 text-xs uppercase tracking-widest bg-white/[0.04] border border-[#c9a84e]/30 text-[#c9a84e] rounded-sm active:scale-98 transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c9a84e]" />
              Ask Sommelier AI Concierge
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full min-h-[44px] py-3 text-xs uppercase tracking-widest font-medium bg-[#c9a84e] text-[#090a0c] rounded-sm active:scale-98 transition-transform"
            >
              Reserve a Table
            </button>
            <p className="text-center text-[11px] text-[#7d7a71] pt-1 font-light">
              {RESTAURANT_INFO.phone} · {RESTAURANT_INFO.address}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
