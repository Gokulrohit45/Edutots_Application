/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
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
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (url: string) => {
    window.history.pushState({}, '', url);
    setPathname(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAgeGroup = (age: AgeGroup) => {
    navigate('/shop?age=' + age.slug);
  };

  const handleSelectCategory = (cat: Category) => {
    navigate('/shop?category=' + cat.slug);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FFFAFC] text-[#2B1B24] selection:bg-[#FCE7F0] selection:text-[#B43B6B]">
      {/* 1. Global Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Global Header & Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />      {/* 3. Page Content */}
      {pathname === '/shop' ? (
        <ShopPage onQuickView={(prod) => setQuickViewProduct(prod)} />
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
