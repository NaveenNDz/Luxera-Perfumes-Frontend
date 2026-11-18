import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { getAllProducts, type Product } from "../../service/product";
import type { CartItem } from "../../context/cartContext";
import type { User } from "../../service/auth";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import PhilosophySection from "./PhilosophySection";
import CollectionSection from "./CollectionSection";
import WhyUsSection from "./WhyUsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import ScentQuizModal from "./ScentQuizModal";
import SearchModal from "./SearchModal";
import QuickViewModal from "./QuickViewModal";

export interface LandingPageProps {
  onEnterAdmin?: () => void;
  onNavigateToAuth?: (mode?: "signin" | "signup") => void;
  onNavigateToCart?: () => void;
  onAddToCart?: (product: Product) => void;
  cart?: CartItem[];
  currentUser?: User | null;
}

export default function LandingPage({
  onNavigateToAuth,
  onNavigateToCart,
  onAddToCart,
  cart = [],
  currentUser,
}: LandingPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    let isMounted = true;

    const fetchCollection = async () => {
      try {
        setIsLoading(true);
        const data = await getAllProducts();
        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load products from API:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCollection();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    if (!q) return products;

    return (products || []).filter((p) => {
      if (!p) return false;
      const name = String(p.name || "").toLowerCase();
      const brand = String(p.brand || "").toLowerCase();
      const number = String(p.number || "").toLowerCase();
      const category = String(p.category || "").toLowerCase();
      const func = String(p.function || "").toLowerCase();
      const desc = String(p.description || "").toLowerCase();

      return (
        name.includes(q) ||
        brand.includes(q) ||
        number.includes(q) ||
        category.includes(q) ||
        func.includes(q) ||
        desc.includes(q)
      );
    });
  }, [products, searchQuery]);

  const handleAddToCart = (product: Product) => {
    if (!currentUser) {
      toast.error("Please sign in first to add perfumes to your cart.", {
        duration: 3500,
        icon: "🔒",
      });
      if (onNavigateToAuth) onNavigateToAuth("signin");
      return;
    }
    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div className="min-h-screen w-full bg-[#08080c] text-zinc-100 font-sans selection:bg-[#d4af37]/30 selection:text-white">
      <Navbar
        onNavigateToCart={onNavigateToCart}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenQuiz={() => setQuizModalOpen(true)}
        totalItemsCount={totalItemsCount}
        onNavigateToAuth={onNavigateToAuth}
      />

      <HeroSection onOpenQuiz={() => setQuizModalOpen(true)} />

      <PhilosophySection onOpenQuiz={() => setQuizModalOpen(true)} />

      <CollectionSection
        products={products}
        cart={cart}
        isLoading={isLoading}
        onAddToCart={handleAddToCart}
        onOpenQuickView={setQuickViewProduct}
      />

      <WhyUsSection />

      <ContactSection />

      <Footer />

      <ScentQuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onAddToCart={handleAddToCart}
        cart={cart}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        results={filteredProducts}
        cart={cart}
        onAddToCart={handleAddToCart}
        onOpenQuickView={setQuickViewProduct}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        cart={cart}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
