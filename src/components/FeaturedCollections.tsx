import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/queries";
import Reveal from "./Reveal";

export default async function FeaturedCollections() {
  const collections = await getCollections();

  return (
    <section id="collections" className="section section-wide py-24 md:py-32">
      <Reveal className="text-center">
        <p className="eyebrow">Featured Collections</p>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl text-ivory md:text-6xl">
          Six worlds of <span className="font-serif italic text-gilded">modest</span>{" "}
          couture
        </h2>
        <div className="mx-auto mt-7 hairline w-24" />
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c, i) => (
          <Reveal
            key={c.slug}
            delay={(i % 3) * 120}
            as="article"
            className="group relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-charcoal to-ink"
          >
            <Link
              href={`/collection/${c.slug}`}
              aria-label={c.name}
              className="absolute inset-0 z-10"
            />
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover opacity-80 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <div className="absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-gold/40" />

            <div className="absolute inset-x-0 bottom-0 p-7">
              <p className="font-label translate-y-2 text-[10px] uppercase tracking-[0.35em] text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {c.tagline}
              </p>
              <h3 className="mt-2 font-display text-2xl text-ivory md:text-3xl">
                {c.name}
              </h3>
              <span className="font-label mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-ivory/70 transition-colors group-hover:text-gold">
                Discover
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5 fill-none stroke-current"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
