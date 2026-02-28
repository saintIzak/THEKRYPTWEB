import { Trash2, ShoppingCart, Heart, ChevronUp } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { useState, useEffect, useRef } from 'react';
import ProductModal from '../components/ProductModal';
import QuickViewModal from '../components/QuickViewModal';
import { Product } from '../types/product';
import redGridBg from '../assets/images/red-grid-bg.png';

export default function Wishlist() {
    const { wishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const productsGridRef = useRef<HTMLDivElement>(null);

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Track scroll position for scroll-to-top button and progress bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;

            setScrollProgress(progress);
            setShowScrollTop(scrollTop > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToProducts = () => {
        productsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    const handleQuickView = (product: Product) => {
        setQuickViewProduct(product);
        setIsQuickViewOpen(true);
    };

    const handleAddAllToCart = () => {
        wishlist.forEach(product => {
            if (product.inStock) {
                addToCart(product);
            }
        });
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 z-50">
                <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Header */}
            <div className="relative py-16 sm:py-20 overflow-hidden border-b border-zinc-800">
                {/* 3D Grid Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={redGridBg}
                        alt=""
                        className="w-full h-full object-cover opacity-30 mix-blend-screen"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                </div>

                <div className="w-full sm:container relative z-20 mx-auto px-4 sm:px-4">
                    <div className="flex items-center gap-4 mb-4">
                        <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 fill-red-600 animate-pulse" />
                        <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white">
                            MY <span className="text-red-600">WISHLIST</span>
                        </h1>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <p className="text-base sm:text-xl text-gray-300 font-bold">
                            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later
                        </p>
                        {wishlist.length > 0 && (
                            <Button
                                onClick={scrollToProducts}
                                className="bg-red-600/20 border border-red-600 hover:bg-red-600 text-white font-black uppercase tracking-wider rounded-none py-3 px-6 text-xs transition-all"
                            >
                                <ChevronUp className="h-4 w-4 mr-2 rotate-180" />
                                View Items
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full sm:container mx-auto px-4 sm:px-4 py-8">
                {wishlist.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="relative mb-6">
                            <Heart className="h-24 w-24 text-zinc-800" />
                            <div className="absolute inset-0 bg-red-600/10 blur-3xl" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white mb-3">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-zinc-400 font-bold mb-8 max-w-md">
                            Save your favorite products for later by clicking the heart icon on any product.
                        </p>
                        <Button
                            onClick={() => window.location.href = '/shop'}
                            className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider rounded-none py-6 px-8 text-sm shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                        >
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <Button
                                onClick={handleAddAllToCart}
                                className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider rounded-none py-4 px-6 text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Add All to Cart ({wishlist.filter(p => p.inStock).length})
                            </Button>
                            <Button
                                onClick={clearWishlist}
                                className="bg-transparent border-2 border-zinc-800 hover:border-red-600 hover:bg-red-600/10 text-white font-black uppercase tracking-wider rounded-none py-4 px-6 text-sm flex items-center gap-2 transition-all"
                            >
                                <Trash2 className="h-4 w-4" />
                                Clear All
                            </Button>
                        </div>

                        {/* Horizontal Scrollable Products Carousel */}
                        <div ref={productsGridRef} className="scroll-mt-20 relative group/carousel">
                            {/* Section Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">
                                    Your <span className="text-red-600">Favorites</span>
                                </h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            const container = document.getElementById('wishlist-scroll-container');
                                            if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                                        }}
                                        className="p-2 bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600 transition-all"
                                        aria-label="Scroll left"
                                    >
                                        <ChevronUp className="h-5 w-5 -rotate-90" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            const container = document.getElementById('wishlist-scroll-container');
                                            if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                                        }}
                                        className="p-2 bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600 transition-all"
                                        aria-label="Scroll right"
                                    >
                                        <ChevronUp className="h-5 w-5 rotate-90" />
                                    </button>
                                </div>
                            </div>

                            {/* Horizontal Scroll Container */}
                            <div
                                id="wishlist-scroll-container"
                                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#dc2626 #18181b'
                                }}
                            >
                                {wishlist.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start"
                                    >
                                        <ProductCard
                                            product={product}
                                            onAddToCart={addToCart}
                                            onViewDetails={handleViewDetails}
                                            onQuickView={handleQuickView}
                                            onCompare={(product) => {
                                                console.log('Compare:', product);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Custom Scrollbar Styling */}
                            <style>{`
                                #wishlist-scroll-container::-webkit-scrollbar {
                                    height: 8px;
                                }
                                #wishlist-scroll-container::-webkit-scrollbar-track {
                                    background: #18181b;
                                    border-radius: 0;
                                }
                                #wishlist-scroll-container::-webkit-scrollbar-thumb {
                                    background: linear-gradient(to right, #dc2626, #ef4444);
                                    border-radius: 0;
                                    box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
                                }
                                #wishlist-scroll-container::-webkit-scrollbar-thumb:hover {
                                    background: linear-gradient(to right, #b91c1c, #dc2626);
                                }
                            `}</style>
                        </div>

                        {/* Traditional Grid View (Optional - can be toggled) */}
                        <div className="mt-12">
                            <h3 className="text-lg font-black italic uppercase tracking-tighter text-white mb-4">
                                All <span className="text-red-600">Products</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {wishlist.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={addToCart}
                                        onViewDetails={handleViewDetails}
                                        onQuickView={handleQuickView}
                                        onCompare={(product) => {
                                            console.log('Compare:', product);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
                                <p className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-2">Total Items</p>
                                <p className="text-3xl font-black italic text-white">{wishlist.length}</p>
                            </div>
                            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
                                <p className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-2">In Stock</p>
                                <p className="text-3xl font-black italic text-green-500">
                                    {wishlist.filter(p => p.inStock).length}
                                </p>
                            </div>
                            <div className="bg-zinc-900/50 border border-zinc-800 p-6">
                                <p className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-2">Total Value</p>
                                <p className="text-3xl font-black italic text-red-600">
                                    KSh {wishlist.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Product Detail Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
                onAddToCart={addToCart}
            />

            {/* Quick View Modal */}
            <QuickViewModal
                product={quickViewProduct}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
                onAddToCart={addToCart}
                onViewFullDetails={handleViewDetails}
            />

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-40 p-4 bg-red-600 hover:bg-red-700 text-white border-2 border-red-500 shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all duration-300 hover:scale-110 group"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)' }}
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </button>
            )}

            {/* Vertical Scroll Navigation Bar */}
            {wishlist.length > 0 && (
                <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
                    {/* Scroll Up Button */}
                    <button
                        onClick={() => window.scrollBy({ top: -400, behavior: 'smooth' })}
                        className="p-3 bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600 transition-all duration-300 group"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)' }}
                        aria-label="Scroll up"
                    >
                        <ChevronUp className="h-5 w-5 group-hover:animate-bounce" />
                    </button>

                    {/* Scroll Track */}
                    <div className="relative h-64 w-1 bg-zinc-900 border-l border-r border-zinc-800">
                        {/* Progress Indicator */}
                        <div
                            className="absolute left-0 right-0 bg-gradient-to-b from-red-600 to-red-500 transition-all duration-300 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                            style={{
                                top: `${scrollProgress}%`,
                                height: '20px',
                                transform: 'translateY(-50%)'
                            }}
                        />

                        {/* Item Markers */}
                        {wishlist.slice(0, 10).map((_, index) => (
                            <div
                                key={index}
                                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-700 border border-zinc-600 rounded-full"
                                style={{ top: `${(index / Math.min(wishlist.length - 1, 9)) * 100}%` }}
                                title={`Item ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Item Counter */}
                    <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 min-w-[60px]">
                        <div className="text-center">
                            <p className="text-xs font-black text-red-600 leading-none">{wishlist.length}</p>
                            <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5">Items</p>
                        </div>
                    </div>

                    {/* Scroll Down Button */}
                    <button
                        onClick={() => window.scrollBy({ top: 400, behavior: 'smooth' })}
                        className="p-3 bg-zinc-900 hover:bg-red-600 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600 transition-all duration-300 group"
                        style={{ clipPath: 'polygon(0 20%, 50% 0, 100% 20%, 100% 100%, 0 100%)' }}
                        aria-label="Scroll down"
                    >
                        <ChevronUp className="h-5 w-5 rotate-180 group-hover:animate-bounce" />
                    </button>
                </div>
            )}
        </div>
    );
}
