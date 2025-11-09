import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Payment from "./pages/Payment";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Shipping from "./pages/Shipping";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Admin imports
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";

// ✅ FIXED wrong import
import AdminUsers from "./pages/Admin/AdminUserDetails";

import AdminUserDetails from "./pages/Admin/AdminUserDetails";
import AdminHome from "./pages/Admin/AdminHome";
import AdminOrders from "./pages/Admin/AdminOrders";

import { AdminProvider } from "./pages/Admin/context/AdminContext";

// ✅ Handles navbar hide logic
function AppContent() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/account";

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products category="Products" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />

        {/* ✅ Admin Routes (NO protection now) */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<AdminUserDetails />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* Protected User Routes */}
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
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AdminProvider>
          <Router>
            <AppContent />
          </Router>
        </AdminProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
