import { motion, AnimatePresence } from 'framer-motion';
import { StationCategory, StationType } from '../../data/bookingMockData';
import { CheckCircle2 } from 'lucide-react';

interface StationSelectorProps {
    categories: StationCategory[];
    selectedCategory: StationType | null;
    onSelectCategory: (id: StationType) => void;
    selectedSlot: string | null;
    onSelectSlot: (id: string | null) => void;
}

const COLOR_MAP: Record<string, { hex: string, tw: string }> = {
    'blue-500': { hex: '#3b82f6', tw: 'text-blue-500 border-blue-500' },
    'green-500': { hex: '#22c55e', tw: 'text-green-500 border-green-500' },
    'red-500': { hex: '#ef4444', tw: 'text-red-500 border-red-500' },
    'purple-500': { hex: '#8b5cf6', tw: 'text-purple-500 border-purple-500' },
};

export default function StationSelector({
    categories,
    selectedCategory,
    onSelectCategory,
    selectedSlot,
    onSelectSlot
}: StationSelectorProps) {

    const activeCategory = categories.find(c => c.id === selectedCategory);

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff0055]/20 text-[#ff0055] text-[10px] font-black">1</div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Select Platform</h3>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isSelected = selectedCategory === cat.id;
                        const cData = COLOR_MAP[cat.color] || COLOR_MAP['blue-500'];

                        return (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    onSelectCategory(cat.id);
                                    onSelectSlot(null);
                                }}
                                className={`relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 group overflow-hidden border ${isSelected
                                        ? `bg-white/5 border-[${cData.hex}] shadow-[0_0_30px_rgba(0,0,0,0.5)] scale-[1.02]`
                                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                                    }`}
                                style={{
                                    borderColor: isSelected ? cData.hex : undefined,
                                    boxShadow: isSelected ? `0 0 20px ${cData.hex}40` : undefined
                                }}
                            >
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500`} style={{ backgroundColor: cData.hex }} />

                                {isSelected && (
                                    <div className="absolute top-3 right-3">
                                        <CheckCircle2 className="w-4 h-4" style={{ color: cData.hex }} />
                                    </div>
                                )}

                                <Icon
                                    className={`w-10 h-10 mb-4 transition-all duration-300 ${isSelected ? 'scale-110 drop-shadow-md' : 'text-white/40 group-hover:text-white group-hover:scale-110'}`}
                                    style={{ color: isSelected ? cData.hex : undefined }}
                                />

                                <span className={`text-[11px] font-black uppercase tracking-wider text-center ${isSelected ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                                    {cat.name}
                                </span>

                                <div className={`mt-3 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${isSelected ? 'bg-black/50 text-white border border-white/10' : 'bg-white/5 text-white/40'}`}>
                                    {cat.basePriceLabel}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeCategory && (
                    <motion.div
                        key={activeCategory.id}
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 pb-2 border-t border-white/5 mt-6">
                            <h3 className="text-xs font-black text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                                Select specific {activeCategory.name}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {activeCategory.slots.map(slot => {
                                    const isSelected = selectedSlot === slot.id;
                                    const isBusy = slot.status === 'busy';
                                    const cData = COLOR_MAP[activeCategory.color] || COLOR_MAP['blue-500'];

                                    return (
                                        <button
                                            key={slot.id}
                                            disabled={isBusy}
                                            onClick={() => onSelectSlot(slot.id)}
                                            style={{
                                                borderColor: isSelected ? cData.hex : undefined,
                                                backgroundColor: isSelected ? `${cData.hex}15` : undefined
                                            }}
                                            className={`p-4 rounded-xl border flex flex-col items-start transition-all relative overflow-hidden ${isBusy
                                                    ? 'opacity-40 cursor-not-allowed border-white/5 bg-black/40'
                                                    : isSelected
                                                        ? `border-[${cData.hex}]`
                                                        : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 pointer-events-none" />
                                            )}

                                            <div className="flex items-center justify-between w-full mb-3">
                                                <span className={`text-[11px] font-black uppercase tracking-widest z-10 ${isSelected ? 'text-white' : 'text-white/70'}`}>
                                                    {slot.name}
                                                </span>
                                                <div className={`w-2 h-2 rounded-full shadow-sm z-10 ${isBusy ? 'bg-red-500 shadow-red-500/50' : 'bg-[#00d9ff] shadow-[#00d9ff]/50'}`} />
                                            </div>

                                            <span className={`text-[9px] font-bold uppercase tracking-widest z-10 ${isBusy ? 'text-red-500' : isSelected ? 'text-white/90' : 'text-[#00d9ff]/80'}`}>
                                                {isBusy ? 'In Use' : 'Ready'}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
