import { Button } from '../ui/button';
import { Camera, Instagram, Twitter, MessageSquare, CheckCircle2, Share2 } from 'lucide-react';

const SOCIAL_MISSIONS = [
    {
        title: 'Instagram Initiative',
        description: 'Follow THE KRYPT and confirm your handle',
        reward: 100,
        platform: 'Instagram',
        icon: Instagram,
        status: 'completed',
        color: 'pink',
    },
    {
        title: 'X / Twitter Intel',
        description: 'Retweet the latest tournament announcement',
        reward: 150,
        platform: 'Twitter',
        icon: Twitter,
        status: 'available',
        color: 'blue',
    },
    {
        title: 'Setup Recon',
        description: 'Post a photo of your session and tag @TheKryptHQ',
        reward: 250,
        platform: 'Instagram / Twitter',
        icon: Camera,
        status: 'available',
        color: 'zinc',
    },
    {
        title: 'Debriefing',
        description: 'Leave an honest Google review of your session',
        reward: 300,
        platform: 'Google',
        icon: MessageSquare,
        status: 'available',
        color: 'emerald',
    },
];

export function SocialMissions() {
    return (
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
                <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-500" />
                <div>
                    <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">
                        COMMUNITY <span className="text-zinc-500">OPERATIONS</span>
                    </h2>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Establish comms and spread the signal to earn extra coins.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {SOCIAL_MISSIONS.map((mission, i) => {
                    const Icon = mission.icon;
                    const isCompleted = mission.status === 'completed';

                    return (
                        <div
                            key={i}
                            className={`bg-zinc-950/50 border p-5 flex flex-col justify-between group transition-colors relative overflow-hidden
                ${isCompleted ? 'border-zinc-800 opacity-60' : 'border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50'}
              `}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-2.5 rounded border transition-colors
                  ${isCompleted ? 'bg-zinc-900/50 border-zinc-800 text-zinc-600' : 'bg-zinc-900 border-zinc-700 text-zinc-400 group-hover:text-white group-hover:border-zinc-500'}
                `}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                {isCompleted ? (
                                    <div className="text-[10px] font-black text-emerald-500 flex items-center gap-1.5 uppercase tracking-widest bg-emerald-950/30 px-2 py-1 border border-emerald-900/50">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <span className="text-sm font-black italic tracking-tighter tabular-nums text-white">+{mission.reward}</span>
                                        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">KC</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 mb-5">
                                <h3 className={`font-black uppercase tracking-widest text-[11px] sm:text-xs mb-1.5 ${isCompleted ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>
                                    {mission.title}
                                </h3>
                                <p className="text-[10px] font-bold text-zinc-500 leading-relaxed">
                                    {mission.description}
                                </p>
                            </div>

                            {!isCompleted && (
                                <Button size="sm" variant="outline" className="w-full text-[9px] font-black uppercase tracking-widest rounded-none border-zinc-700 bg-transparent text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-colors h-8">
                                    CONNECT & CLAIM
                                </Button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
