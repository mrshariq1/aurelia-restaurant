import React from 'react';
import { Award, Compass, Clock, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onReserve: () => void;
  onExploreMenu: () => void;
  onOpenAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onReserve,
  onExploreMenu,
}) => {
  return (
    <section id="hero" className="relative min-h-[96vh] sm:min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Image with Deep Photographic Depth */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_fine_dining_interior_1790331386244.jpg"
          alt="Aurelia Michelin-starred dining hall with linen-dressed tables and ambient lighting"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Measured dark cinematic scrims ensuring WCAG AA contrast across all screen brightnesses */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c] via-[#090a0c]/70 to-[#090a0c]/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#090a0c]/40 to-[#090a0c]/90" />
      </div>

      {/* Main Hero Visual Core */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-40 my-auto">
        
        {/* Sourcing & Culinary Focus Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-sm bg-black/60 border border-[#c9a84e]/30 backdrop-blur-md mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84e]" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#d6c48e] font-medium">
            Contemporary Degustation · Hearth Craft · Wine Lounge
          </span>
        </div>

        {/* Large Restaurant Headline */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#f7f5f0] tracking-tight leading-[1.1] sm:leading-[1.05] mb-5 sm:mb-6 max-w-4xl mx-auto text-balance">
          Artisanal Gastronomy & Seasonal Terroir
        </h1>

        {/* Short Premium Description */}
        <p className="text-xs sm:text-base md:text-lg text-[#bab7ac] font-light max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 text-balance px-2">
          An intimate dining sanctuary celebrating wild harvests, line-caught fisheries, and open hearth wood-fire cookery. Eight-course tasting menus choreographed à la minute.
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 mb-10 sm:mb-12 w-full max-w-md mx-auto sm:max-w-none">
          <button
            onClick={onReserve}
            className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-[#090a0c] bg-[#c9a84e] hover:bg-[#d8b85c] rounded-sm transition-all duration-300 shadow-lg shadow-black/40 active:scale-95 min-h-[44px] flex items-center justify-center"
          >
            Reserve a Table
          </button>
          
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-[0.22em] font-medium text-[#f0ede6] hover:text-[#c9a84e] bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#c9a84e]/60 rounded-sm transition-all duration-300 active:scale-95 min-h-[44px] flex items-center justify-center"
          >
            Explore The Tasting Menu
          </button>
        </div>

      </div>

      {/* Atmospheric Lower Editorial Information Strip */}
      <div className="relative z-10 border-t border-white/[0.08] bg-[#090a0c]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 text-xs text-[#9c9990]">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#c9a84e] shrink-0" />
              <div>
                <span className="text-[#e2ded6] font-medium">Service Hours:</span>
                <span className="ml-1.5 text-[#88857c]">Dinner 17:30–23:00 · Lunch 12:00–14:30</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#c9a84e] shrink-0" />
              <div className="truncate">
                <span className="text-[#e2ded6] font-medium">Sanctuary:</span>
                <span className="ml-1.5 text-[#88857c] truncate">{RESTAURANT_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:col-span-2 md:col-span-1">
              <Compass className="w-4 h-4 text-[#c9a84e] shrink-0" />
              <div>
                <span className="text-[#e2ded6] font-medium">Cellar Reserve:</span>
                <span className="ml-1.5 text-[#88857c]">Artisanal Pairings & Rare Vintages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
