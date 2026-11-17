import { ArrowLeft } from 'lucide-react';

interface AuthHeaderProps {
  onBackToStorefront?: () => void;
}

export default function AuthHeader({ onBackToStorefront }: AuthHeaderProps) {
  return (
    <header className="relative z-10 px-6 md:px-12 lg:px-16 py-6 flex justify-between items-center">
      <div>
        <h2 className="font-serif text-2xl tracking-[0.25em]">LUXERA</h2>
        <p className="text-[9px] text-[#D8B45A] tracking-[0.2em] uppercase mt-1">Original Perfumes</p>
      </div>

      {onBackToStorefront && (
        <button
          onClick={onBackToStorefront}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-[#D8B45A] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Store</span>
        </button>
      )}
    </header>
  );
}