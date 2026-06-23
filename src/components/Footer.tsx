import Link from "next/link";

const footerNav = [
  {
    title: "Shop",
    links: [
      { label: "Luxury Abayas", href: "/#collections" },
      { label: "Signature", href: "/#collections" },
      { label: "Best Sellers", href: "/#best-sellers" },
      { label: "Bridal", href: "/#collections" },
      { label: "Limited Edition", href: "/#collections" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "Our Story", href: "/info/our-story" },
      { label: "Craftsmanship", href: "/info/craftsmanship" },
      { label: "Custom Tailoring", href: "/info/custom-tailoring" },
      { label: "Boutiques", href: "/info/boutiques" },
      { label: "Journal", href: "/#instagram" },
    ],
  },
  {
    title: "Client Care",
    links: [
      { label: "Shipping & Returns", href: "/info/shipping-returns" },
      { label: "Size Guide", href: "/info/size-guide" },
      { label: "Track Order", href: "/order" },
      { label: "FAQ", href: "/info/faq" },
      { label: "Contact Us", href: "/info/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line/40 bg-ink-soft">
      <div className="section section-wide py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div>
            <span className="font-display text-3xl tracking-[0.2em] text-ivory">
              SK<span className="text-gilded"> ABAYA</span>
            </span>
            <p className="mt-5 max-w-sm font-serif text-lg leading-relaxed text-ivory/70">
              Elegance in modesty. Handcrafted luxury abayas for women who wear
              their faith with grace and their style with confidence.
            </p>
            <div className="mt-7 flex gap-4">
              {["Instagram", "Pinterest", "TikTok", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  <span className="font-label text-[9px] uppercase tracking-wider">
                    {s[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="font-label text-[10px] uppercase tracking-[0.3em] text-gold">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted transition-colors hover:text-ivory"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 hairline" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
            © 2026 SK Abaya. All rights reserved.
          </p>
          <div className="font-label flex flex-wrap items-center justify-center gap-6 text-[10px] uppercase tracking-[0.25em] text-muted">
            <span>Pakistan · UAE · KSA · UK · Worldwide</span>
            <Link href="/info/privacy" className="transition-colors hover:text-gold">
              Privacy
            </Link>
            <Link href="/info/terms" className="transition-colors hover:text-gold">
              Terms
            </Link>
            <Link href="/admin" className="transition-colors hover:text-gold">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
