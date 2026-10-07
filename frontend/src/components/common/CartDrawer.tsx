import React, { useState } from 'react';
import { useCart, CustomerDetails } from '../../context/CartContext';
import { productsData } from '../../data/mockData';
import { siteConfig } from '../../config/siteConfig';
import { X, Trash2, Plus, Minus, MessageCircle, Truck, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Copy } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalSavings,
    freeShippingRemaining,
    isFreeShipping,
    addToCart,
    prepareWhatsAppOrder,
    clearCart,
  } = useCart();

  const { showToast } = useToast();
  const [step, setStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [copiedRef, setCopiedRef] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  // Customer Details Form State
  const [formData, setFormData] = useState<CustomerDetails>({
    name: '',
    phone: '',
    city: '',
    pin: '',
    address: '',
    orderNote: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<CustomerDetails>>({});

  if (!isCartOpen) return null;

  // Filter 2 complementary products that are NOT yet in the cart
  const cartIds = new Set(items.map((i) => i.product.id));
  const complementaryRecommendations = productsData
    .filter((p) => !cartIds.has(p.id))
    .slice(0, 2);

  const validateForm = () => {
    const errors: Partial<CustomerDetails> = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name';
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.city.trim()) errors.city = 'Please enter your city';
    if (!formData.pin.trim() || formData.pin.trim().length < 6) {
      errors.pin = 'Please enter a valid 6-digit PIN code';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { url, reference } = prepareWhatsAppOrder(formData);
    setSubmittedRef(reference);
    setStep('success');

    // Launch WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast(`WhatsApp opened with Order #${reference}!`, 'success');
  };

  const copyOrderReference = () => {
    navigator.clipboard.writeText(submittedRef);
    setCopiedRef(true);
    showToast('Order reference copied to clipboard!', 'info');
    setTimeout(() => setCopiedRef(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-dvh shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-250 border-l border-[#CFE8F3]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#CFE8F3] flex items-center justify-between bg-[#F7FCFF]">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#17324D]">
              {step === 'cart' && `Your Learning Cart (${items.length})`}
              {step === 'details' && 'WhatsApp Order Details'}
              {step === 'success' && 'Order Initiated!'}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:text-[#17324D] hover:bg-stone-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress (shown in cart view) */}
        {step === 'cart' && items.length > 0 && (
          <div className="px-4 py-3 bg-[#DDF2FA] border-b border-[#1976A3]/10 text-xs">
            <div className="flex items-center gap-2 text-[#1976A3] font-medium mb-1.5">
              <Truck className="w-4 h-4 shrink-0" />
              {isFreeShipping ? (
                <span>🎉 You have qualified for <strong>FREE India Shipping</strong>!</span>
              ) : (
                <span>
                  Add <strong>₹{freeShippingRemaining.toLocaleString('en-IN')}</strong> more for <strong>FREE Shipping</strong>!
                </span>
              )}
            </div>
            <div className="w-full bg-[#1976A3]/15 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1976A3] h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${Math.min(100, (subtotal / siteConfig.freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EEF8FD] flex items-center justify-center mx-auto text-3xl">
                🧸
              </div>
              <div>
                <p className="text-base font-bold text-[#17324D]">Your cart is empty</p>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Find the perfect screen-free activity for your child’s milestone stage.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-[#1976A3] text-white text-xs font-semibold rounded-xl hover:bg-[#125A7A] transition-colors"
              >
                Explore Activities
              </button>
            </div>
          ) : step === 'cart' ? (
            <>
              {/* Items List */}
              <div className="divide-y divide-[#CFE8F3]">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="py-3.5 flex gap-3 items-start first:pt-0">
                    <div className="w-16 h-16 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200/60">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/src/assets/images/product_busy_binder_1790655651580.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-[#1976A3] font-medium">
                        <span>{product.ageRange}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#17324D] line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-sm font-bold text-[#17324D]">
                          ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </span>
                        {quantity > 1 && (
                          <span className="text-[11px] text-stone-400">
                            (₹{product.price} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#CFE8F3] rounded-lg bg-[#F7FCFF] p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-black rounded"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-black rounded"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-stone-400 hover:text-red-500 p-1 text-xs flex items-center gap-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complementary Additions */}
              {complementaryRecommendations.length > 0 && (
                <div className="pt-3 border-t border-[#CFE8F3]">
                  <p className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#38A9D6]" />
                    Complete their learning set:
                  </p>
                  <div className="space-y-2">
                    {complementaryRecommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#EEF8FD] border border-[#CFE8F3]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={rec.images[0]}
                            alt={rec.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover bg-white shrink-0 border border-stone-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/src/assets/images/product_busy_binder_1790655651580.jpg';
                            }}
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-stone-900 truncate">{rec.name}</p>
                            <p className="text-[11px] font-bold text-[#1976A3]">₹{rec.price}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(rec, 1)}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-[#1976A3] text-[#1976A3] hover:bg-[#DDF2FA] rounded-lg transition-colors shrink-0 ml-2"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : step === 'details' ? (
            /* WhatsApp Customer Details Form */
            <form id="whatsapp-order-form" onSubmit={handleSendToWhatsApp} className="space-y-3.5">
              <div className="bg-[#DDF2FA] p-3 rounded-xl border border-[#1976A3]/15 text-xs text-[#1976A3] leading-relaxed">
                ✨ <strong>No payment gateway required:</strong> Enter your basic details. We will format your complete order and open WhatsApp directly with our store owner!
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#CFE8F3] focus:border-[#1976A3] focus:outline-none bg-[#F7FCFF]"
                />
                {formErrors.name && <p className="text-[11px] text-red-500 mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  WhatsApp Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#CFE8F3] focus:border-[#1976A3] focus:outline-none bg-[#F7FCFF]"
                />
                {formErrors.phone && <p className="text-[11px] text-red-500 mt-1">{formErrors.phone}</p>}
              </div>

              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#CFE8F3] focus:border-[#1976A3] focus:outline-none bg-[#F7FCFF]"
                  />
                  {formErrors.city && <p className="text-[11px] text-red-500 mt-1">{formErrors.city}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 560001"
                    maxLength={6}
                    value={formData.pin}
                    onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#CFE8F3] focus:border-[#1976A3] focus:outline-none bg-[#F7FCFF]"
                  />
                  {formErrors.pin && <p className="text-[11px] text-red-500 mt-1">{formErrors.pin}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Delivery Address <span className="text-stone-400 font-normal">(Optional for delivery)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Flat/House No., Apartment name, Street..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-[#CFE8F3] focus:border-[#1976A3] focus:outline-none bg-[#F7FCFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Order Note <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please gift wrap, or this is for my 3-year-old"
                  value={formData.orderNote}
                  onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#CFE8F3] focus:border-[#1976A3] focus:outline-none bg-[#F7FCFF]"
                />
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#DDF2FA] text-[#1976A3] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#1976A3]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#17324D]">WhatsApp Chat Opened!</h3>
                <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto">
                  Your complete order message has been prepared for WhatsApp. Tap "Send" in WhatsApp to dispatch it to our store team.
                </p>
              </div>

              <div className="p-3.5 bg-[#EEF8FD] rounded-2xl border border-[#CFE8F3] flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[11px] text-stone-500 font-semibold uppercase tracking-wider">Your Order Reference</p>
                  <p className="text-base font-bold text-[#1976A3]">{submittedRef}</p>
                </div>
                <button
                  type="button"
                  onClick={copyOrderReference}
                  className="p-2 text-stone-600 hover:text-black rounded-lg border border-stone-300 bg-white text-xs flex items-center gap-1 font-semibold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedRef ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-left bg-[#F7FCFF] p-3.5 rounded-2xl border border-[#CFE8F3] text-xs text-stone-600 space-y-2">
                <p className="font-bold text-stone-800">What happens next?</p>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#1976A3] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span>Our store team verifies item stock and delivery timeline.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#1976A3] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span>You receive easy manual payment instructions (UPI / Bank Transfer).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#1976A3] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                  <span>Your parcel is packed and tracked directly via WhatsApp.</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const { url } = prepareWhatsAppOrder(formData);
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  className="w-full py-3 bg-[#25D366] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Re-open WhatsApp Chat</span>
                </button>

                <button
                  onClick={() => {
                    clearCart();
                    setStep('cart');
                    closeCart();
                  }}
                  className="w-full py-2.5 border border-[#CFE8F3] text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-50 transition-colors"
                >
                  Done & Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Summary Action Area */}
        {items.length > 0 && step !== 'success' && (
          <div className="p-4 bg-[#F7FCFF] border-t border-[#CFE8F3] space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-semibold text-stone-800 tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-[#1976A3] font-medium">
                  <span>Your Savings</span>
                  <span className="tabular-nums">- ₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Estimated Shipping</span>
                <span>{isFreeShipping ? <strong className="text-[#1976A3]">FREE</strong> : '₹60'}</span>
              </div>
              <div className="pt-2 border-t border-[#CFE8F3] flex justify-between text-sm sm:text-base font-bold text-[#17324D]">
                <span>Total Amount</span>
                <span className="tabular-nums">
                  ₹{(subtotal + (isFreeShipping ? 0 : 60)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* CTAs */}
            {step === 'cart' ? (
              <div className="space-y-2">
                <button
                  onClick={() => setStep('details')}
                  className="w-full h-12 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Order on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1976A3]" />
                  <span>No card or gateway needed · Direct store confirmation</span>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 border border-[#CFE8F3] text-stone-700 text-xs font-semibold rounded-xl hover:bg-stone-50"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  form="whatsapp-order-form"
                  className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Order to WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
