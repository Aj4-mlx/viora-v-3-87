
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Shield, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Returns = () => {
  const handleStartReturn = () => {
    toast.info("Return process started. You'll receive an email with instructions.");
  };

  const returnSteps = [
    {
      step: 1,
      title: "Contact Us",
      description: "Reach out within 30 days of purchase to initiate your return."
    },
    {
      step: 2,
      title: "Receive Instructions",
      description: "We'll email you detailed return instructions and a prepaid shipping label."
    },
    {
      step: 3,
      title: "Package Your Item",
      description: "Securely package the item in its original box with all accessories."
    },
    {
      step: 4,
      title: "Ship Back",
      description: "Use the prepaid label to send your item back to us."
    },
    {
      step: 5,
      title: "Get Refunded",
      description: "Receive your refund within 5-7 business days after we receive the item."
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
              Returns & Exchanges
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We want you to love your jewelry. If you're not completely satisfied, 
              we offer hassle-free returns and exchanges.
            </p>
          </div>
        </div>
      </section>

      {/* Return Policy Overview */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-slate-200">
              <CardHeader>
                <div className="w-16 h-16 bg-coral-peach/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-coral-peach" />
                </div>
                <CardTitle>30-Day Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Return your item within 30 days of purchase for a full refund or exchange.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200">
              <CardHeader>
                <div className="w-16 h-16 bg-coral-peach/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-coral-peach" />
                </div>
                <CardTitle>Free Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  We provide prepaid return shipping labels for all eligible returns.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200">
              <CardHeader>
                <div className="w-16 h-16 bg-coral-peach/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-coral-peach" />
                </div>
                <CardTitle>Easy Exchanges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Exchange for a different size, style, or receive a full refund.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Return Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">How to Return Your Item</CardTitle>
              <CardDescription>
                Follow these simple steps to return or exchange your jewelry.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {returnSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-coral-peach text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">{step.title}</h4>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-coral-peach/10 rounded-lg">
                <div className="text-center">
                  <h4 className="font-semibold text-slate-900 mb-2">Ready to Start a Return?</h4>
                  <p className="text-slate-600 mb-4">Contact our customer service team to begin the process.</p>
                  <Button 
                    onClick={handleStartReturn}
                    className="bg-coral-peach hover:bg-coral-peach/90"
                  >
                    Start Return Process
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Conditions */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <CardTitle>What Can Be Returned</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li>• Items in original condition</li>
                  <li>• Unworn jewelry with tags attached</li>
                  <li>• Items with original packaging</li>
                  <li>• Purchases within 30 days</li>
                  <li>• Non-personalized items</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-6 h-6 text-coral-peach" />
                  <CardTitle>Exchange Options</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li>• Different size of the same item</li>
                  <li>• Different style of equal or greater value</li>
                  <li>• Store credit for future purchases</li>
                  <li>• Full refund to original payment method</li>
                  <li>• Free shipping on exchanges</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Returns;
