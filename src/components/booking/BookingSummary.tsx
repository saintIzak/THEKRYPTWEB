import { motion, AnimatePresence } from 'framer-motion';
import { ArcadeGame, PRICING_RULES, StationCategory, StationSlot } from '../../data/bookingMockData';
import { Button } from '../ui/button';
import { Shield, Zap, Gamepad2, Calendar, Clock, Lock } from 'lucide-react';

interface BookingSummaryProps {
    station: StationCategory | null;
    slot: StationSlot | null;
    game: ArcadeGame | null;
    date: Date | null;
    time: string | null;
    duration: number;
    onBook: () => void;
    onReset: () => void;
    isBookingAllowed: boolean;
}

export default function BookingSummary({
    station,
    slot,
    game,
    date,
    time,
    duration,
    onBook,
    onReset,
    isBookingAllowed
}: BookingSummaryProps) {

    // Calculate price
    let subtotal = 0;
    let ratePerMin = 0;
    let rateLabel = '';

    if (game) {
        ratePerMin = PRICING_RULES[game.pricingRule].ratePerMin;
        rateLabel = PRICING_RULES[game.pricingRule].label;
        subtotal = Math.ceil(ratePerMin * duration);
    } else if (station) {
        const fallbackRule = station.id === 'vr' ? PRICING_RULES.vr
            : PRICING_RULES.defaultConsole;

        ratePerMin = fallbackRule.ratePerMin;
        rateLabel = fallbackRule.label;
        subtotal = Math.ceil(ratePerMin * duration);
    }

    const formatDate = (d: Date | null) => {
        if (!d) return '--';
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="bg-[#12121a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col h-full relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#ff0055]/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

            {/* Header */}
            <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6 pb-4 border-b border-white/5 flex items-center justify-between relative z-10">
                <span>Booking <span className="text-[#ff0055]">Summary</span></span>
                <span className="text-[10px] bg-[#ff0055]/20 text-[#ff0055] px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff0055] animate-pulse" /> Live
                </span>
            </h2>

            {/* Selected Game Poster (Combo with Station) */}
            <div className="mb-8 relative z-10">
                <AnimatePresence mode="popLayout">
                    {game ? (
                        <motion.div
                            key="game-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
                        >
                            <img src={game.image} alt={game.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                            <div className="absolute inset-0 p-4 flex flex-col justify-between">
                                <div className="flex justify-end gap-2">
                                    <span className="bg-[#ff0055] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm shadow-[0_0_10px_rgba(255,0,85,0.5)]">
                                        {rateLabel}
                                    </span>
                                    {station && (
                                        <span className="bg-[#8b5cf6] text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                                            {station.id}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1 shadow-black drop-shadow-md">Selected Game</p>
                                    <h3 className="text-2xl font-black text-white uppercase leading-none tracking-tighter drop-shadow-lg">{game.name}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full aspect-[4/3] rounded-2xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-3"
                        >
                            <Gamepad2 className="w-10 h-10 text-white/20" />
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">No Game Selected</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="space-y-4 flex-1 relative z-10">
                {/* Station Line */}
                <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        {station ? <station.icon className="w-5 h-5 text-[#8b5cf6]" /> : <Zap className="w-5 h-5 text-white/20" />}
                    </div>
                    <div className="flex-1">
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Platform</div>
                        <div className="font-bold text-white text-sm uppercase">{station?.name || 'Select Arena...'}</div>
                    </div>
                    {slot && <span className="text-[9px] bg-white/10 text-white/70 px-2 py-1 rounded font-bold">{slot.name}</span>}
                </div>

                {/* Schedule Line */}
                <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <Calendar className="w-5 h-5 text-[#00d9ff]" />
                    </div>
                    <div className="flex-1">
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Time & Date</div>
                        <div className="font-bold text-white text-sm uppercase">
                            {formatDate(date)} <span className="text-white/30 mx-1">|</span> {time || '--'}
                        </div>
                    </div>
                </div>

                {/* Duration Line */}
                <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                        <Clock className="w-5 h-5 text-[#ff0055]" />
                    </div>
                    <div className="flex-1">
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Duration</div>
                        <div className="font-bold text-white text-sm uppercase">{duration} Minutes</div>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                {/* Pricing Details */}
                <div className="space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between text-sm">
                        <span className="text-white/50 font-medium">Session Rate</span>
                        <span className="text-white font-bold tracking-wide">{rateLabel || '--'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-white/50 font-medium">Est. Value</span>
                        <span className="text-white font-bold tracking-wide">KSH {subtotal}</span>
                    </div>
                    <div className="pt-3 border-t border-white/5 flex justify-between items-end mt-2">
                        <span className="text-white/50 font-black uppercase tracking-widest text-[10px] mb-1">Total Due</span>
                        <span className="text-4xl font-black text-[#ff0055] tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,85,0.4)]">
                            <span className="text-lg">KSH</span> {subtotal}
                        </span>
                    </div>
                </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-3 relative z-10">
                <Button
                    onClick={onBook}
                    disabled={!isBookingAllowed}
                    className="relative w-full h-14 bg-[#ff0055] hover:bg-[#ff0055]/90 text-white font-black text-lg uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,0,85,0.3)] hover:shadow-[0_0_30px_rgba(255,0,85,0.5)] disabled:opacity-50 disabled:shadow-none disabled:bg-white/5 disabled:text-white/30 transition-all overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative flex items-center justify-center gap-2">
                        {isBookingAllowed ? (
                            <>Confirm Booking <Lock className="w-4 h-4" /></>
                        ) : 'Pending Details'}
                    </span>
                </Button>

                <div className="flex items-center justify-between px-2">
                    <span className="text-[9px] font-bold text-white/30 uppercase flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Secure Crypto/Fiat
                    </span>
                    <button
                        onClick={onReset}
                        className="text-[9px] font-black text-white/30 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                    >
                        Reset Flow
                    </button>
                </div>
            </div>
        </div>
    );
}
