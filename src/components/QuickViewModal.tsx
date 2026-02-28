import { X, Star, ShoppingCart, ChevronLeft, ChevronRight, Package, Shield, Zap } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types/product';
import { Button } from './ui/button';

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
    onViewFullDetails: (product: Product) => void;
}

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart, onViewFullDetails }: QuickViewModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    const images = product.images && product.images.length > 0 ? product.images : [product.image];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            onAddToCart(product);
        }
        onClose();
    };

    const isOnSale = product.originalPrice && product.originalPrice > product.price;
    const discountPercent = isOnSale
        ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
        : 0;

    return (
        <div
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-zinc-950 border-2 border-zinc-800 max-w-5xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide relative"
                style={{ clipPath: 'polygon(0 0, 98% 0, 100% 5%, 100% 100%, 2% 100%, 0 95%)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-900 bg-zinc-900/50">
                    <div>
                        <h2 className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-white">
                            QUICK <span className="text-red-600">VIEW</span>
                        </h2>
                        <p className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">
                            Fast Preview
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-800 text-zinc-500 hover:text-red-600 transition-colors"
                    >
                        <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Image Gallery */}
                        <div className="relative group">
                            <div className="aspect-square overflow-hidden border-2 border-zinc-800 bg-black relative">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 border border-zinc-800 hover:border-red-600 transition-all"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/80 text-white p-2 border border-zinc-800 hover:border-red-600 transition-all"
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </button>

                                        {/* Image indicators */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`h-1 transition-all ${index === currentImageIndex
                                                        ? 'w-8 bg-red-600'
                                                        : 'w-4 bg-zinc-800 hover:bg-zinc-700'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            {/* Category & Rating */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-3 w-3 text-red-600" />
                                    <p className="text-[10px] text-red-600 font-black uppercase tracking-[0.3em]">
                                        {product.category}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 fill-red-600 text-red-600" />
                                    <span className="font-black text-white italic">{product.rating}</span>
                                </div>
                            </div>

                            {/* Product Name */}
                            <h1 className="text-2xl sm:text-3xl font-black italic text-white uppercase tracking-tighter leading-tight">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="bg-zinc-900/50 border border-zinc-800 p-4">
                                {isOnSale ? (
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-3xl font-black text-red-500">
                                                KSh {product.price.toLocaleString()}
                                            </span>
                                            <span className="bg-red-600 text-white text-xs font-black px-2 py-1">
                                                -{discountPercent}%
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-zinc-600 line-through">
                                            KSh {product.originalPrice?.toLocaleString()}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="text-3xl font-black italic text-red-600 tracking-tighter">
                                        KSh {product.price.toLocaleString()}
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mt-3">
                                    <div className={`h-2 w-2 rounded-full ${product.inStock ? 'bg-red-600 animate-pulse' : 'bg-zinc-700'}`} />
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${product.inStock ? 'text-white' : 'text-zinc-600'}`}>
                                        {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                                    </p>
                                </div>
                            </div>

                            {/* Key Specs */}
                            {product.specs && Object.keys(product.specs).length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest border-l-2 border-red-600 pl-3">
                                        Key Specs:
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
                                            <div key={key} className="bg-zinc-900/30 border border-zinc-800 p-2">
                                                <p className="text-[8px] text-zinc-500 uppercase tracking-wider mb-1">{key}</p>
                                                <p className="text-xs font-bold text-white">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Platform Compatibility */}
                            {product.platform && product.platform.length > 0 && (
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-black text-zinc-500 uppercase">Compatible:</span>
                                    {product.platform.map((platform, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-zinc-900 border border-zinc-800 text-white text-xs font-black px-2 py-1"
                                        >
                                            {platform}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Trust Signals */}
                            <div className="flex gap-4 pt-2 border-t border-zinc-800">
                                {product.warranty && (
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-green-500" />
                                        <span className="text-xs font-bold text-zinc-400">{product.warranty}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Package className="h-4 w-4 text-blue-500" />
                                    <span className="text-xs font-bold text-zinc-400">Pickup Available</span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-black uppercase tracking-wider text-zinc-400">Quantity:</span>
                                <div className="flex items-center border border-zinc-800">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-zinc-800 text-white font-black transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 font-black text-white border-x border-zinc-800">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                        className="px-3 py-2 hover:bg-zinc-800 text-white font-black transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider rounded-none py-6 text-sm shadow-[0_0_20px_rgba(220,38,38,0.3)] group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="group-hover:scale-110 transition-transform flex items-center gap-2">
                                        <ShoppingCart className="h-5 w-5" />
                                        {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                                    </span>
                                </Button>
                                <Button
                                    onClick={() => {
                                        onViewFullDetails(product);
                                        onClose();
                                    }}
                                    className="bg-transparent border-2 border-zinc-800 hover:border-red-600 text-white font-black uppercase tracking-wider rounded-none py-6 px-6 text-sm transition-all"
                                >
                                    Full Details
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
