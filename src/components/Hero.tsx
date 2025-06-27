
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
    <section className="relative bg-gradient-to-br from-puce-red via-rust to-puce-red text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Hero Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Timeless
            <span className="block text-royal-orange">Elegance</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            Discover our curated collection of exquisite jewelry pieces, 
            each crafted with precision and passion to celebrate life's 
            most precious moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-royal-orange hover:bg-royal-orange/80 text-white px-8 py-3 text-lg font-medium"
              onClick={handleShopCollection}
            >
              Shop Collection
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-orange-yellow hover:text-puce-red px-8 py-3 text-lg font-medium"
              onClick={handleOurStory}
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-royal-orange/20 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-20 right-40 w-16 h-16 bg-royal-orange/10 rounded-full hidden lg:block"></div>
    </section>
  );
};
