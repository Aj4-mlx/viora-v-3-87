import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    governorate: ""
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [guestPassword, setGuestPassword] = useState("");
  const [pendingOrder, setPendingOrder] = useState<any>(null);

  const governorates = [
    "Cairo", "Alexandria", "Giza", "Qalyubia", "Port Said", "Suez",
    "Luxor", "Aswan", "Asyut", "Beheira", "Beni Suef", "Dakahlia",
    "Damietta", "Fayyum", "Gharbia", "Ismailia", "Kafr el-Sheikh",
    "Matrouh", "Minya", "Monufia", "New Valley", "North Sinai",
    "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai"
  ];

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const validateEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

  // Egyptian phone: starts with 01, 11 digits total
  const validatePhone = (phone: string) => {
    return /^01[0-9]{9}$/.test(phone);
  };

  const handleCheckout = async () => {
    // Validate fields
    if (!customerInfo.name.trim()) {
      toast.error('Please enter your full name.');
      return;
    }
    if (!customerInfo.email.trim()) {
      toast.error('Please enter your email.');
      return;
    }
    if (!validateEmail(customerInfo.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!customerInfo.phone.trim()) {
      toast.error('Please enter your phone number.');
      return;
    }
    if (!validatePhone(customerInfo.phone)) {
      toast.error('Please enter a valid Egyptian phone number (e.g. 01XXXXXXXXX).');
      return;
    }
    if (!customerInfo.governorate.trim()) {
      toast.error('Please select your governorate.');
      return;
    }
    if (!customerInfo.city.trim()) {
      toast.error('Please enter your city.');
      return;
    }
    if (!customerInfo.address.trim()) {
      toast.error('Please enter your full address.');
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const user = localStorage.getItem('user');
    if (!user) {
      // Not signed in: prompt for password, then create account and proceed
      setPendingOrder({
        customerInfo: { ...customerInfo },
        cartItems: [...cartItems],
        total,
        paymentMethod
      });
      setShowPasswordModal(true);
      return;
    }

    if (paymentMethod === "cod") {
      setIsLoading(true);
      const user = JSON.parse(localStorage.getItem('user')!);
      // Prepare order data
      const orderData = {
        customer_id: user.id,
        product_ids: cartItems.map(item => item.id),
        total: total,
        status: "pending",
        // Store delivery info as JSON string in a note field (or add a JSONB field in DB for production)
        note: JSON.stringify({
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address,
          city: customerInfo.city,
          governorate: customerInfo.governorate,
          paymentMethod: "Cash on Delivery"
        })
      };
      const { data, error } = await supabase.from('orders').insert(orderData).select().single();
      setIsLoading(false);
      if (error || !data) {
        toast.error("Failed to place order. Please try again.");
        return;
      }
      // TODO: Send email notification to user with order details
      clearCart();
      navigate(`/order-confirmation/${data.id}`);
    } else {
      // For card payments, integrate with payment gateway
      toast.info("Redirecting to payment gateway...");
      // Here you would integrate with Stripe, PayMob, or other payment providers
    }
  };

  const handleGuestAccountAndOrder = async () => {
    setIsLoading(true);
    // Check if email already exists
    const { data: existing } = await supabase
      .from('customers')
      .select('id')
      .eq('email', pendingOrder.customerInfo.email)
      .single();
    if (existing) {
      toast.error("An account with this email already exists. Please sign in.");
      setIsLoading(false);
      setShowPasswordModal(false);
      navigate('/sign-in?reason=auth-required');
      return;
    }
    // Create new customer
    const { data: newCustomer, error } = await supabase
      .from('customers')
      .insert({
        email: pendingOrder.customerInfo.email,
        name: pendingOrder.customerInfo.name,
      })
      .select()
      .single();
    if (error || !newCustomer) {
      toast.error("Failed to create account. Please try again.");
      setIsLoading(false);
      return;
    }
    // Store user info in localStorage (simulate login)
    localStorage.setItem('user', JSON.stringify({
      id: newCustomer.id,
      email: newCustomer.email,
      name: newCustomer.name,
      phone: pendingOrder.customerInfo.phone,
      password: guestPassword, // For demo only
    }));
    setShowPasswordModal(false);
    setIsLoading(false);
    setGuestPassword("");
    // Proceed with order as signed in user
    await handleCheckout();
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 50; // Free shipping over 5000 EGP
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-slate-600 mb-8">Add some beautiful jewelry to get started!</p>
            <Button
              onClick={() => window.location.href = '/shop'}
              className="bg-coral-peach hover:bg-coral-peach/80"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{item.name}</h3>
                        <p className="text-slate-600">{item.price.toLocaleString()} EGP</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="governorate">Governorate *</Label>
                    <Select
                      value={customerInfo.governorate}
                      onValueChange={(value) => setCustomerInfo({ ...customerInfo, governorate: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select governorate" />
                      </SelectTrigger>
                      <SelectContent>
                        {governorates.map((gov) => (
                          <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    placeholder="Enter your full address"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Payment */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{subtotal.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `${shipping} EGP`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>{total.toFixed(2)} EGP</span>
                </div>

                {/* Payment Method */}
                <div className="mt-6">
                  <Label className="text-base font-semibold">Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button
                  className="w-full bg-coral-peach hover:bg-coral-peach/80 mt-6"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? 'Placing Order...' : (paymentMethod === 'cod' ? 'Place Order (COD)' : 'Proceed to Payment')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an Account to Complete Your Order</DialogTitle>
          </DialogHeader>
          <div className="mb-2">Please set a password for your new account. You will use this to sign in and track your orders.</div>
          <Input
            type="password"
            placeholder="Create password"
            value={guestPassword}
            onChange={e => setGuestPassword(e.target.value)}
            disabled={isLoading}
          />
          <Button
            className="w-full mt-4 bg-coral-peach hover:bg-coral-peach/80"
            onClick={handleGuestAccountAndOrder}
            disabled={isLoading || guestPassword.length < 6}
          >
            {isLoading ? 'Creating Account...' : 'Create Account & Continue'}
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Cart;
