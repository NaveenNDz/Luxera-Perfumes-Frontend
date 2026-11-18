import { CheckCircle2, ArrowLeft, Truck, Banknote, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface OrderSuccessProps {
  itemCount: number;
  total: number;
  email?: string;
  address?: string;
  onContinueShopping: () => void;
}

export default function OrderSuccess({
  itemCount,
  total,
  email,
  address,
  onContinueShopping,
}: OrderSuccessProps) {
  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-white/15 bg-[#0c0c12] p-8 sm:p-10 text-center space-y-6 shadow-2xl text-white">
      
      <div className="relative w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.25)]">
        <CheckCircle2 className="w-10 h-10 stroke-[2]" />
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-bold">
          Order Status: Pending
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Thank You For Your Order
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Your order has been recorded in the LUXERA system with <strong className="text-white">Pending</strong> status.
        </p>
      </div>

      
      {email && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-center gap-2.5 text-left">
          <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-[11px] leading-relaxed">
            Order confirmation email sent to <strong className="text-white font-semibold underline decoration-emerald-500/50">{email}</strong>.
          </span>
        </div>
      )}

      
      <div className="text-left rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-3.5 text-xs">
        <div className="flex justify-between items-center text-zinc-400">
          <span>Bottles Ordered</span>
          <span className="font-semibold text-white">
            {itemCount} {itemCount !== 1 ? 'Flacons' : 'Flacon'}
          </span>
        </div>

        {address && (
          <div className="flex justify-between items-center text-zinc-400">
            <span>Delivery Destination</span>
            <span className="font-medium text-white flex items-center gap-1.5 max-w-[260px] truncate">
              <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span className="truncate">{address}</span>
            </span>
          </div>
        )}

        <div className="flex justify-between items-center text-zinc-400">
          <span>Payment Method</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <Banknote className="w-3.5 h-3.5" />
            <span>Cash on Delivery (COD)</span>
          </span>
        </div>

        <div className="flex justify-between items-center text-zinc-400">
          <span>Island-Wide Delivery</span>
          <span className="font-medium text-white flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>1–3 Business Days</span>
          </span>
        </div>

        <div className="flex justify-between items-center pt-3.5 border-t border-white/10">
          <div>
            <span className="font-bold text-sm text-white block">Payable Total</span>
            <span className="text-[10px] text-zinc-500">To be paid in cash upon delivery</span>
          </div>
          <span className="font-bold text-lg text-white">
            Rs. {(Number(total) || 0).toLocaleString()}
          </span>
        </div>
      </div>

     
      <div className="p-3.5 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-xs text-[#fef08a] flex items-center gap-2.5 text-left">
        <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0" />
        <span className="text-[11px] leading-relaxed">
          Our dispatch team will inspect your sealed fragrance boxes with batch codes before handing them to the courier.
        </span>
      </div>

      <button
        type="button"
        onClick={onContinueShopping}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e0bf50] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:scale-[1.02] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
        <span>Return to Homepage</span>
      </button>
    </div>
  );
}
