
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, Shield, Clock } from "lucide-react";

const ShippingInfo = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "3-5 business days",
      cost: "Free on orders over 5,000 EGP",
      description: "Regular delivery to your doorstep"
    },
    {
      name: "Express Shipping",
      time: "1-2 business days",
      cost: "250 EGP",
      description: "Fast delivery for urgent orders"
    },
    {
      name: "Same Day Delivery",
      time: "Within 24 hours",
      cost: "500 EGP",
      description: "Available in Cairo and Giza only"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-coral-peach/10 to-pale-peach/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Shipping Information
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Fast, secure, and reliable delivery for your precious jewelry orders.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {shippingOptions.map((option, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-coral-peach/10 rounded-full flex items-center justify-center mb-3">
                    <Truck className="w-6 h-6 text-coral-peach" />
                  </div>
                  <CardTitle className="text-xl">{option.name}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Delivery Time:</span>
                      <span className="font-medium">{option.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Cost:</span>
                      <span className="font-medium text-coral-peach">{option.cost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Package className="w-6 h-6 text-coral-peach" />
                  <CardTitle>Packaging & Handling</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Secure Packaging</h4>
                  <p className="text-slate-600">All jewelry is carefully wrapped in protective materials and placed in our signature VIORA boxes.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Gift Wrapping</h4>
                  <p className="text-slate-600">Complimentary gift wrapping available for all orders. Perfect for special occasions.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Processing Time</h4>
                  <p className="text-slate-600">Orders are processed within 1-2 business days before shipping.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-coral-peach" />
                  <CardTitle>Delivery & Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Insured Shipping</h4>
                  <p className="text-slate-600">All orders are fully insured against loss or damage during transit.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Signature Required</h4>
                  <p className="text-slate-600">High-value orders require signature confirmation upon delivery.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tracking</h4>
                  <p className="text-slate-600">Track your order with the provided tracking number sent via email.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* International Shipping */}
          <Card className="mt-8">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-coral-peach" />
                <CardTitle>International Shipping</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Available Countries</h4>
                  <p className="text-slate-600 mb-3">We ship to most countries worldwide. Delivery times vary by destination.</p>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Middle East: 5-7 business days</li>
                    <li>• Europe: 7-10 business days</li>
                    <li>• North America: 10-14 business days</li>
                    <li>• Asia Pacific: 10-14 business days</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Important Notes</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Customs duties and taxes may apply</li>
                    <li>• Delivery times may vary during peak seasons</li>
                    <li>• Some restrictions may apply to certain items</li>
                    <li>• Contact us for specific country requirements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingInfo;
