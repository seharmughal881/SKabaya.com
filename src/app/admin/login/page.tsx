import Link from "next/link";
import { login } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="grid min-h-[100svh] place-items-center px-6">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="font-display block text-center text-3xl tracking-[0.2em] text-ivory"
        >
          SK<span className="text-gilded"> ABAYA</span>
        </Link>
        <p className="font-label mt-2 text-center text-[9px] uppercase tracking-[0.5em] text-gold/70">
          Admin Panel
        </p>

        <form action={login} className="glass mt-10 p-8">
          <label className="block">
            <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="input mt-2"
              placeholder="••••••••"
            />
          </label>
          {error && (
            <p className="font-label mt-4 text-xs uppercase tracking-[0.2em] text-red-400">
              Incorrect password
            </p>
          )}
          <button type="submit" className="btn-gold mt-6 w-full">
            Enter
          </button>

          <p className="mt-5 border-t border-line/40 pt-4 text-center text-xs text-muted">
            Password:{" "}
            <span className="font-label tracking-[0.15em] text-gold">
              {process.env.ADMIN_PASSWORD ?? "skabaya-admin-2026"}
            </span>
          </p>
        </form>

        <Link
          href="/"
          className="font-label mt-6 block text-center text-[10px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-gold"
        >
          ← Back to store
        </Link>
      </div>
    </main>
  );
}
