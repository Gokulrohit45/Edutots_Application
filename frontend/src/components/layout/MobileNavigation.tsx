import React from 'react';
import { ChevronRight, Gift, Grid2X2, Home, Info, Instagram, Layers3, MessageCircle, ShoppingBag, Sparkles, X } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const number = siteConfig.whatsappSupportNumber.replace(/\D/g, '');
  const whatsapp = (message: string) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const itemClass = 'flex min-h-12 items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-800 transition-colors hover:bg-[#FFF4F8] hover:text-[#B43B6B]';

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs" onClick={onClose}>
      <aside aria-label="Mobile navigation" className="flex h-dvh w-[min(88vw,23rem)] flex-col overflow-y-auto overscroll-contain bg-white px-4 pb-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex min-h-16 items-center justify-between border-b border-[#F1DDE6]">
          <a href="/" onClick={onClose} className="text-xl font-bold tracking-tight text-[#B43B6B]">EDUTOTS</a>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-[#FFF4F8] hover:text-[#B43B6B]" aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>

        <nav className="space-y-1 py-5">
          <a href="/" onClick={onClose} className={itemClass}><span className="flex items-center gap-3"><Home className="h-4 w-4 text-[#B43B6B]" />Home</span><ChevronRight className="h-4 w-4 text-stone-300" /></a>
          <a href="/shop" onClick={onClose} className={itemClass}><span className="flex items-center gap-3"><Sparkles className="h-4 w-4 text-[#B43B6B]" />Shop by Age</span><ChevronRight className="h-4 w-4 text-stone-300" /></a>
          <a href="/shop" onClick={onClose} className={itemClass}><span className="flex items-center gap-3"><Grid2X2 className="h-4 w-4 text-[#B43B6B]" />Shop by Category</span><ChevronRight className="h-4 w-4 text-stone-300" /></a>
          <a href="/shop?category=bundles" onClick={onClose} className={itemClass}><span className="flex items-center gap-3"><Layers3 className="h-4 w-4 text-[#B43B6B]" />Bundles &amp; Combos</span><ChevronRight className="h-4 w-4 text-stone-300" /></a>
          <a href={whatsapp('Hi Edutots! I would like to know more about return gifts and bulk gifting options.')} target="_blank" rel="noopener noreferrer" onClick={onClose} className={itemClass}><span className="flex items-center gap-3"><Gift className="h-4 w-4 text-[#B43B6B]" />Return Gifts</span><MessageCircle className="h-4 w-4 text-[#25D366]" /></a>
          <a href="#about-us" onClick={onClose} className={itemClass}><span className="flex items-center gap-3"><Info className="h-4 w-4 text-[#B43B6B]" />About Us</span><ChevronRight className="h-4 w-4 text-stone-300" /></a>
          <a href={whatsapp('Hi Edutots! I would like to get in touch with your team.')} target="_blank" rel="noopener noreferrer" onClick={onClose} className={itemClass}><span className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-[#B43B6B]" />Contact Us</span><MessageCircle className="h-4 w-4 text-[#25D366]" /></a>
          <a href="/shop" onClick={onClose} className={itemClass}><span className="flex items-center gap-3"><ShoppingBag className="h-4 w-4 text-[#B43B6B]" />Shop All</span><ChevronRight className="h-4 w-4 text-stone-300" /></a>
        </nav>

        <div className="mt-auto border-t border-[#F1DDE6] pt-5">
          <a href="https://instagram.com/edutots.learning" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-stone-700 transition-colors hover:bg-[#FFF4F8] hover:text-[#B43B6B]"><Instagram className="h-5 w-5" />Follow us on Instagram</a>
          <a href={whatsapp('Hi Edutots! I need help choosing the right learning activity for my child.')} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white transition-colors hover:bg-[#20ba59]"><MessageCircle className="h-5 w-5 fill-current" />Need help on WhatsApp?</a>
        </div>
      </aside>
    </div>
  );
};