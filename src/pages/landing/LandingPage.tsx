import { useState, useEffect } from "react";
import { getAllProducts, type Product } from "../../service/product";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ProductSection from "./ProductSection";
import Footer from "./Footer";
import toast from "react-hot-toast";

export default function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        toast.error("Failed to load products");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#08080c] text-white">
      <Navbar />
      <Hero />
      
      {isLoading ? (
        <div className="text-center py-20 text-gray-400">
          Loading products...
        </div>
      ) : (
        <ProductSection products={products} />
      )}
      
      <Footer />
    </div>
  );
}