import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/subscribers", label: "Subscribers" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-[100svh] flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-line/40 bg-ink-soft lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between p-6 lg:block">
          <Link href="/" className="font-display text-2xl tracking-[0.2em] text-ivory">
            SK<span className="text-gilded"> ABAYA</span>
          </Link>
          <p className="font-label mt-1 hidden text-[9px] uppercase tracking-[0.4em] text-gold/70 lg:block">
            Admin Panel
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-4 lg:mt-4 lg:flex-col lg:px-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-label whitespace-nowrap rounded px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:bg-gold/10 hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <form action={logout} className="p-4 lg:mt-auto">
          <button
            type="submit"
            className="font-label w-full border border-line px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:border-gold hover:text-gold"
          >
            Log out
          </button>
        </form>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
