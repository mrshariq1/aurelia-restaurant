import React, { useState } from 'react';
import { Wine, Plus, Eye } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { SIGNATURE_DISHES } from '../data/restaurantData';

interface SignatureDishesProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const SignatureDishes: React.FC<SignatureDishesProps> = ({
  onSelectItem,
  onAddToCart
}) => {
  const [activeDishIndex, setActiveDishIndex] = useState(0);

  const activeDish = SIGNATURE_DISHES[activeDishIndex] || SIGNATURE_DISHES[0];

  return (
    <section id="signatures" className="py-20 sm:py-32 lg:py-36 bg-[#060708] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c9a84e]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
                Culinary Centerpieces
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f7f5f0] tracking-tight">
              The Signature Masterpieces
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#9c9990] max-w-md font-light leading-relaxed">
            Plates that define our identity. Each course represents a multi-year dialogue with our artisan suppliers and hearth brigade.
          </p>
        </div>

        {/* Hero Showcase Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-[#0d0e12] border border-white/[0.08] rounded-sm p-4 sm:p-8 lg:p-10 mb-8 sm:mb-12 shadow-2xl">
          
          {/* Left Column: Big Centerpiece Photography with Zoom */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-sm aspect-[4/3] bg-[#14151a]">
            <img
              src={activeDish.image}
              alt={activeDish.name}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

            {/* Price Badge */}
            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5">
              <span className="font-serif text-2xl sm:text-4xl text-[#f7f5f0] tabular-nums bg-black/60 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-sm border border-white/10">
                ${activeDish.price}
              </span>
            </div>

            {/* Badge Indicator */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium text-[#c9a84e] bg-black/70 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-sm border border-[#c9a84e]/30">
                {activeDish.badge}
              </span>
            </div>
          </div>

          {/* Right Column: Narrative, Sommelier Pairings, and Actions */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6 flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between text-xs text-[#8c8980]">
                <span className="uppercase tracking-[0.2em]">{activeDish.category}</span>
                <span className="font-serif italic tabular-nums text-[#c9a84e]">
                  0{activeDishIndex + 1} / 0{SIGNATURE_DISHES.length}
                </span>
              </div>

              <h3
                onClick={() => onSelectItem(activeDish)}
                className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#f7f5f0] hover:text-[#c9a84e] transition-colors cursor-pointer leading-snug"
              >
                {activeDish.name}
              </h3>

              <p className="text-xs sm:text-sm text-[#b5b2a8] font-light leading-relaxed">
                {activeDish.description}
              </p>
            </div>

            {/* Sommelier Pairing & Ingredients */}
            <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-white/[0.08]">
              {activeDish.pairing && (
                <div className="flex items-start gap-2.5 text-xs text-[#d6c48e]">
                  <Wine className="w-4 h-4 text-[#c9a84e] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#f7f5f0]">Cellar Pairing: </span>
                    <span className="italic">{activeDish.pairing}</span>
                  </div>
                </div>
              )}

              {activeDish.ingredients && (
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-[#7c7971]">
                    Key Components:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs text-[#a09d94]">
                    {activeDish.ingredients.map((ing) => (
                      <span key={ing} className="bg-white/[0.03] px-2 py-0.5 rounded-sm border border-white/5">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Actions */}
            <div className="pt-3 sm:pt-4 flex items-center gap-3">
              <button
                onClick={() => onAddToCart(activeDish)}
                className="flex-1 py-3 px-4 sm:px-5 text-xs uppercase tracking-[0.18em] font-medium bg-[#c9a84e] hover:bg-[#d8b85c] text-[#090a0c] rounded-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Tasting Flight</span>
              </button>

              <button
                onClick={() => onSelectItem(activeDish)}
                className="p-3 text-[#a09d94] hover:text-[#c9a84e] bg-white/[0.04] hover:bg-white/[0.08] rounded-sm border border-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={`View tasting notes for ${activeDish.name}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Thumbnail Selector Strip to Switch Centerpiece */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4"
          role="tablist"
          aria-label="Signature dishes selector"
        >
          {SIGNATURE_DISHES.map((dish, idx) => (
            <button
              key={dish.id}
              role="tab"
              aria-selected={activeDishIndex === idx}
              aria-label={`View signature dish: ${dish.name}`}
              onClick={() => setActiveDishIndex(idx)}
              className={`p-2.5 sm:p-3.5 rounded-sm border text-left transition-all flex items-center gap-2.5 sm:gap-3 min-h-[58px] active:scale-98 ${
                activeDishIndex === idx
                  ? 'bg-[#15171d] border-[#c9a84e] shadow-lg ring-1 ring-[#c9a84e]/30'
                  : 'bg-[#0d0e12] border-white/[0.06] hover:border-white/20'
              }`}
            >
              <img
                src={dish.image}
                alt={dish.name}
                loading="lazy"
                className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-sm shrink-0 border border-white/10"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[9px] sm:text-[10px] text-[#7d7a72] uppercase tracking-wider block truncate">
                  0{idx + 1} · {dish.category}
                </span>
                <p className="text-xs font-serif text-[#f7f5f0] truncate">{dish.name}</p>
                <p className="text-[11px] text-[#c9a84e] tabular-nums font-serif">${dish.price}</p>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
