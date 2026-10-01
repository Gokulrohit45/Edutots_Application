import React from 'react';
import { categoriesData } from '../../data/mockData';
import { CategoryCard } from './CategoryCard';
import { Category } from '../../types';

interface ShopByCategoryProps {
  onSelectCategory?: (category: Category) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  return (
    <section id="shop-by-category" className="py-12 sm:py-16 lg:py-20 bg-[#FFFAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-[#B43B6B] mb-2">
            Shop by Category
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2B1B24]">
            Explore by activity
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            From tactile velcro busy binders to mess-free static sticker books and travel busy boxes.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categoriesData.map((category) => (
            <CategoryCard key={category.id} category={category} onSelect={onSelectCategory} />
          ))}
        </div>
      </div>
    </section>
  );
};
