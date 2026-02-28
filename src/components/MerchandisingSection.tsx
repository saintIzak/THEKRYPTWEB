import { Package, TrendingUp, Eye, Clock } from 'lucide-react';
import { Product } from '../types/product';
import ProductCard from './ProductCard';

interface MerchandisingSectionProps {
    title: string;
    subtitle?: string;
    products: Product[];
    icon?: 'bundle' | 'trending' | 'recent' | 'deals';
    onAddToCart: (product: Product) => void;
    onViewDetails: (product: Product) => void;
    onQuickView?: (product: Product) => void;
    onCompare?: (product: Product) => void;
}

export default function MerchandisingSection({
    title,
    subtitle,
    products,
    icon = 'bundle',
    onAddToCart,
    onViewDetails,
    onQuickView,
    onCompare
}: MerchandisingSectionProps) {
    if (products.length === 0) return null;

    const icons = {
        bundle: Package,
        trending: TrendingUp,
        recent: Clock,
        deals: Eye,
    };

    const Icon = icons[icon];

    return (
        <div className="mb-12">
            {/* Section Header */}
            <div className="mb-6 relative">
                <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-5 w-5 text-red-600" />
                    <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">
                        {title}
                    </h2>
                </div>
                {subtitle && (
                    <p className="text-sm text-zinc-400 font-bold uppercase tracking-wide ml-8">
                        {subtitle}
                    </p>
                )}
                {/* Accent Line */}
                <div className="absolute -bottom-2 left-0 h-0.5 w-24 bg-gradient-to-r from-red-600 to-transparent" />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                        onViewDetails={onViewDetails}
                        onQuickView={onQuickView}
                        onCompare={onCompare}
                    />
                ))}
            </div>
        </div>
    );
}
