export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number; // For sale items
    image: string;
    images?: string[];
    description: string;
    rating: number;
    inStock: boolean;
    stockQuantity?: number;
    isTested?: boolean;
    platform?: string[]; // PS5, PS4, PC, Xbox
    brand?: string;
    tags?: string[]; // HOT, SALE, NEW, LIMITED, BUNDLE
    isPreOrder?: boolean;
    warranty?: string;
    compatibility?: string[];
    whatsInBox?: string[];
    specs?: { [key: string]: string };
    bundleItems?: string[];
    relatedProducts?: string[]; // Product IDs
}

export interface CartItem {
    product: Product;
    quantity: number;
}

