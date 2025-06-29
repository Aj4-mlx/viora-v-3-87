import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const FeaturedCollections = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const collections = [
    {
      id: 1,
      name: "Eternal Sparkle",
      description: "Diamond rings that capture forever",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
      itemCount: 24
    },
    {
      id: 2,
      name: "Golden Grace",
      description: "Luxurious gold necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80",
      itemCount: 18
    },
    {
      id: 3,
      name: "Pearl Perfection",
      description: "Classic pearl earrings",
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      itemCount: 12
    }
  ];

  const handleExploreCollection = (collectionName: string) => {
    toast({
      title: `Exploring ${collectionName}`,
      description: "Redirecting to collection page...",
    });
    navigate('/collections');
  };

  return (
    <section className="py-16 sm:py-20 bg-cream-beige">
      <div className="container mx-auto px-6 sm:px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-4 sm:mb-6">
            Featured Collections
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore our signature collections, each telling a unique story 
            of craftsmanship and beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {collections.map((collection) => (
            <Card key={collection.id} className="group cursor-pointer border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square bg-slate-100 overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-semibold text-slate-900 mb-3 sm:mb-4">
                    {collection.name}
                  </h3>
                  <p className="text-slate-600 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-slate-500 font-medium">
                      {collection.itemCount} pieces
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-coral-peach text-coral-peach hover:bg-coral-peach hover:text-white min-h-[48px] px-4 sm:px-6 text-sm sm:text-base font-medium"
                      onClick={() => handleExploreCollection(collection.name)}
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
