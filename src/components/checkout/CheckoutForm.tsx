
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  governorate: string;
}

interface ShippingProvider {
  id: string;
  name: string;
  base_rate: number;
  free_shipping_threshold: number;
}

interface ShippingRate {
  id: string;
  governorate: string;
  rate: number;
  free_shipping_threshold: number;
  provider_id: string;
}

export const CheckoutForm = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    governorate: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [shippingProviders, setShippingProviders] = useState<ShippingProvider[]>([]);
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");

  const subtotal = getTotalPrice();

  // Find the selected shipping rate based on governorate and provider
  const selectedShippingRate = shippingRates.find(
    rate => rate.governorate === customerInfo.governorate &&
      rate.provider_id === selectedProviderId
  );

  // Calculate shipping cost
  const shipping = selectedShippingRate ?
    (subtotal >= selectedShippingRate.free_shipping_threshold ? 0 : selectedShippingRate.rate) : 50;

  // Default governorates
  const defaultGovernorates = [
    'Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Hurghada', 'Sharm El Sheikh',
    'Port Said', 'Suez', 'Ismailia', 'Mansoura', 'Tanta', 'Assiut', 'Fayoum'
  ];

  const total = subtotal + shipping;

  useEffect(() => {
    // Initialize with default providers since tables don't exist
    const defaultProviders = [
      { id: 'bosta', name: 'Bosta', base_rate: 60, free_shipping_threshold: 1000 },
      { id: 'aramex', name: 'Aramex', base_rate: 75, free_shipping_threshold: 1000 }
    ];
    setShippingProviders(defaultProviders);
    setSelectedProviderId(defaultProviders[0].id);

    // Generate default shipping rates
    generateDefaultShippingRates();

    if (user) {
      setCustomerInfo(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  // When governorate changes, select the first available provider for that governorate
  useEffect(() => {
    if (customerInfo.governorate && shippingRates.length > 0) {
      const availableRates = shippingRates.filter(rate => rate.governorate === customerInfo.governorate);
      if (availableRates.length > 0 && !selectedProviderId) {
        setSelectedProviderId(availableRates[0].provider_id);
      }
    }
  }, [customerInfo.governorate, shippingRates, selectedProviderId]);

  // Generate default shipping rates for all governorates and providers
  const generateDefaultShippingRates = () => {
    const rates: ShippingRate[] = [];

    // For each default governorate
    defaultGovernorates.forEach(governorate => {
      // For Bosta
      rates.push({
        id: `bosta-${governorate}`,
        governorate,
        rate: governorate === 'Cairo' || governorate === 'Giza' ? 50 :
          governorate === 'Alexandria' ? 60 :
            governorate === 'Luxor' || governorate === 'Assiut' ? 80 : 90,
        free_shipping_threshold: 1000,
        provider_id: 'bosta'
      });

      // For Aramex
      rates.push({
        id: `aramex-${governorate}`,
        governorate,
        rate: governorate === 'Cairo' || governorate === 'Giza' ? 65 :
          governorate === 'Alexandria' ? 75 :
            governorate === 'Luxor' || governorate === 'Assiut' ? 95 : 105,
        free_shipping_threshold: 1000,
        provider_id: 'aramex'
      });
    });

    setShippingRates(rates);
  };

  const validateForm = () => {
    if (!customerInfo.name.trim()) {
      toast.error('Please enter your full name.');
      return false;
    }
    if (!customerInfo.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(customerInfo.email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    if (!customerInfo.phone.trim() || !/^01[0-9]{9}$/.test(customerInfo.phone)) {
      toast.error('Please enter a valid Egyptian phone number (e.g. 01XXXXXXXXX).');
      return false;
    }
    if (!customerInfo.governorate.trim()) {
      toast.error('Please select your governorate.');
      return false;
    }
    if (!customerInfo.city.trim()) {
      toast.error('Please enter your city.');
      return false;
    }
    if (!customerInfo.address.trim()) {
      toast.error('Please enter your full address.');
      return false;
    }
    return true;
  };

  // State for guest checkout password
  const [showGuestCheckout, setShowGuestCheckout] = useState(false);
  const [guestPassword, setGuestPassword] = useState("");
  const [confirmGuestPassword, setConfirmGuestPassword] = useState("");
  const [showGuestPassword, setShowGuestPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || cartItems.length === 0) return;

    setIsLoading(true);

    try {
      let userId = user?.id;

      // If user is not logged in, create a new account
      if (!user) {
        if (!showGuestCheckout) {
          setShowGuestCheckout(true);
          setIsLoading(false);
          return;
        }

        // Validate password
        if (guestPassword.length < 6) {
          toast.error("Password must be at least 6 characters long");
          setIsLoading(false);
          return;
        }

        if (guestPassword !== confirmGuestPassword) {
          toast.error("Passwords don't match");
          setIsLoading(false);
          return;
        }

        // Create new user account
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: customerInfo.email,
          password: guestPassword,
          options: {
            data: {
              name: customerInfo.name,
              phone: customerInfo.phone
            }
          }
        });

        if (authError) {
          toast.error(authError.message || "Failed to create account");
          setIsLoading(false);
          return;
        }

        userId = authData.user?.id;

        if (!userId) {
          toast.error("Failed to create account");
          setIsLoading(false);
          return;
        }

        // Create customer record
        const { error: customerError } = await supabase
          .from('customers')
          .insert({
            id: userId,
            name: customerInfo.name,
            email: customerInfo.email
          });

        if (customerError) {
          console.error('Customer creation failed:', customerError);
        }

        toast.success("Account created successfully! You can now log in with your email and password.");
      }

      // Get shipping provider name
      const providerName = shippingProviders.find(p => p.id === selectedProviderId)?.name ||
        (selectedProviderId === 'bosta' ? 'Bosta' :
          selectedProviderId === 'aramex' ? 'Aramex' : 'Unknown');

      // Generate order number
      const orderNumber = `V${new Date().getFullYear().toString().slice(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

      // Calculate estimated delivery date (5-7 days from now)
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5 + Math.floor(Math.random() * 3));

      // Create simplified order (without order_items table reference)
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: userId,
          product_ids: cartItems.map(item => item.id),
          total: total,
          status: "pending"
        })
        .select()
        .single();

      if (orderError) throw orderError;

      clearCart();
      toast.success("Order placed successfully!");

      // Navigate to a simple success page since OrderConfirmation might not exist
      navigate('/');
      toast.success(`Order ${orderNumber} placed successfully! We'll contact you shortly.`);

    } catch (error: any) {
      console.error('Order creation failed:', error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card>
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
                required
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
                required
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
                placeholder="01XXXXXXXXX"
                required
              />
            </div>
            <div>
              <Label htmlFor="governorate">Governorate *</Label>
              <Select
                value={customerInfo.governorate}
                onValueChange={(value) => setCustomerInfo({ ...customerInfo, governorate: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select governorate" />
                </SelectTrigger>
                <SelectContent>
                  {defaultGovernorates.map((governorate) => (
                    <SelectItem key={governorate} value={governorate}>
                      {governorate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Shipping Provider Selection */}
          {customerInfo.governorate && (
            <div>
              <Label htmlFor="shipping-provider">Shipping Provider *</Label>
              <Select
                value={selectedProviderId}
                onValueChange={setSelectedProviderId}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping provider" />
                </SelectTrigger>
                <SelectContent>
                  {shippingRates
                    .filter(rate => rate.governorate === customerInfo.governorate)
                    .map((rate) => {
                      const provider = shippingProviders.find(p => p.id === rate.provider_id);
                      return provider ? (
                        <SelectItem key={rate.provider_id} value={rate.provider_id}>
                          {provider.name} ({rate.rate} EGP shipping{rate.free_shipping_threshold > 0 ? `, free over ${rate.free_shipping_threshold} EGP` : ''})
                        </SelectItem>
                      ) : null;
                    })}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={customerInfo.city}
              onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
              placeholder="Enter your city"
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Full Address *</Label>
            <Input
              id="address"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
              placeholder="Enter your full address"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            {/* <div className="flex items-center space-x-2">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod">Cash on Delivery</Label>
            </div> */}
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit/Debit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="instapay" id="instapay" />
              <Label htmlFor="instapay">Instapay</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="vodafone" id="vodafone" />
              <Label htmlFor="vodafone">Vodafone Cash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fawry" id="fawry" />
              <Label htmlFor="fawry">Fawry</Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'instapay' && (
            <div className="mt-4 p-3 bg-slate-50 rounded-md">
              <p className="text-sm text-slate-700 mb-2">
                <strong>Instapay Instructions:</strong>
              </p>
              <p className="text-sm text-slate-600">
                After placing your order, you'll receive payment instructions via email.
                Please complete the payment within 24 hours to avoid order cancellation.
              </p>
            </div>
          )}

          {paymentMethod === 'vodafone' && (
            <div className="mt-4 p-3 bg-slate-50 rounded-md">
              <p className="text-sm text-slate-700 mb-2">
                <strong>Vodafone Cash Instructions:</strong>
              </p>
              <p className="text-sm text-slate-600">
                After placing your order, send the payment to 01XXXXXXXXX with your order number.
                Please complete the payment within 24 hours to avoid order cancellation.
              </p>
            </div>
          )}

          {paymentMethod === 'fawry' && (
            <div className="mt-4 p-3 bg-slate-50 rounded-md">
              <p className="text-sm text-slate-700 mb-2">
                <strong>Fawry Instructions:</strong>
              </p>
              <p className="text-sm text-slate-600">
                After placing your order, you'll receive a Fawry reference number.
                Pay at any Fawry outlet or via the Fawry app within 24 hours.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Guest Checkout */}
      {showGuestCheckout && !user && (
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-slate-600 mb-4">
              To complete your order, we'll create an account for you using your email address.
              Please set a password to access your account and track your orders in the future.
            </div>
            <div>
              <Label htmlFor="guestPassword">Password *</Label>
              <div className="relative">
                <Input
                  id="guestPassword"
                  type={showGuestPassword ? "text" : "password"}
                  value={guestPassword}
                  onChange={(e) => setGuestPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowGuestPassword(!showGuestPassword)}
                >
                  {showGuestPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {guestPassword && guestPassword.length < 6 && (
                <p className="text-sm text-red-500 mt-1">Password must be at least 6 characters</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmGuestPassword">Confirm Password *</Label>
              <Input
                id="confirmGuestPassword"
                type="password"
                value={confirmGuestPassword}
                onChange={(e) => setConfirmGuestPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
              {confirmGuestPassword && guestPassword !== confirmGuestPassword && (
                <p className="text-sm text-red-500 mt-1">Passwords don't match</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Summary */}
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
          {shipping === 0 && subtotal >= (selectedShippingRate?.free_shipping_threshold || 1000) && (
            <div className="text-sm text-green-600">
              🎉 You qualified for free shipping!
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>{total.toFixed(2)} EGP</span>
          </div>

          <Button
            type="submit"
            className="w-full bg-coral-peach hover:bg-purple-600 hover:text-white mt-6 text-black border border-black"
            disabled={isLoading || cartItems.length === 0}
          >
            {isLoading ? 'Placing Order...' :
              showGuestCheckout && !user ? 'Create Account & Place Order' :
                (paymentMethod === 'cod' ? 'Place Order (COD)' : 'Proceed to Payment')}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
