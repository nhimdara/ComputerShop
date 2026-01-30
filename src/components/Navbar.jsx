import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  Heart,
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  Globe,
  CheckCircle,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
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
  const {
    getTotalItems,
    getTotalPrice,
    notification,
    cartItems,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const [lang, setLang] = useState(
    () => localStorage.getItem("language") || "en",
  );
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
    MSI: ["Titan", "Cyborg", "Katana", "Bravo", "Crosshair", "Sword", "Vector"],
    Lenovo: ["Legion", "ThinkPad", "LOQ", "Slim", "IdeaPad"],
    Dell: ["Vostro", "Latitude", "XPS", "Inspiron", "Alienware", "Gaming"],
    MacBook: ["MacBook Pro", "MacBook Air"],
  };

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "km", name: "ភាសាខ្មែរ", flag: "🇰🇭" },
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to card section function
  const scrollToCards = () => {
    setTimeout(() => {
      const cardSection = document.querySelector('.card-section');
      if (cardSection) {
        cardSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100); // Small delay to allow page render
  };

  // Reset all filters and scroll to top
  const resetToHome = () => {
    setActiveBrand(null);
    setSearchQuery("");
    setShowSearchResults(false);
    setSearchOpen(false);
    
    // Close all menus
    setIsDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
    
    // Scroll to top
    scrollToTop();
    
    // Dispatch custom event to notify HomePage to reset filters
    window.dispatchEvent(new CustomEvent('resetFilters'));
  };

  // Handle logo click - navigate to home and scroll to top
  const handleLogoClick = (e) => {
    e.preventDefault();
    resetToHome();
    navigate("/", { replace: true });
  };

  // Handle home link click
  const handleHomeClick = (e) => {
    e.preventDefault();
    resetToHome();
    navigate("/", { replace: true });
  };

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
          laptop.brand?.toLowerCase().includes(lowerQuery),
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
    scrollToTop();
  };

  const handleLanguageChange = (code) => {
    setLang(code);
    localStorage.setItem("language", code);
    setShowLangMenu(false);
  };

  // Navigate with brand filter and scroll to cards
  const handleBrandClick = (brand) => {
    setIsDropdownOpen(false);
    setActiveBrand(null);
    setMobileMenuOpen(false);
    navigate(`/?brand=${encodeURIComponent(brand)}`);
    // Scroll to card section after navigation
    setTimeout(() => {
      scrollToCards();
    }, 100);
  };

  // Navigate with brand and series filter and scroll to cards
  const handleSeriesClick = (brand, series) => {
    setIsDropdownOpen(false);
    setActiveBrand(null);
    setMobileMenuOpen(false);
    navigate(
      `/?brand=${encodeURIComponent(brand)}&series=${encodeURIComponent(series)}`,
    );
    // Scroll to card section after navigation
    setTimeout(() => {
      scrollToCards();
    }, 100);
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity);
      }
    }
  };

  // Handle search submission (Enter key or clicking away)
  const handleSearchSubmit = () => {
    if (searchQuery.trim().length >= 2 && searchResults.length > 0) {
      // If there are search results, navigate to home with search query
      setSearchOpen(false);
      setShowSearchResults(false);
      
      // Navigate to home and scroll to cards
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      
      // Scroll to card section
      setTimeout(() => {
        scrollToCards();
      }, 100);
    }
  };

  // Handle Enter key in search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <>
      {/* Cart Notification Toast */}
      {notification && (
        <div className="fixed top-20 sm:top-24 right-2 sm:right-4 z-[100] animate-slideInRight w-[calc(100%-1rem)] sm:w-auto max-w-sm">
          <div className="bg-white rounded-lg shadow-2xl border-l-4 border-green-500 p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0">
              <CheckCircle className="text-green-500" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 mb-1 text-sm sm:text-base">
                {notification.message}
              </p>
              {notification.product && (
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={notification.product.image}
                    alt={notification.product.model}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0"
                  />
                  <div className="text-xs text-gray-600 min-w-0">
                    <p className="font-semibold truncate">
                      {notification.product.model}
                    </p>
                    <p className="text-green-600 font-bold">${notification.product.price}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-gradient-to-r from-[#081b29] via-[#0b2438] to-[#0f2a42] shadow-lg shadow-cyan-500/20" 
            : "bg-gradient-to-r from-[#081b29] via-[#0b2438] to-[#0f2a42] backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex-shrink-0 transition-transform hover:scale-105"
          >
            <img src={logo} alt="Logo" className="h-10 sm:h-12 md:h-16 lg:h-20" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-6 xl:gap-8 items-center flex-1 justify-center">
            <a
              href="/"
              onClick={handleHomeClick}
              className="font-medium text-white hover:text-cyan-400 transition-colors relative group"
            >
              {t.home}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </a>

            {/* Models Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 font-medium text-white hover:text-cyan-400 transition-colors"
              >
                {t.models}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[#0f2a42] shadow-2xl shadow-cyan-500/30 rounded-xl border border-cyan-500/30 overflow-hidden animate-slideDown">
                  {Object.entries(brands).map(([brand, series]) => (
                    <div key={brand} className="border-b border-cyan-500/20 last:border-b-0">
                      <button
                        onClick={() =>
                          setActiveBrand(activeBrand === brand ? null : brand)
                        }
                        className="w-full text-left px-5 py-3 hover:bg-cyan-500/10 flex justify-between items-center transition-all group"
                      >
                        <span className="font-semibold text-white group-hover:text-cyan-400">
                          {brand}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-cyan-400 transition-transform duration-200 ${
                            activeBrand === brand ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeBrand === brand && (
                        <div className="bg-[#081b29] px-5 py-2 animate-slideDown">
                          {series.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleSeriesClick(brand, s)}
                              className="block w-full text-left py-2 px-3 text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded transition-all"
                            >
                              {s}
                            </button>
                          ))}
                          <button
                            onClick={() => handleBrandClick(brand)}
                            className="block w-full text-left py-2 px-3 text-sm font-medium text-cyan-400 hover:bg-cyan-500/10 rounded transition-all mt-1"
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
              onClick={scrollToTop}
              className="font-medium text-white hover:text-cyan-400 transition-colors relative group"
            >
              {t.about}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </Link>

            <Link
              to="/contact"
              onClick={scrollToTop}
              className="font-medium text-white hover:text-cyan-400 transition-colors relative group"
            >
              {t.contact}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              {searchOpen ? (
                <div className="relative">
                  <input
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border-2 border-cyan-400 bg-[#0f2a42] text-white rounded-full px-3 sm:px-4 py-1.5 w-32 sm:w-48 md:w-64 focus:outline-none focus:border-cyan-300 transition-all text-sm sm:text-base placeholder-gray-400"
                    placeholder={t.searchPlaceholder}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {searchQuery.trim().length >= 2 && (
                      <Search
                        onClick={handleSearchSubmit}
                        className="cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors"
                        size={16}
                      />
                    )}
                    <X
                      size={18}
                      className="cursor-pointer text-gray-400 hover:text-white"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <Search
                  onClick={() => setSearchOpen(true)}
                  className="cursor-pointer text-white hover:text-cyan-400 transition-colors"
                  size={25}
                />
              )}

              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full right-0 w-72 sm:w-80 bg-[#0f2a42] shadow-2xl shadow-cyan-500/30 rounded-xl mt-2 border border-cyan-500/30 overflow-hidden max-h-96 overflow-y-auto animate-slideDown">
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2 font-semibold text-sm text-white border-b border-cyan-500/30">
                    {t.searchResultsTitle}
                  </div>
                  {searchResults.map((laptop) => (
                    <div
                      key={laptop.id}
                      onClick={() => selectResult(laptop)}
                      className="p-3 hover:bg-cyan-500/10 cursor-pointer flex gap-3 items-center border-b border-cyan-500/10 last:border-b-0 transition-all group"
                    >
                      <img
                        src={laptop.image}
                        className="w-12 h-12 object-cover rounded-lg shadow-sm group-hover:shadow-md group-hover:shadow-cyan-500/30 transition-shadow"
                        alt={laptop.model}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white group-hover:text-cyan-400">
                          {laptop.model}
                        </div>
                        <div className="text-xs text-gray-400">
                          ${laptop.price} • {laptop.brand}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 border-t border-cyan-500/30 bg-[#081b29]">
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full text-center py-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded transition-all"
                    >
                      View all {searchResults.length} results →
                    </button>
                  </div>
                </div>
              )}

              {showSearchResults &&
                searchResults.length === 0 &&
                searchQuery.trim().length >= 2 && (
                  <div className="absolute top-full right-0 w-72 sm:w-80 bg-[#0f2a42] shadow-2xl shadow-cyan-500/30 rounded-xl mt-2 border border-cyan-500/30 p-4 text-center text-gray-400 text-sm">
                    {t.noResults.replace("{query}", searchQuery)}
                  </div>
                )}
            </div>

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <Globe
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="cursor-pointer text-white hover:text-cyan-400 transition-colors"
                size={25}
              />
              {showLangMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#0f2a42] shadow-2xl shadow-cyan-500/30 rounded-xl border border-cyan-500/30 overflow-hidden animate-slideDown">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-cyan-500/10 transition-all ${
                        lang === language.code
                          ? "bg-cyan-500/20 text-cyan-400 font-semibold"
                          : "text-white"
                      }`}
                    >
                      <span className="text-2xl">{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Heart Icon */}
            <Heart
              className="cursor-pointer text-white hover:text-red-400 transition-colors"
              size={25}
            />

            {/* Cart with Dropdown */}
            <div className="relative" ref={cartRef}>
              <ShoppingCart
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className={`cursor-pointer text-white hover:text-cyan-400 transition-all ${
                  cartBounce ? "animate-bounce-cart" : ""
                }`}
                size={25}
              />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-scale-in shadow-lg shadow-cyan-500/50">
                  {getTotalItems()}
                </span>
              )}

              {/* Cart Dropdown */}
              {showCartDropdown && (
                <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-[#0f2a42] shadow-2xl shadow-cyan-500/30 rounded-xl border border-cyan-500/30 overflow-hidden animate-slideDown max-h-[80vh] sm:max-h-[600px] flex flex-col">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-3">
                    <h3 className="font-bold text-lg">{t.myCart}</h3>
                    <p className="text-sm opacity-90">
                      {getTotalItems()} items
                    </p>
                  </div>

                  {/* Cart Items */}
                  {cartItems.length === 0 ? (
                    <div className="p-8 text-center">
                      <ShoppingCart
                        className="mx-auto mb-4 text-gray-500"
                        size={48}
                      />
                      <p className="text-gray-400 mb-4">{t.emptyCart}</p>
                      <button
                        onClick={() => {
                          setShowCartDropdown(false);
                          resetToHome();
                          navigate("/", { replace: true });
                        }}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-colors shadow-lg shadow-cyan-500/30"
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
                            className="flex gap-3 p-3 bg-[#081b29] rounded-lg hover:bg-cyan-500/10 transition-colors border border-cyan-500/20"
                          >
                            <img
                              src={item.image}
                              alt={item.model}
                              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-white mb-1 line-clamp-1">
                                {item.model}
                              </h4>
                              <p className="text-xs text-gray-400 mb-2">
                                {item.brand}
                              </p>
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-cyan-400 text-sm sm:text-base">
                                  ${item.price}
                                </span>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(item.id, -1)
                                    }
                                    className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors text-white"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="w-8 text-center font-semibold text-white text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleQuantityChange(item.id, 1)
                                    }
                                    className="w-6 h-6 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white flex items-center justify-center transition-colors shadow-lg shadow-cyan-500/30"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors p-1 flex-shrink-0"
                              title={t.remove}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="border-t border-cyan-500/30 p-4 bg-[#081b29]">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-semibold text-white">
                            {t.total}:
                          </span>
                          <span className="text-2xl font-bold text-cyan-400">
                            ${getTotalPrice().toFixed(2)}
                          </span>
                        </div>
                        <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40">
                          {t.checkout}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* User Icon */}
            <User
              className="cursor-pointer text-white hover:text-cyan-400 transition-colors"
              size={25}
            />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden mobile-menu-button ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="text-white" size={24} />
              ) : (
                <Menu className="text-white" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden bg-gradient-to-b from-[#0b2438] to-[#081b29] border-t border-cyan-500/30 shadow-lg animate-slideDown"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              <a
                href="/"
                onClick={handleHomeClick}
                className="block w-full text-left py-3 px-4 rounded-lg hover:bg-cyan-500/10 font-medium text-white hover:text-cyan-400 transition-all"
              >
                {t.home}
              </a>

              {/* Mobile Models Dropdown */}
              <div>
                <button
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  className="w-full flex items-center justify-between py-3 px-4 rounded-lg hover:bg-cyan-500/10 font-medium text-white hover:text-cyan-400 transition-all"
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
                          className="w-full text-left py-2 px-4 rounded-lg hover:bg-cyan-500/10 font-medium text-white flex justify-between items-center"
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
                                className="block w-full text-left py-2 px-4 text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg"
                              >
                                {s}
                              </button>
                            ))}
                            <button
                              onClick={() => handleBrandClick(brand)}
                              className="block w-full text-left py-2 px-4 text-sm font-medium text-cyan-400 hover:bg-cyan-500/10 rounded-lg mt-2"
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
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToTop();
                }}
                className="block py-3 px-4 rounded-lg hover:bg-cyan-500/10 font-medium text-white hover:text-cyan-400 transition-all"
              >
                {t.about}
              </Link>

              <Link
                to="/contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToTop();
                }}
                className="block py-3 px-4 rounded-lg hover:bg-cyan-500/10 font-medium text-white hover:text-cyan-400 transition-all"
              >
                {t.contact}
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-16 sm:h-20" />

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
          0%,
          100% {
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

        /* Custom scrollbar for cart dropdown */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #081b29;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #22d3ee;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #06b6d4;
        }
      `}</style>
    </>
  );
};

export default Navbar;