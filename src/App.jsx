import React from "react";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Card from "./components/Card";
import Detail from "./components/Detail";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Card />
              </>
            }
          />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;