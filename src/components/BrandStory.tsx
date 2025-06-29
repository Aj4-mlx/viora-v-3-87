import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const BrandStory = () => {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-white via-floral-blush/20 to-floral-lavender/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-floral-peach/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-floral-lavender/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <span className="inline-block px-3 sm:px-4 py-2 bg-floral-violet/10 text-floral-deep-violet rounded-full text-xs sm:text-sm font-elegant tracking-wide mb-4 sm:mb-6">
                Our Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-floral-deep-violet mb-4 sm:mb-6 leading-tight">
                Crafted with Passion, 
                <span className="block text-floral-gradient">Born from Love</span>
              </h2>
            </div>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-elegant">
              For over three decades, Viora has been the embodiment of timeless elegance 
              and exceptional craftsmanship. Our journey began with a simple dream: to create 
              jewelry that tells stories, celebrates love, and becomes cherished heirlooms 
              passed down through generations.
            </p>
            
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-elegant">
              Every piece in our collection is meticulously crafted by master artisans who 
              pour their passion into every detail. From the initial design concept to the 
              final polish, we ensure that each creation meets our exacting standards of 
              quality and beauty.
            </p>
            
            <div className="pt-4">
              <Link to="/about">
                <Button 
                  className="bg-floral-deep-violet hover:bg-floral-violet text-white font-elegant px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Discover Our Story
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-floral-peach/20 to-floral-lavender/30 rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                alt="Viora Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating stats */}
            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-floral-deep-violet">30+</div>
                <div className="text-xs sm:text-sm font-elegant text-gray-600">Years of Excellence</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-floral-deep-violet">500+</div>
                <div className="text-xs sm:text-sm font-elegant text-gray-600">Unique Designs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
