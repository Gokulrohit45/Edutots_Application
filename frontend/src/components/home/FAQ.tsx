import React, { useState } from 'react';
import { faqsData } from '../../data/mockData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-[#EEF8FD] border-t border-[#CFE8F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1976A3] mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#38A9D6]" />
            <span>FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17324D]">
            Frequently asked questions
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Everything you need to know about our screen-free activities, reusability, and direct WhatsApp ordering.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#CFE8F3] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#17324D] hover:text-[#1976A3] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#EEF8FD] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#DDF2FA] text-[#1976A3]' : 'text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-[#CFE8F3]/50 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions? */}
        <div className="mt-8 sm:mt-10 p-5 rounded-2xl bg-white border border-[#CFE8F3] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-[#17324D]">Still have a specific question about your child?</h4>
            <p className="text-xs text-stone-500 mt-0.5">We are happy to suggest exact activity levels matching your child's interests.</p>
          </div>
          <a
            href={`https://wa.me/${siteConfig.whatsappSupportNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
              'Hi Edutots! I have a question about choosing an activity.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Ask Us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
