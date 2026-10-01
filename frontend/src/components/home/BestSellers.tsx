import React, { useState } from 'react';
import { productsData } from '../../data/mockData';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';
import { Sparkles } from 'lucide-react';

interface BestSellersProps {
  onQuickView: (product: Product) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onQuickView }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | '1-2' | '2-4' | '4-6'>('all');

  const bestSellers = productsData.filter((p) => p.isBestseller || p.rating >= 4.8);

  const filtered = selectedFilter === 'all'
    ? bestSellers.slice(0, 8)
    : bestSellers.filter((p) => {
        if (selectedFilter === '1-2') return p.ageRange.includes('0–') || p.ageRange.includes('1') || p.ageRange.includes('1.5');
        if (selectedFilter === '2-4') return p.ageRange.includes('2') || p.ageRange.includes('3');
        if (selectedFilter === '4-6') return p.ageRange.includes('4') || p.ageRange.includes('5') || p.ageRange.includes('6');
        return true;
      });

  return (
    <section id="bestsellers" className="py-12 sm:py-16 bg-[#FFF4F8] border-y border-[#F1DDE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B43B6B] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E65F8F]" />
              <span>Best Sellers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2B1B24]">
              Parent favourites
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Proven to engage toddlers for hours without meltdowns or screens.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons with click handlers) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-[#B43B6B] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-[#F1DDE6]'
              }`}
            >
              All Ages
            </button>
            <button
              onClick={() => setSelectedFilter('1-2')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                selectedFilter === '1-2'
                  ? 'bg-[#B43B6B] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-[#F1DDE6]'
              }`}
            >
              0–2 Years
            </button>
            <button
              onClick={() => setSelectedFilter('2-4')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                selectedFilter === '2-4'
                  ? 'bg-[#B43B6B] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-[#F1DDE6]'
              }`}
            >
              2–4 Years
            </button>
            <button
              onClick={() => setSelectedFilter('4-6')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                selectedFilter === '4-6'
                  ? 'bg-[#B43B6B] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-[#F1DDE6]'
              }`}
            >
              4–6 Years
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </section>
  );
};
