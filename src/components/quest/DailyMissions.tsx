import { Button } from '../ui/button';
import { Target, CheckCircle2, Clock, MapPin, Gamepad2, ShoppingCart, Users, PlaySquare, CalendarDays, Sun } from 'lucide-react';

const DAILY_MISSIONS = [
    {
        title: 'Operator Login',
        description: 'Log into the KRYPT command center today',
        reward: 50,
        rarity: 'Common',
        status: 'completed',
        icon: CheckCircle2,
        color: 'emerald'
    },
    {
        title: 'Session Booking',
        description: 'Book any gaming session for this week',
        reward: 150,
        rarity: 'Rare',
        status: 'in-progress',
        progress: '0/1',
        icon: CalendarDays,
        color: 'blue'
    },
    {
        title: 'Vault Explorer',
        description: 'Access the gear store and view 3 items',
        reward: 75,
        rarity: 'Common',
        status: 'available',
        icon: ShoppingCart,
        color: 'zinc'
    },
    {
        title: 'Squad Recruiter',
        description: 'Successfully invite 1 friend to join THE KRYPT',
        reward: 300,
        rarity: 'Epic',
        status: 'available',
        icon: Users,
        color: 'purple'
    },
    {
        title: 'Social Signal',
        description: 'Share a KRYPT post on your social feed',
        reward: 100,
        rarity: 'Common',
        status: 'available',
        icon: PlaySquare,
        color: 'zinc'
    },
    {
        title: 'Off-Peak Infiltration',
        description: 'Visit the arena during weekday morning hours',
        reward: 200,
        rarity: 'Rare',
        status: 'available',
        icon: Sun,
        color: 'blue'
    },
];

export function DailyMissions() {
    return (
        <div className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
                        <Target className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                        ACTIVE <span className="text-zinc-500">MISSIONS</span>
                    </h2>
                    <p className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
                        Complete tasks to stack KRYPT COIN. Resets every 24 hours.
                    </p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 flex items-center gap-3 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <Clock className="w-4 h-4 text-zinc-400" />
                    <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-tight">NEXT RESET</div>
                        <div className="text-xs font-black uppercase tracking-widest text-white leading-tight">14H 23M</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {DAILY_MISSIONS.map((mission, i) => {
                    const isEpic = mission.rarity === 'Epic';
                    const isRare = mission.rarity === 'Rare';
                    const isCompleted = mission.status === 'completed';
                    const isInProgress = mission.status === 'in-progress';
                    const Icon = mission.icon;

                    return (
                        <div
                            key={i}
                            className={`bg-zinc-950/80 border p-5 flex flex-col justify-between group transition-all relative
                ${isCompleted ? 'border-zinc-800 opacity-60' :
                                    isEpic ? 'border-purple-900/50 hover:border-purple-600 hover:bg-purple-950/20 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(168,85,247,0.1)]' :
                                        isRare ? 'border-blue-900/50 hover:border-blue-600 hover:bg-blue-950/20 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(59,130,246,0.1)]' :
                                            'border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50 hover:-translate-y-1'}
              `}
                        >
                            {/* Rarity & Status Bar */}
                            <div className="flex justify-between items-center mb-4">
                                <span className={`text-[8px] font-black px-2 py-0.5 uppercase tracking-widest border
                    ${isEpic ? 'bg-purple-950/50 text-purple-400 border-purple-800' :
                                        isRare ? 'bg-blue-950/50 text-blue-400 border-blue-800' :
                                            'bg-zinc-800 text-zinc-400 border-zinc-700'}
                  `}>
                                    {mission.rarity}
                                </span>

                                {isCompleted ? (
                                    <span className="text-[9px] font-black text-emerald-500 flex items-center gap-1 uppercase tracking-widest">
                                        <CheckCircle2 className="w-3 h-3" /> CLAIMED
                                    </span>
                                ) : isInProgress ? (
                                    <span className="text-[9px] font-black text-amber-500 flex items-center gap-1.5 uppercase tracking-widest">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                        </span>
                                        IN PROGRESS
                                    </span>
                                ) : (
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-black italic tracking-tighter tabular-nums text-white">+{mission.reward}</span>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">KC</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 mb-5">
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded bg-zinc-900/50 border
                      ${isEpic ? 'border-purple-900/50 text-purple-500' :
                                            isRare ? 'border-blue-900/50 text-blue-500' :
                                                isCompleted ? 'border-zinc-800 text-zinc-600' : 'border-zinc-800 text-zinc-400'}
                    `}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className={`font-black uppercase tracking-widest text-sm mb-1 ${isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>
                                            {mission.title}
                                        </h3>
                                        <p className="text-[10px] font-bold text-zinc-400 leading-relaxed">
                                            {mission.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            {!isCompleted && (
                                <Button className={`w-full h-9 text-[10px] font-black uppercase tracking-widest rounded-none transition-colors border-0
                    ${isInProgress ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-600/30'}
                 `}>
                                    {isInProgress ? `CONTINUE (${mission.progress})` : 'START MISSION'}
                                </Button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
