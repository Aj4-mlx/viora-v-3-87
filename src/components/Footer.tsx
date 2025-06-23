
import { Facebook, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">
              VIORA
            </h3>
            <p className="text-slate-600 mb-4">
              Timeless jewelry crafted with passion and precision for life's 
              most treasured moments.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-slate-600 hover:text-yellow-600 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-slate-600 hover:text-yellow-600 cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-slate-600 hover:text-yellow-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Rings</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Necklaces</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Earrings</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Bracelets</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Customer Care</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Care Instructions</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">About Viora</h4>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Craftsmanship</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-yellow-600 transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-slate-600">
            © 2024 Viora Jewelry. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};
