"use client";

import { useEffect, useState } from "react";
import { navLinks, currencies, languages } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currency, setCurrency] = useState<string>(currencies[0]);
  const [lang, setLang] = useState<string>(languages[0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div className="font-label relative z-50 bg-ink text-center text-[10px] uppercase tracking-[0.3em] text-gold/90">
        <p className="py-2.5">
          Complimentary worldwide shipping · Custom tailoring by appointment
        </p>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]"
            : "bg-transparent"
        }`}
      >
        <div className="section section-wide flex items-center justify-between gap-4 py-5">
          {/* Left — burger (mobile) + nav (desktop) */}
          <nav className="hidden flex-1 items-center gap-8 lg:flex">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-label text-xs uppercase tracking-[0.25em] text-ivory/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="block h-px w-7 bg-ivory" />
            <span className="mt-1.5 block h-px w-7 bg-ivory" />
            <span className="mt-1.5 block h-px w-5 bg-gold" />
          </button>

          {/* Center — logo */}
          <a href="#top" className="flex flex-col items-center text-center">
            <span className="font-display text-2xl leading-none tracking-[0.2em] text-ivory md:text-3xl">
              SK<span className="text-gilded"> ABAYA</span>
            </span>
            <span className="font-label mt-1 text-[8px] uppercase tracking-[0.5em] text-gold/70">
              Elegance in Modesty
            </span>
          </a>

          {/* Right — actions */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.slice(3).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-label text-xs uppercase tracking-[0.25em] text-ivory/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="text-ivory/80 transition-colors hover:text-gold"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-current"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </button>

            <button
              aria-label="Wishlist"
              className="hidden text-ivory/80 transition-colors hover:text-gold sm:block"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-current"
                strokeWidth="1.5"
              >
                <path d="M12 21s-7-4.35-9.5-8.5C.5 9 2 5.5 5.5 5.5c2 0 3.5 1.5 6.5 4 3-2.5 4.5-4 6.5-4C22 5.5 23.5 9 21.5 12.5 19 16.65 12 21 12 21z" />
              </svg>
            </button>

            <button
              aria-label="Cart"
              className="relative text-ivory/80 transition-colors hover:text-gold"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-current"
                strokeWidth="1.5"
              >
                <path d="M6 7h12l-1 14H7L6 7zM9 7a3 3 0 016 0" />
              </svg>
              <span className="font-label absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] text-ink">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Locale strip (desktop) */}
        <div className="hidden border-t border-line/60 lg:block">
          <div className="section section-wide flex items-center justify-end gap-6 py-2">
            <div className="font-label flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted">
              <span>Currency</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-gold outline-none"
              >
                {currencies.map((c) => (
                  <option key={c} value={c} className="bg-ink text-ivory">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <span className="h-3 w-px bg-line" />
            <div className="font-label flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`transition-colors ${
                    lang === l ? "text-gold" : "hover:text-ivory"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/80 backdrop-blur-md">
          <div className="section section-wide w-full pt-32">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center justify-between">
                <p className="font-label text-[10px] uppercase tracking-[0.4em] text-gold">
                  AI-Powered Search
                </p>
                <button
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="text-ivory transition-colors hover:text-gold"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6 fill-none stroke-current"
                    strokeWidth="1.5"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <input
                autoFocus
                placeholder="Search abayas, collections, fabrics…"
                className="font-serif mt-4 w-full border-b border-line bg-transparent pb-4 text-2xl text-ivory placeholder:text-muted/60 focus:border-gold focus:outline-none md:text-4xl"
              />
              <div className="mt-6 flex flex-wrap gap-3">
                {["Eid Collection", "Gold Embroidery", "Bridal", "Black Nida"].map(
                  (s) => (
                    <button
                      key={s}
                      className="font-label border border-line px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-gold hover:text-gold"
                    >
                      {s}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl lg:hidden">
          <div className="section flex items-center justify-between py-6">
            <span className="font-display text-xl tracking-[0.2em] text-ivory">
              SK ABAYA
            </span>
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="text-ivory"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-none stroke-current"
                strokeWidth="1.5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav className="section mt-8 flex flex-col gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl text-ivory transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="section mt-12 flex items-center gap-6">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="font-label bg-transparent text-xs uppercase tracking-[0.25em] text-gold outline-none"
            >
              {currencies.map((c) => (
                <option key={c} value={c} className="bg-ink">
                  {c}
                </option>
              ))}
            </select>
            <div className="font-label flex gap-3 text-xs uppercase tracking-[0.25em]">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={lang === l ? "text-gold" : "text-muted"}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
