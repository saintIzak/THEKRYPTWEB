import { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import QuickViewModal from '../components/QuickViewModal';
import ShopHeader from '../components/ShopHeader';
import FilterSidebar, { FilterOptions } from '../components/FilterSidebar';
import QuickFilterPills from '../components/QuickFilterPills';
import MerchandisingSection from '../components/MerchandisingSection';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import GamifiedSection from '../components/GamifiedSection';
import { Product } from '../types/product';
import { Button } from '../components/ui/button';

interface ShopProps {
    searchQuery: string;
}

export default function Shop({ searchQuery }: ShopProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

    const [filters, setFilters] = useState<FilterOptions>({
        categories: [],
        platforms: [],
        priceRange: [0, 999999],
        availability: [],
        deals: [],
        brands: [],
    });

    const { products, loading } = useProducts();
    const { addToCart } = useCart();

    // Apply all filters
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Search query
            const matchesSearch =
                searchQuery === '' ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Category filter
            const matchesCategory =
                filters.categories.length === 0 ||
                filters.categories.includes(product.category);

            // Platform filter
            const matchesPlatform =
                filters.platforms.length === 0 ||
                (product.platform && product.platform.some(p => filters.platforms.includes(p)));

            // Price range filter
            const matchesPrice =
                product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1];

            // Availability filter
            const matchesAvailability =
                filters.availability.length === 0 ||
                (filters.availability.includes('In Stock') && product.inStock) ||
                (filters.availability.includes('Pre-order') && product.isPreOrder);

            // Deals filter
            const matchesDeals =
                filters.deals.length === 0 ||
                (filters.deals.includes('Sale') && product.originalPrice && product.originalPrice > product.price) ||
                (filters.deals.includes('Bundle') && product.tags?.includes('BUNDLE')) ||
                (filters.deals.includes('Best Value') && product.rating >= 4.7);

            // Brand filter
            const matchesBrand =
                filters.brands.length === 0 ||
                (product.brand && filters.brands.includes(product.brand));

            return matchesSearch && matchesCategory && matchesPlatform && matchesPrice &&
                matchesAvailability && matchesDeals && matchesBrand;
        });
    }, [products, searchQuery, filters]);

    // Merchandising sections
    const bundleProducts = useMemo(() =>
        products.filter(p => p.tags?.includes('BUNDLE')).slice(0, 5),
        [products]
    );

    const saleProducts = useMemo(() =>
        products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 5),
        [products]
    );

    const topRatedProducts = useMemo(() =>
        products.filter(p => p.rating >= 4.7).slice(0, 5),
        [products]
    );

    const underBudgetProducts = useMemo(() =>
        products.filter(p => p.price < 5000).slice(0, 5),
        [products]
    );

    // View product details
    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsProductModalOpen(true);
    };

    // Quick view
    const handleQuickView = (product: Product) => {
        setQuickViewProduct(product);
        setIsQuickViewOpen(true);
    };

    // Compare
    const handleCompare = (product: Product) => {
        if (comparedProducts.find(p => p.id === product.id)) {
            setComparedProducts(comparedProducts.filter(p => p.id !== product.id));
        } else if (comparedProducts.length < 4) {
            setComparedProducts([...comparedProducts, product]);
        }
    };

    // Quick filter selection
    const handleQuickFilterSelect = (filter: { type: 'price' | 'category' | 'platform' | 'deal'; value: [number, number] | string }) => {
        if (filter.type === 'price') {
            setFilters({ ...filters, priceRange: filter.value as [number, number] });
        } else if (filter.type === 'category') {
            setFilters({ ...filters, categories: [filter.value as string] });
        } else if (filter.type === 'platform') {
            setFilters({ ...filters, platforms: [filter.value as string] });
        } else if (filter.type === 'deal') {
            setFilters({ ...filters, deals: [filter.value as string] });
        }
    };

    const activeFilterCount =
        filters.categories.length +
        filters.platforms.length +
        filters.availability.length +
        filters.deals.length +
        filters.brands.length +
        (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 999999 ? 1 : 0);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Shop Header */}
            <ShopHeader />

            {/* Main Content */}
            <div className="w-full sm:container mx-auto px-0 sm:px-4">
                <div className="flex gap-6">
                    {/* Desktop Filter Sidebar */}
                    <div className="hidden lg:block w-64 flex-shrink-0">
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={setFilters}
                        />
                    </div>

                    {/* Main Products Area */}
                    <div className="flex-1 py-8 px-4 sm:px-0">
                        {/* Mobile Filter Button */}
                        <div className="lg:hidden mb-6">
                            <Button
                                onClick={() => setIsMobileFilterOpen(true)}
                                className="w-full bg-zinc-900 border border-zinc-800 hover:border-red-600 text-white font-black uppercase tracking-wider rounded-none py-4 flex items-center justify-center gap-2"
                            >
                                <Filter className="h-4 w-4" />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-full ml-2">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </Button>
                        </div>

                        {/* Quick Filter Pills */}
                        <QuickFilterPills onFilterSelect={handleQuickFilterSelect} />

                        {/* Featured Bundles */}
                        {bundleProducts.length > 0 && (
                            <MerchandisingSection
                                title="Featured Bundles"
                                subtitle="Best value packs for complete setups"
                                products={bundleProducts}
                                icon="bundle"
                                onAddToCart={addToCart}
                                onViewDetails={handleViewDetails}
                                onQuickView={handleQuickView}
                                onCompare={handleCompare}
                            />
                        )}

                        {/* Hot Deals */}
                        {saleProducts.length > 0 && (
                            <MerchandisingSection
                                title="Hot Deals"
                                subtitle="Limited time offers"
                                products={saleProducts}
                                icon="deals"
                                onAddToCart={addToCart}
                                onViewDetails={handleViewDetails}
                                onQuickView={handleQuickView}
                                onCompare={handleCompare}
                            />
                        )}

                        {/* Under KSh 5,000 */}
                        {underBudgetProducts.length > 0 && (
                            <MerchandisingSection
                                title="Under KSh 5,000"
                                subtitle="Budget-friendly gaming gear"
                                products={underBudgetProducts}
                                icon="deals"
                                onAddToCart={addToCart}
                                onViewDetails={handleViewDetails}
                                onQuickView={handleQuickView}
                                onCompare={handleCompare}
                            />
                        )}

                        {/* All Products */}
                        <GamifiedSection className="mb-8">
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <div className="text-lg text-gray-400 animate-pulse">Loading products...</div>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-white">
                                            {filteredProducts.length > 0
                                                ? `All Products (${filteredProducts.length})`
                                                : 'No products found'}
                                        </h2>
                                        {activeFilterCount > 0 && (
                                            <p className="mt-1 text-sm text-gray-400">
                                                {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied
                                            </p>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                        {filteredProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                onAddToCart={addToCart}
                                                onViewDetails={handleViewDetails}
                                                onQuickView={handleQuickView}
                                                onCompare={handleCompare}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </GamifiedSection>

                        {/* Top Rated */}
                        {topRatedProducts.length > 0 && (
                            <MerchandisingSection
                                title="Top Rated"
                                subtitle="Highest rated by gamers"
                                products={topRatedProducts}
                                icon="trending"
                                onAddToCart={addToCart}
                                onViewDetails={handleViewDetails}
                                onQuickView={handleQuickView}
                                onCompare={handleCompare}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            {isMobileFilterOpen && (
                <div className="lg:hidden">
                    <FilterSidebar
                        filters={filters}
                        onFilterChange={setFilters}
                        onClose={() => setIsMobileFilterOpen(false)}
                        isMobile={true}
                    />
                </div>
            )}

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

            {/* Comparison Bar (if products selected) */}
            {comparedProducts.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t-2 border-red-600 p-4 z-40">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-black uppercase tracking-wider text-white">
                                Comparing {comparedProducts.length} product{comparedProducts.length > 1 ? 's' : ''}
                            </span>
                            <div className="flex gap-2">
                                {comparedProducts.map(product => (
                                    <div key={product.id} className="relative">
                                        <img src={product.image} alt={product.name} className="h-12 w-12 object-cover border border-zinc-800" />
                                        <button
                                            onClick={() => handleCompare(product)}
                                            className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => setComparedProducts([])}
                                className="bg-transparent border border-zinc-800 hover:border-red-600 text-white font-black uppercase tracking-wider rounded-none text-xs px-4 py-2"
                            >
                                Clear All
                            </Button>
                            <Button
                                className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider rounded-none text-xs px-6 py-2"
                            >
                                Compare Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
