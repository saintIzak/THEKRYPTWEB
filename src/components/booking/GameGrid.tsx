import { motion, AnimatePresence } from 'framer-motion';
import { ArcadeGame, PRICING_RULES, StationType } from '../../data/bookingMockData';

interface GameGridProps {
    games: ArcadeGame[];
    selectedStation: StationType | null;
    selectedGame: string | null;
    onSelectGame: (id: string) => void;
}

export default function GameGrid({
    games,
    selectedStation,
    selectedGame,
    onSelectGame
}: GameGridProps) {

    // If no station selected, show all games but dim them.
    // Otherwise, show only games supported by the station, or show all but disable unsupported ones.

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff0055]/20 text-[#ff0055] text-[10px] font-black">2</div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Select Game</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence>
                    {games.map((game, i) => {
                        const isSupported = !selectedStation || game.supportedStations.includes(selectedStation);
                        const isSelected = selectedGame === game.id;
                        const pricingLabel = PRICING_RULES[game.pricingRule].label;

                        return (
                            <motion.button
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={game.id}
                                disabled={!isSupported}
                                onClick={() => onSelectGame(game.id)}
                                className={`relative group overflow-hidden rounded-2xl text-left transition-all duration-500 border-2 ${!isSupported
                                    ? 'opacity-40 cursor-not-allowed border-white/5 grayscale saturate-0 bg-black/50'
                                    : isSelected
                                        ? 'border-[#ff0055] shadow-[0_0_30px_rgba(255,0,85,0.4)] scale-[1.03] z-10'
                                        : 'border-white/10 hover:border-white/30 hover:shadow-2xl hover:shadow-[#ff0055]/10'
                                    }`}
                                style={{ height: '220px' }}
                            >
                                <img
                                    src={game.image}
                                    alt={game.name}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isSelected ? 'scale-110 filter brightness-110 saturate-110' : 'group-hover:scale-110 filter brightness-90 saturate-100 group-hover:brightness-110 group-hover:saturate-110'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-60" />
                                {isSelected && <div className="absolute inset-0 bg-[#ff0055]/20 mix-blend-overlay pointer-events-none" />}

                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                                    <h4 className={`font-black uppercase tracking-tight mb-2 truncate drop-shadow-lg ${isSelected ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/95 group-hover:text-white drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]'}`}>
                                        {game.name}
                                    </h4>

                                    <div className="flex items-center gap-2">
                                        <div className={`inline-block px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest ${isSelected ? 'bg-[#ff0055] text-white shadow-[#ff0055]/50 shadow-md' : 'bg-black/60 text-white/70 backdrop-blur-md border border-white/10'}`}>
                                            {pricingLabel}
                                        </div>
                                    </div>
                                </div>

                                {!isSupported && selectedStation && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-center border border-white/5">
                                        <p className="text-[9px] font-black text-[#ff0055] uppercase tracking-widest bg-black/80 px-3 py-1.5 rounded-full border border-[#ff0055]/30">Not Available on {selectedStation}</p>
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
