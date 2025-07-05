import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Sun, Heart, Sparkles } from "lucide-react";

const CareInstructions = () => {
  const metalCare = {
    gold: [
      "Clean with warm soapy water and a soft brush",
      "Dry thoroughly with a soft cloth", 
      "Store in a dry place away from humidity",
      "Avoid exposure to chlorine and harsh chemicals"
    ],
    silver: [
      "Use a silver polishing cloth regularly",
      "Clean with mild soap and warm water",
      "Store in anti-tarnish pouches",
      "Remove before swimming or exercising"
    ],
    platinum: [
      "Clean with a mild jewelry cleaner",
      "Buff gently with a soft cloth",
      "Professional cleaning every 6 months",
      "Highly durable but avoid hard impacts"
    ]
  };

  const gemCare = {
    diamond: [
      "Clean with warm soapy water",
      "Use a soft toothbrush for hard-to-reach areas",
      "Rinse thoroughly and dry with lint-free cloth",
      "Professional cleaning recommended annually"
    ],
    pearl: [
      "Wipe with a damp cloth after wearing",
      "Store separately from other jewelry",
      "Avoid perfumes and cosmetics",
      "Restring periodically if worn frequently"
    ],
    gemstones: [
      "Clean with lukewarm water and mild soap",
      "Avoid ultrasonic cleaners for soft stones",
      "Store individually to prevent scratching",
      "Check settings regularly for loose stones"
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-coral-peach/10 to-pale-peach/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Jewelry Care Guide
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Keep your precious jewelry looking beautiful for years to come with 
              our comprehensive care and maintenance guide.
            </p>
          </div>
        </div>
      </section>

      {/* Care Instructions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Quick Tips */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-coral-peach/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplets className="w-6 h-6 text-coral-peach" />
                </div>
                <CardTitle className="text-lg">Clean Regularly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Regular cleaning maintains sparkle and prevents buildup
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-coral-peach/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sun className="w-6 h-6 text-coral-peach" />
                </div>
                <CardTitle className="text-lg">Store Properly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Keep jewelry in a cool, dry place away from sunlight
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-coral-peach/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-coral-peach" />
                </div>
                <CardTitle className="text-lg">Handle Gently</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Treat your jewelry with care to prevent damage
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-slate-200">
              <CardHeader>
                <div className="w-12 h-12 bg-coral-peach/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-coral-peach" />
                </div>
                <CardTitle className="text-lg">Professional Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Regular professional maintenance keeps jewelry pristine
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="metals" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metals">Metal Care</TabsTrigger>
              <TabsTrigger value="gems">Gemstone Care</TabsTrigger>
              <TabsTrigger value="storage">Storage Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="metals">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Gold Jewelry</CardTitle>
                    <CardDescription>18k, 14k, and gold-plated pieces</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {metalCare.gold.map((tip, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Silver Jewelry</CardTitle>
                    <CardDescription>Sterling silver and silver-plated items</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {metalCare.silver.map((tip, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Platinum Jewelry</CardTitle>
                    <CardDescription>Premium platinum pieces</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {metalCare.platinum.map((tip, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="gems">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Diamonds</CardTitle>
                    <CardDescription>The hardest natural substance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {gemCare.diamond.map((tip, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Pearls</CardTitle>
                    <CardDescription>Delicate organic gems</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {gemCare.pearl.map((tip, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Colored Gemstones</CardTitle>
                    <CardDescription>Emeralds, sapphires, rubies, and more</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {gemCare.gemstones.map((tip, index) => (
                        <li key={index} className="text-sm text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="storage">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Proper Storage Guidelines</CardTitle>
                  <CardDescription>
                    How to store your jewelry to maintain its beauty and prevent damage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4">Storage Best Practices</h4>
                      <ul className="space-y-3">
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Store each piece separately to prevent scratching
                        </li>
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Use soft pouches or lined jewelry boxes
                        </li>
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Keep in a cool, dry environment
                        </li>
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Avoid direct sunlight and humidity
                        </li>
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Hang necklaces to prevent tangling
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-4">What to Avoid</h4>
                      <ul className="space-y-3">
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Don't store different metals together
                        </li>
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Avoid plastic bags for long-term storage
                        </li>
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Keep away from heat sources
                        </li>
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Don't store in bathrooms or damp areas
                        </li>
                        <li className="text-slate-600 flex items-start">
                          <span className="text-coral-peach mr-2">•</span>
                          Avoid tossing jewelry into drawers
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareInstructions;
