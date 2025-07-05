
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSearch } from "@/contexts/SearchContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, signOut } = useAuth();
  const { searchQuery, setSearchQuery, isSearchVisible, setIsSearchVisible } = useSearch();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/shop');
      setIsSearchVisible(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/Viora_Logo_Transparent.png" 
              alt="VIORA" 
              className="h-8 w-auto"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                // Fallback to text logo if image fails to load
                const textFallback = document.createElement('span');
                textFallback.className = 'text-2xl font-bold text-floral-violet';
                textFallback.textContent = 'VIORA';
                img.parentNode?.appendChild(textFallback);
              }}
            />
            <span className="text-2xl font-bold text-floral-violet">VIORA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-floral-violet transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-slate-700 hover:text-floral-violet transition-colors">
              Shop
            </Link>
            <Link to="/collections" className="text-slate-700 hover:text-floral-violet transition-colors">
              Collections
            </Link>
            <Link to="/about" className="text-slate-700 hover:text-floral-violet transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-slate-700 hover:text-floral-violet transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="text-slate-700 hover:text-floral-violet"
            >
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/account">
                  <Button variant="ghost" size="icon" className="text-slate-700 hover:text-floral-violet">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="text-slate-700 hover:text-floral-violet text-sm"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/sign-in">
                <Button variant="ghost" size="icon" className="text-slate-700 hover:text-floral-violet">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="icon" className="text-slate-700 hover:text-floral-violet">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-floral-violet text-white">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-slate-700 hover:text-floral-violet">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-floral-violet text-white">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchVisible && (
          <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full text-slate-500 hover:text-floral-violet"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 mobile-menu-dropdown">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="mobile-menu-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="mobile-menu-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/collections" 
                className="mobile-menu-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                to="/about" 
                className="mobile-menu-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="mobile-menu-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              <div className="border-t pt-2 mt-2">
                {user ? (
                  <>
                    <Link 
                      to="/account" 
                      className="mobile-menu-item"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Account
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="mobile-menu-item w-full text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/sign-in" 
                    className="mobile-menu-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
                <Link 
                  to="/wishlist" 
                  className="mobile-menu-item flex items-center justify-between"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Wishlist</span>
                  {wishlistItems.length > 0 && (
                    <Badge className="bg-floral-violet text-white">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Link>
                <Link 
                  to="/cart" 
                  className="mobile-menu-item flex items-center justify-between"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <Badge className="bg-floral-violet text-white">
                      {totalItems}
                    </Badge>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
