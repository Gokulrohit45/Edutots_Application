import React from 'react';
import { AgeGroup } from '../../types';
import { ArrowRight } from 'lucide-react';

interface AgeCardProps {
  ageGroup: AgeGroup;
  onSelect?: (ageGroup: AgeGroup) => void;
}

export const AgeCard: React.FC<AgeCardProps> = ({ ageGroup, onSelect }) => {
  return (
    <div
      id={ageGroup.slug}
      onClick={() => onSelect && onSelect(ageGroup)}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#CFE8F3] hover:border-[#1976A3]/30 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Visual Header */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] bg-[#EEF8FD] overflow-hidden">
        <img
          src={ageGroup.image}
          alt={ageGroup.label}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/product_busy_binder_1790655651580.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-80 sm:opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Age Indicator Floating Pill */}
        <div className="absolute bottom-0 inset-x-0 sm:inset-x-auto sm:bottom-auto sm:top-3 sm:left-3 bg-[#1976A3]/90 sm:bg-white/95 backdrop-blur-sm px-2 py-2 sm:px-3 sm:py-1 sm:rounded-xl text-center text-xs sm:text-left font-bold text-white sm:text-[#1976A3] shadow-xs">
          {ageGroup.label}
        </div>
      </div>

      {/* Content */}
      <div className="hidden sm:flex p-4 sm:p-5 flex-col flex-1">
        <h3 className="text-base sm:text-lg font-bold text-[#17324D] group-hover:text-[#1976A3] transition-colors">
          {ageGroup.sublabel}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
          {ageGroup.description}
        </p>

        <div className="mt-auto pt-4 border-t border-[#CFE8F3] flex items-center justify-between text-xs font-semibold text-[#1976A3]">
          <span>{ageGroup.popularProductCount} Activities</span>
          <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
