export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  ageRange: string; // e.g. "2–4 Years"
  ageGroupSlug: string; // e.g. "2-4-years"
  category: string; // e.g. "Activity Binders"
  categorySlug: string; // e.g. "activity-binders"
  skills: string[]; // e.g. ["Fine Motor", "Pencil Control", "Visual Matching"]
  images: string[];
  video?: {
    thumbnail: string;
    videoUrl?: string;
    title: string;
    duration: string;
  };
  mrp: number; // e.g. 899
  price: number; // e.g. 699
  rating: number; // e.g. 4.9
  reviewCount: number; // e.g. 84
  badge?: 'Bestseller' | 'New Launch' | 'Parent Favorite' | 'Low Stock' | 'Value Combo';
  isNew?: boolean;
  isBestseller?: boolean;
  stock: number;
  includedItems: string[];
  numberOfPages?: number;
  dimensions?: string;
  material?: string;
  reusable?: boolean;
}

export interface AgeGroup {
  id: string;
  slug: string;
  label: string; // e.g. "0–1 Years"
  sublabel: string; // e.g. "High contrast & early sensory discovery"
  description: string;
  image: string;
  recommendedFor: string;
  popularProductCount: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  productCount: number;
  badge?: string;
}

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  ageRange: string;
  includedProducts: string[];
  mrp: number;
  price: number;
  savings: number;
  image: string;
  skills: string[];
  badge?: string;
}

export interface Review {
  id: string;
  author: string;
  authorLocation: string;
  childAge: string;
  rating: number;
  date: string;
  text: string;
  productPurchased: string;
  verified: boolean;
  helpfulCount: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'ordering' | 'products' | 'shipping';
}

export interface HeroSlide {
  id: string;
  headline: string;
  supportingText: string;
  image: string;
  primaryCtaText: string;
  primaryCtaAction: string;
  secondaryCtaText: string;
  secondaryCtaAction: string;
  badgeText?: string;
  benefits?: string[];
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  whatsappOrderNumber: string; // e.g. "+919876543210"
  whatsappSupportNumber: string;
  whatsappDisplayNumber: string;
  contactEmail: string;
  businessAddress: string;
  freeShippingThreshold: number; // 999
  shippingMessage: string;
  orderReferencePrefix: string;
  announcementBar: {
    enabled: boolean;
    messages: string[];
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}
