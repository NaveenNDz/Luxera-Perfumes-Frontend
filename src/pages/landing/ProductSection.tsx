import { useState } from "react";
import ProductCard from "./ProductCard";
import { type Product } from "../../service/product";

export default function ProductSection({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("All");

  
  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <main id="collection" className="max-w-7xl mx-auto p-6">
      
      
      <div className="flex justify-center gap-2 mb-8">
        {["All", "Men", "Women", "Unisex"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded text-xs font-bold ${
              category === cat ? "bg-[#D8B45A] text-black" : "bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}