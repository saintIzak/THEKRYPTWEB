import { Cpu, Gamepad2, Headphones, Trophy, Ticket, Star, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const REWARDS = [
    {
        coins: 300,
        title: '5% Tactical Discount',
        description: 'Valid for next session booking',
        icon: Ticket,
        color: 'emerald',
    },
    {
        coins: 500,
        title: '2 Bonus Games',
        description: 'Add to any booked session',
        icon: Gamepad2,
        color: 'emerald',
    },
    {
        coins: 1000,
        title: 'Free Session Add-on',
        description: 'Extra hour of deployment time',
        icon: Cpu,
        color: 'amber',
    },
    {
        coins: 1500,
        title: 'Vault Gear Discount',
        description: '15% off KRYPT merchandise',
        icon: Headphones,
        color: 'amber',
    },
    {
        coins: 3000,
        title: 'Priority Tournament Entry',
        description: 'Skip the waitlist for main events',
        icon: Trophy,
        color: 'red',
    },
    {
        coins: 5000,
        title: 'VIP Game Night Pass',
        description: 'Exclusive access to operator nights',
        icon: Star,
        color: 'purple',
    },
];

export function RewardLadder() {
    return (
        <div className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white">
                        WHAT YOUR KRYPT COIN <span className="text-amber-500">UNLOCKS</span>
                    </h2>
                    <p className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest mt-2 max-w-xl leading-relaxed">
                        Exchange your KRYPT COIN balance for real tactical advantages, premium gear, and exclusive event access.
                    </p>
                </div>
                <Button variant="outline" className="border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black font-black uppercase tracking-widest text-[10px] rounded-none px-6 transition-colors group">
                    VIEW ALL REWARDS <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {REWARDS.map((reward, i) => {
                    const Icon = reward.icon;
                    const isRed = reward.color === 'red';
                    const isAmber = reward.color === 'amber';
                    const isPurple = reward.color === 'purple';
                    const isEmerald = reward.color === 'emerald';

                    return (
                        <div
                            key={i}
                            className={`bg-zinc-950/80 border p-6 group transition-all duration-300 relative overflow-hidden flex flex-col justify-between
                ${isRed ? 'border-red-900/40 hover:border-red-500 hover:bg-red-950/20' :
                                    isAmber ? 'border-amber-900/40 hover:border-amber-500 hover:bg-amber-950/20' :
                                        isPurple ? 'border-purple-900/40 hover:border-purple-500 hover:bg-purple-950/20' :
                                            'border-emerald-900/40 hover:border-emerald-500 hover:bg-emerald-950/20'}
              `}
                        >
                            {/* Subtle top-edge glow on hover */}
                            <div className={`absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity
                 ${isRed ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent' :
                                    isAmber ? 'bg-gradient-to-r from-transparent via-amber-500 to-transparent' :
                                        isPurple ? 'bg-gradient-to-r from-transparent via-purple-500 to-transparent' :
                                            'bg-gradient-to-r from-transparent via-emerald-500 to-transparent'}
              `} />

                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className={`w-10 h-10 flex items-center justify-center border transition-colors
                  ${isRed ? 'bg-red-950/50 border-red-900/50 text-red-500 group-hover:text-red-400 group-hover:border-red-500/50' :
                                        isAmber ? 'bg-amber-950/50 border-amber-900/50 text-amber-500 group-hover:text-amber-400 group-hover:border-amber-500/50' :
                                            isPurple ? 'bg-purple-950/50 border-purple-900/50 text-purple-500 group-hover:text-purple-400 group-hover:border-purple-500/50' :
                                                'bg-emerald-950/50 border-emerald-900/50 text-emerald-500 group-hover:text-emerald-400 group-hover:border-emerald-500/50'}
                  `}
                                >
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="text-right">
                                    <div className={`text-xl sm:text-2xl font-black italic tracking-tighter tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.05)] text-white`}>
                                        {reward.coins.toLocaleString()}
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500">KRYPT COIN</div>
                                </div>
                            </div>

                            <div className="space-y-1.5 relative z-10 mt-auto">
                                <h3 className="text-sm font-black uppercase tracking-widest text-white">{reward.title}</h3>
                                <p className="text-[10px] font-bold text-zinc-400 leading-relaxed">{reward.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
