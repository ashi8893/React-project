import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const [lastToast, setLastToast] = useState(""); // ✅ Prevent duplicate toast

  // ✅ Fetch products
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // ✅ Load logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  // ✅ Load wishlist for this user
  useEffect(() => {
    if (loggedInUser) {
      const allWishlists =
        JSON.parse(localStorage.getItem("wishlistData")) || {};
      setWishlist(allWishlists[loggedInUser.email] || []);
    }
  }, [loggedInUser]);

  // ✅ Save wishlist for this user
  useEffect(() => {
    if (loggedInUser) {
      const allWishlists =
        JSON.parse(localStorage.getItem("wishlistData")) || {};
      allWishlists[loggedInUser.email] = wishlist;
      localStorage.setItem("wishlistData", JSON.stringify(allWishlists));
      window.dispatchEvent(new Event("wishlistCountUpdated")); // update Navbar instantly
    }
  }, [wishlist, loggedInUser]);

  // ✅ Filter logic
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (priceRange !== "all") {
      filtered = filtered.filter((p) => {
        if (priceRange === "under-500") return p.price < 500;
        if (priceRange === "500-1000") return p.price >= 500 && p.price <= 1000;
        if (priceRange === "above-1000") return p.price > 1000;
        return true;
      });
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, priceRange, searchTerm]);

  // ✅ Add or remove wishlist (fixed double toast + login redirect)
  const toggleWishlist = (product) => {
    if (!loggedInUser) {
      if (lastToast !== "login") {
        toast.warning("Please log in to add items to your wishlist.", { autoClose: 1000 });
        setLastToast("login");
        setTimeout(() => {
          navigate("/login");
          setLastToast(""); // reset
        }, 1200);
      }
      return;
    }

    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        if (lastToast !== "removed") {
          // toast.info(`${product.name} removed from wishlist.`, { autoClose: 1000 });
          setLastToast("removed");
          setTimeout(() => setLastToast(""), 1000);
        }
        return prev.filter((item) => item.id !== product.id);
      } else {
        // if (lastToast !== "added") {
        //    toast.success(`${product.name} added to wishlist!`, { autoClose: 1000 });
        //   // setLastToast("added");
        //   setTimeout(() => setLastToast(""), 1000);
        // }
        return [
          ...prev,
          { ...product, addedDate: new Date().toISOString(), type: "wishlist" },
        ];
      }
    });
  };

  // ✅ Add to cart (unchanged, uses toast)
  const addToMyCars = (product) => {
    if (!loggedInUser) {
      toast.warning("Please log in before adding items to your cart.", { autoClose: 1000 });
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    const savedCars = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyInCart = savedCars.some((item) => item.id === product.id);

    if (alreadyInCart) {
      toast.info(`${product.name} is already in your cart!`, { autoClose: 1000 });
      navigate("/cart");
      return;
    }

    const updatedCart = [
      ...savedCars,
      { ...product, addedDate: new Date().toISOString() },
    ];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success(`${product.name} added to your cart!`, { autoClose: 1000 });
    navigate("/cart");
  };

  // ✅ Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  const getPageNumbers = () => {
    const max = 5;
    const pages = [];

    if (totalPages <= max) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
    return pages;
  };

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const isInWishlist = (id) => wishlist.some((i) => i.id === id);

  return (
    <>
      <div className="bg-gray-100 py-10 px-6 sm:px-10 lg:px-20 min-h-screen">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-tight text-orange-700">
          Hot Wheels
        </h1>

        {/* Filters */}
        <div className="mb-8 bg-gray-100 p-6 rounded-lg">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800"
                >
                  <option value="all">All Prices</option>
                  <option value="under-500">Under ₹500</option>
                  <option value="500-1000">₹500 - ₹1000</option>
                  <option value="above-1000">Above ₹1000</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange("all");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-600 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {currentProducts.length > 0 ? (
            currentProducts.map((p) => {
              const liked = isInWishlist(p.id);
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden w-80 mx-auto flex flex-col"
                >
                  <div className="w-full h-80 overflow-hidden relative group">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between text-center">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {p.name}
                      </h2>
                      <p className="text-gray-900 font-bold text-lg mb-1">
                        ₹{p.price}
                      </p>

                      {p.stock > 0 ? (
                        <p className="text-green-600 font-medium mb-4">
                          In Stock ({p.stock} left)
                        </p>
                      ) : (
                        <p className="text-red-600 font-medium mb-4">
                          Out of Stock
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="p-2 transition"
                        title={
                          liked ? "Remove from Wishlist" : "Add to Wishlist"
                        }
                      >
                        <FaHeart
                          className={`text-2xl ${
                            liked
                              ? "text-red-500"
                              : "text-gray-400 hover:text-red-400"
                          }`}
                        />
                      </button>

                      <button
                        onClick={() =>
                          p.stock > 0
                            ? addToMyCars(p)
                            : toast.error("Out of stock!", { autoClose: 1000 })
                        }
                        disabled={p.stock <= 0}
                        className={`flex-1 py-2 rounded-lg transition ${
                          p.stock > 0
                            ? "bg-orange-700 text-white hover:bg-orange-600"
                            : "bg-gray-400 text-white cursor-not-allowed"
                        }`}
                      >
                        {p.stock > 0 ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-xl text-gray-600">
                No products found matching your filters.
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
              }`}
            >
              <SlArrowLeft />

            </button>

            {getPageNumbers().map((num, i) => (
              <button
                key={i}
                onClick={() => typeof num === "number" && paginate(num)}
                disabled={num === "..."}
                className={`px-4 py-2 rounded-md ${
                  currentPage === num
                    ? "bg-[#FD5600] text-white"
                    : num === "..."
                    ? "bg-transparent text-gray-500 cursor-default"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              <SlArrowRight />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Products;





