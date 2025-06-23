
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const NewArrivals = () => {
  const products = [
    {
      id: 1,
      name: "Celestial Diamond Ring",
      price: "$2,450",
      originalPrice: null,
      image: "/placeholder.svg",
      isNew: true,
      rating: 5
    },
    {
      id: 2,
      name: "Vintage Pearl Necklace",
      price: "$1,200",
      originalPrice: "$1,500",
      image: "/placeholder.svg",
      isNew: true,
      rating: 5
    },
    {
      id: 3,
      name: "Rose Gold Bracelet",
      price: "$890",
      originalPrice: null,
      image: "/placeholder.svg",
      isNew: true,
      rating: 4
    },
    {
      id: 4,
      name: "Sapphire Drop Earrings",
      price: "$1,650",
      originalPrice: null,
      image: "/placeholder.svg",
      isNew: true,
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            New Arrivals
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover the latest additions to our collection, featuring 
            contemporary designs and timeless classics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group cursor-pointer border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-white mb-4 overflow-hidden">
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-yellow-600 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                      NEW
                    </span>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute top-3 right-3 text-slate-600 hover:text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-yellow-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold text-slate-900">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-slate-300 text-slate-700 hover:border-yellow-600 hover:text-yellow-600 px-8"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
