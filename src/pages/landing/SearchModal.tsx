import { Search, X, Plus, Check } from "lucide-react";
import type { Product } from "../../service/product";
import type { CartItem } from "../../context/cartContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  results: Product[];
  cart?: CartItem[];
  onAddToCart: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
}

const POPULAR_SEARCHES = ["Afnan", "Hawas", "Armaf", "Lattafa", "Extrait"];

export default function SearchModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  results,
  cart = [],
  onAddToCart,
  onOpenQuickView,
}: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 pt-12 sm:p-4 sm:pt-20">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />
      <div className="relative w-full max-w-2xl bg-[#0c0c12] border border-white/15 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4 sm:space-y-5 z-10 max-h-[85vh] flex flex-col">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <Search className="w-5 h-5 text-[#d4af37]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by perfume name, brand, category, or occasion..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-zinc-500 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white cursor-pointer ml-1 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs text-zinc-400">
          <span className="text-[11px] text-zinc-500 shrink-0 font-medium">
            Quick Suggestions:
          </span>
          {POPULAR_SEARCHES.map((chip) => (
            <button
              key={chip}
              onClick={() => setSearchQuery(chip)}
              className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11px] whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto space-y-3 pr-1 max-h-[50vh]">
          {results.length > 0 ? (
            results.map((product) => {
              const prodId = product._id || product.id || product.number;
              const isInCart = cart.some((c) => c.id === prodId);

              return (
                <div
                  key={prodId}
                  className="p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center justify-between gap-4"
                >
                  <div
                    onClick={() => {
                      onOpenQuickView(product);
                      onClose();
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <div className="w-14 h-14 rounded-lg bg-black/60 p-1 shrink-0 border border-white/10 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-serif font-bold text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {product.brand} · {product.category} ·{" "}
                        {product.function}
                      </p>
                      <p className="text-xs text-[#e2c785] font-bold mt-0.5">
                        Rs. {(Number(product.price) || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className={`shrink-0 p-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      isInCart
                        ? "bg-emerald-950/70 border border-emerald-500/50 text-emerald-300"
                        : "bg-[#d4af37] text-black hover:bg-[#e0bf50]"
                    }`}
                    title={isInCart ? "In Cart" : "Add to Cart"}
                  >
                    {isInCart ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No fragrances found matching "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
