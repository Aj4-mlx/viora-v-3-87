import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Award, Users, Gem, Heart } from "lucide-react";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Exceptional Quality",
      description: "We use only the finest materials and employ master craftsmen to ensure every piece meets our exacting standards."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passionate Craftsmanship",
      description: "Each piece is lovingly crafted by artisans who pour their passion and expertise into every detail."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're committed to providing exceptional service and creating lasting relationships."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Timeless Excellence",
      description: "Our designs transcend trends, creating heirloom pieces that will be treasured for generations to come."
    }
  ];

  const milestones = [
    { year: "1990", event: "Viora Founded", description: "Started as a small family business with a passion for fine jewelry." },
    { year: "2000", event: "First Showroom", description: "Opened our first flagship showroom in Cairo's jewelry district." },
    { year: "2010", event: "Master Craftsman Award", description: "Recognized for exceptional craftsmanship by the Egyptian Jewelry Guild." },
    { year: "2020", event: "Digital Transformation", description: "Launched our online platform to serve customers nationwide." },
    { year: "2024", event: "30+ Years of Excellence", description: "Celebrating over three decades of creating beautiful jewelry." }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-coral-peach/10 via-pale-peach/20 to-cream-beige">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              For over three decades, Viora has been crafting exceptional jewelry 
              that celebrates life's most precious moments. Our journey began with 
              a simple belief: that every piece of jewelry should tell a story.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">
                Crafted with Love, 
                <span className="block text-coral-peach">Designed for Life</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                What started as a passion project in 1990 has grown into one of Egypt's 
                most trusted jewelry brands. Our founder, Ahmed Hassan, began with a 
                simple workshop and an unwavering commitment to quality that continues 
                to define us today.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Every piece that bears the Viora name is a testament to our dedication 
                to excellence. From the initial design concept to the final polish, 
                we ensure that each creation meets our exacting standards.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Today, we're proud to serve customers across Egypt and beyond, 
                helping them celebrate their most important moments with jewelry 
                that's as unique as their stories.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-pale-peach/20 rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Viora Craftsman at Work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-coral-peach rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold text-3xl">30+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-cream-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from design to delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-coral-peach/10 text-coral-peach rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Key milestones that have shaped Viora into the brand it is today.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <span className="text-2xl font-bold text-coral-peach">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-coral-peach rounded-full mt-2 mr-8"></div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-coral-peach mb-2">30+</div>
              <div className="text-slate-300">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-coral-peach mb-2">10,000+</div>
              <div className="text-slate-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-coral-peach mb-2">500+</div>
              <div className="text-slate-300">Unique Designs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-coral-peach mb-2">50+</div>
              <div className="text-slate-300">Master Craftsmen</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
