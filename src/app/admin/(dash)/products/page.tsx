import Image from "next/image";
import { listProducts } from "@/lib/admin";
import { collections, currencies } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { addProduct, removeProduct, setBestSeller } from "../../actions";
import ImageField from "@/components/ImageField";

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
  const products = await listProducts();

  return (
    <div>
      <p className="eyebrow">Catalogue</p>
      <h1 className="mt-3 font-display text-4xl text-ivory">Products</h1>

      {/* Add form */}
      <form
        action={addProduct}
        className="glass mt-8 grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <h2 className="font-display text-xl text-ivory sm:col-span-2 lg:col-span-3">
          Add a product
        </h2>
        <L label="Name *">
          <input name="name" required className="input" placeholder="Noor Classic Black" />
        </L>
        <L label="Collection">
          <select name="collection" className="input">
            {collections.map((c) => (
              <option key={c.slug} value={c.name} className="bg-ink">
                {c.name}
              </option>
            ))}
          </select>
        </L>
        <ImageField className="sm:col-span-2 lg:col-span-3" />
        <L label="Price">
          <input name="price" type="number" min="0" step="0.01" className="input" defaultValue={0} />
        </L>
        <L label="Currency">
          <select name="currency" className="input" defaultValue="USD">
            {currencies.map((c) => (
              <option key={c} value={c} className="bg-ink">
                {c}
              </option>
            ))}
          </select>
        </L>
        <L label="Badge (optional)">
          <input name="badge" className="input" placeholder="Best Seller / New / Limited" />
        </L>
        <L label="Rating (0-5)">
          <input name="rating" type="number" min="0" max="5" className="input" defaultValue={5} />
        </L>
        <L label="Reviews">
          <input name="reviews" type="number" min="0" className="input" defaultValue={0} />
        </L>
        <label className="flex items-center gap-3 self-end pb-3">
          <input name="isBestSeller" type="checkbox" defaultChecked className="h-4 w-4 accent-[#d4af37]" />
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-muted">
            Show in Best Sellers
          </span>
        </label>
        <div className="sm:col-span-2 lg:col-span-3">
          <button type="submit" className="btn-gold">
            Add Product
          </button>
        </div>
      </form>

      {/* Table */}
      <h2 className="mt-12 font-display text-2xl text-ivory">
        All products ({products.length})
      </h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line/40 text-left">
              {["", "Name", "Collection", "Price", "Best Seller", ""].map(
                (h, i) => (
                  <th
                    key={i}
                    className="font-label px-3 py-3 text-[10px] uppercase tracking-[0.2em] text-muted"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-line/20">
                <td className="px-3 py-3">
                  <div className="relative h-14 w-11 overflow-hidden bg-charcoal">
                    <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" />
                  </div>
                </td>
                <td className="px-3 py-3 text-ivory">{p.name}</td>
                <td className="px-3 py-3 text-muted">{p.collection}</td>
                <td className="px-3 py-3 text-ivory">{formatPrice(p.price, p.currency)}</td>
                <td className="px-3 py-3">
                  <form action={setBestSeller}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="value" value={(!p.isBestSeller).toString()} />
                    <button
                      type="submit"
                      className={`font-label text-[10px] uppercase tracking-[0.15em] ${
                        p.isBestSeller ? "text-gold" : "text-muted hover:text-gold"
                      }`}
                    >
                      {p.isBestSeller ? "★ Yes" : "☆ No"}
                    </button>
                  </form>
                </td>
                <td className="px-3 py-3">
                  <form action={removeProduct}>
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="font-label text-[10px] uppercase tracking-[0.15em] text-red-300/80 transition-colors hover:text-red-300"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function L({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
