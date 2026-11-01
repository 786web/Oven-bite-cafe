import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    grandTotal,
    totalItemCount,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141416] border-l border-white/10 flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#F47721] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-display font-bold text-xl text-white">
                Your Order ({totalItemCount})
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#F47721]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#FFF4E5]/60 max-w-xs mb-6">
                  Craving freshly baked pizza or crispy zinger burgers? Add delicious items from our menu.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#F47721] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-[#FFF4E5]/60 pb-2">
                  <span>Review your selected items</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-red-400 hover:text-red-300 underline"
                  >
                    Clear Cart
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3.5 rounded-2xl bg-[#1c1c20] border border-white/10 flex gap-3 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-display font-bold text-sm text-white truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-white/40 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedSize && (
                        <div className="text-[11px] text-[#F47721] font-medium">
                          Size: {item.selectedSize}
                        </div>
                      )}

                      {item.isDeal && item.dealIncludes && (
                        <div className="text-[10px] text-white/50 truncate">
                          Combo: {item.dealIncludes.length} items included
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <div className="font-bold text-sm text-[#F47721]">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-black/40 px-1 py-0.5 rounded-lg border border-white/10">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-white/70 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-1 text-white tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="w-5 h-5 rounded flex items-center justify-center text-white/70 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & Totals */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#161619] space-y-3">
              <div className="space-y-1.5 text-xs text-[#FFF4E5]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">Rs. {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Charges (Bahawalpur)</span>
                  <span className="font-semibold text-white">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-400">FREE</span>
                    ) : (
                      `Rs. ${deliveryFee}`
                    )}
                  </span>
                </div>

                {subtotal < RESTAURANT_INFO.freeDeliveryThreshold && (
                  <div className="text-[10px] text-amber-400/90 bg-amber-400/10 p-1.5 rounded-lg border border-amber-400/20 text-center">
                    Add Rs. {(RESTAURANT_INFO.freeDeliveryThreshold - subtotal).toLocaleString()} more for FREE Delivery!
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="font-display font-black text-xl text-[#F47721]">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#F47721] to-[#E63932] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#F47721]/30 hover:opacity-95 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
