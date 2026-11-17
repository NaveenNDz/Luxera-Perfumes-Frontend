import { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User as UserIcon, LogOut, MessageCircle } from 'lucide-react';
import { useAuth } from '../../context/authContext';

interface NavbarProps {
  onNavigateToCart?: () => void;
  onOpenSearch: () => void;
  onOpenQuiz?: () => void;
  totalItemsCount: number;
  onNavigateToAuth?: (mode?: 'signin' | 'signup') => void;
}

export default function Navbar({
  onNavigateToCart,
  onOpenSearch,
  totalItemsCount,
  onNavigateToAuth,
}: NavbarProps) {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDisplayName = () => {
    if (!user) return '';
    if (user.firstName) return user.firstName;
    if (user.email) {
      const prefix = user.email.split('@')[0];
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    return 'Client';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080c]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex flex-col leading-tight group">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] text-white group-hover:text-[#e2c785] transition-colors">
            LUXERA
          </span>
          <span className="text-[9px] tracking-[0.2em] text-[#d4af37] uppercase font-semibold">
            Fine Fragrance House
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-semibold tracking-[0.16em] uppercase text-zinc-300">
          <a href="#collection" className="hover:text-[#e2c785] transition-colors">Perfumes</a>
          <a href="#philosophy" className="hover:text-[#e2c785] transition-colors">Philosophy</a>
          <a href="#why-us" className="hover:text-[#e2c785] transition-colors">Why Us</a>
          <a href="#reviews" className="hover:text-[#e2c785] transition-colors">Reviews</a>
          <a href="#contact" className="hover:text-[#e2c785] transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://wa.me/+94755201694"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-colors text-[11px] font-medium"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={onOpenSearch}
            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Search"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onNavigateToCart}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#d4af37] text-black text-[9px] font-bold flex items-center justify-center shadow-md">
                {totalItemsCount}
              </span>
            )}
          </button>

          <div className="hidden sm:flex items-center pl-2 border-l border-white/10">
            {user ? (
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-[#e2c785] font-medium tracking-wide">
                  Hi, {getDisplayName()}
                </span>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white transition-colors cursor-pointer border border-white/15 hover:border-white/30 px-2 py-0.5 rounded"
                  title="Log Out"
                >
                  <LogOut className="w-3 h-3 text-zinc-400" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigateToAuth && onNavigateToAuth('signin')}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors cursor-pointer py-1 px-1.5 font-medium"
                title="Sign In"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c11] border-b border-white/10 px-6 py-5 space-y-3.5 text-[11px] uppercase tracking-widest text-zinc-300">
          <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#e2c785]">Perfumes</a>
          <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#e2c785]">Philosophy</a>
          <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#e2c785]">Why Us</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#e2c785]">Reviews</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#e2c785]">Contact</a>

          <a
            href="https://wa.me/+94755201694"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-1 text-emerald-400 normal-case"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            {user ? (
              <>
                <span className="text-xs text-[#e2c785]">Hi, {getDisplayName()}</span>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white"
                >
                  <LogOut className="w-3 h-3" /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  if (onNavigateToAuth) onNavigateToAuth('signin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-[#e2c785]"
              >
                <UserIcon className="w-3.5 h-3.5" /> Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}