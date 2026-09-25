import { MenuItem, Review, GalleryItem } from '../types/restaurant';

export const RESTAURANT_INFO = {
  name: 'AURELIA',
  fullName: 'AURELIA Modern Gastronomy & Wine Lounge',
  tagline: 'Artisanal Gastronomy, Living Fire & Curated Cellar',
  subtitle: 'Contemporary Gastronomy & Wine Lounge',
  highlights: [
    'Seasonal Tasting Menu',
    'Wood-Fired Hearth Craft',
    'Artisanal Wine Pairings',
    'Private Dining Salons'
  ],
  address: '742 Grand Avenue, Downtown Reserve District',
  phone: '+1 (555) 839-2400',
  email: 'concierge@aureliadining.com',
  reservationsEmail: 'reservations@aureliadining.com',
  hours: {
    dinner: 'Tuesday – Sunday: 5:30 PM – 11:00 PM',
    lunch: 'Wednesday – Sunday: 12:00 PM – 2:30 PM',
    lounge: 'Tuesday – Sunday: 5:00 PM – 1:00 AM',
    closed: 'Monday: Closed for sourcing & cellar inventory'
  },
  valet: 'Complimentary valet service available at the North Porte-Cochère.',
  dressCode: 'Smart Casual to Elegant — collared shirts or evening attire recommended.'
};

export const MENU_ITEMS: MenuItem[] = [
  // --- STARTERS ---
  {
    id: 'starter-1',
    name: 'Hokkaido Diver Scallops',
    category: 'starters',
    description: 'Pan-seared golden scallops, sunchoke silk puree, Ossetra sturgeon caviar, chive blossom emulsion.',
    price: 36,
    badge: 'Signature',
    dietary: ['gluten-free'],
    spicyLevel: 0,
    image: '/images/signature_hokkaido_scallop_1790331428035.jpg',
    pairing: '2021 Chablis Grand Cru "Les Clos"',
    calories: 340,
    ingredients: ['Hokkaido Scallops', 'Sunchoke Puree', 'Ossetra Caviar', 'Chive Oil', 'Fleur de Sel']
  },
  {
    id: 'starter-2',
    name: 'Foie Gras Torchon & Spiced Brioche',
    category: 'starters',
    description: 'Hudson Valley duck liver torchon, black mission fig gastrique, candied hazelnuts, toasted brioche.',
    price: 38,
    badge: 'Chef’s Special',
    dietary: [],
    spicyLevel: 0,
    image: '/images/chef_plating_gastronomy_1790331400391.jpg',
    pairing: '2017 Château d’Yquem Sauternes',
    calories: 480,
    ingredients: ['Hudson Valley Foie Gras', 'Mission Figs', 'Piedmont Hazelnuts', 'House Brioche']
  },
  {
    id: 'starter-3',
    name: 'Wild Morel Tartare & Crispy Sunchoke',
    category: 'starters',
    description: 'Hand-chopped foraged morel mushrooms, shallot marmalade, cured egg yolk shaving, sunchoke chips.',
    price: 28,
    badge: 'Seasonal',
    dietary: ['vegetarian', 'gluten-free'],
    spicyLevel: 0,
    image: '/images/signature_wagyu_tenderloin_1790331414295.jpg',
    pairing: '2020 Meursault Domaine des Comtes Lafon',
    calories: 260,
    ingredients: ['Foraged Morel Mushrooms', 'Shallot Confit', 'Aged Yolk', 'Wild Herb Oil']
  },
  {
    id: 'starter-4',
    name: 'Hamachi Crudo & Citrus Ponzu',
    category: 'starters',
    description: 'Yellowtail kingfish ribbons, finger lime pearls, serrano pepper veil, white soy dashi.',
    price: 32,
    dietary: ['gluten-free', 'dairy-free'],
    spicyLevel: 1,
    image: '/images/signature_hokkaido_scallop_1790331428035.jpg',
    pairing: '2022 Grüner Veltliner Smaragd',
    calories: 220,
    ingredients: ['Hamachi', 'Finger Lime', 'Serrano Chili', 'White Soy', 'Micro Shiso']
  },

  // --- MAIN COURSE ---
  {
    id: 'main-1',
    name: 'Miyazaki A5 Wagyu Tenderloin',
    category: 'mains',
    description: 'Charred over Binchotan coals, Périgord black winter truffle jus, bone marrow potato mousseline, baby leeks.',
    price: 115,
    badge: 'Signature',
    dietary: ['gluten-free'],
    spicyLevel: 0,
    image: '/images/signature_wagyu_tenderloin_1790331414295.jpg',
    pairing: '2015 Château Margaux Premier Grand Cru',
    calories: 680,
    ingredients: ['Miyazaki A5 Wagyu', 'Black Winter Truffle', 'Kennebec Potatoes', 'Bone Marrow Glaze']
  },
  {
    id: 'main-2',
    name: 'Glacier 51 Chilean Sea Bass',
    category: 'mains',
    description: 'Miso-mirin glaze, roasted maitake mushrooms, dashi ginger velouté, compressed sea asparagus.',
    price: 68,
    badge: 'House Favorite',
    dietary: ['gluten-free', 'dairy-free'],
    spicyLevel: 0,
    image: '/images/signature_hokkaido_scallop_1790331428035.jpg',
    pairing: '2019 Corton-Charlemagne Grand Cru',
    calories: 520,
    ingredients: ['Wild Chilean Sea Bass', 'Saikyo Miso', 'Maitake', 'Sea Asparagus', 'Ginger Dashi']
  },
  {
    id: 'main-3',
    name: 'Dry-Aged Rohan Duck Breast',
    category: 'mains',
    description: '14-day dry aged duck breast, spiced blood orange glaze, braised endive, parsnip cloud, juniper reduction.',
    price: 58,
    badge: 'Seasonal',
    dietary: ['gluten-free'],
    spicyLevel: 0,
    image: '/images/chef_plating_gastronomy_1790331400391.jpg',
    pairing: '2018 Domaine Dujac Morey-Saint-Denis',
    calories: 610,
    ingredients: ['Rohan Duck', 'Blood Orange', 'Belgian Endive', 'Parsnip', 'Alpine Juniper']
  },
  {
    id: 'main-4',
    name: 'Roasted Romanesco & Black Garlic Polenta',
    category: 'mains',
    description: 'Slow-roasted romanesco crowns, creamy heirloom flint corn polenta, black garlic cream, pine nut dukkah.',
    price: 42,
    badge: 'Chef’s Special',
    dietary: ['vegetarian', 'gluten-free'],
    spicyLevel: 0,
    image: '/images/hero_fine_dining_interior_1790331386244.jpg',
    pairing: '2020 Barolo Vietti Castiglione',
    calories: 450,
    ingredients: ['Romanesco', 'Heirloom Corn Polenta', 'Aged Parmesan', 'Black Garlic', 'Toasted Pine Nuts']
  },

  // --- BURGERS ---
  {
    id: 'burger-1',
    name: 'The Aurelia Gold Wagyu Burger',
    category: 'burgers',
    description: '8oz Wagyu & dry-aged ribeye blend, 24-month Gruyère, shaved black truffle, caramelized onion jam, gilded brioche bun.',
    price: 42,
    badge: 'Signature',
    dietary: [],
    spicyLevel: 0,
    image: '/images/signature_wagyu_tenderloin_1790331414295.jpg',
    pairing: '2019 Napa Valley Cabernet Sauvignon',
    calories: 820,
    ingredients: ['A5 Wagyu Blend', 'Gruyère Reserve', 'Black Truffles', 'Shallot Marmalade', 'Artisanal Brioche']
  },
  {
    id: 'burger-2',
    name: 'Smoked Bone Marrow Smash Burger',
    category: 'burgers',
    description: 'Twin 4oz aged chuck patties, smoked bone marrow butter, sharp white cheddar, house cornichon relish, milk bread.',
    price: 34,
    badge: 'House Favorite',
    dietary: [],
    spicyLevel: 1,
    image: '/images/hero_fine_dining_interior_1790331386244.jpg',
    pairing: 'Draft Belgian Tripel or Syrah',
    calories: 780,
    ingredients: ['Dry Aged Chuck', 'Smoked Bone Marrow', 'Vermont White Cheddar', 'Dijon Aioli']
  },
  {
    id: 'burger-3',
    name: 'Herb-Crusted Portobello & Burrata Burger',
    category: 'burgers',
    description: 'Wood-roasted balsamic portobello cap, molten buffalo burrata, baby arugula, sun-dried tomato tapenade, rosemary focaccia.',
    price: 29,
    dietary: ['vegetarian'],
    spicyLevel: 0,
    image: '/images/chef_plating_gastronomy_1790331400391.jpg',
    pairing: '2021 Chianti Classico Riserva',
    calories: 590,
    ingredients: ['Portobello', 'Buffalo Burrata', 'Arugula', 'Sun-Dried Tomatoes', 'Rosemary Focaccia']
  },

  // --- PIZZA ---
  {
    id: 'pizza-1',
    name: 'Tartufo & Stracciatella Wood-Fired Pizza',
    category: 'pizza',
    description: '72-hour cold fermented sourdough, fresh black summer truffle slices, Pugliese stracciatella, fior di latte, aged balsamic drizzle.',
    price: 38,
    badge: 'Signature',
    dietary: ['vegetarian'],
    spicyLevel: 0,
    image: '/images/signature_wagyu_tenderloin_1790331414295.jpg',
    pairing: '2020 Brunello di Montalcino',
    calories: 710,
    ingredients: ['Fermented Sourdough', 'Summer Truffle', 'Stracciatella', 'Fior di Latte', 'Thyme']
  },
  {
    id: 'pizza-2',
    name: 'San Daniele Prosciutto & Wild Fig',
    category: 'pizza',
    description: 'San Marzano DOP sauce, 24-month Prosciutto di San Daniele, caramelized figs, Gorgonzola Dolce, wild blossom honey.',
    price: 36,
    badge: 'House Favorite',
    dietary: [],
    spicyLevel: 0,
    image: '/images/hero_fine_dining_interior_1790331386244.jpg',
    pairing: '2021 Barbera d’Alba Superiore',
    calories: 680,
    ingredients: ['San Daniele Prosciutto', 'Caramelized Figs', 'Gorgonzola Dolce', 'Organic Honey', 'San Marzano']
  },
  {
    id: 'pizza-3',
    name: 'Spicy Nduja Calabrese & Smoked Scamorza',
    category: 'pizza',
    description: 'Spreadable artisanal pork nduja, roasted red peppers, smoked scamorza, hot Calabrian chili honey, fresh basil.',
    price: 34,
    dietary: [],
    spicyLevel: 3,
    image: '/images/cocktail_artisanal_reserve_1790331442167.jpg',
    pairing: '2020 Etna Rosso Terre Nere',
    calories: 740,
    ingredients: ['Spicy Nduja', 'Smoked Scamorza', 'Calabrian Chili Honey', 'Sweet Bell Peppers', 'Basil']
  },
  {
    id: 'pizza-4',
    name: 'Heirloom Tomato & Buffalo Mozzarella',
    category: 'pizza',
    description: 'Charred yellow and ruby heirloom tomatoes, Campanian buffalo mozzarella, oregano flowers, cold-pressed olive oil.',
    price: 30,
    dietary: ['vegetarian'],
    spicyLevel: 0,
    image: '/images/chef_plating_gastronomy_1790331400391.jpg',
    pairing: '2022 Greco di Tufo',
    calories: 620,
    ingredients: ['Heirloom Tomatoes', 'Buffalo Mozzarella', 'Wild Oregano', 'Tuscan Olive Oil']
  },

  // --- PASTA ---
  {
    id: 'pasta-1',
    name: 'Hand-Cut Tagliolini al Tartufo Bianco',
    category: 'pasta',
    description: '36-yolk fresh pasta, churned Normandy butter, 30-month Parmigiano-Reggiano, shaved Alba white truffle.',
    price: 64,
    badge: 'Signature',
    dietary: ['vegetarian'],
    spicyLevel: 0,
    image: '/images/signature_wagyu_tenderloin_1790331414295.jpg',
    pairing: '2016 Barolo Monfortino Riserva',
    calories: 590,
    ingredients: ['36-Yolk Tagliolini', 'Normandy Butter', 'Parmigiano-Reggiano', 'Alba Truffle']
  },
  {
    id: 'pasta-2',
    name: 'Maine Lobster Agnolotti',
    category: 'pasta',
    description: 'Sweet lobster and mascarpone filled parcels, saffron bisque reduction, tarragon oil, sea urchin emulsion.',
    price: 52,
    badge: 'Chef’s Special',
    dietary: [],
    spicyLevel: 0,
    image: '/images/signature_hokkaido_scallop_1790331428035.jpg',
    pairing: '2020 Puligny-Montrachet Premier Cru',
    calories: 540,
    ingredients: ['Maine Lobster', 'Handmade Agnolotti', 'Saffron Bisque', 'Hokkaido Uni', 'Tarragon']
  },
  {
    id: 'pasta-3',
    name: 'Wild Chanterelle & Morel Pappardelle',
    category: 'pasta',
    description: 'Wide ribbons tossed with pan-roasted chanterelles, porcini reduction, aged Pecorino Romano, crushed toasted hazelnuts.',
    price: 38,
    badge: 'Seasonal',
    dietary: ['vegetarian'],
    spicyLevel: 0,
    image: '/images/chef_plating_gastronomy_1790331400391.jpg',
    pairing: '2019 Pinot Noir Russian River Valley',
    calories: 510,
    ingredients: ['Egg Pappardelle', 'Chanterelles', 'Porcini Glaze', 'Pecorino Romano', 'Hazelnuts']
  },
  {
    id: 'pasta-4',
    name: 'Spicy Crab Linguine Nero',
    category: 'pasta',
    description: 'Squid ink linguine, Dungeness crab meat, Calabrian chili paste, garlic confit, lemon breadcrumb crunch.',
    price: 44,
    dietary: ['dairy-free'],
    spicyLevel: 2,
    image: '/images/cocktail_artisanal_reserve_1790331442167.jpg',
    pairing: '2021 Vermentino di Sardegna',
    calories: 490,
    ingredients: ['Squid Ink Linguine', 'Dungeness Crab', 'Calabrian Chili', 'Garlic Confit', 'Lemon Crumbs']
  },

  // --- DESSERTS ---
  {
    id: 'dessert-1',
    name: 'Valrhona Grand Cru Chocolate Sphere',
    category: 'desserts',
    description: '70% Guanaja chocolate sphere, warm salted caramel pour-over, hazelnut praline crunch, smoked Tahitian vanilla bean gelato.',
    price: 24,
    badge: 'Signature',
    dietary: ['vegetarian'],
    spicyLevel: 0,
    image: '/images/signature_wagyu_tenderloin_1790331414295.jpg',
    pairing: '20-Year Tawny Port Ramos Pinto',
    calories: 460,
    ingredients: ['Valrhona 70%', 'Fleur de Sel Caramel', 'Piedmont Praline', 'Tahitian Vanilla Gelato']
  },
  {
    id: 'dessert-2',
    name: 'Miyazaki Yuzu & Gold Leaf Tart',
    category: 'desserts',
    description: 'Crisp sable crust, whipped yuzu curd, torched Italian meringue, candied Buddha’s hand citrus, edible 24k gold leaf.',
    price: 22,
    badge: 'Chef’s Special',
    dietary: ['vegetarian'],
    spicyLevel: 0,
    image: '/images/signature_hokkaido_scallop_1790331428035.jpg',
    pairing: '2019 Tokaji Aszú 5 Puttonyos',
    calories: 380,
    ingredients: ['Japanese Yuzu', 'Sable Breton', 'Italian Meringue', '24k Gold Leaf', 'Citrus Blossom']
  },
  {
    id: 'dessert-3',
    name: 'Madagascar Bourbon Vanilla Mille-Feuille',
    category: 'desserts',
    description: 'Caramelized inverted puff pastry sheets, light bourbon vanilla diplomat cream, tart raspberry coulis.',
    price: 20,
    dietary: ['vegetarian'],
    spicyLevel: 0,
    image: '/images/chef_plating_gastronomy_1790331400391.jpg',
    pairing: 'Champagne Laurent-Perrier Cuvée Rosé',
    calories: 410,
    ingredients: ['Caramelized Feuilletage', 'Madagascar Vanilla Pods', 'Diplomat Cream', 'Wild Raspberries']
  },

  // --- DRINKS ---
  {
    id: 'drink-1',
    name: 'The Aurelia Smoked Old Fashioned',
    category: 'drinks',
    description: 'WhistlePig 12-Year Rye, charred applewood smoke, aromatic umami bitters, raw demerara syrup, hand-carved crystal ice sphere.',
    price: 28,
    badge: 'Signature',
    dietary: ['vegan', 'gluten-free', 'dairy-free'],
    spicyLevel: 0,
    image: '/images/cocktail_artisanal_reserve_1790331442167.jpg',
    calories: 190,
    ingredients: ['WhistlePig 12yr Rye', 'Applewood Smoke', 'Aromatic Bitters', 'Demerara', 'Orange Oils']
  },
  {
    id: 'drink-2',
    name: 'Golden Saffron & Botanical Negroni',
    category: 'drinks',
    description: 'Monkey 47 Gin, saffron-infused Carpano Antica vermouth, artisanal Campari, golden mist spray, dehydrated blood orange.',
    price: 26,
    badge: 'Chef’s Special',
    dietary: ['vegan', 'gluten-free', 'dairy-free'],
    spicyLevel: 0,
    image: '/images/cocktail_artisanal_reserve_1790331442167.jpg',
    calories: 210,
    ingredients: ['Monkey 47 Gin', 'Carpano Antica', 'Saffron Tincture', 'Campari Bitter', 'Orange Essence']
  },
  {
    id: 'drink-3',
    name: 'Sparkling Hibiscus & Wild Rose Elixir (Zero-Proof)',
    category: 'drinks',
    description: 'Clarified hibiscus cold-infusion, distilled Damascus rose botanicals, sparkling yuzu water, pink peppercorn rim.',
    price: 18,
    badge: 'Seasonal',
    dietary: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
    spicyLevel: 1,
    image: '/images/hero_fine_dining_interior_1790331386244.jpg',
    calories: 85,
    ingredients: ['Hibiscus Tea', 'Wild Rose Hydrosol', 'Yuzu Carbonation', 'Pink Peppercorn']
  },
  {
    id: 'drink-4',
    name: '2018 Domaine Romanée Grand Cru (Glass)',
    category: 'drinks',
    description: 'Preserved via Coravin system. Elegant notes of crushed violets, wild forest cherry, damp earth, and velvety tannins.',
    price: 95,
    dietary: ['vegan', 'gluten-free'],
    spicyLevel: 0,
    image: '/images/cocktail_artisanal_reserve_1790331442167.jpg',
    calories: 150,
    ingredients: ['100% Pinot Noir', 'Old Vine Burgundy', 'French Oak Barrique']
  }
];

export const SIGNATURE_DISHES = MENU_ITEMS.filter(item => item.badge === 'Signature');

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'San Francisco Dining Gazette',
    role: 'Seasonal Restaurant Feature',
    source: 'Culinary Press Review',
    rating: 5,
    highlight: 'Uncompromising precision at the wood hearth and exceptional produce sourcing.',
    text: 'Aurelia delivers an evening of quiet restraint and culinary balance. The seared wagyu tenderloin with reduction glaze and seasonal wild morels demonstrates extraordinary hearth technique and respect for terroir.',
    date: 'Autumn Service',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'West Coast Wine & Table',
    role: 'Hospitality & Sommelier Notes',
    source: 'Wine & Dining Journal',
    rating: 5,
    highlight: 'An olfactory and visual harmony orchestrated across every pairing.',
    text: 'The diver scallops over velvety sunchoke puree with caviar emulsion provides an exquisite study in ocean salinity. The sommelier pairing program is thoughtful, focused, and deeply knowledgeable.',
    date: 'Seasonal Degustation',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Marcus & Eleanor V.',
    role: 'Private Dining Salon Guests',
    source: 'Verified Dining Review',
    rating: 5,
    highlight: 'Warm, intuitive hospitality matched with serene salon acoustics.',
    text: 'From arrival at the porte-cochère to our table-side decanting, our anniversary was handled with grace and understated warmth. Aurelia stands out for its unhurried pace and culinary focus.',
    date: 'Evening Service',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'The Urban Epikure',
    role: 'Regional Food & Beverage Review',
    source: 'Dining Columns',
    rating: 5,
    highlight: 'Every plate communicates an honest dedication to seasonal ingredients.',
    text: 'What resonates most is the kitchen’s restraint. Rather than excessive theatricality, every sauce reduction and charcoal sear allows the natural character of heirloom growers and line-caught seafood to shine.',
    date: 'Tasting Menu Review',
    verified: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Obsidian Grand Dining Hall',
    category: 'Interior',
    image: '/images/hero_fine_dining_interior_1790331386244.jpg',
    description: 'Warm atmospheric lighting, Italian dark walnut accents, and custom linen-dressed marble tables.'
  },
  {
    id: 'gal-2',
    title: 'Plating at the Pass',
    category: 'Craft',
    image: '/images/chef_plating_gastronomy_1790331400391.jpg',
    description: 'Our culinary brigade finishing a tasting course with delicate tweezers and fresh garden botanicals.'
  },
  {
    id: 'gal-3',
    title: 'Miyazaki A5 Wagyu Tenderloin',
    category: 'Cuisine',
    image: '/images/signature_wagyu_tenderloin_1790331414295.jpg',
    description: 'Seared over Binchotan charcoal embers with winter black truffle and glazed baby leeks.'
  },
  {
    id: 'gal-4',
    title: 'Hokkaido Diver Scallop & Ossetra Caviar',
    category: 'Cuisine',
    image: '/images/signature_hokkaido_scallop_1790331428035.jpg',
    description: 'Sunchoke silk puree with golden chive blossom glaze and royal sturgeon caviar.'
  },
  {
    id: 'gal-5',
    title: 'The Aurelia Smoked Reserve Bar',
    category: 'Spirits',
    image: '/images/cocktail_artisanal_reserve_1790331442167.jpg',
    description: 'Artisanal spirits, hand-carved ice crystals, and bespoke botanical cocktail creations.'
  },
  {
    id: 'gal-6',
    title: 'Private Sommelier Wine Vault',
    category: 'Interior',
    image: '/images/hero_fine_dining_interior_1790331386244.jpg',
    description: 'Temperature-controlled cellar room featuring curated vintages from classic and independent growers.'
  }
];
