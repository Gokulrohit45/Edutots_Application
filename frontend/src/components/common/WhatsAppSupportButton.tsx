import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig, defaultWhatsAppMessages } from '../../config/siteConfig';

export const WhatsAppSupportButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleSupportClick = () => {
    const cleanPhone = siteConfig.whatsappSupportNumber.replace(/\D/g, '');
    const encoded = encodeURIComponent(defaultWhatsAppMessages.supportQuery);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Tooltip / Prompt bubble */}
      {showTooltip && (
        <div className="pointer-events-auto mb-2 flex items-center gap-2 px-3 py-2 bg-white text-[#2B1B24] rounded-2xl shadow-lg border border-[#F1DDE6] text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[210px]">
          <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
          <span className="line-clamp-1">Chat with us on WhatsApp</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-stone-400 hover:text-stone-700 p-0.5"
            aria-label="Dismiss help bubble"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating WhatsApp Button */}
      <button
        type="button"
        onClick={handleSupportClick}
        aria-label="Chat with EDUTOTS on WhatsApp"
        className="pointer-events-auto h-12 px-4 sm:h-13 sm:px-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center gap-2.5 shadow-lg shadow-black/15 transition-all hover:scale-102 active:scale-97"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs sm:text-sm font-bold tracking-tight">Need help on WhatsApp</span>
      </button>
    </div>
  );
};
