import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Gamepad2, ShoppingBag, ChevronRight, Shield,
    Users, CreditCard, Monitor, Wifi, Trophy, Zap,
} from 'lucide-react';
import arenaImg from '../../assets/images/PS5.jpg';
import VaultMosaicBackground from './VaultMosaicBackground';

type Panel = 'arena' | 'vault';

const LiveBadge = () => {
    const [count] = useState(() => Math.floor(Math.random() * 40) + 100);
    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-black/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 mb-8"
        >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-white uppercase tracking-widest">
                LIVE &bull; {count} PLAYERS ONLINE
            </span>
        </motion.div>
    );
};

export default function SplitHero() {
    const [focused, setFocused] = useState<Panel>('arena');
    const [hovered, setHovered] = useState<Panel | null>(null);
    const active = hovered ?? focused;

    // Auto-cycle panels
    useEffect(() => {
        const id = setInterval(() => {
            if (!hovered) setFocused(p => p === 'arena' ? 'vault' : 'arena');
        }, 5000);
        return () => clearInterval(id);
    }, [hovered]);

    const panels = {
        arena: {
            label: 'THE ARENA',
            tag: 'Gaming Sessions',
            headline: 'Compete. Dominate. Repeat.',
            sub: 'Book a station, pick your game, and play on elite rigs — PS5, VR, sim racing, and more.',
            bullets: [
                { icon: Monitor, text: '4 PS5 Stations + VR Rig' },
                { icon: Trophy, text: 'Weekly Tournaments' },
                { icon: Wifi, text: 'High-Speed Fibre — Zero Lag' },
            ],
            primary: { label: 'Book a Session', to: '/arcade' },
            secondary: { label: 'View Packages', to: '/arcade#pricing' },
            accent: 'from-red-600',
            border: 'border-red-600/40',
        },
        vault: {
            label: 'THE VAULT',
            tag: 'Shop & Marketplace',
            headline: 'Gear up for greatness.',
            sub: 'Premium peripherals, consoles, and exclusive drops — curated for Nairobi\'s best players.',
            bullets: [
                { icon: ShoppingBag, text: 'Curated Premium Gear' },
                { icon: CreditCard, text: 'Secure M-Pesa Checkout' },
                { icon: Zap, text: 'Exclusive Member Drops' },
            ],
            primary: { label: 'Enter the Shop', to: '/shop' },
            secondary: { label: 'View New Drops', to: '/shop?filter=new' },
            accent: 'from-violet-600',
            border: 'border-violet-500/40',
        },
    };

    const arenaW = active === 'arena' ? '56%' : '44%';
    const vaultW = active === 'vault' ? '56%' : '44%';
    const info = panels[active];

    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ height: 'calc(100svh - 64px)', minHeight: 560 }}
        >
            {/* Grain overlay */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
                    backgroundSize: '200px',
                }}
            />

            {/* Panels */}
            <div className="flex h-full">
                {/* ── ARENA panel ─────────────────────────────────────── */}
                <motion.div
                    animate={{ width: arenaW }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative h-full cursor-pointer overflow-hidden"
                    onMouseEnter={() => setHovered('arena')}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setFocused('arena')}
                >
                    <motion.img
                        src={arenaImg}
                        alt="The Arena"
                        animate={{
                            scale: active === 'arena' ? 1.05 : 1,
                            filter: active === 'arena' ? 'brightness(0.55) saturate(1.1)' : 'brightness(0.28) saturate(0.7)',
                        }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Label pill */}
                    <motion.div
                        animate={{ opacity: active === 'arena' ? 0 : 1, y: active === 'arena' ? -4 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none"
                    >
                        <div className="border border-red-600/40 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white">THE ARENA</span>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10 z-20" />

                    {/* Hover hint */}
                    <AnimatePresence>
                        {active !== 'arena' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-end justify-center pb-12 z-20 pointer-events-none"
                            >
                                <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase tracking-widest">
                                    <span>Explore</span><ChevronRight className="h-3 w-3" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ── VAULT panel ─────────────────────────────────────── */}
                <motion.div
                    animate={{ width: vaultW }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative h-full cursor-pointer overflow-hidden"
                    onMouseEnter={() => setHovered('vault')}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setFocused('vault')}
                >
                    {/* ▼ MOSAIC replaces the static image ▼ */}
                    <VaultMosaicBackground isActive={active === 'vault'} />

                    {/* Label pill */}
                    <motion.div
                        animate={{ opacity: active === 'vault' ? 0 : 1, y: active === 'vault' ? -4 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                    >
                        <div className="border border-violet-500/40 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white">THE VAULT</span>
                        </div>
                    </motion.div>

                    {/* Hover hint */}
                    <AnimatePresence>
                        {active !== 'vault' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-end justify-center pb-12 z-30 pointer-events-none"
                            >
                                <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase tracking-widest">
                                    <span>Explore</span><ChevronRight className="h-3 w-3" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* ── Centre content overlay (z-30 above both panels) ──────────── */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-14 md:pb-20 px-6 pointer-events-none">
                <div className="w-full max-w-3xl text-center">
                    <LiveBadge />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        >
                            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white/50 mb-3">
                                {info.tag}
                            </p>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter text-white leading-[0.95] mb-5">
                                {info.headline}
                            </h1>
                            <p className="text-sm sm:text-base text-white/60 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
                                {info.sub}
                            </p>
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
                                {info.bullets.map(({ icon: Icon, text }) => (
                                    <div key={text} className="flex items-center gap-2">
                                        <Icon className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
                                        <span className="text-xs text-white/70 font-semibold">{text}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pointer-events-auto mb-8">
                                <Link
                                    to={info.primary.to}
                                    className="group relative overflow-hidden bg-white text-black font-black text-sm uppercase tracking-widest px-8 py-4 flex items-center gap-3 hover:bg-red-600 hover:text-white transition-colors duration-300"
                                >
                                    {info.primary.label}
                                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    to={info.secondary.to}
                                    className="group border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-bold text-sm uppercase tracking-widest px-8 py-4 flex items-center gap-3 transition-all duration-300 backdrop-blur-sm"
                                >
                                    {info.secondary.label}
                                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform opacity-60 group-hover:opacity-100" />
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Stats row */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-6 pointer-events-none"
                    >
                        {[
                            { icon: Monitor, label: '4 PS5 Stations' },
                            { icon: Shield, label: 'VR Available' },
                            { icon: CreditCard, label: 'Secure Payments' },
                            { icon: Users, label: '500+ Members' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="hidden sm:flex items-center gap-1.5 text-white/40">
                                <Icon className="h-3 w-3" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Panel toggle dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
                {(['arena', 'vault'] as Panel[]).map(panel => (
                    <button
                        key={panel}
                        onClick={() => { setFocused(panel); setHovered(null); }}
                        className={`h-1 rounded-full transition-all duration-500 ${focused === panel ? 'w-8 bg-red-500' : 'w-3 bg-white/20 hover:bg-white/40'}`}
                        aria-label={`Focus ${panels[panel].label}`}
                    />
                ))}
            </div>

            {/* Bottom vignette */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />

            {/* Corner labels */}
            <div className="absolute top-6 left-6 z-40 flex items-center gap-2 pointer-events-none">
                <Gamepad2 className="h-4 w-4 text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">The Arena</span>
            </div>
            <div className="absolute top-6 right-6 z-40 flex items-center gap-2 pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">The Vault</span>
                <ShoppingBag className="h-4 w-4 text-violet-400" />
            </div>
        </section>
    );
}
