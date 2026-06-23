"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { productSizes } from "@/lib/data";
import { useCart } from "@/lib/cart";
import { buildSingleOrderUrl } from "@/lib/whatsapp";

export default function ProductPurchase({ product }: { product: Product }) {
  const { add, openCart } = useCart();
  const [size, setSize] = useState<string>(productSizes[1]); // 54"
  const [qty, setQty] = useState(1);

  function handleAdd() {
    add(
      {
        id: product.id,
        name: `${product.name} (${size})`,
        collection: product.collection,
        price: product.price,
        currency: product.currency,
        image: product.image,
      },
      qty,
    );
    openCart();
  }

  return (
    <div className="mt-8">
      {/* Size */}
      <div>
        <div className="flex items-center justify-between">
          <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
            Size — length
          </span>
          <Link
            href="/info/size-guide"
            className="font-label text-[10px] uppercase tracking-[0.2em] text-gold hover:underline"
          >
            Size guide
          </Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {productSizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`font-label min-w-14 border px-4 py-2.5 text-xs tracking-[0.1em] transition-colors ${
                size === s
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-line text-ivory/80 hover:border-gold/60"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-7">
        <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
          Quantity
        </span>
        <div className="mt-3 inline-flex items-center border border-line">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2.5 text-ivory transition-colors hover:text-gold"
          >
            −
          </button>
          <span className="font-label min-w-10 text-center text-sm text-ivory">
            {qty}
          </span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-2.5 text-ivory transition-colors hover:text-gold"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <button onClick={handleAdd} className="btn-gold flex-1">
          Add to Bag
        </button>
        <a
          href={buildSingleOrderUrl(product.name, product.collection, product.image)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost flex-1"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.3.1.4.1.6-.1l.7-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.7-.1 1.4z" />
          </svg>
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
