
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const Footer = () => {
  const { toast } = useToast();

  const handleSocialClick = (platform: string) => {
    toast({
      title: `${platform} clicked`,
      description: `This would normally open ${platform} in a new tab.`,
    });
  };

  const handleComingSoon = (feature: string) => {
    toast({
      title: "Coming Soon",
      description: `${feature} page is under development.`,
    });
  };

  return (
    <footer className="bg-gradient-to-br from-floral-lavender/30 via-floral-blush/20 to-floral-peach/30 border-t border-floral-violet/20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-floral-violet/5 to-floral-deep-violet/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-floral-peach/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-display font-bold text-floral-deep-violet mb-2">
                VIORA
              </h3>
              <span className="text-xs font-elegant text-floral-violet tracking-[0.2em]">
                LUXURY JEWELRY
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed font-elegant">
              Timeless jewelry crafted with passion and precision for life's 
              most treasured moments. Where floral beauty meets eternal elegance.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick("Facebook")}
                className="w-10 h-10 bg-floral-violet/10 hover:bg-floral-violet text-floral-violet hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick("Instagram")}
                className="w-10 h-10 bg-floral-violet/10 hover:bg-floral-violet text-floral-violet hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick("YouTube")}
                className="w-10 h-10 bg-floral-violet/10 hover:bg-floral-violet text-floral-violet hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-floral-deep-violet mb-6 text-lg">Shop</h4>
            <ul className="space-y-3 text-gray-700 font-elegant">
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-display font-semibold text-floral-deep-violet mb-6 text-lg">Customer Care</h4>
            <ul className="space-y-3 text-gray-700 font-elegant">
              <li>
                <Link to="/size-guide" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping-info" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/care-instructions" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display font-semibold text-floral-deep-violet mb-6 text-lg">About Viora</h4>
            <ul className="space-y-3 text-gray-700 font-elegant">
              <li>
                <Link to="/about" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Our Story
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoon("Craftsmanship")}
                  className="hover:text-floral-violet transition-colors text-left hover:translate-x-1 transform duration-200 inline-block"
                >
                  Craftsmanship
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoon("Sustainability")}
                  className="hover:text-floral-violet transition-colors text-left hover:translate-x-1 transform duration-200 inline-block"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoon("Press")}
                  className="hover:text-floral-violet transition-colors text-left hover:translate-x-1 transform duration-200 inline-block"
                >
                  Press
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoon("Careers")}
                  className="hover:text-floral-violet transition-colors text-left hover:translate-x-1 transform duration-200 inline-block"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-floral-violet/20 mt-12 pt-8 text-center">
          <p className="text-gray-600 font-elegant">
            © 2024 Viora Jewelry. All rights reserved. | 
            <button 
              onClick={() => handleComingSoon("Privacy Policy")}
              className="hover:text-floral-violet transition-colors ml-1"
            >
              Privacy Policy
            </button> | 
            <button 
              onClick={() => handleComingSoon("Terms of Service")}
              className="hover:text-floral-violet transition-colors ml-1"
            >
              Terms of Service
            </button>
          </p>
          <div className="mt-4 text-sm text-floral-violet font-elegant">
            ✨ Where floral dreams meet timeless elegance ✨
          </div>
        </div>
      </div>
    </footer>
  );
};
