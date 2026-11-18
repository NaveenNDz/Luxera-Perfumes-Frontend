import type { OrderItem, CustomerItem } from "../../service/order";

const TH =
  "text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-[#77736B] bg-[#FAF8F5]";
const TD = "px-4 py-3 text-sm text-[#292929] align-middle";

interface ClientTableProps {
  orders: OrderItem[];
  customers?: CustomerItem[];
}

export default function ClientTable({
  orders = [],
  customers = [],
}: ClientTableProps) {
  let clientList: CustomerItem[] = customers;

  if (!clientList || clientList.length === 0) {
    const clientMap = new Map<string, CustomerItem>();

    (orders || []).forEach((order) => {
      if (!order) return;

      const email = String(order.email || "")
        .toLowerCase()
        .trim();
      const customer = String(order.customer || "Storefront Client");
      const key = email || customer.toLowerCase();

      if (!key) return;

      const existing = clientMap.get(key);
      const orderTotal = Number(order.total) || 0;

      if (existing) {
        existing.ordersCount += 1;
        existing.totalSpend += orderTotal;
        if (order.date) {
          existing.lastDate = order.date;
        }
      } else {
        clientMap.set(key, {
          _id: key,
          name: customer,
          email: order.email || "N/A",
          ordersCount: 1,
          totalSpend: orderTotal,
          salon: order.salon || "N/A",
          lastDate: order.date || "N/A",
        });
      }
    });

    clientList = Array.from(clientMap.values());
  }

  return (
    <div className="rounded-xl border border-[#E2DDD5] bg-white shadow-sm overflow-hidden space-y-0">
      <div className="p-4 border-b border-[#E2DDD5]">
        <h3 className="font-semibold text-base text-[#292929]">
          Customer Directory
        </h3>
        <p className="text-xs text-[#77736B] mt-0.5">
          Client purchase history and aggregate salon spending
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className={TH}>Client</th>
              <th className={TH}>Purchases</th>
              <th className={TH}>Total Spend</th>
              <th className={TH}>Salon Location</th>
              <th className={TH}>Last Active Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2DDD5]">
            {clientList.length > 0 ? (
              clientList.map((c) => (
                <tr
                  key={c.email || c._id}
                  className="hover:bg-[#FAF8F5]/80 transition-colors"
                >
                  <td className={TD}>
                    <p className="font-semibold text-xs text-[#292929]">
                      {c.name}
                    </p>
                    <p className="text-[11px] text-[#77736B]">{c.email}</p>
                  </td>
                  <td
                    className={`${TD} font-mono text-xs font-semibold text-[#292929]`}
                  >
                    {c.ordersCount} orders
                  </td>
                  <td
                    className={`${TD} font-serif font-bold text-sm text-[#8F6F27]`}
                  >
                    Rs. {(Number(c.totalSpend) || 0).toLocaleString()}
                  </td>
                  <td className={`${TD} text-xs text-[#77736B]`}>{c.salon}</td>
                  <td className={`${TD} text-[11px] text-[#77736B] font-mono`}>
                    {c.lastDate}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-xs text-[#77736B]"
                >
                  No customer records available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
