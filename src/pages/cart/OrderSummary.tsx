import { useState, type FormEvent } from 'react';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  promoApplied: boolean;
  promoDiscount: number;
  discountAmount: number;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
  onCheckout: () => void;
}

export default function OrderSummary({
  subtotal,
  deliveryFee,
  total,
  promoApplied,
  discountAmount,
  onApplyPromo,
  onRemovePromo,
  onCheckout,
}: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setPromoError('');
    const success = onApplyPromo(promoCode);
    if (!success) {
      setPromoError('Invalid code. Try LUXERA10 for 10% off.');
    }
  };

  return (
    <div className="lg:col-span-5 xl:col-span-4 lg:pl-4">
      <aside className="w-full space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">Order Summary</h2>

        <div className="space-y-3.5 text-sm">
          <div className="flex justify-between items-center text-neutral-600">
            <span>Subtotal</span>
            <span className="font-semibold text-neutral-900 font-mono">Rs. {(Number(subtotal) || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-neutral-600">
            <span>Delivery</span>
            <span className="font-semibold text-neutral-900 font-mono">
              {subtotal > 0 ? (deliveryFee > 0 ? `Rs. ${(Number(deliveryFee) || 0).toLocaleString()}` : 'FREE') : 'Rs. 0'}
            </span>
          </div>
          <div className="flex justify-between items-center text-neutral-600">
            <span>Discount</span>
            <span className={`font-semibold font-mono ${promoApplied ? 'text-emerald-600' : 'text-neutral-900'}`}>
              {promoApplied ? `-Rs. ${(Number(discountAmount) || 0).toLocaleString()}` : '—'}
            </span>
          </div>
          <div className="border-t border-neutral-200 pt-3.5 flex justify-between items-center">
            <span className="font-bold text-base sm:text-lg text-neutral-900">Total</span>
            <span className="font-bold text-lg sm:text-xl text-neutral-900 font-mono">Rs. {(Number(total) || 0).toLocaleString()}</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={onCheckout}
            disabled={subtotal === 0}
            className="w-full bg-black text-white hover:bg-neutral-800 disabled:opacity-50 py-3.5 rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-sm"
          >
            Checkout
          </button>

          {!promoApplied ? (
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => setShowPromoInput(!showPromoInput)}
                className="text-xs text-neutral-600 hover:text-black underline cursor-pointer"
              >
                {showPromoInput ? 'Hide promo code' : 'Use a promo code'}
              </button>
              {showPromoInput && (
                <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. LUXERA10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-xs uppercase outline-none focus:border-black"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-black text-white text-xs font-medium uppercase cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="text-[11px] text-rose-500 mt-1.5">{promoError}</p>}
            </div>
          ) : (
            <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
              <span>Promo code applied (-10%)</span>
              <button
                type="button"
                onClick={() => {
                  onRemovePromo();
                  setPromoCode('');
                }}
                className="text-xs underline text-neutral-500 hover:text-black cursor-pointer"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}