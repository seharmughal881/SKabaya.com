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
