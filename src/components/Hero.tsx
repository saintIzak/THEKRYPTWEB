import { Zap, Truck, Shield, Award, Target, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import redGridBg from '../assets/images/red-grid-bg.png';

export default function Hero() {
    const scrollToProducts = () => {
        const productsSection = document.querySelector('main');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-black px-0 sm:px-4 py-20 border-b border-zinc-900">
            {/* 3D Grid Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={redGridBg}
                    alt=""
                    className="w-full h-full object-cover opacity-20 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

                {/* Scanline Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>

            <div className="w-full sm:container relative z-10 mx-auto px-4 sm:px-0">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    {/* Left Column - Content */}
                    <div className="flex flex-col space-y-8">
                        {/* Tactical Badge */}
                        <div className="inline-flex items-center gap-3 self-start">
                            <div className="h-px w-8 bg-red-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Tactical Gear Deployment</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-2">
                            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white leading-none uppercase">
                                THE <span className="text-red-600">KRYPT</span>
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter text-zinc-400 leading-none uppercase">
                                ELITE ARSENAL
                            </h3>
                        </div>

                        {/* Subheadline */}
                        <p className="text-sm md:text-base text-zinc-500 font-medium uppercase tracking-widest leading-relaxed max-w-xl border-l-2 border-red-600 pl-6">
                            Deploy with pro-grade peripherals, high-end consoles, and exclusive battle gear.
                            Tested in the arena, built for champions. Low latency. High stakes.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-6 pt-4">
                            <Button
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-none px-10 py-8 text-lg group"
                                onClick={scrollToProducts}
                            >
                                <span className="group-hover:scale-110 transition-transform flex items-center gap-2">
                                    ACQUIRE GEAR <ChevronRight className="w-5 h-5" />
                                </span>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:border-red-600 rounded-none px-10 py-8 text-lg font-black uppercase tracking-widest"
                                onClick={scrollToProducts}
                            >
                                BROWSE DEALS
                            </Button>
                        </div>

                        {/* Trust Badges - HUD Style */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                            {[
                                { icon: Truck, label: 'RAPID DEPLOY' },
                                { icon: Shield, label: 'SECURE OPS' },
                                { icon: Award, label: 'ELITE GRADE' },
                                { icon: Zap, label: 'ZERO LAG' }
                            ].map((item, i) => (
                                <div key={i} className="group relative p-4 border border-zinc-800 bg-zinc-950/50 hover:border-red-600/50 transition-colors overflow-hidden">
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 group-hover:border-red-600" />
                                    <item.icon className="mb-2 h-5 w-5 text-red-600" />
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Visual HUD */}
                    <div className="hidden lg:flex justify-center relative">
                        <div className="relative w-96 h-96">
                            {/* Rotating HUD Rings */}
                            <div className="absolute inset-0 border-2 border-red-600/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-4 border border-zinc-800 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="absolute inset-8 border-2 border-red-600/10 rounded-full animate-[spin_20s_linear_infinite]" />

                            {/* Center Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 bg-red-600/10 rounded-full flex items-center justify-center border border-red-600/30 animate-pulse">
                                    <Target className="w-16 h-16 text-red-600" />
                                </div>
                            </div>

                            {/* HUD Data Points */}
                            <div className="absolute -top-4 -right-4 bg-zinc-900 border border-red-600 p-3 skew-x-[-12deg]">
                                <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">SYSTEM STATUS</p>
                                <p className="text-xs font-black text-white uppercase">OPERATIONAL</p>
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-zinc-900 border border-zinc-800 p-3 skew-x-[-12deg]">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">LATENCY</p>
                                <p className="text-xs font-black text-red-600 uppercase">0.001 MS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
