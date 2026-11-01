import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem, DealItem } from '../types/restaurant';
import { RESTAURANT_INFO } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, selectedSize?: string, notes?: string) => void;
  addDealToCart: (deal: DealItem) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  totalItemCount: number;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  notification: string | null;
  triggerToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'oven_bites_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage unavailable or full
    }
  }, [cart]);

  const triggerToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addToCart = (item: MenuItem, selectedSize?: string, notes?: string) => {
    let price = item.price;
    if (selectedSize && item.sizes) {
      const foundSize = item.sizes.find((s) => s.name === selectedSize);
      if (foundSize) price = foundSize.price;
    }

    const cartId = `${item.id}_${selectedSize || 'standard'}_${notes || ''}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartId === cartId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      } else {
        const newItem: CartItem = {
          cartId,
          id: item.id,
          name: item.name,
          price,
          quantity: 1,
          image: item.image,
          selectedSize: selectedSize || undefined,
          specialInstructions: notes || undefined,
          isDeal: false,
        };
        return [...prev, newItem];
      }
    });

    triggerToast(`Added ${item.name} to cart`);
  };

  const addDealToCart = (deal: DealItem) => {
    const cartId = `deal_${deal.id}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartId === cartId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1,
        };
        return next;
      } else {
        const newDealItem: CartItem = {
          cartId,
          id: deal.id,
          name: deal.name,
          price: deal.price,
          quantity: 1,
          image: deal.image,
          isDeal: true,
          dealIncludes: deal.includes,
        };
        return [...prev, newDealItem];
      }
    });

    triggerToast(`Added ${deal.name} (Rs. ${deal.price}) to cart!`);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Delivery fee logic: standard fee unless subtotal >= freeDeliveryThreshold
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= RESTAURANT_INFO.freeDeliveryThreshold ? 0 : RESTAURANT_INFO.standardDeliveryFee;
  const grandTotal = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addDealToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        totalItemCount,
        subtotal,
        deliveryFee,
        grandTotal,
        notification,
        triggerToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
