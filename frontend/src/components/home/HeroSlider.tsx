import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { heroSlidesData } from '../../data/mockData';

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setCurrentSlide((current) => (current + 1) % heroSlidesData.length), 6500);
    return () => window.clearTimeout(timer);
  }, [currentSlide]);

  const goTo = (direction: number) => {
    setCurrentSlide((current) => (current + direction + heroSlidesData.length) % heroSlidesData.length);
  };

  const slide = heroSlidesData[currentSlide];
  const offer = ['Play more, save more', 'Growing with every stage', 'Learn, grow and thrive'][currentSlide];

  return (
    <section aria-roledescription="carousel" aria-label="Featured EDUTOTS collections" className="relative overflow-hidden border-b border-[#F1DDE6] bg-[#FFF4F8]">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#F9C9DB]/55 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-[#F5AFC8]/35 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid min-h-[520px] items-center gap-7 overflow-hidden rounded-[2rem] border border-white/80 bg-[#FFFAFC] shadow-[0_24px_70px_rgba(180,59,107,0.10)] lg:grid-cols-12 lg:gap-0">
          <div className="relative z-10 px-5 pb-2 pt-7 text-center sm:px-10 lg:col-span-6 lg:px-14 lg:py-14 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EDB6CB] bg-[#FCE7F0] px-3 py-1.5 text-xs font-semibold text-[#922C55]">
              <Sparkles className="h-3.5 w-3.5" />{slide.badgeText}
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#B43B6B]">{offer}</p>
            <h1 className="mt-2 text-4xl font-bold leading-[1.05] text-[#2B1B24] sm:text-5xl lg:text-6xl">{slide.headline}</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base lg:mx-0 lg:text-lg">{slide.supportingText}</p>

            {slide.benefits && <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-stone-700 lg:justify-start">{slide.benefits.slice(0, 3).map((benefit) => <span key={benefit} className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#E65F8F]" />{benefit}</span>)}</div>}

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a href={slide.primaryCtaAction} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#B43B6B] px-7 text-sm font-bold text-white shadow-lg shadow-[#B43B6B]/15 transition-all hover:-translate-y-0.5 hover:bg-[#922C55]">{slide.primaryCtaText}<ArrowRight className="h-4 w-4" /></a>
              {slide.secondaryCtaText && <a href={slide.secondaryCtaAction} className="flex min-h-12 items-center justify-center rounded-xl border border-[#E9C8D5] bg-white px-7 text-sm font-bold text-[#2B1B24] transition-colors hover:bg-[#FFF4F8]">{slide.secondaryCtaText}</a>}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-500 lg:justify-start sm:text-xs">
              <span className="flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5 text-[#B43B6B]" />Reusable activities</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#B43B6B]" />Child-safe materials</span>
            </div>
          </div>

          <div className="relative h-full min-h-[340px] overflow-hidden lg:col-span-6 lg:min-h-[520px]">
            <img key={slide.id} src={slide.image} alt={slide.headline} className="absolute inset-0 h-full w-full object-cover animate-in fade-in duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1B24]/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#FFFAFC] lg:via-transparent lg:to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:left-auto sm:max-w-sm">
              <p className="text-sm font-bold text-[#2B1B24]">Playful learning, thoughtfully made</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-600">Designed for little hands, repeat play and everyday parent peace of mind.</p>
            </div>
          </div>
        </div>

        <button type="button" onClick={() => goTo(-1)} className="absolute left-1.5 top-1/2 flex h-9 w-9 sm:left-5 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F1DDE6] bg-white text-[#B43B6B] shadow-lg transition-transform hover:scale-105 lg:left-2" aria-label="Previous slide"><ChevronLeft className="h-5 w-5" /></button>
        <button type="button" onClick={() => goTo(1)} className="absolute right-1.5 top-1/2 flex h-9 w-9 sm:right-5 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#F1DDE6] bg-white text-[#B43B6B] shadow-lg transition-transform hover:scale-105 lg:right-2" aria-label="Next slide"><ChevronRight className="h-5 w-5" /></button>

        <div className="mt-5 flex items-center justify-center gap-2">{heroSlidesData.map((item, index) => <button key={item.id} type="button" onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-[#B43B6B]' : 'w-2 bg-[#DDB9C7] hover:bg-[#C9839F]'}`} aria-label={`Go to slide ${index + 1}`} aria-current={index === currentSlide} />)}</div>
      </div>
    </section>
  );
};