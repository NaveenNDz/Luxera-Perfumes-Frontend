import { ShieldCheck, Truck, Banknote, MessageCircle } from "lucide-react";

export default function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="w-full py-16 sm:py-20 border-t border-white/[0.08] bg-[#060609]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold">
            The LUXERA Promise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
            Why Customers Trust Us
          </h2>
          <p className="text-xs text-zinc-400">
            We make buying genuine luxury perfumes safe, transparent, and
            hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-3 hover:border-[#d4af37]/35 transition-colors">
            <ShieldCheck className="w-8 h-8 text-[#d4af37]" />
            <h3 className="font-serif text-lg text-white font-bold">
              100% Genuine Guaranteed
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every bottle is imported directly from authorized distributors.
              Sealed with authentic batch codes.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-3 hover:border-[#d4af37]/35 transition-colors">
            <Banknote className="w-8 h-8 text-[#d4af37]" />
            <h3 className="font-serif text-lg text-white font-bold">
              Cash on Delivery
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Order with peace of mind. Check your parcel and pay cash to the
              courier rider upon delivery.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-3 hover:border-[#d4af37]/35 transition-colors">
            <Truck className="w-8 h-8 text-[#d4af37]" />
            <h3 className="font-serif text-lg text-white font-bold">
              Fast 1–3 Day Shipping
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dispatched quickly in secure bubble wrap via trusted local
              couriers island-wide.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-3 hover:border-[#d4af37]/35 transition-colors">
            <MessageCircle className="w-8 h-8 text-[#d4af37]" />
            <h3 className="font-serif text-lg text-white font-bold">
              WhatsApp Support
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Not sure which scent to pick? Message us directly on WhatsApp for
              instant assistance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
