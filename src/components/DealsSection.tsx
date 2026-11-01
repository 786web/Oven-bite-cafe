import React from 'react';
import { Plus, Check, Sparkles, ShoppingBag, Flame } from 'lucide-react';
import { SPECIAL_DEALS } from '../data/products';
import { useCart } from '../context/CartContext';
import { DealItem } from '../types/restaurant';

interface DealsSectionProps {
  onOrderDirect: (deal: DealItem) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ onOrderDirect }) => {
  const { addDealToCart, setIsCartOpen, setIsCheckoutOpen } = useCart();

  const handleAddAndCheckout = (deal: DealItem) => {
    addDealToCart(deal);
    setIsCheckoutOpen(true);
  };

  return (
    <section id="deals" className="py-20 bg-[#0d0d0d] relative overflow-hidden border-t border-b border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F47721]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E63932]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47721]/15 border border-[#F47721]/30 text-xs font-bold text-[#F47721] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Time Exclusive Offers</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
            DEALS THAT HIT DIFFERENT
          </h2>

          <p className="text-base sm:text-lg text-[#FFF4E5]/75 max-w-xl mx-auto">
            More Flavor. More Happiness. Better Value. Handcrafted feasts designed for unforgettable group hangouts.
          </p>

          <p className="text-xs text-[#FFF4E5]/40 mt-2">
            *Sample promotional prices during development. Easily updated by store management.
          </p>
        </div>

        {/* Featured Mega Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {SPECIAL_DEALS.slice(0, 2).map((deal, idx) => {
            const savings = deal.originalPrice - deal.price;
            return (
              <div
                key={deal.id}
                className="group relative rounded-3xl bg-gradient-to-b from-[#1c1c1f] to-[#141416] border border-[#F47721]/25 hover:border-[#F47721]/60 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                {/* Top Badge Strip */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-black/40 to-transparent" />

                  {/* Savings pill badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#E63932] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#E63932]/40">
                      Save Rs. {savings}
                    </span>
                    {deal.popular && (
                      <span className="px-3 py-1 rounded-full bg-[#F47721] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#F47721]/40 flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-xs text-white/60 line-through">
                      Rs. {deal.originalPrice.toLocaleString()}
                    </div>
                    <div className="font-display font-black text-3xl sm:text-4xl text-[#F47721] drop-shadow-md">
                      Rs. {deal.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Deal Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#F47721] uppercase tracking-wider mb-1">
                      {deal.tagline}
                    </div>
                    <h3 className="font-display font-bold text-2xl text-white mb-3">
                      {deal.name}
                    </h3>
                    <p className="text-sm text-[#FFF4E5]/70 leading-relaxed mb-6">
                      {deal.description}
                    </p>

                    {/* Deal Contents Checklist */}
                    <div className="space-y-2 mb-8 bg-black/40 p-4 rounded-2xl border border-white/5">
                      <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 text-[#FFF4E5]/80">
                        Deal Includes:
                      </div>
                      {deal.includes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FFF4E5]/90">
                          <div className="w-4 h-4 rounded-full bg-[#F47721]/20 text-[#F47721] flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => addDealToCart(deal)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <Plus className="w-4 h-4 text-[#F47721]" />
                      <span>Add Deal to Cart</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddAndCheckout(deal)}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#F47721] to-[#E63932] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg shadow-[#F47721]/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Order Deal Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Value Combos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SPECIAL_DEALS.slice(2).map((deal) => (
            <div
              key={deal.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#161618] border border-white/10 hover:border-[#F47721]/30 transition-all flex flex-col sm:flex-row items-center gap-5"
            >
              <img
                src={deal.image}
                alt={deal.name}
                className="w-24 h-24 rounded-xl object-cover shrink-0 border border-white/10"
              />
              <div className="flex-1 text-left w-full">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-display font-bold text-lg text-white">{deal.name}</h4>
                  <div className="font-display font-extrabold text-lg text-[#F47721]">
                    Rs. {deal.price}
                  </div>
                </div>
                <p className="text-xs text-[#FFF4E5]/70 line-clamp-2 mb-3">
                  {deal.description}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addDealToCart(deal)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#F47721] text-white text-xs font-semibold hover:bg-[#ff8533] transition-colors"
                  >
                    Add Deal
                  </button>
                  <span className="text-[11px] text-[#FFF4E5]/50">
                    Was Rs. {deal.originalPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
