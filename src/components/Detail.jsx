import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { asusLaptops } from "../components/Data1";
import { ArrowLeft, Package, Shield, Truck, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  // Find product by ID (not index)
  const product = asusLaptops.find((laptop) => laptop.id === parseInt(id));

  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.id === product?.id);
  const cartQuantity = cartItems.find(item => item.id === product?.id)?.quantity || 0;

  // Check if product exists
  if (!product) {
    return (
      <div className="w-full flex justify-center items-center min-h-[calc(100vh-160px)] px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The laptop you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Products</span>
      </button>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
          {/* LEFT SIDE - Image */}
          <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
            <img
              src={product.image}
              alt={product.model}
              className="max-w-full max-h-[500px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* RIGHT SIDE - Details */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
                <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  {product.series}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.model}
              </h1>
              
              {/* Stock & Price */}
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    product.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                </span>
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
              </div>

              {/* Cart Status */}
              {isInCart && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-800">
                    ✓ Already in cart ({cartQuantity} {cartQuantity === 1 ? 'item' : 'items'})
                  </p>
                </div>
              )}

              {/* Year & Color */}
              <div className="flex gap-4 text-sm text-gray-600">
                <span>
                  <strong>Year:</strong> {product.year}
                </span>
                <span>
                  <strong>Color:</strong> {product.color}
                </span>
              </div>
            </div>

            <hr className="border-2 mb-6" />

            {/* Specifications */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Technical Specifications
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900">• Processor:</span>{" "}
                  {product.specs.cpu} ({product.specs.cores} cores, {product.specs.maxSpeed})
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900">• Memory:</span>{" "}
                  {product.specs.ram}
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900">• Storage:</span>{" "}
                  {product.specs.storage}
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900">• Display:</span>{" "}
                  {product.specs.display.size} {product.specs.display.type} (
                  {product.specs.display.resolution}) @{" "}
                  {product.specs.display.refreshRate}
                  {product.specs.display.features && 
                    ` • ${product.specs.display.features.join(", ")}`}
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900">• Graphics:</span>{" "}
                  {product.specs.gpu}
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-bold text-gray-900">• Keyboard:</span>{" "}
                  {product.specs.keyboard}
                </div>
              </div>
            </div>

            <hr className="border-2 mb-6" />

            {/* Warranty & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Shield className="text-blue-600" size={24} />
                <div>
                  <p className="font-bold text-sm">Warranty</p>
                  <p className="text-xs text-gray-600">{product.warranty}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Truck className="text-green-600" size={24} />
                <div>
                  <p className="font-bold text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">Nationwide</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <Package className="text-purple-600" size={24} />
                <div>
                  <p className="font-bold text-sm">Original Box</p>
                  <p className="text-xs text-gray-600">
                    {product.originalBox ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>

            {/* Free Items */}
            {product.freeItems && product.freeItems.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  🎁 Free Items Included
                </h3>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {product.freeItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700 bg-gradient-to-r from-yellow-50 to-orange-50 p-2 rounded"
                    >
                      <span className="text-green-600">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 mt-auto pt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-[1.02]"
                disabled={!product.inStock}
              >
                <ShoppingCart size={20} />
                {product.inStock ? (isInCart ? 'Add More' : 'Add to Cart') : 'Out of Stock'}
              </button>
              <button className="px-6 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                Contact Us
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 mt-4">
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                ❤️ Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;