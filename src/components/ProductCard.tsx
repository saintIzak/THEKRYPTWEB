import { TrendingUp, Star, ShieldCheck, Eye, GitCompare, Percent, Heart } from 'lucide-react';
import { Product } from '../types/product';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useWishlist } from '../contexts/WishlistContext';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onViewDetails: (product: Product) => void;
    onQuickView?: (product: Product) => void;
    onCompare?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails, onQuickView, onCompare }: ProductCardProps) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isPopular = product.rating >= 4.7;
    const isOnSale = product.originalPrice && product.originalPrice > product.price;
    const discountPercent = isOnSale
        ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
        : 0;
    const inWishlist = isInWishlist(product.id);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="group relative overflow-hidden bg-zinc-900 transition-all duration-500 hover:-translate-y-2 border border-zinc-800/50 hover:border-red-600/50"
            style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)' }}>

            {/* HUD Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-700 z-30 transition-colors group-hover:border-red-600" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-700 z-30 transition-colors group-hover:border-red-600" />

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            {/* Image Section */}
            <div
                className="relative aspect-[4/5] overflow-hidden bg-zinc-950 cursor-pointer"
                onClick={() => onViewDetails(product)}
            >
                {/* Dark gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />

                {/* Glitch Overlay on Hover */}
                <div className="absolute inset-0 bg-red-600/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10" />

                {/* Top Badges */}
                <div className="absolute left-2 top-2 flex flex-col gap-1 z-30">
                    {!product.inStock && (
                        <div className="bg-zinc-800 text-zinc-500 text-[7px] font-black px-1.5 py-0.5 border border-zinc-700">
                            OFFLINE
                        </div>
                    )}
                    {product.isPreOrder && (
                        <div className="bg-blue-600 text-white text-[7px] font-black px-1.5 py-0.5 shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                            PRE-ORDER
                        </div>
                    )}
                    {isPopular && product.inStock && (
                        <div className="bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 flex items-center gap-1 shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                            <TrendingUp className="h-2 w-2" />
                            HOT
                        </div>
                    )}
                    {product.tags?.includes('NEW') && (
                        <div className="bg-purple-600 text-white text-[7px] font-black px-1.5 py-0.5 shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                            NEW
                        </div>
                    )}
                    {product.tags?.includes('LIMITED') && (
                        <div className="bg-orange-600 text-white text-[7px] font-black px-1.5 py-0.5 shadow-[0_0_10px_rgba(234,88,12,0.5)]">
                            LIMITED
                        </div>
                    )}
                    {product.tags?.includes('BUNDLE') && (
                        <div className="bg-green-600 text-white text-[7px] font-black px-1.5 py-0.5 shadow-[0_0_10px_rgba(22,163,74,0.5)]">
                            BUNDLE
                        </div>
                    )}
                    {product.isTested && (
                        <div className="bg-white text-black text-[7px] font-black px-1.5 py-0.5 flex items-center gap-1">
                            <ShieldCheck className="h-2 w-2" />
                            VERIFIED
                        </div>
                    )}
                </div>

                {/* Sale Badge - Top Right */}
                {isOnSale && (
                    <div className="absolute right-2 top-2 z-30">
                        <div className="bg-red-600 text-white px-2 py-1 flex items-center gap-1 shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                            <Percent className="h-3 w-3" />
                            <span className="text-xs font-black">-{discountPercent}%</span>
                        </div>
                    </div>
                )}

                {/* Wishlist Heart Button - Top Right (below sale badge if present) */}
                <button
                    onClick={handleWishlistToggle}
                    className={`absolute ${isOnSale ? 'right-2 top-14' : 'right-2 top-2'} z-30 p-2 bg-black/80 backdrop-blur-sm border border-zinc-700 hover:border-red-600 transition-all duration-300 group/heart`}
                    title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <Heart
                        className={`h-4 w-4 transition-all duration-300 ${inWishlist
                                ? 'fill-red-600 text-red-600 scale-110'
                                : 'text-zinc-400 group-hover/heart:text-red-600 group-hover/heart:scale-110'
                            }`}
                    />
                </button>

                {/* Platform Compatibility - Bottom Left */}
                {product.platform && product.platform.length > 0 && (
                    <div className="absolute bottom-2 left-2 flex gap-1 z-30">
                        {product.platform.slice(0, 3).map((platform, idx) => (
                            <div
                                key={idx}
                                className="bg-black/80 backdrop-blur-sm text-white text-[6px] font-black px-1.5 py-0.5 border border-zinc-700"
                            >
                                {platform}
                            </div>
                        ))}
                        {product.platform.length > 3 && (
                            <div className="bg-black/80 backdrop-blur-sm text-white text-[6px] font-black px-1.5 py-0.5 border border-zinc-700">
                                +{product.platform.length - 3}
                            </div>
                        )}
                    </div>
                )}

                {/* Quick Actions - Appear on Hover */}
                <div className="absolute inset-x-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-30">
                    {onQuickView && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onQuickView(product);
                            }}
                            className="flex-1 bg-black/90 backdrop-blur-sm border border-zinc-700 hover:border-red-600 text-white py-1.5 flex items-center justify-center gap-1 transition-all"
                            title="Quick View"
                        >
                            <Eye className="h-3 w-3" />
                            <span className="text-[8px] font-black uppercase">Quick View</span>
                        </button>
                    )}
                    {onCompare && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCompare(product);
                                toast.success('Added to comparison');
                            }}
                            className="bg-black/90 backdrop-blur-sm border border-zinc-700 hover:border-red-600 text-white p-1.5 transition-all"
                            title="Compare"
                        >
                            <GitCompare className="h-3 w-3" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-2 bg-zinc-900/50 relative z-10">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-red-500 transition-colors">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500/80">
                        <Star className="h-1.5 w-1.5 fill-amber-500" />
                        <span className="text-[8px] font-bold">{product.rating}</span>
                    </div>
                </div>

                <h3
                    className="text-[9px] sm:text-[10px] font-bold text-zinc-200 mb-2 line-clamp-2 group-hover:text-white transition-colors cursor-pointer"
                    onClick={() => onViewDetails(product)}
                >
                    {product.name}
                </h3>

                {/* Price Section */}
                <div className="mb-2">
                    {isOnSale ? (
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-red-500">
                                KSh {product.price.toLocaleString()}
                            </span>
                            <span className="text-[8px] font-bold text-zinc-600 line-through">
                                KSh {product.originalPrice?.toLocaleString()}
                            </span>
                        </div>
                    ) : (
                        <span className="text-xs font-black text-white">
                            KSh {product.price.toLocaleString()}
                        </span>
                    )}
                </div>

                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!product.inStock) return;
                        onAddToCart(product);
                        toast.success(`${product.name} added to cart!`);
                    }}
                    disabled={!product.inStock}
                    className="w-full h-6 text-[8px] font-black uppercase tracking-widest bg-transparent border border-zinc-800 text-zinc-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {product.inStock ? (product.isPreOrder ? 'PRE-ORDER' : 'ADD TO CART') : 'OUT OF STOCK'}
                </Button>
            </div>

            {/* Hover Glow */}
            <div className="absolute -inset-1 bg-red-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </div>
    );
}
