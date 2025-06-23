
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Collections = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const collections = [
    {
      id: 1,
      name: "Wedding Collection",
      description: "Elegant pieces for your special day",
      image: "/placeholder.svg",
      itemCount: 42,
      theme: "Timeless elegance for matrimonial moments",
      items: [
        { name: "Diamond Engagement Ring", type: "Ring", price: "45,000 EGP", rating: 5 },
        { name: "Pearl Wedding Necklace", type: "Necklace", price: "18,500 EGP", rating: 5 },
        { name: "Bridal Tennis Bracelet", type: "Bracelet", price: "22,000 EGP", rating: 5 },
        { name: "Wedding Band Set", type: "Ring", price: "28,000 EGP", rating: 5 }
      ]
    },
    {
      id: 2,
      name: "Summer Collection",
      description: "Light and vibrant pieces for sunny days",
      image: "/placeholder.svg",
      itemCount: 36,
      theme: "Bright and breezy jewelry for warm weather",
      items: [
        { name: "Coral Reef Necklace", type: "Necklace", price: "12,500 EGP", rating: 4 },
        { name: "Sunshine Ring", type: "Ring", price: "8,900 EGP", rating: 5 },
        { name: "Ocean Wave Bracelet", type: "Bracelet", price: "6,800 EGP", rating: 4 },
        { name: "Tropical Earrings", type: "Earrings", price: "5,200 EGP", rating: 5 }
      ]
    },
    {
      id: 3,
      name: "Vintage Collection",
      description: "Classic designs with timeless appeal",
      image: "/placeholder.svg",
      itemCount: 28,
      theme: "Nostalgic pieces inspired by bygone eras",
      items: [
        { name: "Art Deco Ring", type: "Ring", price: "35,000 EGP", rating: 5 },
        { name: "Victorian Pendant", type: "Necklace", price: "24,000 EGP", rating: 4 },
        { name: "Antique Charm Bracelet", type: "Bracelet", price: "16,500 EGP", rating: 5 },
        { name: "Vintage Pearl Earrings", type: "Earrings", price: "12,800 EGP", rating: 4 }
      ]
    },
    {
      id: 4,
      name: "Modern Minimalist",
      description: "Clean lines and contemporary designs",
      image: "/placeholder.svg",
      itemCount: 32,
      theme: "Simple elegance for the modern woman",
      items: [
        { name: "Geometric Ring", type: "Ring", price: "14,500 EGP", rating: 4 },
        { name: "Minimalist Chain", type: "Necklace", price: "9,800 EGP", rating: 5 },
        { name: "Sleek Bangle", type: "Bracelet", price: "7,200 EGP", rating: 4 },
        { name: "Modern Studs", type: "Earrings", price: "4,500 EGP", rating: 5 }
      ]
    }
  ];

  const [selectedCollection, setSelectedCollection] = useState(collections[0]);

  const handleViewAllInShop = () => {
    toast({
      title: "Redirecting to Shop",
      description: `Viewing all ${selectedCollection.name} items in shop...`,
    });
    navigate('/shop');
  };

  const handleAddToCart = (itemName: string) => {
    toast({
      title: "Added to Cart",
      description: `${itemName} has been added to your cart.`,
    });
  };

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
              {selectedCollection.itemCount} unique pieces
            </p>
          </div>

          {/* Collection Hero Image */}
          <div className="mb-12">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-6">
              <img 
                src={selectedCollection.image} 
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {selectedCollection.items.map((item, index) => (
                <Card key={index} className="group cursor-pointer border-slate-200 hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-slate-100 mb-4 overflow-hidden relative">
                      <img 
                        src="/placeholder.svg" 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-coral-peach text-white text-xs px-2 py-1 rounded-full font-medium">
                        {item.type}
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
                            className={`w-4 h-4 ${i < item.rating ? 'text-muted-mustard fill-current' : 'text-slate-300'}`} 
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-slate-900">
                          {item.price}
                        </span>
                        <Button 
                          size="sm"
                          className="bg-coral-peach hover:bg-coral-peach/80 text-white"
                          onClick={() => handleAddToCart(item.name)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Collection Story */}
          <div className="bg-white p-8 rounded-lg border border-slate-200">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
              About {selectedCollection.name}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {selectedCollection.description}. Each piece in this collection has been carefully 
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
