
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const NewArrivals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Celestial Diamond Ring",
      price: "24,500 EGP",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      isNew: true,
      rating: 5
    },
    {
      id: 2,
      name: "Vintage Pearl Necklace",
      price: "12,000 EGP",
      originalPrice: "15,000 EGP",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      isNew: true,
      rating: 5
    },
    {
      id: 3,
      name: "Rose Gold Bracelet",
      price: "8,900 EGP",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      isNew: true,
      rating: 4
    },
    {
      id: 4,
      name: "Sapphire Drop Earrings",
      price: "16,500 EGP",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      isNew: true,
      rating: 5
    }
  ];

  const handleWishlistToggle = (productId: number, productName: string) => {
    const isInWishlist = wishlistItems.includes(productId);
    
    if (isInWishlist) {
      setWishlistItems(prev => prev.filter(id => id !== productId));
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
      });
    } else {
      setWishlistItems(prev => [...prev, productId]);
      toast({
        title: "Added to wishlist",
        description: `${productName} has been added to your wishlist.`,
      });
    }
  };

  const handleViewAllProducts = () => {
    navigate('/shop');
  };

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  return (
    <section className="py-16 bg-pale-peach/30">
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
            <Card key={product.id} className="group cursor-pointer border-slate-200 hover:shadow-lg transition-all duration-300 bg-white">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-white mb-4 overflow-hidden">
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-coral-peach text-white text-xs px-2 py-1 rounded-full font-medium z-10">
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
                    className={`absolute top-3 right-3 hover:text-coral-peach opacity-0 group-hover:opacity-100 transition-opacity ${
                      wishlistItems.includes(product.id) ? 'text-coral-peach' : 'text-slate-600'
                    }`}
                    onClick={() => handleWishlistToggle(product.id, product.name)}
                  >
                    <Star className={`w-4 h-4 ${wishlistItems.includes(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-coral-peach transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < product.rating ? 'text-muted-mustard fill-current' : 'text-slate-300'}`} 
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
                    <Button 
                      size="sm"
                      className="bg-coral-peach hover:bg-coral-peach/80 text-white"
                      onClick={() => handleAddToCart(product.name)}
                    >
                      Add to Cart
                    </Button>
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
            className="border-slate-300 text-slate-700 hover:border-coral-peach hover:text-coral-peach px-8"
            onClick={handleViewAllProducts}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};
