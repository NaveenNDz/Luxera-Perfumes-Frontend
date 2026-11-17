import { useRef, useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Flame,
  Truck,
  Banknote,
  Compass,
} from 'lucide-react';
import perfumeHeroVideo from '../../assets/perfume_hero_stage_1x1.mp4';

interface HeroSectionProps {
  onOpenQuiz: () => void;
}

const BTN_GOLD = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#d4af37] hover:bg-[#e0bf50] text-black text-xs font-bold tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.4)] cursor-pointer';
const BTN_OUTLINE = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/20 hover:border-[#d4af37] text-white hover:text-[#d4af37] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer bg-white/[0.03] backdrop-blur-sm';

export default function HeroSection({ onOpenQuiz }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 max-w-xl">
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">100% Authentic</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Factory sealed boxes with batch codes</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Island-Wide Delivery</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Fast 1–3 day delivery across all provinces</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-3">
                <Banknote className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Cash on Delivery</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Inspect package and pay cash to courier</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-3">
                <Flame className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Beast Projection</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">Tested 10 to 14+ hours on skin and clothes</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <a href="#collection" className={BTN_GOLD}>
                Shop Perfumes
              </a>
              <button onClick={onOpenQuiz} className={BTN_OUTLINE}>
                <Compass className="w-4 h-4 text-[#d4af37]" /> Scent Quiz Finder
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-square rounded-2xl overflow-hidden border border-white/15 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {!videoError ? (
                <video
                  ref={videoRef}
                  src={perfumeHeroVideo || '/assets/perfume_hero_stage_1x1.mp4'}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onError={() => setVideoError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src="/assets/perfumes/afnan-9pm.jpg" alt="Luxury Perfumes" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}