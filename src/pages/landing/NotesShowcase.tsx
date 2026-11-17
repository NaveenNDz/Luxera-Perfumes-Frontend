export interface FragranceFamily {
  id: string;
  name: string;
  type: string;
  origin: string;
  desc: string;
}

const FRAGRANCE_FAMILIES: FragranceFamily[] = [
  {
    id: 'fam-01',
    name: 'Warm Amber & Woods',
    type: 'Evening & Night',
    origin: 'Natural Resins & Balsams',
    desc: 'Rich, comforting depth with intense projection and 12+ hour longevity on fabrics.',
  },
  {
    id: 'fam-02',
    name: 'Fresh Aquatic & Citrus',
    type: 'Daytime & Office',
    origin: 'Mediterranean Zests',
    desc: 'Crisp bergamot and clean marine accords crafted to stay vibrant in warm climates.',
  },
  {
    id: 'fam-03',
    name: 'Sweet Gourmand',
    type: 'Date & Parties',
    origin: 'Vanilla Pods & Spices',
    desc: 'Decadent vanilla, tonka bean, and warm spices creating an irresistible scent trail.',
  },
  {
    id: 'fam-04',
    name: 'Smoky Leather & Woods',
    type: 'Signature Masculine',
    origin: 'Aged Birch & Cedar',
    desc: 'Commanding dry woods and birch smokiness that creates an authoritative presence.',
  },
];

export default function NotesShowcase() {
  return (
    <section className="w-full py-16 border-t border-white/[0.08] bg-[#07070b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] font-semibold">
            Olfactory Families
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold">
            Fragrance Profiles
          </h2>
          <p className="text-xs text-zinc-400">
            Discover key scent families to identify your signature style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FRAGRANCE_FAMILIES.map((family) => (
            <div
              key={family.id}
              className="p-5 rounded-xl border border-white/10 bg-[#0c0c11] space-y-2 hover:border-[#d4af37]/30 transition-colors"
            >
              <span className="text-[9px] uppercase tracking-wider text-[#d4af37] font-bold block">
                {family.type}
              </span>
              <h3 className="font-serif text-lg text-white font-bold">{family.name}</h3>
              <p className="text-[11px] text-zinc-500 font-mono">Profile: {family.origin}</p>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1">{family.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}