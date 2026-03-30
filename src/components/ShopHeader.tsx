import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, MapPin, Zap, Award, ShoppingBag, Tag, Star } from 'lucide-react';
import { Button } from './ui/button';
import { products } from '../data/products';
import redGridBg from '../assets/images/red-grid-bg.png';

const HEADLINE_WORDS = ["GEAR", "LOADOUTS", "ACCESSORIES", "SETUPS"];
const CATEGORIES = ["Controllers", "Headsets", "Keyboards", "Mousepads", "Consoles", "VR Gear"];

export default function ShopHeader() {
    const [wordIndex, setWordIndex] = useState(0);
    const [slideIndex, setSlideIndex] = useState(0);

    // Mouse Parallax effect
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wordTimer = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % HEADLINE_WORDS.length);
        }, 3000);

        const slideTimer = setInterval(() => {
            setSlideIndex((prev) => (prev + 1) % products.length);
        }, 5000);

        return () => {
            clearInterval(wordTimer);
            clearInterval(slideTimer);
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    };

    const currentWord = HEADLINE_WORDS[wordIndex];
    const currentProduct = products[slideIndex] || products[0];
    const prevProduct = products[(slideIndex - 1 + products.length) % products.length] || products[0];

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="relative w-full min-h-[calc(100vh-4rem)] flex items-center pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden bg-[#050505] px-4 border-b border-white/5"
        >
            {/* Ambient Background & Particles */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-10 mix-blend-screen"
                    style={{ backgroundImage: `url(${redGridBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />

                {/* Immersive Deep Red / Crimson Glows */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-[#ff003c]/20 rounded-full blur-[150px] mix-blend-screen"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#ff003c]/10 rounded-full blur-[120px] mix-blend-screen"
                />

                {/* Soft Animated Light Sweeps */}
                <motion.div
                    animate={{
                        x: ['-100%', '200%'],
                        opacity: [0, 0.15, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 1 }}
                    className="absolute inset-0 w-[500px] h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] blur-[50px] mix-blend-overlay"
                />

                {/* Vignettes for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/50" />
            </div>

            <div className="w-full max-w-7xl relative z-10 mx-auto grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                {/* LEFT SIDE: Content */}
                <div className="lg:col-span-6 flex flex-col items-start space-y-8 relative z-20">

                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full"
                    >
                        <div className="h-2 w-2 rounded-full bg-[#ff003c] animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90">The Vault</span>
                    </motion.div>

                    {/* Headline */}
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl sm:text-7xl font-black italic tracking-tighter text-white uppercase leading-[0.9]"
                        >
                            SHOP ELITE <br />
                            GAMING <span className="inline-flex relative min-w-[280px]">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={currentWord}
                                        initial={{ opacity: 0, y: 40, rotateX: -90 }}
                                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                        exit={{ opacity: 0, y: -40, rotateX: 90 }}
                                        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                                        className="absolute left-0 text-transparent bg-clip-text bg-gradient-to-r from-[#ff003c] to-[#ff4d79] drop-shadow-[0_0_20px_rgba(255,0,60,0.5)]"
                                        style={{ transformOrigin: "50% 50% -50px" }}
                                    >
                                        {currentWord}
                                    </motion.span>
                                </AnimatePresence>
                                {/* Invisible placeholder for layout sizing */}
                                <span className="opacity-0">ACCESSORIES</span>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-base sm:text-lg text-white/70 max-w-lg font-medium border-l-2 border-[#ff003c] pl-4 leading-relaxed"
                        >
                            Authentic gaming gear, Nairobi delivery or pickup, and instant M-Pesa checkout. Premium accessories and elite setup upgrades for serious gamers.
                        </motion.p>
                    </div>

                    {/* M-Pesa Strip */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 px-4 py-2 rounded-lg backdrop-blur-sm"
                    >
                        <Zap className="h-5 w-5 text-green-500 animate-pulse drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-green-400">
                            Instant M-Pesa Checkout Available
                        </span>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
                    >
                        <Button
                            size="lg"
                            className="relative overflow-hidden bg-[#ff003c] hover:bg-[#ff003c]/90 text-white font-black uppercase tracking-widest rounded-sm px-10 py-7 text-base group shadow-[0_0_20px_rgba(255,0,60,0.3)] hover:shadow-[0_0_30px_rgba(255,0,60,0.5)] transition-all"
                        >
                            <span className="relative z-10 flex items-center gap-2 group-hover:scale-105 transition-transform">
                                <ShoppingBag className="w-5 h-5" />
                                Shop Now
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="relative overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-black uppercase tracking-widest rounded-sm px-10 py-7 text-base group backdrop-blur-sm transition-all"
                        >
                            <span className="relative z-10 flex items-center gap-2 group-hover:scale-105 transition-transform">
                                <Tag className="w-5 h-5 text-[#ff003c]" />
                                View Hot Deals
                            </span>
                        </Button>
                    </motion.div>

                    {/* Trust Chips */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 pt-4"
                    >
                        {[
                            { icon: ShieldCheck, label: 'Original Products' },
                            { icon: Award, label: 'Warranty Included' },
                            { icon: MapPin, label: 'Pickup at Mall' },
                            { icon: Truck, label: 'Fast Delivery' },
                        ].map((chip, idx) => (
                            <div
                                key={idx}
                                className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ff003c]/50 rounded-xl px-3 py-2 transition-all cursor-default"
                            >
                                <chip.icon className="w-4 h-4 text-white/50 group-hover:text-[#ff003c] transition-colors" />
                                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
                                    {chip.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Category Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-wrap gap-2 pt-4 border-t border-white/10 w-full"
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2">Quick Links:</span>
                        {CATEGORIES.map(category => (
                            <button key={category} className="text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-sm transition-colors border border-white/5 hover:border-white/20">
                                {category}
                            </button>
                        ))}
                    </motion.div>

                </div>

                {/* RIGHT SIDE: Cinematic Product Presentation */}
                <div className="lg:col-span-6 relative h-[500px] lg:h-[600px] w-full mt-8 lg:mt-0 perspective-[2000px]">

                    {/* Blurred Distant Layer (Parallax Background) */}
                    <motion.div
                        animate={{
                            x: mousePosition.x * -20,
                            y: mousePosition.y * -20,
                        }}
                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                        className="absolute right-0 top-10 w-64 h-64 opacity-30 blur-[4px] pointer-events-none z-0"
                    >
                        <img
                            src={prevProduct?.image}
                            alt=""
                            className="w-full h-full object-cover rounded-3xl"
                        />
                    </motion.div>

                    {/* Main Slideshow Layer */}
                    <motion.div
                        animate={{
                            x: mousePosition.x * 20,
                            y: mousePosition.y * 20,
                            rotateY: mousePosition.x * 10,
                            rotateX: mousePosition.y * -10,
                        }}
                        transition={{ type: "spring", stiffness: 70, damping: 25 }}
                        className="absolute inset-0 flex items-center justify-center z-10 [transform-style:preserve-3d]"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProduct?.id}
                                initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 1.1, rotateY: -30 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative w-[300px] sm:w-[400px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
                            >
                                <img
                                    src={currentProduct?.image}
                                    alt={currentProduct?.name}
                                    className="absolute inset-0 w-full h-full object-cover brightness-110 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />
                                <div className="absolute inset-0 bg-[#ff003c]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay pointer-events-none" />

                                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                                    {currentProduct?.tags && currentProduct.tags[0] && (
                                        <span className="inline-block px-2.5 py-1 text-[9px] font-black bg-[#ff003c] text-white rounded-sm uppercase tracking-widest mb-3 shadow-[0_0_10px_rgba(255,0,60,0.5)]">
                                            {currentProduct.tags[0]}
                                        </span>
                                    )}
                                    <h3 className="text-2xl font-black uppercase text-white leading-tight mb-2 drop-shadow-md">
                                        {currentProduct?.name}
                                    </h3>
                                    <div className="flex items-center justify-between pointer-events-auto">
                                        <p className="text-xl font-bold text-[#ff003c] drop-shadow-sm">
                                            KSh {currentProduct?.price?.toLocaleString()}
                                        </p>
                                        <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full px-4 text-xs font-bold border border-white/10">
                                            View Item
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Floating Foreground Accessory Card */}
                    <motion.div
                        animate={{
                            x: mousePosition.x * 50,
                            y: mousePosition.y * 50 + Math.sin(Date.now() / 1000) * 10,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 30 }}
                        className="absolute bottom-16 -left-4 sm:left-4 lg:left-[-10%] z-20 w-48 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl"
                    >
                        <div className="relative h-24 rounded-xl overflow-hidden mb-3">
                            <img src={products[3]?.image || currentProduct?.image} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-2 left-2 flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-[10px] font-bold text-white">4.9</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Featured</p>
                        <p className="text-xs font-black text-white uppercase truncate">{products[3]?.name || 'Pro Gear'}</p>
                    </motion.div>

                    {/* Deal Tag / Badge */}
                    <motion.div
                        animate={{
                            x: mousePosition.x * 60,
                            y: mousePosition.y * 60,
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            x: { type: "spring", stiffness: 120, damping: 20 },
                            y: { type: "spring", stiffness: 120, damping: 20 },
                            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute top-20 right-0 sm:right-10 z-30 bg-gradient-to-br from-[#ff003c] to-[#990024] p-4 rounded-full shadow-[0_10px_30px_rgba(255,0,60,0.4)] border border-white/20 flex flex-col items-center justify-center w-24 h-24"
                    >
                        <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest leading-none mb-1">Up to</span>
                        <span className="text-2xl font-black text-white leading-none">20%</span>
                        <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest leading-none mt-1">Off</span>
                    </motion.div>

                    {/* Progress Indicators for Slideshow */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                        {products.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSlideIndex(i)}
                                className={`h-1.5 transition-all duration-300 rounded-full ${i === slideIndex ? 'w-8 bg-[#ff003c] shadow-[0_0_10px_rgba(255,0,60,0.8)]' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
