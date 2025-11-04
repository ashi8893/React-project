import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import SearchResults from "./components/SearchResults";
import About from "./pages/About";
import Others from "./pages/Contact";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Shipping from "./pages/Shipping";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products category="Products" />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/about" element={<About />} />
              <Route path="/others" element={<Others />} />
              <Route path="/account" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </div>

          {/* ✅ ToastContainer (Only one, fast & centered) */}
          <ToastContainer
            position="top-right"
            autoClose={1000}        // ⏱️ Toast closes in 1 second
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
