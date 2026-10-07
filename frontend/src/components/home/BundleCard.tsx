import React from 'react';
import { Bundle, Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Check, Sparkles, Plus } from 'lucide-react';

interface BundleCardProps {
  bundle: Bundle;
}

export const BundleCard: React.FC<BundleCardProps> = ({ bundle }) => {
  const { addToCart } = useCart();

  const handleAddBundle = () => {
    // Transform bundle into product model for cart
    const bundleAsProduct: Product = {
      id: bundle.id,
      slug: bundle.slug,
      name: bundle.name,
      shortDescription: bundle.shortDescription,
      ageRange: bundle.ageRange,
      ageGroupSlug: 'bundles',
      category: 'Bundles & Combos',
      categorySlug: 'bundles',
      skills: bundle.skills,
      images: [bundle.image],
      mrp: bundle.mrp,
      price: bundle.price,
      rating: 4.9,
      reviewCount: 48,
      stock: 15,
      badge: 'Value Combo',
      includedItems: bundle.includedProducts,
      reusable: true,
    };
    addToCart(bundleAsProduct, 1);
  };

  return (
    <div className="bg-white rounded-3xl border border-[#CFE8F3] hover:border-[#1976A3]/30 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Visual Header */}
      <div className="relative w-full aspect-[16/10] bg-[#EEF8FD] overflow-hidden">
        <img
          src={bundle.image}
          alt={bundle.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover hover:scale-104 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/src/assets/images/bundle_learning_box_1790655683559.jpg';
          }}
        />
        {bundle.badge && (
          <div className="absolute top-3 left-3 bg-[#38A9D6] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{bundle.badge}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#1976A3] mb-1">
          Ages {bundle.ageRange}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#17324D] mb-1.5">
          {bundle.name}
        </h3>

        <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
          {bundle.shortDescription}
        </p>

        {/* Included Items Checklist */}
        <div className="bg-[#EEF8FD] p-3 rounded-xl mb-4 border border-[#CFE8F3]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
            Included in this bundle:
          </p>
          <ul className="space-y-1">
            {bundle.includedProducts.map((item, idx) => (
              <li key={idx} className="flex items-center gap-1.5 text-xs text-stone-700">
                <Check className="w-3.5 h-3.5 text-[#1976A3] shrink-0" />
                <span className="truncate">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto pt-3 border-t border-[#CFE8F3] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-[#17324D] tabular-nums">
                ₹{bundle.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ₹{bundle.mrp.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#1976A3]">
              Save ₹{bundle.savings.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={handleAddBundle}
            className="px-4 py-2.5 bg-[#1976A3] hover:bg-[#125A7A] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors active:scale-97"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Combo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
