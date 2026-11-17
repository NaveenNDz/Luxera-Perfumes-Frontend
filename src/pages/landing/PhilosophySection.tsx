import { Sparkles, Users, Clock, Compass, ArrowRight } from 'lucide-react';

interface PhilosophySectionProps {
  onOpenQuiz?: () => void;
}

export default function PhilosophySection({ onOpenQuiz }: PhilosophySectionProps) {
  return (
    <section id="guide" className="w-full py-16 sm:py-22 border-t border-white/[0.08] bg-[#060609]">
      <div id="philosophy" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 text-[#e2c785] text-[10px] tracking-widest uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            Hesitating Which Perfume to Buy?
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold leading-tight">
            Stop Guessing Your Signature Scent.
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Take our 60-second bespoke quiz to reveal the <strong className="text-white font-medium">3 exact perfumes</strong> crafted for your gender, daytime/night, and special functions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-3.5 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-white font-bold">1. Who Is It For?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Whether you need bold masculine woods, alluring sweet feminine vanilla, or a shared unisex signature that turns heads.
            </p>
            <span className="text-[10px] text-[#e2c785] font-semibold uppercase tracking-wider block">
              Men · Women · Unisex
            </span>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-3.5 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-white font-bold">2. Day vs. Night Wear</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tropical heat demands crisp cooling marine notes by day, and rich seductive spices for cool evenings and AC venues.
            </p>
            <span className="text-[10px] text-[#e2c785] font-semibold uppercase tracking-wider block">
              Daytime Freshness · Evening Seduction
            </span>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-3.5 hover:border-[#d4af37]/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-white font-bold">3. Select Your Function</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Match the right projection level for weddings, intimate date nights, corporate executive boardrooms, or energetic nightlife.
            </p>
            <span className="text-[10px] text-[#e2c785] font-semibold uppercase tracking-wider block">
              Weddings · Dates · Office · Parties
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d4af37]/35 bg-gradient-to-r from-[#121218] via-[#1a1813] to-[#121218] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_35px_rgba(212,175,55,0.15)]">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> 60-Second Bespoke Recommendation
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-bold">
              Find the 3 Best Perfumes for Your Exact Requirements
            </h3>
            <p className="text-xs text-zinc-400">
              Over 2,800+ customers found their signature scent with zero hesitation.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenQuiz}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#d4af37] hover:bg-[#e0bf50] text-black text-xs font-bold tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:scale-105 cursor-pointer"
          >
            <span>Launch Scent Finder Quiz</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}