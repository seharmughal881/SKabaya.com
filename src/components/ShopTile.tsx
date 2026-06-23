"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function ShopTile({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

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
    <article className="group relative aspect-square overflow-hidden bg-gradient-to-b from-charcoal to-ink">
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 50vw, 16vw"
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
      />

      {/* Whole tile links to the product page */}
      <Link
        href={`/product/${product.id}`}
        aria-label={product.name}
        className="absolute inset-0 z-10"
      />

      {/* Hover overlay (info is non-interactive; only the button captures clicks) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="font-label text-[9px] uppercase tracking-[0.3em] text-gold/90">
          {product.collection}
        </p>
        <h3 className="font-display text-base leading-tight text-ivory">
          {product.name}
        </h3>
        <p className="font-serif text-sm text-ivory/90">
          {formatPrice(product.price, product.currency)}
        </p>
        <button
          onClick={handleAdd}
          className="font-label pointer-events-auto mt-3 bg-gold/95 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-bright"
        >
          {added ? "✓ Added" : "Add to Bag"}
        </button>
      </div>
    </article>
  );
}
