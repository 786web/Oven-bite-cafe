import React from 'react';
import { Flame, Heart, Sparkles, ShieldCheck, Utensils, Award } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/products';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0e0e10] relative overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#F47721]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#E63932]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/images/hero_pizza.jpg"
                alt="Wood fired pizza baking"
                className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.92]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
                <div className="flex items-center gap-2 text-[#F47721] text-xs font-bold uppercase tracking-wider mb-1">
                  <Flame className="w-4 h-4" />
                  <span>Wood-Fired Stone Hearth</span>
                </div>
                <p className="text-xs sm:text-sm text-white/90">
                  Baked at 450°C for that authentic charred leopard-spotted blister crust and molten stretch.
                </p>
              </div>
            </div>

            {/* Overlapping secondary floating card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 p-5 rounded-2xl bg-[#1c1c20] border border-[#F47721]/30 shadow-2xl max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F47721] to-[#E63932] flex items-center justify-center text-white shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm">
                    Bahawalpur's Choice
                  </div>
                  <div className="text-[11px] text-[#FFF4E5]/60">
                    Quality ingredients daily
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47721]/15 border border-[#F47721]/30 text-xs font-bold text-[#F47721] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Behind The Oven</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-6">
              OUR PASSION IS SERVED HOT.
            </h2>

            <p className="text-base sm:text-lg text-[#FFF4E5]/80 leading-relaxed mb-6 font-medium">
              At Oven Bites Cafe & Pizzeria, every bite is made to bring people together. From freshly baked pizzas to crispy burgers and delicious food deals, we believe great food creates unforgettable moments.
            </p>

            <p className="text-sm text-[#FFF4E5]/65 leading-relaxed mb-8">
              Located in the heart of Bahawalpur near UBL and Islamic Bank, we take pride in using only fresh hand-stretched dough fermented for 24 hours, rich vine-ripened tomato marinara, and 100% pure milk mozzarella cheese. Whether you dine in or order hot delivery right to your doorstep, every recipe is crafted with genuine passion.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-[#F47721]/20 text-[#F47721] flex items-center justify-center mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-white text-sm mb-1">
                  100% Mozzarella Blend
                </h4>
                <p className="text-xs text-[#FFF4E5]/60">
                  Never synthetic or analog cheese. Only authentic stretchy dairy cheese.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-[#F47721]/20 text-[#F47721] flex items-center justify-center mb-2">
                  <Utensils className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-white text-sm mb-1">
                  Fresh Handcrafted Dough
                </h4>
                <p className="text-xs text-[#FFF4E5]/60">
                  Kneaded daily in-house with slow fermentation for light, digestible crust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
