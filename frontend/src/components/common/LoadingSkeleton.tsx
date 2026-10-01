import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#F1DDE6] overflow-hidden p-3.5 flex flex-col animate-pulse">
      <div className="w-full aspect-[4/3] bg-stone-100 rounded-xl mb-3.5" />
      <div className="h-3 bg-stone-100 rounded w-1/3 mb-2" />
      <div className="h-5 bg-stone-100 rounded w-4/5 mb-3" />
      <div className="h-3 bg-stone-100 rounded w-1/2 mb-4" />
      <div className="mt-auto flex items-center justify-between pt-2 border-t border-stone-100">
        <div className="h-5 bg-stone-100 rounded w-16" />
        <div className="h-8 bg-stone-100 rounded-lg w-20" />
      </div>
    </div>
  );
};
