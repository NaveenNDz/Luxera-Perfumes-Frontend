export default function AuthHeader() {
  return (
    <header className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 flex justify-between items-center w-full">
      <a href="/" className="flex flex-col leading-tight group cursor-pointer">
        <h2 className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-white font-bold group-hover:text-[#D8B45A] transition-colors">
          LUXERA
        </h2>
        <p className="text-[8px] sm:text-[9px] text-[#D8B45A] tracking-[0.2em] uppercase mt-0.5 font-medium">
          Original Perfumes
        </p>
      </a>

      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-widest text-[#D8B45A]/80 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D8B45A] animate-pulse" />
        <span className="hidden sm:inline">The LUXERA Experience</span>
      </div>
    </header>
  );
}
