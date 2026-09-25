import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const categories = ['All', 'Cuisine', 'Interior', 'Craft', 'Spirits'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextLightbox();
      } else {
        prevLightbox();
      }
    }
    setTouchStartX(null);
  };

  // Lock body scroll and handle keyboard navigation when lightbox is open
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-20 sm:py-32 lg:py-36 bg-[#090a0c] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#c9a84e]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
                Atmosphere & Plating Chronicles
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f7f5f0] tracking-tight">
              The Visual Archive
            </h2>
          </div>
          
          {/* Category Tabs */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none pb-1">
            <div className="flex items-center gap-1 bg-[#101116] p-1 rounded-sm border border-white/10 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 sm:px-3.5 py-1.5 text-xs rounded-sm transition-colors whitespace-nowrap min-h-[34px] flex items-center justify-center ${
                    activeCategory === cat
                      ? 'bg-[#c9a84e] text-[#090a0c] font-medium'
                      : 'text-[#8c8980] hover:text-[#e4e2dd]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Architectural Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => {
            // Varied column spans create natural editorial rhythm on desktop
            const colSpan = idx === 0 
              ? 'sm:col-span-2 md:col-span-8' 
              : idx === 1 
              ? 'sm:col-span-1 md:col-span-4' 
              : 'sm:col-span-1 md:col-span-4';
            const height = idx === 0 ? 'h-64 xs:h-72 sm:h-80 md:h-96' : 'h-64 xs:h-72 sm:h-80';

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`${colSpan} ${height} group relative rounded-sm overflow-hidden bg-[#101115] border border-white/[0.08] cursor-pointer`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                {/* Overlay Content */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                  <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 rounded-sm bg-black/60 backdrop-blur-md text-[#c9a84e]">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84e] font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif text-[#f7f5f0]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#a09d94] line-clamp-1 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200 touch-pan-y select-none"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image view"
        >
          {/* Top Bar with Counter and Close */}
          <div
            className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-xs text-[#8c8980]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#c9a84e]" />
              <span className="uppercase tracking-widest text-[#d1ceca] text-[10px] sm:text-xs">
                {filteredItems[lightboxIndex].category} · {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2.5 text-[#e4e2dd] hover:text-[#c9a84e] bg-white/5 hover:bg-white/10 rounded-sm transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image Container */}
          <div
            className="relative max-w-5xl max-h-[70vh] sm:max-h-[75vh] mx-auto flex items-center justify-center px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[70vh] sm:max-h-[75vh] max-w-full object-contain rounded-sm border border-white/10 shadow-2xl"
            />
          </div>

          {/* Caption */}
          <div
            className="mt-4 sm:mt-6 text-center max-w-xl space-y-1 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-lg sm:text-xl font-serif text-[#f7f5f0]">
              {filteredItems[lightboxIndex].title}
            </h4>
            <p className="text-xs text-[#a09d94] font-light line-clamp-2">
              {filteredItems[lightboxIndex].description}
            </p>
          </div>

          {/* Navigation Arrows with Touch Padding */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-[#c9a84e] hover:text-[#090a0c] text-[#f7f5f0] rounded-sm transition-colors border border-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-[#c9a84e] hover:text-[#090a0c] text-[#f7f5f0] rounded-sm transition-colors border border-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Next Image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
};
