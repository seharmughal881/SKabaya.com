import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getCollectionBySlug, getProductsByCollection } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  return { title: collection ? collection.name : "Collection not found" };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = await getProductsByCollection(slug);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Collection hero */}
        <section className="relative flex h-[46vh] min-h-[320px] items-center overflow-hidden">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
          <div className="section section-wide relative">
            <nav className="font-label flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted">
              <Link href="/" className="transition-colors hover:text-gold">
                Home
              </Link>
              <span>/</span>
              <span className="text-ivory/70">Collections</span>
            </nav>
            <p className="eyebrow mt-5">Collection</p>
            <h1 className="mt-3 font-display text-5xl text-ivory md:text-7xl">
              {collection.name}
            </h1>
            <p className="mt-4 font-serif text-xl italic text-ivory/80">
              {collection.tagline}
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="section section-wide py-16 md:py-20">
          <p className="font-label text-[11px] uppercase tracking-[0.25em] text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>

          {products.length === 0 ? (
            <div className="mt-12 flex flex-col items-center text-center">
              <p className="font-serif text-2xl text-ivory/80">
                New pieces arriving soon.
              </p>
              <Link href="/#best-sellers" className="btn-gold mt-8">
                Explore Best Sellers
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-5 md:gap-7 lg:grid-cols-4">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 90}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
