import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Star, Eye, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, items } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const cartItem = items.find((i) => i.product.id === product.id);
  const isAdded = Boolean(cartItem);

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];
  const displayImage = isHovered && secondaryImage ? secondaryImage : primaryImage;

  const savings = Math.max(0, product.mrp - product.price);

  return (
    <article
      className="group bg-white rounded-2xl border border-[#F1DDE6] hover:border-[#E8C8D5] hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Visual Area */}
      <div className="relative w-full aspect-[4/3] bg-[#FFF4F8] overflow-hidden">
        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 z-10 text-[11px] font-semibold tracking-tight px-2.5 py-1 rounded-md shadow-xs ${
              product.badge === 'Bestseller'
                ? 'bg-[#B43B6B] text-white'
                : product.badge === 'New Launch'
                ? 'bg-[#E65F8F] text-white'
                : 'bg-white text-stone-800 border border-stone-200'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Quick View Button */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full bg-white/90 text-stone-700 hover:text-[#2B1B24] hover:bg-white flex items-center justify-center shadow-xs opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Image */}
        <div
          className="w-full h-full cursor-pointer"
          onClick={() => onQuickView && onQuickView(product)}
        >
          {!imgError ? (
            <img
              src={displayImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-stone-100 text-stone-500">
              <span className="text-2xl mb-1">🧸</span>
              <span className="text-xs font-medium">{product.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Unboxed Metadata Header */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#B43B6B] uppercase tracking-wider mb-1">
          <span>{product.ageRange}</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="text-stone-500 font-normal normal-case">{product.category}</span>
        </div>

        {/* Product Title */}
        <h3
          className="text-sm sm:text-base font-semibold text-[#2B1B24] line-clamp-2 leading-snug cursor-pointer hover:text-[#B43B6B] transition-colors mb-1.5"
          onClick={() => onQuickView && onQuickView(product)}
        >
          {product.name}
        </h3>

        {/* Short Benefit / Skills */}
        <p className="text-xs text-stone-500 line-clamp-1 mb-2.5">
          {product.skills.slice(0, 2).join(' · ')}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3 text-xs">
          <div className="flex items-center text-[#E65F8F]">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold text-stone-800 ml-1">{product.rating}</span>
          </div>
          <span className="text-stone-400">({product.reviewCount})</span>
        </div>

        {/* Price & Action Row */}
        <div className="mt-auto pt-2.5 border-t border-[#F1DDE6] flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#2B1B24] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            </div>
            {savings > 0 && (
              <span className="text-[11px] font-semibold text-[#B43B6B]">
                Save ₹{savings}
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            className={`min-h-10 px-3 sm:px-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shrink-0 ${
              isAdded
                ? 'bg-[#FCE7F0] text-[#B43B6B] hover:bg-[#F7D3E0]'
                : 'bg-[#B43B6B] text-white hover:bg-[#922C55] shadow-xs active:scale-97'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{cartItem?.quantity} in Cart</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
