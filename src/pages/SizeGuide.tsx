
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SizeGuide = () => {
  const ringSizes = [
    { us: "4", uk: "H", eu: "47", circumference: "46.8" },
    { us: "5", uk: "J", eu: "49", circumference: "49.3" },
    { us: "6", uk: "L", eu: "52", circumference: "51.9" },
    { us: "7", uk: "N", eu: "54", circumference: "54.4" },
    { us: "8", uk: "P", eu: "57", circumference: "57.0" },
    { us: "9", uk: "R", eu: "59", circumference: "59.5" },
    { us: "10", uk: "T", eu: "62", circumference: "62.1" },
  ];

  const necklaceLengths = [
    { length: "14-16\"", name: "Choker", description: "Sits close to the neck" },
    { length: "18\"", name: "Princess", description: "Sits at the collarbone" },
    { length: "20-24\"", name: "Matinee", description: "Falls between collarbone and bust" },
    { length: "28-36\"", name: "Opera", description: "Falls at or below the bust line" },
    { length: "36\"+", name: "Rope", description: "Can be worn long or doubled" },
  ];

  const braceletSizes = [
    { size: "Extra Small", measurement: "6.0-6.5\"", wrist: "5.5-6.0\"" },
    { size: "Small", measurement: "6.5-7.0\"", wrist: "6.0-6.5\"" },
    { size: "Medium", measurement: "7.0-7.5\"", wrist: "6.5-7.0\"" },
    { size: "Large", measurement: "7.5-8.0\"", wrist: "7.0-7.5\"" },
    { size: "Extra Large", measurement: "8.0-8.5\"", wrist: "7.5-8.0\"" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-coral-peach/10 to-pale-peach/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Size Guide
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find your perfect fit with our comprehensive sizing guide for rings, 
              necklaces, bracelets, and earrings.
            </p>
          </div>
        </div>
      </section>

      {/* Size Guide Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="rings" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="rings">Rings</TabsTrigger>
              <TabsTrigger value="necklaces">Necklaces</TabsTrigger>
              <TabsTrigger value="bracelets">Bracelets</TabsTrigger>
              <TabsTrigger value="earrings">Earrings</TabsTrigger>
            </TabsList>

            <TabsContent value="rings">
              <Card>
                <CardHeader>
                  <CardTitle>Ring Sizing Guide</CardTitle>
                  <CardDescription>
                    Use this chart to find your ring size. Measure your finger at the end of the day when it's largest.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-3 text-left">US Size</th>
                          <th className="border border-slate-300 p-3 text-left">UK Size</th>
                          <th className="border border-slate-300 p-3 text-left">EU Size</th>
                          <th className="border border-slate-300 p-3 text-left">Circumference (mm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ringSizes.map((size, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="border border-slate-300 p-3">{size.us}</td>
                            <td className="border border-slate-300 p-3">{size.uk}</td>
                            <td className="border border-slate-300 p-3">{size.eu}</td>
                            <td className="border border-slate-300 p-3">{size.circumference}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 p-4 bg-coral-peach/10 rounded-lg">
                    <h4 className="font-semibold text-slate-900 mb-2">How to Measure:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Wrap a string around your finger</li>
                      <li>• Mark where the string overlaps</li>
                      <li>• Measure the length in millimeters</li>
                      <li>• Compare to the circumference column</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="necklaces">
              <Card>
                <CardHeader>
                  <CardTitle>Necklace Length Guide</CardTitle>
                  <CardDescription>
                    Choose the perfect necklace length based on your style and neckline.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {necklaceLengths.map((length, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-slate-900">{length.name}</h4>
                          <p className="text-sm text-slate-600">{length.description}</p>
                        </div>
                        <span className="text-lg font-medium text-coral-peach">{length.length}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bracelets">
              <Card>
                <CardHeader>
                  <CardTitle>Bracelet Sizing Guide</CardTitle>
                  <CardDescription>
                    Find your bracelet size by measuring your wrist circumference.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-3 text-left">Size</th>
                          <th className="border border-slate-300 p-3 text-left">Bracelet Length</th>
                          <th className="border border-slate-300 p-3 text-left">Wrist Measurement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {braceletSizes.map((size, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="border border-slate-300 p-3">{size.size}</td>
                            <td className="border border-slate-300 p-3">{size.measurement}</td>
                            <td className="border border-slate-300 p-3">{size.wrist}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earrings">
              <Card>
                <CardHeader>
                  <CardTitle>Earring Style Guide</CardTitle>
                  <CardDescription>
                    Choose earrings that complement your face shape and personal style.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Earring Types</h4>
                      <div className="space-y-3">
                        <div className="p-3 border border-slate-200 rounded">
                          <h5 className="font-medium">Studs</h5>
                          <p className="text-sm text-slate-600">Classic and versatile, perfect for everyday wear</p>
                        </div>
                        <div className="p-3 border border-slate-200 rounded">
                          <h5 className="font-medium">Hoops</h5>
                          <p className="text-sm text-slate-600">Timeless style available in various sizes</p>
                        </div>
                        <div className="p-3 border border-slate-200 rounded">
                          <h5 className="font-medium">Drop/Dangle</h5>
                          <p className="text-sm text-slate-600">Elegant movement, ideal for special occasions</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Face Shape Guide</h4>
                      <div className="space-y-3">
                        <div className="p-3 border border-slate-200 rounded">
                          <h5 className="font-medium">Round Face</h5>
                          <p className="text-sm text-slate-600">Angular earrings, long drops</p>
                        </div>
                        <div className="p-3 border border-slate-200 rounded">
                          <h5 className="font-medium">Square Face</h5>
                          <p className="text-sm text-slate-600">Curved hoops, round studs</p>
                        </div>
                        <div className="p-3 border border-slate-200 rounded">
                          <h5 className="font-medium">Oval Face</h5>
                          <p className="text-sm text-slate-600">Most styles work well</p>
                        </div>
                      </div>
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

export default SizeGuide;
