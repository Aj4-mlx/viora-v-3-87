
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Showroom",
      details: ["123 Jewelry District", "Zamalek, Cairo", "Egypt"]
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+20 2 1234 5678", "+20 100 123 4567"]
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["info@viora.com", "support@viora.com"]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon - Sat: 10:00 AM - 8:00 PM", "Sunday: 12:00 PM - 6:00 PM"]
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
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-coral-peach/10 text-coral-peach rounded-full mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-slate-600 mb-1">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-cream-beige">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Enter your first name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Enter your last name"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email address"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="What is this regarding?"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your inquiry..."
                    className="mt-1 min-h-32"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-coral-peach hover:bg-coral-peach/80 text-white"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div>
              <div className="bg-white p-8 rounded-lg shadow-sm mb-6">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
                  Visit Our Showroom
                </h3>
                <p className="text-slate-600 mb-6">
                  Experience our jewelry collection in person at our beautiful showroom 
                  in the heart of Cairo's jewelry district. Our expert consultants are 
                  ready to help you find the perfect piece.
                </p>
                <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">Interactive Map Coming Soon</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
                  Why Choose Viora?
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-start">
                    <span className="text-coral-peach mr-2">•</span>
                    30+ years of jewelry expertise
                  </li>
                  <li className="flex items-start">
                    <span className="text-coral-peach mr-2">•</span>
                    Certified gemstones and precious metals
                  </li>
                  <li className="flex items-start">
                    <span className="text-coral-peach mr-2">•</span>
                    Custom design services available
                  </li>
                  <li className="flex items-start">
                    <span className="text-coral-peach mr-2">•</span>
                    Lifetime maintenance and repair
                  </li>
                  <li className="flex items-start">
                    <span className="text-coral-peach mr-2">•</span>
                    Certificate of authenticity included
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our jewelry and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                Do you offer custom jewelry design?
              </h3>
              <p className="text-slate-600">
                Yes! We specialize in custom jewelry design. Our master craftsmen can 
                create unique pieces based on your vision, whether it's an engagement 
                ring, anniversary gift, or special occasion piece.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                What is your return policy?
              </h3>
              <p className="text-slate-600">
                We offer a 30-day return policy for unworn items in original condition. 
                Custom pieces are non-returnable but we guarantee your satisfaction 
                throughout the design process.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                Do you provide certificates of authenticity?
              </h3>
              <p className="text-slate-600">
                Absolutely. Every piece comes with a certificate of authenticity 
                detailing the materials used, including gemstone grades and metal purity.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">
                How long does shipping take?
              </h3>
              <p className="text-slate-600">
                Standard shipping within Egypt takes 2-5 business days. Express shipping 
                is available for next-day delivery in Cairo and Giza. International 
                shipping takes 7-14 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
