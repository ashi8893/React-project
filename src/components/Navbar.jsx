import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeartIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const OrderIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Electronics", path: "/electronics" },
    { name: "Fashion", path: "/fashion" },
    { name: "Home & Garden", path: "/home-garden" },
  ];

  const iconItems = [
    { icon: <HeartIcon />, name: "Wishlist", count: 3, path: "/wishlist" },
    { icon: <UserIcon />, name: "Account", count: 1, path: "/account" },
    { icon: <CartIcon />, name: "Cart", count: 5, path: "/cart" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="w-full px-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 pl-4">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Fly Wheels
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition duration-300"
              >
                <SearchIcon />
              </button>
            </form>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {iconItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className="flex items-center justify-center w-10 h-10 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition duration-300"
                  title={item.name}
                >
                  {item.icon}
                  {item.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </Link>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="relative">
              <Link
                to="/cart"
                className="p-2 text-gray-700 hover:text-purple-600"
              >
                <CartIcon />
              </Link>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                5
              </span>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-purple-600"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <div className="border-t border-gray-200 pt-2">
              {iconItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md text-base font-medium transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                  {item.count > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;