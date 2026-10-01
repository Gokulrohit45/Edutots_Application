import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { X, Check, Star, ShieldCheck, RefreshCw, Box, Sparkles, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const text = `Hello Edutots! 👋\n\nI would like to order:\n*${product.name}*\nAge: ${product.ageRange}\nQuantity: ${quantity}\nPrice: ₹${product.price} × ${quantity} = ₹${product.price * quantity}\n\nPlease confirm availability and payment details. Thank you!`;
    const cleanPhone = siteConfig.whatsappOrderNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white h-dvh sm:h-auto rounded-none sm:rounded-3xl shadow-2xl overflow-hidden max-h-dvh sm:max-h-[92vh] flex flex-col border border-[#F1DDE6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-stone-600 hover:text-stone-950 flex items-center justify-center border border-[#F1DDE6] shadow-sm transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto overscroll-contain p-3 pt-14 sm:p-6 space-y-5">
          {/* Gallery + Top Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
            {/* Gallery */}
            <div className="space-y-2.5">
              <div className="w-full aspect-[4/3] rounded-2xl bg-[#FFF4F8] overflow-hidden border border-[#F1DDE6] relative">
                <img
                  src={product.images[selectedImg] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/product_busy_binder_1790655651580.jpg';
                  }}
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#B43B6B] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
                        selectedImg === idx ? 'border-[#B43B6B]' : 'border-stone-200'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Core Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B43B6B]">
                <span>{product.ageRange}</span>
                <span>·</span>
                <span className="text-stone-500 font-normal">{product.category}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#2B1B24] leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center text-[#E65F8F]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-stone-800 ml-1">{product.rating}</span>
                </div>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-stone-500">{product.reviewCount} verified parent reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 pt-1">
                <span className="text-2xl font-bold text-[#2B1B24]">₹{product.price}</span>
                <span className="text-sm text-stone-400 line-through">₹{product.mrp}</span>
                <span className="text-xs font-semibold text-[#B43B6B] bg-[#FCE7F0] px-2 py-0.5 rounded-md">
                  Save ₹{product.mrp - product.price}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Key Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-[#F1DDE6] text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-[#B43B6B] shrink-0" />
                  <span>100% Reusable & wipe-clean material</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B43B6B] shrink-0" />
                  <span>Curved child-safe safety corners (No sharp edges)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Box className="w-3.5 h-3.5 text-[#B43B6B] shrink-0" />
                  <span>Direct WhatsApp ordering — No online payment gateway</span>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          {product.includedItems && product.includedItems.length > 0 && (
            <div className="bg-[#FFF4F8] p-4 rounded-2xl border border-[#F1DDE6]">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E65F8F]" />
                Everything inside the box:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600">
                {product.includedItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#B43B6B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-3 border-t border-[#F1DDE6] flex flex-col md:flex-row items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center border border-[#F1DDE6] rounded-xl bg-[#FFFAFC] p-1 w-full md:w-auto justify-between md:justify-start">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-black font-semibold rounded-lg hover:bg-stone-100"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-black font-semibold rounded-lg hover:bg-stone-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full md:flex-1 h-12 bg-[#B43B6B] hover:bg-[#922C55] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              Add to Cart · ₹{product.price * quantity}
            </button>

            {/* Direct WhatsApp Order */}
            <button
              onClick={handleDirectWhatsApp}
              className="w-full md:w-auto h-12 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0"
              title="Order directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
