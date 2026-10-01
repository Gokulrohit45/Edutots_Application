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
      className="group relative bg-white rounded-3xl border border-[#F1DDE6] hover:border-[#B43B6B]/30 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Visual Header */}
      <div className="relative w-full aspect-[4/3] bg-[#FFF4F8] overflow-hidden">
        <img
          src={ageGroup.image}
          alt={ageGroup.label}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/product_busy_binder_1790655651580.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Age Indicator Floating Pill */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-bold text-[#B43B6B] shadow-xs">
          {ageGroup.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-bold text-[#2B1B24] group-hover:text-[#B43B6B] transition-colors">
          {ageGroup.sublabel}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
          {ageGroup.description}
        </p>

        <div className="mt-auto pt-4 border-t border-[#F1DDE6] flex items-center justify-between text-xs font-semibold text-[#B43B6B]">
          <span>{ageGroup.popularProductCount} Activities</span>
          <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
