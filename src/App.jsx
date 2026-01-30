// In App.js
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Card from "./components/Card";
import Detail from "./components/Detail";
import { CartProvider } from "./context/CartContext";
import Contact from "./components/Contect";
import AboutUs from "./components/AboutUs";

// Create a wrapper component to pass search params
const HomePage = () => {
  const location = useLocation();
  const [brand, setBrand] = useState(null);
  const [series, setSeries] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  // Initialize from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlBrand = searchParams.get('brand');
    const urlSeries = searchParams.get('series');
    const urlSearch = searchParams.get('search');
    
    setBrand(urlBrand);
    setSeries(urlSeries);
    setSearchQuery(urlSearch);
  }, [location.search]);

  // Listen for reset event
  useEffect(() => {
    const handleResetFilters = () => {
      setBrand(null);
      setSeries(null);
      setSearchQuery(null);
    };

    window.addEventListener('resetFilters', handleResetFilters);
    
    return () => {
      window.removeEventListener('resetFilters', handleResetFilters);
    };
  }, []);

  return (
    <>
      <Banner />
      <div className="card-section">
        <Card selectedBrand={brand} selectedSeries={series} searchQuery={searchQuery} />
      </div>
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;