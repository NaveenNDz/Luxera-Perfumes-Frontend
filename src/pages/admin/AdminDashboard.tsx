import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type Product,
} from "../../service/product";
import {
  getAllOrders,
  updateOrderStatus,
  getCustomers,
  type OrderItem,
  type CustomerItem,
} from "../../service/order";
import {
  getSystemUsers,
  updateSystemUser,
  deleteSystemUser,
  type User as UserType,
} from "../../service/auth";
import { useAuth } from "../../context/authContext";
import AdminSidebar from "./AdminSiderbar";
import AdminHeader from "./AdminHeader";
import OverviewTab from "./OverviewTab";
import ProductTable from "./ProductTable";
import OrderTable from "./OrderTable";
import ClientTable from "./ClientTable";
import OrderDetailModal from "./OrderDetailModal";
import AddProductModal from "./AddProductModal";
import RegisterUserModal from "./RegisterUserModal";
import EditUserModal from "./EditUserModal";
import {
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  ArrowLeft,
  Edit2,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

export type AdminTab =
  | "overview"
  | "products"
  | "orders"
  | "clients"
  | "settings";

interface AdminDashboardProps {
  onSwitchToStorefront?: () => void;
}

export default function AdminDashboard({}: AdminDashboardProps) {
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();
  const isAdmin = Boolean(currentUser?.roles?.includes("ADMIN"));

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [systemUsers, setSystemUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showRegisterUserModal, setShowRegisterUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserType | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [fetchedProducts, fetchedOrders] = await Promise.all([
        getAllProducts(),
        getAllOrders(),
      ]);

      setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
      setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);

      try {
        const fetchedCustomers = await getCustomers();
        if (Array.isArray(fetchedCustomers)) setCustomers(fetchedCustomers);
      } catch {}

      if (isAdmin) {
        try {
          const fetchedUsers = await getSystemUsers();
          if (Array.isArray(fetchedUsers)) setSystemUsers(fetchedUsers);
        } catch {}
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Could not sync data from server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [isAdmin]);

  const handleAccessDenied = (sectionName: string) => {
    toast.error(
      `Access Restricted: Administrator privileges are required to access ${sectionName}.`,
      {
        duration: 3500,
        icon: "🔒",
      },
    );
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleUpdateStock = async (product: Product, delta: number) => {
    const productId = product._id || product.id;
    if (!productId) return;

    const currentStock = Number(product.stock) || 0;
    const newStock = Math.max(0, currentStock + delta);

    try {
      await updateProduct(productId, { stock: newStock });
      setProducts((prev) =>
        prev.map((p) =>
          p._id === productId || p.id === productId
            ? { ...p, stock: newStock }
            : p,
        ),
      );
      toast.success(`Updated stock for ${product.name} to ${newStock}`);
    } catch {
      toast.error("Failed to update stock on server");
    }
  };

  const handleCycleStatus = async (orderId: string) => {
    const cycle = ["Pending", "Processing", "Dispatched", "Delivered"];
    const currentOrder = orders.find((o) => (o._id || o.id) === orderId);
    if (!currentOrder) return;

    const currentStatusIndex = cycle.indexOf(currentOrder.status);
    const nextStatus = cycle[(currentStatusIndex + 1) % cycle.length];

    try {
      await updateOrderStatus(orderId, nextStatus);
      setOrders((prev) =>
        prev.map((o) =>
          (o._id || o.id) === orderId ? { ...o, status: nextStatus } : o,
        ),
      );
      toast.success(`Order status updated to ${nextStatus}`);
    } catch {
      toast.error("Failed to update order status on server");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!isAdmin) {
      handleAccessDenied("Product Deletion");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
      toast.success("Product removed from catalog");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const handleAddProduct = async (newProduct: Omit<Product, "_id" | "id">) => {
    try {
      const created = await createProduct(newProduct);
      setProducts((prev) => [created, ...prev]);
      toast.success(`Registered ${created.name} in catalog`);
    } catch {
      toast.error("Failed to register product");
    }
  };

  const handleUserRegistered = async () => {
    try {
      const updatedUsers = await getSystemUsers();
      if (Array.isArray(updatedUsers)) setSystemUsers(updatedUsers);
    } catch {}
  };

  const handleOpenEditUser = (user: UserType) => {
    setUserToEdit(user);
    setShowEditUserModal(true);
  };

  const handleUpdateUser = async (
    userId: string,
    data: {
      firstName: string;
      lastName: string;
      email: string;
      role: "ADMIN" | "STAFF";
    },
  ) => {
    try {
      const updated = await updateSystemUser(userId, data);
      setSystemUsers((prev) =>
        prev.map((u) =>
          (u._id || u.id) === userId ? { ...u, ...updated } : u,
        ),
      );
      toast.success(`User updated successfully`);
    } catch (err: any) {
      console.error("Error updating user:", err);
      toast.error(err?.response?.data?.message || "Failed to update user");
    }
  };

  const handleDeleteUser = async (user: UserType) => {
    const userId = user._id || user.id;
    if (!userId) return;

    if (user.email === currentUser?.email) {
      toast.error("You cannot delete your own active administrator account.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete user "${user.firstName} ${user.lastName || ""}" (${user.email})?`,
    );
    if (!confirmed) return;

    try {
      await deleteSystemUser(userId);
      setSystemUsers((prev) => prev.filter((u) => (u._id || u.id) !== userId));
      toast.success("User removed from system");
    } catch (err: any) {
      console.error("Error deleting user:", err);
      toast.error(err?.response?.data?.message || "Failed to delete user");
    }
  };

  const totalRevenue = (orders || []).reduce(
    (sum, o) => sum + (Number(o?.total) || 0),
    0,
  );
  const totalFlaconsSold = (orders || []).reduce(
    (sum, o) => sum + (Number(o?.quantity) || 0),
    0,
  );
  const totalVaultStock = (products || []).reduce(
    (sum, p) => sum + (Number(p?.stock) || 0),
    0,
  );
  const pendingOrdersCount = (orders || []).filter((o) => {
    const status = String(o?.status || "").toLowerCase();
    return status === "pending" || status === "processing";
  }).length;

  const filteredOrders = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    if (!Array.isArray(orders)) return [];

    return orders.filter((o) => {
      if (!o) return false;
      const id = String(o._id || o.id || "").toLowerCase();
      const customer = String(o.customer || "").toLowerCase();
      const flacon = String(o.flacon || "").toLowerCase();
      const status = String(o.status || "").toLowerCase();

      const matchSearch =
        !q || id.includes(q) || customer.includes(q) || flacon.includes(q);
      const matchFilter =
        orderFilter === "all" || status === orderFilter.toLowerCase();
      return matchSearch && matchFilter;
    });
  }, [orders, searchQuery, orderFilter]);

  const filteredProducts = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    if (!Array.isArray(products)) return [];

    return products.filter((p) => {
      if (!p) return false;
      const name = String(p.name || "").toLowerCase();
      const number = String(p.number || "").toLowerCase();
      const brand = String(p.brand || "").toLowerCase();
      const category = String(p.category || "").toLowerCase();

      const matchSearch =
        !q ||
        name.includes(q) ||
        number.includes(q) ||
        brand.includes(q) ||
        category.includes(q);

      const matchCategory =
        productCategoryFilter.toLowerCase() === "all" ||
        category === productCategoryFilter.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, productCategoryFilter]);

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#292929] flex">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        pendingOrdersCount={pendingOrdersCount}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onAccessDenied={handleAccessDenied}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {isLoading ? (
            <div className="py-24 text-center space-y-3">
              <div className="w-10 h-10 border-2 border-[#C6A45A] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-[#77736B] font-mono">
                Synchronizing records...
              </p>
            </div>
          ) : (
            <>
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <OverviewTab
                    totalRevenue={totalRevenue}
                    totalFlaconsSold={totalFlaconsSold}
                    totalVaultStock={totalVaultStock}
                    pendingOrdersCount={pendingOrdersCount}
                    orders={orders}
                    products={products}
                  />
                  <OrderTable
                    orders={filteredOrders}
                    orderFilter={orderFilter}
                    setOrderFilter={setOrderFilter}
                    onCycleStatus={handleCycleStatus}
                    onSelectOrder={setSelectedOrder}
                  />
                </div>
              )}

              {activeTab === "products" && (
                <ProductTable
                  products={filteredProducts}
                  categoryFilter={productCategoryFilter}
                  setCategoryFilter={setProductCategoryFilter}
                  onUpdateStock={handleUpdateStock}
                  onDeleteProduct={handleDeleteProduct}
                  onOpenAddProduct={() => setShowAddProductModal(true)}
                />
              )}

              {activeTab === "orders" && (
                <OrderTable
                  orders={filteredOrders}
                  orderFilter={orderFilter}
                  setOrderFilter={setOrderFilter}
                  onCycleStatus={handleCycleStatus}
                  onSelectOrder={setSelectedOrder}
                />
              )}

              {activeTab === "clients" && (
                <ClientTable orders={orders} customers={customers} />
              )}

              {activeTab === "settings" && (
                <>
                  {!isAdmin ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50/60 p-10 text-center max-w-xl mx-auto space-y-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-red-950">
                        Access Restricted
                      </h3>
                      <p className="text-xs text-red-800 leading-relaxed">
                        User Management is strictly accessible to Administrator
                        accounts. Your current account is signed in as Staff.
                      </p>
                      <button
                        onClick={() => setActiveTab("overview")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-900 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Return to Overview
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="rounded-xl border border-[#E2DDD5] bg-white p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2DDD5] pb-5">
                          <div>
                            <h3 className="font-serif text-2xl font-bold text-[#292929]">
                              User Management
                            </h3>
                            <p className="text-xs text-[#77736B] mt-1">
                              Manage system access for Admin and Staff members.
                            </p>
                          </div>
                          <button
                            onClick={() => setShowRegisterUserModal(true)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C6A45A] hover:bg-[#B3934B] text-[#111114] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
                          >
                            <UserPlus className="w-4 h-4" />
                            Register User
                          </button>
                        </div>

                        <div className="pt-6 space-y-6">
                          <div className="rounded-xl border border-[#E2DDD5] bg-[#FAF8F5] p-5">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8F6F27] font-bold block mb-2">
                              Your Active Administrator Account
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                              <div>
                                <span className="text-[#77736B] block">
                                  Name
                                </span>
                                <span className="font-semibold text-[#292929]">
                                  {currentUser?.firstName}{" "}
                                  {currentUser?.lastName || ""}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#77736B] block">
                                  Email
                                </span>
                                <span className="font-semibold text-[#292929]">
                                  {currentUser?.email}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#77736B] block">
                                  Role
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-[11px] mt-0.5">
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  {currentUser?.roles?.includes("ADMIN")
                                    ? "ADMIN"
                                    : "STAFF"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {systemUsers.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-[#292929]">
                                Registered System Accounts ({systemUsers.length}
                                )
                              </h4>
                              <div className="overflow-x-auto border border-[#E2DDD5] rounded-xl bg-white">
                                <table className="w-full text-left text-xs">
                                  <thead className="bg-[#FAF8F5] text-[#77736B] border-b border-[#E2DDD5]">
                                    <tr>
                                      <th className="px-4 py-3 font-semibold">
                                        User
                                      </th>
                                      <th className="px-4 py-3 font-semibold">
                                        Email
                                      </th>
                                      <th className="px-4 py-3 font-semibold">
                                        Role
                                      </th>
                                      <th className="px-4 py-3 font-semibold text-right">
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#E2DDD5]">
                                    {systemUsers.map((u) => {
                                      const isUserAdmin =
                                        u.roles?.includes("ADMIN");
                                      const isSelf =
                                        u.email === currentUser?.email;
                                      return (
                                        <tr
                                          key={u._id || u.id || u.email}
                                          className="hover:bg-[#FAF8F5]/80"
                                        >
                                          <td className="px-4 py-3 font-semibold text-[#292929]">
                                            {u.firstName} {u.lastName || ""}
                                            {isSelf && (
                                              <span className="ml-2 text-[10px] text-[#8F6F27] font-normal">
                                                (You)
                                              </span>
                                            )}
                                          </td>
                                          <td className="px-4 py-3 text-[#77736B]">
                                            {u.email}
                                          </td>
                                          <td className="px-4 py-3">
                                            <span
                                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                                isUserAdmin
                                                  ? "bg-[#C6A45A]/20 text-[#8F6F27]"
                                                  : "bg-zinc-100 text-zinc-700"
                                              }`}
                                            >
                                              {isUserAdmin ? "ADMIN" : "STAFF"}
                                            </span>
                                          </td>
                                          <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleOpenEditUser(u)
                                                }
                                                className="p-1.5 rounded-lg border border-[#E2DDD5] hover:bg-gray-100 text-[#292929] cursor-pointer transition-colors"
                                                title="Edit User"
                                              >
                                                <Edit2 className="w-3.5 h-3.5" />
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleDeleteUser(u)
                                                }
                                                disabled={isSelf}
                                                className={`p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors ${
                                                  isSelf
                                                    ? "opacity-30 cursor-not-allowed"
                                                    : "cursor-pointer"
                                                }`}
                                                title={
                                                  isSelf
                                                    ? "Cannot delete yourself"
                                                    : "Delete User"
                                                }
                                              >
                                                <Trash2 className="w-3.5 h-3.5" />
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </main>
      </div>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onAddProduct={handleAddProduct}
        nextCatalogNumber={`N° 0${products.length + 1}`}
      />

      <RegisterUserModal
        isOpen={showRegisterUserModal}
        onClose={() => setShowRegisterUserModal(false)}
        onSuccess={handleUserRegistered}
      />

      <EditUserModal
        isOpen={showEditUserModal}
        user={userToEdit}
        onClose={() => {
          setShowEditUserModal(false);
          setUserToEdit(null);
        }}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
}
