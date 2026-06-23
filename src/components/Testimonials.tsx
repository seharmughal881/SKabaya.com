"use client";

import { useState } from "react";
import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden border-y border-line/40 bg-ink-soft py-24 md:py-32">
      <div className="grain absolute inset-0" />
      <div className="section section-wide relative">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Words from our women</p>

          {/* Quote mark */}
          <div className="mx-auto mt-8 font-display text-7xl leading-none text-gold/40">
            “
          </div>

          <blockquote
            key={active}
            className="-mt-4 font-serif text-2xl font-light leading-relaxed text-ivory md:text-4xl md:leading-[1.4] animate-[reveal-up_0.6s_var(--ease-luxe)]"
          >
            {t.quote}
          </blockquote>

          <div className="mx-auto mt-10 hairline w-16" />
          <p className="font-display mt-6 text-xl text-gilded">{t.name}</p>
          <p className="font-label mt-1 text-[10px] uppercase tracking-[0.3em] text-muted">
            {t.location}
          </p>

          {/* Dots */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-8 bg-gold" : "w-1.5 bg-muted/40"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
