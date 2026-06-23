import { query } from "./db";
import type { Collection, Product, Testimonial } from "./data";

/** node-postgres returns NUMERIC as string; coerce product money/number fields. */
function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    collection: String(row.collection),
    price: Number(row.price),
    currency: String(row.currency),
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    badge: row.badge ? String(row.badge) : undefined,
    image: String(row.image),
    description: row.description ? String(row.description) : undefined,
    fabric: row.fabric ? String(row.fabric) : undefined,
  };
}

const PRODUCT_COLS = `id, name, collection, price, currency, rating, reviews, badge, image, description, fabric`;

export async function getCollections(): Promise<Collection[]> {
  return query<Collection>(
    `SELECT slug, name, tagline, image
       FROM collections
      ORDER BY sort_order, id`,
  );
}

export async function getBestSellers(): Promise<Product[]> {
  const rows = await query(
    `SELECT ${PRODUCT_COLS}
       FROM products
      WHERE is_best_seller
      ORDER BY sort_order, id`,
  );
  return rows.map(mapProduct);
}

/** A set of products for the shoppable feed (newest/curated first). */
export async function getShowcaseProducts(limit = 6): Promise<Product[]> {
  const rows = await query(
    `SELECT ${PRODUCT_COLS} FROM products ORDER BY sort_order, id LIMIT $1`,
    [limit],
  );
  return rows.map(mapProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  const rows = await query(
    `SELECT ${PRODUCT_COLS} FROM products WHERE id = $1`,
    [id],
  );
  return rows.length ? mapProduct(rows[0]) : null;
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  const rows = await query<Collection>(
    `SELECT slug, name, tagline, image FROM collections WHERE slug = $1`,
    [slug],
  );
  return rows[0] ?? null;
}

/** Products belonging to a collection (matched by the collection's display name). */
export async function getProductsByCollection(
  slug: string,
): Promise<Product[]> {
  const rows = await query(
    `SELECT ${PRODUCT_COLS}
       FROM products
      WHERE collection = (SELECT name FROM collections WHERE slug = $1)
      ORDER BY sort_order, id`,
    [slug],
  );
  return rows.map(mapProduct);
}

/** Up to `limit` other products from the same collection (for "you may also like"). */
export async function getRelatedProducts(
  productId: string,
  collection: string,
  limit = 4,
): Promise<Product[]> {
  const rows = await query(
    `SELECT ${PRODUCT_COLS}
       FROM products
      WHERE collection = $2 AND id <> $1
      ORDER BY sort_order, id
      LIMIT $3`,
    [productId, collection, limit],
  );
  return rows.map(mapProduct);
}

export async function getCollectionSlugByName(
  name: string,
): Promise<string | null> {
  const rows = await query<{ slug: string }>(
    `SELECT slug FROM collections WHERE name = $1`,
    [name],
  );
  return rows[0]?.slug ?? null;
}

export async function getAllProductIds(): Promise<string[]> {
  const rows = await query<{ id: string }>(`SELECT id FROM products`);
  return rows.map((r) => String(r.id));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return query<Testimonial>(
    `SELECT quote, name, location
       FROM testimonials
      ORDER BY sort_order, id`,
  );
}

/** Returns true if newly inserted, false if the email already existed. */
export async function subscribe(email: string): Promise<boolean> {
  const rows = await query(
    `INSERT INTO subscribers (email)
     VALUES (LOWER($1))
     ON CONFLICT (email) DO NOTHING
     RETURNING id`,
    [email],
  );
  return rows.length > 0;
}
