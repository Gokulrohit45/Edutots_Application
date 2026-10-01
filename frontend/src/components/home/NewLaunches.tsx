import React, { useRef } from 'react';
import { productsData } from '../../data/mockData';
import { ProductCard } from '../common/ProductCard';
import { Product } from '../../types';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface NewLaunchesProps {
  onQuickView: (product: Product) => void;
}

export const NewLaunches: React.FC<NewLaunchesProps> = ({ onQuickView }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const newProducts = productsData.filter((product) => product.isNew || product.badge === 'New Launch');
  const scroll = (direction: 'previous' | 'next') => carouselRef.current?.scrollBy({ left: direction === 'previous' ? -360 : 360, behavior: 'smooth' });

  return (
    <section id="new-launches" className="border-b border-[#F1DDE6] bg-[#FFFAFC] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E65F8F]"><Sparkles className="h-3.5 w-3.5" /><span>New Launches</span></div>
            <h2 className="text-2xl font-bold tracking-tight text-[#2B1B24] sm:text-3xl lg:text-4xl">Freshly created for curious little minds</h2>
            <p className="mt-1 text-sm text-stone-600">Explore our newest developmental activities and learning releases.</p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <a href="/shop?collection=new-launches" className="mr-2 hidden items-center gap-1 text-xs font-bold text-[#B43B6B] hover:underline sm:flex">Shop all <ArrowRight className="h-4 w-4" /></a>
            <button type="button" onClick={() => scroll('previous')} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F1DDE6] bg-white text-[#B43B6B] shadow-sm hover:border-[#D99AAF]" aria-label="Previous new products"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => scroll('next')} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F1DDE6] bg-white text-[#B43B6B] shadow-sm hover:border-[#D99AAF]" aria-label="Next new products"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>

        <div ref={carouselRef} className="no-scrollbar snap-inline -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:gap-6 sm:px-0">
          {newProducts.map((product) => <div key={product.id} className="snap-item w-[84vw] shrink-0 min-[480px]:w-[330px] lg:w-[300px]"><ProductCard product={product} onQuickView={onQuickView} /></div>)}
        </div>
      </div>
    </section>
  );
};