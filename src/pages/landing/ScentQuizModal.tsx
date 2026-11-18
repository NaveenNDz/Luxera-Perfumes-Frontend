import { useState } from "react";
import { X, Sparkles, Plus, Check, RotateCcw, ArrowRight } from "lucide-react";
import {
  QUIZ_QUESTIONS,
  runScentQuiz,
  type Product,
} from "../../service/product";
import type { CartItem } from "../../context/cartContext";
import toast from "react-hot-toast";

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  cart?: CartItem[];
}

export default function ScentQuizModal({
  isOpen,
  onClose,
  onAddToCart,
  cart = [],
}: ScentQuizModalProps) {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [quizResults, setQuizResults] = useState<
    | {
        product: Product;
        matchScore: number;
        reason: string;
      }[]
    | null
  >(null);

  if (!isOpen) return null;

  const handleQuizAnswer = async (key: string, val: string) => {
    const nextAnswers = { ...quizAnswers, [key]: val };
    setQuizAnswers(nextAnswers);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
      return;
    }

    setIsLoading(true);

    try {
      const data = await runScentQuiz({
        gender: nextAnswers.gender,
        time: nextAnswers.time,
        occasion: nextAnswers.occasion,
      });

      setQuizResults(data.matches || []);
    } catch {
      toast.error("Unable to fetch recommendations right now.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResults(null);
  };

  const currentQ = QUIZ_QUESTIONS[quizStep];

  const isProductInCart = (prodId?: string) => {
    if (!prodId) return false;
    return cart.some((c) => c.id === prodId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      <div className="relative w-full max-w-2xl bg-[#0c0c12] border border-[#d4af37]/40 rounded-2xl p-5 sm:p-7 shadow-[0_10px_50px_rgba(212,175,55,0.2)] space-y-6 z-10 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-[#d4af37]">
            <Sparkles className="w-4 h-4 text-[#d4af37] animate-pulse" />
            <h3 className="font-serif text-lg sm:text-xl text-white font-bold tracking-wide">
              {quizResults
                ? "Your Curated Fragrance Matches"
                : "Bespoke Scent Finder Quiz"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white cursor-pointer p-1 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoading ? (
          <div className="py-20 text-center space-y-6">
            <div className="relative w-16 h-16 mx-auto">
              <span className="animate-ping absolute inset-0 rounded-full bg-[#d4af37]/30" />
              <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] border-t-transparent animate-spin flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#d4af37] animate-pulse" />
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="font-serif text-lg text-white font-bold">
                Synthesizing Your Olfactory Profile
              </p>
              <p className="text-xs text-[#e2c785] font-mono animate-pulse">
                Calibrating sillage & notes for tropical Sri Lankan climate...
              </p>
            </div>
          </div>
        ) : quizResults ? (
          <div className="space-y-6 py-1">
            <div className="text-center space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-bold">
                Tailored Results
              </span>
              <h4 className="font-serif text-2xl text-white font-bold">
                Recommended For You
              </h4>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Matched to your personal timing, occasion, and projection
                requirements.
              </p>
            </div>

            <div className="space-y-4">
              {quizResults.map((item, idx) => {
                const prodId =
                  item.product._id || item.product.id || item.product.number;
                const isInCart = isProductInCart(prodId);
                const isTopPick = idx === 0;

                return (
                  <div
                    key={prodId || idx}
                    className={`rounded-xl p-4 sm:p-5 border transition-all flex flex-col sm:flex-row items-center sm:items-stretch gap-4 ${
                      isTopPick
                        ? "border-[#d4af37]/60 bg-gradient-to-r from-[#171510] to-[#0f0f14] shadow-[0_4px_25px_rgba(212,175,55,0.15)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-black/60 p-2 shrink-0 border border-white/10 flex items-center justify-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                      <span
                        className={`absolute -top-2 -left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          isTopPick
                            ? "bg-[#d4af37] text-black shadow-md"
                            : "bg-white/10 text-[#e2c785] border border-white/20"
                        }`}
                      >
                        #{idx + 1} · {item.matchScore}% Match
                      </span>
                    </div>

                    <div className="flex-1 text-center sm:text-left flex flex-col justify-between space-y-1">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="text-[10px] text-zinc-400 font-mono uppercase">
                            {item.product.brand} · {item.product.concentration}
                          </span>
                          <span className="text-base font-bold text-white">
                            Rs.{" "}
                            {(Number(item.product.price) || 0).toLocaleString()}
                          </span>
                        </div>

                        <h5 className="font-serif text-lg text-white font-bold">
                          {item.product.name}
                        </h5>

                        <p className="text-xs text-[#e2c785] font-medium pt-0.5">
                          ✓ {item.reason}
                        </p>

                        <p className="text-[11px] text-zinc-400 line-clamp-1 pt-1">
                          {item.product.description}
                        </p>
                      </div>

                      <div className="pt-2 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => onAddToCart(item.product)}
                          className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                            isInCart
                              ? "bg-emerald-950/70 border border-emerald-500/50 text-emerald-300"
                              : isTopPick
                                ? "bg-[#d4af37] hover:bg-[#e0bf50] text-black shadow-[0_2px_12px_rgba(212,175,55,0.3)]"
                                : "bg-white/10 hover:bg-white/20 text-white"
                          }`}
                        >
                          {isInCart ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              In Cart
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              Add to Cart (Rs.{" "}
                              {(
                                Number(item.product.price) || 0
                              ).toLocaleString()}
                              )
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg border border-white/20 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono text-[#d4af37] font-semibold">
                  Step {quizStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span>
                  {Math.round(((quizStep + 1) / QUIZ_QUESTIONS.length) * 100)}%
                  Complete
                </span>
              </div>

              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] transition-all duration-300"
                  style={{
                    width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-xl sm:text-2xl text-white font-bold leading-tight">
                {currentQ.title}
              </h4>
              <p className="text-xs text-zinc-400">{currentQ.subtitle}</p>
            </div>

            <div className="space-y-3">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => handleQuizAnswer(currentQ.key, opt.val)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#d4af37]/60 group transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <span className="text-sm font-semibold text-white group-hover:text-[#e2c785] transition-colors block">
                      {opt.label}
                    </span>
                    <span className="text-xs text-zinc-400 block leading-relaxed">
                      {opt.desc}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
