import React, { useRef } from 'react';
import { reviewsData } from '../../data/mockData';
import { ReviewCard } from './ReviewCard';
import { ChevronLeft, ChevronRight, ShieldCheck, Star } from 'lucide-react';

export const Reviews: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'previous' | 'next') => carouselRef.current?.scrollBy({ left: direction === 'previous' ? -360 : 360, behavior: 'smooth' });

  return (
    <section id="reviews" className="border-t border-[#F1DDE6] bg-[#FFF4F8] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B43B6B]">
              <div className="flex text-[#E65F8F]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-3.5 w-3.5 fill-current" />)}</div><span>4.9 / 5 Parent Rating</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#2B1B24] sm:text-3xl lg:text-4xl">Little learners. Happy parents.</h2>
            <p className="mt-2 text-sm text-stone-600 sm:text-base">Real stories from families enjoying calmer, screen-free playtime.</p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button type="button" onClick={() => scroll('previous')} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F1DDE6] bg-white text-[#B43B6B] shadow-sm hover:border-[#D99AAF]" aria-label="Previous reviews"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => scroll('next')} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F1DDE6] bg-white text-[#B43B6B] shadow-sm hover:border-[#D99AAF]" aria-label="Next reviews"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>

        <div ref={carouselRef} className="no-scrollbar snap-inline -mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:gap-6 sm:px-0">
          {reviewsData.map((review) => <div key={review.id} className="snap-item w-[86vw] shrink-0 sm:w-[360px] lg:w-[380px]"><ReviewCard review={review} /></div>)}
        </div>

        <div className="mx-auto mt-7 flex max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl border border-[#F1DDE6] bg-white p-4 text-center sm:flex-row sm:p-5 sm:text-left">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FCE7F0] text-[#B43B6B]"><ShieldCheck className="h-5 w-5" /></div><div><p className="text-sm font-bold text-[#2B1B24]">Verified WhatsApp Orders</p><p className="text-xs text-stone-500">Every testimonial comes from an authenticated family order.</p></div></div>
          <span className="rounded-xl bg-[#FCE7F0] px-3 py-1.5 text-xs font-bold text-[#B43B6B]">100% Genuine Reviews</span>
        </div>
      </div>
    </section>
  );
};