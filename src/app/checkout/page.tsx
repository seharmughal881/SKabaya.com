"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, setQty, remove, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const currency = items[0]?.currency ?? "USD";

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.id, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not place order. Please try again.");
        setSubmitting(false);
        return;
      }
      clear();
      router.push(`/order/${data.order.code}?new=1`);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="section section-wide flex-1 py-16 md:py-24">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-4 font-display text-4xl text-ivory md:text-5xl">
          Complete your <span className="font-serif italic text-gilded">order</span>
        </h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <p className="font-serif text-2xl text-ivory/80">Your bag is empty</p>
            <Link href="/#best-sellers" className="btn-gold mt-8">
              Shop the Collection
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            {/* Form */}
            <form onSubmit={handleSubmit} className="order-2 lg:order-1">
              <h2 className="font-display text-2xl text-ivory">
                Delivery details
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    required
                    value={form.name}
                    onChange={update("name")}
                    className="input"
                    placeholder="e.g. Aisha Khan"
                  />
                </Field>
                <Field label="Phone / WhatsApp" required>
                  <input
                    required
                    value={form.phone}
                    onChange={update("phone")}
                    className="input"
                    placeholder="e.g. 0300 1234567"
                  />
                </Field>
                <Field label="Address" required className="sm:col-span-2">
                  <input
                    required
                    value={form.address}
                    onChange={update("address")}
                    className="input"
                    placeholder="House, street, area"
                  />
                </Field>
                <Field label="City / Country" required>
                  <input
                    required
                    value={form.city}
                    onChange={update("city")}
                    className="input"
                    placeholder="e.g. Lahore, Pakistan"
                  />
                </Field>
                <Field label="Note (optional)">
                  <input
                    value={form.note}
                    onChange={update("note")}
                    className="input"
                    placeholder="Size, customization…"
                  />
                </Field>
              </div>

              {error && (
                <p className="font-label mt-5 text-xs uppercase tracking-[0.2em] text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold mt-8 w-full disabled:opacity-60 sm:w-auto"
              >
                {submitting ? "Placing order…" : "Place Order"}
              </button>
              <p className="mt-4 text-xs text-muted">
                Your order is saved with a reference number. You can confirm
                payment &amp; delivery — or cancel — on WhatsApp afterwards.
              </p>
            </form>

            {/* Summary */}
            <aside className="order-1 lg:order-2">
              <div className="glass p-6">
                <h2 className="font-display text-2xl text-ivory">Your bag</h2>
                <ul className="mt-5 divide-y divide-line/40">
                  {items.map((i) => (
                    <li key={i.id} className="flex gap-4 py-4">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-charcoal">
                        <Image
                          src={i.image}
                          alt={i.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-display text-base text-ivory">
                          {i.name}
                        </h3>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border border-line/60 text-sm">
                            <button
                              type="button"
                              aria-label="Decrease"
                              onClick={() => setQty(i.id, i.qty - 1)}
                              className="px-2.5 py-1 text-ivory hover:text-gold"
                            >
                              −
                            </button>
                            <span className="min-w-7 text-center text-ivory">
                              {i.qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase"
                              onClick={() => setQty(i.id, i.qty + 1)}
                              className="px-2.5 py-1 text-ivory hover:text-gold"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-serif text-ivory">
                              {formatPrice(i.price * i.qty, i.currency)}
                            </span>
                            <button
                              type="button"
                              aria-label={`Remove ${i.name}`}
                              onClick={() => remove(i.id)}
                              className="text-muted hover:text-gold"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-5">
                  <span className="font-label text-xs uppercase tracking-[0.25em] text-muted">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl text-gilded">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
