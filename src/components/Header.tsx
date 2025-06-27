
import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Star, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type SupabaseProduct = Database["public"]["Tables"]["products"]["Row"];

// Adapter function to convert Supabase product to search result
const adaptProductForSearch = (product: SupabaseProduct) => ({
  id: parseInt(product.id),
  name: product.name,
  price: `${product.price} EGP`,
  image: product.image_url || '',
  category: product.category,
  rating: 5, // Default rating
  isNew: true, // Default to new
  description: product.description || ''
});

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery, setSearchResults, setIsSearching } = useSearch();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      setIsSignedIn(!!user);
    }
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });
    return () => { listener.subscription.unsubscribe(); };
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
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${query}%`);

      // Convert Supabase products to search result format
      const adaptedProducts = (data || []).map(adaptProductForSearch);
      setSearchResults(adaptedProducts);
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsSignedIn(false);
    setShowAccountMenu(false);
    navigate('/');
  };

  return (
    <header className="bg-black shadow-lg border-b border-white/20 relative">
      <div className="container mx-auto px-4">
        {/* Top banner */}
        <div className="bg-floral-deep-violet text-white text-center py-2 text-sm -mx-4 mb-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="animate-pulse">✨</span>
            <span>Free shipping on orders over 1,000 EGP</span>
            <span className="animate-pulse">✨</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="group">
              <h1 className="text-4xl font-display font-bold text-white tracking-wider hover:scale-105 transition-transform duration-300 drop-shadow-lg group-hover:drop-shadow-xl">
                VIORA
                <span className="block text-xs font-normal text-white/80 tracking-[0.2em] mt-1">
                  LUXURY JEWELRY
                </span>
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-white/90 hover:text-white transition-colors font-medium text-lg font-elegant hover:scale-105 transform duration-200">
              Shop
            </Link>
            <Link to="/collections" className="text-white/90 hover:text-white transition-colors font-medium text-lg font-elegant hover:scale-105 transform duration-200">
              Collections
            </Link>
            <Link to="/about" className="text-white/90 hover:text-white transition-colors font-medium text-lg font-elegant hover:scale-105 transform duration-200">
              About
            </Link>
            <Link to="/contact" className="text-white/90 hover:text-white transition-colors font-medium text-lg font-elegant hover:scale-105 transform duration-200">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-4 h-4" />
              <Input
                placeholder="Search jewelry..."
                className="pl-10 w-64 glass-effect border-white/30 focus:border-floral-violet placeholder:text-gray-600 text-black"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </form>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="text-white hover:text-floral-cream hover:bg-white/10 transition-all duration-300">
              <Star className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="text-white hover:text-floral-cream hover:bg-white/10 relative transition-all duration-300">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-floral-deep-rose text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Account and Sign Out (desktop) */}
            {isSignedIn && (
              <>
                <Link to="/account">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 text-white hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-colors"
                  >
                    Account
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-colors"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            )}
            {/* Sign In (desktop, only if not signed in) */}
            {!isSignedIn && (
              <Link to="/sign-in">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-colors"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 bg-white/10 backdrop-blur-md rounded-lg mb-4">
            <nav className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-4 h-4" />
                <Input
                  placeholder="Search jewelry..."
                  className="pl-10 glass-effect border-white/30 focus:border-floral-violet placeholder:text-gray-600 text-black"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </form>

              <Link
                to="/shop"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/collections"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({cartCount})
              </Link>
              <Link
                to="/account"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
              <Link
                to="/sign-in"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              {isSignedIn && (
                <button
                  className="text-floral-coral text-left px-4 py-2 hover:bg-white/10 rounded transition-colors font-medium font-elegant"
                  onClick={() => { setIsMenuOpen(false); handleSignOut(); }}
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Decorative floral accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-floral-deep-rose/20 to-transparent rounded-full blur-lg"></div>
    </header>
  );
};
