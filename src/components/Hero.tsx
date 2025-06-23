
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Hero Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Timeless
            <span className="block text-yellow-400">Elegance</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            Discover our curated collection of exquisite jewelry pieces, 
            each crafted with precision and passion to celebrate life's 
            most precious moments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg font-medium"
            >
              Shop Collection
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 text-lg"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-yellow-400/20 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-20 right-40 w-16 h-16 bg-yellow-400/10 rounded-full hidden lg:block"></div>
    </section>
  );
};
