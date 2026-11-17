import { ArrowUpRight, ShoppingBag, Package, AlertCircle } from 'lucide-react';
import type { OrderItem } from '../../service/order';
import type { Product } from '../../service/product';
import BestSellingPerfumes from './BestSellingPerfumes';

interface OverviewTabProps {
  totalRevenue: number;
  totalFlaconsSold: number;
  totalVaultStock: number;
  pendingOrdersCount: number;
  orders: OrderItem[];
  products: Product[];
}

export default function OverviewTab({
  totalRevenue = 0,
  totalFlaconsSold = 0,
  totalVaultStock = 0,
  pendingOrdersCount = 0,
  orders = [],
  products = [],
}: OverviewTabProps) {
  const recentOrders = (orders || []).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#E2DDD5] bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#77736B]">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Total Revenue</span>
            <ArrowUpRight className="w-4 h-4 text-[#8F6F27]" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#292929]">
            Rs. {(Number(totalRevenue) || 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-[#77736B]">Generated from confirmed orders</p>
        </div>

        <div className="rounded-xl border border-[#E2DDD5] bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#77736B]">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Bottles Dispatched</span>
            <ShoppingBag className="w-4 h-4 text-zinc-700" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#292929]">
            {(Number(totalFlaconsSold) || 0).toLocaleString()} pcs
          </p>
          <p className="text-[11px] text-[#77736B]">Total units ordered</p>
        </div>

        <div className="rounded-xl border border-[#E2DDD5] bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#77736B]">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Vault Stock</span>
            <Package className="w-4 h-4 text-zinc-700" />
          </div>
          <p className="font-serif text-2xl font-bold text-[#292929]">
            {(Number(totalVaultStock) || 0).toLocaleString()} Units
          </p>
          <p className="text-[11px] text-[#77736B]">Across active collection inventory</p>
        </div>

        <div className="rounded-xl border border-[#E2DDD5] bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#77736B]">
            <span className="uppercase tracking-wider font-semibold text-[10px]">Pending Orders</span>
            <AlertCircle className={`w-4 h-4 ${pendingOrdersCount > 0 ? 'text-amber-700' : 'text-emerald-700'}`} />
          </div>
          <p className="font-serif text-2xl font-bold text-[#292929]">
            {Number(pendingOrdersCount) || 0}
          </p>
          <p className="text-[11px] text-[#77736B]">Awaiting courier dispatch</p>
        </div>
      </div>

      
      <BestSellingPerfumes products={products} orders={orders} />

      
      <div className="rounded-xl border border-[#E2DDD5] bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-3">
          <div>
            <h3 className="font-semibold text-sm text-[#292929]">Recent Orders Summary</h3>
            <p className="text-xs text-[#77736B]">Live dispatch activity from customer checkouts</p>
          </div>
          <span className="font-serif font-bold text-base text-[#8F6F27]">
            {orders ? orders.length : 0} total orders
          </span>
        </div>

        {recentOrders.length > 0 ? (
          <div className="divide-y divide-[#E2DDD5]">
            {recentOrders.map((o) => {
              const orderKey = String(o?._id || o?.id || `${o?.customer || 'order'}-${o?.date || 'now'}`);
              const customerName = o?.customer || 'Storefront Client';
              const flaconName = o?.flacon || 'Custom Fragrance';
              const orderTotal = Number(o?.total) || 0;
              const orderDate = o?.date || '—';

              return (
                <div key={orderKey} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#292929]">{customerName}</span>
                    <span className="text-[#77736B] ml-2">({flaconName})</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif font-bold text-[#8F6F27]">
                      Rs. {orderTotal.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-[#77736B]">{orderDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-[#77736B]">
            No orders placed yet. Orders will appear here upon customer checkout.
          </div>
        )}
      </div>
    </div>
  );
}