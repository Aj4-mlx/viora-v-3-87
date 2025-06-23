
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      name: "Eternal Sparkle",
      description: "Diamond rings that capture forever",
      image: "/placeholder.svg",
      itemCount: 24
    },
    {
      id: 2,
      name: "Golden Grace",
      description: "Luxurious gold necklaces",
      image: "/placeholder.svg",
      itemCount: 18
    },
    {
      id: 3,
      name: "Pearl Perfection",
      description: "Classic pearl earrings",
      image: "/placeholder.svg",
      itemCount: 12
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore our signature collections, each telling a unique story 
            of craftsmanship and beauty.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Card key={collection.id} className="group cursor-pointer border-slate-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-square bg-slate-100 mb-4 overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      {collection.itemCount} pieces
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white"
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
