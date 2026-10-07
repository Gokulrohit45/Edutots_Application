import React from 'react';
import { instagramCommunityPosts } from '../../data/mockData';
import { Heart, Instagram } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F7FCFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1976A3] mb-2">
            <Instagram className="w-3.5 h-3.5 text-[#38A9D6]" />
            <span>@edutots.learning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17324D]">
            Growing little minds, one activity at a time.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Join our community of over 35,000+ parents sharing real daily routines, milestones, and calm playtime.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {instagramCommunityPosts.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-[#CFE8F3] aspect-square flex flex-col"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/src/assets/images/product_busy_binder_1790655651580.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 p-2.5 sm:p-4 flex flex-col justify-end text-white">
                <p className="text-[11px] font-bold text-amber-300 mb-1">{post.author}</p>
                <p className="text-[11px] sm:text-xs text-stone-200 line-clamp-3 leading-snug">
                  {post.caption}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-stone-300 mt-2">
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  <span>{post.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
