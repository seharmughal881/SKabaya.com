import { randomBytes } from "node:crypto";
import { query, withTransaction } from "./db";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export const CANCELLABLE: OrderStatus[] = ["pending", "confirmed"];

export type OrderItem = {
  productId: string;
  name: string;
  collection: string;
  price: number;
  qty: number;
  image: string;
};

export type Order = {
  code: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  note?: string;
  currency: string;
  subtotal: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
};

export type CreateOrderInput = {
  name: string;
  phone: string;
  address: string;
  city: string;
  note?: string;
  items: { productId: string; qty: number }[];
};

function generateCode(): string {
  return "SKA-" + randomBytes(3).toString("hex").toUpperCase();
}

/**
 * Creates an order. Product prices/names are read from the DB (not trusted
 * from the client) so totals can't be tampered with. Runs in a transaction.
 */
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const ids = input.items.map((i) => i.productId);
  const qtyById = new Map(input.items.map((i) => [i.productId, i.qty]));

  return withTransaction(async (client) => {
    const { rows: products } = await client.query(
      `SELECT id, name, collection, price, currency, image
         FROM products
        WHERE id = ANY($1::text[])`,
      [ids],
    );

    if (products.length === 0) {
      throw new Error("No valid products in order");
    }

    const items: OrderItem[] = products.map((p) => ({
      productId: String(p.id),
      name: String(p.name),
      collection: String(p.collection),
      price: Number(p.price),
      qty: qtyById.get(String(p.id)) ?? 1,
      image: String(p.image),
    }));

    const currency = String(products[0].currency ?? "USD");
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

    // Insert order, retrying once on the (astronomically unlikely) code clash.
    let code = generateCode();
    let orderId: number | undefined;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const { rows } = await client.query(
          `INSERT INTO orders (code, customer_name, phone, address, city, note, currency, subtotal)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           RETURNING id`,
          [
            code,
            input.name,
            input.phone,
            input.address,
            input.city,
            input.note ?? null,
            currency,
            subtotal,
          ],
        );
        orderId = rows[0].id;
        break;
      } catch (err) {
        if ((err as { code?: string }).code === "23505") {
          code = generateCode();
          continue;
        }
        throw err;
      }
    }
    if (orderId === undefined) throw new Error("Could not allocate order code");

    for (const it of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, name, collection, price, qty, image)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [orderId, it.productId, it.name, it.collection, it.price, it.qty, it.image],
      );
    }

    return {
      code,
      customerName: input.name,
      phone: input.phone,
      address: input.address,
      city: input.city,
      note: input.note,
      currency,
      subtotal,
      status: "pending",
      createdAt: new Date().toISOString(),
      items,
    };
  });
}

export async function getOrderByCode(code: string): Promise<Order | null> {
  const orders = await query(
    `SELECT code, customer_name, phone, address, city, note, currency, subtotal, status, created_at
       FROM orders WHERE code = $1`,
    [code.toUpperCase()],
  );
  if (orders.length === 0) return null;
  const o = orders[0];

  const items = await query(
    `SELECT product_id, name, collection, price, qty, image
       FROM order_items WHERE order_id = (SELECT id FROM orders WHERE code = $1)
      ORDER BY id`,
    [code.toUpperCase()],
  );

  return {
    code: String(o.code),
    customerName: String(o.customer_name),
    phone: String(o.phone),
    address: String(o.address),
    city: String(o.city),
    note: o.note ? String(o.note) : undefined,
    currency: String(o.currency),
    subtotal: Number(o.subtotal),
    status: o.status as OrderStatus,
    createdAt: new Date(o.created_at as string).toISOString(),
    items: items.map((i) => ({
      productId: String(i.product_id),
      name: String(i.name),
      collection: String(i.collection),
      price: Number(i.price),
      qty: Number(i.qty),
      image: i.image ? String(i.image) : "",
    })),
  };
}

export type CancelResult =
  | { ok: true; status: "cancelled" }
  | { ok: false; reason: "not_found" | "not_cancellable"; status?: OrderStatus };

/** Cancels an order if it is still in a cancellable state. */
export async function cancelOrder(code: string): Promise<CancelResult> {
  const existing = await query<{ status: OrderStatus }>(
    `SELECT status FROM orders WHERE code = $1`,
    [code.toUpperCase()],
  );
  if (existing.length === 0) return { ok: false, reason: "not_found" };

  const status = existing[0].status;
  if (!CANCELLABLE.includes(status)) {
    return { ok: false, reason: "not_cancellable", status };
  }

  await query(
    `UPDATE orders SET status = 'cancelled', updated_at = now() WHERE code = $1`,
    [code.toUpperCase()],
  );
  return { ok: true, status: "cancelled" };
}
