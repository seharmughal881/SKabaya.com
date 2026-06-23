import { listTestimonialsAll } from "@/lib/admin";
import { addTestimonial, removeTestimonial } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonials() {
  const testimonials = await listTestimonialsAll();

  return (
    <div>
      <p className="eyebrow">Social proof</p>
      <h1 className="mt-3 font-display text-4xl text-ivory">Testimonials</h1>

      <form action={addTestimonial} className="glass mt-8 grid gap-4 p-6">
        <h2 className="font-display text-xl text-ivory">Add a testimonial</h2>
        <label className="block">
          <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
            Quote *
          </span>
          <textarea
            name="quote"
            required
            rows={3}
            className="input mt-2 resize-y"
            placeholder="The moment I unwrapped it…"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
              Name *
            </span>
            <input name="name" required className="input mt-2" placeholder="Aisha Al-Fahim" />
          </label>
          <label className="block">
            <span className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
              Location
            </span>
            <input name="location" className="input mt-2" placeholder="Dubai, UAE" />
          </label>
        </div>
        <div>
          <button type="submit" className="btn-gold">Add Testimonial</button>
        </div>
      </form>

      <h2 className="mt-12 font-display text-2xl text-ivory">
        All testimonials ({testimonials.length})
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.id} className="glass p-6">
            <p className="font-serif text-lg italic text-ivory/90">“{t.quote}”</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="font-display text-gilded">{t.name}</p>
                <p className="font-label text-[10px] uppercase tracking-[0.25em] text-muted">
                  {t.location}
                </p>
              </div>
              <form action={removeTestimonial}>
                <input type="hidden" name="id" value={t.id} />
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
