import { useState, useMemo } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Quick utility to generate dates
const generateDates = (days: number) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push(d);
    }
    return dates;
};

// Generate time slots (10:00 AM to 10:00 PM)
const generateTimeSlots = () => {
    const slots = [];
    for (let h = 10; h <= 21; h++) {
        slots.push(`${h}:00`);
        slots.push(`${h}:30`);
    }
    return slots;
};

interface SchedulePickerProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
}

export default function SchedulePicker({
    selectedDate,
    onSelectDate,
    selectedTime,
    onSelectTime
}: SchedulePickerProps) {
    const dates = useMemo(() => generateDates(7), []);
    const timeSlots = useMemo(() => generateTimeSlots(), []);

    // Simulate some simple random availability for visual effect
    const isSlotAvailable = (time: string) => {
        if (time === '20:00' || time === '14:30' || time === '18:30') return false;
        return true;
    };

    return (
        <div className="space-y-10">
            {/* Date Picker */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff0055]/20 text-[#ff0055] text-[10px] font-black">3</div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                        Select Date <Calendar className="w-4 h-4 text-[#ff0055]" />
                    </h3>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                    {dates.map((date, i) => {
                        const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
                        const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
                        const dateNum = date.getDate();
                        const monthName = date.toLocaleDateString('en-US', { month: 'short' });

                        return (
                            <button
                                key={i}
                                onClick={() => onSelectDate(date)}
                                className={`flex-shrink-0 snap-start w-[88px] flex flex-col items-center justify-center py-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${isSelected
                                    ? 'bg-[#ff0055]/10 border-[#ff0055] shadow-[0_0_20px_rgba(255,0,85,0.3)] scale-[1.02]'
                                    : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                                    }`}
                            >
                                {isSelected && <div className="absolute inset-0 bg-gradient-to-b from-[#ff0055]/20 to-transparent pointer-events-none" />}

                                <span className={`text-[10px] font-black uppercase tracking-widest mb-2 z-10 ${isSelected ? 'text-[#ff0055]' : 'text-white/40 group-hover:text-white/60'}`}>
                                    {dayName}
                                </span>
                                <span className={`text-3xl font-black z-10 ${isSelected ? 'text-white drop-shadow-md' : 'text-white/80 group-hover:text-white'}`}>
                                    {dateNum}
                                </span>
                                <span className={`text-[9px] uppercase font-bold mt-1 z-10 ${isSelected ? 'text-white/80' : 'text-white/30 group-hover:text-white/50'}`}>
                                    {monthName}
                                </span>

                                {i === 0 && !isSelected && (
                                    <Sparkles className="absolute top-2 right-2 w-3 h-3 text-[#00d9ff]/50" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Time Slot Grid */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="transition-all duration-500 relative mt-6"
            >
                {!selectedDate && (
                    <div className="absolute -inset-4 z-20 flex items-center justify-center bg-[#0b0b0f]/60 backdrop-blur-sm rounded-3xl border border-white/5 pointer-events-none">
                        <div className="bg-[#12121a]/90 px-6 py-3 rounded-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-3">
                            <Clock className="w-4 h-4 text-[#ff0055]" />
                            <p className="text-xs font-black text-white uppercase tracking-[0.2em]">
                                Select a date first
                            </p>
                        </div>
                    </div>
                )}

                <div className={`transition-all duration-500 ${!selectedDate ? 'pointer-events-none grayscale opacity-30 select-none' : ''}`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff0055]/20 text-[#ff0055] text-[10px] font-black">4</div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest -mt-0.5">
                                Select Time Slot
                            </h3>
                        </div>
                        <span className="text-[9px] bg-white/5 text-white/50 px-3 py-1.5 rounded-full font-bold uppercase tracking-widest border border-white/10">
                            30m Blocks
                        </span>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 relative z-10">
                        {timeSlots.map((time) => {
                            const available = isSlotAvailable(time);
                            const isSelected = selectedTime === time;

                            return (
                                <button
                                    key={time}
                                    disabled={!available}
                                    onClick={() => onSelectTime(time)}
                                    className={`py-3.5 rounded-xl text-sm font-black transition-all border relative overflow-hidden flex items-center justify-center group ${!available
                                        ? 'opacity-30 border-white/5 bg-black/60 cursor-not-allowed'
                                        : isSelected
                                            ? 'bg-[#ff0055] border-[#ff0055] text-white shadow-[0_0_20px_rgba(255,0,85,0.4)] scale-105 z-10'
                                            : 'bg-white/[0.02] border-white/5 text-white/60 hover:border-white/20 hover:text-white hover:bg-white/[0.05]'
                                        }`}
                                >
                                    <span className={`relative z-10 ${isSelected ? 'drop-shadow-md' : ''}`}>{time}</span>

                                    {!available && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-50">
                                            <div className="w-full h-[2px] bg-red-500 -rotate-[25deg] absolute" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
