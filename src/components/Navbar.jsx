import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Heart, ShoppingCart, Search, User, Menu, X, ChevronDown, Globe, CheckCircle, Trash2, Plus, Minus } from "lucide-react";
import { asusLaptops } from "../components/Data1";
import { useCart } from "../context/CartContext";

const translations = {
  en: {
    home: "Home",
    models: "Laptop Models",
    about: "About",
    contact: "Contact",
    searchPlaceholder: "Search laptops...",
    noResults: 'No laptops found for "{query}"',
    searchResultsTitle: "Search Results",
    language: "Language",
    viewAll: "View All",
    myCart: "My Cart",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue Shopping",
    total: "Total",
    checkout: "Checkout",
    remove: "Remove",
  },
  km: {
    home: "ទំព័រដើម",
    models: "គំរូកុំព្យូទ័រយួរដៃ",
    about: "អំពីយើង",
    contact: "ទំនាក់ទំនង",
    searchPlaceholder: "ស្វែងរកកុំព្យូទ័រ...",
    noResults: 'រកមិនឃើញកុំព្យូទ័រសម្រាប់ "{query}"',
    searchResultsTitle: "លទ្ធផលស្វែងរក",
    language: "ភាសា",
    viewAll: "មើលទាំងអស់",
    myCart: "កន្ត្រកទំនិញ",
    emptyCart: "កន្ត្រករបស់អ្នកទទេ",
    continueShopping: "បន្តទិញទំនិញ",
    total: "សរុប",
    checkout: "ទូទាត់",
    remove: "លុបចេញ",
  },
};

const Navbar = () => {
  const navigate = useNavigate();
  const { getTotalItems, getTotalPrice, notification, cartItems, removeFromCart, updateQuantity } = useCart();
  const [lang, setLang] = useState(() => localStorage.getItem("language") || "en");
  const t = translations[lang] || translations.en;

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);

  const dropdownRef = useRef(null);
  const langRef = useRef(null);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const cartRef = useRef(null);

  const brands = {
    ASUS: ["TUF Gaming", "ROG", "Vivobook", "ZenBook"],
    MSI: ["Titan", "Cyborg", "Katana"],
    Lenovo: ["Legion", "ThinkPad", "LOQ"],
    Dell: ["Gaming", "Office", "XPS"],
    MacBook: ["Pro", "Air"],
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "km", name: "ភាសាខ្មែរ", flag: "🇰🇭" },
  ];

  // Trigger cart bounce animation when items change
  useEffect(() => {
    if (getTotalItems() > 0) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 500);
    }
  }, [getTotalItems()]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setActiveBrand(null);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const results = asusLaptops
      .filter(
        (laptop) =>
          laptop.model?.toLowerCase().includes(lowerQuery) ||
          laptop.series?.toLowerCase().includes(lowerQuery) ||
          laptop.brand?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 8);
    setSearchResults(results);
    setShowSearchResults(true);
  };

  const selectResult = (laptop) => {
    navigate(`/detail/${laptop.id}`);
    setSearchOpen(false);
    setShowSearchResults(false);
    setSearchQuery("");
  };

  const handleLanguageChange = (code) => {
    setLang(code);
    localStorage.setItem("language", code);
    setShowLangMenu(false);
  };

  const handleBrandClick = (brand) => {
    setIsDropdownOpen(false);
    setActiveBrand(null);
    console.log(`Navigate to ${brand} laptops`);
  };

  const handleSeriesClick = (brand, series) => {
    setIsDropdownOpen(false);
    setActiveBrand(null);
    setMobileMenuOpen(false);
    console.log(`Navigate to ${brand} ${series}`);
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity);
      }
    }
  };

  return (
    <>
      {/* Cart Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 animate-slideInRight">
          <div className="bg-white rounded-lg shadow-2xl border-l-4 border-green-500 p-4 max-w-sm flex items-start gap-3">
            <div className="flex-shrink-0">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 mb-1">{notification.message}</p>
              {notification.product && (
                <div className="flex items-center gap-2 mt-2">
                  <img 
                    src={notification.product.image} 
                    alt={notification.product.model}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="text-xs text-gray-600">
                    <p className="font-semibold">{notification.product.model}</p>
                    <p>${notification.product.price}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className=" flex-shrink-0 transition-transform hover:scale-105">
            <img src={logo} alt="Logo" className="h-40" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 items-center">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-purple-600 transition-colors relative group"
            >
              {t.home}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </Link>

            {/* Models Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                {t.models}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden animate-slideDown">
                  {Object.entries(brands).map(([brand, series]) => (
                    <div key={brand} className="border-b last:border-b-0">
                      <button
                        onClick={() =>
                          setActiveBrand(activeBrand === brand ? null : brand)
                        }
                        className="w-full text-left px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 flex justify-between items-center transition-all group"
                      >
                        <span className="font-semibold text-gray-800 group-hover:text-purple-600">
                          {brand}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-200 ${
                            activeBrand === brand ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeBrand === brand && (
                        <div className="bg-gray-50 px-5 py-2 animate-slideDown">
                          {series.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleSeriesClick(brand, s)}
                              className="block w-full text-left py-2 px-3 text-sm text-gray-600 hover:text-purple-600 hover:bg-white rounded transition-all"
                            >
                              {s}
                            </button>
                          ))}
                          <button
                            onClick={() => handleBrandClick(brand)}
                            className="block w-full text-left py-2 px-3 text-sm font-medium text-purple-600 hover:bg-white rounded transition-all mt-1"
                          >
                            {t.viewAll} {brand} →
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="font-medium text-gray-700 hover:text-purple-600 transition-colors relative group"
            >
              {t.about}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </Link>

            <Link
              to="/contact"
              className="font-medium text-gray-700 hover:text-purple-600 transition-colors relative group"
            >
              {t.contact}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              {searchOpen ? (
                <div className="relative">
                  <input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border-2 border-purple-500 rounded-full px-4 py-1.5 w-64 focus:outline-none focus:border-purple-600 transition-all"
                    placeholder={t.searchPlaceholder}
                  />
                  <X
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                      setShowSearchResults(false);
                    }}
                  />
                </div>
              ) : (
                <Search
                  onClick={() => setSearchOpen(true)}
                  className="cursor-pointer text-gray-600 hover:text-purple-600 transition-colors"
                  size={22}
                />
              )}

              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full right-0 w-80 bg-white shadow-2xl rounded-xl mt-2 border border-gray-100 overflow-hidden max-h-96 overflow-y-auto animate-slideDown">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 font-semibold text-sm text-gray-700">
                    {t.searchResultsTitle}
                  </div>
                  {searchResults.map((laptop) => (
                    <div
                      key={laptop.id}
                      onClick={() => selectResult(laptop)}
                      className="p-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer flex gap-3 items-center border-b last:border-b-0 transition-all group"
                    >
                      <img
                        src={laptop.image}
                        className="w-12 h-12 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                        alt={laptop.model}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-gray-800 group-hover:text-purple-600">
                          {laptop.model}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${laptop.price} • {laptop.brand}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showSearchResults &&
                searchResults.length === 0 &&
                searchQuery.trim().length >= 2 && (
                  <div className="absolute top-full right-0 w-80 bg-white shadow-2xl rounded-xl mt-2 border border-gray-100 p-4 text-center text-gray-500 text-sm">
                    {t.noResults.replace("{query}", searchQuery)}
                  </div>
                )}
            </div>

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <Globe
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="cursor-pointer text-gray-600 hover:text-purple-600 transition-colors"
                size={22}
              />
              {showLangMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden animate-slideDown">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all ${
                        lang === language.code
                          ? "bg-purple-50 text-purple-600 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-2xl">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User & Cart (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <Heart
                className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
                size={22}
              />
              
              {/* Cart with Dropdown */}
              <div className="relative" ref={cartRef}>
                <ShoppingCart
                  onClick={() => setShowCartDropdown(!showCartDropdown)}
                  className={`cursor-pointer text-gray-600 hover:text-purple-600 transition-all ${
                    cartBounce ? 'animate-bounce-cart' : ''
                  }`}
                  size={22}
                />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-scale-in">
                    {getTotalItems()}
                  </span>
                )}

                {/* Cart Dropdown */}
                {showCartDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-96 bg-white shadow-2xl rounded-xl border border-gray-100 overflow-hidden animate-slideDown max-h-[600px] flex flex-col">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3">
                      <h3 className="font-bold text-lg">{t.myCart}</h3>
                      <p className="text-sm opacity-90">{getTotalItems()} items</p>
                    </div>

                    {/* Cart Items */}
                    {cartItems.length === 0 ? (
                      <div className="p-8 text-center">
                        <ShoppingCart className="mx-auto mb-4 text-gray-300" size={48} />
                        <p className="text-gray-500 mb-4">{t.emptyCart}</p>
                        <button
                          onClick={() => {
                            setShowCartDropdown(false);
                            navigate("/");
                          }}
                          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        >
                          {t.continueShopping}
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <img
                                src={item.image}
                                alt={item.model}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                                  {item.model}
                                </h4>
                                <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-purple-600">
                                    ${item.price}
                                  </span>
                                  
                                  {/* Quantity Controls */}
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleQuantityChange(item.id, -1)}
                                      className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="w-8 text-center font-semibold">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => handleQuantityChange(item.id, 1)}
                                      className="w-6 h-6 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-colors"
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Remove Button */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 transition-colors p-1"
                                title={t.remove}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-gray-700">{t.total}:</span>
                            <span className="text-2xl font-bold text-purple-600">
                              ${getTotalPrice().toFixed(2)}
                            </span>
                          </div>
                          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl">
                            {t.checkout}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <User
                className="cursor-pointer text-gray-600 hover:text-purple-600 transition-colors"
                size={22}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="text-gray-600" size={24} />
              ) : (
                <Menu className="text-gray-600" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-slideDown"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              <Link
                to="/"
                className="block py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 font-medium text-gray-700 hover:text-purple-600 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.home}
              </Link>

              {/* Mobile Models Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 font-medium text-gray-700 hover:text-purple-600 transition-all"
                >
                  {t.models}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {mobileDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-1">
                    {Object.entries(brands).map(([brand, series]) => (
                      <div key={brand}>
                        <button
                          onClick={() =>
                            setActiveBrand(activeBrand === brand ? null : brand)
                          }
                          className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-50 font-medium text-gray-700 flex justify-between items-center"
                        >
                          {brand}
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${
                              activeBrand === brand ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {activeBrand === brand && (
                          <div className="ml-4 mt-1 space-y-1">
                            {series.map((s) => (
                              <button
                                key={s}
                                onClick={() => handleSeriesClick(brand, s)}
                                className="block w-full text-left py-2 px-4 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="block py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 font-medium text-gray-700 hover:text-purple-600 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.about}
              </Link>

              <Link
                to="/contact"
                className="block py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 font-medium text-gray-700 hover:text-purple-600 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.contact}
              </Link>

              <div className="border-t pt-4 mt-4 flex items-center justify-around">
                <Heart
                  className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
                  size={22}
                />
                <div className="relative">
                  <ShoppingCart
                    onClick={() => setShowCartDropdown(!showCartDropdown)}
                    className="cursor-pointer text-gray-600 hover:text-purple-600 transition-colors"
                    size={22}
                  />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
                <User
                  className="cursor-pointer text-gray-600 hover:text-purple-600 transition-colors"
                  size={22}
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20" />

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes bounceCart {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-bounce-cart {
          animation: bounceCart 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;