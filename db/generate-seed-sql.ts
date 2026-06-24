/**
 * Generates a self-contained db/seed.sql (schema + data) that can be pasted
 * straight into a Postgres SQL console (e.g. Neon's SQL Editor) — no app,
 * connection string, or env needed. Run: npm run db:sql
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { collections, bestSellers, testimonials } from "../src/lib/data";

const __dirname = dirname(fileURLToPath(import.meta.url));

const q = (v: string | null | undefined) =>
  v === null || v === undefined ? "NULL" : `'${v.replace(/'/g, "''")}'`;
const n = (v: number) => String(v);
const b = (v: boolean) => (v ? "true" : "false");

const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");

const out: string[] = [
  "-- SK Abaya — full database setup (schema + seed).",
  "-- Paste this whole file into your Postgres SQL editor (e.g. Neon) and run.",
  "",
  schema,
  "",
  "-- ---- Data ----",
  "",
];

collections.forEach((c, i) => {
  out.push(
    `INSERT INTO collections (slug, name, tagline, image, sort_order) VALUES (${q(c.slug)}, ${q(c.name)}, ${q(c.tagline)}, ${q(c.image)}, ${n(i)})\n` +
      `ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, tagline=EXCLUDED.tagline, image=EXCLUDED.image, sort_order=EXCLUDED.sort_order;`,
  );
});
out.push("");

bestSellers.forEach((p, i) => {
  out.push(
    `INSERT INTO products (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order) VALUES (` +
      `${q(p.id)}, ${q(p.name)}, ${q(p.collection)}, ${n(p.price)}, ${q(p.currency)}, ${n(p.rating)}, ${n(p.reviews)}, ${q(p.badge)}, ${q(p.image)}, ${q(p.description)}, ${q(p.fabric)}, true, ${n(i)})\n` +
      `ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price, currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, badge=EXCLUDED.badge, image=EXCLUDED.image, description=EXCLUDED.description, fabric=EXCLUDED.fabric, is_best_seller=true, sort_order=EXCLUDED.sort_order;`,
  );
});
out.push("");

testimonials.forEach((t, i) => {
  out.push(
    `INSERT INTO testimonials (quote, name, location, sort_order) VALUES (${q(t.quote)}, ${q(t.name)}, ${q(t.location)}, ${n(i)}) ON CONFLICT DO NOTHING;`,
  );
});
out.push("");

writeFileSync(join(__dirname, "seed.sql"), out.join("\n"));
console.log("✓ Wrote db/seed.sql");
