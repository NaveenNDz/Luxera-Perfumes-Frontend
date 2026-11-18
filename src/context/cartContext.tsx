import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Product } from "../service/product";

export interface CartItem {
  id: string;
  number: string;
  name: string;
  brand: string;
  category: "Men" | "Women" | "Unisex";
  concentration: string;
  price: number;
  volume: string;
  batch: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalCartCount: number;
  cartSubtotal: number;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalCartCount: 0,
  cartSubtotal: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved =
        localStorage.getItem("luxera_cart") || localStorage.getItem("cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("luxera_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const productId = product._id || product.id || product.number;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);

      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      const newItem: CartItem = {
        id: productId,
        number: product.number,
        name: product.name,
        brand: product.brand,
        category: product.category,
        concentration: product.concentration,
        price: Number(product.price) || 0,
        volume: product.volume,
        batch: product.batch,
        image: product.image,
        quantity: 1,
      };

      return [...prev, newItem];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === productId) {
              const nextQty = item.quantity + delta;
              return nextQty > 0 ? { ...item, quantity: nextQty } : null;
            }
            return item;
          })
          .filter(Boolean) as CartItem[],
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
