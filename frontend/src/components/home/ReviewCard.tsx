import React from 'react';
import { Review } from '../../types';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#F1DDE6] hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Stars & Date */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center text-[#E65F8F]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? 'fill-current' : 'text-stone-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-stone-400">{review.date}</span>
      </div>

      {/* Review Text */}
      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4 flex-1">
        "{review.text}"
      </p>

      {/* Author Lockup */}
      <div className="pt-3 border-t border-[#F1DDE6]">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-[#2B1B24]">
              {review.author}
            </span>
            {review.verified && (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-[#B43B6B] bg-[#FCE7F0] px-1.5 py-0.2 rounded">
                <CheckCircle className="w-2.5 h-2.5" />
                Verified
              </span>
            )}
          </div>
          <span className="text-[11px] text-stone-400">{review.authorLocation}</span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-500">
          <span>{review.childAge}</span>
          <span className="truncate max-w-[150px] text-stone-600 font-medium">
            {review.productPurchased}
          </span>
        </div>
      </div>
    </div>
  );
};
