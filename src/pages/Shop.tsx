import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Grid3X3, List } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useSearch } from "@/contexts/SearchContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/data/products";

type SupabaseProduct = Database["public"]["Tables"]["products"]["Row"];

// Unified product interface for display
interface DisplayProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image_url: string;
  category: string;
  rating: number;
  isNew: boolean;
  description?: string;
  stock: number;
  created_at: string;
}

// Adapter function to convert Supabase product to display product
const adaptSupabaseProduct = (product: SupabaseProduct): DisplayProduct => ({
  id: product.id,
  name: product.name,
  price: product.price,
  originalPrice: undefined,
  image_url: product.image_url || '',
  category: product.category,
  rating: 5, // Default rating since it's not in Supabase schema
  isNew: false, // Default to false since it's not in Supabase schema
  description: product.description || '',
  stock: product.stock,
  created_at: product.created_at
});

// Adapter function to convert local Product to display product
const adaptLocalProduct = (product: Product): DisplayProduct => ({
  id: product.id.toString(),
  name: product.name,
  price: parseFloat(product.price.replace(/[^\d.-]/g, '')),
  originalPrice: product.originalPrice ? parseFloat(product.originalPrice.replace(/[^\d.-]/g, '')) : undefined,
  image_url: product.image,
  category: product.category,
  rating: product.rating,
  isNew: product.isNew,
  description: product.description || '',
  stock: 10, // Default stock for local products
  created_at: new Date().toISOString()
});

const Shop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { searchQuery, searchResults, isSearching } = useSearch();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("products")
        .select("*");
      if (error) {
        setError("Failed to load products");
        setProducts([]);
      } else {
        const displayProducts = (data || []).map(adaptSupabaseProduct);
        setProducts(displayProducts);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Determine which products to show
  const getDisplayProducts = () => {
    if (isSearching && searchResults.length >= 0) {
      // Convert search results to display products
      return searchResults.map(product => {
        // Check if it's a Supabase product by checking for required Supabase properties
        const hasSupabaseProperties = 
          'stock' in product && 
          'image_url' in product && 
          'created_at' in product &&
          typeof (product as any).created_at === 'string';
        
        if (hasSupabaseProperties) {
          return adaptSupabaseProduct(product as SupabaseProduct);
        }
        
        // Otherwise it's from the local products data
        const localProduct: Product = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          rating: product.rating,
          isNew: product.isNew,
          description: product.description
        };
        return adaptLocalProduct(localProduct);
      });
    }

    if (selectedCategory === "All") {
      return products;
    }

    return products.filter(product => product.category === selectedCategory);
  };

  const displayProducts = getDisplayProducts();

  // Sort products
  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product: DisplayProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url
    });
  };

  const handleLoadMore = () => {
    toast.info("Loading more products...");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading products...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
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
              {isSearching && searchQuery ? `Search Results for "${searchQuery}"` : "Our Collection"}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {isSearching && searchQuery
                ? `Found ${searchResults.length} products matching your search`
                : "Discover our complete range of exquisite jewelry pieces, crafted with precision and designed to last a lifetime."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Category Filters */}
            {!isSearching && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category
                      ? "bg-coral-peach hover:bg-coral-peach/80"
                      : "border-slate-300 hover:border-coral-peach hover:text-coral-peach"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            )}

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-slate-100' : ''}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-slate-100' : ''}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                {isSearching ? "No products found" : "No products available"}
              </h3>
              <p className="text-slate-600 mb-8">
                {isSearching
                  ? `Try searching for something else or browse our full collection.`
                  : "Please check back later for new products."
                }
              </p>
              {isSearching && (
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-coral-peach hover:bg-coral-peach/80"
                >
                  Browse All Products
                </Button>
              )}
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1 max-w-4xl mx-auto'
              }`}>
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer border-slate-200 hover:shadow-lg transition-all duration-300 bg-white"
                  onClick={() => navigate(`/product/${product.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/product/${product.id}`); }}
                >
                  <CardContent className={`p-0 ${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`relative bg-white overflow-hidden ${viewMode === 'list' ? 'w-64 h-64 flex-shrink-0' : 'aspect-square mb-4'
                      }`}>
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-coral-peach text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                          NEW
                        </span>
                      )}
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-coral-peach transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2">{product.category}</p>
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
                            {product.price.toLocaleString()} EGP
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-slate-500 line-through">
                              {product.originalPrice.toLocaleString()} EGP
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-coral-peach hover:bg-coral-peach/80 text-white"
                          onClick={e => { e.stopPropagation(); handleAddToCart(product); }}
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

          {/* Load More */}
          {sortedProducts.length > 0 && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:border-coral-peach hover:text-coral-peach px-8"
                onClick={handleLoadMore}
              >
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
