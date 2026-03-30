import { CalendarDays, Ticket, ShoppingCart, Zap, Users } from 'lucide-react';
import { Button } from '../ui/button';

export function QuickActions() {
    return (
        <div className="mb-24">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">

                <button className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/50 p-6 flex flex-col items-center justify-center text-center group transition-all duration-300 col-span-2 md:col-span-1">
                    <div className="w-12 h-12 bg-red-950/30 border border-red-900/50 text-red-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-500 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                        <CalendarDays className="w-5 h-5" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-[10px] sm:text-xs text-white group-hover:text-zinc-100 mb-1">Book Station</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400">Reserve Time</span>
                </button>

                <button className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/50 p-6 flex flex-col items-center justify-center text-center group transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-950/30 border border-blue-900/50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <Ticket className="w-5 h-5" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-[10px] sm:text-xs text-white group-hover:text-zinc-100 mb-1">Join Event</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400">Get Ticket</span>
                </button>

                <button className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/50 p-6 flex flex-col items-center justify-center text-center group transition-all duration-300">
                    <div className="w-12 h-12 bg-zinc-900/50 border border-zinc-700 text-zinc-400 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-black group-hover:border-white transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-[10px] sm:text-xs text-white group-hover:text-zinc-100 mb-1">Shop Vault</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400">View Gear</span>
                </button>

                <button className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/50 p-6 flex flex-col items-center justify-center text-center group transition-all duration-300">
                    <div className="w-12 h-12 bg-amber-950/30 border border-amber-900/50 text-amber-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <Zap className="w-5 h-5" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-[10px] sm:text-xs text-white group-hover:text-zinc-100 mb-1">Top Up</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400">Buy Coins</span>
                </button>

                <button className="bg-zinc-950/80 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/50 p-6 flex flex-col items-center justify-center text-center group transition-all duration-300 col-span-2 md:col-span-1">
                    <div className="w-12 h-12 bg-purple-950/30 border border-purple-900/50 text-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-500 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <Users className="w-5 h-5" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-[10px] sm:text-xs text-white group-hover:text-zinc-100 mb-1">Recruit</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400">Invite Squad</span>
                </button>

            </div>
        </div>
    );
}
