import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Others from "./pages/Contact";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Shipping from "./pages/Shipping";
import ProtectedRoute from "./components/ProtectedRoute";

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
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Others />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Account" element={<Account />} />

              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <ToastContainer
            position="top-right"
            autoClose={1000}
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
