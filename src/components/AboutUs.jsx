import React from "react";

const AboutUs = () => {
  return (
    <div>
      <section className="w-full bg-gray-50 py-14 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Computer Sale –{" "}
            <span className="text-amber-700">DayTech Computer</span>
          </h2>

          {/* Introduce */}
          <p className="text-gray-600 mb-10 leading-relaxed">
            At DayTech Computer, we offer a wide range of computers and
            laptops designed to meet every need and budget. From powerful gaming
            machines to reliable office and student laptops, our products
            deliver performance, quality, and value you can trust.
          </p>

          {/* What We Offer */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            What We Offer
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="text-lg font-semibold mb-2">
                🖥 Gaming Computers
              </h4>
              <p className="text-gray-600">
                High-performance CPUs & GPUs for smooth gameplay.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="text-lg font-semibold mb-2">
                💼 Business & Office PCs
              </h4>
              <p className="text-gray-600">
                Stable, fast, and efficient for daily work.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="text-lg font-semibold mb-2">🎓 Student Laptops</h4>
              <p className="text-gray-600">
                Affordable, lightweight, and reliable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="text-lg font-semibold mb-2">
                🏠 Home Use Computers
              </h4>
              <p className="text-gray-600">
                Perfect for browsing, streaming, and everyday tasks.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Why Choose Our Computers?
          </h3>

          <ul className="space-y-3 text-gray-700 mb-10">
            <li>✔️ Genuine products from trusted brands</li>
            <li>✔️ Carefully tested for quality & performance</li>
            <li>✔️ Competitive prices & special promotions</li>
            <li>✔️ Warranty and professional after-sales support</li>
            <li>✔️ Free gifts on selected models</li>
          </ul>

          {/* Closing */}
          <p className="text-gray-600 mb-8">
            Whether you’re upgrading your setup or buying your first computer,
            DayTech Computer is here to help you choose the right device
            with confidence.
          </p>

          {/* CTA */}
          <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-xl font-semibold transition">
            Power Up with DayTech Computer
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
