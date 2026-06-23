import Link from "next/link";
import { dashboardStats, listOrders } from "@/lib/admin";
import { formatPrice } from "@/lib/format";
import { buildClientConfirmUrl } from "@/lib/whatsapp";
import { changeOrderStatus } from "../actions";
import type { OrderStatus } from "@/lib/orders";

export const dynamic = "force-dynamic";

const STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export default async function AdminDashboard() {
  const [stats, orders] = await Promise.all([dashboardStats(), listOrders()]);

  const cards = [
    { label: "Orders", value: stats.orders },
    { label: "Pending", value: stats.pending },
    { label: "Revenue", value: formatPrice(stats.revenue) },
    { label: "Products", value: stats.products },
    { label: "Subscribers", value: stats.subscribers },
  ];

  return (
    <div>
      <p className="eyebrow">Overview</p>
      <h1 className="mt-3 font-display text-4xl text-ivory">Dashboard</h1>

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line/40 bg-line/40 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="bg-ink-soft p-5">
            <p className="font-display text-2xl text-gilded">{c.value}</p>
            <p className="font-label mt-1 text-[9px] uppercase tracking-[0.25em] text-muted">
              {c.label}
            </p>
          </div>
        ))}
      </div>

      {/* Orders */}
      <h2 className="mt-12 font-display text-2xl text-ivory">Orders</h2>
      {orders.length === 0 ? (
        <p className="mt-4 text-muted">No orders yet.</p>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line/40 text-left">
                {["Order", "Customer", "City", "Items", "Total", "Status", ""].map(
                  (h, i) => (
                    <th
                      key={i}
                      className="font-label px-3 py-3 text-[10px] uppercase tracking-[0.2em] text-muted"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.code} className="border-b border-line/20">
                  <td className="px-3 py-3">
                    <Link
                      href={`/order/${o.code}`}
                      className="font-label text-gold hover:underline"
                    >
                      {o.code}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-ivory">
                    {o.customerName}
                    <span className="block text-xs text-muted">{o.phone}</span>
                  </td>
                  <td className="px-3 py-3 text-muted">{o.city}</td>
                  <td className="px-3 py-3 text-ivory">{o.itemCount}</td>
                  <td className="px-3 py-3 text-ivory">
                    {formatPrice(o.subtotal, o.currency)}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`font-label text-[10px] uppercase tracking-[0.2em] ${
                        o.status === "cancelled"
                          ? "text-red-300"
                          : o.status === "delivered"
                            ? "text-emerald-300"
                            : "text-gold"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-col items-start gap-2">
                      <form action={changeOrderStatus} className="flex gap-2">
                        <input type="hidden" name="code" value={o.code} />
                        <select
                          name="status"
                          defaultValue={o.status}
                          className="border border-line bg-ink px-2 py-1.5 text-xs text-ivory outline-none focus:border-gold"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-ink">
                              {s}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="font-label border border-gold/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold/10"
                        >
                          Save
                        </button>
                      </form>
                      {o.status !== "cancelled" && (
                        <a
                          href={buildClientConfirmUrl({
                            code: o.code,
                            customerName: o.customerName,
                            phone: o.phone,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-label inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-[#25D366] transition-opacity hover:opacity-80"
                          title="Send a confirmation message to the customer"
                        >
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                            <path d="M12 2a10 10 0 00-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5-4.5-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.1.1.3 0 .5l-.4.5-.3.3c-.1.1-.3.3-.1.6.1.3.7 1.1 1.4 1.8.9.8 1.7 1 2 1.2.3.1.4.1.6-.1l.7-.9c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.7-.1 1.4z" />
                          </svg>
                          Notify client
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
