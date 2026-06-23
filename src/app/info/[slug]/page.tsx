import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { infoPages } from "@/lib/info-content";

export function generateStaticParams() {
  return Object.keys(infoPages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = infoPages[slug];
  return { title: page ? page.title : "Not found" };
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = infoPages[slug];
  if (!page) notFound();

  return (
    <>
      <Header />
      <main className="section section-wide flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl text-ivory md:text-6xl">
            {page.title}
          </h1>
          <div className="mt-6 hairline w-24" />

          {page.intro && (
            <p className="mt-8 font-serif text-2xl leading-relaxed text-ivory/80">
              {page.intro}
            </p>
          )}

          <div className="mt-10 space-y-10">
            {page.sections.map((s, i) => (
              <section key={i}>
                {s.heading && (
                  <h2 className="font-display text-2xl text-gilded">
                    {s.heading}
                  </h2>
                )}
                <div className="mt-3 space-y-3">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-lg leading-relaxed text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
