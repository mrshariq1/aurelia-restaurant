export type CategoryType = 
  | 'all'
  | 'starters'
  | 'mains'
  | 'burgers'
  | 'pizza'
  | 'pasta'
  | 'desserts'
  | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'burgers' | 'pizza' | 'pasta' | 'desserts' | 'drinks';
  description: string;
  price: number;
  badge?: 'Chef’s Special' | 'Signature' | 'Seasonal' | 'House Favorite';
  dietary: ('vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free')[];
  spicyLevel: 0 | 1 | 2 | 3;
  image: string;
  pairing?: string;
  calories?: number;
  ingredients: string[];
  preparationTime?: string;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  area: 'Main Dining Room' | 'Private Wine Vault' | 'Chef’s Hearth Counter' | 'Heated Veranda';
  specialRequest?: string;
  dietaryNotes?: string;
}

export interface ReservationConfirmation extends ReservationFormData {
  confirmationCode: string;
  createdAt: string;
  status: 'confirmed';
}

export interface Review {
  id: string;
  author: string;
  source: string;
  role: string;
  rating: number;
  text: string;
  highlight: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cuisine' | 'Interior' | 'Craft' | 'Spirits';
  image: string;
  description: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  suggestedDishes?: MenuItem[];
  timestamp: string;
}
