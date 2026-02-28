import { Trophy, Star } from 'lucide-react';
import GamifiedSection from '../components/GamifiedSection';

export default function Leaderboard() {
    return (
        <div className="min-h-screen bg-black text-white pt-20">
            <GamifiedSection className="w-full sm:container mx-auto px-0 sm:px-4 py-12">
                <div className="text-center mb-10 sm:mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-8 sm:w-12 bg-red-600" />
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-red-600">Tactical Rankings</span>
                        <div className="h-px w-8 sm:w-12 bg-red-600" />
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
                        COMMAND <span className="text-red-600">RANK</span>
                    </h1>
                    <p className="text-[10px] sm:text-xs font-black text-zinc-500 uppercase tracking-widest">Top tactical operators of the current cycle.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 mb-16">
                    {/* 1st Place */}
                    <div className="order-1 md:order-2 bg-zinc-900 border-2 border-red-600 p-6 sm:p-10 flex flex-col items-center md:transform md:-translate-y-6 relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]" style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)' }}>
                        <div className="absolute top-0 right-0 p-4">
                            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 animate-pulse" />
                        </div>
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-none bg-red-600 flex items-center justify-center mb-6 border-4 border-white shadow-xl rotate-45">
                            <span className="text-3xl sm:text-4xl font-black text-white -rotate-45">01</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter mb-1 text-center">SHADOWSLAYER</h3>
                        <p className="text-white font-black text-sm sm:text-base uppercase tracking-[0.2em] mb-6">3,100 XP</p>
                        <div className="flex gap-2">
                            <Star className="w-5 h-5 text-red-600 fill-red-600" />
                            <Star className="w-5 h-5 text-red-600 fill-red-600" />
                            <Star className="w-5 h-5 text-red-600 fill-red-600" />
                            <Star className="w-5 h-5 text-red-600 fill-red-600" />
                            <Star className="w-5 h-5 text-red-600 fill-red-600" />
                        </div>
                    </div>

                    {/* 2nd Place */}
                    <div className="order-2 md:order-1 bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8 flex flex-col items-center md:mt-8 relative group hover:border-red-600/50 transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-none bg-zinc-800 flex items-center justify-center mb-6 border-2 border-zinc-700 group-hover:border-red-600 transition-colors rotate-45">
                            <span className="text-2xl sm:text-3xl font-black text-white -rotate-45">02</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter mb-1 text-center">VIPER_X</h3>
                        <p className="text-red-600 font-black text-xs sm:text-sm uppercase tracking-widest mb-6">2,450 XP</p>
                        <div className="flex gap-2">
                            <Star className="w-4 h-4 text-red-600 fill-red-600" />
                            <Star className="w-4 h-4 text-red-600 fill-red-600" />
                            <Star className="w-4 h-4 text-red-600 fill-red-600" />
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="order-3 bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8 flex flex-col items-center md:mt-8 relative group hover:border-red-600/50 transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-none bg-zinc-800 flex items-center justify-center mb-6 border-2 border-zinc-700 group-hover:border-red-600 transition-colors rotate-45">
                            <span className="text-2xl sm:text-3xl font-black text-white -rotate-45">03</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter mb-1 text-center">NOOBMASTER69</h3>
                        <p className="text-red-600 font-black text-xs sm:text-sm uppercase tracking-widest mb-6">2,100 XP</p>
                        <div className="flex gap-2">
                            <Star className="w-4 h-4 text-red-600 fill-red-600" />
                            <Star className="w-4 h-4 text-red-600 fill-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900/30 border border-zinc-800 overflow-hidden" style={{ clipPath: 'polygon(0 0, 98% 0, 100% 2%, 100% 100%, 2% 100%, 0 98%)' }}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px] md:min-w-full">
                            <thead className="bg-zinc-950 text-zinc-500 uppercase">
                                <tr>
                                    <th className="p-6 text-[10px] font-black tracking-widest">RANK</th>
                                    <th className="p-6 text-[10px] font-black tracking-widest">OPERATOR</th>
                                    <th className="p-6 text-[10px] font-black tracking-widest">SECTOR</th>
                                    <th className="p-6 text-[10px] font-black tracking-widest text-right">XP SCORE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {[4, 5, 6, 7, 8, 9, 10].map((rank) => (
                                    <tr key={rank} className="hover:bg-red-600/5 transition-colors group">
                                        <td className="p-6 text-zinc-600 font-black">#{rank.toString().padStart(2, '0')}</td>
                                        <td className="p-6 font-black uppercase tracking-tighter text-white group-hover:text-red-600 transition-colors">OPERATOR_{rank}</td>
                                        <td className="p-6 text-zinc-500 text-xs font-bold uppercase tracking-widest">VALORANT SECTOR</td>
                                        <td className="p-6 text-right font-black text-red-600 italic">{2000 - rank * 50}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </GamifiedSection>
        </div>
    );
}
