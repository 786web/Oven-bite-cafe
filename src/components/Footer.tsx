import React from 'react';
import { Flame, Phone, MessageSquare, MapPin, Clock, ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/products';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0c] text-[#FFF4E5] relative pt-16 pb-12 overflow-hidden">
      {/* Subtle Animated Orange Flame Line above the footer */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F47721] to-transparent flame-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F47721] to-[#E63932] flex items-center justify-center text-white shadow-lg shadow-[#F47721]/30">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-black text-xl text-white tracking-tight">
                  OVEN BITES
                </span>
                <span className="block text-[10px] uppercase tracking-widest text-[#F47721] font-semibold">
                  Cafe & Pizzeria
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FFF4E5]/70 max-w-sm leading-relaxed">
              Serving handcrafted wood-fired pizzas, crunchy golden zinger burgers, stuffed shawarma wraps, and loaded fries across Bahawalpur. Made fresh, served hot, loved every time.
            </p>

            <div className="pt-2 text-xs text-[#FFF4E5]/80 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F47721] shrink-0" />
                <span>Commercial Area near UBL & Islamic Bank, Bahawalpur</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F47721] shrink-0" />
                <span>{RESTAURANT_INFO.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="text-left">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 text-[#F47721]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF4E5]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors"
                >
                  Explore Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('deals')}
                  className="hover:text-white transition-colors"
                >
                  Special Deals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors"
                >
                  Food Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors"
                >
                  Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Menu Categories */}
          <div className="text-left">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 text-[#F47721]">
              Menu Favorites
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF4E5]/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors"
                >
                  Chicken Tikka Pizza
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors"
                >
                  Crispy Zinger Burger
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors"
                >
                  Oven Bites Loaded Fries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors"
                >
                  Zinger Shawarma Roll
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors"
                >
                  Fiery Buffalo Wings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Kitchen Contact */}
          <div className="text-left space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 text-[#F47721]">
              Order Hotline
            </h4>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-2 text-xs text-white/90 hover:text-[#F47721] transition-colors p-2.5 rounded-xl bg-white/5 border border-white/5"
            >
              <Phone className="w-4 h-4 text-[#F47721]" />
              <span className="font-mono font-semibold">{RESTAURANT_INFO.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-emerald-300 hover:text-emerald-200 transition-colors p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="font-mono font-semibold">{RESTAURANT_INFO.whatsappDisplay}</span>
            </a>

            <p className="text-[11px] text-[#FFF4E5]/50 pt-1">
              Delivery available across all major areas of Bahawalpur city.
            </p>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF4E5]/60">
          <p>© 2026 Oven Bites Cafe & Pizzeria. All Rights Reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#F47721]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
