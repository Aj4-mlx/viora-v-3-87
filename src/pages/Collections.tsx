
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface CollectionItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  rating?: number;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  theme: string;
  image_url: string;
  items: CollectionItem[];
}

const Collections = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();

  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      setError(null);

      // Since we don't have collections table, create collections based on product categories
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) {
        throw productsError;
      }

      if (!products || products.length === 0) {
        setError("No products found");
        setLoading(false);
        return;
      }

      // Group products by category to create collections
      const categoriesMap = new Map<string, CollectionItem[]>();

      products.forEach(product => {
        const item: CollectionItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          image_url: product.image_url || '',
          rating: Math.floor(Math.random() * 2) + 4 // Random rating between 4-5
        };

        if (!categoriesMap.has(product.category)) {
          categoriesMap.set(product.category, []);
        }
        categoriesMap.get(product.category)!.push(item);
      });

      // Create collections from categories
      const collectionsData: Collection[] = Array.from(categoriesMap.entries()).map(([category, items], index) => {
        const collectionImages = [
          "https://images.unsplash.com/photo-1523268755815-fe7c372a0349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          "https://images.unsplash.com/photo-1570891836654-32f91104c324?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
        ];

        const descriptions = {
          'Rings': 'Elegant rings that symbolize eternal love and commitment.',
          'Necklaces': 'Stunning necklaces that add grace to any outfit.',
          'Earrings': 'Beautiful earrings that frame your face perfectly.',
          'Bracelets': 'Delicate bracelets that complement your style.',
        };

        const themes = {
          'Rings': 'Elegance',
          'Necklaces': 'Grace',
          'Earrings': 'Beauty',
          'Bracelets': 'Style',
        };

        return {
          id: `collection-${index}`,
          name: category,
          description: descriptions[category as keyof typeof descriptions] || `Beautiful ${category.toLowerCase()} collection featuring exquisite designs.`,
          theme: themes[category as keyof typeof themes] || 'Luxury',
          image_url: collectionImages[index % collectionImages.length],
          items
        };
      });

      setCollections(collectionsData);
      if (collectionsData.length > 0) {
        setSelectedCollection(collectionsData[0]);
      }

    } catch (err: any) {
      console.error("Error fetching collections:", err);
      setError(err.message || "Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllInShop = () => {
    if (!selectedCollection) return;

    toast({
      title: "Redirecting to Shop",
      description: `Viewing all ${selectedCollection.name} items in shop...`,
    });
    navigate('/shop');
  };

  const handleAddToCart = (item: CollectionItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image_url || ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-slate-600">Loading collections...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !selectedCollection) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Our Collections
            </h1>
            <p className="text-xl text-red-600 max-w-2xl mx-auto">
              {error || "No collections available at the moment."}
            </p>
            <Button
              className="mt-8 bg-coral-peach hover:bg-coral-peach/80"
              onClick={() => navigate('/shop')}
            >
              Browse All Products
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
              Our Collections
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our carefully curated themed collections, each telling a unique story
              through exquisite jewelry pieces designed for every occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Collections Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {collections.map((collection) => (
              <Button
                key={collection.id}
                variant={selectedCollection.id === collection.id ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCollection(collection)}
                className={selectedCollection.id === collection.id
                  ? "bg-coral-peach hover:bg-coral-peach/80"
                  : "border-slate-300 hover:border-coral-peach hover:text-coral-peach"
                }
              >
                {collection.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Collection Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Collection Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">
              {selectedCollection.name}
            </h2>
            <p className="text-lg text-slate-600 mb-2">
              {selectedCollection.theme}
            </p>
            <p className="text-slate-500">
              {selectedCollection.items.length} unique pieces
            </p>
          </div>

          {/* Collection Hero Image */}
          <div className="mb-12">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-6">
              <img
                src={selectedCollection.image_url}
                alt={selectedCollection.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Featured Items */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Featured Items
              </h3>
              <Button
                variant="outline"
                onClick={handleViewAllInShop}
                className="border-coral-peach text-coral-peach hover:bg-coral-peach hover:text-white"
              >
                View All in Shop
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {selectedCollection.items.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                <p className="text-slate-600">No items available in this collection yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedCollection.items.map((item) => (
                  <Card
                    key={item.id}
                    className="group cursor-pointer border-slate-200 hover:shadow-lg transition-all duration-300 bg-white"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square bg-slate-100 mb-4 overflow-hidden relative">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-coral-peach text-white text-xs px-2 py-1 rounded-full font-medium">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-coral-peach transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < (item.rating || 5) ? 'text-muted-mustard fill-current' : 'text-slate-300'}`}
                            />
                          ))}
                        </div>
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
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Collection Story */}
          <div className="bg-white p-8 rounded-lg border border-slate-200">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
              About {selectedCollection.name}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {selectedCollection.description} Each piece in this collection has been carefully
              selected to embody the essence of {selectedCollection.theme.toLowerCase()}.
              From delicate rings to statement necklaces, every item tells a story of craftsmanship
              and beauty that will accompany you through life's most precious moments.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collections;
