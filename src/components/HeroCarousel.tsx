import { useState, useEffect } from 'react';
import mortalCombatImg from '../assets/images/mortalcombat.jpg';
import raceMeImg from '../assets/images/raceme.jpg';
import blackOpsImg from '../assets/images/blackops.jpg';
import f1Img from '../assets/images/f1typeshii.jpg';

const slides = [
    {
        image: mortalCombatImg
    },
    {
        image: raceMeImg
    },
    {
        image: blackOpsImg
    },
    {
        image: f1Img
    }
];

export default function HeroCarousel() {
    const [currentIndex, setCurrentIndex] = useState(slides.length);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    const displaySlides = [...slides, ...slides, ...slides];

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (currentIndex >= slides.length * 2) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(slides.length);
            }, 400);
            return () => clearTimeout(timer);
        }
        if (currentIndex < slides.length) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(slides.length * 2 - 1);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [currentIndex]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Masked Image & Shadow Layer */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    maskImage: windowWidth < 768
                        ? 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                        : 'linear-gradient(to right, black 80%, transparent 100%)',
                    WebkitMaskImage: windowWidth < 768
                        ? 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                        : 'linear-gradient(to right, black 80%, transparent 100%)'
                }}
            >
                {/* Slides Container */}
                <div
                    className="flex h-full"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        transition: isTransitioning ? 'transform 400ms ease-out' : 'none'
                    }}
                >
                    {displaySlides.map((slide, index) => (
                        <div key={index} className="min-w-full h-full relative">
                            <img
                                src={slide.image}
                                alt={`Gaming Slide ${index % slides.length + 1}`}
                                className="w-full h-full object-cover opacity-100 brightness-110"
                                loading={index >= slides.length && index < slides.length * 2 ? "eager" : "lazy"}
                            />
                            {/* Overlay Gradients */}
                            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />
                        </div>
                    ))}
                </div>

                {/* Cave Effect Overlays */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-24 md:h-40 bg-gradient-to-b from-black via-black/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-24 md:h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    <div className="absolute inset-0 shadow-[inset_20px_0_60px_rgba(0,0,0,0.9)] md:shadow-[inset_50px_0_150px_rgba(0,0,0,0.9)] mix-blend-multiply" />

                    {/* Shattered Glass Shards */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Shard 1 - Top Left */}
                        <div className="absolute top-[-5%] left-[-5%] w-40 h-64 glass-shard rotate-[15deg] animate-glass-shiver opacity-40"
                            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 0% 80%)' }} />

                        {/* Shard 2 - Bottom Left */}
                        <div className="absolute bottom-[-10%] left-[-2%] w-56 h-48 glass-shard rotate-[-10deg] animate-glass-float opacity-30"
                            style={{ clipPath: 'polygon(20% 0%, 100% 20%, 80% 100%, 0% 100%)' }} />

                        {/* Shard 3 - Top Right Edge of Cave */}
                        <div className="absolute top-[10%] left-[15%] w-32 h-32 glass-shard rotate-[45deg] animate-glass-shiver opacity-20"
                            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />

                        {/* Shard 4 - Bottom Right Edge of Cave */}
                        <div className="absolute bottom-[15%] left-[18%] w-24 h-40 glass-shard rotate-[160deg] animate-glass-float opacity-25"
                            style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }} />

                        {/* Shard 5 - Center Left Edge */}
                        <div className="absolute top-[40%] left-[-5%] w-48 h-24 glass-shard rotate-[5deg] animate-glass-shiver opacity-35"
                            style={{ clipPath: 'polygon(0% 20%, 100% 0%, 90% 100%, 10% 80%)' }} />

                        {/* Crack Lines */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                            <div className="absolute top-[20%] left-0 w-64 h-[1px] bg-white rotate-[15deg] blur-[1px]" />
                            <div className="absolute bottom-[30%] left-0 w-80 h-[1px] bg-white rotate-[-10deg] blur-[1px]" />
                            <div className="absolute top-[50%] left-[10%] w-40 h-[1px] bg-white rotate-[80deg] blur-[1px]" />
                        </div>

                        {/* Black Shutter Elements */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-[30%] left-[-10%] w-64 h-32 bg-black/40 rotate-[-20deg] blur-2xl animate-pulse" />
                            <div className="absolute bottom-[20%] left-[5%] w-48 h-48 bg-black/60 rotate-[15deg] blur-3xl animate-pulse-slow" />
                            <div className="absolute top-[10%] left-[20%] w-32 h-64 bg-black/30 rotate-[45deg] blur-2xl animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-12 right-24 flex gap-2 z-50">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        role="progressbar"
                        aria-valuenow={index === (currentIndex % slides.length) ? 100 : 0}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Slide ${index + 1} of ${slides.length}`}
                        className={`h-1.5 rounded-full transition-all duration-300 shadow-lg ${index === (currentIndex % slides.length) ? 'w-8 bg-red-600' : 'w-2 bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
