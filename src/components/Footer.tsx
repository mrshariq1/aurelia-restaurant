import React, { useState } from 'react';
import { Award, Mail, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onSuccessToast?: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSuccessToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      setSubscribed(true);
      if (onSuccessToast) {
        onSuccessToast('You have been enrolled in the Aurelia Private Cellar Circle.');
      }
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#08090a] border-t border-white/10 text-[#8e8b82] text-xs pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Newsletter & Brand Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 sm:pb-16 border-b border-white/5">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#c9a84e] font-semibold">
              The Private Cellar Circle
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#f7f5f0]">
              Receive First Access to Seasonal Tasting Menus
            </h3>
            <p className="text-xs text-[#a09d94] font-light max-w-md">
              Subscribers receive priority reservation release alerts, private winemaker dinners, and seasonal menu previews.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="flex items-center gap-2.5 text-emerald-400 bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-sm text-xs">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>You are now subscribed to the Aurelia Gastronomy Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your personal email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-[#131418] border border-white/10 text-[#e6e3dd] text-base sm:text-xs px-4 py-3 rounded-sm focus:outline-none focus:border-[#c9a84e] min-h-[44px]"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-[#c9a84e] hover:bg-[#d8b85c] text-[#0c0d0e] rounded-sm transition-colors flex items-center justify-center gap-1.5 shrink-0 min-h-[44px] active:scale-95"
                >
                  <span>{loading ? 'Joining...' : 'Subscribe'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Col 1: Wordmark & Heritage */}
          <div className="space-y-4">
            <span className="text-2xl font-serif tracking-[0.2em] text-[#f7f5f0] block">
              {RESTAURANT_INFO.name}
            </span>
            <p className="text-xs text-[#8e8b82] leading-relaxed">
              An ode to artisanal gastronomy, seasonal terroir, and refined hospitality in the Downtown Reserve District.
            </p>
            <div className="flex items-center gap-2 text-[#c9a84e] pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84e]" />
              <span className="text-[10px] tracking-widest uppercase text-[#c2bfb5]">
                Wood Hearth & Reserve Wine Lounge
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#c9a84e] font-semibold">
              The Restaurant
            </p>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-[#c9a84e] transition-colors py-1 inline-block">Home & Sanctuary</a></li>
              <li><a href="#story" className="hover:text-[#c9a84e] transition-colors py-1 inline-block">Our Story & Terroir</a></li>
              <li><a href="#menu" className="hover:text-[#c9a84e] transition-colors py-1 inline-block">Grand Tasting Menu</a></li>
              <li><a href="#signatures" className="hover:text-[#c9a84e] transition-colors py-1 inline-block">Signature Creations</a></li>
              <li><a href="#gallery" className="hover:text-[#c9a84e] transition-colors py-1 inline-block">Visual Gallery</a></li>
              <li><a href="#reservation" className="hover:text-[#c9a84e] transition-colors py-1 inline-block">Table Reservations</a></li>
            </ul>
          </div>

          {/* Col 3: Hours Summary */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#c9a84e] font-semibold">
              Service Hours
            </p>
            <div className="space-y-2 text-[#a3a096]">
              <p><strong className="text-[#e4e2dd]">Dinner:</strong> Tue – Sun 5:30 PM – 11 PM</p>
              <p><strong className="text-[#e4e2dd]">Lunch:</strong> Wed – Sun 12:00 PM – 2:30 PM</p>
              <p><strong className="text-[#e4e2dd]">Wine Bar:</strong> Tue – Sun until 1:00 AM</p>
              <p className="text-[#c9a84e] text-[11px] italic">Mondays: Closed for farm research</p>
            </div>
          </div>

          {/* Col 4: Contact & Concierge */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#c9a84e] font-semibold">
              Concierge Desk
            </p>
            <div className="space-y-2 text-[#a3a096]">
              <p>{RESTAURANT_INFO.address}</p>
              <p className="text-[#c9a84e]">{RESTAURANT_INFO.phone}</p>
              <p>{RESTAURANT_INFO.email}</p>
              <p className="text-[11px] text-[#716e67]">Private Valet at North Porte-Cochère</p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Quiet Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6a6760]">
          <p>© {new Date().getFullYear()} {RESTAURANT_INFO.fullName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center">
            <a href="#hero" className="hover:text-[#c9a84e] transition-colors">Privacy Charter</a>
            <a href="#hero" className="hover:text-[#c9a84e] transition-colors">Reservation Policy</a>
            <a href="#hero" className="hover:text-[#c9a84e] transition-colors">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
