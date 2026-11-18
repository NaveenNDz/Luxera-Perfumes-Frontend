import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import type { CartItem } from '../../context/cartContext';

interface CartItemListProps {
  cart: CartItem[];
  favorites?: Record<string, boolean>;
  onToggleFavorite?: (id: string, name: string) => void;
  onUpdateQuantity?: (productId: string, delta: number) => void;
  onRemoveFromCart?: (productId: string) => void;
  onBackToStorefront: () => void;
}

export default function CartItemList({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onBackToStorefront,
}: CartItemListProps) {
  if (cart.length === 0) {
    return (
      <div className="w-full text-center py-20 sm:py-24 space-y-6">
        <div className="relative w-20 h-20 mx-auto rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          <ShoppingBag className="w-9 h-9 stroke-[1.5]" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="font-serif text-3xl font-bold text-white tracking-tight">
            Your Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Select fine original fragrances from our collection crafted for all-day projection in Sri Lankan climate.
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToStorefront}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e0bf50] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:scale-105 cursor-pointer"
        >
          <span>Explore Perfumes</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 xl:col-span-8 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
          Your Fragrance Selection ({cart.length})
        </h2>
        <button
          type="button"
          onClick={onBackToStorefront}
          className="text-xs text-[#d4af37] hover:text-[#e0bf50] transition-colors cursor-pointer"
        >
          + Add more items
        </button>
      </div>

      <div className="divide-y divide-white/10">
        {cart.map((item) => {
          const itemPrice = Number(item.price) || 0;
          const itemQty = Number(item.quantity) || 1;
          const lineTotal = itemPrice * itemQty;

          return (
            <article
              key={item.id}
              className="py-5 first:pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
            >
             
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-20 h-24 sm:w-22 sm:h-26 rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0 flex items-center justify-center p-2 group-hover:border-[#d4af37]/40 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#d4af37]">
                    {item.brand}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {item.category} · {item.concentration} · {item.volume}
                  </p>
                  <p className="text-xs text-zinc-400">
                    Rs. {itemPrice.toLocaleString()} each
                  </p>
                </div>
              </div>

              
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t border-white/5 sm:border-0">
                <span className="font-bold text-base text-white">
                  Rs. {lineTotal.toLocaleString()}
                </span>

                <div className="flex items-center gap-3">
                  
                  <div className="flex items-center border border-white/15 rounded-lg bg-black/40 px-1 py-0.5">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, -1)}
                      className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-mono font-semibold text-white">
                      {itemQty}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, 1)}
                      className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  
                  <button
                    type="button"
                    onClick={() => onRemoveFromCart && onRemoveFromCart(item.id)}
                    className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer rounded-lg hover:bg-rose-500/10"
                    title="Remove from cart"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
