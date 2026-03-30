import { Flame, Calendar, Trophy, Zap, Clock } from 'lucide-react';

const WEEKLY_CHALLENGES = [
    {
        title: 'Weekend Warrior',
        description: 'Book and complete 2 different gaming sessions between Friday and Sunday.',
        reward: 1000,
        progress: 1,
        total: 2,
        icon: Flame,
        color: 'red',
    },
    {
        title: 'Community Drop',
        description: 'Participate in any organized KRYPT community event or tournament this week.',
        reward: 2500,
        progress: 0,
        total: 1,
        icon: Trophy,
        color: 'amber',
    },
    {
        title: 'Double Coin Friday',
        description: 'Activate your operator status on Friday to earn 2x coins on all session bookings.',
        reward: '2X M',
        progress: 0,
        total: 1,
        icon: Zap,
        color: 'blue',
    },
];

export function WeeklyChallenges() {
    return (
        <div className="mb-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                        WEEKLY <span className="text-zinc-500">CAMPAIGNS</span>
                    </h2>
                    <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
                        High-value target operations for dedicated operators.
                    </p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 flex items-center gap-3 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <Clock className="w-4 h-4 text-red-500 animate-pulse" />
                    <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-tight">CAMPAIGN ENDS</div>
                        <div className="text-xs font-black uppercase tracking-widest text-white leading-tight">2D 14H</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {WEEKLY_CHALLENGES.map((challenge, i) => {
                    const Icon = challenge.icon;
                    const isRed = challenge.color === 'red';
                    const isAmber = challenge.color === 'amber';
                    const isBlue = challenge.color === 'blue';

                    const progressPercent = (challenge.progress / challenge.total) * 100;
                    const isCompleted = progressPercent === 100;

                    return (
                        <div
                            key={i}
                            className={`relative bg-zinc-950/80 border p-6 flex flex-col group overflow-hidden transition-colors
                ${isCompleted ? 'border-emerald-900/50 opacity-80' :
                                    isRed ? 'border-red-900/30 hover:border-red-600/50' :
                                        isAmber ? 'border-amber-900/30 hover:border-amber-600/50' :
                                            'border-blue-900/30 hover:border-blue-600/50'}
              `}
                        >
                            {/* Subtle background glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10 pointer-events-none
                ${isRed ? 'bg-red-500' : isAmber ? 'bg-amber-500' : 'bg-blue-500'}
              `} />

                            <div className="flex justify-between items-start mb-5 relative z-10 gap-4">
                                <div className={`p-3 rounded-sm border
                  ${isRed ? 'bg-red-950/50 border-red-900/50 text-red-500' :
                                        isAmber ? 'bg-amber-950/50 border-amber-900/50 text-amber-500' :
                                            'bg-blue-950/50 border-blue-900/50 text-blue-500'}
                `}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="text-right">
                                    <div className={`text-xl font-black italic tabular-nums tracking-tighter leading-none
                    ${isRed ? 'text-red-500' : isAmber ? 'text-amber-500' : 'text-blue-500'}
                  `}>
                                        {typeof challenge.reward === 'number' ? `+${challenge.reward}` : challenge.reward}
                                    </div>
                                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mt-1">KRYPT COIN</span>
                                </div>
                            </div>

                            <div className="mb-8 relative z-10 flex-1">
                                <h3 className="font-black uppercase tracking-widest text-[13px] text-white mb-2">{challenge.title}</h3>
                                <p className="text-[10px] font-bold text-zinc-400 leading-relaxed">
                                    {challenge.description}
                                </p>
                            </div>

                            <div className="mt-auto relative z-10">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                                        PROGRESS
                                    </span>
                                    <span className="text-sm font-black text-white italic tracking-tighter tabular-nums drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
                                        {challenge.progress} <span className="text-zinc-500 text-xs">/ {challenge.total}</span>
                                    </span>
                                </div>

                                <div className="w-full bg-zinc-900 h-1.5 border border-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 rounded-full
                      ${isCompleted ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' :
                                                isRed ? 'bg-gradient-to-r from-red-600/50 to-red-500' :
                                                    isAmber ? 'bg-gradient-to-r from-amber-600/50 to-amber-500' :
                                                        'bg-gradient-to-r from-blue-600/50 to-blue-500'}
                    `}
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>

                            {isCompleted && (
                                <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center border border-emerald-500/30">
                                    <Trophy className="w-8 h-8 text-emerald-500 mb-2 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                    <span className="text-sm font-black tracking-widest text-emerald-500 uppercase">CLAIMED</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
