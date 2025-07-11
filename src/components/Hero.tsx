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
    <section className="relative floral-gradient-hero text-white overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-floral-deep-violet/30"></div>

      {/* Hero Content */}
      <div className="relative container mx-auto px-6 sm:px-4 py-20 sm:py-24 md:py-32">
        <div className="max-w-3xl relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 sm:mb-6 leading-tight">
            Timeless
            <span className="block text-floral-cream bg-gradient-to-r from-floral-cream via-white to-floral-peach bg-clip-text text-transparent animate-pulse">
              Elegance
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-fs-ostro font-light mt-4 sm:mt-4 text-white/90">
              in Full Bloom
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-8 leading-relaxed font-elegant max-w-2xl">
            Discover our curated collection of exquisite jewelry pieces,
            each crafted with the delicate beauty of nature and the
            precision of master artisans to celebrate life's
            most precious moments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 mb-12 sm:mb-16">
            <Button
              size="lg"
              className="bg-white text-floral-deep-violet hover:bg-floral-deep-violet hover:text-white font-elegant px-8 sm:px-8 py-4 sm:py-4 text-lg sm:text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[48px] sm:min-h-[52px]"
              onClick={handleShopCollection}
            >
              Shop Collection
            </Button>
            <Button
              size="lg"
              className="bg-white text-floral-deep-violet hover:bg-floral-deep-violet hover:text-white font-elegant px-8 sm:px-8 py-4 sm:py-4 text-lg sm:text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[48px] sm:min-h-[52px]"
              onClick={handleOurStory}
            >
              Our Story
            </Button>
          </div>

          <div className="mt-12 sm:mt-12 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-6 sm:space-y-0 sm:space-x-12 text-white/80">
            <div className="text-center">
              <div className="text-2xl sm:text-2xl font-display font-bold text-white">30+</div>
              <div className="text-sm sm:text-sm font-elegant">Years Excellence</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-2xl font-display font-bold text-white">10k+</div>
              <div className="text-sm sm:text-sm font-elegant">Happy Customers</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-2xl font-display font-bold text-white">500+</div>
              <div className="text-sm sm:text-sm font-elegant">Unique Designs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-floral-cream/20 to-transparent"></div>
    </section>
  );
};
