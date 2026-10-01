import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CheckCircle2, LockKeyhole, Mail, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => emailRef.current?.focus(), 100);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const requestOtp = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    setStep('otp');
    showToast('Development preview: Supabase and Brevo will send this code later', 'info');
  };

  const verifyOtp = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      showToast('Enter the complete 6-digit verification code', 'warning');
      return;
    }
    showToast('OTP verification will activate after backend configuration', 'info');
  };

  const resetAndClose = () => {
    setStep('email');
    setOtp('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2B1B24]/65 p-0 sm:p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && resetAndClose()}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" className="flex h-dvh w-full max-w-3xl overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl">
        <div className="hidden w-[42%] flex-col justify-between bg-[#B43B6B] p-8 text-white md:flex">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD0E0]" />
              EDUTOTS Parent Circle
            </div>
            <h2 className="mt-6 text-3xl font-bold leading-tight">A simpler way to continue their learning journey.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#FCE7F0]/80">Sign in to save favourites, review orders and receive age-appropriate activity recommendations.</p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#8DE0AD]" /><span>Secure passwordless access</span></div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#8DE0AD]" /><span>Your information stays private</span></div>
          </div>
        </div>

        <div className="relative flex min-w-0 flex-1 flex-col overflow-y-auto p-5 pt-16 sm:p-8 sm:pt-14 md:p-10">
          <button type="button" onClick={resetAndClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4F8] text-stone-600 hover:bg-stone-100" aria-label="Close login">
            <X className="h-5 w-5" />
          </button>

          <div className="my-auto">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCE7F0] text-[#B43B6B] md:hidden">
              <LockKeyhole className="h-5 w-5" />
            </div>

            {step === 'email' ? (
              <form onSubmit={requestOtp}>
                <p className="text-xs font-bold uppercase tracking-wider text-[#B43B6B]">Parent account</p>
                <h2 id="auth-title" className="mt-2 text-2xl font-bold text-[#2B1B24] sm:text-3xl">Login or create an account</h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">Enter your email and we’ll send a secure one-time verification code.</p>

                <label htmlFor="login-email" className="mt-7 block text-sm font-semibold text-stone-800">Email address</label>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#DCDCD4] bg-[#FFFAFC] px-4 focus-within:border-[#B43B6B] focus-within:ring-2 focus-within:ring-[#B43B6B]/10">
                  <Mail className="h-4 w-4 shrink-0 text-stone-400" />
                  <input ref={emailRef} id="login-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="parent@example.com" className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-stone-400" />
                </div>

                <button type="submit" className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#B43B6B] px-5 text-sm font-bold text-white hover:bg-[#922C55]">Continue with email</button>
                <p className="mt-4 text-center text-[11px] leading-relaxed text-stone-500">Development preview — real email delivery will be enabled when Supabase and Brevo are connected.</p>
              </form>
            ) : (
              <form onSubmit={verifyOtp}>
                <button type="button" onClick={() => { setStep('email'); setOtp(''); }} className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-[#B43B6B]"><ArrowLeft className="h-4 w-4" />Change email</button>
                <p className="text-xs font-bold uppercase tracking-wider text-[#B43B6B]">Verification</p>
                <h2 id="auth-title" className="mt-2 text-2xl font-bold text-[#2B1B24] sm:text-3xl">Enter your email code</h2>
                <p className="mt-2 break-words text-sm leading-relaxed text-stone-600">The production system will send a six-digit code to <strong>{email}</strong>.</p>

                <label htmlFor="login-otp" className="mt-7 block text-sm font-semibold text-stone-800">6-digit verification code</label>
                <input id="login-otp" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} placeholder="000000" className="mt-2 w-full rounded-xl border border-[#DCDCD4] bg-[#FFFAFC] px-4 py-3.5 text-center text-2xl font-bold tracking-[0.4em] outline-none focus:border-[#B43B6B] focus:ring-2 focus:ring-[#B43B6B]/10" />
                <button type="submit" className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#B43B6B] px-5 text-sm font-bold text-white hover:bg-[#922C55]">Verify and login</button>
                <button type="button" onClick={() => showToast('Resend will activate with Brevo SMTP', 'info')} className="mt-4 w-full text-center text-xs font-semibold text-[#B43B6B]">Resend verification code</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
