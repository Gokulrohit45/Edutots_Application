import React, { useState } from 'react';
import { productsData } from '../../data/mockData';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';
import { ArrowRight, Sparkles } from 'lucide-react';

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

  const filters = [
    ['all', 'All Ages'],
    ['1-2', '0–2 Years'],
    ['2-4', '2–4 Years'],
    ['4-6', '4–6 Years'],
  ] as const;

  return (
    <section id="bestsellers" className="py-12 sm:py-16 bg-[#EEF8FD] border-y border-[#CFE8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1976A3] mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#38A9D6]" />
                <span>Best Sellers</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17324D]">
                Parent favourites
              </h2>
              <p className="text-sm text-stone-600 mt-1 max-w-xl">
                Proven to engage toddlers for hours without meltdowns or screens.
              </p>
            </div>
            <a href="/shop?sort=bestsellers" className="mt-1 flex shrink-0 items-center gap-1 text-sm font-bold text-[#1976A3] hover:underline sm:text-base">
              View All <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-5 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar md:justify-end">
            {filters.map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSelectedFilter(value)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                  selectedFilter === value
                    ? 'bg-[#1976A3] text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-[#CFE8F3]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="w-[82vw] max-w-[320px] shrink-0 snap-start sm:w-auto sm:max-w-none">
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
