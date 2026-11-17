import { Check, ArrowLeft } from 'lucide-react';

interface OrderSuccessProps {
  itemCount: number;
  total: number;
  onContinueShopping: () => void;
}

export default function OrderSuccess({
  itemCount,
  total,
  onContinueShopping,
}: OrderSuccessProps) {
  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-neutral-200 bg-white p-8 sm:p-10 text-center space-y-6 shadow-sm">
      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
        <Check className="w-8 h-8 text-emerald-600 stroke-[2.5]" />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Thank you for your order!
        </h2>
        <p className="text-sm text-neutral-500">
          Order Reference: <span className="text-neutral-900 font-mono font-semibold">#LX-2026-9042</span>
        </p>
      </div>

      <div className="text-left rounded-xl border border-neutral-100 bg-neutral-50 p-5 space-y-3 text-sm">
        <div className="flex justify-between items-center text-neutral-600">
          <span>Items Ordered</span>
          <span className="font-semibold text-neutral-900">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex justify-between items-center text-neutral-600">
          <span>Delivery</span>
          <span className="font-medium text-neutral-900">Express Courier</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
          <span className="font-bold text-neutral-900">Total</span>
          <span className="font-bold text-lg text-neutral-900 font-mono">Rs. {(Number(total) || 0).toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={onContinueShopping}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-black text-white hover:bg-neutral-800 text-sm font-medium transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </button>
    </div>
  );
}
