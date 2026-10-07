import React from 'react';
import { Sparkles, EyeOff, Hand, RefreshCw, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: EyeOff,
      title: '100% Screen-Free Play',
      description: 'Replace addictive screens and YouTube tantrums with tangible, tactile discovery that holds organic attention.',
      color: 'bg-[#DDF2FA] text-[#1976A3]',
    },
    {
      icon: Hand,
      title: 'Engineered for Little Hands',
      description: 'Chunky rounded corners, easy-peel velcro cutouts, and saliva-safe materials crafted for developing pincer grips.',
      color: 'bg-[#FFF0F5] text-[#38A9D6]',
    },
    {
      icon: RefreshCw,
      title: 'Infinitely Reusable',
      description: 'Heavy-duty 350+ micron lamination wipes clean like brand new. Use it for 100+ play sessions and pass it to siblings.',
      color: 'bg-[#F2F6F9] text-[#3B6978]',
    },
    {
      icon: Sparkles,
      title: 'Montessori-Aligned Logic',
      description: 'Designed in collaboration with early childhood educators to target specific neurological milestones step-by-step.',
      color: 'bg-[#FFF9EA] text-[#B88728]',
    },
    {
      icon: HeartHandshake,
      title: 'Loved by 12,000+ Mindful Parents',
      description: 'Real parents across India rely on EDUTOTS for quiet mornings, restaurant survival, and joyful developmental milestones.',
      color: 'bg-[#FBF1F1] text-[#A84B4B]',
    },
  ];

  return (
    <section id="about-us" className="py-12 sm:py-16 lg:py-20 bg-[#F7FCFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-[#1976A3] mb-2">
            The EDUTOTS Difference
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17324D]">
            Why mindful parents choose EDUTOTS
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Not a toy store. A developmental learning partner for your child's most critical formative years.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#CFE8F3] hover:shadow-md transition-all duration-300 flex flex-col text-left"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${reason.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#17324D] mb-1.5 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
