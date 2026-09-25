import React, { useState, useMemo } from 'react';
import { Search, Wine, Plus, Eye, Flame, Check, LayoutGrid, List } from 'lucide-react';
import { MenuItem, CategoryType } from '../types/restaurant';
import { MENU_ITEMS } from '../data/restaurantData';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  onOpenAssistant: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onAddToCart,
  onOpenAssistant
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'carte' | 'grid'>('carte');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'all', label: 'All Courses' },
    { key: 'starters', label: 'Starters' },
    { key: 'mains', label: 'Main Course' },
    { key: 'burgers', label: 'Burgers' },
    { key: 'pizza', label: 'Pizza' },
    { key: 'pasta', label: 'Pasta' },
    { key: 'desserts', label: 'Desserts' },
    { key: 'drinks', label: 'Drinks & Cellar' },
  ];

  const dietaryOptions = [
    { key: 'all', label: 'All Diets' },
    { key: 'vegetarian', label: 'Vegetarian' },
    { key: 'vegan', label: 'Vegan' },
    { key: 'gluten-free', label: 'Gluten-Free' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (dietaryFilter !== 'all' && !item.dietary.includes(dietaryFilter as any)) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.ingredients.some((i) => i.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-20 sm:py-32 lg:py-36 bg-[#090a0c] relative border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#c9a84e]" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c9a84e] font-semibold">
              The Grand Degustation & À La Carte
            </span>
            <span className="w-8 h-[1px] bg-[#c9a84e]" />
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f7f5f0] tracking-tight">
            The Autumn Carte
          </h2>
          <p className="text-xs sm:text-sm text-[#a09d94] font-light max-w-lg mx-auto">
            Dishes composed à la minute using line-caught seafood, foraged botanicals, and heirloom grains.
          </p>
        </div>

        {/* Tasting Menu Degustation Announcement Banner */}
        <div className="mb-10 sm:mb-14 p-5 sm:p-8 bg-[#0f1015] border border-[#c9a84e]/30 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#c9a84e] font-semibold">
                Executive Chef’s Flight
              </span>
              <span className="text-xs text-[#8c8980]">·</span>
              <span className="text-xs text-[#b5b2a8]">8 Courses with Grand Cru Pairings</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-[#f7f5f0]">
              The Seasonal Autumn Equinox Degustation
            </h3>
            <p className="text-xs text-[#9c9990] font-light">
              Featuring Hokkaido Diver Scallops, Wild Morel Tartare, Miyazaki A5 Wagyu, and Valrhona Grand Cru Sphere.
            </p>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
            <div className="text-left md:text-right">
              <p className="font-serif text-2xl text-[#f7f5f0] tabular-nums">$245</p>
              <p className="text-[10px] text-[#8c8980]">per guest · Pairing +$145</p>
            </div>
            <a
              href="#reservation"
              className="px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-medium bg-[#c9a84e] text-[#090a0c] hover:bg-[#d8b85c] rounded-sm transition-colors whitespace-nowrap min-h-[40px] flex items-center justify-center"
            >
              Reserve Flight
            </a>
          </div>
        </div>

        {/* Filter Bar: Category Tabs & View Switcher */}
        <div className="space-y-5 sm:space-y-6 mb-10 sm:mb-12">
          
          {/* Main Category Tabs with Safe Mobile Swiping */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none pb-2 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5 sm:gap-2 justify-start lg:justify-center min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.2em] font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-[1px] min-h-[38px] ${
                    activeCategory === cat.key
                      ? 'border-[#c9a84e] text-[#c9a84e] bg-white/[0.02]'
                      : 'border-transparent text-[#848178] hover:text-[#e4e2dd]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-bar: Search, Dietary Filters, and View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            
            {/* Search Input - font-size 16px on mobile (text-base) to prevent iOS auto-zoom */}
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#7c7971] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search ingredients, truffle, wagyu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-base sm:text-xs bg-[#111217] text-[#e6e3dd] placeholder-[#6b6861] border border-white/10 rounded-sm focus:outline-none focus:border-[#c9a84e] transition-colors"
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7c7971] hover:text-[#e6e3dd] p-1"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary & View Mode Controls */}
            <div className="flex items-center gap-2 sm:gap-3 justify-between sm:justify-end overflow-x-auto">
              {/* Dietary Filter Segmented Bar */}
              <div className="flex items-center gap-1 bg-[#111217] p-1 rounded-sm border border-white/10">
                {dietaryOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setDietaryFilter(opt.key)}
                    className={`px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] rounded-sm transition-colors whitespace-nowrap min-h-[30px] flex items-center justify-center ${
                      dietaryFilter === opt.key
                        ? 'bg-[#c9a84e] text-[#090a0c] font-medium'
                        : 'text-[#8c8980] hover:text-[#e6e3dd]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* View Switcher: Carte vs Grid */}
              <div className="flex items-center gap-1 bg-[#111217] p-1 rounded-sm border border-white/10 shrink-0">
                <button
                  onClick={() => setViewMode('carte')}
                  className={`p-1.5 rounded-sm transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center ${
                    viewMode === 'carte'
                      ? 'bg-white/10 text-[#c9a84e]'
                      : 'text-[#7c7971] hover:text-[#e6e3dd]'
                  }`}
                  title="Editorial Carte View"
                  aria-label="Switch to Carte View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-sm transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center ${
                    viewMode === 'grid'
                      ? 'bg-white/10 text-[#c9a84e]'
                      : 'text-[#7c7971] hover:text-[#e6e3dd]'
                  }`}
                  title="Photographic Gallery View"
                  aria-label="Switch to Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-[#0e0f13] rounded-sm border border-white/5 space-y-4 px-4">
            <p className="text-lg font-serif text-[#e4e2dd]">No dishes match your specific dietary criteria.</p>
            <p className="text-xs text-[#8c8980] max-w-sm mx-auto font-light">
              Our culinary concierge can accommodate custom off-menu preparations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setDietaryFilter('all');
                  setSearchQuery('');
                }}
                className="w-full sm:w-auto px-4 py-2.5 text-xs uppercase tracking-wider text-[#c9a84e] border border-[#c9a84e]/30 rounded-sm hover:bg-[#c9a84e]/10 min-h-[40px]"
              >
                Reset Filters
              </button>
              <button
                onClick={onOpenAssistant}
                className="w-full sm:w-auto px-4 py-2.5 text-xs uppercase tracking-wider bg-[#c9a84e] text-[#090a0c] font-medium rounded-sm min-h-[40px]"
              >
                Ask Sommelier AI
              </button>
            </div>
          </div>
        ) : viewMode === 'carte' ? (
          /* =========================================================
             VIEW 1: "THE GRAND CARTE" (Authentic Editorial Paper Menu)
             ========================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-6 sm:gap-y-8">
            {filteredItems.map((dish) => {
              const isAdded = addedIds[dish.id];

              return (
                <div
                  key={dish.id}
                  className="group py-3.5 sm:py-4 border-b border-white/[0.06] flex gap-3.5 sm:gap-5 items-start justify-between transition-colors hover:border-[#c9a84e]/40"
                >
                  {/* Left Column: Dish details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    
                    {/* Header Row: Title & Price */}
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <h4
                          onClick={() => onSelectItem(dish)}
                          className="font-serif text-base sm:text-xl text-[#f7f5f0] group-hover:text-[#c9a84e] transition-colors cursor-pointer truncate"
                          title={dish.name}
                        >
                          {dish.name}
                        </h4>
                        {dish.badge && (
                          <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#c9a84e] border border-[#c9a84e]/30 px-1.5 py-0.5 rounded-sm shrink-0 hidden xs:inline-block">
                            {dish.badge}
                          </span>
                        )}
                        {dish.spicyLevel > 0 && (
                          <Flame className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                        )}
                      </div>

                      <div className="menu-leader hidden sm:block" />

                      <span className="font-serif text-base sm:text-lg text-[#f7f5f0] tabular-nums shrink-0 ml-1">
                        ${dish.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#a3a096] font-light leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>

                    {/* Sommelier Pairing & Dietary */}
                    <div className="flex items-center justify-between text-[11px] text-[#7d7a72] pt-1 gap-2">
                      {dish.pairing ? (
                        <div className="flex items-center gap-1.5 text-[#d6c48e] italic truncate">
                          <Wine className="w-3 h-3 text-[#c9a84e] shrink-0" />
                          <span className="truncate">{dish.pairing}</span>
                        </div>
                      ) : (
                        <span className="capitalize truncate">{dish.dietary.join(', ') || 'House Special'}</span>
                      )}

                      {/* Micro actions */}
                      <div className="flex items-center gap-1.5 shrink-0 ml-1">
                        <button
                          onClick={() => handleAdd(dish)}
                          className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold rounded-sm transition-colors min-h-[34px] flex items-center justify-center active:scale-95 ${
                            isAdded
                              ? 'bg-emerald-800 text-white'
                              : 'text-[#c9a84e] hover:text-[#090a0c] hover:bg-[#c9a84e] border border-[#c9a84e]/30'
                          }`}
                          aria-label={`Add ${dish.name} to tasting`}
                        >
                          {isAdded ? 'Added' : '+ Tasting'}
                        </button>
                        <button
                          onClick={() => onSelectItem(dish)}
                          className="text-[#7d7a72] hover:text-[#e6e3dd] p-2 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-sm hover:bg-white/5 active:scale-95 transition-all"
                          aria-label={`View tasting notes for ${dish.name}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Thumbnail Preview Accent */}
                  <div
                    onClick={() => onSelectItem(dish)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm overflow-hidden bg-[#15171d] shrink-0 cursor-pointer border border-white/10 group-hover:border-[#c9a84e]/40 transition-colors"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* =========================================================
             VIEW 2: "PHOTOGRAPHIC DEGUSTATION" (Visual Showcase Cards)
             ========================================================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((dish) => {
              const isAdded = addedIds[dish.id];

              return (
                <article
                  key={dish.id}
                  className="group bg-[#0e0f13] rounded-sm overflow-hidden border border-white/[0.08] hover:border-[#c9a84e]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl"
                >
                  {/* Photo with Overlay */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#14151a]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f13] via-transparent to-transparent opacity-80" />

                    {dish.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] uppercase tracking-wider font-medium text-[#c9a84e] bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-[#c9a84e]/30">
                          {dish.badge}
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 right-3">
                      <span className="font-serif text-xl text-[#f7f5f0] tabular-nums bg-black/70 backdrop-blur-sm px-2.5 py-0.5 rounded-sm">
                        ${dish.price}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-[#7d7a72] uppercase tracking-widest block">
                        {dish.category}
                      </span>
                      <h4
                        onClick={() => onSelectItem(dish)}
                        className="text-base font-serif text-[#f7f5f0] group-hover:text-[#c9a84e] transition-colors cursor-pointer truncate"
                      >
                        {dish.name}
                      </h4>
                      <p className="text-xs text-[#a09d94] line-clamp-2 font-light leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {dish.pairing && (
                      <div className="text-[11px] text-[#d6c48e] italic truncate pt-1 border-t border-white/5 flex items-center gap-1.5">
                        <Wine className="w-3 h-3 text-[#c9a84e] shrink-0" />
                        <span className="truncate">{dish.pairing}</span>
                      </div>
                    )}

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => handleAdd(dish)}
                        className={`flex-1 py-2 px-3 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center gap-1 min-h-[38px] active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-800 text-white'
                            : 'bg-white/[0.04] hover:bg-[#c9a84e] hover:text-[#090a0c] text-[#e6e3dd] border border-white/10 hover:border-transparent'
                        }`}
                        aria-label={`Add ${dish.name} to tasting`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Course</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onSelectItem(dish)}
                        className="p-2 text-[#8c8980] hover:text-[#c9a84e] bg-white/[0.03] rounded-sm transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
                        aria-label={`View ${dish.name} details`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
