
import { Button } from "@/components/ui/button";

export const BrandStory = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-floral-blush/20 to-floral-lavender/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-floral-peach/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-floral-lavender/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-floral-violet/10 text-floral-deep-violet rounded-full text-sm font-elegant tracking-wide mb-6">
                Our Heritage
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-floral-deep-violet mb-6 leading-tight">
                Crafted with Passion, 
                <span className="block text-floral-gradient">Born from Love</span>
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed font-elegant">
                For over three decades, Viora has been synonymous with exceptional 
                craftsmanship and timeless elegance. Each piece in our collection 
                tells a story of dedication, artistry, and the pursuit of perfection.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-elegant">
                From sourcing the finest materials to the delicate finishing touches, 
                our master craftsmen ensure that every Viora creation becomes a 
                treasured heirloom for generations to come.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 py-8">
              <div className="text-center group">
                <div className="text-4xl font-display font-bold text-floral-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  30+
                </div>
                <div className="text-sm text-gray-600 font-elegant">Years of Excellence</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-display font-bold text-floral-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  10k+
                </div>
                <div className="text-sm text-gray-600 font-elegant">Happy Customers</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-display font-bold text-floral-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="text-sm text-gray-600 font-elegant">Unique Designs</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-floral-violet hover:bg-floral-deep-violet text-white font-elegant px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Discover Our Craft
              </Button>
              <Button variant="outline" className="border-floral-violet text-floral-violet hover:bg-floral-violet hover:text-white font-elegant px-6 py-3 rounded-full transition-all duration-300">
                Watch Our Story
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square glass-effect rounded-3xl overflow-hidden floral-shadow relative group">
              <img 
                src="/lovable-uploads/8ba3cc12-b98f-46c9-805a-310f57f274ed.png" 
                alt="Viora Floral Inspiration"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-floral-deep-violet/20 to-transparent"></div>
            </div>
            
            {/* Floating logo accent */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-floral-violet to-floral-deep-violet rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-xl animate-float">
              V
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-floral-peach rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-6 w-12 h-12 bg-floral-coral/30 rounded-full blur-sm animate-float delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
