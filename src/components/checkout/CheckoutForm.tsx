
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
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

interface ShippingRate {
  governorate: string;
  rate: number;
  free_shipping_threshold: number;
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
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);

  const subtotal = getTotalPrice();
  const selectedShippingRate = shippingRates.find(rate => rate.governorate === customerInfo.governorate);
  const shipping = selectedShippingRate ? 
    (subtotal >= selectedShippingRate.free_shipping_threshold ? 0 : selectedShippingRate.rate) : 50;
  const total = subtotal + shipping;

  useEffect(() => {
    fetchShippingRates();
    if (user) {
      fetchSavedAddresses();
      setCustomerInfo(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  const fetchShippingRates = async () => {
    const { data } = await supabase.from('shipping_rates').select('*');
    if (data) setShippingRates(data);
  };

  const fetchSavedAddresses = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('customer_addresses')
      .select('*')
      .eq('customer_id', user.id);
    if (data) setSavedAddresses(data);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || cartItems.length === 0) return;
    
    if (!user) {
      toast.error("Please sign in to complete your order.");
      navigate('/sign-in?reason=auth-required');
      return;
    }

    setIsLoading(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: user.id,
          product_ids: cartItems.map(item => item.id),
          total: total,
          status: "pending",
          payment_method: paymentMethod,
          shipping_address: customerInfo,
          note: `Payment: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}`
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Save address if user wants to
      if (user) {
        const { error: addressError } = await supabase
          .from('customer_addresses')
          .upsert({
            customer_id: user.id,
            ...customerInfo
          });
        
        if (addressError) console.warn('Failed to save address:', addressError);
      }

      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${order.id}`);
      
    } catch (error: any) {
      console.error('Order creation failed:', error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedAddress = (address: any) => {
    setCustomerInfo({
      name: address.name,
      email: customerInfo.email,
      phone: address.phone,
      address: address.address,
      city: address.city,
      governorate: address.governorate
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Saved Addresses */}
      {savedAddresses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {savedAddresses.map((address) => (
                <div key={address.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{address.name}</p>
                    <p className="text-sm text-gray-600">{address.address}, {address.city}, {address.governorate}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => loadSavedAddress(address)}
                  >
                    Use This Address
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
                  {shippingRates.map((rate) => (
                    <SelectItem key={rate.governorate} value={rate.governorate}>
                      {rate.governorate} ({rate.rate} EGP shipping)
                    </SelectItem>
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
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod">Cash on Delivery</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit/Debit Card (Coming Soon)</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

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
          {shipping === 0 && subtotal >= (selectedShippingRate?.free_shipping_threshold || 5000) && (
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
            className="w-full bg-coral-peach hover:bg-coral-peach/80 mt-6"
            disabled={isLoading || cartItems.length === 0}
          >
            {isLoading ? 'Placing Order...' : (paymentMethod === 'cod' ? 'Place Order (COD)' : 'Proceed to Payment')}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
