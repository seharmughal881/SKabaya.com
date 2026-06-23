import Image from "next/image";
import Reveal from "./Reveal";

const stats = [
  { value: "1998", label: "House Founded" },
  { value: "40+", label: "Master Artisans" },
  { value: "60", label: "Countries Shipped" },
  { value: "100%", label: "Handcrafted" },
];

export default function LuxuryExperience() {
  return (
    <section
      id="experience"
      className="section section-wide grid items-center gap-12 py-24 md:py-32 lg:grid-cols-2 lg:gap-20"
    >
      {/* Imagery */}
      <Reveal className="relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-charcoal to-ink">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=80"
            alt="Atelier craftsmanship — gold embroidery on premium Nida fabric"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
        </div>
        {/* Floating gilded card */}
        <div className="glass absolute -bottom-8 -right-4 max-w-[230px] p-6 md:-right-10">
          <p className="font-serif text-lg italic leading-snug text-ivory">
            “Every stitch carries a story of heritage.”
          </p>
          <p className="font-label mt-3 text-[10px] uppercase tracking-[0.3em] text-gold">
            The SK Atelier — Dubai
          </p>
        </div>
      </Reveal>

      {/* Story */}
      <Reveal delay={120}>
        <p className="eyebrow">The Luxury Experience</p>
        <h2 className="mt-5 font-display text-4xl leading-tight text-ivory md:text-5xl">
          A heritage of{" "}
          <span className="font-serif italic text-gilded">craftsmanship</span>,
          worn with grace
        </h2>
        <div className="mt-7 space-y-5 font-serif text-lg leading-relaxed text-ivory/75 md:text-xl">
          <p>
            For over two decades, SK Abaya has dressed women who refuse to
            choose between faith and fashion. Our ateliers blend time-honoured
            Middle Eastern artistry with the precision of European couture.
          </p>
          <p>
            From the first sketch to the final gold thread, each abaya passes
            through the hands of master artisans — a quiet luxury you carry with
            you, season after season.
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-line/40 bg-line/40 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-6 text-center">
              <dd className="font-display text-3xl text-gilded">{s.value}</dd>
              <dt className="font-label mt-2 text-[9px] uppercase tracking-[0.25em] text-muted">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>

        <a href="#newsletter" className="btn-ghost mt-10">
          Discover the House
        </a>
      </Reveal>
    </section>
  );
}
