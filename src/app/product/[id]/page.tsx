import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductPurchase from "@/components/ProductPurchase";
import Reveal from "@/components/Reveal";
import {
  getProduct,
  getRelatedProducts,
  getCollectionSlugByName,
} from "@/lib/queries";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description ?? `${product.name} — ${product.collection}`,
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i < rating ? "fill-gold" : "fill-muted/30"}`}
        >
          <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.4L12 16.8 5.7 21l2.3-7.4-6-4.4h7.6z" />
        </svg>
      ))}
    </span>
  );
}

const perks = [
  "Complimentary worldwide shipping",
  "Handcrafted to order",
  "Custom tailoring available",
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const [related, collectionSlug] = await Promise.all([
    getRelatedProducts(product.id, product.collection),
    getCollectionSlugByName(product.collection),
  ]);

  const collectionHref = collectionSlug
    ? `/collection/${collectionSlug}`
    : "/#collections";

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="section section-wide pt-8">
          <nav className="font-label flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <Link href={collectionHref} className="transition-colors hover:text-gold">
              {product.collection}
            </Link>
            <span>/</span>
            <span className="text-ivory/70">{product.name}</span>
          </nav>
        </div>

        {/* Product */}
        <div className="section section-wide grid gap-10 py-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal>
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-charcoal to-ink">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <span className="font-label absolute left-5 top-5 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
                  {product.badge}
                </span>
              )}
            </div>
          </Reveal>

          {/* Details */}
          <Reveal delay={100} className="flex flex-col justify-center">
            <Link
              href={collectionHref}
              className="font-label text-[11px] uppercase tracking-[0.35em] text-gold/80 transition-colors hover:text-gold"
            >
              {product.collection}
            </Link>
            <h1 className="mt-3 font-display text-4xl text-ivory md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <Stars rating={product.rating} />
              <span className="text-sm text-muted">
                {product.reviews} reviews
              </span>
            </div>

            <p className="mt-6 font-serif text-3xl text-ivory">
              {formatPrice(product.price, product.currency)}
            </p>

            <div className="mt-7 hairline w-full max-w-xs" />

            <p className="mt-7 text-lg leading-relaxed text-ivory/75">
              {product.description ??
                "A handcrafted SK Abaya piece — modesty and luxury, woven together."}
            </p>

            {product.fabric && (
              <p className="mt-4 text-sm text-muted">
                <span className="font-label uppercase tracking-[0.2em] text-ivory/70">
                  Fabric:
                </span>{" "}
                {product.fabric}
              </p>
            )}

            <ProductPurchase product={product} />

            {/* Perks */}
            <ul className="mt-9 space-y-3 border-t border-line/40 pt-7">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-muted">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 fill-none stroke-gold"
                    strokeWidth="1.5"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="section section-wide py-16 md:py-24">
            <Reveal>
              <p className="eyebrow">You may also like</p>
              <h2 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
                From {product.collection}
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-5 md:gap-7 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 100}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
