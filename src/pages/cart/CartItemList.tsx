import { Minus, Plus, Trash2, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import type { CartItem } from '../../context/cartContext';

interface CartItemListProps {
  cart: CartItem[];
  favorites: Record<string, boolean>;
  onToggleFavorite: (id: string, name: string) => void;
  onUpdateQuantity?: (productId: string, delta: number) => void;
  onRemoveFromCart?: (productId: string) => void;
  onBackToStorefront: () => void;
}

export default function CartItemList({
  cart,
  favorites,
  onToggleFavorite,
  onUpdateQuantity,
  onRemoveFromCart,
  onBackToStorefront,
}: CartItemListProps) {
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 sm:py-20 space-y-5 bg-white rounded-3xl p-8 border border-neutral-100">
        <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Your cart is empty</h2>
        <p className="text-sm text-neutral-500">Select fine fragrances to add to your order.</p>
        <button
          onClick={onBackToStorefront}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black text-white hover:bg-neutral-800 text-sm font-medium transition-colors cursor-pointer"
        >
          Explore Collection <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 xl:col-span-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-4 sm:mb-6">
        Cart
      </h1>

      <div className="divide-y divide-neutral-100">
        {cart.map((item) => (
          <article key={item.id} className="py-6 first:pt-2 flex items-start gap-4 sm:gap-6">
            <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200/80 shrink-0 flex items-center justify-center p-2">
              <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
            </div>

            <div className="flex-1 min-w-0 space-y-1.5 pt-0.5">
              <h3 className="font-bold text-base sm:text-lg text-neutral-900 leading-snug truncate">
                {item.name}
              </h3>
              <div className="text-xs text-neutral-500 space-y-0.5">
                <p>
                  <span className="font-medium text-neutral-500">Brand:</span> {item.brand}
                </p>
                <p>
                  <span className="font-medium text-neutral-500">Category:</span> {item.category}
                </p>
                <p>
                  <span className="font-medium text-neutral-500">Concentration:</span> {item.concentration}
                </p>
                <p>
                  <span className="font-medium text-neutral-500">Volume:</span> {item.volume}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onToggleFavorite(item.id, item.name)}
                  className="p-1 text-neutral-500 hover:text-rose-500 cursor-pointer transition-colors"
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 stroke-[1.8] ${favorites[item.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveFromCart && onRemoveFromCart(item.id)}
                  className="p-1 text-neutral-500 hover:text-neutral-900 cursor-pointer transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 stroke-[1.8]" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between self-stretch pt-0.5 min-w-[80px]">
              <span className="font-bold text-base sm:text-lg text-neutral-900 font-mono">
                Rs. {((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString()}
              </span>

              <div className="flex items-center gap-2 mt-auto">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, -1)}
                  className="w-5 h-5 rounded-full border border-neutral-400 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors cursor-pointer"
                  title="Decrease"
                >
                  <Minus className="w-2.5 h-2.5 stroke-[2.5]" />
                </button>
                <span className="text-xs sm:text-sm font-semibold text-neutral-900 min-w-[14px] text-center font-mono">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, 1)}
                  className="w-5 h-5 rounded-full border border-neutral-400 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors cursor-pointer"
                  title="Increase"
                >
                  <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}