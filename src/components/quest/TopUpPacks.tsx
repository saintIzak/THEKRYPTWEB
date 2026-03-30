import { Plus, Zap, ShieldAlert, Crown, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

const PACKS = [
    {
        name: 'STARTER PACK',
        coins: '2,500',
        bonusText: null,
        price: 'KSh 500',
        icon: Plus,
        color: 'zinc',
        popular: false,
    },
    {
        name: 'ELITE PACK',
        coins: '6,000',
        bonusText: '+1,000 BONUS',
        price: 'KSh 1,200',
        icon: Zap,
        color: 'blue',
        popular: true,
    },
    {
        name: 'SQUAD PACK',
        coins: '12,500',
        bonusText: '+2,500 BONUS',
        price: 'KSh 2,500',
        icon: ShieldAlert,
        color: 'red',
        popular: false,
    },
    {
        name: 'LEGEND PACK',
        coins: '30,000',
        bonusText: '+10,000 BONUS',
        price: 'KSh 6,000',
        icon: Crown,
        color: 'amber',
        popular: false,
    },
    {
        name: 'BLACK CARD PACK',
        coins: '100,000',
        bonusText: '+50,000 BONUS',
        price: 'KSh 20,000',
        icon: Crown,
        color: 'zinc',
        popular: false,
    },
];

export function TopUpPacks() {
    return (
        <div className="mb-10">
            <div className="text-center mb-10 max-w-2xl mx-auto space-y-3">
                <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-white">
                    COIN <span className="text-blue-500">RESERVES</span>
                </h2>
                <p className="text-[11px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                    Need tactical advantage fast? Top up your KRYPT COIN reserves directly and accelerate your path to VIP unlocks. Pre-load your wallet and save.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                {PACKS.map((pack, i) => {
                    const Icon = pack.icon;
                    const isRed = pack.color === 'red';
                    const isBlue = pack.color === 'blue';
                    const isAmber = pack.color === 'amber';
                    const isPopular = pack.popular;

                    return (
                        <div
                            key={i}
                            className={`bg-zinc-950/80 border p-6 flex flex-col items-center text-center relative group transition-all duration-300
                ${isPopular ? 'border-blue-600 shadow-[0_0_30px_rgba(59,130,246,0.1)] z-10 sm:-translate-y-2' : 'border-zinc-800 hover:border-zinc-600'}
              `}
                        >
                            {/* Ambient Glow */}
                            <div className={`absolute top-0 right-0 left-0 h-32 blur-3xl pointer-events-none opacity-20
                 ${isRed ? 'bg-red-500' : isBlue ? 'bg-blue-500' : isAmber ? 'bg-amber-500' : 'bg-zinc-500'}
               `} />

                            {isPopular && (
                                <div className="absolute top-0 right-0 left-0 bg-blue-600 text-white text-[9px] font-black py-1 uppercase tracking-widest text-center shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className={`mt-6 mb-5 w-14 h-14 flex items-center justify-center rounded-full border border-dashed transition-transform duration-700 group-hover:rotate-180 relative z-10
                ${isRed ? 'border-red-500/50 bg-red-950/50 text-red-500' :
                                    isBlue ? 'border-blue-500/50 bg-blue-950/50 text-blue-500' :
                                        isAmber ? 'border-amber-500/50 bg-amber-950/50 text-amber-500' :
                                            'border-zinc-500/50 bg-zinc-900/50 text-zinc-400'}
              `}>
                                <Icon className="w-6 h-6" />
                            </div>

                            <div className="mb-2 relative z-10 w-full">
                                <h3 className="font-black uppercase tracking-widest text-xs text-white mb-3">{pack.name}</h3>

                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-3xl font-black italic tracking-tighter text-white tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                                        {pack.coins}
                                    </div>
                                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">KRYPT COINS</div>
                                </div>
                            </div>

                            <div className="h-10 flex items-center justify-center w-full mb-6 relative z-10">
                                {pack.bonusText ? (
                                    <div className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border
                     ${isRed ? 'bg-red-950/50 text-red-400 border-red-900/50' :
                                            isBlue ? 'bg-blue-950/50 text-blue-400 border-blue-900/50' :
                                                isAmber ? 'bg-amber-950/50 text-amber-500 border-amber-900/50' :
                                                    'bg-emerald-950/50 text-emerald-400 border-emerald-900/50'}
                   `}>
                                        {pack.bonusText}
                                    </div>
                                ) : null}
                            </div>

                            <Button className={`w-full font-black uppercase tracking-widest text-[11px] rounded-none py-6 h-auto transition-all group-hover:px-8 relative z-10 mt-auto
                ${isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-transparent border border-zinc-700 hover:bg-white hover:text-black hover:border-white text-zinc-300'}
              `}>
                                BUY: {pack.price}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
