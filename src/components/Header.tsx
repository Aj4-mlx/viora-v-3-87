
import { useState } from "react";
import { Search, ShoppingCart, Star, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Top banner */}
        <div className="bg-slate-900 text-white text-center py-2 text-sm -mx-4 mb-4">
          Free shipping on orders over $500 • Complimentary gift wrapping
        </div>
        
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-wide">
              VIORA
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-700 hover:text-yellow-600 transition-colors font-medium">
              Rings
            </a>
            <a href="#" className="text-slate-700 hover:text-yellow-600 transition-colors font-medium">
              Necklaces
            </a>
            <a href="#" className="text-slate-700 hover:text-yellow-600 transition-colors font-medium">
              Earrings
            </a>
            <a href="#" className="text-slate-700 hover:text-yellow-600 transition-colors font-medium">
              Bracelets
            </a>
            <a href="#" className="text-slate-700 hover:text-yellow-600 transition-colors font-medium">
              Collections
            </a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search jewelry..." 
                className="pl-10 w-64 border-slate-200 focus:border-yellow-500"
              />
            </div>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="text-slate-700 hover:text-yellow-600">
              <Star className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="text-slate-700 hover:text-yellow-600 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Account */}
            <Button variant="outline" size="sm" className="border-slate-200 hover:border-yellow-500">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
