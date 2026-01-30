import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { asusLaptops } from "../components/Data1";

const Card = ({ selectedBrand, selectedSeries, searchQuery }) => {
  const navigate = useNavigate();
  const [filteredLaptops, setFilteredLaptops] = useState(asusLaptops);
  const [isSearching, setIsSearching] = useState(false);

  // Filter laptops whenever selectedBrand, selectedSeries, or searchQuery changes
  useEffect(() => {
    setIsSearching(false);
    
    let filtered = asusLaptops;
    
    // Apply search filter if searchQuery exists
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(laptop =>
        laptop.model?.toLowerCase().includes(lowerQuery) ||
        laptop.series?.toLowerCase().includes(lowerQuery) ||
        laptop.brand?.toLowerCase().includes(lowerQuery) ||
        laptop.specs?.cpu?.toLowerCase().includes(lowerQuery) ||
        laptop.specs?.gpu?.toLowerCase().includes(lowerQuery)
      );
      setIsSearching(true);
    }
    
    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter(laptop => laptop.brand === selectedBrand);
    }
    
    // Apply series filter
    if (selectedSeries) {
      filtered = filtered.filter(laptop => laptop.series === selectedSeries);
    }
    
    setFilteredLaptops(filtered);
  }, [selectedBrand, selectedSeries, searchQuery]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to this card section
  const scrollToThisSection = () => {
    const element = document.querySelector('.card-section');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Clear filter and scroll to top
  const handleClearFilter = () => {
    // Navigate to home without filters
    navigate('/', { replace: true });
    // Scroll to top
    scrollToTop();
    // Dispatch reset event
    window.dispatchEvent(new CustomEvent('resetFilters'));
  };

  // Clear search only
  const handleClearSearch = () => {
    // Remove search parameter but keep other filters
    const params = new URLSearchParams(window.location.search);
    params.delete('search');
    
    if (params.toString()) {
      navigate(`/?${params.toString()}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
    
    // Scroll to this section
    setTimeout(() => {
      scrollToThisSection();
    }, 100);
  };

  // Display message if no laptops found
  if (filteredLaptops.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-10 py-20 text-center card-section">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          {isSearching 
            ? `No laptops found for "${searchQuery}"`
            : `No laptops found for ${selectedBrand} ${selectedSeries ? `${selectedSeries} series` : ''}`
          }
        </h2>
        <p className="text-gray-500 mb-6">
          Try a different search or selecting a different brand/series from the menu.
        </p>
        <button
          onClick={handleClearFilter}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          View All Laptops
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-8 card-section">
      {/* Search Results Header */}
      {isSearching && (
        <div className="mb-6 p-3 sm:p-4 bg-cyan-50 rounded-lg border border-cyan-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Search Results for: "{searchQuery}"
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {filteredLaptops.length} {filteredLaptops.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            <button
              onClick={handleClearSearch}
              className="text-cyan-600 hover:text-cyan-800 font-medium text-sm sm:text-base"
            >
              Clear Search ×
            </button>
          </div>
        </div>
      )}

      {/* Filter Info - Only show when filters are active */}
      {(selectedBrand || selectedSeries) && !isSearching && filteredLaptops.length > 0 && (
        <div className="mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                Showing: {selectedBrand} {selectedSeries ? `- ${selectedSeries}` : ''}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {filteredLaptops.length} {filteredLaptops.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            <button
              onClick={handleClearFilter}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
            >
              Clear Filter ×
            </button>
          </div>
        </div>
      )}

      {/* Show "All Laptops" header when no filters */}
      {!selectedBrand && !selectedSeries && !isSearching && (
        <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                All Laptops
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {filteredLaptops.length} {filteredLaptops.length === 1 ? 'product' : 'products'} available
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {filteredLaptops.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
          >
            {/* Image Section */}
            <div className="w-full sm:h-40 md:h-40 lg:h-50 overflow-hidden bg-gray-100">
              <img
                src={p.image}
                alt={p.model}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col">
              {/* Brand and Series Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                    {p.brand}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
                    {p.series}
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.inStock
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {p.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Price */}
              <div className="mb-3">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  ${p.price}
                </span>
              </div>

              <hr className="my-2 border-gray-200" />

              {/* Title */}
              <p className="text-base sm:text-lg font-bold pt-2 mb-3 line-clamp-2 min-h-[56px] text-gray-800">
                {p.model}
              </p>

              {/* Specs */}
              <div className="text-xs sm:text-sm font-medium space-y-1 mb-4 flex-1 text-gray-700">
                <p className="truncate">
                  <span className="font-bold text-gray-900">CPU:</span> {p.specs.cpu} ({p.specs.maxSpeed})
                </p>
                <p>
                  <span className="font-bold text-gray-900">RAM:</span> {p.specs.ram}
                </p>
                <p>
                  <span className="font-bold text-gray-900">Storage:</span> {p.specs.storage}
                </p>
                <p>
                  <span className="font-bold text-gray-900">GPU:</span> {p.specs.gpu}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => {
                  navigate(`/detail/${p.id}`);
                  scrollToTop();
                }}
                className="w-full rounded-lg bg-blue-600 text-white py-2.5 text-sm sm:text-base font-bold hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed mt-auto"
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