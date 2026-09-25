import React from 'react';
import { X, Wine, Flame, Sparkles, Plus } from 'lucide-react';
import { MenuItem } from '../types/restaurant';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  React.useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detailed tasting notes for ${item.name}`}
    >
      <div
        className="bg-[#0d0e12] border border-white/[0.1] rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image Header */}
        <div className="relative aspect-[16/9] w-full bg-[#14151a] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2.5 rounded-sm bg-black/70 text-[#dedbd4] hover:text-[#c9a84e] backdrop-blur-md transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Category & Badge */}
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-[#c9a84e] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-sm border border-[#c9a84e]/30">
              {item.badge || item.category}
            </span>
            {item.spicyLevel > 0 && (
              <span className="text-[10px] text-amber-400 bg-black/70 px-2 py-1 rounded-sm flex items-center gap-1">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                Spicy Lvl {item.spicyLevel}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="absolute bottom-4 right-6">
            <span className="font-serif text-3xl text-[#f7f5f0] tabular-nums bg-black/70 px-3 py-1 rounded-sm">
              ${item.price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] text-[#7d7a72] mb-1">
              <span className="uppercase tracking-widest">{item.category}</span>
              {item.dietary.length > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{item.dietary.join(', ')}</span>
                </>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#f7f5f0]">
              {item.name}
            </h3>
          </div>

          <p className="text-sm text-[#b5b2a8] leading-relaxed font-light">
            {item.description}
          </p>

          {/* Sommelier Pairing & Prep Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#121318] rounded-sm border border-white/5 text-xs">
            {item.pairing && (
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[#c9a84e] font-medium">
                  <Wine className="w-3.5 h-3.5" />
                  <span>Sommelier Pairing</span>
                </div>
                <p className="text-[#a09d94] italic">{item.pairing}</p>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[#c9a84e] font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nutritional Profile</span>
              </div>
              <p className="text-[#a09d94] tabular-nums">
                {item.calories ? `Approx. ${item.calories} kcal` : 'Calorie-balanced'} · Prepared à la minute
              </p>
            </div>
          </div>

          {/* Ingredients Breakdown */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-widest text-[#c9a84e] font-medium">
                Artisanal Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs text-[#b5b2a8]">
                {item.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="bg-white/[0.04] px-2.5 py-1 rounded-sm border border-white/5"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs uppercase tracking-wider text-[#8c8980] hover:text-[#f7f5f0] transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                onAddToCart(item);
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#c9a84e] hover:bg-[#d8b85c] text-[#090a0c] rounded-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Tasting Flight</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
