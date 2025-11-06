import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; 

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));

  // ✅ Listen to login/logout changes from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
      setUser(currentUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Load wishlist when the user changes
  useEffect(() => {
    if (user) {
      const savedWishlist =
        JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];
      setWishlist(savedWishlist);
    } else {
      setWishlist([]);
    }
  }, [user]);

  const save = (updatedWishlist) => {
    setWishlist(updatedWishlist);
    if (user) {
      localStorage.setItem(
        `wishlist_${user.email}`,
        JSON.stringify(updatedWishlist)
      );
    }
  };

  // ✅ Add item to wishlist with toast
  const addToWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      toast.info("Already in wishlist!", { autoClose: 1000 });
      return;
    }

    save([...wishlist, product]);
    toast.success("Added to wishlist!", { autoClose: 1000 });
  };

  const removeFromWishlist = (id) => {
    save(wishlist.filter((item) => item.id !== id));
  };

  // ✅ FIXED — clears UI + clears saved wishlist in localStorage
  const clearWishlist = () => {
    setWishlist([]);
    if (user) {
      localStorage.removeItem(`wishlist_${user.email}`);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        setUser,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
