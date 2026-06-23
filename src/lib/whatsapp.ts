import { formatPrice } from "./format";
import type { CartItem } from "./cart";
import type { Order } from "./orders";

/** SK Abaya orders WhatsApp number (03004031131 → international format). */
export const WHATSAPP_NUMBER = "923004031131";
export const WHATSAPP_DISPLAY = "+92 300 4031131";

/** Builds a wa.me deep link with a pre-filled order message. */
export function buildOrderUrl(items: CartItem[]): string {
  const currency = items[0]?.currency ?? "USD";
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const lines = items.map(
    (i, idx) =>
      `${idx + 1}. ${i.name} (${i.collection}) × ${i.qty} — ${formatPrice(
        i.price * i.qty,
        i.currency,
      )}`,
  );

  const message = [
    "*New Order — SK Abaya*",
    "",
    ...lines,
    "",
    `*Total: ${formatPrice(total, currency)}*`,
    "",
    "Please confirm availability and delivery details.",
    "",
    "Name:",
    "Address:",
    "City / Country:",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Message for an order already saved to the database (includes its code). */
export function buildSavedOrderUrl(order: Order): string {
  const lines = order.items.map(
    (i, idx) =>
      `${idx + 1}. ${i.name} (${i.collection}) × ${i.qty} — ${formatPrice(
        i.price * i.qty,
        order.currency,
      )}`,
  );

  const message = [
    `*New Order ${order.code} — SK Abaya*`,
    "",
    ...lines,
    "",
    `*Total: ${formatPrice(order.subtotal, order.currency)}*`,
    "",
    `Name: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}, ${order.city}`,
    order.note ? `Note: ${order.note}` : "",
    "",
    `Order ref: ${order.code}`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Message asking to cancel a specific saved order. */
export function buildCancelUrl(code: string): string {
  const message = `*Cancel Order — SK Abaya*\n\nPlease cancel my order *${code}*.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** A single-product "order now" message (used from product cards). */
export function buildSingleOrderUrl(name: string, collection: string): string {
  const message = [
    "*Order Enquiry — SK Abaya*",
    "",
    `I'm interested in: *${name}* (${collection})`,
    "",
    "Is it available? Please share details.",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
