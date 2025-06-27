
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
    <footer className="bg-pastel-purple border-t border-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img 
              src="/lovable-uploads/bdeee921-691c-475f-bbef-ce45c0eecd46.png" 
              alt="VIORA" 
              className="h-10 w-auto mb-4"
            />
            <p className="text-slate-600 mb-4">
              Timeless jewelry crafted with passion and precision for life's 
              most treasured moments.
            </p>
            <div className="flex space-x-4">
              <Facebook 
                className="w-5 h-5 text-slate-600 hover:text-rust cursor-pointer transition-colors" 
                onClick={() => handleSocialClick("Facebook")}
              />
              <Instagram 
                className="w-5 h-5 text-slate-600 hover:text-rust cursor-pointer transition-colors" 
                onClick={() => handleSocialClick("Instagram")}
              />
              <Youtube 
                className="w-5 h-5 text-slate-600 hover:text-rust cursor-pointer transition-colors" 
                onClick={() => handleSocialClick("YouTube")}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-puce-red mb-4">Shop</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/shop" className="hover:text-rust transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-rust transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-rust transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-rust transition-colors">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-rust transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-puce-red mb-4">Customer Care</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/size-guide" className="hover:text-rust transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping-info" className="hover:text-rust transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-rust transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/care-instructions" className="hover:text-rust transition-colors">
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-rust transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-puce-red mb-4">About Viora</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/about" className="hover:text-rust transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoon("Craftsmanship")}
                  className="hover:text-rust transition-colors text-left"
                >
                  Craftsmanship
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoon("Sustainability")}
                  className="hover:text-rust transition-colors text-left"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoon("Press")}
                  className="hover:text-rust transition-colors text-left"
                >
                  Press
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleComingSoon("Careers")}
                  className="hover:text-rust transition-colors text-left"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-slate-600">
            © 2024 Viora Jewelry. All rights reserved. | 
            <button 
              onClick={() => handleComingSoon("Privacy Policy")}
              className="hover:text-rust transition-colors ml-1"
            >
              Privacy Policy
            </button> | 
            <button 
              onClick={() => handleComingSoon("Terms of Service")}
              className="hover:text-rust transition-colors ml-1"
            >
              Terms of Service
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};
