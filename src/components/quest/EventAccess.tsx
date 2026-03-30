import { CalendarDays, MapPin, Lock, Gift, Users, Trophy } from 'lucide-react';
import { Button } from '../ui/button';

export function EventAccess() {
    return (
        <div className="mb-10">
            <div className="relative overflow-hidden bg-zinc-950 border border-zinc-800 group">

                {/* Ambient Dark Premium Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-luminosity brightness-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent" />
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none" />

                {/* Animated Scanline Shimmer targeting event rarity */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/5 to-transparent h-1 w-full animate-scan opacity-50" />

                <div className="relative z-10 p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">

                    <div className="flex-1 text-center lg:text-left max-w-2xl">
                        <div className="inline-flex items-center gap-2 mb-6 border border-red-900/50 bg-red-950/30 pl-2 pr-3 py-1">
                            <Lock className="w-3.5 h-3.5 text-red-500" />
                            <span className="text-[9px] font-black text-red-400 uppercase tracking-widest leading-none mt-0.5">MEMBERS ONLY. EXTREMELY LIMITED ENTRY.</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-white mb-4">
                            KRYPT <span className="text-red-600">INVITATIONAL</span>
                        </h2>

                        <p className="text-[11px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-relaxed mb-6">
                            Access the most exclusive event circuit in the city. Prove your loyalty, spend your KRYPT COIN, and claim your spot among the elite. Massive cash prizes, hardware drops, and operator bragging rights.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-8 py-4 border-y border-zinc-800/50">
                            <div className="flex items-center gap-2 text-zinc-300 font-bold uppercase tracking-widest text-xs">
                                <CalendarDays className="w-4 h-4 text-zinc-500" /> DEC 15, 2026
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-zinc-800" />
                            <div className="flex items-center gap-2 text-zinc-300 font-bold uppercase tracking-widest text-xs">
                                <MapPin className="w-4 h-4 text-zinc-500" /> NAIROBI HQ ARENA
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button className="bg-red-600 hover:bg-white text-white hover:text-black font-black uppercase tracking-widest text-xs rounded-none px-8 py-6 h-auto transition-colors group relative overflow-hidden w-full sm:w-auto">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                UNLOCK FOR 10,000 KC
                            </Button>
                            <Button variant="outline" className="border-zinc-700 bg-transparent text-zinc-400 hover:text-white hover:border-white font-black uppercase tracking-widest text-xs rounded-none px-6 py-6 h-auto transition-colors w-full sm:w-auto">
                                VIEW ROSTER
                            </Button>
                        </div>
                    </div>

                    <div className="w-full lg:w-auto flex justify-center lg:justify-end">
                        <div className="flex flex-col gap-3">
                            <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-center gap-4 w-64 group hover:border-zinc-600 transition-colors">
                                <div className="p-2 border border-zinc-700 bg-zinc-950 text-zinc-400 group-hover:text-emerald-500 group-hover:border-emerald-900">
                                    <Trophy className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white mb-0.5">VIP SEATING & GEAR</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 leading-tight">Elite arena view spots</div>
                                </div>
                            </div>

                            <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-center gap-4 w-64 group hover:border-zinc-600 transition-colors">
                                <div className="p-2 border border-zinc-700 bg-zinc-950 text-zinc-400 group-hover:text-amber-500 group-hover:border-amber-900">
                                    <Gift className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white mb-0.5">EXCLUSIVE DROPS</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 leading-tight">Hardware giveaways</div>
                                </div>
                            </div>

                            <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-center gap-4 w-64 group hover:border-zinc-600 transition-colors">
                                <div className="p-2 border border-zinc-700 bg-zinc-950 text-zinc-400 group-hover:text-blue-500 group-hover:border-blue-900">
                                    <Users className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white mb-0.5">ELITE RECOGNITION</div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 leading-tight">Special profile visual tag</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
