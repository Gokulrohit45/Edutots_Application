import React, { useState } from 'react';
import { Mail, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed to Playful Learning tips & new launches! ✨', 'success');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#1976A3] text-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-3 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[#BFE9F7]" />
          <span>Curated for Mindful Parents</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
          Playful learning, delivered to your inbox.
        </h2>

        <p className="text-xs sm:text-sm text-[#DDF2FA]/80 max-w-lg mx-auto mt-2 leading-relaxed">
          Weekly screen-free activity ideas, developmental milestone checklists, and first access to new binder launches. No spam ever.
        </p>

        {isSubscribed ? (
          <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/20 max-w-md mx-auto text-sm font-medium text-[#DDF2FA] animate-in fade-in duration-300">
            🎉 Thank you for joining our parenting circle! Look out for our welcome guide in your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 bg-white text-stone-900 placeholder-stone-400 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BFE9F7]"
              />
            </div>
            <button
              type="submit"
              className="py-3 px-6 bg-[#38A9D6] hover:bg-[#16779E] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-md shrink-0 active:scale-98"
            >
              Join Free
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
