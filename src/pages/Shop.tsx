
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Filter, Grid3X3, List } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Shop = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  const products = [
    {
      id: 1,
      name: "Celestial Diamond Ring",
      price: "24,500 EGP",
      originalPrice: null,
      image: "/placeholder.svg",
      category: "Rings",
      rating: 5,
      isNew: true
    },
    {
      id: 2,
      name: "Vintage Pearl Necklace",
      price: "12,000 EGP",
      originalPrice: "15,000 EGP",
      image: "/placeholder.svg",
      category: "Necklaces",
      rating: 5,
      isNew: false
    },
    {
      id: 3,
      name: "Rose Gold Bracelet",
      price: "8,900 EGP",
      originalPrice: null,
      image: "/placeholder.svg",
      category: "Bracelets",
      rating: 4,
      isNew: true
    },
    {
      id: 4,
      name: "Sapphire Drop Earrings",
      price: "16,500 EGP",
      originalPrice: null,
      image: "/placeholder.svg",
      category: "Earrings",
      rating: 5,
      isNew: false
    },
    {
      id: 5,
      name: "Classic Gold Chain",
      price: "19,800 EGP",
      originalPrice: null,
      image: "/placeholder.svg",
      category: "Necklaces",
      rating: 4,
      isNew: false
    },
    {
      id: 6,
      name: "Emerald Statement Ring",
      price: "32,000 EGP",
      originalPrice: null,
      image: "/placeholder.svg",
      category: "Rings",
      rating: 5,
      isNew: true
    }
  ];

  const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-coral-peach/10 to-pale-peach/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Our Collection
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover our complete range of exquisite jewelry pieces, 
              crafted with precision and designed to last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Category Filters */}
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
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer border-slate-200 hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className={`p-0 ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className={`relative bg-white overflow-hidden ${
                    viewMode === 'list' ? 'w-64 h-64 flex-shrink-0' : 'aspect-square mb-4'
                  }`}>
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
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              size="lg"
              variant="outline"
              className="border-slate-300 text-slate-700 hover:border-coral-peach hover:text-coral-peach px-8"
            >
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
