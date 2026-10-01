import React, { useRef } from 'react';
import { bundlesData } from '../../data/mockData';
import { BundleCard } from './BundleCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const BundlesSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="bundles" className="py-12 sm:py-16 bg-[#FFF0F5]/60 border-b border-[#F1DDE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E65F8F] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bundles &amp; Combos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2B1B24]">
              More learning, better value
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Specially bundled activity packs designed to grow with your child while saving you up to ₹750.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#F1DDE6] bg-white text-stone-700 hover:text-black hover:border-stone-400 flex items-center justify-center transition-colors shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#F1DDE6] bg-white text-stone-700 hover:text-black hover:border-stone-400 flex items-center justify-center transition-colors shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar snap-inline -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {bundlesData.map((bundle) => (
            <div
              key={bundle.id}
              className="w-[84vw] sm:w-[360px] lg:w-[380px] shrink-0 snap-item"
            >
              <BundleCard bundle={bundle} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
