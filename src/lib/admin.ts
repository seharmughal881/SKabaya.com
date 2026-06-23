import { query } from "./db";
import type { Collection, Product, Testimonial } from "./data";
import type { OrderStatus } from "./orders";

/* ---- Products ---- */

export type AdminProduct = Product & { isBestSeller: boolean };

export async function listProducts(): Promise<AdminProduct[]> {
  const rows = await query(
    `SELECT id, name, collection, price, currency, rating, reviews, badge, image, is_best_seller
       FROM products ORDER BY sort_order, id`,
  );
  return rows.map((r) => ({
    id: String(r.id),
    name: String(r.name),
    collection: String(r.collection),
    price: Number(r.price),
    currency: String(r.currency),
    rating: Number(r.rating),
    reviews: Number(r.reviews),
    badge: r.badge ? String(r.badge) : undefined,
    image: String(r.image),
    isBestSeller: Boolean(r.is_best_seller),
  }));
}

export type NewProduct = {
  id: string;
  name: string;
  collection: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  isBestSeller: boolean;
};

export async function createProduct(p: NewProduct): Promise<void> {
  await query(
    `INSERT INTO products
       (id, name, collection, price, currency, rating, reviews, badge, image, is_best_seller, sort_order)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
             COALESCE((SELECT MAX(sort_order)+1 FROM products), 0))
     ON CONFLICT (id) DO UPDATE SET
       name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price,
       currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews,
       badge=EXCLUDED.badge, image=EXCLUDED.image, is_best_seller=EXCLUDED.is_best_seller`,
    [
      p.id,
      p.name,
      p.collection,
      p.price,
      p.currency,
      p.rating,
      p.reviews,
      p.badge ?? null,
      p.image,
      p.isBestSeller,
    ],
  );
}

export async function deleteProduct(id: string): Promise<void> {
  await query(`DELETE FROM products WHERE id = $1`, [id]);
}

export async function toggleBestSeller(
  id: string,
  value: boolean,
): Promise<void> {
  await query(`UPDATE products SET is_best_seller = $2 WHERE id = $1`, [
    id,
    value,
  ]);
}

/* ---- Collections ---- */

export async function listCollectionsAll(): Promise<Collection[]> {
  return query<Collection>(
    `SELECT slug, name, tagline, image FROM collections ORDER BY sort_order, id`,
  );
}

export async function createCollection(c: Collection): Promise<void> {
  await query(
    `INSERT INTO collections (slug, name, tagline, image, sort_order)
     VALUES ($1,$2,$3,$4, COALESCE((SELECT MAX(sort_order)+1 FROM collections), 0))
     ON CONFLICT (slug) DO UPDATE SET
       name=EXCLUDED.name, tagline=EXCLUDED.tagline, image=EXCLUDED.image`,
    [c.slug, c.name, c.tagline, c.image],
  );
}

export async function deleteCollection(slug: string): Promise<void> {
  await query(`DELETE FROM collections WHERE slug = $1`, [slug]);
}

/* ---- Testimonials ---- */

export type AdminTestimonial = Testimonial & { id: number };

export async function listTestimonialsAll(): Promise<AdminTestimonial[]> {
  const rows = await query(
    `SELECT id, quote, name, location FROM testimonials ORDER BY sort_order, id`,
  );
  return rows.map((r) => ({
    id: Number(r.id),
    quote: String(r.quote),
    name: String(r.name),
    location: String(r.location),
  }));
}

export async function createTestimonial(t: Testimonial): Promise<void> {
  await query(
    `INSERT INTO testimonials (quote, name, location, sort_order)
     VALUES ($1,$2,$3, COALESCE((SELECT MAX(sort_order)+1 FROM testimonials), 0))`,
    [t.quote, t.name, t.location],
  );
}

export async function deleteTestimonial(id: number): Promise<void> {
  await query(`DELETE FROM testimonials WHERE id = $1`, [id]);
}

/* ---- Orders ---- */

export type AdminOrder = {
  code: string;
  customerName: string;
  phone: string;
  city: string;
  subtotal: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  itemCount: number;
};

export async function listOrders(): Promise<AdminOrder[]> {
  const rows = await query(
    `SELECT o.code, o.customer_name, o.phone, o.city, o.subtotal, o.currency,
            o.status, o.created_at,
            COALESCE(SUM(oi.qty), 0) AS item_count
       FROM orders o
       LEFT JOIN order_items oi ON oi.order_id = o.id
      GROUP BY o.id
      ORDER BY o.created_at DESC`,
  );
  return rows.map((r) => ({
    code: String(r.code),
    customerName: String(r.customer_name),
    phone: String(r.phone),
    city: String(r.city),
    subtotal: Number(r.subtotal),
    currency: String(r.currency),
    status: r.status as OrderStatus,
    createdAt: new Date(r.created_at as string).toISOString(),
    itemCount: Number(r.item_count),
  }));
}

export async function updateOrderStatus(
  code: string,
  status: OrderStatus,
): Promise<void> {
  await query(
    `UPDATE orders SET status = $2, updated_at = now() WHERE code = $1`,
    [code.toUpperCase(), status],
  );
}

/* ---- Subscribers ---- */

export type AdminSubscriber = { email: string; createdAt: string };

export async function listSubscribers(): Promise<AdminSubscriber[]> {
  const rows = await query(
    `SELECT email, created_at FROM subscribers ORDER BY created_at DESC`,
  );
  return rows.map((r) => ({
    email: String(r.email),
    createdAt: new Date(r.created_at as string).toISOString(),
  }));
}

/* ---- Dashboard counts ---- */

export async function dashboardStats() {
  const rows = await query<{
    products: string;
    collections: string;
    testimonials: string;
    subscribers: string;
    orders: string;
    pending: string;
    revenue: string;
  }>(
    `SELECT
       (SELECT count(*) FROM products) AS products,
       (SELECT count(*) FROM collections) AS collections,
       (SELECT count(*) FROM testimonials) AS testimonials,
       (SELECT count(*) FROM subscribers) AS subscribers,
       (SELECT count(*) FROM orders) AS orders,
       (SELECT count(*) FROM orders WHERE status = 'pending') AS pending,
       (SELECT COALESCE(SUM(subtotal),0) FROM orders WHERE status <> 'cancelled') AS revenue`,
  );
  const r = rows[0];
  return {
    products: Number(r.products),
    collections: Number(r.collections),
    testimonials: Number(r.testimonials),
    subscribers: Number(r.subscribers),
    orders: Number(r.orders),
    pending: Number(r.pending),
    revenue: Number(r.revenue),
  };
}
