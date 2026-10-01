import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { productsData, ageGroupsData, categoriesData } from '../../data/mockData';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const filteredProducts = trimmed
    ? productsData.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.ageRange.toLowerCase().includes(trimmed) ||
          p.skills.some((s) => s.toLowerCase().includes(trimmed))
        );
      })
    : [];

  const matchedAgeGroups = trimmed
    ? ageGroupsData.filter((a) => a.label.toLowerCase().includes(trimmed) || a.description.toLowerCase().includes(trimmed))
    : [];

  const quickPicks = [
    { label: 'Ages 2–4 Years', q: '2-4' },
    { label: 'Activity Binders', q: 'binder' },
    { label: 'Flashcards', q: 'flashcards' },
    { label: 'Pre-Writing', q: 'pre-writing' },
    { label: 'Screen-Free', q: 'busy' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#2B1B24]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl mx-auto bg-white h-dvh sm:h-auto sm:max-h-[calc(100dvh-4rem)] rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col mt-0 sm:mt-8 border border-[#F1DDE6]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-5 border-b border-[#F1DDE6] bg-[#FFFAFC]">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by age (e.g. 2 years), activity, or skill..."
            className="min-w-0 w-full text-sm sm:text-lg bg-transparent text-[#2B1B24] placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 p-1 text-sm font-medium"
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-stone-500 hover:text-[#2B1B24] rounded-full hover:bg-stone-100 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto overscroll-contain">
          {!trimmed ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {quickPicks.map((pick) => (
                    <button
                      key={pick.label}
                      onClick={() => setQuery(pick.q)}
                      className="px-3.5 py-1.5 text-xs font-medium bg-[#FFF4F8] hover:bg-[#FCE7F0] hover:text-[#B43B6B] text-stone-700 rounded-lg transition-colors border border-[#F1DDE6]"
                    >
                      {pick.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">Shop by Child's Stage</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {ageGroupsData.map((age) => (
                    <a
                      key={age.id}
                      href={`#${age.slug}`}
                      onClick={onClose}
                      className="p-3 bg-[#FFFAFC] hover:bg-[#FCE7F0]/60 border border-[#F1DDE6] rounded-xl text-left transition-colors group"
                    >
                      <span className="block text-sm font-bold text-[#2B1B24] group-hover:text-[#B43B6B]">{age.label}</span>
                      <span className="block text-[11px] text-stone-500 mt-0.5 line-clamp-1">{age.sublabel}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {matchedAgeGroups.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Age Stages Matching "{query}"</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedAgeGroups.map((age) => (
                      <a
                        key={age.id}
                        href="#shop-by-age"
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#FCE7F0]/60 border border-[#B43B6B]/15 hover:bg-[#FCE7F0] transition-colors"
                      >
                        <div>
                          <p className="text-sm font-bold text-[#B43B6B]">{age.label}</p>
                          <p className="text-xs text-stone-600 line-clamp-1">{age.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#B43B6B] shrink-0 ml-2" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                  Products ({filteredProducts.length})
                </p>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-10 bg-[#FFFAFC] rounded-2xl border border-dashed border-[#F1DDE6]">
                    <Sparkles className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                    <p className="text-sm font-medium text-stone-700">No matching activities found</p>
                    <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                      Try searching for "binder", "flashcards", "toddler", or select an age group above.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-xl hover:bg-[#FFF4F8] border border-[#F1DDE6] transition-colors group cursor-pointer"
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                      >
                        <div className="w-14 h-14 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200/60">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/src/assets/images/product_busy_binder_1790655651580.jpg';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[11px] text-stone-500">
                            <span>{product.ageRange}</span>
                            <span>·</span>
                            <span>{product.category}</span>
                          </div>
                          <p className="text-sm font-semibold text-[#2B1B24] truncate group-hover:text-[#B43B6B]">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm font-bold text-[#2B1B24]">₹{product.price}</span>
                            <span className="text-xs text-stone-400 line-through">₹{product.mrp}</span>
                            <span className="text-[11px] text-[#B43B6B] font-medium">Save ₹{product.mrp - product.price}</span>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="px-2.5 sm:px-3 py-2 text-xs font-semibold bg-[#B43B6B] text-white rounded-lg hover:bg-[#922C55] transition-colors"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
