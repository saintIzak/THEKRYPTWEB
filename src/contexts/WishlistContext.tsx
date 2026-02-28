import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';
import { toast } from 'sonner';

interface WishlistContextType {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<Product[]>(() => {
        // Load wishlist from localStorage on mount
        const saved = localStorage.getItem('gamerforge-wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to localStorage whenever wishlist changes
    useEffect(() => {
        localStorage.setItem('gamerforge-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product: Product) => {
        setWishlist((prev) => {
            // Check if already in wishlist
            if (prev.find((item) => item.id === product.id)) {
                toast.info(`${product.name} is already in your wishlist`);
                return prev;
            }
            toast.success(`${product.name} added to wishlist!`);
            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist((prev) => {
            const product = prev.find((item) => item.id === productId);
            if (product) {
                toast.success(`${product.name} removed from wishlist`);
            }
            return prev.filter((item) => item.id !== productId);
        });
    };

    const isInWishlist = (productId: string) => {
        return wishlist.some((item) => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
        toast.success('Wishlist cleared');
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
}
