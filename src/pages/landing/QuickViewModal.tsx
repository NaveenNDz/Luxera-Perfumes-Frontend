import { useState, useEffect, type FormEvent } from "react";
import {
  X,
  Plus,
  ShieldCheck,
  Truck,
  Check,
  Star,
  MessageSquare,
  CornerDownRight,
} from "lucide-react";
import type { Product } from "../../service/product";
import type { CartItem } from "../../context/cartContext";
import {
  getProductReviews,
  addReview,
  type Review,
} from "../../service/review";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  cart?: CartItem[];
  onAddToCart: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  cart = [],
  onAddToCart,
}: QuickViewModalProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
  const [showAddReview, setShowAddReview] = useState<boolean>(false);
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  const [reviewerName, setReviewerName] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const productId = product
    ? String(product._id || product.id || product.number)
    : "";
  const isInCart = cart.some((c) => c.id === productId);

  useEffect(() => {
    if (user) {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      setReviewerName(fullName || user.email.split("@")[0]);
    } else {
      setReviewerName("");
    }
  }, [user]);

  useEffect(() => {
    if (!productId) {
      setReviews([]);
      return;
    }

    let isMounted = true;
    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const data = await getProductReviews(productId);
        if (isMounted) {
          setReviews(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        if (isMounted) setLoadingReviews(false);
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (!product) return null;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) /
          reviews.length
        ).toFixed(1)
      : "5.0";

  const handleReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a brief comment.");
      return;
    }

    const nameToSubmit = reviewerName.trim() || "Fragrance Enthusiast";

    try {
      setSubmittingReview(true);
      const newReview = await addReview({
        productId,
        name: nameToSubmit,
        rating,
        comment: comment.trim(),
      });

      setReviews((prev) => [newReview, ...prev]);
      setComment("");
      setShowAddReview(false);
      toast.success("Thank you! Your review has been published.");
    } catch (err: any) {
      console.error("Failed to submit review:", err);
      toast.error(err?.response?.data?.message || "Could not post review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-2xl bg-[#0c0c12] border border-white/15 rounded-2xl p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-white/10 pb-3.5 sm:pb-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold">
              {product.brand} · {product.number}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-bold mt-0.5">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="relative aspect-square rounded-xl bg-black/50 border border-white/10 p-4 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                Price
              </span>
              <p className="text-2xl font-bold text-white mt-0.5">
                Rs. {(Number(product.price) || 0).toLocaleString()}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                {product.volume} · {product.concentration}
              </p>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/5">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300 pt-1">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">
                  Category
                </span>
                <span className="font-medium text-white">
                  {product.category}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">
                  Suitability
                </span>
                <span className="font-medium text-white">
                  {product.suitability}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">
                  Occasion
                </span>
                <span className="font-medium text-[#e2c785]">
                  {product.function}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">
                  Batch Code
                </span>
                <span className="font-mono text-zinc-300">{product.batch}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-zinc-400 pt-2 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[#e2c785]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Original</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-3.5 h-3.5" />
                <span>Delivery across SL</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onAddToCart(product);
                if (user) {
                  onClose();
                }
              }}
              className={`w-full py-3 rounded-lg text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                isInCart
                  ? "bg-emerald-950/70 border border-emerald-500/50 text-emerald-300"
                  : "bg-[#d4af37] hover:bg-[#e0bf50] text-black shadow-[0_4px_15px_rgba(212,175,55,0.25)]"
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  In Cart (Rs. {(Number(product.price) || 0).toLocaleString()})
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  Add to Cart (Rs.{" "}
                  {(Number(product.price) || 0).toLocaleString()})
                </>
              )}
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[#d4af37]">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-serif font-bold text-base text-white">
                  {averageRating}
                </span>
              </div>
              <span className="text-xs text-zinc-400">
                · {reviews.length}{" "}
                {reviews.length === 1 ? "Customer Review" : "Customer Reviews"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowAddReview(!showAddReview)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d4af37]/40 hover:border-[#d4af37] text-[#d4af37] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{showAddReview ? "Cancel Review" : "+ Add Review"}</span>
            </button>
          </div>

          {showAddReview && (
            <form
              onSubmit={handleReviewSubmit}
              className="p-4 rounded-xl border border-[#d4af37]/30 bg-black/40 space-y-3.5 animate-fadeIn"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">
                  Share Your Review
                </span>
                <span className="text-[11px] text-zinc-400">
                  Rate your experience
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Kasun Perera"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">
                    Star Rating
                  </label>
                  <div className="flex items-center gap-1 py-1.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating || rating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              isFilled
                                ? "text-[#d4af37] fill-[#d4af37]"
                                : "text-zinc-600"
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="text-[11px] font-mono text-[#d4af37] ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  Your Review & Sillage Experience
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the projection, compliment factor, and longevity in Sri Lankan weather..."
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddReview(false)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-4 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e0bf50] text-black text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                >
                  {submittingReview ? "Submitting..." : "Post Review"}
                </button>
              </div>
            </form>
          )}

          {loadingReviews ? (
            <div className="py-8 text-center text-xs text-zinc-500 font-mono">
              Loading reviews...
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-white/5">
              {reviews.map((r) => {
                const reviewKey = String(
                  r._id || r.id || `${r.name}-${r.date || Math.random()}`,
                );
                const rRating = Number(r.rating) || 5;

                return (
                  <div key={reviewKey} className="pt-3 first:pt-0 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {r.name}
                        </span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 font-mono">
                          Verified Scent
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-[#d4af37]">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rRating ? "fill-[#d4af37]" : "text-zinc-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {r.date || "Recent"}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed pl-1">
                      {r.comment}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-zinc-500 bg-white/[0.01] rounded-xl border border-white/5 space-y-1">
              <CornerDownRight className="w-4 h-4 mx-auto text-zinc-600" />
              <p>No customer reviews yet for this fragrance.</p>
              <p className="text-[11px] text-[#d4af37]/80">
                Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
