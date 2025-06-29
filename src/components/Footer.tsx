import { Facebook, Instagram, MessageCircle } from "lucide-react";
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
      
      <div className="container mx-auto px-6 sm:px-4 py-8 sm:py-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-3">
            <div>
              <img 
                src="/lovable-uploads/ChatGPT Image Jun 29, 2025, 05_52_45 AM.png" 
                alt="Viora Logo" 
                className="w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52 h-auto mx-auto sm:mx-0 mb-1"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <span className="text-sm font-elegant text-floral-violet tracking-[0.1em] leading-none block text-center sm:text-left">
                LUXURY JEWELRY
              </span>
            </div>
            <p className="text-gray-700 leading-tight font-elegant text-base tracking-tight">
              Timeless jewelry crafted with passion and precision for life's 
              most treasured moments. Where floral beauty meets eternal elegance.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3">
              <button
                onClick={() => handleSocialClick("Facebook")}
                className="w-10 h-10 sm:w-9 sm:h-9 bg-floral-violet/10 hover:bg-floral-violet text-floral-violet hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
              <a
                href="https://www.instagram.com/viora.aj4?igsh=MXUyY210NXAyMTd2bA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 bg-floral-violet/10 hover:bg-floral-violet text-floral-violet hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 sm:w-4 sm:h-4" />
              </a>
              <button
                onClick={() => handleSocialClick("WhatsApp")}
                className="w-10 h-10 sm:w-9 sm:h-9 bg-floral-violet/10 hover:bg-floral-violet text-floral-violet hover:text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-floral-deep-violet mb-3 sm:mb-3 text-base sm:text-base tracking-tight leading-none">Shop</h4>
            <ul className="space-y-4 sm:space-y-4 text-gray-700 font-elegant text-sm tracking-tight leading-tight">
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Bracelets
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-display font-semibold text-floral-deep-violet mb-3 sm:mb-3 text-base sm:text-base tracking-tight leading-none">Customer Care</h4>
            <ul className="space-y-4 sm:space-y-4 text-gray-700 font-elegant text-sm tracking-tight leading-tight">
              <li>
                <Link to="/size-guide" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping-info" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/care-instructions" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Care Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-display font-semibold text-floral-deep-violet mb-3 sm:mb-3 text-base sm:text-base tracking-tight leading-none">About Viora</h4>
            <ul className="space-y-4 sm:space-y-4 text-gray-700 font-elegant text-sm tracking-tight leading-tight">
              <li>
                <Link to="/about" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-floral-violet transition-colors hover:translate-x-1 transform duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-floral-violet/20 mt-6 sm:mt-6 pt-4 sm:pt-4 text-center">
          <p className="text-gray-600 font-elegant text-sm tracking-tight leading-tight">
            © 2024 Viora Jewelry. All rights reserved. | 
            <button 
              onClick={() => handleComingSoon("Privacy Policy")}
              className="hover:text-floral-violet transition-colors ml-1 py-0.5"
            >
              Privacy Policy
            </button> | 
            <button 
              onClick={() => handleComingSoon("Terms of Service")}
              className="hover:text-floral-violet transition-colors ml-1 py-0.5"
            >
              Terms of Service
            </button>
          </p>
          <div className="mt-2 text-xs text-floral-violet font-elegant tracking-tight leading-none">
            Where floral dreams meet timeless elegance
          </div>
        </div>
      </div>
    </footer>
  );
};
