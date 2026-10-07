import React, { useState } from 'react';
import { ChevronDown, Heart, Menu, MessageCircle, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../config/siteConfig';
import { ageGroupsData, categoriesData } from '../../data/mockData';
import { MobileNavigation } from './MobileNavigation';
import { useToast } from '../../context/ToastContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenAuth }) => {
  const { itemCount, openCart } = useCart();
  const { showToast } = useToast();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const whatsappNumber = siteConfig.whatsappSupportNumber.replace(/\D/g, '');
  const whatsappLink = (message: string) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#CFE8F3] bg-[#F7FCFF]/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-5 lg:px-6 xl:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button type="button" onClick={() => setIsMobileNavOpen(true)} className="-ml-1 flex h-10 w-10 xl:hidden shrink-0 items-center justify-center rounded-xl text-stone-700 transition-colors hover:bg-[#EEF8FD] hover:text-[#1976A3]" aria-label="Open navigation menu">
              <Menu className="h-5 w-5" />
            </button>
            <a href="/" className="truncate text-xl font-bold tracking-tight text-[#1976A3] transition-opacity hover:opacity-85 sm:text-2xl">EDUTOTS</a>
          </div>
          <p className="hidden text-center text-xs text-stone-500 lg:block">Thoughtful, screen-free learning for ages 0–6</p>
          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5">
            <button type="button" onClick={onOpenSearch} className="flex h-10 items-center gap-2 rounded-xl px-2.5 text-stone-600 transition-colors hover:bg-[#EEF8FD] hover:text-[#1976A3]" aria-label="Search activities">
              <Search className="h-4.5 w-4.5" /><span className="hidden text-xs sm:inline">Search</span>
            </button>
            <button type="button" onClick={() => showToast('Wishlist will be available with your customer account', 'info')} className="hidden h-10 w-10 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-[#EEF8FD] hover:text-[#1976A3] sm:flex" aria-label="View wishlist"><Heart className="h-4.5 w-4.5" /></button>
            <button type="button" onClick={onOpenAuth} className="flex h-10 w-10 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-[#EEF8FD] hover:text-[#1976A3]" aria-label="Login or open customer account"><UserRound className="h-4.5 w-4.5" /></button>
            <button type="button" onClick={openCart} className="relative flex h-10 items-center gap-2 rounded-xl bg-[#1976A3] px-2.5 text-white shadow-sm transition-colors hover:bg-[#125A7A] sm:px-3" aria-label={`Open shopping cart with ${itemCount} items`}>
              <ShoppingBag className="h-4.5 w-4.5" /><span className="hidden text-xs font-semibold sm:inline">Cart</span><span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-[#1976A3]">{itemCount}</span>
            </button>
          </div>
        </div>

        <nav aria-label="Primary navigation" className="hidden border-t border-[#CFE8F3] bg-white/90 xl:block">
          <div className="mx-auto flex min-h-12 max-w-7xl items-stretch justify-center px-4">
            <a href="/" className="flex items-center px-3 text-[13px] font-semibold text-stone-700 transition-colors hover:text-[#1976A3] 2xl:px-4">Home</a>
            <div className="group relative flex">
              <a href="/shop" className="flex items-center gap-1 px-3 text-[13px] font-semibold text-stone-700 transition-colors hover:text-[#1976A3] 2xl:px-4">Shop by Age <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" /></a>
              <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 translate-y-2 rounded-b-3xl border border-[#CFE8F3] bg-white p-4 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="grid grid-cols-4 gap-3">{ageGroupsData.map((age) => <a key={age.id} href={`/shop?age=${age.slug}`} className="rounded-2xl bg-[#EEF8FD] p-3 text-center transition-colors hover:bg-[#DDF2FA]"><img src={age.image} alt="" className="mx-auto h-16 w-16 rounded-full object-cover" /><span className="mt-2 block text-xs font-bold text-[#17324D]">{age.label}</span><span className="mt-0.5 block truncate text-[10px] text-stone-500">{age.sublabel}</span></a>)}</div>
              </div>
            </div>
            <div className="group relative flex">
              <a href="/shop" className="flex items-center gap-1 px-3 text-[13px] font-semibold text-stone-700 transition-colors hover:text-[#1976A3] 2xl:px-4">Shop by Category <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" /></a>
              <div className="invisible absolute left-1/2 top-full w-[680px] -translate-x-1/2 translate-y-2 rounded-b-3xl border border-[#CFE8F3] bg-white p-4 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="grid grid-cols-3 gap-2">{categoriesData.map((category) => <a key={category.id} href={`/shop?category=${category.slug}`} className="flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-[#EEF8FD]"><img src={category.image} alt="" className="h-12 w-12 rounded-xl object-cover" /><div className="min-w-0"><span className="block truncate text-xs font-bold text-[#17324D]">{category.name}</span><span className="text-[10px] text-stone-500">{category.productCount} activities</span></div></a>)}</div>
              </div>
            </div>
            <a href="/shop?category=bundles" className="flex items-center px-3 text-[13px] font-semibold text-stone-700 transition-colors hover:text-[#1976A3] 2xl:px-4">Bundles &amp; Combos</a>
            <a href={whatsappLink('Hi Edutots! I would like to know more about return gifts and bulk gifting options.')} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 text-[13px] font-semibold text-stone-700 transition-colors hover:text-[#1976A3] 2xl:px-4">Return Gifts</a>
            <a href="#about-us" className="flex items-center px-3 text-[13px] font-semibold text-stone-700 transition-colors hover:text-[#1976A3] 2xl:px-4">About Us</a>
            <a href={whatsappLink('Hi Edutots! I would like to get in touch with your team.')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 text-[13px] font-semibold text-stone-700 transition-colors hover:text-[#1976A3] 2xl:px-4">Contact Us <MessageCircle className="h-3.5 w-3.5" /></a>
            <a href="/shop" className="flex items-center px-3 text-[13px] font-semibold text-stone-700 transition-colors hover:text-[#1976A3] 2xl:px-4">Shop All</a>
          </div>
        </nav>
      </header>
      <MobileNavigation isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} onOpenSearch={onOpenSearch} />
    </>
  );
};