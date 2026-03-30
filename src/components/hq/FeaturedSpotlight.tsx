import { ArrowRight, Clock, Zap } from 'lucide-react';
import { Button } from '../ui/button';

export function FeaturedSpotlight() {
    return (
        <div className="mb-24 scroll-mt-24">
            <div className="relative overflow-hidden bg-zinc-950 border border-zinc-800 group h-[500px] sm:h-[600px] flex items-center">

                {/* Background Video/Image */}
                <div className="absolute inset-0 z-0 bg-zinc-900">
                    <img
                        src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop"
                        alt="Double XP Weekend"
                        className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[2s] ease-out"
                    />

                    {/* Tactical Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/20 to-transparent pointer-events-none mix-blend-overlay" />

                    {/* Animated Scanline Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-600/10 to-transparent h-2 w-full animate-scan opacity-50" />
                </div>

                <div className="relative z-10 container mx-auto px-6 sm:px-12 flex flex-col justify-center h-full">
                    <div className="max-w-2xl">

                        {/* Urgency Badge */}
                        <div className="inline-flex items-center gap-3 mb-6 bg-red-600 border border-red-500 text-white pl-3 pr-4 py-1.5 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                            <Clock className="w-4 h-4 animate-pulse" />
                            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest mt-0.5">ENDS IN 48 HOURS</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase text-white mb-4 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)] leading-none">
                            DOUBLE COIN <br />
                            <span className="text-zinc-400">MULTIPLIER</span> <span className="text-red-600">IS LIVE</span>
                        </h2>

                        <p className="text-xs sm:text-sm font-bold text-zinc-300 uppercase tracking-widest leading-relaxed mb-8 max-w-lg">
                            Deploy this weekend and earn 2X KRYPT COIN on all gaming sessions, vault purchases, and completed squad missions. Stack your wallet for the upcoming hardware drops.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button className="bg-red-600 hover:bg-white text-white hover:text-black font-black uppercase tracking-widest text-xs rounded-none px-8 py-6 h-auto transition-all group/btn relative overflow-hidden shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
                                <Zap className="w-4 h-4 mr-2" /> BOOK A SESSION NOW
                            </Button>
                            <Button variant="outline" className="border-zinc-500 bg-zinc-950/50 text-white hover:bg-white hover:text-black hover:border-white font-black uppercase tracking-widest text-xs rounded-none px-8 py-6 h-auto transition-colors group/link backdrop-blur-sm">
                                MISSION DETAILS <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
