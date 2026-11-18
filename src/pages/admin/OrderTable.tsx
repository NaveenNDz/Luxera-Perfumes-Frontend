import { Eye } from "lucide-react";
import type { OrderItem } from "../../service/order";

const TH =
  "text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#77736B] bg-[#FAF8F5]";
const TD = "px-4 py-3 text-sm text-[#292929] align-middle";

interface OrderTableProps {
  orders: OrderItem[];
  orderFilter: string;
  setOrderFilter: (filter: string) => void;
  onCycleStatus?: (orderId: string) => void;
  onSelectOrder: (order: OrderItem) => void;
  onExportCSV?: () => void;
}

function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Delivered: "border-emerald-200 bg-emerald-50 text-emerald-800",
    Dispatched: "border-sky-200 bg-sky-50 text-sky-800",
    Processing: "border-[#C6A45A]/40 bg-[#C6A45A]/10 text-[#8F6F27]",
    Pending: "border-[#E2DDD5] bg-[#F5F3EE] text-[#77736B]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 rounded-full text-[11px] font-medium ${
        map[status] || map.Pending
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}

export default function OrderTable({
  orders = [],
  orderFilter,
  setOrderFilter,
  onCycleStatus,
  onSelectOrder,
}: OrderTableProps) {
  return (
    <div className="rounded-xl border border-[#E2DDD5] bg-white shadow-sm overflow-hidden space-y-0">
      <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD5]">
        <div>
          <h3 className="font-semibold text-base text-[#292929]">
            Customer Orders
          </h3>
          <p className="text-xs text-[#77736B] mt-0.5">
            Live store orders fetched directly from backend
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-[#E2DDD5] p-0.5 bg-[#F5F3EE] text-xs">
            {["all", "Pending", "Processing", "Dispatched", "Delivered"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setOrderFilter(tab)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors cursor-pointer ${
                    orderFilter.toLowerCase() === tab.toLowerCase()
                      ? "bg-white text-[#292929] shadow-xs"
                      : "text-[#77736B] hover:text-[#292929]"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className={TH}>Order ID</th>
              <th className={TH}>Client</th>
              <th className={TH}>Purchased Items</th>
              <th className={TH}>Salon</th>
              <th className={TH}>Total</th>
              <th className={TH}>Status</th>
              <th className={TH}>Date</th>
              <th className={`${TH} text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2DDD5]">
            {orders && orders.length > 0 ? (
              orders.map((o) => {
                const orderId = String(o._id || o.id || "N/A");
                const displayId =
                  orderId.length >= 6
                    ? orderId.slice(-6).toUpperCase()
                    : orderId;
                const customer = o.customer || "Storefront Client";
                const email = o.email || "N/A";
                const flacon = o.flacon || "Custom Flacon";
                const quantity = Number(o.quantity) || 1;
                const total = Number(o.total) || 0;
                const salon = o.salon || "Colombo Salon";
                const status = o.status || "Pending";
                const date = o.date || "—";

                return (
                  <tr
                    key={orderId}
                    className="hover:bg-[#FAF8F5]/80 transition-colors"
                  >
                    <td
                      className={`${TD} font-mono text-xs font-bold text-[#8F6F27]`}
                    >
                      {displayId}
                    </td>
                    <td className={TD}>
                      <p className="font-semibold text-xs text-[#292929]">
                        {customer}
                      </p>
                      <p className="text-[11px] text-[#77736B] truncate max-w-[12rem]">
                        {email}
                      </p>
                    </td>
                    <td className={TD}>
                      <p className="text-xs text-[#292929] max-w-xs truncate">
                        {flacon}
                      </p>
                      <span className="text-[11px] text-[#77736B] font-mono">
                        Qty: {quantity}
                      </span>
                    </td>
                    <td className={`${TD} text-xs text-[#77736B]`}>{salon}</td>
                    <td
                      className={`${TD} font-serif font-bold text-sm text-[#292929]`}
                    >
                      Rs. {total.toLocaleString()}
                    </td>
                    <td className={TD}>
                      {onCycleStatus ? (
                        <button
                          onClick={() => onCycleStatus(orderId)}
                          className="cursor-pointer"
                          title="Click to cycle status"
                        >
                          <OrderStatusBadge status={status} />
                        </button>
                      ) : (
                        <OrderStatusBadge status={status} />
                      )}
                    </td>
                    <td
                      className={`${TD} text-[11px] text-[#77736B] font-mono`}
                    >
                      {date}
                    </td>
                    <td className={`${TD} text-right`}>
                      <button
                        onClick={() => onSelectOrder(o)}
                        className="p-1.5 rounded-md hover:bg-[#F5F3EE] text-[#77736B] hover:text-[#292929] transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="py-8 text-center text-xs text-[#77736B]"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
