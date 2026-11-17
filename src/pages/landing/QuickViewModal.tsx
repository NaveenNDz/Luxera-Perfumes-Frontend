import { X, Plus, ShieldCheck, Truck, Check } from 'lucide-react';
import type { Product } from '../../service/product';
import type { CartItem } from '../../context/cartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  cart?: CartItem[];
  onAddToCart: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  cart = [],
  onAddToCart,
}: QuickViewModalProps) {
  if (!product) return null;

  const productId = product._id || product.id || product.number;
  const isInCart = cart.some((c) => c.id === productId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl bg-[#0c0c12] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold">
              {product.brand} · {product.number}
            </span>
            <h3 className="font-serif text-2xl text-white font-bold mt-0.5">{product.name}</h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="relative aspect-square rounded-xl bg-black/50 border border-white/10 p-4 flex items-center justify-center">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Price</span>
              <p className="font-serif text-3xl font-bold text-white mt-0.5">
                Rs. {(Number(product.price) || 0).toLocaleString()}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                {product.volume} · {product.concentration}
              </p>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/5">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 pt-1">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Category</span>
                <span className="font-medium text-white">{product.category}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Suitability</span>
                <span className="font-medium text-white">{product.suitability}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Occasion</span>
                <span className="font-medium text-[#e2c785]">{product.function}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Batch Code</span>
                <span className="font-mono text-zinc-300">{product.batch}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-zinc-400 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[#e2c785]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Original</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-3.5 h-3.5" />
                <span>Delivery across SL</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className={`w-full py-3 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isInCart
                  ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
                  : 'bg-[#d4af37] hover:bg-[#e0bf50] text-black shadow-[0_4px_15px_rgba(212,175,55,0.25)]'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  In Bag (Rs. {(Number(product.price) || 0).toLocaleString()})
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  Add to Bag (Rs. {(Number(product.price) || 0).toLocaleString()})
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}