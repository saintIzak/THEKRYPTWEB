import { Zap, Tag, TrendingUp } from 'lucide-react';

interface QuickFilterPill {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    filter: {
        type: 'price' | 'category' | 'platform' | 'deal';
        value: [number, number] | string;
    };
}

interface QuickFilterPillsProps {
    onFilterSelect: (filter: QuickFilterPill['filter']) => void;
}

export default function QuickFilterPills({ onFilterSelect }: QuickFilterPillsProps) {
    const quickFilters: QuickFilterPill[] = [
        {
            label: 'Under KSh 5,000',
            icon: Tag,
            filter: { type: 'price', value: [0, 5000] }
        },
        {
            label: 'PS5 Controllers',
            icon: Zap,
            filter: { type: 'category', value: 'Controllers' }
        },
        {
            label: 'Headsets',
            icon: Zap,
            filter: { type: 'category', value: 'Headsets' }
        },
        {
            label: 'On Sale',
            icon: TrendingUp,
            filter: { type: 'deal', value: 'Sale' }
        },
        {
            label: 'PC Gaming',
            icon: Zap,
            filter: { type: 'platform', value: 'PC' }
        },
        {
            label: 'Best Value',
            icon: TrendingUp,
            filter: { type: 'deal', value: 'Best Value' }
        },
    ];

    return (
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
                <Zap className="h-4 w-4 text-red-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400">
                    Quick Filters
                </h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {quickFilters.map((filter, index) => {
                    const Icon = filter.icon;
                    return (
                        <button
                            key={index}
                            onClick={() => onFilterSelect(filter.filter)}
                            className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-red-600 px-4 py-2 transition-all duration-300 hover:-translate-y-0.5"
                            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)' }}
                        >
                            <div className="flex items-center gap-2">
                                {Icon && <Icon className="h-3.5 w-3.5 text-zinc-500 group-hover:text-red-500 transition-colors" />}
                                <span className="text-xs font-black uppercase tracking-wide text-zinc-400 group-hover:text-white transition-colors">
                                    {filter.label}
                                </span>
                            </div>
                            {/* Glow effect on hover */}
                            <div className="absolute -inset-1 bg-red-600/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
