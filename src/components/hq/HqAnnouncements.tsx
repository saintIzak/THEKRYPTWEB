import { RadioTower, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const ANNOUNCEMENTS = [
    {
        id: 1,
        date: 'DEC 14, 2026',
        category: 'SYSTEM UPDATE',
        title: 'Network Upgrades Complete: Zero Latency Protocol Active',
        summary: 'All stations in the Pro Zone are now routed through our new dedicated fiber line. Experience sub-5ms ping on all competitive titles.',
        color: 'emerald'
    },
    {
        id: 2,
        date: 'DEC 10, 2026',
        category: 'KRYPT COIN',
        title: 'New Reward Tiers Added to the Vault',
        summary: 'We’ve updated the reward ledger. You can now redeem KRYPT COIN for priority booking, 4-hour passes, and exclusive member-only apparel.',
        color: 'amber'
    },
    {
        id: 3,
        date: 'DEC 05, 2026',
        category: 'ARENA EXPANSION',
        title: 'VR Combat Zone Phase 1 Now Open for Booking',
        summary: 'The wait is over. The new VR tactical room is fully operational. Grab your squad and book early, slots are extremely limited this month.',
        color: 'blue'
    }
];

export function HqAnnouncements() {
    return (
        <div className="mb-24 scroll-mt-24" id="announcements">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
                <div>
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-8 h-px bg-zinc-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">SECURE COMMS</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
                        BRAND <span className="text-red-600">INTEL</span>
                    </h2>
                </div>

                <Button variant="link" className="text-zinc-400 hover:text-white font-black uppercase tracking-widest text-[10px] rounded-none px-0 group">
                    VIEW ALL INTEL <ChevronRight className="w-3.5 h-3.5 ml-1 mt-0.5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ANNOUNCEMENTS.map((news) => {
                    const isEmerald = news.color === 'emerald';
                    const isAmber = news.color === 'amber';
                    const isBlue = news.color === 'blue';

                    return (
                        <div key={news.id} className="bg-zinc-950/80 border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between group hover:border-zinc-600 hover:bg-zinc-900/50 transition-all duration-300 relative overflow-hidden">
                            {/* Top Accent Line */}
                            <div className={`absolute top-0 left-0 h-1 w-full opacity-50 group-hover:opacity-100 transition-opacity
                                ${isEmerald ? 'bg-emerald-600' : isAmber ? 'bg-amber-500' : isBlue ? 'bg-blue-600' : 'bg-red-600'}
                            `} />

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-900">
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest tabular-nums">
                                        {news.date}
                                    </span>
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border
                                        ${isEmerald ? 'bg-emerald-950/30 text-emerald-500 border-emerald-900/50' :
                                            isAmber ? 'bg-amber-950/30 text-amber-500 border-amber-900/50' :
                                                isBlue ? 'bg-blue-950/30 text-blue-500 border-blue-900/50' :
                                                    'bg-zinc-900 text-zinc-400 border-zinc-800'}
                                    `}>
                                        {news.category}
                                    </span>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tighter text-zinc-100 mb-3 group-hover:text-white transition-colors leading-snug">
                                    {news.title}
                                </h3>
                                <p className="text-[10px] sm:text-xs font-bold text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors line-clamp-3">
                                    {news.summary}
                                </p>
                            </div>

                            <Button variant="link" className="text-zinc-500 hover:text-white p-0 h-auto font-black uppercase tracking-widest text-[9px] group/link flex items-center w-fit self-start mt-auto">
                                <RadioTower className="w-3 h-3 mr-1.5" /> DECRYPT FULL MESSAGE
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
