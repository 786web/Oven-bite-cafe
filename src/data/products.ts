import { MenuItem, DealItem, CustomerReview } from '../types/restaurant';

export const RESTAURANT_INFO = {
  name: 'Oven Bites Cafe & Pizzeria',
  tagline: 'Crafted to Crave. Baked to Perfection.',
  phone: '03067830011',
  phoneDisplay: '0306 7830011',
  whatsappNumber: '03027502824',
  whatsappDisplay: '0302 7502824',
  whatsappInternational: '923027502824',
  location: 'Commercial Area near UBL & Islamic Bank, Bahawalpur, Punjab, Pakistan',
  city: 'Bahawalpur',
  openingHours: '12:00 PM – 02:00 AM Daily',
  standardDeliveryFee: 150, // PKR
  freeDeliveryThreshold: 2500, // PKR
  currency: 'Rs.',
};

export const SPECIAL_DEALS: DealItem[] = [
  {
    id: 'deal-1',
    name: 'Mega Feast Deal 1',
    price: 1499,
    originalPrice: 1950,
    tagline: 'Best Seller for Friends & Family',
    description: 'A complete party combo packed with our signature wood-fired large pizza, zinger burger, shawarma, wings & chilled beverage.',
    includes: [
      '1 Large Pizza (Any Signature Flavor)',
      '1 Crispy Zinger Burger',
      '1 Zinger Shawarma Roll',
      '5 Hot Golden Wings',
      '1 Liter Chilled Soft Drink'
    ],
    image: '/images/deal_mega_feast.jpg',
    popular: true
  },
  {
    id: 'deal-2',
    name: 'Family Cheesy Deal 2',
    price: 1799,
    originalPrice: 2350,
    tagline: 'Double Pizza & Double Burger Delight',
    description: 'Satisfy every craving with two piping-hot personal pizzas, two crispy burgers, double gourmet fries and a chilled liter beverage.',
    includes: [
      '2 Small Pizzas (Your Choice of Flavors)',
      '2 Crispy Zinger Burgers',
      '1 Loaded Melted Cheese Fries',
      '1 Oven Bites Pizza Fries',
      '1 Liter Cold Drink'
    ],
    image: '/images/deal_family_combo.jpg',
    popular: true
  },
  {
    id: 'deal-student',
    name: 'Student Crunch Deal',
    price: 699,
    originalPrice: 920,
    tagline: 'Quick Bite for Hungry Students',
    description: 'Crispy golden fried zinger fillet in toasted brioche bun served with salted regular fries and 345ml soda.',
    includes: [
      '1 Crispy Zinger Burger',
      '1 Regular Crispy Salted Fries',
      '1 Regular Chilled Drink (345ml)'
    ],
    image: '/images/burger_crispy_zinger.jpg',
    popular: false
  },
  {
    id: 'deal-midnight',
    name: 'Midnight Pizza Binge',
    price: 2199,
    originalPrice: 2850,
    tagline: 'Late-Night Craving Buster',
    description: 'One Large pizza plus one Medium pizza paired with loaded cheesy fries and 1.5L drink for the ultimate late night hangout.',
    includes: [
      '1 Large Signature Pizza',
      '1 Medium Signature Pizza',
      '1 Large Loaded Cheese & Chicken Fries',
      '1.5 Liter Chilled Soft Drink'
    ],
    image: '/images/hero_pizza.jpg',
    popular: false
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Pizzas
  {
    id: 'pizza-chicken-tikka',
    name: 'Chicken Tikka Pizza',
    description: 'Tender tandoori-spiced chicken tikka cubes, sliced red onions, green peppers, rich marinara sauce, and 100% pure melted mozzarella.',
    category: 'Pizza',
    price: 1199, // Medium sample base price
    image: '/images/hero_pizza.jpg',
    isPopular: true,
    spicyLevel: 2,
    sizes: [
      { name: 'Small (7")', price: 599 },
      { name: 'Medium (10")', price: 1199 },
      { name: 'Large (13")', price: 1699 }
    ],
    tags: ['Tandoori', 'Best Seller']
  },
  {
    id: 'pizza-chicken-fajita',
    name: 'Chicken Fajita Pizza',
    description: 'Mexican style spiced fajita chicken chunks, caramelized onions, crisp bell peppers, black olives, and overflowing mozzarella cheese.',
    category: 'Pizza',
    price: 1199,
    image: '/images/deal_mega_feast.jpg',
    isPopular: true,
    spicyLevel: 1,
    sizes: [
      { name: 'Small (7")', price: 599 },
      { name: 'Medium (10")', price: 1199 },
      { name: 'Large (13")', price: 1699 }
    ],
    tags: ['Classic']
  },
  {
    id: 'pizza-malai-boti',
    name: 'Malai Boti Pizza',
    description: 'Melt-in-mouth creamy malai boti chicken chunks, mild spices, cream sauce drizzle, fresh mushrooms, and premium mozzarella blend.',
    category: 'Pizza',
    price: 1299,
    image: '/images/hero_pizza.jpg',
    isPopular: false,
    spicyLevel: 0,
    sizes: [
      { name: 'Small (7")', price: 649 },
      { name: 'Medium (10")', price: 1299 },
      { name: 'Large (13")', price: 1799 }
    ],
    tags: ['Mild & Creamy']
  },
  {
    id: 'pizza-cheese-lover',
    name: 'Cheese Lover Pizza',
    description: 'Double layer of artisan mozzarella and rich golden cheddar with Italian herb seasoning on our signature blistered crust.',
    category: 'Pizza',
    price: 1099,
    image: '/images/deal_family_combo.jpg',
    isPopular: false,
    spicyLevel: 0,
    sizes: [
      { name: 'Small (7")', price: 549 },
      { name: 'Medium (10")', price: 1099 },
      { name: 'Large (13")', price: 1599 }
    ],
    tags: ['Cheesy']
  },
  {
    id: 'pizza-oven-bites-special',
    name: 'Oven Bites Special Pizza',
    description: 'Our crown jewel: triple meat (tikka, fajita, smoked chicken sausages), sweet corn, black olives, jalapenos, mushrooms & cheese-stuffed crust.',
    category: 'Pizza',
    price: 1399,
    image: '/images/hero_pizza.jpg',
    isPopular: true,
    spicyLevel: 2,
    sizes: [
      { name: 'Small (7")', price: 699 },
      { name: 'Medium (10")', price: 1399 },
      { name: 'Large (13")', price: 1899 }
    ],
    tags: ["Chef's Signature"]
  },

  // Burgers
  {
    id: 'burger-zinger',
    name: 'Crispy Zinger Burger',
    description: 'Crispy fried boneless chicken thigh fillet with fiery marinade, shredded iceberg lettuce, secret garlic-mayo in toasted brioche bun.',
    category: 'Burgers',
    price: 449,
    image: '/images/burger_crispy_zinger.jpg',
    isPopular: true,
    spicyLevel: 2,
    tags: ['Crispy Favorite']
  },
  {
    id: 'burger-chicken-patty',
    name: 'Classic Chicken Burger',
    description: 'Juicy seasoned grilled chicken patty topped with melted cheddar, fresh tomato, crisp cucumber, and classic burger relish.',
    category: 'Burgers',
    price: 369,
    image: '/images/burger_crispy_zinger.jpg',
    isPopular: false,
    spicyLevel: 0,
    tags: ['Classic']
  },
  {
    id: 'burger-special-zinger',
    name: 'Special Double Zinger Burger',
    description: 'Two gigantic crispy fried chicken fillets stacked with double cheese slices, pickled jalapenos, and smoky barbecue sauce.',
    category: 'Burgers',
    price: 649,
    image: '/images/burger_crispy_zinger.jpg',
    isPopular: true,
    spicyLevel: 2,
    tags: ['Huge Portion']
  },
  {
    id: 'burger-oven-bites-special',
    name: 'Oven Bites Special Burger',
    description: 'Grilled minced chicken steak topped with roasted mushrooms, caramelized onions, melted mozzarella, and signature oven sauce.',
    category: 'Burgers',
    price: 549,
    image: '/images/burger_crispy_zinger.jpg',
    isPopular: false,
    spicyLevel: 1,
    tags: ['Specialty']
  },

  // Shawarma
  {
    id: 'shawarma-chicken',
    name: 'Chicken Shawarma Wrap',
    description: 'Authentic sliced chicken spit-roasted with Mediterranean spices, rolled in fresh Lebanese pita bread with garlic toum sauce and pickles.',
    category: 'Shawarma',
    price: 249,
    image: '/images/shawarma_roll_plate.jpg',
    isPopular: true,
    spicyLevel: 1,
    tags: ['Street Food Classic']
  },
  {
    id: 'shawarma-zinger',
    name: 'Zinger Shawarma Roll',
    description: 'Crunchy golden zinger chicken strips chopped and rolled inside fluffy pita bread with spicy garlic sauce and pickled cabbage.',
    category: 'Shawarma',
    price: 299,
    image: '/images/shawarma_roll_plate.jpg',
    isPopular: true,
    spicyLevel: 2,
    tags: ['Crunchy']
  },
  {
    id: 'shawarma-special-platter',
    name: 'Special Open Shawarma Platter',
    description: 'Generous serving of sliced grilled chicken, hummus, garlic dip, warm pita bread, spicy olives, and crispy french fries.',
    category: 'Shawarma',
    price: 549,
    image: '/images/shawarma_roll_plate.jpg',
    isPopular: false,
    spicyLevel: 1,
    tags: ['Platter']
  },

  // Fries
  {
    id: 'fries-regular',
    name: 'Golden Regular Fries',
    description: 'Crispy skin-on golden french fries tossed in signature sea salt seasoning. Served with tomato ketchup.',
    category: 'Fries',
    price: 199,
    image: '/images/fries_loaded_special.jpg',
    isPopular: false,
    spicyLevel: 0,
    tags: ['Crispy']
  },
  {
    id: 'fries-loaded',
    name: 'Oven Bites Loaded Fries',
    description: 'Piping hot fries smothered in warm cheddar cheese sauce, roasted chicken tikka cubes, diced jalapenos, and chipotle drizzle.',
    category: 'Fries',
    price: 499,
    image: '/images/fries_loaded_special.jpg',
    isPopular: true,
    spicyLevel: 2,
    tags: ['Most Loved']
  },
  {
    id: 'fries-pizza',
    name: 'Cheesy Pizza Fries',
    description: 'Crispy french fries baked in our oven with pizza sauce, oregano, chicken chunks, and blanketed under melted stringy mozzarella.',
    category: 'Fries',
    price: 529,
    image: '/images/fries_loaded_special.jpg',
    isPopular: true,
    spicyLevel: 1,
    tags: ['Baked']
  },

  // Wings & Bites
  {
    id: 'wings-buffalo',
    name: 'Fiery Buffalo Wings (6 Pcs)',
    description: 'Crispy battered chicken wings tossed in tangy hot buffalo sauce, garnished with toasted sesame seeds and fresh spring onions.',
    category: 'Wings',
    price: 499,
    image: '/images/deal_mega_feast.jpg',
    isPopular: true,
    spicyLevel: 3,
    tags: ['Spicy']
  },
  {
    id: 'wings-bbq',
    name: 'Smoky Honey BBQ Wings (6 Pcs)',
    description: 'Glazed crispy wings tossed in slow-cooked smoky sweet barbecue sauce with notes of roasted garlic and honey.',
    category: 'Wings',
    price: 499,
    image: '/images/deal_mega_feast.jpg',
    isPopular: false,
    spicyLevel: 0,
    tags: ['Sweet & Savory']
  },
  {
    id: 'nuggets-crispy',
    name: 'Crispy Chicken Nuggets (8 Pcs)',
    description: 'Golden fried chicken breast nuggets served with creamy garlic dip and sweet chili dip.',
    category: 'Wings',
    price: 399,
    image: '/images/burger_crispy_zinger.jpg',
    isPopular: false,
    spicyLevel: 0,
    tags: ['Kids Favorite']
  },

  // Drinks
  {
    id: 'drink-coke-regular',
    name: 'Coca-Cola (Regular 345ml)',
    description: 'Ice cold refreshing classic Coca-Cola can/bottle.',
    category: 'Drinks',
    price: 90,
    image: '/images/deal_mega_feast.jpg',
    isPopular: false
  },
  {
    id: 'drink-coke-1l',
    name: 'Soft Drink (1 Liter)',
    description: 'Choice of Coca-Cola, Sprite, or Fanta in 1-liter bottle.',
    category: 'Drinks',
    price: 180,
    image: '/images/deal_mega_feast.jpg',
    isPopular: false
  },
  {
    id: 'drink-mint-margarita',
    name: 'Special Mint Lemonade Cooler',
    description: 'Fresh crushed mint leaves, lemon juice, black salt, and sparkling soda served ice cold.',
    category: 'Drinks',
    price: 249,
    image: '/images/deal_mega_feast.jpg',
    isPopular: true
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Hamza Malik',
    neighborhood: 'Model Town, Bahawalpur',
    rating: 5,
    date: '2 days ago',
    comment: 'Hands down the best Chicken Tikka Pizza in Bahawalpur! The crust is authentic wood-fired style with real cheese pull. Delivery took just 25 minutes.',
    favoriteDish: 'Chicken Tikka Pizza'
  },
  {
    id: 'rev-2',
    author: 'Ayesha Tariq',
    neighborhood: 'Near Islamic University, Bahawalpur',
    rating: 5,
    date: 'Last week',
    comment: 'The loaded fries and special zinger burger are unmatched. Super crispy and generous portion. Ordering on WhatsApp was effortless!',
    favoriteDish: 'Loaded Fries'
  },
  {
    id: 'rev-3',
    author: 'Zubair Farooq',
    neighborhood: 'Satellite Town, Bahawalpur',
    rating: 5,
    date: '2 weeks ago',
    comment: 'We ordered Deal 1 for 5 friends. The value is insane! The large pizza was huge, wings were saucy, and the shawarma was top notch.',
    favoriteDish: 'Mega Feast Deal 1'
  },
  {
    id: 'rev-4',
    author: 'Dr. Shahzad Rafique',
    neighborhood: 'Medical Colony, Bahawalpur',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Clean packaging, piping hot food, and very polite customer service. Oven Bites is our family go-to weekend treat.',
    favoriteDish: 'Oven Bites Special Pizza'
  }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Artisan Wood-Fired Tikka Pizza',
    category: 'Pizza',
    image: '/images/hero_pizza.jpg',
    caption: 'Handcrafted dough, 100% mozzarella, blistered crust'
  },
  {
    id: 'gal-2',
    title: 'Crispy Double Zinger Stack',
    category: 'Burgers',
    image: '/images/burger_crispy_zinger.jpg',
    caption: 'Golden spice-crusted boneless fillet in brioche'
  },
  {
    id: 'gal-3',
    title: 'Cheesy Melt Loaded Fries',
    category: 'Fries',
    image: '/images/fries_loaded_special.jpg',
    caption: 'Warm cheddar drizzle, smoked chicken, fresh jalapenos'
  },
  {
    id: 'gal-4',
    title: 'Mega Feast Deal Platter',
    category: 'Deals',
    image: '/images/deal_mega_feast.jpg',
    caption: 'The ultimate party combo with wings, burger and pizza'
  },
  {
    id: 'gal-5',
    title: 'Family Gathering Special',
    category: 'Deals',
    image: '/images/deal_family_combo.jpg',
    caption: 'Double pizzas, double burgers and double gourmet fries'
  },
  {
    id: 'gal-6',
    title: 'Spit-Roasted Chicken Shawarma',
    category: 'Shawarma',
    image: '/images/shawarma_roll_plate.jpg',
    caption: 'Succulent spiced chicken, garlic toum, crispy pickles'
  }
];
