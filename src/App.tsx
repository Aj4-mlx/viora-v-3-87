import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "@/contexts/SearchContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import SizeGuide from "./pages/SizeGuide";
import ShippingInfo from "./pages/ShippingInfo";
import Returns from "./pages/Returns";
import CareInstructions from "./pages/CareInstructions";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Account from "./pages/Account";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import ResetPassword from "./pages/ResetPassword";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if (window.location.hash.includes('type=recovery')) {
      window.location.replace('/reset-password' + window.location.hash);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <SearchProvider>
              <WishlistProvider>
                <CartProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/sign-in" element={<SignIn />} />
                      <Route path="/sign-up" element={<SignUp />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/size-guide" element={<SizeGuide />} />
                      <Route path="/shipping-info" element={<ShippingInfo />} />
                      <Route path="/returns" element={<Returns />} />
                      <Route path="/care-instructions" element={<CareInstructions />} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                      <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                      <Route path="/order-tracking" element={<OrderTracking />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                </CartProvider>
              </WishlistProvider>
            </SearchProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
