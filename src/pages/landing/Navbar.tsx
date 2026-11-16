import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, LogOut } from "lucide-react";
import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { totalCartCount } = useContext(CartContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-white/10 p-6 flex justify-between items-center bg-[#08080c]/90 sticky top-0 z-50">
      <Link to="/" className="text-2xl font-serif text-[#D8B45A]">
        LUXERA
      </Link>

      <div className="flex items-center gap-4">
        {user?.roles?.includes("ADMIN") && (
          <Link
            to="/admin"
            className="text-xs font-bold bg-[#D8B45A] text-black px-3 py-1 rounded"
          >
            ADMIN
          </Link>
        )}

        <Link to="/cart" className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalCartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#D8B45A] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {totalCartCount}
            </span>
          )}
        </Link>

        {user ? (
          <button onClick={handleLogout} className="text-gray-300 hover:text-red-400">
            <LogOut className="w-5 h-5" />
          </button>
        ) : (
          <Link to="/login" className="text-sm text-gray-300 hover:text-[#D8B45A]">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}