import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./collections";
import { toast } from "sonner";

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  moveAllToCart: (addToCart: (product: Product, quantity?: number) => void) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = "alnur_wishlist_items";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error("Failed to save wishlist:", e);
    }
  }, [wishlist]);

  const isFavorite = (productId: string): boolean => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleFavorite = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        toast.info(`Removed "${product.name}" from your wishlist`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        toast.success(`Added "${product.name}" to your Modesty Wishlist! ❤️`);
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const moveAllToCart = (addToCart: (product: Product, quantity?: number) => void) => {
    if (wishlist.length === 0) return;
    wishlist.forEach((p) => addToCart(p, 1));
    const count = wishlist.length;
    setWishlist([]);
    toast.success(`Moved all ${count} garments to your Shopping Bag! 🛍️`);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isFavorite,
        toggleFavorite,
        removeFromWishlist,
        clearWishlist,
        moveAllToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
