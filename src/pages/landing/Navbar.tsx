import { useState } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/authContext";

interface NavbarProps {
  onNavigateToCart?: () => void;
  onOpenSearch: () => void;
  onOpenQuiz?: () => void;
  totalItemsCount: number;
  onNavigateToAuth?: (mode?: "signin" | "signup") => void;
  onEnterAdmin?: () => void;
}

export default function Navbar({
  onNavigateToCart,
  onOpenSearch,
  onOpenQuiz,
  totalItemsCount,
  onNavigateToAuth,
  onEnterAdmin,
}: NavbarProps) {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStaffOrAdmin = Boolean(
    user?.roles?.some((r) => r === "ADMIN" || r === "STAFF"),
  );

  const getDisplayName = () => {
    if (!user) return "";
    if (user.firstName) return user.firstName;
    if (user.email) {
      const prefix = user.email.split("@")[0];
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    return "Client";
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

        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-semibold tracking-[0.16em] uppercase text-zinc-300">
          <a
            href="#collection"
            className="hover:text-[#e2c785] transition-colors"
          >
            Perfumes
          </a>
          <a
            href="#philosophy"
            className="hover:text-[#e2c785] transition-colors"
          >
            Philosophy
          </a>
          <a href="#why-us" className="hover:text-[#e2c785] transition-colors">
            Why Us
          </a>
          <a href="#contact" className="hover:text-[#e2c785] transition-colors">
            Contact
          </a>

          {onOpenQuiz && (
            <button
              type="button"
              onClick={onOpenQuiz}
              className="relative group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#fde047]/25 to-[#d4af37]/20 border border-[#d4af37]/70 text-[#fef08a] hover:text-white transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:border-[#d4af37] cursor-pointer"
              title="Launch Bespoke Scent Finder Quiz"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span className="text-[10px] tracking-[0.18em] font-bold uppercase text-[#fef08a] group-hover:text-white transition-colors">
                Scent Finder
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#d4af37]/30 text-[#fffbeb] font-mono font-bold tracking-wider">
                QUIZ
              </span>
            </button>
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
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

          <div className="hidden sm:flex items-center pl-2 border-l border-white/10 gap-2">
            {user ? (
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-[#e2c785] font-medium tracking-wide">
                  Hi, {getDisplayName()}
                </span>

                {isStaffOrAdmin && onEnterAdmin && (
                  <button
                    onClick={onEnterAdmin}
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/40 hover:bg-[#d4af37]/15 px-2.5 py-1 rounded transition-colors cursor-pointer"
                    title="Switch to Admin Panel"
                  >
                    <LayoutDashboard className="w-3 h-3 text-[#d4af37]" />
                    <span>Admin Panel</span>
                  </button>
                )}

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
                onClick={() => onNavigateToAuth && onNavigateToAuth("signin")}
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
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c11] border-b border-white/10 px-6 py-5 space-y-3.5 text-[11px] uppercase tracking-widest text-zinc-300">
          <a
            href="#collection"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#e2c785]"
          >
            Perfumes
          </a>
          <a
            href="#philosophy"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#e2c785]"
          >
            Philosophy
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#e2c785]"
          >
            Why Us
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#e2c785]"
          >
            Contact
          </a>

          {onOpenQuiz && (
            <button
              type="button"
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#d4af37]/25 via-[#fde047]/15 to-[#d4af37]/25 border border-[#d4af37]/60 text-[#fef08a] font-semibold tracking-wider text-xs shadow-[0_0_20px_rgba(212,175,55,0.25)] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
                </span>
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span className="font-serif tracking-widest uppercase text-xs text-white">
                  Scent Finder Quiz
                </span>
              </div>
              <span className="text-[10px] bg-[#d4af37] text-black font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                Match Scent
              </span>
            </button>
          )}

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#e2c785]">
                    Hi, {getDisplayName()}
                  </span>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white"
                  >
                    <LogOut className="w-3 h-3" /> Logout
                  </button>
                </div>

                {isStaffOrAdmin && onEnterAdmin && (
                  <button
                    onClick={() => {
                      onEnterAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 py-2 text-[#d4af37] font-semibold tracking-wider uppercase text-[11px] border border-[#d4af37]/30 bg-[#d4af37]/10 rounded px-3"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Go to Admin Panel</span>
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  if (onNavigateToAuth) onNavigateToAuth("signin");
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
