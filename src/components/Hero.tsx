import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-charcoal via-ink to-black">
        <Image
          src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=2000&q=80"
          alt="A woman in a premium black abaya with gold embroidery in a luxury Arabian setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%] opacity-60"
        />
      </div>

      {/* Tonal vignettes */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/55 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/40" />

      {/* Floating gilded orb for depth */}
      <div
        className="pointer-events-none absolute -right-32 top-1/4 -z-10 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl animate-[float_7s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.55), transparent 70%)",
        }}
      />

      <div className="section section-wide w-full">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-gold" />
            <p className="eyebrow">The House of SK Abaya</p>
          </div>

          <h1 className="mt-7 font-display text-5xl leading-[1.05] text-ivory sm:text-6xl md:text-7xl xl:text-8xl">
            Where Modesty
            <br />
            Meets{" "}
            <span className="font-serif italic text-gilded">Timeless</span>
            <br />
            Luxury
          </h1>

          <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-ivory/80 md:text-2xl">
            Discover handcrafted abayas designed for women who embrace elegance,
            confidence, and sophistication.
          </p>

          <div className="mt-11 flex flex-col gap-4 sm:flex-row">
            <a href="#collections" className="btn-gold">
              Shop Collection
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#experience" className="btn-ghost">
              Explore Luxury
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="font-label text-[9px] uppercase tracking-[0.4em] text-muted">
          Scroll
        </span>
        <span className="h-12 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
