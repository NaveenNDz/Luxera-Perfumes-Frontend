import { X } from 'lucide-react';
import type { OrderItem } from '../../service/order';

interface OrderDetailModalProps {
  order: OrderItem | null;
  onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  if (!order) return null;

  const orderId = order._id || order.id || 'N/A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/40" />
      <div className="relative w-full max-w-md bg-white border border-[#E2DDD5] rounded-xl p-6 shadow-xl space-y-4 z-10">
        <div className="flex items-start justify-between border-b border-[#E2DDD5] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8F6F27]">
              Order Invoice Details
            </span>
            <h3 className="text-lg font-serif font-bold text-[#292929]">
              {order.customer}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#77736B] hover:text-[#292929] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
            <span className="text-[#77736B]">Order ID:</span>
            <span className="font-mono text-[#8F6F27] font-semibold">{orderId}</span>
          </div>
          <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
            <span className="text-[#77736B]">Email:</span>
            <span className="text-[#292929] font-medium">{order.email}</span>
          </div>
          {order.phone && (
            <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
              <span className="text-[#77736B]">Contact Phone:</span>
              <span className="text-[#292929] font-mono font-medium">{order.phone}</span>
            </div>
          )}
          {order.address && (
            <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
              <span className="text-[#77736B]">Delivery Address:</span>
              <span className="text-[#292929] font-medium max-w-[14rem] text-right">{order.address}</span>
            </div>
          )}
          {order.paymentMethod && (
            <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
              <span className="text-[#77736B]">Payment Method:</span>
              <span className="text-emerald-700 font-semibold">{order.paymentMethod}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
            <span className="text-[#77736B]">Ordered Items:</span>
            <span className="text-[#292929] font-medium max-w-[14rem] text-right">
              {order.flacon}
            </span>
          </div>
          <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
            <span className="text-[#77736B]">Total Quantity:</span>
            <span className="text-[#292929] font-medium">{order.quantity} pcs</span>
          </div>
          <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
            <span className="text-[#77736B]">Salon / Hub:</span>
            <span className="text-[#292929]">{order.salon}</span>
          </div>
          <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
            <span className="text-[#77736B]">Status:</span>
            <span className="font-medium text-[#8F6F27]">{order.status}</span>
          </div>
          <div className="flex justify-between border-b border-[#E2DDD5] pb-2">
            <span className="text-[#77736B]">Date:</span>
            <span className="text-[#292929] font-mono">{order.date}</span>
          </div>
          <div className="flex justify-between items-baseline pt-1">
            <span className="text-sm font-semibold uppercase text-[#292929]">Total Payable:</span>
            <span className="font-serif text-xl font-bold text-[#8F6F27]">
              Rs. {(Number(order.total) || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-[#292929] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
