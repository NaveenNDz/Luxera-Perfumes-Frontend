import { useState, useMemo } from 'react';
import type { Product } from '../../service/product';
import type { CartItem } from '../../context/cartContext';
import ProductCard from './ProductCard';

interface CollectionSectionProps {
  products: Product[];
  cart: CartItem[];
  isLoading?: boolean;
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

const CATEGORIES = ['All', 'Men', 'Women', 'Unisex'] as const;

export default function CollectionSection({
  products,
  cart,
  isLoading = false,
  onAddToCart,
  onOpenQuickView,
}: CollectionSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('All');

  const isProductInCart = (p: Product) => {
    const prodId = p._id || p.id || p.number;
    return cart.some((c) => c.id === prodId || c.name === p.name);
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <section id="collection" className="w-full py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#d4af37] font-semibold">
            Authentic Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mt-1">
            Fragrance Collection
          </h2>
        </div>
        <p className="text-xs text-zinc-400 max-w-md sm:text-right leading-relaxed">
          100% original imported stock with delivery across Sri Lanka.
        </p>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                active
                  ? 'bg-[#d4af37] text-black shadow-[0_2px_12px_rgba(212,175,55,0.35)]'
                  : 'bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {cat === 'All' ? 'All Perfumes' : cat}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-zinc-400 font-mono">Loading curated collection...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const prodKey = product._id || product.id || product.number;
            return (
              <ProductCard
                key={prodKey}
                product={product}
                isInCart={isProductInCart(product)}
                onAddToCart={onAddToCart}
                onOpenQuickView={onOpenQuickView}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center text-zinc-500 text-sm border border-white/5 rounded-2xl bg-white/[0.01]">
          No fragrances found in this category.
        </div>
      )}
    </section>
  );
}