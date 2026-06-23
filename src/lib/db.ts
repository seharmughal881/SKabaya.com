import { Pool, type PoolClient } from "pg";

/**
 * Singleton Postgres pool. In development Next.js hot-reloads modules, so we
 * cache the pool on globalThis to avoid exhausting connections.
 */
const globalForDb = globalThis as unknown as { pgPool?: Pool };

const connectionString = process.env.DATABASE_URL;

// Managed/cloud Postgres (Neon, Supabase, RDS…) requires SSL. Local dev does not.
const isLocal =
  !connectionString || /localhost|127\.0\.0\.1/.test(connectionString);
const useSsl =
  /sslmode=require/i.test(connectionString ?? "") ||
  (process.env.NODE_ENV === "production" && !isLocal);

export const pool =
  globalForDb.pgPool ??
  new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30_000,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  });

if (process.env.NODE_ENV !== "production") globalForDb.pgPool = pool;

/** Tagged-template-free typed query helper. */
export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const res = await pool.query(text, params);
  return res.rows as T[];
}

/** Runs `fn` inside a transaction, committing on success and rolling back on error. */
export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
