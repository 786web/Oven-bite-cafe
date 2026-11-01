/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DealsSection } from './components/DealsSection';
import { FoodMenu } from './components/FoodMenu';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { CustomerReviews } from './components/CustomerReviews';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { RESTAURANT_INFO } from './data/products';
import { ShoppingBag, MessageSquare, Phone, CheckCircle } from 'lucide-react';
import { DealItem } from './types/restaurant';

function MainAppContent() {
  const {
    totalItemCount,
    grandTotal,
    setIsCartOpen,
    setIsCheckoutOpen,
    notification,
    addDealToCart,
  } = useCart();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderDirectDeal = (deal: DealItem) => {
    addDealToCart(deal);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#FFF4E5] flex flex-col relative selection:bg-[#F47721] selection:text-white pb-16 sm:pb-0">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1c1c20] border border-[#F47721]/50 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-[#F47721]" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

      {/* Floating Header */}
      <Navbar onNavigate={handleNavigate} />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection
          onExploreMenu={() => handleNavigate('menu')}
          onOrderNow={() => {
            if (totalItemCount > 0) {
              setIsCheckoutOpen(true);
            } else {
              handleNavigate('menu');
            }
          }}
        />

        <DealsSection onOrderDirect={handleOrderDirectDeal} />

        <FoodMenu />

        <AboutSection />

        <GallerySection />

        <CustomerReviews />

        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* WhatsApp Checkout Modal */}
      <CheckoutModal />

      {/* Mobile Sticky Quick Order Dock (Compliant with 15% viewport height cap) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#141416]/95 border-t border-white/10 px-4 py-2.5 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xl">
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex flex-col items-center justify-center p-1.5 text-white/70 hover:text-[#F47721]"
          title="Call Restaurant"
        >
          <Phone className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Call</span>
        </a>

        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappInternational}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1.5 text-emerald-400"
          title="WhatsApp Chat"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex items-center justify-between py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#F47721] to-[#E63932] text-white font-bold text-xs shadow-md shadow-[#F47721]/30"
        >
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4" />
            <span>Cart ({totalItemCount})</span>
          </div>
          {totalItemCount > 0 && (
            <span className="font-mono text-[11px] tabular-nums">
              Rs. {grandTotal}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainAppContent />
    </CartProvider>
  );
}
