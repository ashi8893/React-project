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
import Login from "./pages/login";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastContainer } from "react-toastify";
import Payment from './pages/Payment'

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/Products"
                element={<Products category="Products" />}
              />
              
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/About" element={<About />} />
              <Route path="/Others" element={<Others />} />
              <Route path="/Account" element={<Account />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
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
