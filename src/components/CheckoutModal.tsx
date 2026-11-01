import React, { useState } from 'react';
import { X, Send, MessageSquare, CheckCircle, Shield, AlertCircle, Phone, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/products';
import { CustomerOrder } from '../types/restaurant';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    deliveryFee,
    grandTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  const [orderForm, setOrderForm] = useState<CustomerOrder>({
    customerName: '',
    phone: '',
    address: '',
    landmark: '',
    specialInstructions: '',
    paymentPreference: 'Cash on Delivery',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderSent, setOrderSent] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!orderForm.customerName.trim()) {
      errs.customerName = 'Please enter your full name';
    }
    if (!orderForm.phone.trim()) {
      errs.phone = 'Please enter your active phone number';
    } else if (orderForm.phone.replace(/[^0-9]/g, '').length < 10) {
      errs.phone = 'Please provide a valid phone number (e.g. 03001234567)';
    }
    if (!orderForm.address.trim()) {
      errs.address = 'Please specify your delivery address in Bahawalpur';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructWhatsAppMessage = () => {
    let orderItemsText = '';
    cart.forEach((item, index) => {
      const sizeTag = item.selectedSize ? ` (${item.selectedSize})` : '';
      const comboTag = item.isDeal ? ' [Combo Deal]' : '';
      const linePrice = item.price * item.quantity;
      orderItemsText += `${index + 1}. ${item.name}${sizeTag}${comboTag}\n   Quantity: ${item.quantity}\n   Price: Rs. ${linePrice.toLocaleString()}\n\n`;
    });

    const fullAddress = orderForm.landmark
      ? `${orderForm.address.trim()} (Near: ${orderForm.landmark.trim()}), Bahawalpur`
      : `${orderForm.address.trim()}, Bahawalpur`;

    const instructionsText = orderForm.specialInstructions?.trim()
      ? orderForm.specialInstructions.trim()
      : 'None';

    const message = `Hello Oven Bites Cafe!

I would like to place an order.

Customer Name: ${orderForm.customerName.trim()}
Phone: ${orderForm.phone.trim()}
Address: ${fullAddress}

ORDER DETAILS:
${orderItemsText}Subtotal: Rs. ${subtotal.toLocaleString()}
Delivery: Rs. ${deliveryFee}
Total: Rs. ${grandTotal.toLocaleString()}

Special Instructions:
${instructionsText}

Payment Preference:
${orderForm.paymentPreference}

Please confirm my order.

Thank you!`;

    return message;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (cart.length === 0) {
      setErrors({ cart: 'Your cart is empty. Please add items first.' });
      return;
    }

    const message = constructWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encoded}`;
    setGeneratedUrl(waUrl);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F47721', '#E63932', '#FFF4E5', '#22c55e'],
      });
    } catch {
      // ignore
    }

    setOrderSent(true);

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFinishAndClear = () => {
    clearCart();
    setIsCheckoutOpen(false);
    setOrderSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-[#141416] border border-white/10 p-6 sm:p-8 text-left shadow-2xl transition-all">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!orderSent ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Fast Checkout</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl text-white">
                  Confirm Your Delivery
                </h3>
                <p className="text-xs text-[#FFF4E5]/70 mt-1">
                  Bahawalpur direct kitchen dispatch. Pay via Cash on Delivery.
                </p>
              </div>

              {/* Order Brief Summary */}
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 mb-6 text-xs text-[#FFF4E5]/80 space-y-1">
                <div className="flex justify-between font-medium">
                  <span>Items count:</span>
                  <span className="text-white font-semibold">{cart.length} items</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Grand Total to Pay:</span>
                  <span className="font-display font-black text-sm text-[#F47721]">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleConfirmOrder} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Muhammad Ali"
                    value={orderForm.customerName}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, customerName: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                      errors.customerName
                        ? 'border-red-500'
                        : 'border-white/10 focus:border-[#F47721]'
                    }`}
                  />
                  {errors.customerName && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {errors.customerName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Active Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="0300 1234567"
                    value={orderForm.phone}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, phone: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-red-500'
                        : 'border-white/10 focus:border-[#F47721]'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Bahawalpur Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    placeholder="House/Shop #, Street name, Colony/Area (e.g. Model Town A, Satellite Town, Commercial Area)"
                    value={orderForm.address}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, address: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/5 border text-sm text-white placeholder-white/30 focus:outline-none transition-colors ${
                      errors.address
                        ? 'border-red-500'
                        : 'border-white/10 focus:border-[#F47721]'
                    }`}
                  />
                  {errors.address && (
                    <span className="text-[11px] text-red-400 mt-1 block">
                      {errors.address}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Nearby Famous Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near UBL Bank, One Unit Chowk, City Bakery"
                    value={orderForm.landmark}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, landmark: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F47721]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1">
                    Special Kitchen Instructions
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra spicy, no onions, extra napkins, separate dip"
                    value={orderForm.specialInstructions}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, specialInstructions: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F47721]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#FFF4E5]/80 mb-1.5">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setOrderForm({ ...orderForm, paymentPreference: 'Cash on Delivery' })
                      }
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        orderForm.paymentPreference === 'Cash on Delivery'
                          ? 'border-[#F47721] bg-[#F47721]/15 text-white font-semibold'
                          : 'border-white/10 bg-white/5 text-white/70'
                      }`}
                    >
                      💵 Cash on Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setOrderForm({
                          ...orderForm,
                          paymentPreference: 'Confirm Payment with Restaurant',
                        })
                      }
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        orderForm.paymentPreference === 'Confirm Payment with Restaurant'
                          ? 'border-[#F47721] bg-[#F47721]/15 text-white font-semibold'
                          : 'border-white/10 bg-white/5 text-white/70'
                      }`}
                    >
                      🏦 Confirm in Chat
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirm Order on WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-center text-[#FFF4E5]/50 mt-2">
                    WhatsApp will open with your pre-filled receipt. Click send to finalize!
                  </p>
                </div>
              </form>
            </>
          ) : (
            /* Order Ready State */
            <div className="py-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                Order Receipt Generated!
              </h3>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm mb-6 leading-relaxed">
                <p className="font-semibold mb-1">
                  "Your order details are ready in WhatsApp. Please send the message to complete your order."
                </p>
                <p className="text-[11px] opacity-80">
                  Our kitchen team at Commercial Area Bahawalpur will confirm and dispatch right away.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Re-open WhatsApp Chat</span>
                </a>

                <button
                  type="button"
                  onClick={handleFinishAndClear}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  Done / Start New Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
