import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
    Play, ChevronLeft, ChevronRight,
    Volume2, VolumeX, Gamepad2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import local images
import carRacingImg from '../assets/images/carracing.jpg';
import codImg from '../assets/images/callofceeeee.jpg';
import batmobileImg from '../assets/images/batmovile.jpg';
import fortniteImg from '../assets/images/fortnite.jpg';
import cyberpunkImg from '../assets/images/cyberpunk.jpg';

// Game Data
const games = [
    {
        id: 'cod',
        name: 'CALL OF DUTY',
        tagline: 'WARFARE EVOLVED',
        img: codImg,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-soldier-running-through-a-field-of-smoke-4351-large.mp4',
        description: 'The ultimate tactical shooter experience. Deploy, engage, and dominate in high-stakes multiplayer battles.',
        stats: { players: '150', duration: '20m', type: 'Competitive' },
        badges: ['POPULAR', 'TOURNAMENT'],
        color: '#ef4444' // red-500
    },
    {
        id: 'racing',
        name: 'NEED FOR SPEED',
        tagline: 'ADRENALINE RUSH',
        img: carRacingImg,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fast-car-driving-on-a-city-street-at-night-4256-large.mp4',
        description: 'Experience the thrill of high-speed racing with hyper-realistic physics and custom tuning.',
        stats: { players: '1-8', duration: '5m', type: 'Racing' },
        badges: ['NEW'],
        color: '#3b82f6' // blue-500
    },
    {
        id: 'fortnite',
        name: 'FORTNITE',
        tagline: 'BUILD. BATTLE. SURVIVE.',
        img: fortniteImg,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-player-kicking-the-ball-in-the-stadium-4354-large.mp4', // Placeholder video
        description: 'Battle, build, and create in the world\'s most popular battle royale. Squad up and claim Victory Royale.',
        stats: { players: '100', duration: '25m', type: 'Battle Royale' },
        badges: ['MULTIPLAYER'],
        color: '#a855f7' // purple-500
    },
    {
        id: 'batman',
        name: 'BATMAN: ARKHAM',
        tagline: 'BE THE BATMAN',
        img: batmobileImg,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-playing-a-video-game-with-a-controller-4032-large.mp4', // Placeholder
        description: 'Become the Dark Knight and protect Gotham from the shadows in this award-winning action adventure.',
        stats: { players: '1', duration: '∞', type: 'Action' },
        badges: ['STORY RICH'],
        color: '#eab308' // yellow-500
    },
    {
        id: 'cyberpunk',
        name: 'CYBERPUNK 2077',
        tagline: 'WELCOME TO NIGHT CITY',
        img: cyberpunkImg,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-city-with-flying-cars-4258-large.mp4', // Placeholder
        description: 'An open-world, action-adventure story set in Night City, a megalopolis obsessed with power and glamour.',
        stats: { players: '1', duration: '∞', type: 'RPG' },
        badges: ['OPEN WORLD'],
        color: '#22d3ee' // cyan-400
    }
];

export default function GameHub() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const navigate = useNavigate();

    const activeGame = games[activeIndex];

    const nextGame = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % games.length);
    }, []);

    const prevGame = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + games.length) % games.length);
    }, []);

    // Auto-rotate spotlight if not interacting
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            nextGame();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextGame, isPaused]);

    return (
        <section
            className="relative min-h-screen bg-black overflow-hidden flex flex-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >

            {/* 1. DYNAMIC BACKGROUND (The "Vibe") */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeGame.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={activeGame.img}
                            alt=""
                            className="w-full h-full object-cover opacity-30 blur-sm scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 2. INTERACTIVE GAME PANELS (Top Carousel) */}
            <div className="relative z-20 bg-gradient-to-b from-black via-transparent to-transparent pt-12 pb-8 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Gamepad2 className="w-5 h-5 text-zinc-500" />
                            <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">AVAILABLE_OPERATIONS</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={prevGame}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                                aria-label="Previous game"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={nextGame}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                                aria-label="Next game"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Smooth Sliding Carousel */}
                    <div className="relative h-[400px] md:h-[480px] flex items-center justify-center">
                        <motion.div
                            className="flex gap-6 absolute"
                            animate={{
                                x: `calc(50% - ${activeIndex * 280}px - 140px)`
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                                mass: 0.8
                            }}
                        >
                            {games.map((game, index) => {
                                const isActive = index === activeIndex;
                                const offset = Math.abs(index - activeIndex);

                                return (
                                    <motion.div
                                        key={game.id}
                                        onClick={() => setActiveIndex(index)}
                                        className="relative cursor-pointer group"
                                        animate={{
                                            scale: isActive ? 1.1 : 0.85,
                                            opacity: offset > 1 ? 0.3 : isActive ? 1 : 0.6,
                                            y: isActive ? -10 : 0,
                                            filter: isActive ? 'brightness(1.1)' : 'brightness(0.8)'
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25
                                        }}
                                        style={{
                                            '--game-color': game.color
                                        } as React.CSSProperties}
                                    >
                                        <div
                                            className={`
                                                relative w-56 md:w-64 aspect-[3/4] rounded-xl overflow-hidden
                                                ${isActive ? 'ring-2 ring-offset-2 ring-offset-black' : ''}
                                            `}
                                            style={isActive ? {
                                                '--tw-ring-color': game.color
                                            } as React.CSSProperties : undefined}
                                        >
                                            {/* Image */}
                                            <img
                                                src={game.img}
                                                alt={game.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                            {/* Content */}
                                            <div className="absolute inset-0 p-4 flex flex-col justify-between">
                                                <div className="flex flex-wrap gap-2">
                                                    {game.badges.map(badge => (
                                                        <span
                                                            key={badge}
                                                            className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded text-[8px] font-black text-white uppercase tracking-widest border border-white/10"
                                                        >
                                                            {badge}
                                                        </span>
                                                    ))}
                                                </div>

                                                <motion.div
                                                    className="transform"
                                                    animate={{
                                                        y: isActive ? 0 : 16
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="text-lg font-black text-white italic uppercase tracking-tighter leading-none mb-1">
                                                        {game.name}
                                                    </p>
                                                    <motion.div
                                                        className="h-0.5 bg-[var(--game-color)]"
                                                        animate={{
                                                            width: isActive ? '100%' : '0%'
                                                        }}
                                                        transition={{ duration: 0.5 }}
                                                    />

                                                    <motion.div
                                                        className="mt-3"
                                                        animate={{
                                                            opacity: isActive ? 1 : 0
                                                        }}
                                                        transition={{ duration: 0.3, delay: 0.1 }}
                                                    >
                                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                                                            DEPLOY <ChevronRight className="w-3 h-3" />
                                                        </span>
                                                    </motion.div>
                                                </motion.div>
                                            </div>

                                            {/* Active Glow */}
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-[var(--game-color)] pointer-events-none mix-blend-overlay"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 0.1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Glow Effect Behind Active Card */}
                                        {isActive && (
                                            <motion.div
                                                className="absolute -inset-4 -z-10 blur-2xl rounded-xl"
                                                style={{ backgroundColor: game.color }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 0.2 }}
                                                exit={{ opacity: 0 }}
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {games.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className="group relative"
                                aria-label={`Go to game ${index + 1}`}
                            >
                                <motion.div
                                    className="h-1 rounded-full bg-zinc-700"
                                    animate={{
                                        width: index === activeIndex ? 32 : 8,
                                        backgroundColor: index === activeIndex ? games[index].color : '#3f3f46'
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. FEATURED GAME SPOTLIGHT (Below Carousel) */}
            <div className="relative z-10 container mx-auto px-4 pb-12 flex-1 flex flex-col md:flex-row items-center gap-12">

                {/* LEFT: Game Details */}
                <div className="w-full md:w-1/2 space-y-8">
                    <motion.div
                        key={activeGame.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-px w-12" style={{ backgroundColor: activeGame.color }} />
                            <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: activeGame.color }}>
                                FEATURED_TITLE
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
                            {activeGame.name}
                        </h1>

                        <p className="text-xl md:text-2xl font-bold text-white/80 uppercase tracking-widest">
                            "{activeGame.tagline}"
                        </p>

                        <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed max-w-lg border-l-2 pl-6" style={{ borderColor: activeGame.color }}>
                            {activeGame.description}
                        </p>

                        <div className="pt-8">
                            <Button
                                onClick={() => navigate('/arcade')}
                                className="h-14 px-8 bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest text-sm rounded-none clip-path-slant"
                            >
                                <Play className="w-4 h-4 mr-2 fill-current" />
                                BOOK NOW & PLAY
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: Cinematic Gameplay Preview */}
                <div className="w-full md:w-1/2 relative">
                    <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl group">
                        {/* Glow Effect */}
                        <div
                            className="absolute -inset-4 opacity-20 blur-2xl transition-colors duration-500"
                            style={{ backgroundColor: activeGame.color }}
                        />

                        {/* Frame */}
                        <div className="relative z-10 w-full h-full bg-black border border-zinc-800 rounded-lg overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.video
                                    key={activeGame.videoUrl}
                                    src={activeGame.videoUrl}
                                    poster={activeGame.img}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    autoPlay
                                    muted={isMuted}
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                                />
                            </AnimatePresence>

                            {/* Minimal UI Overlay */}
                            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">GAMEPLAY_PREVIEW</span>
                            </div>

                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="absolute bottom-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
                            >
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
