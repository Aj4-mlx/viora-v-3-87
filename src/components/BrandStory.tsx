
export const BrandStory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">
              Crafted with Passion, 
              <span className="block text-yellow-600">Born from Love</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              For over three decades, Viora has been synonymous with exceptional 
              craftsmanship and timeless elegance. Each piece in our collection 
              tells a story of dedication, artistry, and the pursuit of perfection.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              From sourcing the finest materials to the delicate finishing touches, 
              our master craftsmen ensure that every Viora creation becomes a 
              treasured heirloom for generations to come.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">30+</div>
                <div className="text-sm text-slate-600">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">10k+</div>
                <div className="text-sm text-slate-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">500+</div>
                <div className="text-sm text-slate-600">Unique Designs</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Viora Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-600 rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl">
              V
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
