
import { Hero } from "@/components/Hero";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { NewArrivals } from "@/components/NewArrivals";
import { BrandStory } from "@/components/BrandStory";
import { Newsletter } from "@/components/Newsletter";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-floral-cream via-floral-blush/20 to-floral-lavender/30">
      <Header />
      <Hero />
      <FeaturedCollections />
      <NewArrivals />
      <BrandStory />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
