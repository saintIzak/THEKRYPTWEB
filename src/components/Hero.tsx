import { motion } from 'framer-motion';
import { Gamepad2, ShoppingBag, MonitorPlay, Zap, Activity, Cpu } from 'lucide-react';
import { Button } from './ui/button';
import redGridBg from '../assets/images/red-grid-bg.png';
import ps5Img from '../assets/images/PS5.jpg';
import gearImg from '../assets/images/premium_gaming_gear_store_kenya.png';

export default function Hero() {
    // Smooth scroll handler
    const scrollToSection = (e: React.MouseEvent, selector: string) => {
        e.preventDefault();
        const section = document.querySelector(selector) || document.querySelector('main');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0b0b0f] px-0 sm:px-4 py-24 sm:py-32 border-b border-white/5">
            {/* Background Base */}
            <div className="absolute inset-0 z-0 bg-[#0b0b0f]">
                {/* Grid Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.15] mix-blend-screen"
                    style={{ backgroundImage: `url(${redGridBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />

                {/* Glow Effects */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#ff0055]/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/20 rounded-full blur-[100px] mix-blend-screen opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00d9ff]/10 rounded-full blur-[150px] mix-blend-screen opacity-40" />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0f] via-[#0b0b0f]/50 to-[#0b0b0f]/80" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="w-full max-w-7xl relative z-10 mx-auto px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
                    {/* Left Column - Content */}
                    <div className="flex flex-col items-start space-y-8 max-w-2xl relative z-20">

                        {/* Live Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75 md:opacity-100"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ffcc]"></span>
                            </span>
                            <span className="text-[11px] font-bold text-white tracking-[0.2em] uppercase">
                                Live Players Online
                            </span>
                        </motion.div>

                        {/* Eyebrow & Headline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <h3 className="flex items-center gap-4 text-sm font-black tracking-[0.3em] text-[#ff0055] uppercase">
                                <span className="h-px w-8 bg-[#ff0055]" />
                                Enter The Krypt
                            </h3>
                            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white leading-[0.9] uppercase drop-shadow-[0_0_30px_rgba(255,0,85,0.3)]">
                                PLAY. COMPETE. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] to-[#8b5cf6]">
                                    DOMINATE.
                                </span>
                            </h1>
                        </motion.div>

                        {/* Subheadline */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            className="flex flex-col space-y-4"
                        >
                            <p className="text-base sm:text-lg text-white/75 font-medium leading-relaxed max-w-xl pl-4 border-l-2 border-[#8b5cf6]">
                                The ultimate duality of gaming. Book your premium session in <strong className="text-white">The Arena</strong> or deploy with pro-grade peripherals from <strong className="text-white">The Vault</strong>.
                            </p>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
                        >
                            <Button
                                size="lg"
                                className="relative overflow-hidden bg-[#ff0055] hover:bg-[#ff0055]/90 text-white font-black uppercase tracking-wider rounded-sm px-8 py-7 text-lg group w-full sm:w-auto shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,0,85,0.6)] transition-all"
                                onClick={(e) => scrollToSection(e, '#arena-section')}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                <span className="relative flex items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-300">
                                    <Gamepad2 className="w-5 h-5" />
                                    Book Your Battle
                                </span>
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="relative overflow-hidden bg-black/40 border-[#8b5cf6]/50 text-white hover:border-[#8b5cf6] hover:bg-[#8b5cf6]/20 font-bold uppercase tracking-wider rounded-sm px-8 py-7 text-lg group w-full sm:w-auto transition-all backdrop-blur-sm shadow-[0_0_20px_rgba(139,92,246,0)] hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                                onClick={(e) => scrollToSection(e, '#vault-section')}
                            >
                                <span className="relative flex items-center justify-center gap-2 group-hover:scale-105 transition-transform duration-300">
                                    <ShoppingBag className="w-5 h-5 text-[#8b5cf6]" />
                                    Enter The Vault
                                </span>
                            </Button>
                        </motion.div>

                        {/* Platform Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-8"
                        >
                            <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Supported:</span>
                            {[
                                { name: "PS5", icon: Cpu },
                                { name: "Xbox", icon: Activity },
                                { name: "VR", icon: MonitorPlay },
                                { name: "Racing Simulator", icon: Zap }
                            ].map((platform, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 text-white/75 hover:text-[#00d9ff] transition-colors cursor-default">
                                    <platform.icon className="w-4 h-4" />
                                    <span className="text-xs sm:text-sm font-semibold tracking-wide">{platform.name}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Column - Dynamic Visual Cards */}
                    <div className="relative hidden lg:block h-[600px] w-full mt-10 lg:mt-0 [perspective:1000px] z-10">
                        {/* Center Arc Effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-white/5 bg-gradient-to-b from-white/5 to-transparent animate-[spin_30s_linear_infinite]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#8b5cf6]/10 animate-[spin_40s_linear_infinite_reverse]" />

                        {/* Highlighting Stats / Features */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="absolute top-10 right-0 z-30 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-[0_0_30px_rgba(255,0,85,0.15)] flex items-center gap-4 hover:scale-105 hover:border-[#ff0055]/50 transition-all cursor-default"
                        >
                            <div className="w-12 h-12 bg-[#ff0055]/20 rounded-full flex items-center justify-center border border-[#ff0055]/30">
                                <Activity className="w-6 h-6 text-[#ff0055]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest text-[#ff0055]">The Arena</p>
                                <p className="text-base font-black text-white uppercase tracking-wide">4 PS5 Stations + VR</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                            className="absolute bottom-12 left-4 z-30 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-[0_0_30px_rgba(139,92,246,0.15)] flex items-center gap-4 hover:scale-105 hover:border-[#8b5cf6]/50 transition-all cursor-default"
                        >
                            <div className="w-12 h-12 bg-[#8b5cf6]/20 rounded-full flex items-center justify-center border border-[#8b5cf6]/30">
                                <ShoppingBag className="w-6 h-6 text-[#8b5cf6]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest text-[#8b5cf6]">The Vault</p>
                                <p className="text-base font-black text-white uppercase tracking-wide">Top Gaming Gear</p>
                            </div>
                        </motion.div>

                        {/* Floating Cards Container */}
                        <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]">

                            {/* Card 1: Console / Play */}
                            <motion.div
                                animate={{ y: [-15, 15, -15], rotateY: [-5, 5, -5] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -left-6 top-1/4 w-60 h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-[#12121a]/80 backdrop-blur-md shadow-2xl group cursor-pointer z-20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#ff0055]/20 z-10" />
                                <img src={ps5Img} alt="PS5 Station" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                    <Gamepad2 className="w-4 h-4 text-[#ff0055]" />
                                </div>
                                <div className="absolute bottom-6 left-5 right-5 z-20 transform group-hover:-translate-y-2 transition-transform duration-300">
                                    <span className="px-2 py-1 text-[9px] font-black bg-[#ff0055] text-white rounded-sm uppercase tracking-widest mb-3 inline-block shadow-[0_0_10px_rgba(255,0,85,0.5)]">Arena</span>
                                    <h4 className="text-white font-black text-xl leading-none uppercase tracking-wide">Next-Gen<br />Sessions</h4>
                                    <div className="h-0.5 w-8 bg-[#ff0055] mt-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                </div>
                            </motion.div>

                            {/* Card 2: Gear / Shop */}
                            <motion.div
                                animate={{ y: [15, -15, 15], rotateY: [5, -5, 5] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute right-0 top-1/3 w-64 h-[350px] rounded-2xl overflow-hidden border border-[#8b5cf6]/30 bg-[#12121a]/80 backdrop-blur-md shadow-[0_0_50px_rgba(139,92,246,0.15)] group cursor-pointer z-10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#8b5cf6]/20 z-10" />
                                <img src={gearImg} alt="Gaming Gear" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                    <ShoppingBag className="w-4 h-4 text-[#8b5cf6]" />
                                </div>
                                <div className="absolute bottom-6 left-5 right-5 z-20 transform group-hover:-translate-y-2 transition-transform duration-300">
                                    <span className="px-2 py-1 text-[9px] font-black bg-[#8b5cf6] text-white rounded-sm uppercase tracking-widest mb-3 inline-block shadow-[0_0_10px_rgba(139,92,246,0.5)]">Vault</span>
                                    <h4 className="text-white font-black text-2xl leading-none uppercase tracking-wide">Elite<br />Peripherals</h4>
                                    <p className="text-[10px] text-white/50 mt-2 uppercase tracking-widest font-bold">Level Up Your Setup</p>
                                    <div className="h-0.5 w-8 bg-[#8b5cf6] mt-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Scroll/Decoration Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pb-6 group cursor-pointer"
                onClick={(e) => scrollToSection(e, 'main')}
            >
                <div className="text-[9px] font-black text-white/30 group-hover:text-[#ff0055] uppercase tracking-[0.3em] [writing-mode:vertical-lr] rotate-180 transition-colors">
                    Scroll Down
                </div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 via-white/10 to-transparent group-hover:from-[#ff0055] transition-colors" />
            </motion.div>
        </section>
    );
}
