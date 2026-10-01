import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { ageGroupsData, bundlesData, categoriesData, productsData } from '../data/mockData';
import { Product } from '../types';
import { ProductCard } from '../components/common/ProductCard';

interface ShopPageProps {
  onQuickView: (product: Product) => void;
}

type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
type CategoryOption = { id: string; slug: string; name: string };

const bundleProducts: Product[] = bundlesData.map((bundle) => ({
  id: bundle.id,
  slug: bundle.slug,
  name: bundle.name,
  shortDescription: bundle.shortDescription,
  ageRange: bundle.ageRange,
  ageGroupSlug: 'bundles',
  category: 'Bundles & Combos',
  categorySlug: 'bundles',
  skills: bundle.skills,
  images: [bundle.image],
  mrp: bundle.mrp,
  price: bundle.price,
  rating: 4.9,
  reviewCount: 48,
  stock: 15,
  badge: 'Value Combo',
  includedItems: bundle.includedProducts,
  reusable: true,
}));

const catalogProducts = [...productsData, ...bundleProducts];
const categoryOptions: CategoryOption[] = [
  ...categoriesData.map(({ id, slug, name }) => ({ id, slug, name })),
  { id: 'cat-bundles', slug: 'bundles', name: 'Bundles & Combos' },
];

export const ShopPage: React.FC<ShopPageProps> = ({ onQuickView }) => {
  const [revision, setRevision] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const params = useMemo(() => new URLSearchParams(window.location.search), [revision]);

  const selectedAge = params.get('age') || '';
  const selectedCategory = params.get('category') || '';
  const selectedCollection = params.get('collection') || '';
  const searchQuery = params.get('q') || '';
  const maxPrice = Number(params.get('maxPrice') || 3000);
  const inStockOnly = params.get('stock') === 'in';
  const sort = (params.get('sort') || 'featured') as SortOption;

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(window.location.search);
    Object.entries(updates).forEach(([key, value]) => value ? next.set(key, value) : next.delete(key));
    const query = next.toString();
    window.history.pushState({}, '', `/shop${query ? `?${query}` : ''}`);
    setRevision((value) => value + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    window.history.pushState({}, '', '/shop');
    setRevision((value) => value + 1);
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const result = catalogProducts.filter((product) => {
      if (selectedAge && product.ageGroupSlug !== selectedAge) return false;
      if (selectedCategory && product.categorySlug !== selectedCategory) return false;
      if (selectedCollection === 'bestsellers' && !product.isBestseller) return false;
      if (selectedCollection === 'new-launches' && !product.isNew && product.badge !== 'New Launch') return false;
      if (product.price > maxPrice) return false;
      if (inStockOnly && product.stock <= 0) return false;
      if (normalizedQuery && ![product.name, product.shortDescription, product.category, product.ageRange, ...product.skills].join(' ').toLowerCase().includes(normalizedQuery)) return false;
      return true;
    });

    return [...result].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'newest') return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
      return Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller));
    });
  }, [selectedAge, selectedCategory, selectedCollection, searchQuery, maxPrice, inStockOnly, sort]);

  const activeCount = [selectedAge, selectedCategory, selectedCollection, searchQuery, maxPrice < 3000 ? 'price' : '', inStockOnly ? 'stock' : ''].filter(Boolean).length;
  const pageTitle = selectedCollection === 'bestsellers' ? 'Best Sellers' : selectedCollection === 'new-launches' ? 'New Launches' : selectedAge ? ageGroupsData.find((age) => age.slug === selectedAge)?.label || 'Shop by Age' : selectedCategory ? categoryOptions.find((category) => category.slug === selectedCategory)?.name || 'Shop by Category' : 'Shop All Activities';

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">Age group</h3>{selectedAge && <button onClick={() => updateParams({ age: null })} className="text-[11px] font-semibold text-[#B43B6B]">Clear</button>}</div>
        <div className="space-y-2">{ageGroupsData.map((age) => <button key={age.id} onClick={() => updateParams({ age: selectedAge === age.slug ? null : age.slug })} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${selectedAge === age.slug ? 'bg-[#FCE7F0] font-bold text-[#B43B6B]' : 'hover:bg-[#FFF4F8] text-stone-700'}`}><span>{age.label}</span>{selectedAge === age.slug && <Check className="h-4 w-4" />}</button>)}</div>
      </div>

      <div className="border-t border-[#F1DDE6] pt-5">
        <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">Category</h3>{selectedCategory && <button onClick={() => updateParams({ category: null })} className="text-[11px] font-semibold text-[#B43B6B]">Clear</button>}</div>
        <div className="space-y-1">{categoryOptions.map((category) => <button key={category.id} onClick={() => updateParams({ category: selectedCategory === category.slug ? null : category.slug })} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${selectedCategory === category.slug ? 'bg-[#FCE7F0] font-bold text-[#B43B6B]' : 'hover:bg-[#FFF4F8] text-stone-700'}`}><span>{category.name}</span>{selectedCategory === category.slug && <Check className="h-4 w-4" />}</button>)}</div>
      </div>

      <div className="border-t border-[#F1DDE6] pt-5">
        <h3 className="mb-3 text-sm font-bold">Collection</h3>
        <div className="grid grid-cols-2 gap-2"><button onClick={() => updateParams({ collection: selectedCollection === 'bestsellers' ? null : 'bestsellers' })} className={`rounded-xl border px-3 py-2.5 text-xs font-semibold ${selectedCollection === 'bestsellers' ? 'border-[#B43B6B] bg-[#FCE7F0] text-[#B43B6B]' : 'border-[#F1DDE6]'}`}>Best Sellers</button><button onClick={() => updateParams({ collection: selectedCollection === 'new-launches' ? null : 'new-launches' })} className={`rounded-xl border px-3 py-2.5 text-xs font-semibold ${selectedCollection === 'new-launches' ? 'border-[#B43B6B] bg-[#FCE7F0] text-[#B43B6B]' : 'border-[#F1DDE6]'}`}>New Launches</button></div>
      </div>

      <div className="border-t border-[#F1DDE6] pt-5">
        <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-bold">Price</h3><span className="text-xs font-semibold text-[#B43B6B]">Up to ₹{maxPrice.toLocaleString('en-IN')}</span></div>
        <input type="range" min="399" max="3000" step="100" value={maxPrice} onChange={(event) => updateParams({ maxPrice: event.target.value === '3000' ? null : event.target.value })} className="w-full accent-[#B43B6B]" />
        <div className="mt-1 flex justify-between text-[10px] text-stone-400"><span>₹399</span><span>₹3,000+</span></div>
      </div>

      <div className="border-t border-[#F1DDE6] pt-5"><label className="flex cursor-pointer items-center justify-between rounded-xl bg-[#FFF4F8] px-3 py-3 text-xs font-semibold"><span>In-stock products only</span><input type="checkbox" checked={inStockOnly} onChange={(event) => updateParams({ stock: event.target.checked ? 'in' : null })} className="h-4 w-4 accent-[#B43B6B]" /></label></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FFFAFC]">
      <section className="border-b border-[#F1DDE6] bg-[#FFF4F8] px-4 py-9 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B43B6B]">EDUTOTS Catalogue</p><h1 className="mt-2 text-3xl font-bold text-[#2B1B24] sm:text-4xl lg:text-5xl">{pageTitle}</h1><p className="mt-2 max-w-2xl text-sm text-stone-600 sm:text-base">Find thoughtful, screen-free activities for every age, skill and little milestone.</p></div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md"><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" /><input type="search" value={searchQuery} onChange={(event) => updateParams({ q: event.target.value || null })} placeholder="Search products, skills or categories..." className="w-full rounded-xl border border-[#F1DDE6] bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#B43B6B]" /></div>
          <div className="flex gap-2"><button onClick={() => setMobileFiltersOpen(true)} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#F1DDE6] bg-white px-4 text-xs font-bold lg:hidden"><Filter className="h-4 w-4" />Filters {activeCount > 0 && <span className="rounded-full bg-[#B43B6B] px-1.5 py-0.5 text-[10px] text-white">{activeCount}</span>}</button><div className="relative flex-1"><select value={sort} onChange={(event) => updateParams({ sort: event.target.value === 'featured' ? null : event.target.value })} className="min-h-11 w-full appearance-none rounded-xl border border-[#F1DDE6] bg-white pl-4 pr-9 text-xs font-semibold outline-none"><option value="featured">Featured</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="rating">Top Rated</option><option value="newest">Newest</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" /></div></div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <aside className="filter-scrollbar hidden max-h-[calc(100dvh-9rem)] self-start overscroll-contain rounded-2xl border border-[#F1DDE6] bg-white p-4 lg:sticky lg:top-32 lg:block lg:overflow-y-auto"><div className="sticky -top-4 z-10 mb-5 flex items-center justify-between border-b border-[#F1DDE6] bg-white pb-4 pt-1"><h2 className="flex items-center gap-2 text-base font-bold"><SlidersHorizontal className="h-4 w-4 text-[#B43B6B]" />Filters</h2>{activeCount > 0 && <button onClick={clearFilters} className="text-[11px] font-semibold text-[#B43B6B]">Clear all</button>}</div><Filters /></aside>

          <section><div className="mb-4 flex items-center justify-between"><p className="text-sm text-stone-500"><strong className="text-[#2B1B24]">{filteredProducts.length}</strong> products</p>{activeCount > 0 && <button onClick={clearFilters} className="text-xs font-bold text-[#B43B6B] lg:hidden">Clear filters</button>}</div>{filteredProducts.length > 0 ? <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3 sm:gap-6">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onQuickView={onQuickView} />)}</div> : <div className="rounded-3xl border border-dashed border-[#E4B9C9] bg-[#FFF4F8] px-5 py-16 text-center"><p className="text-lg font-bold">No activities match these filters</p><p className="mt-2 text-sm text-stone-500">Try removing a filter or searching for something else.</p><button onClick={clearFilters} className="mt-5 rounded-xl bg-[#B43B6B] px-5 py-3 text-sm font-bold text-white">Clear all filters</button></div>}</section>
        </div>
      </div>

      {mobileFiltersOpen && <div className="fixed inset-0 z-[70] flex justify-end bg-black/60 lg:hidden" onClick={() => setMobileFiltersOpen(false)}><aside className="h-dvh w-[min(92vw,25rem)] overflow-y-auto bg-white p-5" onClick={(event) => event.stopPropagation()}><div className="mb-6 flex items-center justify-between border-b border-[#F1DDE6] pb-4"><div><h2 className="text-xl font-bold">Filters</h2><p className="text-xs text-stone-500">{filteredProducts.length} matching products</p></div><button onClick={() => setMobileFiltersOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4F8]" aria-label="Close filters"><X className="h-5 w-5" /></button></div><Filters /><div className="sticky bottom-0 mt-6 border-t border-[#F1DDE6] bg-white pt-4"><button onClick={() => setMobileFiltersOpen(false)} className="w-full rounded-xl bg-[#B43B6B] py-3.5 text-sm font-bold text-white">Show {filteredProducts.length} products</button></div></aside></div>}
    </main>
  );
};