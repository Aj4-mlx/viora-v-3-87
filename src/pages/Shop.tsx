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

type Product = Database["public"]["Tables"]["products"]["Row"];

const Shop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [collections, setCollections] = useState<{ id: string, name: string }[]>([]);

  const { searchQuery, searchResults, isSearching } = useSearch();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("products")
        .select("*, collection_ids");
      if (error) {
        setError("Failed to load products");
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    const fetchCollections = async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("id, name")
        .order("name");

      if (error) {
        console.error("Failed to load collections:", error);
      } else {
        setCollections(data || []);
      }
    };

    fetchProducts();
    fetchCollections();
  }, []);

  // Determine which products to show
  const getDisplayProducts = () => {
    if (isSearching && searchResults.length >= 0) {
      return searchResults;
    }

    let filteredProducts = products;

    // Filter by category if not "All"
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by collection if one is selected
    if (selectedCollection) {
      filteredProducts = filteredProducts.filter(product =>
        product.collection_ids && product.collection_ids.includes(selectedCollection)
      );
    }

    return filteredProducts;
  };

  const displayProducts = getDisplayProducts();

  // Sort products
  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.price ?? 0) - (b.price ?? 0);
      case 'price-high':
        return (b.price ?? 0) - (a.price ?? 0);
      // 'popular' and 'newest' require extra fields, fallback to name
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || ''
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
            {/* Filters */}
            {!isSearching && (
              <div className="flex flex-col gap-4 w-full md:w-auto">
                {/* Category Filters */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
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
                </div>

                {/* Collection Filters */}
                {collections.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Collections</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedCollection === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCollection(null)}
                        className={selectedCollection === null
                          ? "bg-coral-peach hover:bg-coral-peach/80"
                          : "border-slate-300 hover:border-coral-peach hover:text-coral-peach"
                        }
                      >
                        All
                      </Button>
                      {collections.map((collection) => (
                        <Button
                          key={collection.id}
                          variant={selectedCollection === collection.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCollection(collection.id)}
                          className={selectedCollection === collection.id
                            ? "bg-coral-peach hover:bg-coral-peach/80"
                            : "border-slate-300 hover:border-coral-peach hover:text-coral-peach"
                          }
                        >
                          {collection.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
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
                        src={product.image_url || ''}
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
