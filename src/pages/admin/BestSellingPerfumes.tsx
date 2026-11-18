import { useMemo } from "react";
import { Flame, Sparkles, Package } from "lucide-react";
import type { Product } from "../../service/product";
import type { OrderItem } from "../../service/order";

interface BestSellingPerfumesProps {
  products: Product[];
  orders: OrderItem[];
}

export default function BestSellingPerfumes({
  products = [],
  orders = [],
}: BestSellingPerfumesProps) {
  const bestSellers = useMemo(() => {
    if (!products || products.length === 0) return [];

    const scored = products.map((product) => {
      const prodName = String(product?.name || "")
        .toLowerCase()
        .trim();
      const prodBrand = String(product?.brand || "")
        .toLowerCase()
        .trim();

      const orderCount = orders
        .filter((o) => {
          const flacon = String(o?.flacon || "").toLowerCase();
          return (
            flacon.includes(prodName) ||
            (prodBrand && flacon.includes(prodBrand))
          );
        })
        .reduce((sum, o) => sum + (Number(o?.quantity) || 1), 0);

      return {
        product,
        orderCount,
      };
    });

    scored.sort((a, b) => {
      if (b.orderCount !== a.orderCount) {
        return b.orderCount - a.orderCount;
      }
      return (Number(b.product.stock) || 0) - (Number(a.product.stock) || 0);
    });

    return scored.slice(0, 4);
  }, [products, orders]);

  const regionalBadges = [
    "🔥 Colombo #1 Best Seller",
    "⭐ Island-wide Favorite",
    "✨ Trending Night Sillage",
    "💎 Luxury Signature Scent",
  ];

  return (
    <div className="rounded-xl border border-[#E2DDD5] bg-white p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2DDD5] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#C6A45A]/15 text-[#8F6F27]">
              <Flame className="w-4 h-4" />
            </span>
            <h3 className="font-serif text-lg font-bold text-[#292929]">
              Best Selling Perfumes
            </h3>
          </div>
          <p className="text-xs text-[#77736B] mt-1">
            Top performing fragrances across Sri Lanka boutique dispatches &
            online orders
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E2DDD5] text-[#8F6F27] self-start sm:self-auto">
          {products.length} Fragrances in Catalog
        </span>
      </div>

      {bestSellers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.map(({ product, orderCount }, index) => {
            const badgeText = regionalBadges[index % regionalBadges.length];
            const priceNumber = Number(product?.price) || 0;
            const stockCount = Number(product?.stock) || 0;
            const isLowStock = stockCount > 0 && stockCount <= 5;
            const isOutOfStock = stockCount <= 0;

            return (
              <div
                key={product._id || product.id || product.number || index}
                className="rounded-xl border border-[#E2DDD5] bg-[#FAF8F5]/60 hover:bg-white hover:border-[#C6A45A]/50 transition-all p-4 flex flex-col justify-between space-y-3 shadow-xs group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#C6A45A]/15 text-[#8F6F27]">
                      {badgeText}
                    </span>
                    <span className="text-[10px] font-mono text-[#77736B]">
                      {product.number || `N° 0${index + 1}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-14 h-14 rounded-lg bg-white border border-[#E2DDD5] overflow-hidden shrink-0 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Sparkles className="w-6 h-6 text-[#C6A45A]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#77736B] block">
                        {product.brand}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#292929] truncate">
                        {product.name}
                      </h4>
                      <span className="text-[11px] text-[#77736B] block">
                        {product.category} • {product.volume || "100ml"}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#77736B] flex items-center gap-1.5 pt-1">
                    <span>Occasion:</span>
                    <span className="font-medium text-[#292929]">
                      {product.function || "All Functions"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2DDD5] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[#77736B] block">
                      Price (LKR)
                    </span>
                    <span className="font-serif font-bold text-sm text-[#8F6F27]">
                      Rs. {priceNumber.toLocaleString()}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#77736B] block">
                      {orderCount > 0
                        ? `${orderCount} Dispatched`
                        : "Vault Inventory"}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isOutOfStock
                          ? "bg-red-100 text-red-700"
                          : isLowStock
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {isOutOfStock ? "Sold Out" : `In Stock (${stockCount})`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-10 text-center space-y-2 text-xs text-[#77736B]">
          <Package className="w-8 h-8 text-[#C6A45A] mx-auto opacity-60" />
          <p>No perfumes currently registered in the catalog.</p>
        </div>
      )}
    </div>
  );
}
