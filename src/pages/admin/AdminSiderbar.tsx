import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Lock,
  LogOut,
  X,
} from 'lucide-react';
import type { AdminTab } from './AdminDashboard';

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  pendingOrdersCount: number;
  isAdmin: boolean;
  onLogout: () => void;
  onAccessDenied: (sectionName: string) => void;
}

interface NavItem {
  id: AdminTab;
  label: string;
  icon: typeof LayoutDashboard;
  adminOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Inventory', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'clients', label: 'Customers', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings, adminOnly: true },
];

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  pendingOrdersCount,
  isAdmin,
  onLogout,
  onAccessDenied,
}: AdminSidebarProps) {
  const handleNavClick = (item: NavItem) => {
    if (item.adminOnly && !isAdmin) {
      onAccessDenied(item.label);
      return;
    }

    setActiveTab(item.id);
    setMobileSidebarOpen(false);
  };

  const content = (
    <div className="flex flex-col h-full bg-[#111114] text-white p-5 border-r border-white/10">
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div>
          <span className="font-serif text-xl tracking-[0.25em] text-[#C6A45A] block">
            LUXERA
          </span>
          <span className="text-[9px] tracking-[0.2em] text-zinc-400 uppercase">
            {isAdmin ? 'Administrator Portal' : 'Staff Workspace'}
          </span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden p-1 text-zinc-400 hover:text-white cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 py-6 space-y-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          const isRestricted = item.adminOnly && !isAdmin;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs tracking-wider transition-colors cursor-pointer ${
                active
                  ? 'bg-[#C6A45A]/15 text-[#C6A45A] font-semibold border border-[#C6A45A]/30'
                  : isRestricted
                  ? 'text-zinc-500 hover:text-zinc-400 hover:bg-white/[0.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    active ? 'text-[#C6A45A]' : isRestricted ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {isRestricted && (
                  <span title="Administrator access required">
                    <Lock className="w-3.5 h-3.5 text-zinc-600" />
                  </span>
                )}
                {item.id === 'orders' && pendingOrdersCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#C6A45A] text-black text-[10px] font-bold">
                    {pendingOrdersCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs tracking-wider text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div onClick={() => setMobileSidebarOpen(false)} className="fixed inset-0 bg-black/60" />
          <div className="relative w-72 max-w-full h-full z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
}