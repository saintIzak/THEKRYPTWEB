import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

// Using the generated images (placeholders for now, will use the paths provided by the tool)
import arcadeImg from '../assets/images/nairobi_gaming_arcade_maiyan_mall.png';

import blackOpsImg from '../assets/images/blackops.jpg';
import f1Img from '../assets/images/f1typeshii.jpg';
import mortalCombatImg from '../assets/images/mortalcombat.jpg';
import raceMeImg from '../assets/images/raceme.jpg';
// import shopImg from '../assets/images/premium_gaming_gear_store_kenya.png'; // Replaced by video grid

import vrVideo from '../assets/videos/vrvideogames.mp4';
import droneVideo from '../assets/videos/droneproduct.mp4';
import p2Video from '../assets/videos/p2gamingproduct.mp4';
import ps5Video from '../assets/videos/ps5products.mp4';
import xboxVideo from '../assets/videos/xboxproducts.mp4';

export default function DualPowerHero() {
    const [bgIndex, setBgIndex] = useState(0);
    const bgImages = [blackOpsImg, f1Img, mortalCombatImg, raceMeImg];

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % bgImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [bgImages.length]);

    const [isBroken, setIsBroken] = useState(false);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Disable animation on mobile
        const breakInterval = setInterval(() => {
            setIsBroken(prev => !prev);
        }, 4000);
        return () => clearInterval(breakInterval);
    }, [isMobile]);

    const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
    const [mobileTab, setMobileTab] = useState<'arena' | 'vault'>('arena');

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black flex flex-col md:flex-row">
            {/* Mobile Toggle (Visible only on small screens) */}
            <div className="absolute top-20 left-0 right-0 z-50 flex justify-center md:hidden pointer-events-auto">
                <div className="flex bg-black/80 backdrop-blur-md border border-zinc-800 rounded-full p-1">
                    <button
                        onClick={() => setMobileTab('arena')}
                        className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${mobileTab === 'arena' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Arena
                    </button>
                    <button
                        onClick={() => setMobileTab('vault')}
                        className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${mobileTab === 'vault' ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Vault
                    </button>
                </div>
            </div>
            {/* Global Underlying Background (Revealed by both sections) */}
            <div className="absolute inset-0 z-0 bg-zinc-950">
                <div className="absolute inset-0">
                    {bgImages.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === bgIndex ? 'opacity-70' : 'opacity-0'
                                }`}
                        >
                            <motion.img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover brightness-110"
                                initial={{ scale: 1 }}
                                animate={{ scale: 1.05 }}
                                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-red-900/3 mix-blend-screen pointer-events-none" />
                {/* Flash Overlay - Desktop Only */}
                {!isMobile && (
                    <motion.div
                        className="absolute inset-0 bg-white mix-blend-overlay z-20 pointer-events-none"
                        animate={{ opacity: isBroken ? [0, 0.4, 0] : 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    />
                )}
            </div>



            {/* Left Side: The Arena (Arcade) */}
            <motion.div
                className={`relative w-full md:w-1/2 h-full group cursor-pointer overflow-hidden md:border-r-0 border-zinc-900 transition-all duration-700 ${mobileTab === 'vault' ? 'hidden md:flex' : 'flex'
                    } ${hoveredSide === 'right' ? 'brightness-50 grayscale-[0.5] scale-[0.98]' : 'brightness-100 grayscale-0 scale-100'}`}
                onMouseEnter={() => setHoveredSide('left')}
                onMouseLeave={() => setHoveredSide(null)}
                style={{ willChange: 'transform, filter' }}
            >
                {/* Foreground (The Cave) - Animated Clip Path */}
                <motion.div
                    className="absolute inset-0 w-full h-full z-10 bg-black overflow-hidden"
                    initial={{
                        clipPath: 'polygon(0 0, 96% 0, 100% 5%, 96% 12%, 99% 20%, 95% 28%, 99% 35%, 96% 42%, 100% 50%, 96% 58%, 99% 65%, 95% 72%, 100% 80%, 96% 88%, 99% 95%, 96% 100%, 0 100%, 0 0)'
                    }}
                    animate={{
                        clipPath: 'polygon(0 0, 30% 0, 34% 5%, 38% 12%, 43% 20%, 47% 28%, 52% 35%, 57% 42%, 63% 50%, 68% 58%, 73% 65%, 78% 72%, 84% 80%, 89% 88%, 94% 95%, 96% 100%, 0 100%, 0 0)'
                    }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                    style={{ willChange: 'clip-path' }}
                >
                    <img
                        src={arcadeImg}
                        alt="The Arena - Maiyan Mall Arcade"
                        className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110 brightness-90 group-hover:brightness-110 saturate-110"
                    />
                    {/* Lighter Vignette Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.2)_70%,rgba(0,0,0,0.6)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60" />
                    {/* Red Accent Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent mix-blend-screen" />
                </motion.div>

                <div className="relative z-20 h-full flex flex-col items-center justify-center p-8 text-center pointer-events-none">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6 drop-shadow-2xl max-w-lg relative"
                    >
                        {/* Enhanced Backing for Text */}
                        <div className="absolute inset-0 -m-8 bg-gradient-to-b from-red-900/30 to-black/50 blur-3xl -z-10 rounded-full" />
                        <div className="absolute inset-0 -m-6 bg-red-600/5 blur-2xl -z-10 rounded-full" />

                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 px-4 py-1.5 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.6)] border border-red-300/40">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live: 128 Players</span>
                        </div>

                        <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800">ARENA</span>
                        </h2>

                        <p className="text-base text-zinc-300 font-bold uppercase tracking-widest max-w-md mx-auto leading-relaxed drop-shadow-md">
                            High-end rigs. 240Hz monitors. <br />The ultimate LAN experience.
                        </p>

                        <div className="pt-6 pointer-events-auto">
                            <Button
                                onClick={() => {
                                    const nextSection = document.querySelector('section:nth-of-type(2)');
                                    nextSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className="relative overflow-hidden bg-red-600 hover:bg-red-500 text-white px-10 py-8 rounded-none font-black tracking-[0.2em] uppercase group/btn shadow-[0_0_40px_rgba(220,38,38,0.5)] border-t border-red-400 transition-all hover:-translate-y-1"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />
                                EXPLORE & EXPERIENCE THE KRYPT <ChevronRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Tactical HUD Overlay - Adjusted for Cave Look */}
                <div className="absolute top-6 left-6 w-full h-full border-[20px] border-black/80 blur-xl pointer-events-none mix-blend-multiply z-20" />
                <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-red-600/30 pointer-events-none z-20" />
                <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-red-600/30 pointer-events-none z-20" />
            </motion.div>

            {/* Right Side: The Vault (Shop) */}
            <motion.div
                className={`relative w-full md:w-1/2 h-full group cursor-pointer overflow-hidden transition-all duration-700 ${mobileTab === 'arena' ? 'hidden md:flex' : 'flex'
                    } ${hoveredSide === 'left' ? 'brightness-50 grayscale-[0.5] scale-[0.98]' : 'brightness-100 grayscale-0 scale-100'}`}
                onMouseEnter={() => setHoveredSide('right')}
                onMouseLeave={() => setHoveredSide(null)}
                style={{ willChange: 'transform, filter' }}
            >
                {/* Breaking Glass Particles - Explosive Shards */}
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    animate={{ opacity: isBroken ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                            style={{
                                width: Math.random() * 60 + 20,
                                height: Math.random() * 60 + 20,
                                clipPath: i % 2 === 0
                                    ? 'polygon(50% 0%, 0% 100%, 100% 100%)' // Triangle
                                    : 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', // Trapezoid
                                top: `${Math.random() * 80 + 10}%`,
                                left: `${Math.random() * 40}%`, // Start from the broken side
                            }}
                            animate={{
                                x: [0, Math.random() * 400 + 100], // Fly right
                                y: [0, (Math.random() - 0.5) * 300], // Spread vertically
                                rotate: [0, Math.random() * 720 - 360],
                                scale: [0, 1.5, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 1.5 + Math.random(),
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: Math.random() * 0.5,
                            }}
                        />
                    ))}
                </motion.div>

                <div className="relative h-full w-full overflow-hidden">
                    {/* Energy Rim Layer (Behind) - Desktop Only */}
                    {!isMobile && (
                        <motion.div
                            className="absolute inset-0 w-full h-full z-0 bg-gradient-to-r from-red-600 via-red-500 to-transparent opacity-80"
                            animate={{
                                clipPath: isBroken
                                    ? [
                                        'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%, 100% 0%)', // Start Closed
                                        'polygon(100% 0%, 100% 100%, 0% 100%, 2% 90%, 0% 80%, 3% 60%, 0% 40%, 2% 20%, 0% 0%, 100% 0%)', // Leak (Anticipation)
                                        'polygon(100% 0%, 100% 100%, 0% 100%, 8% 90%, 2% 80%, 12% 60%, 2% 40%, 8% 20%, 0% 0%, 100% 0%)' // Full Rift
                                    ]
                                    : 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%, 100% 0%)',
                                filter: isBroken ? ['blur(0px)', 'blur(4px)', 'blur(12px)'] : 'blur(0px)'
                            }}
                            transition={{
                                clipPath: { duration: 1.2, times: [0, 0.3, 1], ease: [0.22, 1, 0.36, 1] },
                                filter: { duration: 1.2, times: [0, 0.3, 1] }
                            }}
                            style={{ willChange: 'clip-path, filter' }}
                        />
                    )}

                    <motion.div
                        className="relative h-full w-full z-10 overflow-hidden"
                        initial={false}
                        animate={{
                            clipPath: isBroken
                                ? [
                                    'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%, 100% 0%)', // Start Closed
                                    'polygon(100% 0%, 100% 100%, 0% 100%, 0% 90%, 0% 80%, 0% 60%, 0% 40%, 0% 20%, 0% 0%, 100% 0%)', // Stay Closed (Lag)
                                    'polygon(100% 0%, 100% 100%, 0% 100%, 15% 90%, 5% 80%, 20% 60%, 5% 40%, 15% 20%, 0% 0%, 100% 0%)' // Full Rift (Wider)
                                ]
                                : 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%, 100% 0%)',
                            x: isBroken && !isMobile ? [0, -2, 2, 0] : 0, // Micro Shake
                            filter: isBroken && !isMobile
                                ? ['drop-shadow(0 0 0 rgba(0,0,0,0))', 'drop-shadow(-2px 0 10px rgba(220,38,38,0.4))', 'drop-shadow(-4px 0 25px rgba(220,38,38,0.8)) brightness(1.1)']
                                : 'drop-shadow(0 0 0 rgba(0,0,0,0)) brightness(1)'
                        }}
                        transition={{
                            clipPath: { duration: 1.2, times: [0, 0.3, 1], ease: [0.22, 1, 0.36, 1] },
                            x: { duration: 0.4, times: [0, 0.5, 1] },
                            filter: { duration: 1.2, times: [0, 0.3, 1] }
                        }}
                        style={{ willChange: 'clip-path, transform, filter' }}
                    >
                        <div className="absolute inset-0 z-0">
                            {/* Modern Video Grid Layout */}
                            <div className="absolute inset-0 w-full h-full grid grid-cols-2 grid-rows-3 gap-0.5 group/grid">
                                <div className="relative w-full h-full overflow-hidden group/video transition-all duration-500 group-hover/grid:opacity-50 hover:!opacity-100 hover:z-10 hover:scale-105 hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] hover:brightness-110">
                                    <video src={vrVideo} autoPlay loop muted playsInline className="w-full h-full object-cover object-center transition-all duration-700 group-hover/video:scale-110 brightness-105" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent mix-blend-overlay" />
                                </div>
                                <div className="relative w-full h-full overflow-hidden group/video transition-all duration-500 group-hover/grid:opacity-50 hover:!opacity-100 hover:z-10 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] hover:brightness-110">
                                    <video src={droneVideo} autoPlay loop muted playsInline className="w-full h-full object-cover object-center transition-all duration-700 group-hover/video:scale-110 brightness-105" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent mix-blend-overlay" />
                                </div>
                                <div className="relative w-full h-full overflow-hidden group/video transition-all duration-500 group-hover/grid:opacity-50 hover:!opacity-100 hover:z-10 hover:scale-105 hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] hover:brightness-110">
                                    <video src={p2Video} autoPlay loop muted playsInline className="w-full h-full object-cover object-center transition-all duration-700 group-hover/video:scale-110 brightness-105" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent mix-blend-overlay" />
                                </div>
                                <div className="relative w-full h-full overflow-hidden group/video transition-all duration-500 group-hover/grid:opacity-50 hover:!opacity-100 hover:z-10 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:brightness-110">
                                    <video src={ps5Video} autoPlay loop muted playsInline className="w-full h-full object-cover object-center transition-all duration-700 group-hover/video:scale-110 brightness-105" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent mix-blend-overlay" />
                                </div>
                                <div className="relative w-full h-full overflow-hidden col-span-2 group/video transition-all duration-500 group-hover/grid:opacity-50 hover:!opacity-100 hover:z-10 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.7)] hover:brightness-110">
                                    <video src={xboxVideo} autoPlay loop muted playsInline className="w-full h-full object-cover object-center transition-all duration-700 group-hover/video:scale-110 brightness-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent mix-blend-overlay" />
                                </div>
                            </div>

                            {/* Lighter Tech Overlay Effects */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                            {/* Dynamic Light Sweep */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent z-10" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-6 drop-shadow-2xl max-w-lg relative"
                            >
                                {/* Enhanced Backing for Text */}
                                <div className="absolute inset-0 -m-8 bg-gradient-to-b from-zinc-800/30 to-black/50 blur-3xl -z-10 rounded-full" />
                                <div className="absolute inset-0 -m-6 bg-white/5 blur-2xl -z-10 rounded-full" />

                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-zinc-800/90 to-zinc-900/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-zinc-600/50 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    <ShoppingBag className="w-3 h-3 text-zinc-400" />
                                    <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em]">Digital Marketplace</span>
                                </div>

                                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                                    THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500">VAULT</span>
                                </h2>

                                <p className="text-base text-zinc-300 font-bold uppercase tracking-widest max-w-md mx-auto leading-relaxed drop-shadow-md">
                                    Pro-grade peripherals. Exclusive drops. <br />Delivered to your sector.
                                </p>

                                <Link to="/shop" className="inline-block pt-6">
                                    <Button variant="outline" className="border border-white/30 text-white hover:bg-white/10 hover:text-white hover:border-white px-10 py-8 rounded-none font-black tracking-[0.2em] uppercase group/btn transition-all backdrop-blur-sm hover:-translate-y-1">
                                        ENTER THE SHOP <ChevronRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Tactical HUD Overlay */}
                        <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/20 pointer-events-none" />
                        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/20 pointer-events-none" />
                    </motion.div >
                </div>
            </motion.div >


        </section >
    );
}
