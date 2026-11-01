import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, MessageSquare, Utensils, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/products';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { totalItemCount, setIsCartOpen, setIsCheckoutOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Offers & Deals', href: '#deals' },
    { label: 'Our Story', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#111111]/92 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#home');
              }}
              className="flex items-center gap-2.5 text-left group shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F47721] to-[#E63932] flex items-center justify-center shadow-lg shadow-[#F47721]/30 group-hover:scale-105 transition-transform">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-tight text-white leading-none">
                  OVEN BITES
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#F47721] font-semibold mt-0.5">
                  Cafe & Pizzeria
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-sm font-medium text-[#FFF4E5]/80 hover:text-[#F47721] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F47721] hover:after:w-full after:transition-all whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Actions (Cart & Order Now) */}
            <div className="flex items-center gap-3">
              {/* WhatsApp Quick Link */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent(
                  'Hello Oven Bites Cafe! I would like to check today specials.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-medium text-emerald-400 hover:bg-emerald-900/50 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">WhatsApp</span>
              </a>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105 active:scale-95"
                aria-label={`View cart with ${totalItemCount} items`}
              >
                <ShoppingBag className="w-5 h-5 text-[#FFF4E5]" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#F47721] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md shadow-[#F47721]/50 tabular-nums">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Order Now CTA */}
              <button
                type="button"
                onClick={() => {
                  if (totalItemCount > 0) {
                    setIsCheckoutOpen(true);
                  } else {
                    handleLinkClick('#menu');
                  }
                }}
                className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-[#F47721] to-[#E63932] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#F47721]/30 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                Order Now
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-[#141414] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F47721] flex items-center justify-center">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-display font-bold text-lg text-white">Oven Bites</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-medium text-[#FFF4E5]/90 hover:bg-[#F47721]/15 hover:text-[#F47721] transition-all"
                  >
                    <span>{link.label}</span>
                    <span className="text-white/30 text-xs">→</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#F47721]" />
                <span>Call {RESTAURANT_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#F47721] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#F47721]/30 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({totalItemCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
