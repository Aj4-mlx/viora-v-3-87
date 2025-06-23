
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Newsletter = () => {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Stay Connected with Viora
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Be the first to discover new collections, exclusive offers, 
            and jewelry care tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email address"
              className="bg-white text-slate-900 border-white flex-1"
            />
            <Button 
              className="bg-coral-peach hover:bg-coral-peach/80 text-white px-6"
            >
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-slate-400 mt-4">
            No spam, unsubscribe at any time. Privacy policy applies.
          </p>
        </div>
      </div>
    </section>
  );
};
