
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type SupabaseProduct = Database["public"]["Tables"]["products"]["Row"];

interface DisplayProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  rating: number;
  isNew: boolean;
}

// Adapter function to convert Supabase product to display product
const adaptSupabaseProduct = (product: SupabaseProduct): DisplayProduct => ({
  id: parseInt(product.id),
  name: product.name,
  price: `${product.price} EGP`,
  originalPrice: undefined, // Not available in Supabase schema
  image: product.image_url || '',
  category: product.category,
  rating: 5, // Default rating since not available in Supabase schema
  isNew: true // Default to new since not available in Supabase schema
});

export const NewArrivals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [newArrivals, setNewArrivals] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) {
        setError("Failed to load new arrivals");
        setNewArrivals([]);
      } else {
        // Convert Supabase products to display products
        const displayProducts = (data || []).map(adaptSupabaseProduct);
        setNewArrivals(displayProducts);
      }
      setLoading(false);
    };
    fetchNewArrivals();
  }, []);

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

  const handleAddToCart = (product: DisplayProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace(' EGP', '')),
      image: product.image
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-pale-peach/30 text-center">
        <span>Loading new arrivals...</span>
      </section>
    );
  }
  if (error) {
    return (
      <section className="py-16 bg-pale-peach/30 text-center text-red-500">
        {error}
      </section>
    );
  }

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
          {newArrivals.map((product) => (
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
                    className={`absolute top-3 right-3 hover:text-coral-peach opacity-0 group-hover:opacity-100 transition-opacity ${wishlistItems.includes(product.id) ? 'text-coral-peach' : 'text-slate-600'
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
                      onClick={() => handleAddToCart(product)}
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
