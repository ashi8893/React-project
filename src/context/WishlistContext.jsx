  import React, { createContext, useContext, useState, useEffect } from "react";
  import { toast } from "react-toastify";

  const WishlistContext = createContext();

  export const WishlistProvider = ({ children }) => {
    const [wishlistCount, setWishlistCount] = useState(0);
    const [lastToast, setLastToast] = useState(""); // ✅ Prevent duplicate toasts

    useEffect(() => {
      updateWishlistCount();
    }, []);

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

    // ✅ Add to wishlist (redirect + single toast)
    const addToWishlist = (product, navigate) => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!user) {
        // Prevent same toast appearing twice
        if (lastToast !== "login") {
          toast.warning("Please log in to add to wishlist", { autoClose: 1000 });
          setLastToast("login");
          setTimeout(() => {
            navigate("/login");
            setLastToast(""); // Reset toast tracker
          }, 1200);
        }
        return;
      }

      const allWishlists = JSON.parse(localStorage.getItem("wishlistData")) || {};
      const userWishlist = allWishlists[user.email] || [];

      const exists = userWishlist.some((item) => item.id === product.id);
      if (exists) {
        if (lastToast !== "exists") {
          toast.info(`${product.name} is already in your wishlist`, { autoClose: 1000 });
          setLastToast("exists");
          setTimeout(() => setLastToast(""), 1000);
        }
        return;
      }

      // Add new product
      userWishlist.push(product);
      allWishlists[user.email] = userWishlist;
      localStorage.setItem("wishlistData", JSON.stringify(allWishlists));
      toast.success(`${product.name} added to wishlist!`);
      setWishlistCount(userWishlist.length);

      if (lastToast !== "added") {
        
        // setLastToast("added");
        setTimeout(() => setLastToast(""), 1000);
      }
    };

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

  export const useWishlist = () => useContext(WishlistContext);


//   // ✅ WishlistContext.jsx



// import React, { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [lastToast, setLastToast] = useState("");

//   useEffect(() => {
//     updateWishlistCount();

//     // ✅ Listen to external updates (Products, Wishlist page, Navbar)
//     window.addEventListener("wishlistUpdated", updateWishlistCount);

//     return () =>
//       window.removeEventListener("wishlistUpdated", updateWishlistCount);
//   }, []);

//   const updateWishlistCount = () => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!user) return setWishlistCount(0);

//     const allWishlists = JSON.parse(localStorage.getItem("wishlistData")) || {};
//     const userWishlist = allWishlists[user.email] || [];

//     setWishlistCount(userWishlist.length);
//   };

//   // ✅ Add to wishlist
//   const addToWishlist = (product, navigate) => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));

//     if (!user) {
//       if (lastToast !== "login") {
//         toast.warning("Please log in to add to wishlist", { autoClose: 1200 });
//         setLastToast("login");

//         setTimeout(() => {
//           navigate("/login");
//           setLastToast("");
//         }, 1300);
//       }
//       return;
//     }

//     const allWishlists = JSON.parse(localStorage.getItem("wishlistData")) || {};
//     const userWishlist = allWishlists[user.email] || [];

//     const exists = userWishlist.some((item) => item.id === product.id);

//     if (exists) {
//       if (lastToast !== "exists") {
//         toast.info(`${product.name} is already in wishlist`, {
//           autoClose: 1000,
//         });
//         setLastToast("exists");
//         setTimeout(() => setLastToast(""), 1000);
//       }
//       return;
//     }

//     const newItem = {
//       ...product,
//       addedDate: new Date().toISOString(),
//     };

//     userWishlist.push(newItem);
//     allWishlists[user.email] = userWishlist;

//     localStorage.setItem("wishlistData", JSON.stringify(allWishlists));

//     toast.success(`${product.name} added to wishlist!`, { autoClose: 1000 });

//     setWishlistCount(userWishlist.length);

//     window.dispatchEvent(new Event("wishlistUpdated"));
//   };

//   // ✅ Remove from wishlist
//   const removeFromWishlist = (productId) => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!user) return;

//     const allWishlists = JSON.parse(localStorage.getItem("wishlistData")) || {};
//     const userWishlist = allWishlists[user.email] || [];

//     const updatedWishlist = userWishlist.filter(
//       (item) => item.id !== productId
//     );

//     allWishlists[user.email] = updatedWishlist;

//     localStorage.setItem("wishlistData", JSON.stringify(allWishlists));

//     setWishlistCount(updatedWishlist.length);

//     window.dispatchEvent(new Event("wishlistUpdated"));
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlistCount,
//         addToWishlist,
//         removeFromWishlist,
//         updateWishlistCount,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);
