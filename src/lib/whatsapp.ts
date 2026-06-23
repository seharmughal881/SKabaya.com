import { formatPrice } from "./format";
import type { CartItem } from "./cart";
import type { Order } from "./orders";

/** SK Abaya orders WhatsApp number (03004031131 → international format). */
export const WHATSAPP_NUMBER = "923004031131";
export const WHATSAPP_DISPLAY = "+92 300 4031131";

/**
 * Public base URL of the site, used to turn relative image paths
 * (e.g. /media/x.jpg) into absolute links WhatsApp can preview.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

/** Returns an absolute, shareable URL for an image src. */
function absoluteImage(src: string): string {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  return SITE_URL ? `${SITE_URL}${src}` : src;
}

type LineItem = {
  name: string;
  collection: string;
  price: number;
  qty: number;
  image: string;
};

/** Renders numbered item lines with each product's image link beneath it. */
function itemLines(items: LineItem[], currency: string): string[] {
  return items.flatMap((i, idx) => {
    const lines = [
      `${idx + 1}. ${i.name} (${i.collection}) × ${i.qty} — ${formatPrice(
        i.price * i.qty,
        currency,
      )}`,
    ];
    const img = absoluteImage(i.image);
    if (img) lines.push(`   📷 ${img}`);
    return lines;
  });
}

const waUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Builds a wa.me deep link with a pre-filled order message (cart items). */
export function buildOrderUrl(items: CartItem[]): string {
  const currency = items[0]?.currency ?? "USD";
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const message = [
    "*New Order — SK Abaya*",
    "",
    ...itemLines(items, currency),
    "",
    `*Total: ${formatPrice(total, currency)}*`,
    "",
    "Please confirm availability and delivery details.",
    "",
    "Name:",
    "Address:",
    "City / Country:",
  ].join("\n");

  return waUrl(message);
}

/** Message for an order already saved to the database (includes its code + images). */
export function buildSavedOrderUrl(order: Order): string {
  const message = [
    `*New Order ${order.code} — SK Abaya*`,
    "",
    ...itemLines(order.items, order.currency),
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

  return waUrl(message);
}

/** Message asking to cancel a specific saved order. */
export function buildCancelUrl(code: string): string {
  return waUrl(`*Cancel Order — SK Abaya*\n\nPlease cancel my order *${code}*.`);
}

/** A single-product "order now" message (used from product cards/detail). */
export function buildSingleOrderUrl(
  name: string,
  collection: string,
  image?: string,
): string {
  const lines = [
    "*Order Enquiry — SK Abaya*",
    "",
    `I'm interested in: *${name}* (${collection})`,
  ];
  const img = image ? absoluteImage(image) : "";
  if (img) lines.push(`📷 ${img}`);
  lines.push("", "Is it available? Please share details.");
  return waUrl(lines.join("\n"));
}
