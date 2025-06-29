import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, Star, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
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
  const { wishlistCount } = useWishlist();
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
      {/* Top banner - full width */}
      <div className="text-center py-2 text-sm w-full" style={{ backgroundColor: '#f94500', color: '#fff' }}>
        <div className="flex items-center justify-center space-x-2">
          <span>Free shipping on orders over 1,000 EGP</span>
        </div>
      </div>

      <div className="container mx-auto px-6 sm:px-4 mt-2 sm:mt-4">

        {/* Main header */}
        <div className="flex items-center justify-between py-4 sm:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="group block hover:scale-105 transition-transform duration-300">
              <img
                src="/lovable-uploads/ChatGPT Image Jun 29, 2025, 05_52_45 AM.png"
                alt="Viora Luxury Jewelry"
                className="h-17 sm:h-20 w-auto object-contain drop-shadow-lg group-hover:drop-shadow-xl"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-white/90 hover:text-white transition-colors font-medium text-lg font-elegant hover:scale-105 transform duration-200 py-2">
              Shop
            </Link>
            <Link to="/collections" className="text-white/90 hover:text-white transition-colors font-medium text-lg font-elegant hover:scale-105 transform duration-200 py-2">
              Collections
            </Link>
            <Link to="/about" className="text-white/90 hover:text-white transition-colors font-medium text-lg font-elegant hover:scale-105 transform duration-200 py-2">
              About
            </Link>
            <Link to="/contact" className="text-white/90 hover:text-white transition-colors font-medium text-lg font-elegant hover:scale-105 transform duration-200 py-2">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
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
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="text-white hover:text-floral-cream hover:bg-white/10 transition-all duration-300 min-h-[44px] min-w-[44px] p-2 relative">
                <Star className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-floral-deep-rose text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="outline" size="sm" className="bg-floral-deep-violet border-floral-deep-violet text-white hover:bg-floral-violet hover:border-floral-violet hover:text-white relative transition-all duration-300 text-sm min-h-[44px] px-3 sm:px-4">
                <ShoppingCart className="w-5 h-5 mr-1" /> 
                <span className="hidden sm:inline">Cart</span>
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
                    className="border-white/30 text-white hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-colors hidden sm:inline-flex min-h-[44px]"
                  >
                    Account
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-colors hidden sm:inline-flex min-h-[44px]"
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
                  className="bg-floral-deep-violet border-floral-deep-violet text-white hover:bg-floral-violet hover:border-floral-violet hover:text-white backdrop-blur-sm transition-colors hidden sm:inline-flex min-h-[44px]"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-white/10 min-h-[48px] min-w-[48px] p-3 relative z-50 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-white/50 mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-6 bg-white/10 backdrop-blur-md rounded-lg mb-4 relative z-40 mobile-menu-dropdown">
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
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant py-3 px-4 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/collections"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant py-3 px-4 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant py-3 px-4 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant py-3 px-4 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant py-3 px-4 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({cartCount})
              </Link>
              <Link
                to="/wishlist"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant py-3 px-4 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist ({wishlistCount})
              </Link>
              <Link
                to="/account"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant py-3 px-4 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
              <Link
                to="/sign-in"
                className="text-white hover:text-floral-cream transition-colors font-medium font-elegant py-3 px-4 rounded-lg hover:bg-white/10 min-h-[48px] flex items-center mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              {isSignedIn && (
                <button
                  className="text-floral-coral text-left py-3 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium font-elegant min-h-[48px] flex items-center mobile-menu-item"
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
