import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { CartItem } from '../types/restaurant';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToReservation: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToReservation
}) => {
  React.useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const serviceCharge = Math.round(subtotal * 0.18);
  const total = subtotal + serviceCharge;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Tasting flight selection drawer"
    >
      <div
        className="w-full sm:w-[440px] bg-[#0c0d11] h-full border-l border-white/[0.08] flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-[#101116] border-b border-white/[0.07] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-sm bg-[#c9a84e]/10 text-[#c9a84e]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-medium text-[#f7f5f0]">
                Curated Tasting Flight
              </h3>
              <p className="text-[10px] text-[#7d7a72] uppercase tracking-wider">
                {items.length} {items.length === 1 ? 'course' : 'courses'} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7d7a72] hover:text-[#f7f5f0] hover:bg-white/5 rounded-sm transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close Tasting Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List or Empty State */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3.5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#8a877e]">
              <UtensilsCrossed className="w-10 h-10 text-white/10 stroke-1" />
              <div className="space-y-1">
                <p className="font-serif text-lg text-[#e4e2dd]">Your tasting tray is empty.</p>
                <p className="text-xs text-[#7d7a72] max-w-xs font-light">
                  Select courses from our à la carte or signature degustation to pre-arrange your dining itinerary.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-5 py-2 text-xs uppercase tracking-wider text-[#c9a84e] border border-[#c9a84e]/30 rounded-sm hover:bg-[#c9a84e]/10"
              >
                Explore Carte
              </button>
            </div>
          ) : (
            items.map((cartItem) => (
              <div
                key={cartItem.item.id}
                className="p-3 bg-[#111218] rounded-sm border border-white/[0.06] flex gap-3 items-center justify-between"
              >
                <img
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  className="w-14 h-14 object-cover rounded-sm shrink-0 border border-white/5"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-serif text-[#f7f5f0] truncate">
                    {cartItem.item.name}
                  </h4>
                  <p className="text-[11px] text-[#8c8980] tabular-nums font-serif">
                    ${cartItem.item.price} each
                  </p>

                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(cartItem.item.id, -1)}
                      className="p-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-[#9c9990] hover:text-[#f7f5f0] min-w-[34px] min-h-[34px] flex items-center justify-center active:scale-95 transition-all"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-medium tabular-nums text-[#e4e2dd] px-2 min-w-[24px] text-center">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(cartItem.item.id, 1)}
                      className="p-1.5 rounded-sm bg-white/5 hover:bg-white/10 text-[#9c9990] hover:text-[#f7f5f0] min-w-[34px] min-h-[34px] flex items-center justify-center active:scale-95 transition-all"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <p className="font-serif text-sm text-[#f7f5f0] tabular-nums">
                    ${cartItem.item.price * cartItem.quantity}
                  </p>
                  <button
                    onClick={() => onRemoveItem(cartItem.item.id)}
                    className="text-[#63615a] hover:text-red-400 transition-colors p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center ml-auto"
                    aria-label={`Remove ${cartItem.item.name} from tasting`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {items.length > 0 && (
          <div className="p-5 bg-[#0f1015] border-t border-white/[0.08] space-y-4">
            <div className="space-y-1.5 text-xs text-[#8c8980]">
              <div className="flex justify-between">
                <span>Courses Subtotal</span>
                <span className="tabular-nums text-[#f7f5f0] font-serif">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Culinary Gratuity (18%)</span>
                <span className="tabular-nums text-[#f7f5f0] font-serif">${serviceCharge}</span>
              </div>
              <div className="flex justify-between text-sm font-serif text-[#f7f5f0] pt-2 border-t border-white/5">
                <span>Estimated Tasting Total</span>
                <span className="tabular-nums text-[#c9a84e] text-lg font-serif">${total}</span>
              </div>
            </div>

            <p className="text-[10px] text-[#6e6b64]">
              Pre-selected courses are transmitted to the kitchen brigade upon table reservation confirmation.
            </p>

            <button
              onClick={() => {
                onClose();
                onProceedToReservation();
              }}
              className="w-full py-3 text-xs uppercase tracking-[0.2em] font-medium bg-[#c9a84e] hover:bg-[#d8b85c] text-[#090a0c] rounded-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Attach To Table Reservation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
