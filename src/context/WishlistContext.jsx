import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));

  // Listen to storage changes (other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
      setUser(currentUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Load wishlist whenever user changes
  useEffect(() => {
    if (user) {
      const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];
      setWishlist(savedWishlist);
    } else {
      setWishlist([]); // Clear instantly on logout
    }
  }, [user]);

  // Save helper
  const save = (updatedWishlist) => {
    setWishlist(updatedWishlist);
    if (user) localStorage.setItem(`wishlist_${user.email}`, JSON.stringify(updatedWishlist));
  };

  // Add item
  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) save([...wishlist, product]);
  };

  // Remove item
  const removeFromWishlist = (id) => save(wishlist.filter((item) => item.id !== id));

  // Clear wishlist instantly
  const clearWishlist = () => save([]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, wishlistCount: wishlist.length, addToWishlist, removeFromWishlist, clearWishlist, setUser }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
