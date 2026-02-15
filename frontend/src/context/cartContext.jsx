import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.foodId === item._id);

      if (exists) {
        return prev.map((i) =>
          i.foodId === item._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { foodId: item._id, quantity: 1 }];
    });
  };

  const updateQty = (foodId, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.foodId !== foodId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.foodId === foodId ? { ...i, quantity: qty } : i)),
      );
    }
  };

  const clearCart = () => setCart([]);

  return (
    <cartContext.Provider
      value={{ cart, setCart, addToCart, updateQty, clearCart }}
    >
      {children}
    </cartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(cartContext);
