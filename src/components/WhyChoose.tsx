import { pillars } from "@/lib/data";
import Reveal from "./Reveal";

export default function WhyChoose() {
  return (
    <section
      id="why"
      className="relative overflow-hidden border-y border-line/40 bg-ink-soft py-24 md:py-32"
    >
      <div className="grain absolute inset-0" />
      <div className="section section-wide relative">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Why Choose SK Abaya</p>
          <h2 className="mt-5 font-display text-4xl text-ivory md:text-5xl">
            The difference is in the{" "}
            <span className="font-serif italic text-gilded">details</span>
          </h2>
          <p className="mt-6 font-serif text-xl leading-relaxed text-ivory/70">
            SK Abaya is not just clothing. It is a statement of elegance, grace,
            faith, and luxury — crafted to be felt as much as seen.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-line/40 bg-line/40 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i % 3) * 100}
              className="group bg-ink-soft p-9 transition-colors duration-500 hover:bg-charcoal"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold/10">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-current"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={p.icon} />
                </svg>
              </div>
              <h3 className="mt-6 font-display text-2xl text-ivory">
                {p.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
