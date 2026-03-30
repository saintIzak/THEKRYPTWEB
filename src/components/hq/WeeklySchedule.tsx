import { CalendarDays, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const SCHEDULE = [
    { day: 'FRI', date: 'DEC 15', title: 'Friday Night Skirmish', type: 'CASUAL TOURNAMENT', time: '18:00 EAT', active: true },
    { day: 'SAT', date: 'DEC 16', title: 'Double XP Weekend', type: 'CAMPAIGN', time: 'ALL DAY', active: false },
    { day: 'SUN', date: 'DEC 17', title: 'Squad Arena Clash', type: 'TEAM BATTLES', time: '14:00 EAT', active: false },
    { day: 'WED', date: 'DEC 20', title: 'Midweek Recon', type: 'COMMUNITY NIGHT', time: '19:00 EAT', active: false },
];

export function WeeklySchedule() {
    return (
        <div className="mb-24">
            <div className="bg-zinc-950/50 border border-zinc-800 p-6 sm:p-10 relative overflow-hidden group">
                {/* Background lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-900/5 to-transparent pointer-events-none group-hover:from-red-900/10 transition-colors" />

                <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:items-center">

                    {/* Header Side */}
                    <div className="lg:w-1/3">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <CalendarDays className="w-5 h-5 text-zinc-500" />
                            <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white">
                                WEEKLY <span className="text-zinc-500">SCHEDULE</span>
                            </h2>
                        </div>
                        <p className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed mb-6">
                            Plan your deployments. See what's dropping at THE KRYPT this week and secure your station in advance.
                        </p>
                        <Button className="bg-zinc-100 hover:bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-none px-6 py-4 h-auto transition-colors w-full sm:w-auto">
                            VIEW FULL CALENDAR
                        </Button>
                    </div>

                    {/* Timeline Side */}
                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {SCHEDULE.map((item, i) => (
                            <div
                                key={i}
                                className={`p-5 flex flex-col justify-between border transition-all duration-300 relative
                                    ${item.active
                                        ? 'bg-red-950/20 border-red-900/50 hover:bg-red-950/30 hover:border-red-500/50 shadow-[inset_0_0_20px_rgba(220,38,38,0.05)] translate-y-[-4px]'
                                        : 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 hover:translate-y-[-4px]'}
                                `}
                            >
                                {item.active && (
                                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                                )}

                                <div className="mb-6">
                                    <div className="flex items-end gap-2 mb-4 pb-4 border-b border-zinc-800/50">
                                        <span className={`text-2xl font-black italic tracking-tighter leading-none ${item.active ? 'text-white' : 'text-zinc-300'}`}>
                                            {item.day}
                                        </span>
                                        <span className={`text-[10px] font-black uppercase tracking-widest leading-relaxed ${item.active ? 'text-red-500' : 'text-zinc-500'}`}>
                                            {item.date}
                                        </span>
                                    </div>
                                    <div className={`text-[8px] font-black uppercase tracking-widest mb-1.5 ${item.active ? 'text-red-400' : 'text-zinc-500'}`}>
                                        {item.type}
                                    </div>
                                    <h3 className={`text-sm font-black uppercase tracking-tighter leading-snug ${item.active ? 'text-white' : 'text-zinc-400'}`}>
                                        {item.title}
                                    </h3>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 tabular-nums">
                                        {item.time}
                                    </span>
                                    <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors
                                        ${item.active ? 'bg-red-600 border-red-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-600'}
                                    `}>
                                        <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
