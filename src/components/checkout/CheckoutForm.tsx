import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  const { cartItems, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    governorate: "",
    city: "",
    postalCode: "",
  });

  // Use default shipping data since tables don't exist yet
  const [shippingProviders] = useState<ShippingProvider[]>([
    { id: "1", name: "Standard Delivery", base_rate: 50, free_shipping_threshold: 1000 },
    { id: "2", name: "Express Delivery", base_rate: 100, free_shipping_threshold: 1500 }
  ]);

  const [shippingRates] = useState<ShippingRate[]>([
    { id: "1", governorate: "Cairo", rate: 50, free_shipping_threshold: 1000, provider_id: "1" },
    { id: "2", governorate: "Giza", rate: 60, free_shipping_threshold: 1000, provider_id: "1" },
    { id: "3", governorate: "Alexandria", rate: 80, free_shipping_threshold: 1000, provider_id: "1" }
  ]);

  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const egyptianGovernorates = [
    "Cairo", "Giza", "Alexandria", "Dakahlia", "Beheira", "Kafr El Sheikh",
    "Gharbia", "Menoufia", "Sharqia", "Qalyubia", "Damietta", "Port Said",
    "Ismailia", "Suez", "North Sinai", "South Sinai", "Beni Suef", "Fayyum",
    "Minya", "Asyut", "Sohag", "Qena", "Luxor", "Aswan", "Red Sea", 
    "New Valley", "Matrouh"
  ];

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  const selectedRate = shippingRates.find(rate => 
    rate.governorate === formData.governorate && rate.provider_id === selectedProvider
  );

  const shippingCost = selectedRate && cartTotal < selectedRate.free_shipping_threshold 
    ? selectedRate.rate 
    : 0;

  const totalWithShipping = cartTotal + shippingCost;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to complete your order");
      navigate("/sign-in");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!selectedProvider) {
      toast.error("Please select a shipping method");
      return;
    }

    setLoading(true);

    try {
      // Create order in database
      const orderData = {
        customer_id: user.id,
        total: totalWithShipping,
        status: "pending",
        product_ids: cartItems.map(item => item.id)
      };

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([orderData])
        .select()
        .single();

      if (orderError) throw orderError;

      // Clear cart and redirect
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation?order=${order.id}`);

    } catch (error: any) {
      console.error("Order creation error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              className="mt-2"
            />
          </div>

          {/* Shipping Information */}
          <div>
            <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
            <Input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
              className="mt-2"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <Select onValueChange={(value) => handleInputChange("governorate", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Governorate" defaultValue={formData.governorate} />
                </SelectTrigger>
                <SelectContent>
                  {egyptianGovernorates.map((gov) => (
                    <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <Input
              type="text"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              required
              className="mt-2"
            />
          </div>

          {/* Shipping Method */}
          <div>
            <h3 className="text-lg font-medium mb-2">Shipping Method</h3>
            <Select onValueChange={setSelectedProvider}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a shipping method" />
              </SelectTrigger>
              <SelectContent>
                {shippingProviders.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-medium mb-2">Order Summary</h3>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{cartTotal.toLocaleString()} EGP</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shippingCost.toLocaleString()} EGP</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>{totalWithShipping.toLocaleString()} EGP</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-coral-peach hover:bg-coral-peach/80 text-white" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
