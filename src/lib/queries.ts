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
  };
}

export async function getCollections(): Promise<Collection[]> {
  return query<Collection>(
    `SELECT slug, name, tagline, image
       FROM collections
      ORDER BY sort_order, id`,
  );
}

export async function getBestSellers(): Promise<Product[]> {
  const rows = await query(
    `SELECT id, name, collection, price, currency, rating, reviews, badge, image
       FROM products
      WHERE is_best_seller
      ORDER BY sort_order, id`,
  );
  return rows.map(mapProduct);
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
