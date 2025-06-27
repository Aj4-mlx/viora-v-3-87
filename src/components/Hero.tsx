
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleShopCollection = () => {
    navigate('/shop');
  };

  const handleOurStory = () => {
    navigate('/about');
  };

  return (
    <section className="relative floral-gradient-hero text-white overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-floral-deep-violet/30"></div>

      {/* Floating floral elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border-2 border-white/20 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-32 right-40 w-16 h-16 bg-white/10 rounded-full animate-float delay-1000 hidden lg:block"></div>
      <div className="absolute top-40 left-20 w-24 h-24 border border-floral-cream/30 rounded-full animate-float delay-500 hidden lg:block"></div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-elegant tracking-wide border border-white/20 mb-6">
              ✨ Floral Luxury Collection ✨
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
            Timeless
            <span className="block text-floral-cream bg-gradient-to-r from-floral-cream via-white to-floral-peach bg-clip-text text-transparent animate-pulse">
              Elegance
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-elegant font-light mt-4 text-white/90">
              in Full Bloom
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-elegant max-w-2xl">
            Discover our curated collection of exquisite jewelry pieces,
            each crafted with the delicate beauty of nature and the
            precision of master artisans to celebrate life's
            most precious moments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-floral-deep-violet hover:bg-floral-deep-violet hover:text-white font-elegant px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={handleShopCollection}
            >
              Shop Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className=" border-2 border-white text-floral-deep-violet hover:bg-floral-deep-violet hover:text-white px-8 py-4 text-lg font-elegant rounded-full backdrop-blur-sm hover:backdrop-blur-md transition-all duration-300 hover:scale-105"
              onClick={handleOurStory}
            >
              Our Story
            </Button>
          </div>

          <div className="mt-12 flex items-center space-x-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-white">30+</div>
              <div className="text-sm font-elegant">Years Excellence</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-white">10k+</div>
              <div className="text-sm font-elegant">Happy Customers</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-white">500+</div>
              <div className="text-sm font-elegant">Unique Designs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-floral-cream/20 to-transparent"></div>

      {/* Floating Product Image Overlay */}
      <img
        src="/lovable-uploads/ring.png"
        alt="Floating Jewelry Piece"
        className="absolute right-4 bottom-16 w-64 max-w-[40%] lg:right-24 lg:bottom-24 lg:w-[400px] z-10 pointer-events-none animate-float-slow"
      />


    </section>
  );
};
