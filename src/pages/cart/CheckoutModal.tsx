import { useState, useEffect, type FormEvent } from 'react';
import { X, ShieldCheck, AlertCircle, CheckCircle2, Truck, CreditCard, Banknote } from 'lucide-react';
import type { CartItem } from '../../context/cartContext';
import type { User } from '../../service/auth';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
  deliveryFee: number;
  currentUser?: User | null;
  onSubmitOrder: (formData: {
    name: string;
    phone: string;
    address: string;
    paymentType: 'cod' | 'card';
  }) => Promise<void>;
  isSubmitting?: boolean;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  total,
  deliveryFee,
  currentUser,
  onSubmitOrder,
  isSubmitting = false,
}: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentType, setPaymentType] = useState<'cod' | 'card'>('cod');

  useEffect(() => {
    if (currentUser) {
      const fullName = `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();
      if (fullName) setName(fullName);
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (paymentType === 'card') {
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      return;
    }

    await onSubmitOrder({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      paymentType,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

      <div className="relative w-full max-w-lg bg-[#0c0c12] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 z-10 max-h-[92vh] overflow-y-auto text-white">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold block">
              Island-Wide Courier Delivery
            </span>
            <h3 className="font-serif text-2xl text-white font-bold mt-0.5">
              Checkout & Delivery Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white cursor-pointer p-1 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mini Order Summary */}
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs">
          <div>
            <span className="text-zinc-400 block">Total Fragrances</span>
            <span className="font-semibold text-white">
              {totalItemCount} {totalItemCount === 1 ? 'Flacon' : 'Flacons'}
            </span>
          </div>

          <div>
            <span className="text-zinc-400 block">Delivery Fee</span>
            <span className="font-medium text-emerald-400">
              Rs. {deliveryFee.toLocaleString()} (Island-wide)
            </span>
          </div>

          <div className="text-right">
            <span className="text-zinc-400 block">Payable Total</span>
            <span className="font-bold text-sm text-white">
              Rs. {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Full Name <span className="text-[#d4af37]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kasun Perera"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Contact Phone Number <span className="text-[#d4af37]">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 077 123 4567 / 071 987 6543"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors font-mono"
            />
            <span className="text-[10px] text-zinc-500 mt-1 block">
              Required by Prompt / Koombiyo courier for delivery call.
            </span>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Delivery Address (Sri Lanka) <span className="text-[#d4af37]">*</span>
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. No. 45/2, Galle Road, Colombo 03, Western Province"
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors resize-none"
            />
          </div>

          {/* Payment Type Selection Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Payment Method <span className="text-[#d4af37]">*</span>
            </label>
            <div className="relative">
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as 'cod' | 'card')}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#14141c] border border-white/20 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-colors cursor-pointer"
              >
                <option value="cod">Cash on delivery (Island-wide)</option>
                <option value="card">Pay with card (Credit / Debit)</option>
              </select>
            </div>
          </div>

          {/* Card Unavailable Alert Message */}
          {paymentType === 'card' && (
            <div className="p-3.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-200 block text-xs">
                  Currently unavailable.
                </span>
                <span className="text-[11px] text-rose-300 leading-relaxed block mt-0.5">
                  Card payment gateway is temporarily under maintenance. Only cash on delivery is available.
                </span>
              </div>
            </div>
          )}

          {/* COD Information Reassurance */}
          {paymentType === 'cod' && (
            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2.5">
              <Banknote className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[11px] leading-relaxed">
                Pay cash to the courier upon inspecting your sealed perfume box.
              </span>
            </div>
          )}

          {/* Submit Actions */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-lg border border-white/15 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={paymentType === 'card' || isSubmitting}
              className={`flex-1 py-3 px-5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                paymentType === 'card'
                  ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed opacity-60'
                  : 'bg-[#d4af37] hover:bg-[#e0bf50] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:scale-[1.02]'
              }`}
            >
              {paymentType === 'card' ? (
                'Select Cash on Delivery to Proceed'
              ) : isSubmitting ? (
                'Placing Order...'
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Confirm Order · Rs. {total.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
