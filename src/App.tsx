import { useState, type ReactNode } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import LandingPage from './pages/landing/LandingPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AuthPage from './pages/auth/AuthPage';
import CartPage from './pages/cart/CartPage';
import { useCart } from './context/cartContext';
import { useAuth } from './context/authContext';
import type { User as UserType } from './service/auth';

function ProtectedAdmin({ children }: { children: ReactNode }) {
  const userStr = localStorage.getItem('user');
  const user: UserType | null = userStr ? JSON.parse(userStr) : null;

  const isAdmin = Boolean(user?.roles?.includes('ADMIN'));

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminFloatingButton({
  currentView,
  currentUser,
  onToggleAdmin,
}: {
  currentView: 'storefront' | 'cart' | 'auth' | 'admin';
  currentUser: UserType | null;
  onToggleAdmin: () => void;
}) {
  const isAdmin = Boolean(currentUser?.roles?.includes('ADMIN'));

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center">
      <button
        onClick={onToggleAdmin}
        className={`group flex items-center space-x-2.5 px-4 py-2.5 rounded-full border backdrop-blur-2xl transition-all duration-300 cursor-pointer text-xs ${
          currentView === 'admin'
            ? 'border-[#C6A45A]/70 bg-[#111114]/95 text-white shadow-[0_10px_35px_rgba(198,164,90,0.3)] hover:border-[#C6A45A]'
            : 'border-[#d4af37]/60 bg-[#0c0c10]/95 text-white shadow-[0_10px_35px_rgba(212,175,55,0.35)] hover:border-[#d4af37] hover:scale-105'
        }`}
        title={currentView === 'admin' ? 'View Live Storefront' : 'Switch to Admin Panel'}
      >
        <span
          className={`w-2 h-2 rounded-full animate-pulse ${
            currentView === 'admin' ? 'bg-[#C6A45A]' : 'bg-[#d4af37]'
          }`}
        />
        {currentView === 'admin' ? (
          <span className="font-serif tracking-wider text-[11px] uppercase text-[#C6A45A] font-medium">
            View Storefront
          </span>
        ) : (
          <>
            <LayoutDashboard className="w-3.5 h-3.5 text-[#d4af37] group-hover:rotate-12 transition-transform" />
            <span className="font-serif tracking-wider text-[11px] uppercase text-[#fef08a]">
              Admin Panel
            </span>
          </>
        )}
      </button>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { user: currentUser } = useAuth();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const getCurrentView = (): 'storefront' | 'cart' | 'auth' | 'admin' => {
    const path = location.pathname;
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/cart')) return 'cart';
    if (path.startsWith('/auth') || path.startsWith('/login')) return 'auth';
    return 'storefront';
  };

  const currentView = getCurrentView();

  const navigateToAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthMode(mode);
    navigate('/auth');
  };

  const handleToggleAdmin = () => {
    if (currentView === 'admin') {
      navigate('/');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div
      className={`relative w-full min-h-screen ${
        currentView === 'admin'
          ? 'bg-[#F5F3EE]'
          : currentView === 'cart'
          ? 'bg-[#f8f9fb]'
          : 'bg-[#070709]'
      }`}
    >
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              cart={cart}
              onAddToCart={addToCart}
              onNavigateToCart={() => navigate('/cart')}
              onEnterAdmin={() => navigate('/admin')}
              onNavigateToAuth={navigateToAuth}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <LandingPage
              cart={cart}
              onAddToCart={addToCart}
              onNavigateToCart={() => navigate('/cart')}
              onEnterAdmin={() => navigate('/admin')}
              onNavigateToAuth={navigateToAuth}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateQuantity={updateQuantity}
              onRemoveFromCart={removeFromCart}
              onClearCart={clearCart}
              onBackToStorefront={() => navigate('/')}
              onNavigateToAuth={navigateToAuth}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/auth"
          element={
            <AuthPage
              initialMode={authMode}
              onBackToStorefront={() => navigate('/')}
              onSwitchToAdmin={() => navigate('/admin')}
              onSignInSuccess={() => {
                navigate('/');
              }}
            />
          }
        />
        <Route
          path="/login"
          element={
            <AuthPage
              initialMode="signin"
              onBackToStorefront={() => navigate('/')}
              onSwitchToAdmin={() => navigate('/admin')}
              onSignInSuccess={() => {
                navigate('/');
              }}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminDashboard onSwitchToStorefront={() => navigate('/')} />
            </ProtectedAdmin>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AdminFloatingButton
        currentView={currentView}
        currentUser={currentUser}
        onToggleAdmin={handleToggleAdmin}
      />
    </div>
  );
}
