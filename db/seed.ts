/**
 * Seeds the SK Abaya database: applies schema.sql then inserts the catalogue
 * from src/lib/data.ts. Idempotent — safe to run repeatedly.
 *
 * Run with:  node --env-file=.env --import tsx db/seed.ts
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Pool } from "pg";
import { collections, bestSellers, testimonials } from "../src/lib/data";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  console.log("→ Applying schema…");
  const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
  await pool.query(schema);

  console.log("→ Seeding collections…");
  for (const [i, c] of collections.entries()) {
    await pool.query(
      `INSERT INTO collections (slug, name, tagline, image, sort_order)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (slug) DO UPDATE
         SET name = EXCLUDED.name,
             tagline = EXCLUDED.tagline,
             image = EXCLUDED.image,
             sort_order = EXCLUDED.sort_order`,
      [c.slug, c.name, c.tagline, c.image, i],
    );
  }

  console.log("→ Seeding products…");
  for (const [i, p] of bestSellers.entries()) {
    await pool.query(
      `INSERT INTO products
         (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,true,$12)
       ON CONFLICT (id) DO UPDATE
         SET name = EXCLUDED.name,
             collection = EXCLUDED.collection,
             price = EXCLUDED.price,
             currency = EXCLUDED.currency,
             rating = EXCLUDED.rating,
             reviews = EXCLUDED.reviews,
             badge = EXCLUDED.badge,
             image = EXCLUDED.image,
             description = EXCLUDED.description,
             fabric = EXCLUDED.fabric,
             is_best_seller = true,
             sort_order = EXCLUDED.sort_order`,
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
        p.description ?? null,
        p.fabric ?? null,
        i,
      ],
    );
  }

  console.log("→ Seeding testimonials…");
  await pool.query("TRUNCATE testimonials RESTART IDENTITY");
  for (const [i, t] of testimonials.entries()) {
    await pool.query(
      `INSERT INTO testimonials (quote, name, location, sort_order)
       VALUES ($1,$2,$3,$4)`,
      [t.quote, t.name, t.location, i],
    );
  }

  const counts = await pool.query(
    `SELECT
       (SELECT count(*) FROM collections) AS collections,
       (SELECT count(*) FROM products)   AS products,
       (SELECT count(*) FROM testimonials) AS testimonials,
       (SELECT count(*) FROM subscribers)  AS subscribers`,
  );
  console.log("✓ Seed complete:", counts.rows[0]);

  await pool.end();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
