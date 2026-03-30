import { Plus, Gift, Users, Target, Shield, Zap, Sparkles, Coins } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

// Animated Counter Hook
function useCounter(end: number, duration: number = 1500) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Easing out sine
            const easeProgress = Math.sin((progress * Math.PI) / 2);

            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return count;
}

export function WalletDashboard() {
    const coinBalance = useCounter(2450);

    return (
        <div className="relative mb-10">
            {/* 1. QUEST LOG HEADER / HERO */}
            <div className="text-center mb-8 relative z-10 px-4 pt-4 sm:pt-8">
                {/* Subtle tactical ambient background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] max-w-4xl h-48 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-zinc-950/0 to-transparent blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-px bg-red-600/50" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Loyalty Platform</span>
                    <div className="w-8 h-px bg-red-600/50" />
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    QUEST LOG <span className="text-red-600 mx-2">//</span> <span className="text-zinc-100">KRYPT COIN COMMAND</span>
                </h1>

                <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
                    The central hub for operator advancement. Earn, top up, and redeem KRYPT COIN to unlock exclusive rewards, event access, and elite prestige.
                </p>

                {/* Quick Actions Strip */}
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-none px-6 group relative overflow-hidden transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)]">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        <Plus className="w-3.5 h-3.5 mr-2" /> Top Up Coins
                    </Button>
                    <Button variant="outline" className="border-zinc-800 hover:border-white bg-zinc-900/50 text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-none px-6 transition-colors">
                        <Gift className="w-3.5 h-3.5 mr-2" /> Redeem
                    </Button>
                    <Button variant="outline" className="border-zinc-800 hover:border-zinc-600 bg-transparent text-zinc-400 hover:text-white font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-none px-6 transition-colors hidden sm:flex">
                        <Users className="w-3.5 h-3.5 mr-2" /> Invite Squad
                    </Button>
                </div>
            </div>

            {/* 2. TOP SUMMARY DASHBOARD STRIP */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-20">

                {/* Card 1: KRYPT COIN Balance */}
                <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between group hover:border-zinc-600 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-tight">TOTAL KRYPT<br />COIN BALANCE</span>
                        <Coins className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black italic tracking-tighter text-white tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                        {coinBalance.toLocaleString()}
                    </div>
                </div>

                {/* Card 2: Current Tier */}
                <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between group hover:border-zinc-600 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-tight">CURRENT<br />OPERATOR TIER</span>
                        <Shield className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black italic tracking-tighter text-white uppercase">
                        ELITE <span className="text-red-500">TIER</span>
                    </div>
                </div>

                {/* Card 3: Active Missions */}
                <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between group hover:border-zinc-600 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-tight">ACTIVE<br />MISSIONS</span>
                        <Target className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-white tabular-nums">4</span>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 pb-0.5">AVAILABLE</span>
                    </div>
                </div>

                {/* Card 4: Next Unlock */}
                <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between group hover:border-zinc-600 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest leading-tight">NEXT TIER<br />UNLOCK</span>
                        <Sparkles className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                        <div className="text-lg sm:text-xl font-black italic tracking-tighter text-white uppercase truncate">
                            LEGENDARY
                        </div>
                        <div className="w-full bg-zinc-900 h-1 mt-2 relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]" style={{ width: '45%' }} />
                        </div>
                        <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-1 text-right">
                            1,550 KC REQ
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
