import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';

export interface FilterOptions {
    categories: string[];
    platforms: string[];
    priceRange: [number, number];
    availability: string[];
    deals: string[];
    brands: string[];
}

interface FilterSidebarProps {
    filters: FilterOptions;
    onFilterChange: (filters: FilterOptions) => void;
    onClose?: () => void;
    isMobile?: boolean;
}

export default function FilterSidebar({ filters, onFilterChange, onClose, isMobile = false }: FilterSidebarProps) {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
        category: true,
        platform: true,
        price: true,
        availability: true,
        deals: true,
        brand: true,
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const categories = ['All Products', 'Controllers', 'Headsets', 'Keyboards', 'Mice', 'Consoles', 'Monitors', 'Chairs', 'Audio', 'Accessories'];
    const platforms = ['PS5', 'PS4', 'PC', 'Xbox', 'Nintendo Switch'];
    const availabilityOptions = ['In Stock', 'Pre-order'];
    const dealOptions = ['Sale', 'Bundle', 'Best Value'];
    const brands = ['Sony', 'Microsoft', 'Razer', 'Logitech', 'SteelSeries', 'Corsair', 'HyperX'];

    const priceRanges = [
        { label: 'Under KSh 5,000', value: [0, 5000] as [number, number] },
        { label: 'KSh 5,000 - 15,000', value: [5000, 15000] as [number, number] },
        { label: 'KSh 15,000 - 30,000', value: [15000, 30000] as [number, number] },
        { label: 'KSh 30,000 - 50,000', value: [30000, 50000] as [number, number] },
        { label: 'Above KSh 50,000', value: [50000, 999999] as [number, number] },
    ];

    const handleCategoryToggle = (category: string) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter(c => c !== category)
            : [...filters.categories, category];
        onFilterChange({ ...filters, categories: newCategories });
    };

    const handlePlatformToggle = (platform: string) => {
        const newPlatforms = filters.platforms.includes(platform)
            ? filters.platforms.filter(p => p !== platform)
            : [...filters.platforms, platform];
        onFilterChange({ ...filters, platforms: newPlatforms });
    };

    const handleAvailabilityToggle = (option: string) => {
        const newAvailability = filters.availability.includes(option)
            ? filters.availability.filter(a => a !== option)
            : [...filters.availability, option];
        onFilterChange({ ...filters, availability: newAvailability });
    };

    const handleDealToggle = (deal: string) => {
        const newDeals = filters.deals.includes(deal)
            ? filters.deals.filter(d => d !== deal)
            : [...filters.deals, deal];
        onFilterChange({ ...filters, deals: newDeals });
    };

    const handleBrandToggle = (brand: string) => {
        const newBrands = filters.brands.includes(brand)
            ? filters.brands.filter(b => b !== brand)
            : [...filters.brands, brand];
        onFilterChange({ ...filters, brands: newBrands });
    };

    const handlePriceRangeSelect = (range: [number, number]) => {
        onFilterChange({ ...filters, priceRange: range });
    };

    const clearAllFilters = () => {
        onFilterChange({
            categories: [],
            platforms: [],
            priceRange: [0, 999999],
            availability: [],
            deals: [],
            brands: [],
        });
    };

    const activeFilterCount =
        filters.categories.length +
        filters.platforms.length +
        filters.availability.length +
        filters.deals.length +
        filters.brands.length +
        (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 999999 ? 1 : 0);

    const FilterSection = ({ title, section, children }: { title: string; section: string; children: React.ReactNode }) => (
        <div className="border-b border-zinc-800 pb-4">
            <button
                onClick={() => toggleSection(section)}
                className="flex items-center justify-between w-full mb-3 group"
            >
                <span className="text-sm font-black uppercase tracking-wider text-white group-hover:text-red-500 transition-colors">
                    {title}
                </span>
                {expandedSections[section] ? (
                    <ChevronUp className="h-4 w-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
                )}
            </button>
            {expandedSections[section] && <div className="space-y-2">{children}</div>}
        </div>
    );

    const CheckboxOption = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
        <label className="flex items-center gap-3 cursor-pointer group" onClick={onChange}>
            <div className={`w-4 h-4 border-2 flex items-center justify-center transition-all ${checked ? 'bg-red-600 border-red-600' : 'border-zinc-700 group-hover:border-red-600'
                }`}>
                {checked && <div className="w-2 h-2 bg-white" />}
            </div>
            <span className={`text-xs font-bold uppercase tracking-wide transition-colors ${checked ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                {label}
            </span>
        </label>
    );

    return (
        <div className={`${isMobile ? 'fixed inset-0 z-50 bg-black' : 'sticky top-24 h-[calc(100vh-8rem)]'} overflow-y-auto scrollbar-hide`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-3">
                    <Filter className="h-5 w-5 text-red-600" />
                    <h2 className="text-lg font-black uppercase tracking-wider text-white">
                        Filters
                    </h2>
                    {activeFilterCount > 0 && (
                        <span className="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                </div>
                {isMobile && onClose && (
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 text-zinc-500 hover:text-red-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Clear All */}
            {activeFilterCount > 0 && (
                <div className="p-4 border-b border-zinc-800">
                    <Button
                        onClick={clearAllFilters}
                        className="w-full bg-transparent border border-zinc-800 text-zinc-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 rounded-none text-xs font-black uppercase tracking-widest"
                    >
                        Clear All Filters
                    </Button>
                </div>
            )}

            {/* Filter Sections */}
            <div className="p-4 space-y-6">
                {/* Category */}
                <FilterSection title="Category" section="category">
                    {categories.map(category => (
                        <CheckboxOption
                            key={category}
                            label={category}
                            checked={filters.categories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                        />
                    ))}
                </FilterSection>

                {/* Platform */}
                <FilterSection title="Platform" section="platform">
                    {platforms.map(platform => (
                        <CheckboxOption
                            key={platform}
                            label={platform}
                            checked={filters.platforms.includes(platform)}
                            onChange={() => handlePlatformToggle(platform)}
                        />
                    ))}
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="Price Range" section="price">
                    {priceRanges.map((range, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1]
                                ? 'border-red-600'
                                : 'border-zinc-700 group-hover:border-red-600'
                                }`}>
                                {filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1] && (
                                    <div className="w-2 h-2 rounded-full bg-red-600" />
                                )}
                            </div>
                            <span
                                onClick={() => handlePriceRangeSelect(range.value)}
                                className={`text-xs font-bold uppercase tracking-wide transition-colors ${filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1]
                                    ? 'text-white'
                                    : 'text-zinc-500 group-hover:text-zinc-300'
                                    }`}
                            >
                                {range.label}
                            </span>
                        </label>
                    ))}
                </FilterSection>

                {/* Availability */}
                <FilterSection title="Availability" section="availability">
                    {availabilityOptions.map(option => (
                        <CheckboxOption
                            key={option}
                            label={option}
                            checked={filters.availability.includes(option)}
                            onChange={() => handleAvailabilityToggle(option)}
                        />
                    ))}
                </FilterSection>

                {/* Deals */}
                <FilterSection title="Deals" section="deals">
                    {dealOptions.map(deal => (
                        <CheckboxOption
                            key={deal}
                            label={deal}
                            checked={filters.deals.includes(deal)}
                            onChange={() => handleDealToggle(deal)}
                        />
                    ))}
                </FilterSection>

                {/* Brand */}
                <FilterSection title="Brand" section="brand">
                    {brands.map(brand => (
                        <CheckboxOption
                            key={brand}
                            label={brand}
                            checked={filters.brands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                        />
                    ))}
                </FilterSection>
            </div>
        </div>
    );
}
