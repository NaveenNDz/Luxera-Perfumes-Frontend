import { useState } from 'react';
import type { CartItem } from '../../context/cartContext';
import type { User } from '../../service/auth';
import { placeOrder } from '../../service/order';
import toast from 'react-hot-toast';
import CartHeader from './CartHeader';
import CartItemList from './CartItemList';
import OrderSummary from './OrderSummary';
import OrderSuccess from './OrderSuccess';

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
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const deliveryFee = 500;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = promoApplied ? Math.round(subtotal * promoDiscount) : 0;
  const total = Math.max(0, subtotal + (subtotal > 0 ? deliveryFee : 0) - discountAmount);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleFavorite = (id: string, name: string) => {
    const nextState = !favorites[id];
    setFavorites((prev) => ({ ...prev, [id]: nextState }));
    if (nextState) toast.success(`Saved ${name} to wishlist`);
  };

  const handleApplyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (['LUXERA', 'LUXERA10', 'VIP10', 'PROMO10'].includes(upper)) {
      setPromoDiscount(0.1);
      setPromoApplied(true);
      return true;
    }
    return false;
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setPromoDiscount(0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setIsSubmitting(true);

    try {
      const customerName = currentUser
        ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim()
        : 'Storefront Client';

      const customerEmail = currentUser ? currentUser.email : 'client@luxera.lk';

      const flaconSummary = cart
        .map((item) => `${item.name} (${item.volume}) x${item.quantity}`)
        .join(', ');

      const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      await placeOrder({
        customer: customerName,
        email: customerEmail,
        salon: 'LUXERA Colombo Salon',
        flacon: flaconSummary,
        quantity: itemCount,
        total: total,
        status: 'Pending',
        date: formattedDate,
      });

      setOrderConfirmed(true);
      if (onClearCart) {
        onClearCart();
      }
      toast.success('Your order has been placed successfully!');
    } catch (error: any) {
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
    <div className="min-h-screen w-full bg-[#f8f9fb] text-neutral-900 font-sans flex flex-col justify-between">
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
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-neutral-100/80">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                <CartItemList
                  cart={cart}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveFromCart={onRemoveFromCart}
                  onBackToStorefront={onBackToStorefront}
                />

                {cart.length > 0 && (
                  <OrderSummary
                    subtotal={subtotal}
                    deliveryFee={deliveryFee}
                    total={total}
                    promoApplied={promoApplied}
                    promoDiscount={promoDiscount}
                    discountAmount={discountAmount}
                    onApplyPromo={handleApplyPromo}
                    onRemovePromo={handleRemovePromo}
                    onCheckout={handleCheckout}
                  />
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        © 2026 LUXERA Perfumes. All rights reserved.
      </footer>
    </div>
  );
}