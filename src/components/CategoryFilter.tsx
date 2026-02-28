import { Button } from './ui/button';

const categories = [
    'All Products',
    'Gaming Consoles',
    'VR Headsets',
    'Audio',
    'Accessories',
    'Wearables',
    'Drones',
];

interface CategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="sticky top-16 sm:top-20 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
            <div className="w-full sm:container mx-auto px-2 sm:px-4 py-3 sm:py-4">
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-2 scrollbar-hide">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            onClick={() => onCategoryChange(category)}
                            className={`whitespace-nowrap transition-all duration-300 rounded-none h-8 sm:h-10 px-3 sm:px-4 text-[10px] sm:text-xs font-black uppercase tracking-widest ${selectedCategory === category
                                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] border-red-600'
                                : 'text-zinc-500 border-zinc-800 hover:border-red-600 hover:text-red-500 bg-zinc-900/50'
                                }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

