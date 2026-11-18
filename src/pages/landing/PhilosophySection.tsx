import {
  Sparkles,
  ShieldCheck,
  Sun,
  Moon,
  ArrowRight,
  Flame,
  Compass,
  Zap,
  CheckCircle2,
} from "lucide-react";

interface PhilosophySectionProps {
  onOpenQuiz?: () => void;
}

export default function PhilosophySection({
  onOpenQuiz,
}: PhilosophySectionProps) {
  return (
    <section
      id="philosophy"
      className="w-full py-20 sm:py-24 border-t border-white/[0.08] bg-[#060609] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#e2c785] text-[10px] tracking-widest uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            The Art of Haute Parfumerie
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-bold leading-tight">
            The LUXERA Olfactory Philosophy
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            A fragrance is not an accessory; it is your personal aura. We curate
            luxury creations where master craftsmanship meets the enduring
            projection demanded by Sri Lanka's tropical climate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-7 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-4 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-6 h-6 text-[#d4af37]" />
            </div>
            <h3 className="font-serif text-xl text-white font-bold">
              Beast-Mode Projection
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Formulated with high perfume oil concentrations (Eau de Parfum &
              Extrait de Parfum) specifically handpicked to perform flawlessly
              for 10 to 14+ hours through Sri Lankan humidity.
            </p>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-[#e2c785]">
              Tested 10-14+ Hours Projection
            </div>
          </div>

          <div className="p-7 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-4 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-serif text-xl text-white font-bold">
              100% Sealed Authenticity
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Zero decants, zero imitations. Every flacon is factory-sealed
              directly from globally celebrated houses including Lattafa,
              Rasasi, Armaf, and Afnan with verifiable batch codes.
            </p>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-emerald-400">
              Verified Batch Authentication
            </div>
          </div>

          <div className="p-7 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-4 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Compass className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-serif text-xl text-white font-bold">
              Harmonious Note Sillage
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We select compositions where opening top notes gracefully
              transition into alluring heart accords, anchored by deep ambers,
              precious woods, and warm musk that linger in memory.
            </p>
            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-[#e2c785]">
              Complex Olfactory Evolution
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0c0c12] p-8 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold block mb-1">
                Curated For Every Occasion
              </span>
              <h3 className="font-serif text-2xl text-white font-bold">
                Synchronized For Your Lifestyle
              </h3>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              Whether you need daytime invigoration for corporate meetings or
              opulent warmth for evening galas, explore your match below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] space-y-2 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-2 text-amber-400 font-serif text-base font-bold">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Daytime Elegance</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Crisp marine, citrus bergamot, and fresh aromatic accords
                designed to feel uplifting under the tropical sun.
              </p>
              <span className="text-[10px] text-[#e2c785] font-mono block pt-1">
                Best for: Office · Meetings · Day Outings
              </span>
            </div>

            <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] space-y-2 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-2 text-indigo-400 font-serif text-base font-bold">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Evening Seduction</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Opulent amber, gourmand vanilla, cinnamon, and rich oud that
                bloom in cooler evening air and air-conditioned venues.
              </p>
              <span className="text-[10px] text-[#e2c785] font-mono block pt-1">
                Best for: Date Nights · Weddings · Dinners
              </span>
            </div>

            <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] space-y-2 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-2 text-emerald-400 font-serif text-base font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Universal Signatures</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Masterfully balanced unisex harmonies of cedarwood, soft
                florals, and white musks celebrated across all genders.
              </p>
              <span className="text-[10px] text-[#e2c785] font-mono block pt-1">
                Best for: Signature Daily Wear · Celebrations
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-gradient-to-br from-[#181822] via-[#0f0f15] to-[#1c1810] p-6 sm:p-10 shadow-[0_10px_45px_rgba(212,175,55,0.18)]">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#e2c785]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#fef08a] text-[10px] uppercase font-mono tracking-widest font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
                  </span>
                  <span>AI Scent Architecture · 45-Second Match</span>
                </div>

                <h4 className="font-serif text-2xl sm:text-3xl text-white font-bold leading-tight">
                  Which Fragrance Resonates With <br />
                  <span className="italic text-[#e2c785] bg-gradient-to-r from-[#e2c785] via-[#fff1be] to-[#d4af37] bg-clip-text text-transparent">
                    Your Natural Body Chemistry?
                  </span>
                </h4>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  97% of fragrance wearers choose concentrations that evaporate
                  prematurely in Sri Lankan humidity. Our bespoke olfactory
                  match calibrates your wear climate, notes preference, and
                  function to reveal your exact flacon matches.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5 hover:border-[#d4af37]/50 transition-colors">
                    <Zap className="w-3 h-3 text-[#d4af37]" /> Beast Projection
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5 hover:border-[#d4af37]/50 transition-colors">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Smoky
                    Vanilla & Amber
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-1.5 hover:border-[#d4af37]/50 transition-colors">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> 10-14h
                    Tropical Longevity
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3.5 shrink-0">
                {onOpenQuiz && (
                  <button
                    type="button"
                    onClick={onOpenQuiz}
                    className="relative group overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f7e096] to-[#d4af37] text-black font-serif font-bold text-xs uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_55px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 w-1/2 h-full bg-white/50 skew-x-12 -translate-x-full group-hover:translate-x-[350%] transition-transform duration-1000 ease-out pointer-events-none" />

                    <Sparkles className="w-4 h-4 text-black group-hover:rotate-45 transition-transform" />
                    <span>Reveal Signature Scent</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
                  </button>
                )}

                <div className="flex items-center gap-3 text-xs">
                  <a
                    href="#collection"
                    className="text-zinc-400 hover:text-white underline underline-offset-4 transition-colors font-medium cursor-pointer"
                  >
                    Or Browse Full Catalog
                  </a>
                  <span className="text-zinc-600">·</span>
                  <span className="text-[11px] font-mono text-[#d4af37]">
                    2,840+ Curated Matches
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
