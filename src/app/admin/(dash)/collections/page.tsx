import Image from "next/image";
import { listCollectionsAll } from "@/lib/admin";
import { addCollection, removeCollection } from "../../actions";
import ImageField from "@/components/ImageField";

export const dynamic = "force-dynamic";

export default async function AdminCollections() {
  const collections = await listCollectionsAll();

  return (
    <div>
      <p className="eyebrow">Catalogue</p>
      <h1 className="mt-3 font-display text-4xl text-ivory">Collections</h1>

      <form action={addCollection} className="glass mt-8 grid gap-4 p-6 sm:grid-cols-2">
        <h2 className="font-display text-xl text-ivory sm:col-span-2">
          Add a collection
        </h2>
        <L label="Name *">
          <input name="name" required className="input" placeholder="Eid Collection" />
        </L>
        <L label="Tagline">
          <input name="tagline" className="input" placeholder="Celebration, woven in light" />
        </L>
        <ImageField className="sm:col-span-2" />
        <L label="Slug (optional)">
          <input name="slug" className="input" placeholder="auto from name" />
        </L>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-gold">Add Collection</button>
        </div>
      </form>

      <h2 className="mt-12 font-display text-2xl text-ivory">
        All collections ({collections.length})
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {collections.map((c) => (
          <div key={c.slug} className="glass overflow-hidden">
            <div className="relative aspect-[4/5] bg-charcoal">
              <Image src={c.image} alt={c.name} fill sizes="240px" className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg text-ivory">{c.name}</h3>
              <p className="mt-1 text-xs text-muted">{c.tagline}</p>
              <form action={removeCollection} className="mt-3">
                <input type="hidden" name="slug" value={c.slug} />
                <button
                  type="submit"
                  className="font-label text-[10px] uppercase tracking-[0.15em] text-red-300/80 transition-colors hover:text-red-300"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
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
