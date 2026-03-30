import { Plus, Minus, Clock } from 'lucide-react';

interface DurationPickerProps {
    durationMinutes: number;
    onChange: (minutes: number) => void;
    minDuration: number;
}

export default function DurationPicker({
    durationMinutes,
    onChange,
    minDuration
}: DurationPickerProps) {

    const handleIncrement = () => onChange(durationMinutes + 5);
    const handleDecrement = () => {
        if (durationMinutes - 5 >= minDuration) {
            onChange(durationMinutes - 5);
        }
    };

    const quickPicks = [30, 60, 90, 120];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff0055]/20 text-[#ff0055] text-[10px] font-black">5</div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                    Session Duration <Clock className="w-4 h-4 text-[#ff0055]" />
                </h3>
            </div>

            {/* Stepper & Quick Picks Container */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">

                {/* Stepper */}
                <div className="flex items-center gap-6 bg-black/40 border border-white/5 py-5 px-8 rounded-2xl shadow-inner min-w-[280px] justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff0055]/30 to-transparent" />

                    <button
                        onClick={handleDecrement}
                        disabled={durationMinutes <= minDuration}
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${durationMinutes <= minDuration
                                ? 'opacity-30 cursor-not-allowed border-white/5 text-white/40 bg-white/[0.02]'
                                : 'border-white/10 text-white/60 hover:border-[#ff0055]/50 hover:text-[#ff0055] hover:bg-[#ff0055]/10 bg-white/5'
                            }`}
                    >
                        <Minus className="w-5 h-5" />
                    </button>

                    <div className="text-center flex-1">
                        <div className="text-4xl font-black text-white leading-none drop-shadow-lg tracking-tighter">
                            {durationMinutes}
                        </div>
                        <div className="text-[10px] font-black text-[#ff0055] uppercase tracking-[0.2em] mt-2">
                            Minutes
                        </div>
                    </div>

                    <button
                        onClick={handleIncrement}
                        className="w-12 h-12 rounded-xl border border-white/10 text-white/60 flex items-center justify-center transition-all hover:border-[#ff0055]/50 hover:text-[#ff0055] hover:bg-[#ff0055]/10 bg-white/5"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="hidden md:block w-px h-16 bg-white/5" />

                {/* Quick Picks */}
                <div className="flex-1">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Quick Select</p>
                    <div className="flex flex-wrap gap-3">
                        {quickPicks.map(mins => {
                            const isSelected = durationMinutes === mins;
                            const isTooShort = mins < minDuration;

                            return (
                                <button
                                    key={mins}
                                    disabled={isTooShort}
                                    onClick={() => onChange(mins)}
                                    className={`px-5 py-3 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${isTooShort
                                            ? 'opacity-30 cursor-not-allowed border-white/5 text-white/20 bg-black/40'
                                            : isSelected
                                                ? 'bg-[#ff0055] border-[#ff0055] text-white shadow-[0_0_15px_rgba(255,0,85,0.4)]'
                                                : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/20 hover:text-white hover:bg-white/[0.05]'
                                        }`}
                                >
                                    {mins} Min
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-6 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00d9ff] animate-pulse" />
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Minimum <strong className="text-white/80">{minDuration} minutes</strong> required for selected platform.
                </p>
            </div>
        </div>
    );
}
