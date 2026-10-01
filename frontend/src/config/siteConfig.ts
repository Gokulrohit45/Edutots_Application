import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  brandName: 'EDUTOTS',
  tagline: 'Thoughtful learning activities for little minds',
  whatsappOrderNumber: '919876543210', // Store WhatsApp for receiving pre-filled orders
  whatsappSupportNumber: '919876543210',
  whatsappDisplayNumber: '+91 98765 43210',
  contactEmail: 'hello@edutots.in',
  businessAddress: 'Edutots Learning Studio, Bengaluru, Karnataka, India',
  freeShippingThreshold: 999,
  shippingMessage: 'Free standard shipping across India on orders above ₹999',
  orderReferencePrefix: 'EDU-',
  announcementBar: {
    enabled: true,
    messages: [
      '✨ Free shipping across India on orders above ₹999',
      '🌱 100% Screen-free, reusable Montessori learning activities',
      '📦 Direct WhatsApp ordering — No online payment gateway needed'
    ],
  },
};

export const defaultWhatsAppMessages = {
  supportQuery: 'Hi Edutots! 👋 I need help choosing the right learning activity for my child.',
  ageQuery: (age: string) => `Hi Edutots! 👋 I would like recommendations for activities suitable for age ${age}.`,
  orderHeader: (ref: string) => `Hello Edutots! 👋\n\nI would like to order the following products.\n\n*ORDER REFERENCE: ${ref}*\n\n*ORDER DETAILS*`,
};
