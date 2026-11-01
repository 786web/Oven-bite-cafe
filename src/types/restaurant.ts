export type ProductCategory = 
  | 'All Items'
  | 'Pizza'
  | 'Burgers'
  | 'Shawarma'
  | 'Fries'
  | 'Wings'
  | 'Drinks'
  | 'Combos';

export interface ProductOption {
  name: string;
  priceModifier: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number; // in PKR (sample prices clearly marked and easily editable)
  image: string;
  isPopular?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3; // 0 = mild, 1 = medium, 2 = spicy, 3 = extra hot
  sizes?: { name: string; price: number }[];
  tags?: string[];
}

export interface DealItem {
  id: string;
  name: string;
  price: number; // in PKR
  originalPrice: number; // in PKR
  tagline: string;
  description: string;
  includes: string[];
  image: string;
  popular?: boolean;
}

export interface CartItem {
  cartId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
  specialInstructions?: string;
  isDeal?: boolean;
  dealIncludes?: string[];
}

export interface CustomerOrder {
  customerName: string;
  phone: string;
  address: string;
  landmark?: string;
  specialInstructions?: string;
  paymentPreference: 'Cash on Delivery' | 'Confirm Payment with Restaurant';
}

export interface CustomerReview {
  id: string;
  author: string;
  neighborhood: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
}
