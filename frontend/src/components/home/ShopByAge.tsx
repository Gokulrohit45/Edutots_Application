import React from 'react';
import { ageGroupsData } from '../../data/mockData';
import { AgeCard } from './AgeCard';
import { AgeGroup } from '../../types';

interface ShopByAgeProps {
  onSelectAge?: (ageGroup: AgeGroup) => void;
}

export const ShopByAge: React.FC<ShopByAgeProps> = ({ onSelectAge }) => {
  return (
    <section id="shop-by-age" className="py-12 sm:py-16 lg:py-20 bg-[#F7FCFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-[#1976A3] mb-2">
            Shop by Age
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17324D] text-balance">
            Find the right activity for their age
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Thoughtfully chosen activities for every little stage — from infant visual focus to preschool pen control.
          </p>
        </div>

        {/* 4 Age Group Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {ageGroupsData.map((ageGroup) => (
            <AgeCard key={ageGroup.id} ageGroup={ageGroup} onSelect={onSelectAge} />
          ))}
        </div>
      </div>
    </section>
  );
};
