"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { buildSingleOrderUrl } from "@/lib/whatsapp";

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
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  function handleAdd() {
    add({
      id: product.id,
      name: product.name,
      collection: product.collection,
      price: product.price,
      currency: product.currency,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-charcoal to-ink">
        <Link href={`/product/${product.id}`} aria-label={product.name}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        </Link>

        {product.badge && (
          <span className="font-label absolute left-4 top-4 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
            {product.badge}
          </span>
        )}

        {/* Top-right actions */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button
            onClick={() => setWished((w) => !w)}
            aria-label="Add to wishlist"
            className="grid h-10 w-10 place-items-center rounded-full bg-ink/50 text-ivory backdrop-blur transition-colors hover:text-gold"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 transition-all ${wished ? "fill-gold stroke-gold" : "fill-none stroke-current"}`}
              strokeWidth="1.5"
            >
              <path d="M12 21s-7-4.35-9.5-8.5C.5 9 2 5.5 5.5 5.5c2 0 3.5 1.5 6.5 4 3-2.5 4.5-4 6.5-4C22 5.5 23.5 9 21.5 12.5 19 16.65 12 21 12 21z" />
            </svg>
          </button>
          <a
            href={buildSingleOrderUrl(product.name, product.collection, product.image)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
            className="grid h-10 w-10 place-items-center rounded-full bg-ink/50 text-ivory backdrop-blur transition-colors hover:text-[#25D366]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.3.1.4.1.6-.1l.7-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.7-.1 1.4z" />
            </svg>
          </a>
        </div>

        {/* Add to cart */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className="font-label w-full bg-gold/95 py-3 text-[11px] font-medium uppercase tracking-[0.25em] text-ink backdrop-blur transition-colors hover:bg-gold-bright"
          >
            {added ? "✓ Added to Bag" : "Add to Bag"}
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1.5">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold/80">
          {product.collection}
        </p>
        <h3 className="font-display text-lg text-ivory">
          <Link
            href={`/product/${product.id}`}
            className="transition-colors hover:text-gold"
          >
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center justify-between pt-1">
          <p className="font-serif text-lg text-ivory">
            {formatPrice(product.price, product.currency)}
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
