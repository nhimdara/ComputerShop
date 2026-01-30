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

// Replace the return section starting from line 70
return (
  <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-6">
    {/* Back Button */}
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
    >
      <ArrowLeft size={18} />
      <span className="font-medium">Back to Products</span>
    </button>

    <div className="max-w-7xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 xl:p-10">
        {/* LEFT SIDE - Image */}
        <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 sm:p-6 md:p-8">
          <img
            src={product.image}
            alt={product.model}
            className="max-w-full max-h-[400px] sm:max-h-[450px] md:max-h-[500px] object-contain drop-shadow-lg sm:drop-shadow-2xl"
          />
        </div>

        {/* RIGHT SIDE - Details */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-2 sm:px-3 py-1 rounded-full">
                {product.brand}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-purple-600 bg-purple-50 px-2 sm:px-3 py-1 rounded-full">
                {product.series}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {product.model}
            </h1>
            
            {/* Stock & Price */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <span
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                  product.inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                ${product.price}
              </span>
            </div>

            {/* Cart Status */}
            {isInCart && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3 mb-4">
                <p className="text-xs sm:text-sm text-blue-800">
                  ✓ Already in cart ({cartQuantity} {cartQuantity === 1 ? 'item' : 'items'})
                </p>
              </div>
            )}

            {/* Year & Color */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <span>
                <strong>Year:</strong> {product.year}
              </span>
              <span>
                <strong>Color:</strong> {product.color}
              </span>
            </div>
          </div>

          <hr className="border-2 mb-4 sm:mb-6" />

          {/* Specifications */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Technical Specifications
            </h2>
            <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="font-bold text-gray-900">• Processor:</span>{" "}
                {product.specs.cpu} ({product.specs.cores} cores, {product.specs.maxSpeed})
              </div>
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="font-bold text-gray-900">• Memory:</span>{" "}
                {product.specs.ram}
              </div>
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="font-bold text-gray-900">• Storage:</span>{" "}
                {product.specs.storage}
              </div>
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="font-bold text-gray-900">• Display:</span>{" "}
                {product.specs.display.size} {product.specs.display.type} (
                {product.specs.display.resolution}) @{" "}
                {product.specs.display.refreshRate}
                {product.specs.display.features && 
                  ` • ${product.specs.display.features.join(", ")}`}
              </div>
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="font-bold text-gray-900">• Graphics:</span>{" "}
                {product.specs.gpu}
              </div>
              <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                <span className="font-bold text-gray-900">• Keyboard:</span>{" "}
                {product.specs.keyboard}
              </div>
            </div>
          </div>

          <hr className="border-2 mb-4 sm:mb-6" />

          {/* Warranty & Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 rounded-lg">
              <Shield className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-bold text-xs sm:text-sm">Warranty</p>
                <p className="text-xs text-gray-600">{product.warranty}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
              <Truck className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-bold text-xs sm:text-sm">Free Shipping</p>
                <p className="text-xs text-gray-600">Nationwide</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-purple-50 rounded-lg">
              <Package className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
              <div>
                <p className="font-bold text-xs sm:text-sm">Original Box</p>
                <p className="text-xs text-gray-600">
                  {product.originalBox ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {/* Free Items */}
          {product.freeItems && product.freeItems.length > 0 && (
            <>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                🎁 Free Items Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {product.freeItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-gradient-to-r from-yellow-50 to-orange-50 p-2 rounded"
                  >
                    <span className="text-green-600">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto pt-4 sm:pt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-[1.02]"
              disabled={!product.inStock}
            >
              <ShoppingCart size={18} />
              {product.inStock ? (isInCart ? 'Add More' : 'Add to Cart') : 'Out of Stock'}
            </button>
            <button className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors text-sm sm:text-base">
              Contact Us
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Buy Now
            </button>
            <button className="px-4 sm:px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base">
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