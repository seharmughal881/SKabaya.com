-- SK Abaya — full database setup (schema + seed).
-- Paste this whole file into your Postgres SQL editor (e.g. Neon) and run.

-- ============================================================
-- SK Abaya — PostgreSQL schema
-- ============================================================

CREATE TABLE IF NOT EXISTS collections (
  id          SERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  tagline     TEXT NOT NULL,
  image       TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  collection    TEXT NOT NULL,
  price         NUMERIC(10,2) NOT NULL,
  currency      TEXT NOT NULL DEFAULT 'USD',
  rating        INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 0 AND 5),
  reviews       INTEGER NOT NULL DEFAULT 0,
  badge         TEXT,
  image         TEXT NOT NULL,
  description   TEXT,
  fabric        TEXT,
  is_best_seller BOOLEAN NOT NULL DEFAULT false,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id          SERIAL PRIMARY KEY,
  quote       TEXT NOT NULL,
  name        TEXT NOT NULL,
  location    TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS subscribers (
  id          SERIAL PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products (is_best_seller) WHERE is_best_seller;

-- Orders ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id            SERIAL PRIMARY KEY,
  code          TEXT UNIQUE NOT NULL,          -- human-friendly e.g. SKA-7F3A9C
  customer_name TEXT NOT NULL,
  phone         TEXT NOT NULL,
  address       TEXT NOT NULL,
  city          TEXT NOT NULL,
  note          TEXT,
  currency      TEXT NOT NULL DEFAULT 'USD',
  subtotal      NUMERIC(10,2) NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id          SERIAL PRIMARY KEY,
  order_id    INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id  TEXT NOT NULL,
  name        TEXT NOT NULL,
  collection  TEXT NOT NULL,
  price       NUMERIC(10,2) NOT NULL,
  qty         INTEGER NOT NULL CHECK (qty > 0),
  image       TEXT
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_orders_code ON orders (code);


-- ---- Data ----

INSERT INTO collections (slug, name, tagline, image, sort_order) VALUES ('luxury-abayas', 'Luxury Abayas', 'Pure Nida, draped to perfection', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80', 0)
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, tagline=EXCLUDED.tagline, image=EXCLUDED.image, sort_order=EXCLUDED.sort_order;
INSERT INTO collections (slug, name, tagline, image, sort_order) VALUES ('signature', 'Signature Collection', 'The house codes, in gold thread', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80', 1)
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, tagline=EXCLUDED.tagline, image=EXCLUDED.image, sort_order=EXCLUDED.sort_order;
INSERT INTO collections (slug, name, tagline, image, sort_order) VALUES ('eid', 'Eid Collection', 'Celebration, woven in light', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=80', 2)
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, tagline=EXCLUDED.tagline, image=EXCLUDED.image, sort_order=EXCLUDED.sort_order;
INSERT INTO collections (slug, name, tagline, image, sort_order) VALUES ('bridal', 'Bridal Abayas', 'An entrance to remember', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=80', 3)
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, tagline=EXCLUDED.tagline, image=EXCLUDED.image, sort_order=EXCLUDED.sort_order;
INSERT INTO collections (slug, name, tagline, image, sort_order) VALUES ('everyday', 'Everyday Elegance', 'Effortless from dawn to dusk', 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80', 4)
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, tagline=EXCLUDED.tagline, image=EXCLUDED.image, sort_order=EXCLUDED.sort_order;
INSERT INTO collections (slug, name, tagline, image, sort_order) VALUES ('limited-edition', 'Limited Edition', 'Numbered. Never repeated.', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80', 5)
ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, tagline=EXCLUDED.tagline, image=EXCLUDED.image, sort_order=EXCLUDED.sort_order;

INSERT INTO products (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order) VALUES ('noor-classic', 'Noor Classic Black', 'Signature Collection', 420, 'USD', 5, 214, 'Best Seller', 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=80', 'The piece that defines the house — a fluid, floor-skimming silhouette in matte black Nida, finished with a discreet gold-tipped placket. Quietly perfect for every occasion.', 'Premium Japanese Nida', true, 0)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price, currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, badge=EXCLUDED.badge, image=EXCLUDED.image, description=EXCLUDED.description, fabric=EXCLUDED.fabric, is_best_seller=true, sort_order=EXCLUDED.sort_order;
INSERT INTO products (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order) VALUES ('layla-gold', 'Layla Gold Embroidery', 'Luxury Abayas', 680, 'USD', 5, 168, 'Handcrafted', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80', 'Hand-embroidered cuffs in 24k-tone gold thread trace the wrist and hem. Each Layla takes an artisan three days to finish — a wearable heirloom.', 'Premium Nida with real gold thread', true, 1)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price, currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, badge=EXCLUDED.badge, image=EXCLUDED.image, description=EXCLUDED.description, fabric=EXCLUDED.fabric, is_best_seller=true, sort_order=EXCLUDED.sort_order;
INSERT INTO products (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order) VALUES ('dana-pearl', 'Dana Pearl Bridal', 'Bridal Abayas', 1240, 'USD', 5, 92, 'Limited', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80', 'Hand-set pearls cascade across an ivory-lined train. Designed for the bride who wants modesty and majesty in a single, unforgettable entrance.', 'Silk-blend crepe with pearl detailing', true, 2)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price, currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, badge=EXCLUDED.badge, image=EXCLUDED.image, description=EXCLUDED.description, fabric=EXCLUDED.fabric, is_best_seller=true, sort_order=EXCLUDED.sort_order;
INSERT INTO products (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order) VALUES ('rim-eid', 'Rim Eid Edition', 'Eid Collection', 560, 'USD', 4, 137, NULL, 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80', 'Celebration, woven in light. Soft satin panelling catches the evening glow — made for the nights that matter most.', 'Premium Nida with satin trim', true, 3)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price, currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, badge=EXCLUDED.badge, image=EXCLUDED.image, description=EXCLUDED.description, fabric=EXCLUDED.fabric, is_best_seller=true, sort_order=EXCLUDED.sort_order;
INSERT INTO products (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order) VALUES ('huda-everyday', 'Huda Everyday Drape', 'Everyday Elegance', 320, 'USD', 5, 248, 'New', 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=80', 'Effortless from dawn to dusk. A relaxed, breathable drape that moves with you — the everyday luxury you will reach for first.', 'Breathable lightweight Nida', true, 4)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price, currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, badge=EXCLUDED.badge, image=EXCLUDED.image, description=EXCLUDED.description, fabric=EXCLUDED.fabric, is_best_seller=true, sort_order=EXCLUDED.sort_order;
INSERT INTO products (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order) VALUES ('yasmin-signature', 'Yasmin Signature Satin', 'Signature Collection', 740, 'USD', 5, 121, NULL, 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80', 'A column of liquid satin that catches the light with every step. House codes, reimagined for the modern woman.', 'Liquid satin Nida', true, 5)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price, currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, badge=EXCLUDED.badge, image=EXCLUDED.image, description=EXCLUDED.description, fabric=EXCLUDED.fabric, is_best_seller=true, sort_order=EXCLUDED.sort_order;
INSERT INTO products (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order) VALUES ('amira-limited', 'Amira Limited Edition', 'Limited Edition', 980, 'USD', 5, 64, 'Limited', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=80', 'Numbered and never repeated. An architectural cut released in a single, limited run for the collector of fine modest fashion.', 'Couture-weight Nida', true, 6)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price, currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, badge=EXCLUDED.badge, image=EXCLUDED.image, description=EXCLUDED.description, fabric=EXCLUDED.fabric, is_best_seller=true, sort_order=EXCLUDED.sort_order;
INSERT INTO products (id, name, collection, price, currency, rating, reviews, badge, image, description, fabric, is_best_seller, sort_order) VALUES ('sana-bridal', 'Sana Bridal Couture', 'Bridal Abayas', 1480, 'USD', 5, 73, 'Bestseller', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80', 'Our most celebrated bridal piece — layers of embroidered organza over a fluid base, hand-finished for the most important day of all.', 'Embroidered silk organza', true, 7)
ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, collection=EXCLUDED.collection, price=EXCLUDED.price, currency=EXCLUDED.currency, rating=EXCLUDED.rating, reviews=EXCLUDED.reviews, badge=EXCLUDED.badge, image=EXCLUDED.image, description=EXCLUDED.description, fabric=EXCLUDED.fabric, is_best_seller=true, sort_order=EXCLUDED.sort_order;

INSERT INTO testimonials (quote, name, location, sort_order) VALUES ('The moment I unwrapped it, I understood the difference. The weight, the drape, the gold — this is couture, simply modest.', 'Aisha Al-Fahim', 'Dubai, UAE', 0) ON CONFLICT DO NOTHING;
INSERT INTO testimonials (quote, name, location, sort_order) VALUES ('I wore my SK Abaya to my sister''s wedding and three women asked where it was from before the night was over.', 'Fatima Khan', 'Lahore, Pakistan', 1) ON CONFLICT DO NOTHING;
INSERT INTO testimonials (quote, name, location, sort_order) VALUES ('Nothing I own makes me feel as elegant. It is modesty without compromise, and luxury without apology.', 'Noura Al-Saud', 'Riyadh, KSA', 2) ON CONFLICT DO NOTHING;
INSERT INTO testimonials (quote, name, location, sort_order) VALUES ('From the packaging to the tailoring, every detail whispers quality. This is the Chanel of abayas.', 'Sarah Ahmed', 'London, UK', 3) ON CONFLICT DO NOTHING;
