import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { REVIEWS } from '../data/restaurantData';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextReview();
      } else {
        prevReview();
      }
    }
    setTouchStartX(null);
  };

  const activeReview = REVIEWS[currentIndex];

  return (
    <section id="reviews" className="py-20 sm:py-32 lg:py-36 bg-[#060708] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#c9a84e]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
              Selected Press & Guest Impressions
            </span>
            <span className="w-8 h-[1px] bg-[#c9a84e]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#f7f5f0] tracking-tight">
            Words of Reverence
          </h2>
        </div>

        {/* Big Editorial Quote Feature with Mobile Swipe Support */}
        <div 
          className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 px-2 sm:px-4 touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Rating Stars */}
          <div className="flex items-center justify-center gap-1.5 text-[#c9a84e]">
            {[...Array(activeReview.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#c9a84e]" />
            ))}
          </div>

          {/* Pull Quote in Grand Serif */}
          <blockquote className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#f7f5f0] leading-[1.3] sm:leading-[1.2] italic max-w-3xl mx-auto text-balance">
            "{activeReview.highlight}"
          </blockquote>

          {/* Detailed Paragraph */}
          <p className="text-xs sm:text-sm md:text-base text-[#b5b2a8] font-light max-w-2xl mx-auto leading-relaxed">
            {activeReview.text}
          </p>

          {/* Author Attribution */}
          <div className="pt-4 sm:pt-6 border-t border-white/[0.08] max-w-md mx-auto space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-serif font-medium text-[#f7f5f0]">
                {activeReview.author}
              </span>
              {activeReview.verified && (
                <span title="Verified Critic / Diner">
                  <CheckCircle className="w-3.5 h-3.5 text-[#c9a84e]" />
                </span>
              )}
            </div>
            <p className="text-xs text-[#8c8980]">
              {activeReview.role} · <span className="text-[#c9a84e]">{activeReview.source}</span>
            </p>
          </div>

          {/* Minimalist Carousel Controls with Touch-Friendly Hit Areas */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 pt-2 sm:pt-4">
            <button
              onClick={prevReview}
              className="p-3 rounded-sm border border-white/10 hover:border-[#c9a84e] text-[#a09d94] hover:text-[#c9a84e] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              aria-label="Previous Critic Accolade"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicator dots with accessible click wrapper */}
            <div className="flex items-center gap-2 py-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`py-3 px-1 transition-all flex items-center justify-center`}
                  aria-label={`Go to review ${i + 1}`}
                >
                  <span
                    className={`block h-1.5 transition-all rounded-full ${
                      currentIndex === i ? 'w-6 bg-[#c9a84e]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={nextReview}
              className="p-3 rounded-sm border border-white/10 hover:border-[#c9a84e] text-[#a09d94] hover:text-[#c9a84e] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              aria-label="Next Critic Accolade"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
