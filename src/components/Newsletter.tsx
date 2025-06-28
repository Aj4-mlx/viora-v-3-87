import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter. You'll receive our latest updates and exclusive offers.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4">
            Stay Connected with Viora
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8">
            Be the first to discover new collections, exclusive offers, 
            and jewelry care tips delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
            <Input 
              type="email"
              placeholder="Enter your email address"
              className="bg-white text-slate-900 border-white flex-1 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <Button 
              type="submit"
              className="bg-coral-peach hover:bg-coral-peach/80 text-white px-4 sm:px-6 py-3 text-base"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-xs sm:text-sm text-slate-400 mt-3 sm:mt-4">
            No spam, unsubscribe at any time. Privacy policy applies.
          </p>
        </div>
      </div>
    </section>
  );
};
