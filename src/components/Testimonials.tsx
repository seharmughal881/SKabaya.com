import { getTestimonials } from "@/lib/queries";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  return <TestimonialsCarousel testimonials={testimonials} />;
}
