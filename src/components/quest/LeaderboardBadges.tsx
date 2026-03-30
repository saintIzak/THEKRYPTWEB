import { Trophy, ShieldAlert, Sparkles, Target, Zap, Medal, Star } from 'lucide-react';

const LEADERBOARD = [
    { rank: 1, name: 'SILENT_ASSASSIN', coins: '124,500', tier: 'KRYPT BLACK' },
    { rank: 2, name: 'NEON_KNIGHT', coins: '98,200', tier: 'WARLORD' },
    { rank: 3, name: 'VOID_WALKER', coins: '85,450', tier: 'LEGENDARY' },
    { rank: 142, name: 'YOU (OPERATOR)', coins: '2,450', tier: 'ELITE', isCurrentUser: true },
];

const BADGES = [
    { name: 'FIRST BLOOD', desc: 'Booked first session', icon: Target, unlocked: true, color: 'emerald' },
    { name: 'VAULT HUNTER', desc: 'Purchased 5 items', icon: ShieldAlert, unlocked: true, color: 'blue' },
    { name: 'SQUAD LEADER', desc: 'Referred 10 friends', icon: Sparkles, unlocked: false, color: 'purple' },
    { name: 'TOURNAMENT BEAST', desc: 'Won a campaign', icon: Trophy, unlocked: false, color: 'red' },
    { name: 'COMMUNITY ALLY', desc: '5 social missions', icon: Zap, unlocked: true, color: 'amber' },
    { name: 'FOUNDER', desc: 'Joined year one', icon: Star, unlocked: true, color: 'zinc' },
];

export function LeaderboardBadges() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10 relative">

            {/* Divider */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2" />

            {/* Leaderboard Column */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-red-600" />
                        TOP <span className="text-zinc-500">EARNERS</span>
                    </h2>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">MONTHLY RANKING</span>
                </div>

                <div className="flex flex-col gap-2">
                    {LEADERBOARD.map((player, i) => {
                        const isTop1 = player.rank === 1;
                        const isTop2 = player.rank === 2;
                        const isTop3 = player.rank === 3;

                        return (
                            <div
                                key={i}
                                className={`flex items-center justify-between p-4 border transition-colors group relative overflow-hidden
                  ${player.isCurrentUser ? 'bg-red-950/20 border-red-900/50 shadow-[inset_0_0_15px_rgba(220,38,38,0.1)]' :
                                        isTop1 || isTop2 || isTop3 ? 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700' :
                                            'bg-zinc-950/30 border-transparent hover:border-zinc-800'}
                `}
                            >
                                {/* Active Player Indicator */}
                                {player.isCurrentUser && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                                )}

                                <div className="flex items-center gap-4 sm:gap-5">
                                    <div className={`w-8 font-black italic tracking-tighter text-2xl sm:text-3xl text-center
                    ${isTop1 ? 'text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]' :
                                            isTop2 ? 'text-zinc-300 drop-shadow-[0_0_5px_rgba(212,212,216,0.5)]' :
                                                isTop3 ? 'text-amber-700' : 'text-zinc-600'}
                  `}>
                                        {player.rank}
                                    </div>
                                    <div>
                                        <div className={`font-black uppercase tracking-widest text-sm sm:text-base leading-none mb-1.5 
                      ${player.isCurrentUser ? 'text-white' : isTop1 ? 'text-amber-500' : isTop2 ? 'text-zinc-300' : 'text-zinc-300'}
                    `}>
                                            {player.name}
                                        </div>
                                        <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">
                                            {player.tier}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className={`font-black italic tracking-tighter tabular-nums text-lg sm:text-xl leading-none mb-1.5
                    ${player.isCurrentUser ? 'text-red-500' : 'text-white'}
                  `}>
                                        {player.coins}
                                    </div>
                                    <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest leading-none">COINS</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Badges Column */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-2">
                        <Medal className="w-5 h-5 text-amber-500 " />
                        HONOR <span className="text-zinc-500">BADGES</span>
                    </h2>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">YOUR COLLECTION</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BADGES.map((badge, i) => {
                        const Icon = badge.icon;
                        const isUnlocked = badge.unlocked;

                        return (
                            <div
                                key={i}
                                className={`bg-zinc-950/80 border p-4 flex flex-col items-center justify-center text-center transition-all duration-300 relative overflow-hidden group
                  ${isUnlocked ? 'border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50' : 'border-zinc-900/50 opacity-40 grayscale'}
                `}
                            >
                                {/* Subtle shine on hover for unlocked */}
                                {isUnlocked && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />}

                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 relative shrink-0
                  ${isUnlocked ? 'bg-zinc-900' : 'bg-transparent border border-zinc-800'}
                `}>
                                    <Icon className={`w-6 h-6 z-10 
                    ${isUnlocked ? (
                                            badge.color === 'emerald' ? 'text-emerald-500' :
                                                badge.color === 'blue' ? 'text-blue-500' :
                                                    badge.color === 'purple' ? 'text-purple-500' :
                                                        badge.color === 'red' ? 'text-red-500' :
                                                            badge.color === 'amber' ? 'text-amber-500' : 'text-zinc-400'
                                        ) : 'text-zinc-700'
                                        }
                  `}
                                        style={isUnlocked ? { filter: `drop-shadow(0 0 8px currentColor)` } : {}}
                                    />
                                    {isUnlocked && (
                                        <div className="absolute inset-0 rounded-full border border-current opacity-20" color={badge.color} />
                                    )}
                                </div>

                                <h4 className="font-black uppercase tracking-widest text-[9px] sm:text-[10px] text-white mb-1 line-clamp-1 w-full">{badge.name}</h4>
                                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest leading-tight">{badge.desc}</p>

                                {!isUnlocked && (
                                    <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[1px] flex items-center justify-center">
                                        <span className="text-[9px] font-black italic tracking-widest text-zinc-600 uppercase border border-zinc-800 bg-zinc-950 px-2 py-0.5">LOCKED</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
