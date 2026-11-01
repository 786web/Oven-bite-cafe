import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, ShoppingBag } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/products';
import { useCart } from '../context/CartContext';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const { setIsCartOpen } = useCart();

  const categories = ['All', 'Pizza', 'Burgers', 'Shawarma', 'Fries', 'Deals'];

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-24 bg-[#111111] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47721]/15 border border-[#F47721]/30 text-xs font-bold text-[#F47721] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Feast</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
            FOOD GALLERY
          </h2>

          <p className="text-base sm:text-lg text-[#FFF4E5]/75">
            Straight from our oven into your heart. Feast your eyes on our signature culinary creations.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#F47721] text-white shadow-lg shadow-[#F47721]/30 font-bold'
                  : 'bg-white/5 text-[#FFF4E5]/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveImageIndex(idx)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-black/40 border border-white/10 cursor-pointer shadow-lg hover:shadow-2xl hover:border-[#F47721]/50 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

              {/* Hover overlay content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 rounded-md bg-[#F47721] text-[11px] font-bold text-white uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-bold text-lg text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#FFF4E5]/80">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeImageIndex !== null && filteredItems[activeImageIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) =>
                prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
              );
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) =>
                prev !== null ? (prev + 1) % filteredItems.length : 0
              );
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Image Container */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredItems[activeImageIndex].image}
              alt={filteredItems[activeImageIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10 mb-4"
            />
            <div className="text-center">
              <h3 className="font-display font-bold text-xl text-white mb-1">
                {filteredItems[activeImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#FFF4E5]/70 mb-3">
                {filteredItems[activeImageIndex].caption}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveImageIndex(null);
                  const menuEl = document.getElementById('menu');
                  if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#F47721] hover:bg-[#ff8a3d] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Order On Menu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
