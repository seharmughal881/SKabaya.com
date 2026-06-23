import { getBestSellers } from "@/lib/queries";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default async function BestSellers() {
  const bestSellers = await getBestSellers();

  return (
    <section id="best-sellers" className="section section-wide py-24 md:py-32">
      <Reveal className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Best Sellers</p>
          <h2 className="mt-5 font-display text-4xl text-ivory md:text-6xl">
            Loved the world{" "}
            <span className="font-serif italic text-gilded">over</span>
          </h2>
        </div>
        <a
          href="#collections"
          className="font-label group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold"
        >
          View all pieces
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 fill-none stroke-current transition-transform group-hover:translate-x-1"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-5 md:gap-7 lg:grid-cols-4">
        {bestSellers.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 100}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
