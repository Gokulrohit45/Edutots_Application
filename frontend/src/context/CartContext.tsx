import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { siteConfig } from '../config/siteConfig';
import { useToast } from './ToastContext';

export interface CustomerDetails {
  name: string;
  phone: string;
  city: string;
  pin: string;
  address?: string;
  orderNote?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  itemCount: number;
  subtotal: number;
  totalMRP: number;
  totalSavings: number;
  freeShippingRemaining: number;
  isFreeShipping: boolean;
  orderReference: string;
  prepareWhatsAppOrder: (details: CustomerDetails) => { url: string; reference: string; message: string };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'edutots_cart_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderReference, setOrderReference] = useState(() => {
    return `${siteConfig.orderReferencePrefix}${Math.floor(10000 + Math.random() * 90000)}`;
  });
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore quota errors
    }
  }, [items]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart`, 'success');
  }, [showToast]);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => {
      const removed = prev.find((item) => item.product.id === productId);
      if (removed) {
        showToast(`Removed from cart`, 'info');
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  }, [showToast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalMRP = items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const totalSavings = Math.max(0, totalMRP - subtotal);
  const freeShippingRemaining = Math.max(0, siteConfig.freeShippingThreshold - subtotal);
  const isFreeShipping = subtotal >= siteConfig.freeShippingThreshold;

  const prepareWhatsAppOrder = useCallback((details: CustomerDetails) => {
    const currentRef = `${siteConfig.orderReferencePrefix}${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderReference(currentRef);

    let itemsList = '';
    items.forEach((item, index) => {
      const lineTotal = item.product.price * item.quantity;
      itemsList += `${index + 1}. *${item.product.name}*\n`;
      itemsList += `   Age: ${item.product.ageRange}\n`;
      itemsList += `   Qty: ${item.quantity}\n`;
      itemsList += `   ₹${item.product.price.toLocaleString('en-IN')}${
        item.quantity > 1 ? ` × ${item.quantity} = ₹${lineTotal.toLocaleString('en-IN')}` : ''
      }\n\n`;
    });

    const lines = [
      'Hello Edutots! 👋',
      '',
      'I would like to order the following products from your catalog.',
      '',
      `*ORDER REFERENCE: ${currentRef}*`,
      '',
      '━━━━━━━━━━━━━━━━━━━━',
      '*ORDER DETAILS*',
      '━━━━━━━━━━━━━━━━━━━━',
      itemsList.trim(),
      '━━━━━━━━━━━━━━━━━━━━',
      `*Subtotal: ₹${subtotal.toLocaleString('en-IN')}*`,
      totalSavings > 0 ? `*You Saved: ₹${totalSavings.toLocaleString('en-IN')}*` : '',
      isFreeShipping ? '🚚 Shipping: FREE' : '🚚 Shipping: Flat ₹60 (Orders below ₹999)',
      '━━━━━━━━━━━━━━━━━━━━',
      '',
      '*CUSTOMER DETAILS*',
      `Name: ${details.name.trim()}`,
      `Phone: ${details.phone.trim()}`,
      `City: ${details.city.trim()}`,
      `PIN Code: ${details.pin.trim()}`,
      details.address?.trim() ? `Delivery Address: ${details.address.trim()}` : '',
      '',
      details.orderNote?.trim() ? `*ORDER NOTE*\n"${details.orderNote.trim()}"\n` : '',
      'Please confirm availability, shipping schedule and payment details.',
      '',
      'Thank you! ✨',
    ]
      .filter((line) => line !== '')
      .join('\n');

    const cleanPhone = siteConfig.whatsappOrderNumber.replace(/\D/g, '');
    const encoded = encodeURIComponent(lines);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

    return {
      url: whatsappUrl,
      reference: currentRef,
      message: lines,
    };
  }, [items, subtotal, totalSavings, isFreeShipping]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        itemCount,
        subtotal,
        totalMRP,
        totalSavings,
        freeShippingRemaining,
        isFreeShipping,
        orderReference,
        prepareWhatsAppOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
