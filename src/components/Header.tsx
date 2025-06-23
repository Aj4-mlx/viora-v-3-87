import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Star, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery, setSearchResults, setIsSearching } = useSearch();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSignedIn(!!localStorage.getItem('user'));
    window.addEventListener('storage', () => setIsSignedIn(!!localStorage.getItem('user')));
    return () => window.removeEventListener('storage', () => setIsSignedIn(!!localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setShowAccountMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      // Search products in Supabase
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${query}%`);
      setSearchResults(data || []);
      // Navigate to shop with search results
      navigate('/shop');
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await handleSearch(searchQuery);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setIsSignedIn(false);
    setShowAccountMenu(false);
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Top banner */}
        <div className="bg-slate-900 text-white text-center py-2 text-sm -mx-4 mb-4">
          Free shipping on orders over 5,000 EGP • Complimentary gift wrapping
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-wide hover:text-coral-peach transition-colors">
                VIORA
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-slate-700 hover:text-coral-peach transition-colors font-medium">
              Shop
            </Link>
            <Link to="/collections" className="text-slate-700 hover:text-coral-peach transition-colors font-medium">
              Collections
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-coral-peach transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-slate-700 hover:text-coral-peach transition-colors font-medium">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search jewelry..."
                className="pl-10 w-64 border-slate-200 focus:border-coral-peach"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </form>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="text-slate-700 hover:text-coral-peach">
              <Star className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="text-slate-700 hover:text-coral-peach relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral-peach text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Account and Sign Out (desktop) */}
            {isSignedIn && (
              <>
                <Link to="/account">
                  <Button variant="outline" size="sm" className="border-slate-200 hover:border-coral-peach hover:text-coral-peach">
                    Account
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 hover:border-coral-peach hover:text-coral-peach"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            )}
            {/* Sign In (desktop, only if not signed in) */}
            {!isSignedIn && (
              <Link to="/sign-in">
                <Button variant="outline" size="sm" className="border-slate-200 hover:border-coral-peach hover:text-coral-peach">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-slate-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4">
            <nav className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search jewelry..."
                  className="pl-10 border-slate-200 focus:border-coral-peach"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </form>

              <Link
                to="/shop"
                className="text-slate-700 hover:text-coral-peach transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/collections"
                className="text-slate-700 hover:text-coral-peach transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/about"
                className="text-slate-700 hover:text-coral-peach transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-slate-700 hover:text-coral-peach transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="text-slate-700 hover:text-coral-peach transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({cartCount})
              </Link>
              <Link
                to="/account"
                className="text-slate-700 hover:text-coral-peach transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
              <Link
                to="/sign-in"
                className="text-slate-700 hover:text-coral-peach transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              {isSignedIn && (
                <button
                  className="text-red-600 text-left px-4 py-2 hover:bg-slate-100 rounded transition-colors font-medium"
                  onClick={() => { setIsMenuOpen(false); handleSignOut(); }}
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
