import { AlertCircle, CalendarDays, ShoppingCart, Target, Zap } from 'lucide-react';

const UPDATES = [
    {
        type: 'NEXT EVENT',
        title: 'Friday Night Tournament',
        icon: CalendarDays,
        color: 'red',
        action: 'JOIN NOW'
    },
    {
        type: 'NEW DROP',
        title: 'PS5 Elite Controller Available',
        icon: ShoppingCart,
        color: 'zinc',
        action: 'SHOP'
    },
    {
        type: 'ANNOUNCEMENT',
        title: 'Double KRYPT COIN Weekend is LIVE',
        icon: Zap,
        color: 'amber',
        action: 'DETAILS'
    },
    {
        type: 'COMMUNITY',
        title: 'Squad Battle Registrations Open',
        icon: Target,
        color: 'blue',
        action: 'REGISTER'
    },
    {
        type: 'BOOKING ALERT',
        title: 'Weekend Elite slots filling fast',
        icon: AlertCircle,
        color: 'purple',
        action: 'BOOK'
    }
];

export function LiveUpdatesStrip() {
    return (
        <div className="container mx-auto px-4 sm:px-6 mb-16 relative z-10">
            {/* Horizontal scroll container on mobile, flex wrap on desktop if needed, 
                actually let's make it a nice scrollable strip that hides scrollbar */}
            <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 sm:gap-4 no-scrollbar">

                <div className="flex gap-3 sm:gap-4 shrink-0 min-w-full lg:min-w-0">
                    {UPDATES.map((update, i) => {
                        const Icon = update.icon;
                        const isRed = update.color === 'red';
                        const isAmber = update.color === 'amber';
                        const isBlue = update.color === 'blue';
                        const isPurple = update.color === 'purple';

                        return (
                            <button
                                key={i}
                                className="bg-zinc-950/80 backdrop-blur-sm border border-zinc-800 hover:border-zinc-600 p-3 sm:p-4 flex items-center gap-4 group transition-all shrink-0 w-[280px] sm:w-[320px] text-left relative overflow-hidden"
                            >
                                {/* Hover background glow */}
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />

                                <div className={`p-2 rounded-sm shrink-0 border transition-colors
                                    ${isRed ? 'bg-red-950/50 border-red-900/50 text-red-500 group-hover:text-red-400 group-hover:border-red-500/50' :
                                        isAmber ? 'bg-amber-950/50 border-amber-900/50 text-amber-500 group-hover:text-amber-400 group-hover:border-amber-500/50' :
                                            isBlue ? 'bg-blue-950/50 border-blue-900/50 text-blue-500 group-hover:text-blue-400 group-hover:border-blue-500/50' :
                                                isPurple ? 'bg-purple-950/50 border-purple-900/50 text-purple-500 group-hover:text-purple-400 group-hover:border-purple-500/50' :
                                                    'bg-zinc-900/50 border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600'}
                                `}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className={`text-[8px] font-black uppercase tracking-widest
                                           ${isRed ? 'text-red-500' : isAmber ? 'text-amber-500' : isBlue ? 'text-blue-500' : isPurple ? 'text-purple-500' : 'text-zinc-500'}
                                        `}>
                                            {update.type}
                                        </span>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                            {update.action} →
                                        </span>
                                    </div>
                                    <div className="text-[10px] sm:text-[11px] font-bold text-zinc-200 uppercase tracking-wider truncate">
                                        {update.title}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Global style for hiding scrollbar while keeping functionality */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    );
}
