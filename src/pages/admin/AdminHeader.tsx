import { Search, Menu } from "lucide-react";

interface AdminHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenMobileSidebar: () => void;
}

export default function AdminHeader({
  searchQuery,
  setSearchQuery,
  onOpenMobileSidebar,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#F5F3EE] border-b border-[#E2DDD5] px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-lg border border-[#E2DDD5] text-[#292929] hover:bg-white cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#77736B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search items, orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-[#E2DDD5] text-xs text-[#292929] placeholder-[#77736B] focus:outline-none focus:border-[#C6A45A]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
