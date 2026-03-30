import { Trophy, Star, Target, Users } from 'lucide-react';
import { Button } from '../ui/button';

const HIGHLIGHTS = [
    {
        id: 1,
        type: 'TOURNAMENT CHAMPIONS',
        title: 'Team Vortex Takes Winter Clash',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
        desc: 'Undefeated throughout the entire bracket. A masterclass in tactical execution.',
        icon: Trophy,
        color: 'amber'
    },
    {
        id: 2,
        type: 'OPERATOR SPOTLIGHT',
        title: 'SILENT_ASSASSIN hits 100K Coins',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
        desc: 'First operator to reach the KRYPT BLACK tier organically this season.',
        icon: Star,
        color: 'emerald'
    },
    {
        id: 3,
        type: 'SQUAD OF THE WEEK',
        title: 'Neon Knights',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
        desc: 'Most active squad in the arena, logging over 60 hours combined this week.',
        icon: Users,
        color: 'blue'
    }
];

export function CommunityActivity() {
    return (
        <div className="mb-24 scroll-mt-24" id="community">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
                <div>
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-8 h-px bg-purple-600/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500">THE KRYPT ECOSYSTEM</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
                        COMMUNITY <span className="text-zinc-500">OPERATIONS</span>
                    </h2>
                </div>

                <Button variant="outline" className="border-purple-900/50 bg-purple-950/20 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-500 font-black uppercase tracking-widest text-[10px] rounded-none px-6 transition-colors group">
                    VIEW HALL OF FAME <Target className="w-3.5 h-3.5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {HIGHLIGHTS.map((item) => {
                    const Icon = item.icon;
                    const isAmber = item.color === 'amber';
                    const isEmerald = item.color === 'emerald';
                    const isBlue = item.color === 'blue';

                    return (
                        <div key={item.id} className="group cursor-pointer">
                            <div className="aspect-[4/3] relative overflow-hidden bg-zinc-900 mb-4 border border-zinc-800 group-hover:border-zinc-500 transition-colors">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-luminosity group-hover:mix-blend-normal opacity-70 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

                                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity
                                    ${isAmber ? 'text-amber-500' : isEmerald ? 'text-emerald-500' : 'text-blue-500'}
                                `} />

                                <div className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm border transition-colors
                                    ${isAmber ? 'border-amber-900/50 text-amber-500 group-hover:bg-amber-500 group-hover:text-black' :
                                        isEmerald ? 'border-emerald-900/50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-black' :
                                            'border-blue-900/50 text-blue-500 group-hover:bg-blue-500 group-hover:text-black'}
                                `}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>

                            <div>
                                <div className={`text-[9px] font-black uppercase tracking-widest mb-2
                                    ${isAmber ? 'text-amber-500' : isEmerald ? 'text-emerald-500' : 'text-blue-500'}
                                `}>
                                    // {item.type}
                                </div>
                                <h3 className="text-lg font-black italic uppercase tracking-tighter text-white mb-2 group-hover:text-zinc-300 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed line-clamp-2">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
