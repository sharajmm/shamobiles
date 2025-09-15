import React from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our expert team for any queries about mobile
            repairs or services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      Dr.N.G.P. Arts and Science College
                      <br />
                      Coimbatore, Tamil Nadu
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">
                      <a
                        href="tel:+919361773788"
                        className="hover:text-green-600 transition-colors"
                      >
                        +91 93617 73788
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:231cg049@drngpasc.ac.in"
                        className="hover:text-green-600 transition-colors"
                      >
                        231cg045@drngpasc.ac.in
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Business Hours
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      WhatsApp
                    </h3>
                    <p className="text-gray-600">
                      <a
                        href="https://wa.me/919361773788"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors"
                      >
                        Chat with us on WhatsApp
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4">
                Quick Tips for Faster Service
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>• Have your device model and IMEI number ready</li>
                <li>• Describe the issue clearly</li>
                <li>• Mention any previous repair attempts</li>
                <li>• Ask about our current promotions</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>

            <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.700264539586!2d77.03201557405842!3d11.061084189105499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f84100000001%3A0x6819aaec8ca1eaf4!2sDr.N.G.P.%20Arts%20and%20Science%20College!5e0!3m2!1sen!2sin!4v1755478343616!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sha Repairs Location"
              />
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Directions</h4>
              <p className="text-gray-600 text-sm">
                We are conveniently located near Dr.N.G.P. Arts and Science
                College in Coimbatore. Easily accessible by public transport and
                with parking available nearby.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-red-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            Emergency Repairs
          </h3>
          <p className="text-red-700 mb-4">
            Need urgent repair service? Call our emergency hotline for same-day
            service availability.
          </p>
          <a
            href="tel:+919361773788"
            className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Emergency Hotline: +91 93617 73788</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
