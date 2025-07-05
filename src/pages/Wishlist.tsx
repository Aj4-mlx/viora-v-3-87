import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Star, Trash2, ShoppingCart } from "lucide-react";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    });
  };

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Start adding your favorite jewelry pieces to your wishlist. 
              You can save items for later and get notified when they're back in stock.
            </p>
            <Button
              onClick={() => navigate('/shop')}
              className="bg-floral-deep-violet hover:bg-floral-violet text-white"
            >
              Start Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-coral-peach/10 to-pale-peach/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              My Wishlist
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Your saved jewelry pieces ({wishlistItems.length} items)
            </p>
          </div>
        </div>
      </section>

      {/* Wishlist Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Saved Items
            </h2>
            <Button
              variant="outline"
              onClick={handleClearWishlist}
              className="text-slate-600 hover:text-red-600 border-slate-300 hover:border-red-300"
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group cursor-pointer border-slate-200 hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-0">
                  <div className="relative bg-white overflow-hidden aspect-square mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(item.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-coral-peach transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-slate-900">
                        {item.price.toLocaleString()} EGP
                      </span>
                      <Button
                        size="sm"
                        className="bg-floral-deep-violet hover:bg-floral-violet text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <Button
              onClick={() => navigate('/shop')}
              className="bg-floral-deep-violet hover:bg-floral-violet text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wishlist;
