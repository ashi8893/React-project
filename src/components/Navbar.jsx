import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

// ======================
// ICON COMPONENTS (Kept the essential ones)
// ======================

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CartIcon = ({ count }) => (
  <div className="relative">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    {/* Simple hardcoded badge for Cart */}
    {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {count}
        </span>
    )}
  </div>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ======================
// MAIN NAVBAR COMPONENT
// ======================

const Navbar = () => {
  // Only state needed is for the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper function to close the menu
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // navigation helper for logout
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear common auth keys (token/user) from localStorage
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (e) {
      // ignore localStorage errors
    }
    // navigate to login page
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between h-16">

          {/* 1. Logo */}
          <Link to="/" className="text-xl font-extrabold text-orange-700 hover:text-indigo-900 transition duration-300">
            Fly Wheels  
          </Link>

          {/* 2. Desktop Navigation Links (Hardcoded, no .map()) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200">
              Home
            </Link>
            <Link to="/Products" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200">
              Products
            </Link>
            <Link to="/About" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200">
              About
            </Link>
            <Link to="/Others" className="text-gray-700 hover:text-indigo-600 font-medium transition duration-200">
              Contact
            </Link>
          </div>

          {/* 3. Desktop Icons (Hardcoded, no .map()) */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Wishlist Icon */}
            <Link 
                to="/wishlist" 
                className="p-2 text-gray-700 hover:text-red-500 hover:bg-gray-100 rounded-full transition duration-200"
                title="Wishlist"
            >
                <HeartIcon />
            </Link>

            {/* Account Icon */}
            <Link 
                to="/account" 
                className="p-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition duration-200"
                title="Account"
            >
                <UserIcon />
            </Link>

            {/* Cart Icon (with count passed as prop) */}
            <Link 
                to="/cart" 
                className="p-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition duration-200"
                title="Cart"
            >
                <CartIcon count={5} />
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition duration-200"
              title="Logout"
            >
              Logout
            </button>

          </div>

          {/* 4. Mobile Button & Cart */}
          <div className="md:hidden flex items-center space-x-3">
            
            {/* Mobile Cart Icon */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600">
                <CartIcon count={5} />
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-indigo-600 rounded-full transition duration-200"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Menu Dropdown (Hardcoded) */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            
            {/* Nav Links */}
            <Link to="/" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition duration-150">
              Home
            </Link>
            <Link to="/Products" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition duration-150">
              Products
            </Link>
            <Link to="/Cars" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition duration-150">
              About
            </Link>
            <Link to="/Others" onClick={closeMobileMenu} className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition duration-150">
              Contact
            </Link>
            
            {/* Icon Links (Full Text) */}
            <div className="border-t border-gray-200 pt-2 space-y-1">
                <Link to="/wishlist" onClick={closeMobileMenu} className="flex items-center px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-indigo-50 rounded-md font-medium">
                    <span className="mr-3"><HeartIcon /></span> Wishlist (3)
                </Link>
                <Link to="/account" onClick={closeMobileMenu} className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium">
                    <span className="mr-3"><UserIcon /></span> Account
                </Link>
                <Link to="/cart" onClick={closeMobileMenu} className="flex items-center px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md font-medium">
                    <span className="mr-3"><CartIcon count={0} /></span> Cart (5)
                </Link>
                
        {/* Mobile Logout */}
        <button
          onClick={() => { handleLogout(); closeMobileMenu(); }}
          className="w-full text-left px-3 py-2 text-gray-700 hover:text-white hover:bg-red-500 rounded-md font-medium transition duration-150"
        >
          Logout
        </button>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
