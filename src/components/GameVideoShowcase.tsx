import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Play, ChevronLeft, ChevronRight, Monitor, Cpu, Activity, Shield, Zap } from 'lucide-react';

// Import local images
import carRacingImg from '../assets/images/carracing.jpg';
import codImg from '../assets/images/callofceeeee.jpg';
import batmobileImg from '../assets/images/batmovile.jpg';
import fortniteImg from '../assets/images/fortnite.jpg';

// Local Video Imports (Add your video files to src/assets/videos/)
// import racingVideo from '../assets/videos/racing.mp4';
// import codVideo from '../assets/videos/cod.mp4';
// import batmanVideo from '../assets/videos/batman.mp4';
// import fortniteVideo from '../assets/videos/fortnite.mp4';


const showcaseGames = [
    {
        name: 'CAR RACING',
        img: carRacingImg,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fast-car-driving-on-a-city-street-at-night-4256-large.mp4',
        description: 'Experience the thrill of high-speed racing with hyper-realistic physics.',
        stats: { difficulty: 'Medium', players: '1-8', xp: '+800', genre: 'Racing' }
    },
    {
        name: 'CALL OF DUTY',
        img: codImg,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-soldier-running-through-a-field-of-smoke-4351-large.mp4',
        description: 'The ultimate tactical shooter experience. Deploy, engage, and dominate.',
        stats: { difficulty: 'Extreme', players: '1-150', xp: '+2000', genre: 'Tactical Shooter' }
    },
    {
        name: 'BATMAN',
        img: batmobileImg,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-playing-a-video-game-with-a-controller-4032-large.mp4',
        description: 'Become the Dark Knight and protect Gotham from the shadows.',
        stats: { difficulty: 'Hard', players: '1', xp: '+1500', genre: 'Action Adventure' }
    },
    {
        name: 'FORTNITE',
        img: fortniteImg,
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-player-kicking-the-ball-in-the-stadium-4354-large.mp4',
        description: 'Battle, build, and create in the world\'s most popular battle royale.',
        stats: { difficulty: 'Medium', players: '1-100', xp: '+1200', genre: 'Battle Royale' }
    }
];

export default function GameVideoShowcase() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGlitching, setIsGlitching] = useState(false);
    const navigate = useNavigate();
    const carouselRef = useRef<HTMLDivElement>(null);

    const triggerGlitch = useCallback(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
    }, []);

    const nextSlide = useCallback(() => {
        triggerGlitch();
        setCurrentIndex((prev) => (prev + 1) % showcaseGames.length);
    }, [triggerGlitch]);

    const prevSlide = () => {
        triggerGlitch();
        setCurrentIndex((prev) => (prev - 1 + showcaseGames.length) % showcaseGames.length);
    };

    const handleSelect = (index: number) => {
        if (index === currentIndex) return;
        triggerGlitch();
        setCurrentIndex(index);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative h-auto md:h-[750px] w-full overflow-hidden bg-black">
            {/* DYNAMIC BACKGROUND LAYER */}
            <div className="absolute inset-0 z-0">
                {showcaseGames.map((game, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out will-change-opacity ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                        <img
                            src={game.img}
                            alt={`${game.name} Background`}
                            className="w-full h-full object-cover opacity-40 scale-105 grayscale-[0.3] brightness-75"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="w-full sm:container mx-auto px-0 sm:px-4 h-full relative z-20 flex flex-col justify-between py-8 md:py-12">

                <div className="flex flex-col md:flex-row items-center gap-12 mt-2 md:mt-4">
                    {/* LEFT: MISSION DATA */}
                    <div className="w-full md:w-1/2 space-y-6 md:space-y-10 px-4 sm:px-0">
                        <div className={`space-y-4 transition-all duration-300 ${isGlitching ? 'skew-x-12 opacity-50' : ''}`}>
                            <div className="flex items-center gap-4">
                                <div className="h-px w-12 bg-red-600" />
                                <span className="text-xs font-black text-red-600 uppercase tracking-[0.5em]">MISSION_BRIEFING</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none">
                                {showcaseGames[currentIndex].name}
                            </h2>
                            <p className="text-base md:text-lg text-zinc-500 font-medium uppercase tracking-[0.2em] leading-relaxed max-w-xl border-l-2 border-red-600/50 pl-6">
                                {showcaseGames[currentIndex].description}
                            </p>
                        </div>

                        {/* TACTICAL STATS */}
                        <div className="grid grid-cols-2 gap-4 max-w-md">
                            <div className="bg-zinc-900/60 border border-white/5 p-4 backdrop-blur-md group hover:border-red-600/50 transition-colors">
                                <span className="text-[8px] font-black text-red-600 uppercase tracking-widest block mb-1">XP_REWARD</span>
                                <p className="text-sm font-black text-white uppercase">{showcaseGames[currentIndex].stats.xp}</p>
                            </div>
                            <div className="bg-zinc-900/60 border border-white/5 p-4 backdrop-blur-md group hover:border-red-600/50 transition-colors">
                                <span className="text-[8px] font-black text-red-600 uppercase tracking-widest block mb-1">DIFFICULTY</span>
                                <p className="text-sm font-black text-white uppercase">{showcaseGames[currentIndex].stats.difficulty}</p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                onClick={() => navigate('/arcade')}
                                className="bg-red-600 hover:bg-red-700 text-white px-10 md:px-12 py-5 md:py-6 rounded-none font-black tracking-[0.3em] shadow-[0_0_50px_rgba(220,38,38,0.4)] hover:shadow-[0_0_80px_rgba(220,38,38,0.6)] transition-all transform hover:scale-110 active:scale-95 uppercase group relative overflow-hidden"
                            >
                                <Play className="mr-4 h-6 w-6 md:h-8 md:w-8 fill-current" />
                                Book Now to play
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT: POP-UP VIDEO MONITOR */}
                    <div className="w-full md:w-1/2 relative flex items-center justify-center">
                        <div className={`relative w-full max-w-2xl aspect-video transition-all duration-300 ${isGlitching ? 'scale-105 opacity-80' : 'scale-100 opacity-100'}`}>
                            {/* HUD DECORATIONS */}
                            <div className="absolute -inset-4 border border-red-600/20 z-0 animate-pulse" />
                            <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-red-600 z-30" />
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-red-600 z-30" />

                            {/* MAIN VIDEO FRAME */}
                            <div
                                className="relative w-full h-full overflow-hidden border-2 border-white/10 shadow-[0_0_100px_rgba(220,38,38,0.2)]"
                                style={{ clipPath: 'polygon(0 0, 95% 0, 100% 10%, 100% 100%, 5% 100%, 0 90%)' }}
                            >
                                <video
                                    key={showcaseGames[currentIndex].videoUrl}
                                    src={showcaseGames[currentIndex].videoUrl}
                                    poster={showcaseGames[currentIndex].img}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    className="w-full h-full object-cover scale-110"
                                    title={`${showcaseGames[currentIndex].name} Gameplay Preview`}
                                />

                                {/* SCANLINE OVERLAY */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(220,38,38,0.05)_50%,transparent_100%)] bg-[length:100%_10px] animate-scanline pointer-events-none opacity-50" />

                                {/* STATUS OVERLAY */}
                                <div className="absolute top-6 left-6 z-30">
                                    <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 border border-white/10">
                                        <div className="h-2 w-2 bg-red-600 rounded-full animate-ping" />
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">LIVE_FEED_0{currentIndex + 1}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM: SLIDING VIDEO CAROUSEL */}
                <div className="w-full relative pb-10">
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">SELECT_MISSION_DATA</span>
                        <div className="flex gap-4">
                            <button
                                onClick={prevSlide}
                                aria-label="Previous mission"
                                className="p-2 border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next mission"
                                className="p-2 border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={carouselRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2"
                    >
                        {showcaseGames.map((game, index) => {
                            const isActive = index === currentIndex;
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleSelect(index)}
                                    className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 group
                                        ${isActive
                                            ? 'w-60 h-34 scale-105 z-10'
                                            : 'w-48 h-28 opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <div
                                        className={`absolute inset-0 border-2 transition-all duration-300 overflow-hidden
                                            ${isActive ? 'border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.6)]' : 'border-white/20 hover:border-white/40'}`}
                                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 85% 100%, 0 100%)' }}
                                    >
                                        <video
                                            src={game.videoUrl}
                                            poster={game.img}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            title={`${game.name} Thumbnail Preview`}
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity ${isActive ? 'opacity-60' : 'opacity-40'}`} />

                                        <div className="absolute bottom-4 left-4 right-4">
                                            <p className={`font-black uppercase tracking-tighter transition-all duration-300 ${isActive ? 'text-2xl text-white drop-shadow-md' : 'text-base text-white/90 drop-shadow-md'}`}>
                                                {game.name}
                                            </p>
                                            {isActive && (
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="h-1.5 w-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#dc2626]" />
                                                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">ACTIVE_DATA</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* SIDE DECORATIONS */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-20 pointer-events-none hidden lg:flex">
                <Monitor className="w-6 h-6 text-red-600" />
                <Cpu className="w-6 h-6 text-red-600" />
                <Activity className="w-6 h-6 text-red-600" />
                <Shield className="w-6 h-6 text-red-600" />
                <Zap className="w-6 h-6 text-red-600" />
            </div>
        </section>
    );
}
