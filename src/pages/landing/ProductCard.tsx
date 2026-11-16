import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-[#0c0c11] p-4 rounded-xl border border-white/10 flex flex-col hover:border-[#D8B45A]/50 transition-colors">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 object-contain"
      />

      <h3 className="font-serif text-lg mt-2">{product.name}</h3>
      <p className="text-xs text-gray-400">
        {product.brand} · {product.category}
      </p>

      <div className="mt-auto flex justify-between items-center pt-4">
        <span className="font-bold text-[#D8B45A]">Rs. {product.price}</span>
        <button
          onClick={handleAddToCart}
          className="bg-[#D8B45A] text-black px-3 py-1 rounded text-xs font-bold hover:bg-[#E7C779]"
        >
          Add
        </button>
      </div>
    </div>
  );
}