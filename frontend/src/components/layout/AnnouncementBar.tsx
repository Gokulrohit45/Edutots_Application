import React, { useState, useEffect } from 'react';
import { siteConfig } from '../../config/siteConfig';
import { X, ChevronRight, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const messages = siteConfig.announcementBar.messages;

  useEffect(() => {
    if (messages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [messages.length]);

  if (!siteConfig.announcementBar.enabled || isDismissed) {
    return null;
  }

  return (
    <aside aria-label="Store announcement" className="bg-[#B43B6B] text-[#FCE7F0] px-4 py-2 text-xs font-medium relative z-40 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        <div className="w-6 shrink-0 hidden sm:block">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD0E0]" />
        </div>

        <div className="flex-1 text-center truncate">
          <span className="inline-block transition-opacity duration-300">
            {messages[currentIdx]}
          </span>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="text-[#FCE7F0]/70 hover:text-white p-1 rounded-md transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
