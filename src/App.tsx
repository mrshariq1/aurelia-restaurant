/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutStory } from './components/AboutStory';
import { SignatureDishes } from './components/SignatureDishes';
import { MenuSection } from './components/MenuSection';
import { ChefExperience } from './components/ChefExperience';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { OrderDrawer } from './components/OrderDrawer';
import { AIFoodAssistant } from './components/AIFoodAssistant';
import { FloatingControls } from './components/FloatingControls';
import { Toast } from './components/Toast';
import { MenuItem, CartItem } from './types/restaurant';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart operations
  const handleAddToCart = (dish: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === dish.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === dish.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item: dish, quantity: 1 }];
    });
    setToastMessage(`Added "${dish.name}" to your tasting selection.`);
  };

  const handleUpdateQuantity = (dishId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === dishId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (dishId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== dishId));
  };

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#e6e3dd] selection:bg-[#c9a84e]/30 selection:text-[#fff8db]">
      {/* 1. Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenReservation={scrollToReservation}
      />

      <main>
        {/* 2. Hero Section */}
        <Hero
          onReserve={scrollToReservation}
          onExploreMenu={scrollToMenu}
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />

        {/* 3. About / Story / Philosophy */}
        <AboutStory />

        {/* 4. Signature / Popular Dishes */}
        <SignatureDishes
          onSelectItem={(dish) => setSelectedDish(dish)}
          onAddToCart={handleAddToCart}
        />

        {/* 5. Degustation & À La Carte Menu */}
        <MenuSection
          onSelectItem={(dish) => setSelectedDish(dish)}
          onAddToCart={handleAddToCart}
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />

        {/* 6. Chef Leadership & Hearth Experience */}
        <ChefExperience onReserve={scrollToReservation} />

        {/* 7. Atmosphere & Visual Gallery */}
        <GallerySection />

        {/* 8. Critical Acclaim & Reviews */}
        <ReviewsSection />

        {/* 9. Table Reservation */}
        <ReservationSection onSuccessToast={(msg) => setToastMessage(msg)} />

        {/* 10. Sanctuary Location & Hours */}
        <LocationSection />

        {/* 11. Contact & Inquiries */}
        <ContactSection onSuccessToast={(msg) => setToastMessage(msg)} />
      </main>

      {/* 12. Premium Footer */}
      <Footer onSuccessToast={(msg) => setToastMessage(msg)} />

      {/* Floating Assistant Trigger & Back-To-Top */}
      <FloatingControls onOpenAssistant={() => setIsAssistantOpen(true)} />

      {/* Modals & Slide-out Drawers */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToReservation={scrollToReservation}
      />

      <AIFoodAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onAddToCart={handleAddToCart}
        onSelectItem={(dish) => setSelectedDish(dish)}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
