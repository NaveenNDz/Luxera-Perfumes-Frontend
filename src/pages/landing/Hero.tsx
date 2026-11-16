export default function Hero() {
  return (
    <header className="h-[50vh] flex items-center justify-center text-center">
      <div>
        <h1 className="text-5xl font-serif mb-4">Authentic Perfumes</h1>
        <p className="text-gray-400 mb-6">Find your signature scent.</p>
        <a
          href="#collection"
          className="bg-[#D8B45A] text-black px-6 py-3 font-bold rounded hover:bg-[#E7C779]"
        >
          Shop Now
        </a>
      </div>
    </header>
  );
}