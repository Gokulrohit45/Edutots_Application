import React from 'react';
import { Category } from '../../types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  onSelect?: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    <div
      onClick={() => onSelect && onSelect(category)}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-[#CFE8F3] hover:border-[#1976A3]/30 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] bg-[#EEF8FD] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/product_busy_binder_1790655651580.jpg';
          }}
        />
        {category.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#1976A3] text-white text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 rounded-md shadow-xs">
            {category.badge}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-[#1976A3]/90 px-2 py-2 text-center text-xs min-[390px]:text-sm font-bold text-white backdrop-blur-[2px] sm:hidden">
          {category.name}
        </div>
      </div>

      <div className="hidden sm:flex p-4 sm:p-5 flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-[#17324D] group-hover:text-[#1976A3] transition-colors">
            {category.name}
          </h3>
          <span className="text-[11px] text-stone-500 font-medium">
            {category.productCount} Items
          </span>
        </div>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
          {category.shortDescription}
        </p>

        <div className="mt-auto pt-3 border-t border-[#CFE8F3] flex items-center justify-between text-xs font-semibold text-[#1976A3]">
          <span>Explore Collection</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
