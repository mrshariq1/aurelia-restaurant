import React from 'react';
import { MapPin, Clock, Car, Navigation, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 sm:py-32 lg:py-36 bg-[#060708] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#c9a84e]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
              The Sanctuary
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f7f5f0] tracking-tight">
            Location & Operating Hours
          </h2>
        </div>

        {/* 2-Column: Architectural Map Schematic & Operating Hours */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left: Refined Architectural Map Display */}
          <div className="lg:col-span-7 bg-[#0b0c10] rounded-sm border border-white/[0.08] overflow-hidden relative min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-5 sm:p-8 lg:p-10">
            {/* Fine architectural grid lines */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c9a84e_1px,transparent_1px)] [background-size:28px_28px]" />

            {/* Top Bar Coordinates */}
            <div className="relative z-10 flex items-center justify-between text-xs text-[#8c8980]">
              <span className="font-mono text-[10px] sm:text-[11px] text-[#c9a84e]">
                37°47'20.8" N · 122°24'05.0" W
              </span>
              <span className="uppercase tracking-[0.25em] text-[9px] sm:text-[10px] text-[#716e67]">
                Grand Avenue Reserve
              </span>
            </div>

            {/* Center Map Pin Schematic */}
            <div className="relative z-10 my-auto text-center space-y-3 py-6 sm:py-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#c9a84e]/10 border border-[#c9a84e] flex items-center justify-center text-[#c9a84e] mx-auto shadow-xl">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#f7f5f0] tracking-wide">
                {RESTAURANT_INFO.name}
              </h3>
              <p className="text-xs text-[#a09d94] max-w-sm mx-auto font-light">
                {RESTAURANT_INFO.address}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/[0.08] text-xs">
              <div className="flex items-center gap-2 text-[#9c9990]">
                <Car className="w-4 h-4 text-[#c9a84e] shrink-0" />
                <span>Complimentary Porte-Cochère Valet Service</span>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.04] hover:bg-[#c9a84e] hover:text-[#090a0c] text-[#f7f5f0] rounded-sm border border-white/10 transition-colors min-h-[44px] active:scale-95"
              >
                <span>Navigate With Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Service Hours Table & Arrival Guidance */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Hours Table */}
            <div className="p-5 sm:p-8 bg-[#0b0c10] rounded-sm border border-white/[0.08] space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2.5 text-[#c9a84e] border-b border-white/[0.06] pb-3">
                <Clock className="w-4 h-4" />
                <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#f7f5f0]">
                  Operating Schedule
                </h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-[#a09d94]">Dinner Degustation</span>
                  <span className="text-[#f7f5f0] font-medium">Tue – Sun: 17:30 – 23:00</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-[#a09d94]">Lunch Degustation</span>
                  <span className="text-[#f7f5f0] font-medium">Wed – Sun: 12:00 – 14:30</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                  <span className="text-[#a09d94]">Sommelier Cellar Lounge</span>
                  <span className="text-[#f7f5f0] font-medium">Tue – Sun: 17:00 – 01:00</span>
                </div>
                <div className="flex justify-between items-center py-1 text-[#c9a84e] italic">
                  <span>Mondays</span>
                  <span>Closed for farm foraging & cellar procurement</span>
                </div>
              </div>
            </div>

            {/* Arrival & Dress Advisory */}
            <div className="p-8 bg-[#0b0c10] rounded-sm border border-white/[0.08] space-y-4 text-xs text-[#9c9990] leading-relaxed">
              <div className="flex items-center gap-2.5 text-[#c9a84e] border-b border-white/[0.06] pb-3">
                <Navigation className="w-4 h-4" />
                <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#f7f5f0]">
                  Arrival & Protocol
                </h3>
              </div>
              <p>
                <strong className="text-[#f0ede6]">Valet Attendants:</strong> Stationed at the North Porte-Cochère on 8th Street beginning thirty minutes prior to first seating.
              </p>
              <p>
                <strong className="text-[#f0ede6]">Dress Code:</strong> Smart Elegant. Collared shirts or jacket requested for gentlemen.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
