import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

interface FloatingControlsProps {
  onOpenAssistant: () => void;
}

export const FloatingControls: React.FC<FloatingControlsProps> = ({ onOpenAssistant }) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3">
      {/* Floating Concierge AI Trigger - Refined Minimalist Luxury Affordance */}
      <button
        onClick={onOpenAssistant}
        className="group flex items-center gap-2 py-2.5 px-3.5 sm:px-4 bg-[#0d0e12]/95 hover:bg-[#15171e] text-[#c9a84e] border border-[#c9a84e]/40 hover:border-[#c9a84e] rounded-sm shadow-2xl backdrop-blur-md transition-all duration-300 active:scale-95 min-h-[44px]"
        aria-label="Open Aurelia Sommelier & Concierge AI"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#c9a84e]" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium">
          Sommelier AI
        </span>
      </button>

      {/* Back to top button */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="p-3 rounded-sm bg-[#0d0e12]/90 text-[#9c9990] hover:text-[#c9a84e] border border-white/10 hover:border-[#c9a84e]/40 shadow-xl backdrop-blur-md transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
