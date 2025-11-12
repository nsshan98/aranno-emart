import { ShoppingCart } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="h-8 w-8 text-[#E97B2F]" />
                <span className="text-2xl font-bold">Aranno E-mart</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for fresh grocery delivery.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-[#E97B2F] transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E97B2F] transition">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E97B2F] transition">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E97B2F] transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-[#E97B2F] transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E97B2F] transition">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E97B2F] transition">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E97B2F] transition">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@freshmart.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Market St, City</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Aranno E-mart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
