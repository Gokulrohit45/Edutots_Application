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
      className="group bg-white rounded-3xl border border-[#F1DDE6] hover:border-[#B43B6B]/30 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="relative w-full aspect-[4/3] bg-[#FFF4F8] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/product_busy_binder_1790655651580.jpg';
          }}
        />
        {category.badge && (
          <div className="absolute top-3 left-3 bg-[#B43B6B] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs">
            {category.badge}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-[#2B1B24] group-hover:text-[#B43B6B] transition-colors">
            {category.name}
          </h3>
          <span className="text-[11px] text-stone-500 font-medium">
            {category.productCount} Items
          </span>
        </div>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
          {category.shortDescription}
        </p>

        <div className="mt-auto pt-3 border-t border-[#F1DDE6] flex items-center justify-between text-xs font-semibold text-[#B43B6B]">
          <span>Explore Collection</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
