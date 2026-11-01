import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Flame, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data/products';
import { ProductCategory, MenuItem } from '../types/restaurant';
import { useCart } from '../context/CartContext';

const CATEGORIES: ProductCategory[] = [
  'All Items',
  'Pizza',
  'Burgers',
  'Shawarma',
  'Fries',
  'Wings',
  'Drinks',
];

export const FoodMenu: React.FC = () => {
  const { addToCart, cart, updateQuantity } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Items' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectSize = (itemId: string, sizeName: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: sizeName }));
  };

  const getItemEffectivePrice = (item: MenuItem) => {
    if (item.sizes && item.sizes.length > 0) {
      const chosenSizeName = selectedSizes[item.id] || item.sizes[1]?.name || item.sizes[0].name;
      const sizeObj = item.sizes.find((s) => s.name === chosenSizeName);
      return sizeObj ? sizeObj.price : item.price;
    }
    return item.price;
  };

  const getEffectiveSizeName = (item: MenuItem) => {
    if (item.sizes && item.sizes.length > 0) {
      return selectedSizes[item.id] || item.sizes[1]?.name || item.sizes[0].name;
    }
    return undefined;
  };

  return (
    <section id="menu" className="py-24 bg-[#111111] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F47721]/15 border border-[#F47721]/30 text-xs font-bold text-[#F47721] uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>Fresh From The Brick Oven</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
            OUR MENU
          </h2>

          <p className="text-base sm:text-lg text-[#FFF4E5]/75">
            Made Fresh. Served Hot. Loved Every Time.
          </p>

          <p className="text-xs text-[#FFF4E5]/40 mt-1">
            *Centralized product schema: prices, items, and sizes can be adjusted instantly.
          </p>
        </div>

        {/* Filter Tabs and Live Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#F47721] text-white shadow-lg shadow-[#F47721]/30 font-bold'
                    : 'bg-white/5 text-[#FFF4E5]/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search pizza, burger, wings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs focus:outline-none focus:border-[#F47721] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => {
              const currentPrice = getItemEffectivePrice(item);
              const currentSize = getEffectiveSizeName(item);

              // Check if in cart
              const cartId = `${item.id}_${currentSize || 'standard'}_`;
              const inCartItem = cart.find((c) => c.cartId === cartId);

              return (
                <div
                  key={item.id}
                  className="group rounded-3xl bg-[#17171a] border border-white/10 hover:border-[#F47721]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:shadow-black/60"
                >
                  {/* Image with Tag / Spice indicator */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17171a] via-transparent to-transparent" />

                    {/* Category tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase text-white/90 border border-white/10">
                        {item.category}
                      </span>
                      {item.isPopular && (
                        <span className="px-2.5 py-1 rounded-md bg-[#F47721] text-[11px] font-bold uppercase tracking-wider text-white shadow-md shadow-[#F47721]/40">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Spicy Level Indicator */}
                    {item.spicyLevel !== undefined && item.spicyLevel > 0 && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] text-red-400 border border-red-500/30 flex items-center gap-0.5">
                        <Flame className="w-3 h-3 text-red-500" />
                        <span>{'🌶️'.repeat(item.spicyLevel)}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F47721] transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-[#FFF4E5]/70 leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Size Selector for Pizzas */}
                      {item.sizes && item.sizes.length > 0 && (
                        <div className="mb-5 bg-black/30 p-2 rounded-xl border border-white/5">
                          <div className="text-[11px] font-semibold text-[#FFF4E5]/60 mb-1.5 px-1">
                            Select Size:
                          </div>
                          <div className="grid grid-cols-3 gap-1">
                            {item.sizes.map((size) => {
                              const isSelected = (selectedSizes[item.id] || item.sizes![1].name) === size.name;
                              return (
                                <button
                                  key={size.name}
                                  type="button"
                                  onClick={() => handleSelectSize(item.id, size.name)}
                                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all text-center ${
                                    isSelected
                                      ? 'bg-[#F47721] text-white font-bold shadow-sm'
                                      : 'bg-white/5 text-[#FFF4E5]/70 hover:bg-white/10'
                                  }`}
                                >
                                  <div>{size.name.split(' ')[0]}</div>
                                  <div className="text-[10px] opacity-80">Rs. {size.price}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Price & Add to Cart */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase text-[#FFF4E5]/50 block">Price</span>
                        <div className="font-display font-black text-2xl text-[#F47721]">
                          Rs. {currentPrice.toLocaleString()}
                        </div>
                      </div>

                      {inCartItem ? (
                        <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1 border border-white/10">
                          <button
                            type="button"
                            onClick={() => updateQuantity(inCartItem.cartId, -1)}
                            className="w-8 h-8 rounded-lg bg-black/40 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold px-1 tabular-nums text-white">
                            {inCartItem.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(inCartItem.cartId, 1)}
                            className="w-8 h-8 rounded-lg bg-[#F47721] hover:bg-[#ff8a3d] flex items-center justify-center text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(item, currentSize)}
                          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F47721] to-[#E63932] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-md shadow-[#F47721]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 max-w-lg mx-auto">
            <p className="text-base text-white/70 mb-4">
              No menu items found matching "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Items');
              }}
              className="px-4 py-2 rounded-xl bg-[#F47721] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
