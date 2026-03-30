import { Button } from '../ui/button';
import { Users, Copy, Share2, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const REFERRAL_MILESTONES = [
    { count: 1, reward: '+500 KC', achieved: true },
    { count: 3, reward: 'FREE GAME', achieved: true },
    { count: 5, reward: 'SQUAD BADGE', achieved: false },
    { count: 10, reward: 'VIP ACCESS', achieved: false },
];

export function ReferralSection() {
    const currentReferrals = 3;
    const progressPercent = (currentReferrals / 10) * 100;

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mb-10">
            <div className="bg-zinc-950/50 border border-zinc-800 relative overflow-hidden group">

                {/* Subtle background element */}
                <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Left: Invite Info */}
                    <div className="p-6 sm:p-10 relative z-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-zinc-800">
                        <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white mb-3 flex items-center gap-3">
                            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                            RECRUIT SQUAD <span className="text-zinc-500">// EXPAND</span>
                        </h2>

                        <p className="text-[11px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-relaxed mb-8 max-w-md">
                            A single operator is dangerous. A squad is lethal. Invite friends to THE KRYPT using your code and unlock exclusive tiered rewards for every successful recruit.
                        </p>

                        <div className="space-y-3">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">YOUR OPERATOR CODE</span>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="bg-zinc-900 border border-zinc-700 px-5 py-3 flex items-center justify-between flex-1 relative overflow-hidden">
                                    <span className="font-black text-base sm:text-lg text-white tracking-[0.2em] relative z-10">KRYPT-7A9B</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleCopy}
                                        className="text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none h-8 px-3 ml-4 relative z-10"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                </div>
                                <Button className="bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[10px] rounded-none px-6 py-3 h-auto whitespace-nowrap">
                                    <Share2 className="w-3.5 h-3.5 mr-2" /> Share Link
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Milestones Tracking */}
                    <div className="p-6 sm:p-10 relative z-10 flex flex-col justify-center bg-zinc-950/30">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">RECRUITMENT PROGRESS</div>
                                <div className="text-sm font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
                                    MILESTONE {currentReferrals >= 10 ? 'MAX' : currentReferrals >= 5 ? '3' : currentReferrals >= 3 ? '2' : currentReferrals >= 1 ? '1' : '0'} REACHED
                                </div>
                            </div>
                            <div className="text-3xl font-black text-red-500 italic tracking-tighter tabular-nums text-right">
                                {currentReferrals} <span className="text-sm text-zinc-500 tracking-widest not-italic">/ 10</span>
                            </div>
                        </div>

                        {/* Visual Tracker Bar */}
                        <div className="relative mb-8 mt-4 px-2">
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-zinc-800 z-0 rounded-full" />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-red-600 z-0 transition-all duration-1000 shadow-[0_0_10px_rgba(220,38,38,0.5)] rounded-full"
                                style={{ width: `${progressPercent}%` }}
                            />

                            <div className="relative z-10 flex justify-between">
                                {REFERRAL_MILESTONES.map((milestone, i) => (
                                    <div key={i} className="flex flex-col items-center group relative cursor-crosshair">
                                        <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-500 relative bg-zinc-950 ring-4 ring-zinc-950
                      ${milestone.achieved ? 'border-red-600 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'border-zinc-700'}
                    `}>
                                            {milestone.achieved && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-1 h-1 bg-white rounded-full" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Hover Info */}
                                        <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex flex-col items-center z-20">
                                            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-zinc-800" />
                                            <div className="bg-zinc-900 border border-zinc-800 px-3 py-2 text-center shadow-xl whitespace-nowrap min-w-[100px]">
                                                <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">{milestone.count} FRIENDS</div>
                                                <div className={`text-[10px] font-black uppercase tracking-widest ${milestone.achieved ? 'text-zinc-300' : 'text-white'}`}>
                                                    {milestone.reward}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Unlocked state */}
                        {currentReferrals >= 3 && (
                            <div className="bg-zinc-900/50 border border-zinc-800/50 p-4 flex items-center justify-between">
                                <div>
                                    <h4 className="font-black text-[10px] text-emerald-500 uppercase tracking-widest mb-0.5">REWARD UNLOCKED</h4>
                                    <p className="text-[10px] font-bold text-zinc-400">Free game session available in wallet.</p>
                                </div>
                                <Button variant="outline" size="sm" className="h-7 text-[9px] font-black uppercase tracking-widest rounded-none border-zinc-700 bg-transparent hover:bg-white hover:text-black hover:border-white">
                                    VIEW
                                </Button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
