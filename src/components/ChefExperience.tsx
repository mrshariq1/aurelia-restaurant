import React from 'react';
import { Award, Compass, Users, Sparkles } from 'lucide-react';

interface ChefExperienceProps {
  onReserve: () => void;
}

export const ChefExperience: React.FC<ChefExperienceProps> = ({ onReserve }) => {
  const degustationMovements = [
    { num: 'I', title: 'Ocean Salinity & Caviar', detail: 'Hokkaido Diver Scallop, Ossetra Caviar, Chive Blossom' },
    { num: 'II', title: 'Foraged Forest Understory', detail: 'Wild Morel Tartare, Charred Sunchoke Silk' },
    { num: 'III', title: 'The Living Hearth', detail: 'Miyazaki A5 Wagyu, Binchotan Char, Winter Truffle Jus' },
    { num: 'IV', title: 'The Grand Finale', detail: 'Smoked Valrhona Grand Cru Sphere, Tahitian Vanilla' },
  ];

  return (
    <section id="chef" className="py-20 sm:py-32 lg:py-36 bg-[#060708] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split: Chef Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16 sm:mb-24">
          
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c9a84e]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
                The Brigade & The Hearth
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f7f5f0] tracking-tight leading-[1.15] sm:leading-[1.12]">
              Craft at the Wood-Fired Hearth
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#b5b2a8] leading-relaxed font-light">
              Our culinary brigade operates an open kitchen centered around white oak embers and meticulous seasonal plating. Guests seated at the Hearth Counter experience an unhurried, multi-course progression highlighting line-caught dayboat seafood, heritage growers, and reduction sauces finished à la minute.
            </p>

            {/* Quote block */}
            <blockquote className="p-4 sm:p-6 bg-[#0d0e13] border-l-2 border-[#c9a84e] space-y-2">
              <p className="font-serif italic text-sm sm:text-base text-[#f0ede6] leading-relaxed">
                "We cook to reveal the natural dignity of the sea, the forest, and the independent growers who tend them."
              </p>
              <footer className="text-xs text-[#8c8980]">
                — Aurelia Culinary Brigade & Hearth Team
              </footer>
            </blockquote>

            <div className="pt-2">
              <button
                onClick={onReserve}
                className="w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#c9a84e] text-[#090a0c] hover:bg-[#d8b85c] rounded-sm transition-all duration-200 shadow-md min-h-[44px] flex items-center justify-center active:scale-95"
              >
                Reserve The Hearth Counter
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-sm overflow-hidden border border-white/[0.08] shadow-2xl">
              <img
                src="/src/assets/images/chef_plating_gastronomy_1790331400391.jpg"
                alt="Chef Jean-Luc Laurent finishing a dish with precision tweezers"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-[360px] xs:h-[420px] sm:h-[540px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col xs:flex-row xs:items-center justify-between gap-2 text-xs text-[#d1ceca]">
                <div>
                  <p className="font-serif text-base sm:text-lg text-[#f7f5f0]">The Open Kitchen Atelier</p>
                  <p className="text-[10px] sm:text-[11px] text-[#8c8980]">Binchotan Charcoal & Plating Pass</p>
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#c9a84e] border border-[#c9a84e]/30 px-2.5 py-1 rounded-sm bg-black/60 shrink-0 self-start xs:self-auto">
                  Strictly 8 Seats Available
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* The Degustation Movements Timeline */}
        <div className="border-t border-white/[0.08] pt-12 sm:pt-16 mb-14 sm:mb-20">
          <div className="max-w-3xl mb-8 sm:mb-12 space-y-2">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
              The Sensory Symphony
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-[#f7f5f0]">
              The Degustation Progression
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {degustationMovements.map((move) => (
              <div key={move.num} className="space-y-2 sm:space-y-3 p-4 sm:p-5 bg-[#0d0e12] border-t-2 border-[#c9a84e]/60 rounded-sm">
                <span className="font-serif text-xl sm:text-2xl text-[#c9a84e] block">{move.num}</span>
                <h4 className="text-sm sm:text-base font-serif text-[#f7f5f0]">{move.title}</h4>
                <p className="text-xs text-[#8c8980] leading-relaxed font-light">{move.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Salon Experiences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-10 sm:pt-12 border-t border-white/[0.08]">
          <div className="p-7 bg-[#0b0c10] rounded-sm border border-white/[0.06] space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84e] font-semibold block">
              Experience 01
            </span>
            <h4 className="text-xl font-serif text-[#f7f5f0]">The Grand Dining Salon</h4>
            <p className="text-xs text-[#9c9990] leading-relaxed font-light">
              Expansive acoustic-dampened room featuring Italian dark walnut tables, bespoke Belgian linens, and discreet table-side service.
            </p>
            <p className="text-xs text-[#c9a84e] font-medium pt-1">8-Course Degustation · $245 / guest</p>
          </div>

          <div className="p-7 bg-[#0b0c10] rounded-sm border border-white/[0.06] space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84e] font-semibold block">
              Experience 02
            </span>
            <h4 className="text-xl font-serif text-[#f7f5f0]">The Chef’s Hearth Counter</h4>
            <p className="text-xs text-[#9c9990] leading-relaxed font-light">
              An intimate row of eight leather seats facing our open hearth pass, with live culinary presentation and course-by-course dialogue.
            </p>
            <p className="text-xs text-[#c9a84e] font-medium pt-1">11-Course Omakase · $320 / guest</p>
          </div>

          <div className="p-7 bg-[#0b0c10] rounded-sm border border-white/[0.06] space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84e] font-semibold block">
              Experience 03
            </span>
            <h4 className="text-xl font-serif text-[#f7f5f0]">The Sommelier Reserve Vault</h4>
            <p className="text-xs text-[#9c9990] leading-relaxed font-light">
              Private temperature-regulated salon surrounded by historical grand cru vintages, with dedicated decanting rituals.
            </p>
            <p className="text-xs text-[#c9a84e] font-medium pt-1">Up to 14 Guests · Grand Cru Pairing</p>
          </div>
        </div>

      </div>
    </section>
  );
};
