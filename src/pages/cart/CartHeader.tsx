import { Search, ShoppingBag, Heart, User as UserIcon } from 'lucide-react';

interface CartHeaderProps {
  onBackToStorefront: () => void;
  onNavigateToAuth?: (mode?: 'signin' | 'signup') => void;
  itemCount: number;
}

export default function CartHeader({
  onBackToStorefront,
  onNavigateToAuth,
  itemCount,
}: CartHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <button
            onClick={onBackToStorefront}
            className="font-serif text-2xl font-bold tracking-wider text-neutral-900 hover:text-black cursor-pointer"
          >
            LUXERA
          </button>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <button onClick={onBackToStorefront} className="hover:text-black cursor-pointer">Collection</button>
            <button onClick={onBackToStorefront} className="hover:text-black cursor-pointer">Women</button>
            <button onClick={onBackToStorefront} className="hover:text-black cursor-pointer">Men</button>
            <button onClick={onBackToStorefront} className="hover:text-black cursor-pointer">New In</button>
            <button onClick={onBackToStorefront} className="hover:text-black cursor-pointer">Maison</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block w-48 lg:w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-3.5 pr-8 py-1.5 rounded-md bg-neutral-100 border border-transparent focus:border-neutral-300 focus:bg-white text-xs text-neutral-800 placeholder-neutral-400 outline-none"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex items-center gap-3 text-neutral-700">
            <button onClick={onBackToStorefront} className="relative p-1.5 hover:text-black cursor-pointer" title="Shopping Bag">
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 rounded-full bg-black text-white text-[10px] font-semibold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="p-1.5 hover:text-black cursor-pointer" title="Wishlist">
              <Heart className="w-5 h-5 stroke-[1.75]" />
            </button>
            <button onClick={() => onNavigateToAuth && onNavigateToAuth('signin')} className="p-1.5 hover:text-black cursor-pointer" title="Account">
              <UserIcon className="w-5 h-5 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}