import { Star } from 'lucide-react';

export default function ReviewsSection() {
  const reviews = [
    {
      id: 'r1',
      name: 'Kasun Perera',
      location: 'Colombo 07',
      verified: 'Verified Buyer',
      title: 'Afnan 9PM is a beast-mode compliment puller',
      content: 'Ordered Afnan 9PM after seeing all the TikTok reviews. It arrived in Colombo in under 24 hours. The projection is insane—got compliments from coworkers all afternoon. 100% original sealed box with valid batch code.',
      rating: 5,
      flacon: 'Afnan 9PM',
    },
    {
      id: 'r2',
      name: 'Dinuka Fernando',
      location: 'Kandy',
      verified: 'Verified Buyer',
      title: 'Hawas Ice is the ultimate fresh scent',
      content: 'Frosted green apple and icy marine breeze that cuts right through the hot humid weather. Packaging was double-boxed with heavy bubble wrap. Cash on delivery was super smooth. Will definitely buy again!',
      rating: 5,
      flacon: 'Rasasi Hawas Ice',
    },
    {
      id: 'r3',
      name: 'Shanika Jayawardena',
      location: 'Galle',
      verified: 'Verified Buyer',
      title: 'Lattafa Khamrah is pure luxury',
      content: 'The heavy crystal decanter bottle looks so high-end! The sweet cinnamon and vanilla scent lasts more than 12 hours on my dresses. Best perfume shopping experience in Sri Lanka.',
      rating: 5,
      flacon: 'Lattafa Khamrah',
    },
  ];

  return (
    <section id="reviews" className="w-full py-16 sm:py-20 border-t border-white/[0.08] bg-[#07070b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold">
            Customer Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
            What Perfume Lovers Say
          </h2>
          <p className="text-xs text-zinc-400">
            Real feedback from satisfied fragrance collectors across Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="p-6 rounded-2xl border border-white/10 bg-[#0c0c11] space-y-3.5 hover:border-[#d4af37]/35 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#d4af37]">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
                  {r.verified}
                </span>
              </div>

              <h3 className="font-serif text-base text-white font-bold">{r.title}</h3>
              <p className="text-xs text-zinc-300 leading-relaxed italic">"{r.content}"</p>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-white block">{r.name}</span>
                  <span className="text-zinc-500 text-[10px]">{r.location}</span>
                </div>
                <span className="text-[#d4af37] text-[10px] font-mono font-medium">{r.flacon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}