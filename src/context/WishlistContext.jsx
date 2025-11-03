import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);

  // ✅ Load count initially
  useEffect(() => {
    updateWishlistCount();
  }, []);

  // ✅ Update wishlist count based on logged-in user
  const updateWishlistCount = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const allWishlists = JSON.parse(localStorage.getItem("wishlistData")) || {};
      const userWishlist = allWishlists[user.email] || [];
      setWishlistCount(userWishlist.length);
    } else {
      setWishlistCount(0);
    }
  };

  // ✅ Add to wishlist
  const addToWishlist = (product) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please log in to add to wishlist");
      return;
    }

    const allWishlists = JSON.parse(localStorage.getItem("wishlistData")) || {};
    const userWishlist = allWishlists[user.email] || [];

    const exists = userWishlist.some((item) => item.id === product.id);
    if (!exists) {
      userWishlist.push(product);
      allWishlists[user.email] = userWishlist;
      localStorage.setItem("wishlistData", JSON.stringify(allWishlists));
      setWishlistCount(userWishlist.length);
    }
  };

  // ✅ Remove from wishlist
  const removeFromWishlist = (productId) => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    const allWishlists = JSON.parse(localStorage.getItem("wishlistData")) || {};
    const userWishlist = allWishlists[user.email] || [];

    const updatedWishlist = userWishlist.filter((item) => item.id !== productId);
    allWishlists[user.email] = updatedWishlist;
    localStorage.setItem("wishlistData", JSON.stringify(allWishlists));
    setWishlistCount(updatedWishlist.length);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        updateWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom hook for easy access
export const useWishlist = () => useContext(WishlistContext);
