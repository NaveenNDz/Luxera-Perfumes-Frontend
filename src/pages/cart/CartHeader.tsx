import { ShoppingBag, ArrowLeft, User as UserIcon } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full bg-[#08080c]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onBackToStorefront}
            className="flex flex-col leading-tight text-left group cursor-pointer"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] text-white group-hover:text-[#e2c785] transition-colors">
              LUXERA
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#d4af37] uppercase font-semibold">
              Fine Fragrance House
            </span>
          </button>

          <button
            type="button"
            onClick={onBackToStorefront}
            className="hidden sm:inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer border-l border-white/10 pl-6 py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#fef08a] text-xs font-semibold">
            <ShoppingBag className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>
              {itemCount} {itemCount === 1 ? 'Bottle' : 'Bottles'} in Cart
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigateToAuth && onNavigateToAuth('signin')}
            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="My Account"
          >
            <UserIcon className="w-4 h-4 text-zinc-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
