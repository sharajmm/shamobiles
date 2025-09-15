import React from "react";
import { Smartphone, Phone, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="h-8 w-8 text-green-500" />
              <span className="font-bold text-xl">Sha Repairs</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted mobile repair service provider. We specialize in
              quick, reliable, and affordable mobile device repairs with quality
              assurance.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-500" />
                <span className="text-sm">+91 93617 73788</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span className="text-sm">rifanak0619@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="/services"
                  className="hover:text-green-500 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-green-500 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/buy"
                  className="hover:text-green-500 transition-colors"
                >
                  Buy Devices
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-green-500 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Screen Replacement</li>
              <li>Battery Replacement</li>
              <li>Water Damage Repair</li>
              <li>Software Issues</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Sha Repairs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
