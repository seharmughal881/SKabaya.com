"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/data";

const currencySymbol: Record<string, string> = {
  USD: "$",
  AED: "AED ",
  SAR: "SAR ",
  PKR: "₨ ",
  GBP: "£",
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-3 w-3 ${i < rating ? "fill-gold" : "fill-muted/30"}`}
        >
          <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.4L12 16.8 5.7 21l2.3-7.4-6-4.4h7.6z" />
        </svg>
      ))}
    </span>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const symbol = currencySymbol[product.currency] ?? "";

  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-charcoal to-ink">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

        {product.badge && (
          <span className="font-label absolute left-4 top-4 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ink/50 text-ivory backdrop-blur transition-colors hover:text-gold"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 transition-all ${wished ? "fill-gold stroke-gold" : "fill-none stroke-current"}`}
            strokeWidth="1.5"
          >
            <path d="M12 21s-7-4.35-9.5-8.5C.5 9 2 5.5 5.5 5.5c2 0 3.5 1.5 6.5 4 3-2.5 4.5-4 6.5-4C22 5.5 23.5 9 21.5 12.5 19 16.65 12 21 12 21z" />
          </svg>
        </button>

        {/* Quick view */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
          <button className="font-label w-full bg-gold/95 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-ink backdrop-blur transition-colors hover:bg-gold-bright">
            Quick View
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold/80">
          {product.collection}
        </p>
        <h3 className="font-display text-lg text-ivory">{product.name}</h3>
        <div className="flex items-center justify-between pt-1">
          <p className="font-serif text-lg text-ivory">
            {symbol}
            {product.price.toLocaleString()}
          </p>
          <span className="flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-xs text-muted">({product.reviews})</span>
          </span>
        </div>
      </div>
    </article>
  );
}
