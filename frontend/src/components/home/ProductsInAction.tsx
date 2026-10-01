import React, { useState } from 'react';
import { productsData } from '../../data/mockData';
import { Product } from '../../types';
import { Play, Sparkles, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ProductsInActionProps {
  onQuickView: (product: Product) => void;
}

export const ProductsInAction: React.FC<ProductsInActionProps> = ({ onQuickView }) => {
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    product: Product;
    thumbnail: string;
  } | null>(null);

  const { addToCart } = useCart();

  const videoProducts = productsData.filter((p) => Boolean(p.video)).slice(0, 3);

  return (
    <section id="products-in-action" className="py-12 sm:py-16 bg-[#FFF4F8] border-y border-[#F1DDE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B43B6B] mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E65F8F]" />
            <span>Real Play Sessions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2B1B24]">
            See learning in action
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Watch real toddlers engaging with EDUTOTS binders and materials. Zero force, pure natural curiosity.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {videoProducts.map((product) => {
            const video = product.video!;
            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl border border-[#F1DDE6] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Video Thumbnail with Play Button */}
                <div
                  className="relative w-full aspect-[16/10] bg-stone-900 cursor-pointer overflow-hidden"
                  onClick={() =>
                    setActiveVideo({
                      title: video.title,
                      product,
                      thumbnail: video.thumbnail,
                    })
                  }
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/src/assets/images/product_busy_binder_1790655651580.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />

                  {/* Play Button Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-white/95 text-[#B43B6B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Pill */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-md">
                    {video.duration}
                  </div>
                </div>

                {/* Info & Product Link */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#B43B6B] mb-1">
                    <span>{product.ageRange}</span>
                    <span>·</span>
                    <span className="text-stone-500 font-normal">{product.category}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#2B1B24] line-clamp-2 mb-3">
                    {video.title}
                  </p>

                  <div className="mt-auto pt-3 border-t border-[#F1DDE6] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-500 block">Featured Activity:</span>
                      <span className="text-xs font-bold text-stone-900 line-clamp-1">{product.name}</span>
                    </div>

                    <button
                      onClick={() => onQuickView(product)}
                      className="px-3 py-1.5 text-xs font-semibold bg-[#FCE7F0] text-[#B43B6B] hover:bg-[#B43B6B] hover:text-white rounded-lg transition-colors flex items-center gap-1 shrink-0 ml-2"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Simulation Modal */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[calc(100dvh-1rem)] bg-stone-950 rounded-2xl sm:rounded-3xl overflow-y-auto shadow-2xl border border-stone-800 text-white">
              {/* Close */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Simulated Player */}
              <div className="relative aspect-[16/9] bg-stone-900 flex items-center justify-center">
                <img
                  src={activeVideo.thumbnail}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-radial from-transparent to-black/60" />
                <div className="absolute text-center p-6 space-y-2 max-w-md">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                  <p className="text-sm font-semibold">{activeVideo.title}</p>
                  <p className="text-xs text-stone-300">
                    Parent demo showing tactile velcro pieces & erasable tracing in action.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left w-full sm:w-auto">
                  <p className="text-xs text-stone-400">Featured In Video</p>
                  <p className="text-sm font-bold text-white">{activeVideo.product.name} (₹{activeVideo.product.price})</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      addToCart(activeVideo.product, 1);
                      setActiveVideo(null);
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#B43B6B] text-white text-xs font-semibold rounded-xl hover:bg-[#922C55]"
                  >
                    + Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      const prod = activeVideo.product;
                      setActiveVideo(null);
                      onQuickView(prod);
                    }}
                    className="px-4 py-2.5 border border-stone-700 text-stone-300 hover:text-white text-xs font-semibold rounded-xl"
                  >
                    Product Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
