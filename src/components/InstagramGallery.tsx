import Image from "next/image";
import { instagram } from "@/lib/data";
import Reveal from "./Reveal";

export default function InstagramGallery() {
  return (
    <section id="instagram" className="py-24 md:py-32">
      <Reveal className="section section-wide text-center">
        <p className="eyebrow">The Journal</p>
        <h2 className="mt-5 font-display text-4xl text-ivory md:text-6xl">
          @skabaya
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-ivory/70">
          An editorial diary of light, fabric, and the women who wear us.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-3">
        {instagram.map((src, i) => (
          <Reveal
            key={i}
            delay={(i % 6) * 80}
            as="article"
            className="group relative aspect-square overflow-hidden bg-gradient-to-b from-charcoal to-ink"
          >
            <Image
              src={src}
              alt={`SK Abaya editorial ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 16vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/50">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 scale-50 fill-none stroke-gold opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" className="fill-gold" />
              </svg>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
