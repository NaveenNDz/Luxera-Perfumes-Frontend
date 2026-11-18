import { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  Flame,
  Truck,
  Banknote,
  Compass,
} from "lucide-react";
import perfumeHeroVideo from "../../assets/perfume_hero_stage_1x1.mp4";

interface HeroSectionProps {
  onOpenQuiz: () => void;
}

const BTN_GOLD =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#d4af37] hover:bg-[#e0bf50] text-black text-xs font-bold tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] cursor-pointer";

export default function HeroSection({ onOpenQuiz }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const resumeOnInteraction = () => {
            video.play().catch(() => {});
            window.removeEventListener("click", resumeOnInteraction);
            window.removeEventListener("touchstart", resumeOnInteraction);
            window.removeEventListener("scroll", resumeOnInteraction);
          };
          window.addEventListener("click", resumeOnInteraction, {
            once: true,
            passive: true,
          });
          window.addEventListener("touchstart", resumeOnInteraction, {
            once: true,
            passive: true,
          });
          window.addEventListener("scroll", resumeOnInteraction, {
            once: true,
            passive: true,
          });
        });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("loadeddata", playVideo, { once: true });
    }
  }, []);

  return (
    <section id="hero" className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/[0.08] text-[#e2c785] text-[11px] tracking-wider uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              100% Original Perfumes · Island-Wide Delivery
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.15] tracking-tight">
              Discover Long-Lasting <br />
              <span className="italic text-[#e2c785]">Original Perfumes.</span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Handpicked for projection that lasts through Sri Lankan weather.
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1 max-w-xl">
              <div className="p-2.5 sm:p-3 rounded-xl border border-[#d4af37]/20 bg-gradient-to-b from-[#141419]/90 to-[#0c0c10]/90 backdrop-blur-md flex items-center gap-2.5 hover:border-[#d4af37]/50 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.35)] group">
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/25 flex items-center justify-center shrink-0 group-hover:bg-[#d4af37]/20 group-hover:scale-105 transition-all">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white tracking-wider uppercase truncate group-hover:text-[#fef08a] transition-colors">
                    100% Authentic
                  </h4>
                  <p className="text-[9.5px] sm:text-[11px] text-zinc-400 leading-tight truncate sm:whitespace-normal">
                    Sealed batch codes
                  </p>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl border border-[#d4af37]/20 bg-gradient-to-b from-[#141419]/90 to-[#0c0c10]/90 backdrop-blur-md flex items-center gap-2.5 hover:border-[#d4af37]/50 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.35)] group">
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/25 flex items-center justify-center shrink-0 group-hover:bg-[#d4af37]/20 group-hover:scale-105 transition-all">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white tracking-wider uppercase truncate group-hover:text-[#fef08a] transition-colors">
                    Island-Wide
                  </h4>
                  <p className="text-[9.5px] sm:text-[11px] text-zinc-400 leading-tight truncate sm:whitespace-normal">
                    Fast 1–3 day delivery
                  </p>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl border border-[#d4af37]/20 bg-gradient-to-b from-[#141419]/90 to-[#0c0c10]/90 backdrop-blur-md flex items-center gap-2.5 hover:border-[#d4af37]/50 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.35)] group">
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/25 flex items-center justify-center shrink-0 group-hover:bg-[#d4af37]/20 group-hover:scale-105 transition-all">
                  <Banknote className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white tracking-wider uppercase truncate group-hover:text-[#fef08a] transition-colors">
                    Cash on Delivery
                  </h4>
                  <p className="text-[9.5px] sm:text-[11px] text-zinc-400 leading-tight truncate sm:whitespace-normal">
                    Inspect before paying
                  </p>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl border border-[#d4af37]/20 bg-gradient-to-b from-[#141419]/90 to-[#0c0c10]/90 backdrop-blur-md flex items-center gap-2.5 hover:border-[#d4af37]/50 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.35)] group">
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/25 flex items-center justify-center shrink-0 group-hover:bg-[#d4af37]/20 group-hover:scale-105 transition-all">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] sm:text-xs font-semibold text-white tracking-wider uppercase truncate group-hover:text-[#fef08a] transition-colors">
                    Beast Projection
                  </h4>
                  <p className="text-[9.5px] sm:text-[11px] text-zinc-400 leading-tight truncate sm:whitespace-normal">
                    Tested 14h+ longevity
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <a href="#collection" className={BTN_GOLD}>
                Shop Perfumes
              </a>
              <button
                type="button"
                onClick={onOpenQuiz}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg border border-[#d4af37]/60 hover:border-[#d4af37] text-white hover:text-[#fef08a] text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.18)] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)] cursor-pointer bg-white/[0.04] backdrop-blur-sm overflow-hidden"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
                </span>
                <Compass className="w-4 h-4 text-[#d4af37] group-hover:rotate-45 transition-transform" />
                <span>Scent Quiz Finder</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
              {!videoError ? (
                <video
                  ref={videoRef}
                  src={perfumeHeroVideo || "/assets/perfume_hero_stage_1x1.mp4"}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-contain pointer-events-none select-none transform-gpu will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                />
              ) : (
                <img
                  src="/assets/perfumes/afnan-9pm.jpg"
                  alt="Luxury Perfumes"
                  className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
