import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")));

  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
      setUser(currentUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (user) {
      const savedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
      setCart(savedCart);
    } else {
      setCart([]); 
    }
  }, [user]);

  const save = (updatedCart) => {
    setCart(updatedCart);
    if (user) localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      const updated = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      return save(updated);
    }
    save([...cart, { ...product, qty: 1 }]);
  };


  const removeFromCart = (id) => save(cart.filter((item) => item.id !== id));

  const updateQuantity = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    save(cart.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const clearCart = () => {
    setCart([]);
    if (user) localStorage.removeItem(`cart_${user.email}`);
  };

  
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        cartCount, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        setUser 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
