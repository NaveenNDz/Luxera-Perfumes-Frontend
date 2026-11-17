import { useState } from 'react';
import type { CartItem } from '../../context/cartContext';
import type { User } from '../../service/auth';
import { placeOrder } from '../../service/order';
import toast from 'react-hot-toast';
import CartHeader from './CartHeader';
import CartItemList from './CartItemList';
import OrderSummary from './OrderSummary';
import OrderSuccess from './OrderSuccess';
import CheckoutModal from './CheckoutModal';

export interface CartPageProps {
  cart?: CartItem[];
  onUpdateQuantity?: (productId: string, delta: number) => void;
  onRemoveFromCart?: (productId: string) => void;
  onClearCart?: () => void;
  onBackToStorefront: () => void;
  onNavigateToAuth?: (mode?: 'signin' | 'signup') => void;
  currentUser?: User | null;
}

export default function CartPage({
  cart = [],
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onBackToStorefront,
  onNavigateToAuth,
  currentUser,
}: CartPageProps) {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const deliveryFee = 500;
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;
  const itemCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  // Called from CheckoutModal when confirmed
  const handleCompleteOrder = async (formData: {
    name: string;
    phone: string;
    address: string;
    paymentType: 'cod' | 'card';
  }) => {
    if (cart.length === 0) return;

    if (formData.paymentType === 'card') {
      toast.error('Currently unavailable. Only cash on delivery.');
      return;
    }

    setIsSubmitting(true);

    try {
      const flaconSummary = cart
        .map((item) => `${item.name} (${item.volume || '100ml'}) x${item.quantity}`)
        .join(', ');

      const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      await placeOrder({
        customer: formData.name,
        email: currentUser?.email || `${formData.phone.replace(/\s+/g, '')}@luxera.lk`,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: 'Cash on delivery',
        salon: `Island-wide COD (${formData.address})`,
        flacon: flaconSummary,
        quantity: itemCount,
        total: total,
        status: 'Pending',
        date: formattedDate,
      });

      setShowCheckoutModal(false);
      setOrderConfirmed(true);
      if (onClearCart) {
        onClearCart();
      }
      toast.success('Your order has been placed! Our courier dispatch is in progress.');
    } catch (error: any) {
      console.error('Checkout error:', error);
      const msg = error.response?.data?.message || 'Failed to place order. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnToBoutique = () => {
    setOrderConfirmed(false);
    onBackToStorefront();
  };

  return (
    <div className="min-h-screen w-full bg-[#08080c] text-zinc-100 font-sans flex flex-col justify-between selection:bg-[#d4af37]/30 selection:text-white">
      <div>
        <CartHeader
          onBackToStorefront={onBackToStorefront}
          onNavigateToAuth={onNavigateToAuth}
          itemCount={itemCount}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {orderConfirmed ? (
            <OrderSuccess
              itemCount={itemCount}
              total={total}
              onContinueShopping={handleReturnToBoutique}
            />
          ) : cart.length === 0 ? (
            <CartItemList
              cart={cart}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveFromCart={onRemoveFromCart}
              onBackToStorefront={onBackToStorefront}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <CartItemList
                cart={cart}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveFromCart={onRemoveFromCart}
                onBackToStorefront={onBackToStorefront}
              />

              <OrderSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                total={total}
                onCheckout={() => setShowCheckoutModal(true)}
              />
            </div>
          )}
        </main>
      </div>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-zinc-500">
        © 2026 LUXERA Fine Fragrance House. All rights reserved.
      </footer>

      {/* Checkout Modal Popup */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cart={cart}
        total={total}
        deliveryFee={deliveryFee}
        currentUser={currentUser}
        onSubmitOrder={handleCompleteOrder}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
