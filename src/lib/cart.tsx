import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "./collections";
import { useAuth } from "./auth";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isGuest } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  // Compute storage key strictly isolated by authenticated user email
  const getStorageKey = useCallback(() => {
    if (isAuthenticated && !isGuest && user?.email) {
      return `al-nur-cart_user_${user.email.toLowerCase().trim()}`;
    }
    return "al-nur-cart_guest";
  }, [isAuthenticated, isGuest, user?.email]);

  // Load cart when user changes / mounts
  useEffect(() => {
    const key = getStorageKey();
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setCart(JSON.parse(saved));
      } else {
        setCart([]);
      }
    } catch (e) {
      console.error("Failed to load user cart", e);
      setCart([]);
    }
  }, [getStorageKey]);

  // Save cart to the user-specific storage key
  const saveCartToStorage = useCallback(
    (newCart: CartItem[]) => {
      const key = getStorageKey();
      try {
        localStorage.setItem(key, JSON.stringify(newCart));
      } catch (e) {
        console.error("Failed to persist user cart", e);
      }
    },
    [getStorageKey],
  );

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.name === product.name);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.product.name === product.name ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        updated = [...prev, { product, quantity: 1 }];
      }
      saveCartToStorage(updated);
      return updated;
    });
  };

  const removeFromCart = (productName: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.product.name !== productName);
      saveCartToStorage(updated);
      return updated;
    });
  };

  const updateQuantity = (productName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productName);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.product.name === productName ? { ...item, quantity } : item,
      );
      saveCartToStorage(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    const key = getStorageKey();
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Failed to clear user cart", e);
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce((acc, item) => {
    const priceStr = item.product.price.replace(/[^\d]/g, "");
    const price = parseInt(priceStr, 10) || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
