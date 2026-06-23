import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CancelOrderButton from "@/components/CancelOrderButton";
import { getOrderByCode, CANCELLABLE, type OrderStatus } from "@/lib/orders";
import { formatPrice } from "@/lib/format";
import { buildSavedOrderUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "border-gold/50 text-gold",
  confirmed: "border-sky-400/50 text-sky-300",
  shipped: "border-violet-400/50 text-violet-300",
  delivered: "border-emerald-400/50 text-emerald-300",
  cancelled: "border-red-400/50 text-red-300 line-through",
};

const STEPS: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered"];

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ new?: string }>;
}) {
  const { code } = await params;
  const { new: isNew } = await searchParams;
  const order = await getOrderByCode(code);

  return (
    <>
      <Header />
      <main className="section section-wide flex-1 py-16 md:py-24">
        {!order ? (
          <div className="mx-auto max-w-md text-center">
            <p className="eyebrow">Order not found</p>
            <h1 className="mt-4 font-display text-4xl text-ivory">
              We couldn&apos;t find {code}
            </h1>
            <p className="mt-4 text-muted">
              Please check your order reference and try again.
            </p>
            <Link href="/order" className="btn-ghost mt-8">
              Track another order
            </Link>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            {isNew && order.status !== "cancelled" && (
              <div className="glass mb-10 p-6 text-center">
                <p className="font-serif text-2xl text-gilded">
                  Thank you — your order is placed.
                </p>
                <p className="mt-2 text-sm text-muted">
                  Send it to us on WhatsApp to confirm payment &amp; delivery.
                </p>
                <a
                  href={buildSavedOrderUrl(order)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-5"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.3.1.4.1.6-.1l.7-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.7-.1 1.4z" />
                  </svg>
                  Send order on WhatsApp
                </a>
              </div>
            )}

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Order {order.code}</p>
                <h1 className="mt-3 font-display text-4xl text-ivory">
                  {order.customerName}
                </h1>
              </div>
              <span
                className={`font-label border px-4 py-2 text-[10px] uppercase tracking-[0.3em] ${STATUS_STYLES[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            {/* Progress tracker */}
            {order.status !== "cancelled" && (
              <div className="mt-10 flex items-center">
                {STEPS.map((step, idx) => {
                  const reached = STEPS.indexOf(order.status) >= idx;
                  return (
                    <div key={step} className="flex flex-1 items-center last:flex-none">
                      <div className="flex flex-col items-center">
                        <span
                          className={`grid h-8 w-8 place-items-center rounded-full border text-[10px] ${
                            reached
                              ? "border-gold bg-gold/15 text-gold"
                              : "border-line text-muted"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="font-label mt-2 text-[8px] uppercase tracking-[0.2em] text-muted">
                          {step}
                        </span>
                      </div>
                      {idx < STEPS.length - 1 && (
                        <span
                          className={`mx-2 h-px flex-1 ${reached ? "bg-gold/50" : "bg-line"}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Items */}
            <div className="mt-10 glass p-6">
              <ul className="divide-y divide-line/40">
                {order.items.map((i) => (
                  <li
                    key={i.productId}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="font-label text-[9px] uppercase tracking-[0.3em] text-gold/80">
                        {i.collection}
                      </p>
                      <h3 className="font-display text-lg text-ivory">
                        {i.name}{" "}
                        <span className="text-muted">× {i.qty}</span>
                      </h3>
                    </div>
                    <span className="font-serif text-lg text-ivory">
                      {formatPrice(i.price * i.qty, order.currency)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-5">
                <span className="font-label text-xs uppercase tracking-[0.25em] text-muted">
                  Total
                </span>
                <span className="font-display text-2xl text-gilded">
                  {formatPrice(order.subtotal, order.currency)}
                </span>
              </div>
            </div>

            {/* Delivery */}
            <div className="mt-6 grid gap-1 text-sm text-muted">
              <p>
                <span className="text-ivory/80">Phone:</span> {order.phone}
              </p>
              <p>
                <span className="text-ivory/80">Address:</span> {order.address},{" "}
                {order.city}
              </p>
              {order.note && (
                <p>
                  <span className="text-ivory/80">Note:</span> {order.note}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-4">
              {order.status === "cancelled" ? (
                <p className="font-serif text-lg text-red-300">
                  This order has been cancelled.
                </p>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={buildSavedOrderUrl(order)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    Confirm on WhatsApp
                  </a>
                  {CANCELLABLE.includes(order.status) && (
                    <CancelOrderButton code={order.code} />
                  )}
                </div>
              )}
              <Link
                href="/#best-sellers"
                className="font-label text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-gold"
              >
                ← Continue shopping
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
