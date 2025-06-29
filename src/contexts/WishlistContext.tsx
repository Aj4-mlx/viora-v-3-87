import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const wishlistCount = wishlistItems.length;

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(wishlistItem => wishlistItem.id === item.id);

      if (existingItem) {
        toast.info(`${item.name} is already in your wishlist!`);
        return prevItems;
      } else {
        toast.success(`${item.name} added to wishlist!`);
        return [...prevItems, item];
      }
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast.success(`${item.name} removed from wishlist!`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Wishlist cleared!');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}; 