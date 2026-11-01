import React, { useState } from 'react';
import { ArrowRight, Flame, Clock, Award, Phone, MessageSquare, MapPin, Sparkles, Star, ChevronRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/products';
import { useCart } from '../context/CartContext';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOrderNow: () => void;
}

const HERO_FEATURED_DISHES = [
  {
    id: 'pizza-tikka',
    title: 'Chicken Tikka Pizza',
    subtitle: 'Wood-Fired Brick Oven',
    price: 'Rs. 1,199',
    tag: 'Best Seller',
    image: '/images/hero_pizza.jpg',
    highlight: 'Molten Mozzarella & Tandoori Chunks',
  },
  {
    id: 'burger-zinger',
    title: 'Crispy Zinger Burger',
    subtitle: 'Golden Spicy Fillet',
    price: 'Rs. 449',
    tag: 'Crispy Favorite',
    image: '/images/burger_crispy_zinger.jpg',
    highlight: 'Toasted Brioche & Secret Garlic Toum',
  },
  {
    id: 'deal-mega',
    title: 'Mega Feast Deal 1',
    subtitle: 'Large Pizza + Burger + Wings',
    price: 'Rs. 1,499',
    tag: 'Save Rs. 450',
    image: '/images/deal_mega_feast.jpg',
    highlight: 'The Ultimate Party Combo in Bahawalpur',
  },
  {
    id: 'fries-loaded',
    title: 'Oven Bites Loaded Fries',
    subtitle: 'Smothered in Melted Cheddar',
    price: 'Rs. 499',
    tag: 'Most Loved',
    image: '/images/fries_loaded_special.jpg',
    highlight: 'Crispy Fries, Tikka Bites & Jalapenos',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu, onOrderNow }) => {
  const [selectedDishIndex, setSelectedDishIndex] = useState(0);
  const currentDish = HERO_FEATURED_DISHES[selectedDishIndex];
  const { totalItemCount } = useCart();

  return (
    <section id="home" className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-[#111111]">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-[#F47721]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 right-0 w-[450px] h-[450px] bg-[#E63932]/12 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Story & Call to Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1c1f] border border-[#F47721]/30 text-xs font-semibold text-[#FFF4E5]/90 mb-5 shadow-lg shadow-black/40">
              <MapPin className="w-3.5 h-3.5 text-[#F47721]" />
              <span className="truncate">Commercial Area near UBL & Islamic Bank, Bahawalpur</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08] mb-6 text-balance">
              CRAFTED TO CRAVE.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F47721] via-[#ff944d] to-[#E63932]">
                BAKED TO PERFECTION.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#FFF4E5]/80 leading-relaxed max-w-xl mb-8">
              From sizzling wood-fired pizzas to crispy golden zinger burgers, authentic shawarma wraps, and loaded cheese fries — discover the irresistible taste of Oven Bites Cafe & Pizzeria.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={onExploreMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#F47721] to-[#E63932] text-white text-sm font-bold uppercase tracking-wider hover:opacity-95 shadow-xl shadow-[#F47721]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>EXPLORE OUR MENU</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOrderNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#222226] hover:bg-[#2c2c31] border border-white/10 text-white text-sm font-bold uppercase tracking-wider hover:border-[#F47721]/40 transition-all"
              >
                <span>ORDER NOW</span>
              </button>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encodeURIComponent(
                  'Hello Oven Bites Cafe! I would like to order.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Trust Markers Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#F47721]/15 text-[#F47721]">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Real</div>
                  <div className="text-[11px] text-[#FFF4E5]/60">Pure Mozzarella</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#F47721]/15 text-[#F47721]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">25-30 Mins</div>
                  <div className="text-[11px] text-[#FFF4E5]/60">Hot Kitchen Dispatch</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-xl bg-[#F47721]/15 text-[#F47721]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">4.9 ★ Rating</div>
                  <div className="text-[11px] text-[#FFF4E5]/60">500+ Bahawalpur Foodies</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Food Showcase Card (Replaces the blocky 3D section) */}
          <div className="lg:col-span-6 w-full">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#1a1a1e] to-[#121214] border border-[#F47721]/30 p-4 sm:p-6 shadow-2xl shadow-black/80 overflow-hidden">
              {/* Outer decorative glow */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#F47721]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Main Food Image Container */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-black/60 border border-white/10 mb-4 group">
                <img
                  src={currentDish.image}
                  alt={currentDish.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#F47721] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-[#F47721]/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {currentDish.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
                    Freshly Baked
                  </span>
                </div>

                {/* Bottom Overlay Text on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-[#F47721] uppercase tracking-wider font-bold block mb-0.5">
                      {currentDish.subtitle}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      {currentDish.title}
                    </h3>
                    <p className="text-xs text-[#FFF4E5]/80 mt-0.5">
                      {currentDish.highlight}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase text-white/60 block">Starting at</span>
                    <span className="font-display font-black text-2xl sm:text-3xl text-[#F47721]">
                      {currentDish.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Dish Selector Tabs */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-[#FFF4E5]/60 uppercase tracking-wider px-1">
                  Popular Bahawalpur Specials · Tap to View
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {HERO_FEATURED_DISHES.map((dish, idx) => {
                    const isSelected = selectedDishIndex === idx;
                    return (
                      <button
                        key={dish.id}
                        type="button"
                        onClick={() => setSelectedDishIndex(idx)}
                        className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[#F47721]/20 border-[#F47721] text-white shadow-md shadow-[#F47721]/20'
                            : 'bg-white/5 border-white/5 text-[#FFF4E5]/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <img
                          src={dish.image}
                          alt={dish.title}
                          className="w-9 h-9 rounded-lg object-cover shrink-0 border border-white/10"
                        />
                        <div className="min-w-0">
                          <div className="text-[11px] font-bold truncate leading-tight">
                            {dish.title.split(' ')[0]} {dish.title.split(' ')[1] || ''}
                          </div>
                          <div className="text-[10px] text-[#F47721] font-semibold">
                            {dish.price}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Action Strip */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[#FFF4E5]/80">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Kitchen Open · Delivering in Bahawalpur</span>
                </div>

                <button
                  type="button"
                  onClick={onExploreMenu}
                  className="inline-flex items-center gap-1 text-[#F47721] hover:text-[#ff9245] font-bold transition-colors"
                >
                  <span>View All Items</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
