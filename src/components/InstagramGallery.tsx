import { getShowcaseProducts } from "@/lib/queries";
import ShopTile from "./ShopTile";
import Reveal from "./Reveal";

export default async function InstagramGallery() {
  const products = await getShowcaseProducts(6);

  return (
    <section id="instagram" className="py-24 md:py-32">
      <Reveal className="section section-wide text-center">
        <p className="eyebrow">Shop the Feed</p>
        <h2 className="mt-5 font-display text-4xl text-ivory md:text-6xl">
          @skabaya
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-serif text-lg text-ivory/70">
          An editorial diary of light and fabric — tap any piece to shop the look.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-3">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={(i % 6) * 80}>
            <ShopTile product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
