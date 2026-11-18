import { Truck, ShieldCheck, Banknote, ArrowRight } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
  onCheckout: () => void;
}

export default function OrderSummary({
  subtotal,
  deliveryFee,
  total,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-5 xl:col-span-4">
      <aside className="w-full bg-[#0c0c12] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl sticky top-24 text-white">
        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-4">
          Order Summary
        </h3>

        
        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center text-zinc-400">
            <span>Subtotal</span>
            <span className="text-white font-semibold">
              Rs. {(Number(subtotal) || 0).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center text-zinc-400">
            <span>Island-Wide Delivery</span>
            <span className="text-white font-semibold">
              {subtotal > 0
                ? deliveryFee > 0
                  ? `Rs. ${(Number(deliveryFee) || 0).toLocaleString()}`
                  : 'Rs. 0'
                : 'Rs. 0'}
            </span>
          </div>

          <div className="border-t border-white/10 pt-4 flex justify-between items-center">
            <div>
              <span className="font-bold text-sm text-white block">
                Total Price
              </span>
              <span className="text-[11px] text-zinc-500">Cash on delivery</span>
            </div>
            <span className="font-bold text-lg text-white">
              Rs. {(Number(total) || 0).toLocaleString()}
            </span>
          </div>
        </div>

        
        <div>
          <button
            type="button"
            onClick={onCheckout}
            disabled={subtotal === 0}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e0bf50] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        
        <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-zinc-400">
          <div className="flex items-center gap-2 text-zinc-300">
            <Banknote className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>Cash on Delivery (Island-Wide)</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <Truck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>1–3 Business Days Delivery</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span>100% Original Sealed Fragrances</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
