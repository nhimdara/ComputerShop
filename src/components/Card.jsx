import React from "react";
import { useNavigate } from "react-router-dom";
import { asusLaptops } from "../components/Data1";

const Card = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {asusLaptops.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image Section */}
            <div className="w-full h-100 overflow-hidden bg-gray-100">
              <img
                src={p.image}
                alt={p.model}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="p-4">
              {/* Stock Status & Price */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    p.inStock
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {p.inStock ? "In Stock" : "Out of Stock"}
                </span>
                <span className="text-2xl font-bold text-gray-600">
                  ${p.price}
                </span>
              </div>

              <hr className="my-2" />

              {/* Title */}
              <p className="text-lg font-bold pt-2 mb-3 line-clamp-2 min-h-[56px]">
                {p.model}
              </p>

              {/* Specs */}
              <div className="text-sm font-semibold space-y-1 mb-4">
                <p className="truncate">
                  <span className="font-bold">CPU:</span> {p.specs.cpu} ({p.specs.maxSpeed})
                </p>
                <p>
                  <span className="font-bold">RAM:</span> {p.specs.ram}
                </p>
                <p>
                  <span className="font-bold">Storage:</span> {p.specs.storage}
                </p>
                <p>
                  <span className="font-bold">GPU:</span> {p.specs.gpu}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => navigate(`/detail/${p.id}`)}
                className="w-full rounded-lg bg-blue-600 text-white py-2.5 font-bold hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!p.inStock}
              >
                {p.inStock ? "View Detail" : "Out of Stock"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;