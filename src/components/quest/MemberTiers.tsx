import { Shield, Sword, Crown, Zap, Star, Crosshair, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const TIERS = [
    {
        name: 'RECRUIT',
        icon: Crosshair,
        multiplier: '1.0X',
        perks: ['Basic Arena Access', 'Standard Booking'],
        color: 'zinc',
        active: false,
    },
    {
        name: 'OPERATOR',
        icon: Shield,
        multiplier: '1.2X',
        perks: ['5% Tactical Discount', 'Priority Deployment', 'Access to Weekly Campaigns'],
        color: 'red',
        active: false,
    },
    {
        name: 'ELITE',
        icon: Sword,
        multiplier: '1.5X',
        perks: ['10% Tactical Discount', 'Free Session per Month', 'Tournament Entry Credits'],
        color: 'purple',
        active: true, // Current Mock Status
    },
    {
        name: 'LEGENDARY',
        icon: Star,
        multiplier: '2.0X',
        perks: ['15% Gear Discount', 'VIP Game Night Access', 'Early Access to New Games'],
        color: 'amber',
        active: false,
        locked: true,
    },
    {
        name: 'WARLORD',
        icon: Zap,
        multiplier: '2.5X',
        perks: ['Highest Booking Priority', 'Custom Profile Badge', 'Member-Only Drops'],
        color: 'blue',
        active: false,
        locked: true,
    },
    {
        name: 'KRYPT BLACK',
        icon: Crown,
        multiplier: 'MAX',
        perks: ['Exclusive Event Pass', 'Personal Concierge', 'Unlimited Perks'],
        color: 'emerald',
        active: false,
        locked: true,
    },
];

export function MemberTiers() {
    return (
        <div className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div className="max-w-2xl">
                    <h2 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase mb-2 text-white flex items-center gap-3">
                        <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        OPERATOR <span className="text-zinc-500">TIERS</span>
                    </h2>
                    <p className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                        Your standing in THE KRYPT determines your privileges. Earn KRYPT COIN, complete operations, and rise through the ranks to unlock permanent multipliers.
                    </p>
                </div>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black hover:border-white font-black uppercase tracking-widest text-[9px] sm:text-[10px] rounded-none px-6 transition-colors group">
                    VIEW FULL PERK MATRIX <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {TIERS.map((tier, i) => {
                    const Icon = tier.icon;
                    const isActive = tier.active;
                    const isLocked = tier.locked;

                    return (
                        <div
                            key={i}
                            className={`relative p-6 sm:p-8 flex flex-col group transition-all duration-300
                ${isActive ? 'bg-zinc-950/90 border-t-2 border-t-red-600 border-x border-b border-zinc-800 shadow-[0_-5px_30px_rgba(220,38,38,0.15)] z-10 sm:-translate-y-2' :
                                    isLocked ? 'bg-zinc-950/30 border border-zinc-900 opacity-70 hover:opacity-100 hover:border-zinc-800' :
                                        'bg-zinc-950/50 border border-zinc-800 hover:border-zinc-600'}
              `}
                        >
                            {isActive && (
                                <>
                                    <div className="absolute top-0 right-0 left-0 w-full h-32 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none" />
                                    <div className="absolute top-4 right-4 bg-red-600/10 border border-red-900/50 text-red-500 text-[8px] font-black px-3 py-1 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(220,38,38,0.2)]">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> CURRENT RANK
                                    </div>
                                </>
                            )}

                            <div className="flex justify-between items-start mb-6 sm:mb-8 relative z-10">
                                <div className={`p-4 rounded-sm flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14
                  ${isActive ? 'bg-red-950 border border-red-900 shadow-[0_0_15px_rgba(220,38,38,0.2)] text-red-500 group-hover:text-white' :
                                        isLocked ? 'bg-zinc-900/50 border border-zinc-800 text-zinc-700' :
                                            'bg-zinc-900 border border-zinc-700 text-zinc-400 group-hover:text-white group-hover:border-zinc-500'}
                  transition-colors`}
                                >
                                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${isActive ? 'drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]' : ''}`} />
                                </div>

                                <div className="text-right mt-1">
                                    <div className={`text-2xl sm:text-3xl font-black italic tracking-tighter tabular-nums leading-none
                    ${isActive ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]' : isLocked ? 'text-zinc-700' : 'text-zinc-300'}
                  `}>
                                        {tier.multiplier}
                                    </div>
                                    <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mt-1">COIN EARN RATE</div>
                                </div>
                            </div>

                            <div className="mb-6 relative z-10 flex-1">
                                <h3 className={`text-xl sm:text-2xl font-black italic uppercase tracking-tighter mb-4 sm:mb-5
                  ${isActive ? 'text-white' : isLocked ? 'text-zinc-500' : 'text-zinc-200'}
                `}>
                                    {tier.name}
                                </h3>

                                <ul className="space-y-3">
                                    {tier.perks.map((perk, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isActive ? 'bg-red-500 shadow-[0_0_5px_rgba(220,38,38,0.8)]' : isLocked ? 'bg-zinc-800' : 'bg-zinc-500'}`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-widest leading-snug
                         ${isActive ? 'text-white' : isLocked ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                                {perk}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {isLocked && (
                                <div className="mt-4 pt-4 border-t border-zinc-800/50 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">STATUS:</span>
                                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest italic tracking-tighter">LOCKED</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
