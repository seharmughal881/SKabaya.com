"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, isOpen, closeCart, setQty, remove, subtotal, count, clear } =
    useCart();

  const currency = items[0]?.currency ?? "USD";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-[70] bg-ink/70 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`glass fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line/60 px-6 py-6">
          <div>
            <p className="eyebrow">Your Bag</p>
            <p className="font-display mt-1 text-2xl text-ivory">
              {count} {count === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <button
            aria-label="Close bag"
            onClick={closeCart}
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

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <svg
                viewBox="0 0 24 24"
                className="h-12 w-12 fill-none stroke-gold/50"
                strokeWidth="1"
              >
                <path d="M6 7h12l-1 14H7L6 7zM9 7a3 3 0 016 0" />
              </svg>
              <p className="font-serif mt-5 text-xl text-ivory/80">
                Your bag is empty
              </p>
              <p className="mt-2 text-sm text-muted">
                Discover handcrafted luxury abayas.
              </p>
              <button onClick={closeCart} className="btn-ghost mt-7">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-line/40 py-2">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 py-5">
                  <div className="relative h-28 w-20 shrink-0 overflow-hidden bg-gradient-to-b from-charcoal to-ink">
                    <Image
                      src={i.image}
                      alt={i.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-label text-[9px] uppercase tracking-[0.3em] text-gold/80">
                          {i.collection}
                        </p>
                        <h3 className="font-display text-lg leading-tight text-ivory">
                          {i.name}
                        </h3>
                      </div>
                      <button
                        aria-label={`Remove ${i.name}`}
                        onClick={() => remove(i.id)}
                        className="text-muted transition-colors hover:text-gold"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-none stroke-current"
                          strokeWidth="1.5"
                        >
                          <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-line/60">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQty(i.id, i.qty - 1)}
                          className="px-3 py-1.5 text-ivory transition-colors hover:text-gold"
                        >
                          −
                        </button>
                        <span className="font-label min-w-8 text-center text-sm text-ivory">
                          {i.qty}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQty(i.id, i.qty + 1)}
                          className="px-3 py-1.5 text-ivory transition-colors hover:text-gold"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-serif text-lg text-ivory">
                        {formatPrice(i.price * i.qty, i.currency)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / checkout */}
        {items.length > 0 && (
          <div className="border-t border-line/60 px-6 py-6">
            <div className="flex items-center justify-between">
              <span className="font-label text-xs uppercase tracking-[0.25em] text-muted">
                Subtotal
              </span>
              <span className="font-display text-2xl text-gilded">
                {formatPrice(subtotal, currency)}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Saved with an order reference — confirm or cancel on WhatsApp anytime.
            </p>

            <Link href="/checkout" onClick={closeCart} className="btn-gold mt-5 w-full">
              Proceed to Checkout
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-none stroke-current"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={clear}
                className="font-label text-[10px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-gold"
              >
                Clear bag
              </button>
              <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
                {WHATSAPP_DISPLAY}
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
