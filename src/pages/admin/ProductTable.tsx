import { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import type { Product } from '../../service/product';

const TH = 'text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#77736B] bg-[#FAF8F5]';
const TD = 'px-4 py-3 text-sm text-[#292929] align-middle';

interface ProductTableProps {
  products: Product[];
  categoryFilter?: string;
  setCategoryFilter?: (category: string) => void;
  onUpdateStock: (product: Product, delta: number) => void;
  onDeleteProduct?: (id: string) => void;
  onOpenAddProduct: () => void;
}

function StockBadge({ stock }: { stock: number }) {
  const stockLevel = Number(stock) || 0;

  if (stockLevel <= 0) {
    return (
      <span className="inline-flex items-center gap-1.5 border px-2 py-0.5 rounded-full text-[11px] font-medium border-rose-200 bg-rose-50 text-rose-800">
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
        Out of Stock
      </span>
    );
  }

  if (stockLevel <= 15) {
    return (
      <span className="inline-flex items-center gap-1.5 border px-2 py-0.5 rounded-full text-[11px] font-medium border-amber-200 bg-amber-50 text-amber-800">
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
        Low Stock ({stockLevel})
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 border px-2 py-0.5 rounded-full text-[11px] font-medium border-emerald-200 bg-emerald-50 text-emerald-800">
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      In Stock ({stockLevel})
    </span>
  );
}

export default function ProductTable({
  products = [],
  categoryFilter: propCategoryFilter,
  setCategoryFilter: propSetCategoryFilter,
  onUpdateStock,
  onDeleteProduct,
  onOpenAddProduct,
}: ProductTableProps) {
  // Support both external state from parent and internal fallback state
  const [internalCategory, setInternalCategory] = useState<string>('all');
  const activeCategory = propCategoryFilter !== undefined ? propCategoryFilter : internalCategory;
  const handleCategoryChange = propSetCategoryFilter || setInternalCategory;

  const categories = ['all', 'Men', 'Women', 'Unisex'];

  // Filter products if managed internally
  const displayedProducts = propCategoryFilter !== undefined
    ? products
    : products.filter((p) => {
        if (activeCategory.toLowerCase() === 'all') return true;
        return String(p?.category || '').toLowerCase() === activeCategory.toLowerCase();
      });

  return (
    <div className="rounded-xl border border-[#E2DDD5] bg-white shadow-sm overflow-hidden space-y-0">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD5]">
        <div>
          <h3 className="font-semibold text-base text-[#292929]">Inventory & Atelier Catalog</h3>
          <p className="text-xs text-[#77736B] mt-0.5">Manage live stock levels and perfume registrations</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter Pills: All, Men, Women, Unisex */}
          <div className="flex rounded-lg border border-[#E2DDD5] p-0.5 bg-[#F5F3EE] text-xs">
            {categories.map((cat) => {
              const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white text-[#292929] shadow-xs'
                      : 'text-[#77736B] hover:text-[#292929]'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onOpenAddProduct}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C6A45A] hover:bg-[#B3934B] text-[#111114] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Item
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className={TH}>Item</th>
              <th className={TH}>Classification</th>
              <th className={TH}>Occasion</th>
              <th className={TH}>Price</th>
              <th className={TH}>Stock Level</th>
              <th className={`${TH} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2DDD5]">
            {displayedProducts && displayedProducts.length > 0 ? (
              displayedProducts.map((p) => {
                const prodId = String(p?._id || p?.id || p?.number || 'prod');
                const price = Number(p?.price) || 0;
                const stock = Number(p?.stock) || 0;

                return (
                  <tr key={prodId} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className={TD}>
                      <div className="flex items-center gap-3">
                        {p?.image ? (
                          <img
                            src={p.image}
                            alt={p.name || 'Perfume'}
                            className="w-10 h-12 object-contain rounded border border-[#E2DDD5] bg-[#F5F3EE] p-1 shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-11 rounded border border-[#E2DDD5] bg-[#F5F3EE] flex items-center justify-center font-mono text-xs font-bold text-[#8F6F27] shrink-0">
                            {p?.number || 'Flacon'}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-sm text-[#292929]">{p?.name || 'Untitled'}</p>
                          <p className="text-xs text-[#77736B]">
                            {p?.brand || 'LUXERA'} · {p?.volume || '100ml'} · {p?.concentration || 'Eau de Parfum'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={TD}>
                      <p className="text-xs font-medium text-[#292929]">{p?.category || 'Unisex'}</p>
                      <p className="text-[11px] text-[#77736B]">{p?.suitability || 'Both'}</p>
                    </td>
                    <td className={TD}>
                      <p className="text-xs font-medium text-[#8F6F27]">{p?.function || 'All Functions'}</p>
                      <p className="text-[11px] text-[#77736B] font-mono">{p?.batch || 'Batch 2026'}</p>
                    </td>
                    <td className={`${TD} font-serif font-semibold text-sm`}>
                      Rs. {price.toLocaleString()}
                    </td>
                    <td className={TD}>
                      <StockBadge stock={stock} />
                    </td>
                    <td className={`${TD} text-right`}>
                      <div className="inline-flex items-center gap-2">
                        <div className="inline-flex items-center border border-[#E2DDD5] rounded-md bg-white">
                          <button
                            type="button"
                            onClick={() => onUpdateStock(p, -1)}
                            className="p-1 text-[#77736B] hover:text-[#292929] hover:bg-[#F5F3EE] transition-colors cursor-pointer"
                            title="Decrease stock"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateStock(p, 1)}
                            className="p-1 text-[#77736B] hover:text-[#292929] hover:bg-[#F5F3EE] transition-colors cursor-pointer"
                            title="Increase stock"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {onDeleteProduct && (
                          <button
                            type="button"
                            onClick={() => onDeleteProduct(prodId)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-[#77736B]">
                  No perfumes found for {activeCategory === 'all' ? 'the selected filter' : activeCategory}.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
