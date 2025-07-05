
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CartItems } from "@/components/cart/CartItems";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-floral-cream via-floral-blush/30 to-floral-lavender/20">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-floral-violet/20 to-floral-peach/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-6xl">🛍️</span>
              </div>
              <h1 className="text-4xl font-display font-bold text-floral-deep-violet mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-xl text-gray-700 mb-8 font-elegant">
                Add some beautiful jewelry pieces to get started on your floral journey!
              </p>
              <Button
                onClick={() => window.location.href = '/shop'}
                className="bg-floral-violet hover:bg-floral-deep-violet text-white font-elegant px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-floral-cream via-floral-blush/30 to-floral-lavender/20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-floral-deep-violet mb-4">
            Shopping Cart
          </h1>
          <p className="text-lg text-gray-700 font-elegant">
            Review your beautiful selections
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div>
            <CheckoutForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
