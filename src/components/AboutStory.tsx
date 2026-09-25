import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const AboutStory: React.FC = () => {
  return (
    <section id="story" className="py-20 sm:py-32 lg:py-36 bg-[#090a0c] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Kicker & Title */}
        <div className="max-w-3xl mb-12 sm:mb-20 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#c9a84e]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
              The Genesis & Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f7f5f0] tracking-tight leading-[1.15] sm:leading-[1.12]">
            Crafting Gastronomic Emotion Through Ancient Fire & Living Terroir
          </h2>
        </div>

        {/* Asymmetric Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Atmospheric Chef Plating Photo with Bespoke Framing */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden border border-white/[0.08] shadow-2xl group">
              <img
                src="/src/assets/images/chef_plating_gastronomy_1790331400391.jpg"
                alt="Executive Head Chef Jean-Luc Laurent executing precise dish finishing at the kitchen pass"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-[360px] xs:h-[420px] sm:h-[500px] lg:h-[620px] object-cover object-center group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              
              {/* Bottom Subtle Overlay */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#c9a84e] font-medium mb-1">
                  Atelier Pass · 21:15 Service
                </p>
                <p className="text-xs sm:text-sm font-serif italic text-[#eae7e1] leading-relaxed">
                  "We do not manipulate ingredients to exhibit our ego; we quiet our hands to listen to what the season has given us."
                </p>
                <p className="text-[11px] text-[#8c8980] mt-1.5 font-light">
                  — The Kitchen Brigade & Hearth Team
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Numbered Principles */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10">
            <div className="space-y-4 sm:space-y-6 text-[#b5b2a8] text-sm sm:text-base font-light leading-relaxed">
              <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:text-[#c9a84e] first-letter:mr-2.5 sm:first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                Conceived as a contemporary culinary sanctuary, <strong className="text-[#f7f5f0] font-normal">AURELIA</strong> unites seasonal ingredient-led cooking, artisanal wood-hearth technique, and an intuitive sommelier program.
              </p>
              <p>
                Our brigade works in close harmony with line-caught dayboat fisheries, heritage livestock stewards, and regional biodynamic growers. Menus evolve continuously alongside the local micro-seasons, ensuring every course speaks directly to the freshness and purity of its origin.
              </p>
            </div>

            {/* The 3 Pillars as Refined Editorial Numbered List */}
            <div className="space-y-5 sm:space-y-6 pt-4 border-t border-white/[0.08]">
              <div className="flex gap-4 sm:gap-5 items-start">
                <span className="font-serif text-lg sm:text-xl text-[#c9a84e] tabular-nums shrink-0 mt-0.5">
                  01
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-serif text-[#f7f5f0]">Seasonal Micro Terroir</h3>
                  <p className="text-xs text-[#9c9990] leading-relaxed font-light">
                    Coastal botanicals, wild mushrooms, and organic produce harvested at natural peak maturity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <span className="font-serif text-lg sm:text-xl text-[#c9a84e] tabular-nums shrink-0 mt-0.5">
                  02
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-serif text-[#f7f5f0]">Binchotan Charcoal & Hearth Fire</h3>
                  <p className="text-xs text-[#9c9990] leading-relaxed font-light">
                    Gentle, steady infrared heat from artisanal white oak embers, coaxing natural caramelized depths and clean aromatics.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-5 items-start">
                <span className="font-serif text-lg sm:text-xl text-[#c9a84e] tabular-nums shrink-0 mt-0.5">
                  03
                </span>
                <div className="space-y-1">
                  <h3 className="text-base font-serif text-[#f7f5f0]">Cellar Harmony & Coravin Rituals</h3>
                  <p className="text-xs text-[#9c9990] leading-relaxed font-light">
                    A curated selection of expressive grower champagnes, balanced classic terroirs, and low-intervention masterworks.
                  </p>
                </div>
              </div>
            </div>

            {/* Sourcing & Trust Badges */}
            <div className="pt-4 sm:pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-y-2.5 gap-x-5 sm:gap-x-6 text-xs text-[#8c8980]">
              {RESTAURANT_INFO.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84e]" />
                  <span className="text-[#c7c4bb] font-medium">{highlight}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
