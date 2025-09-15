// pages/about.js
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Learn more about our mission, values, and what drives us to deliver
          the best products and services.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Mission
        </h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          Our mission is to provide top-quality products that bring convenience,
          style, and innovation to your everyday life. We strive to make
          shopping simple, fun, and trustworthy.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#7e02abcf] to-[#4e23ed] text-white max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          Our Values
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Quality
            </h3>
            <p className="text-gray-100">
              We ensure all our products meet the highest standards of quality
              and durability.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Integrity
            </h3>
            <p className="text-gray-100">
              Honesty and transparency guide everything we do, from sourcing to
              service.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Innovation
            </h3>
            <p className="text-gray-100">
              We constantly innovate to bring new, exciting, and useful products
              to our customers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Customer First
            </h3>
            <p className="text-gray-100">
              Your satisfaction is our priority, and we go above and beyond to
              meet your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Join Our Community
        </h2>
        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          Stay updated with our latest products, offers, and news. Be part of a
          growing community of happy customers!
        </p>
         <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
          <strong>Contact us </strong> - mystore@gmail.com
        </p>
       
      </section>
    </div>
  );
}
