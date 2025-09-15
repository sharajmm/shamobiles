import React from "react";
import mobileservice from "../mobileservice.webp";
import { Link } from "react-router-dom";
import { Zap, Shield, Clock, Star, ArrowRight } from "lucide-react";

const Home: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-green-600" />,
      title: "Quick Repairs",
      description:
        "Most repairs completed within 24-48 hours with quality assurance.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Warranty Included",
      description:
        "All repairs come with a 6-month warranty for peace of mind.",
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "Real-time Tracking",
      description: "Track your repair progress online with our ticket system.",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      rating: 5,
      comment:
        "Excellent service! Fixed my iPhone screen perfectly and very affordable.",
    },
    {
      name: "Priya Sharma",
      rating: 5,
      comment:
        "Professional team and quick turnaround. Highly recommended for mobile repairs.",
    },
    {
      name: "Arjun Patel",
      rating: 5,
      comment:
        "Great experience! They kept me updated throughout the repair process.",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Professional Mobile
                <span className="text-green-600"> Repair</span> Services
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Get your mobile devices fixed by certified technicians. Quick
                turnaround, quality parts, and comprehensive warranty included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/services"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  Book now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative h-full w-full flex items-center justify-center">
              <img
                src={mobileservice}
                alt="Sha Repairs Service"
                className="rounded-2xl w-full h-full object-cover max-h-[320px] min-h-[200px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sha Repairs?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide professional mobile repair services with transparency,
              quality, and customer satisfaction as our top priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive mobile device repair solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Screen Replacement",
              "Battery Replacement",
              "Water Damage Repair",
              "Software Issues",
              "Camera Repair",
              "Charging Port Fix",
              "Speaker/Mic Repair",
              "Button Replacement",
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{service}</h3>
                <p className="text-sm text-gray-600">
                  Professional repair with quality parts
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600">
              Real reviews from satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.comment}</p>
                <div className="font-semibold text-gray-900">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Fix Your Device?
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Get a free quote today and experience our professional mobile repair
            services. Quick, reliable, and affordable solutions.
          </p>
          <Link
            to="/services"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
