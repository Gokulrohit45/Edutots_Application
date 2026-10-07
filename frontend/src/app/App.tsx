/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ToastProvider } from '../context/ToastContext';
import { CartProvider } from '../context/CartContext';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSlider } from '../components/home/HeroSlider';
import { ShopByAge } from '../components/home/ShopByAge';
import { BestSellers } from '../components/home/BestSellers';
import { ShopByCategory } from '../components/home/ShopByCategory';
import { BundlesSection } from '../components/home/BundlesSection';
import { NewLaunches } from '../components/home/NewLaunches';
import { ProductsInAction } from '../components/home/ProductsInAction';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Reviews } from '../components/home/Reviews';
import { CommunitySection } from '../components/home/CommunitySection';
import { FAQ } from '../components/home/FAQ';
import { Newsletter } from '../components/home/Newsletter';
import { WhatsAppSupportButton } from '../components/common/WhatsAppSupportButton';
import { CartDrawer } from '../components/common/CartDrawer';
import { SearchOverlay } from '../components/common/SearchOverlay';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { AuthModal } from '../components/common/AuthModal';
import { Product, AgeGroup, Category } from '../types';
import { ShopPage } from '../pages/ShopPage';

function MainApp() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const currentRoute = () => `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const [route, setRoute] = useState(currentRoute);
  const pathname = window.location.pathname;

  const navigate = (url: string) => {
    const destination = new URL(url, window.location.origin);
    window.history.pushState({}, '', `${destination.pathname}${destination.search}${destination.hash}`);
    setRoute(currentRoute());
  };

  useEffect(() => {
    const handleLocationChange = () => setRoute(currentRoute());
    const handleInternalLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      const destination = new URL(anchor.href, window.location.origin);
      if (destination.origin !== window.location.origin) return;
      event.preventDefault();
      navigate(`${destination.pathname}${destination.search}${destination.hash}`);
    };

    window.addEventListener('popstate', handleLocationChange);
    document.addEventListener('click', handleInternalLink);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleInternalLink);
    };
  }, []);

  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash && pathname === '/') {
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ block: 'start' }));
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [route, pathname]);
  const handleSelectAgeGroup = (age: AgeGroup) => {
    navigate('/shop?age=' + age.slug);
  };

  const handleSelectCategory = (cat: Category) => {
    navigate('/shop?category=' + cat.slug);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F7FCFF] text-[#17324D] selection:bg-[#DDF2FA] selection:text-[#1976A3]">
      {/* 1. Global Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Global Header & Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />      {/* 3. Page Content */}
      {pathname === '/shop' ? (
        <ShopPage key={route} onQuickView={(prod) => setQuickViewProduct(prod)} />
      ) : (
        <main className="flex-1">
          <HeroSlider />
          <ShopByAge onSelectAge={handleSelectAgeGroup} />
          <BestSellers onQuickView={(prod) => setQuickViewProduct(prod)} />
          <ShopByCategory onSelectCategory={handleSelectCategory} />
          <BundlesSection />
          <NewLaunches onQuickView={(prod) => setQuickViewProduct(prod)} />
          <Reviews />
          <FAQ />
        </main>
      )}

      {/* 4. Global Footer */}<Footer />

      {/* 5. Floating Thumb-Friendly WhatsApp Support Button */}
      <WhatsAppSupportButton />

      {/* 6. Slide-Over Cart Drawer & WhatsApp Order Generator */}
      <CartDrawer />

      {/* 7. Predictive Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
      />

      {/* 8. Product Quick View Inspection Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </ToastProvider>
  );
}
