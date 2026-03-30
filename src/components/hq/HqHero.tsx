import { ArrowRight, Ticket, ShoppingCart, RadioTower, Crosshair } from 'lucide-react';
import { Button } from '../ui/button';

export function HqHero() {
    return (
        <div className="relative border-b border-zinc-800 bg-zinc-950 overflow-hidden mb-8">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
                <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-red-900/15 via-zinc-950/50 to-zinc-950" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left side: Intro */}
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 mb-6 border border-zinc-800 bg-zinc-900/50 pl-2 pr-3 py-1">
                            <RadioTower className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest leading-none mt-0.5">TRANSMITTING LIVE</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black italic tracking-tighter uppercase mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                            THE HQ <span className="text-red-600 mx-2">//</span> <span className="text-zinc-300">LIVE FROM THE KRYPT</span>
                        </h1>

                        <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest leading-relaxed mb-8 max-w-xl">
                            The central command hub for organized events, new gear drops, brand intel, community operations, and everything happening inside THE KRYPT ecosystem.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button className="bg-red-600 hover:bg-white text-white hover:text-black font-black uppercase tracking-widest text-xs rounded-none px-6 py-5 h-auto transition-colors group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                <Ticket className="w-4 h-4 mr-2" /> Explore Events
                            </Button>
                            <Button variant="outline" className="border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:text-white hover:border-white font-black uppercase tracking-widest text-xs rounded-none px-6 py-5 h-auto transition-colors">
                                <ShoppingCart className="w-4 h-4 mr-2" /> Shop New Drops
                            </Button>
                            <Button variant="ghost" className="text-zinc-500 hover:text-white font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-none px-4 group">
                                View Updates <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-900">
                            <Button variant="link" className="text-red-600 hover:text-red-500 p-0 h-auto font-black uppercase tracking-widest text-[10px] group flex items-center">
                                <Crosshair className="w-3 h-3 mr-1.5" /> Join the Next Event
                            </Button>
                            <span className="text-zinc-800">|</span>
                            <Button variant="link" className="text-zinc-400 hover:text-white p-0 h-auto font-black uppercase tracking-widest text-[10px] group">
                                Book a Station
                            </Button>
                        </div>
                    </div>

                    {/* Right side: Featured Spotlight Panel */}
                    <div className="relative lg:h-full lg:min-h-[400px] flex items-center justify-center lg:justify-end">
                        {/* Glow effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-red-600/20 blur-[100px] pointer-events-none" />

                        <div className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 group hover:border-red-900/50 transition-colors overflow-hidden">
                            <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop"
                                    alt="Featured Event"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                                <div className="absolute top-4 right-4 bg-red-600 text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE EVENT
                                </div>
                            </div>

                            <div className="p-6 relative">
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
                                    KRYPT INVITATIONAL <span className="text-red-600">SERIES</span>
                                </h3>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 leading-relaxed">
                                    The biggest regional Valorant tournament of the year. 16 Elite Squads. Massive prize pool.
                                </p>
                                <Button className="w-full border border-red-900/50 bg-red-950/30 text-red-500 hover:bg-red-600 hover:text-white font-black uppercase tracking-widest text-[10px] rounded-none h-10 transition-colors">
                                    RESERVE VIP SPOT
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
