import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [loggedInUser, setLoggedInUser] = useState(null); // ✅ check login

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  // ✅ Load login status
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Apply filters
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-500":
          filtered = filtered.filter((product) => product.price < 500);
          break;
        case "500-1000":
          filtered = filtered.filter(
            (product) => product.price >= 500 && product.price <= 1000
          );
          break;
        case "above-1000":
          filtered = filtered.filter((product) => product.price > 1000);
          break;
        default:
          break;
      }
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, priceRange, searchTerm]);

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some(
        (item) => item.id === product.id
      );

      let updatedWishlist;

      if (isAlreadyInWishlist) {
        updatedWishlist = prevWishlist.filter((item) => item.id !== product.id);
      } else {
        updatedWishlist = [
          ...prevWishlist,
          { ...product, addedDate: new Date().toISOString(), type: "wishlist" },
        ];
      }

      return updatedWishlist;
    });
  };

  // ✅ Add to My Cars only if logged in
  const addToMyCars = (product) => {
    if (!loggedInUser) {
      alert("Please log in or register before adding items to cart.");
      return;
    }

    const savedCars = JSON.parse(localStorage.getItem("myCars")) || [];
    const carExists = savedCars.some((car) => car.id === product.id);

    if (!carExists) {
      const updatedCars = [
        ...savedCars,
        { ...product, addedDate: new Date().toISOString() },
      ];
      localStorage.setItem("myCars", JSON.stringify(updatedCars));
      alert(`${product.name} added to your cart!`);
    } else {
      alert(`${product.name} is already in your cart!`);
    }
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pageNumbers.push(i);
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      pageNumbers.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return pageNumbers;
  };

  return (
    <div className="bg-gray-100 py-10 px-6 sm:px-10 lg:px-20 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-tight text-orange-700">
        Hot Wheels
      </h1>

      {/* Filters */}
      <div className="mb-8 bg-gray-100 p-6 rounded-lg ">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            <div className="w-85">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-85">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="under-500">Under ₹500</option>
                <option value="500-1000">₹500 - ₹1000</option>
                <option value="above-1000">Above ₹1000</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center items-center">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setPriceRange("all");
              setSearchTerm("");
            }}
            className="px-4 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-600 transition duration-300"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            const isLiked = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden w-80 mx-auto flex flex-col justify-between"
              >
                <div className="w-full h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow justify-between text-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      {product.category}
                    </p>
                    <p className="text-gray-900 font-bold text-xl mb-4">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="p-2 transition duration-300"
                      title={
                        isLiked ? "Remove from Wishlist" : "Add to Wishlist"
                      }
                    >
                      <FaHeart
                        className={
                          isLiked
                            ? "text-red-500 text-2xl"
                            : "text-gray-400 text-2xl hover:text-red-400"
                        }
                      />
                    </button>

                    {/* ✅ Add to Cart only if logged in */}
                    {loggedInUser ? (
                      <button
                        onClick={() => addToMyCars(product)}
                        className="flex-1 bg-orange-700 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          alert("Please log in to add products to your cart.")
                        }
                        className="flex-1 bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                      >
                        Login to Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-xl text-gray-600">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <div className="flex justify-center items-center space-x-2 mb-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            } transition duration-300`}
          >
            Previous
          </button>

          {getPageNumbers().map((number, index) => (
            <button
              key={index}
              onClick={() => typeof number === "number" && paginate(number)}
              disabled={number === "..."}
              className={`px-4 py-2 rounded-md ${
                currentPage === number
                  ? "bg-[#FD5600] text-white"
                  : number === "..."
                  ? "bg-transparent text-gray-500 cursor-default"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition duration-300`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            } transition duration-300`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
