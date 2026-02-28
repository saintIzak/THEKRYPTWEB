import { Button } from '../components/ui/button';
import { Scroll, Shield, Sword, Crown } from 'lucide-react';
import GamifiedSection from '../components/GamifiedSection';

export default function Loyalty() {
    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <GamifiedSection className="w-full sm:container mx-auto px-0 sm:px-4 py-12">
                <div className="text-center mb-10 sm:mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-8 sm:w-12 bg-red-600" />
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-red-600">Operator Progression</span>
                        <div className="h-px w-8 sm:w-12 bg-red-600" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
                        QUEST <span className="text-red-600">LOG</span>
                    </h1>
                    <p className="text-[10px] sm:text-xs font-black text-zinc-500 uppercase tracking-widest max-w-2xl mx-auto px-4">
                        Earn XP for every purchase and hour deployed. Level up to unlock exclusive rewards, tactical discounts, and VIP access.
                    </p>
                </div>

                {/* User Stats (Mock) */}
                <div className="bg-zinc-900/50 border-2 border-zinc-800 p-6 sm:p-8 mb-16 relative overflow-hidden" style={{ clipPath: 'polygon(0 0, 98% 0, 100% 15%, 100% 100%, 2% 100%, 0 85%)' }}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                        <div className="h-full bg-red-600 w-[75%] shadow-[0_0_15px_rgba(220,38,38,0.8)]"></div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-12">
                        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-600/10 flex items-center justify-center border-2 border-red-600 rotate-45">
                                <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 -rotate-45" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter">LEVEL 12: ELITE</h2>
                                <p className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">750 / 1000 XP TO NEXT DEPLOYMENT</p>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <div className="text-4xl sm:text-5xl font-black text-red-600 italic tracking-tighter">2,450</div>
                            <div className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest">AVAILABLE XP CREDITS</div>
                        </div>
                    </div>
                </div>

                {/* Tiers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-zinc-950 border border-zinc-800 p-8 opacity-40 relative group" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}>
                        <Shield className="w-10 h-10 text-zinc-600 mb-6" />
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">RECRUIT</h3>
                        <ul className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest space-y-3">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-600" /> Earn 1 XP per KSh 100 spent</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-600" /> Basic Arena Access</li>
                        </ul>
                    </div>

                    <div className="bg-zinc-900 border-2 border-red-600 p-8 relative shadow-[0_0_30px_rgba(220,38,38,0.1)]" style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)' }}>
                        <div className="absolute -top-3 left-8 bg-red-600 text-white text-[8px] font-black px-3 py-1 uppercase tracking-widest skew-x-[-12deg]">CURRENT STATUS</div>
                        <Sword className="w-10 h-10 text-red-600 mb-6" />
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">ELITE OPERATOR</h3>
                        <ul className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest space-y-3">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600" /> Earn 1.5 XP per KSh 100 spent</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600" /> 5% Tactical Discount</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600" /> Priority Deployment</li>
                        </ul>
                    </div>

                    <div className="bg-zinc-950 border border-zinc-800 p-8 relative group hover:border-red-600 transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}>
                        <Crown className="w-10 h-10 text-zinc-700 group-hover:text-red-600 transition-colors mb-6" />
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">LEGENDARY</h3>
                        <ul className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest space-y-3">
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> Earn 2 XP per KSh 100 spent</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> 10% Tactical Discount</li>
                            <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> Tournament Entry Credits</li>
                        </ul>
                        <Button variant="outline" className="mt-8 w-full border-zinc-800 text-zinc-500 hover:text-red-600 hover:border-red-600 rounded-none font-black uppercase tracking-widest text-[10px]">VIEW REQUIREMENTS</Button>
                    </div>
                </div>

                {/* Active Quests */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <Scroll className="text-red-600 w-5 h-5 sm:w-6 sm:h-6" />
                        <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter">DAILY <span className="text-red-600">OBJECTIVES</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-zinc-900/30 p-6 border border-zinc-800 flex justify-between items-center group hover:border-red-600/50 transition-colors">
                            <div className="space-y-1">
                                <h4 className="font-black uppercase tracking-widest text-sm text-white">FIRST BLOOD</h4>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Book your first gaming session this week</p>
                            </div>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[10px] rounded-none px-6">CLAIM 50 XP</Button>
                        </div>
                        <div className="bg-zinc-900/30 p-6 border border-zinc-800 flex justify-between items-center opacity-70">
                            <div className="space-y-1">
                                <h4 className="font-black uppercase tracking-widest text-sm text-white">GEAR UP</h4>
                                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Purchase any item from "The Vault"</p>
                            </div>
                            <div className="flex items-center gap-2 text-red-600">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest">IN PROGRESS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </GamifiedSection>
        </div>
    );
}
