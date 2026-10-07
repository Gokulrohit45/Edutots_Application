import React from 'react';
import { siteConfig } from '../../config/siteConfig';
import { MessageCircle, Heart, Instagram, Facebook, Mail, Phone, MapPin, ShieldCheck, RefreshCw } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const { showToast } = useToast();

  const handlePhaseNotice = (feature: string) => {
    showToast(`${feature} will be available in future phases`, 'info');
  };

  return (
    <footer id="about-us" className="bg-[#17324D] text-stone-300 pt-14 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-stone-800">
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <a href="/" className="text-2xl font-bold tracking-tight text-white inline-block">
              EDUTOTS
            </a>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Thoughtfully designed screen-free books, flashcards, and busy binders for curious little minds aged 0–6. Built for repeated play, gentle learning, and real parent peace of mind.
            </p>

            {/* Direct WhatsApp Ordering Reassurance */}
            <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-current" />
                <span>WhatsApp Ordering Platform</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Browse our catalog, build your cart, and send directly to our WhatsApp. No online payment gateways or card risk.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-[#1976A3] text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-[#1976A3] text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsappSupportNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-[#25D366] text-stone-300 hover:text-white flex items-center justify-center transition-colors border border-stone-800"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column: SHOP */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Shop Activities
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#bestsellers" className="hover:text-white transition-colors">Best Sellers</a>
              </li>
              <li>
                <a href="#shop-by-age" className="hover:text-white transition-colors">Shop by Age</a>
              </li>
              <li>
                <a href="#shop-by-category" className="hover:text-white transition-colors">Activity Binders</a>
              </li>
              <li>
                <a href="#shop-by-category" className="hover:text-white transition-colors">Flashcards</a>
              </li>
              <li>
                <a href="#bundles" className="hover:text-white transition-colors">Learning Combos</a>
              </li>
              <li>
                <a href="#new-launches" className="hover:text-white transition-colors">New Launches</a>
              </li>
            </ul>
          </div>

          {/* Column: HELP & SUPPORT */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Help & Support
            </p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <button onClick={() => handlePhaseNotice('Shipping Policy')} className="hover:text-white text-left">
                  Shipping & Timelines
                </button>
              </li>
              <li>
                <button onClick={() => handlePhaseNotice('Easy Returns')} className="hover:text-white text-left">
                  Tear-Proof Guarantee
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappSupportNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Track via WhatsApp</span>
                </a>
              </li>
              <li>
                <button onClick={() => handlePhaseNotice('Gifting Concierge')} className="hover:text-white text-left">
                  Birthday Gift Wrapping
                </button>
              </li>
            </ul>
          </div>

          {/* Column: CONTACT & PHILOSOPHY */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-white">
              Studio & Contact
            </p>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>{siteConfig.businessAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white">{siteConfig.contactEmail}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <span>WhatsApp: {siteConfig.whatsappDisplayNumber}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-stone-500 space-y-1">
              <p>🌱 Made with child-safe, non-toxic laminated materials.</p>
              <p>📦 Dispatch from Bengaluru within 24–48 hours.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} EDUTOTS Learning Studio. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => handlePhaseNotice('Privacy Policy')} className="hover:text-stone-300">
              Privacy
            </button>
            <span>·</span>
            <button onClick={() => handlePhaseNotice('Terms of Service')} className="hover:text-stone-300">
              Terms
            </button>
            <span>·</span>
            <span className="text-stone-400">Crafted with care for little minds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
