import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import WhyChoose from "@/components/WhyChoose";
import BestSellers from "@/components/BestSellers";
import LuxuryExperience from "@/components/LuxuryExperience";
import Testimonials from "@/components/Testimonials";
import InstagramGallery from "@/components/InstagramGallery";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

// Always render against live database content.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedCollections />
        <WhyChoose />
        <BestSellers />
        <LuxuryExperience />
        <Testimonials />
        <InstagramGallery />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
