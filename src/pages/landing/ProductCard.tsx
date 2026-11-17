
import { Plus, Check, Eye } from 'lucide-react';
import type { Product } from '../../service/product';

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

export default function ProductCard({
  product,
  isInCart,
  onAddToCart,
  onOpenQuickView,
}: ProductCardProps) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0c0c11] p-5 flex flex-col justify-between hover:border-[#d4af37]/45 transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]">
      <div>
        <div className="relative w-full aspect-square rounded-xl bg-black/50 border border-white/5 flex items-center justify-center p-4 overflow-hidden mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <button
            type="button"
            onClick={() => onOpenQuickView(product)}
            className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-black/75 hover:bg-[#d4af37] text-white hover:text-black transition-colors cursor-pointer opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-md"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono uppercase mb-1">
          <span className="text-[#d4af37] font-semibold">{product.brand}</span>
          <span>{product.number}</span>
        </div>

        <h3 className="font-serif text-lg text-white font-bold group-hover:text-[#e2c785] transition-colors leading-snug">
          {product.name}
        </h3>

        <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300">
            {product.category}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300">
            {product.suitability}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-[#e2c785]">
            {product.function}
          </span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between">
        <div>
          <span className="text-[10px] text-zinc-400 block font-medium">Price</span>
          <span className="text-base font-bold text-white tracking-tight">
            Rs. {(Number(product.price) || 0).toLocaleString()}
          </span>
          <span className="text-[10px] text-zinc-500 block">{product.volume}</span>
        </div>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
            isInCart
              ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
              : 'bg-[#d4af37] hover:bg-[#e0bf50] text-black shadow-[0_4px_15px_rgba(212,175,55,0.25)] hover:scale-105'
          }`}
        >
          {isInCart ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              In Cart
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}