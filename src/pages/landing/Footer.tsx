export default function Footer() {
  return (
    <footer className="w-full bg-[#040406] border-t border-white/[0.08] py-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-10 pb-8 border-b border-white/[0.06] text-center md:text-left">
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <h3 className="font-serif text-2xl text-white tracking-[0.2em] font-bold">
              LUXERA
            </h3>
            <p className="text-[11px] text-zinc-400 leading-relaxed max-w-sm md:max-w-none">
              Your premier destination for 100% authentic original fragrances in
              Sri Lanka.
            </p>
            <div className="pt-1 text-[11px] text-[#e2c785] font-semibold">
              Island-wide Delivery & Cash on Delivery Available
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-3">
              Customer Service
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="#why-us"
                  className="hover:text-white transition-colors"
                >
                  Authenticity Guarantee
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  className="hover:text-white transition-colors"
                >
                  Cash on Delivery Info
                </a>
              </li>
              <li>
                <a href="#guide" className="hover:text-white transition-colors">
                  Fragrance Guide
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Assistance
                </a>
              </li>
              <li>
                <a
                  href="#collection"
                  className="hover:text-white transition-colors"
                >
                  Browse Perfumes
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold mb-3">
              Customer Support
            </h4>
            <div className="space-y-2 text-[11px] leading-relaxed">
              <p className="text-white font-semibold">LUXERA Perfumes</p>
              <p>Colombo 03, Sri Lanka</p>
              <p className="text-[#e2c785] pt-1 font-semibold">
                Hotline: +94 75 520 1694
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 text-center sm:text-left">
          <p>© 2026 LUXERA Perfumes. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
            <span>100% Original</span>
            <span>·</span>
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>Island-Wide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
