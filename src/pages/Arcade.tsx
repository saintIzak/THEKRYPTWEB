import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import comeplayVid from '../assets/videos/comeplay.mp4';
import ps5Vid from '../assets/videos/ps5vid.mp4';
import vrGamesVid from '../assets/videos/vrgames.mp4';
import xboxVid from '../assets/videos/xbox.mp4';
import ps5ProductsVid from '../assets/videos/ps5products.mp4';
import carSimVid from '../assets/videos/carsim.mp4';

import {
    STATION_CATEGORIES,
    ARCADE_GAMES,
    StationType,
    PRICING_RULES
} from '../data/bookingMockData';

// Lazy loaded components for faster initial page load
const StationSelector = lazy(() => import('../components/booking/StationSelector'));
const GameGrid = lazy(() => import('../components/booking/GameGrid'));
const SchedulePicker = lazy(() => import('../components/booking/SchedulePicker'));
const DurationPicker = lazy(() => import('../components/booking/DurationPicker'));
const BookingSummary = lazy(() => import('../components/booking/BookingSummary'));
const MpesaPaymentModal = lazy(() => import('../components/MpesaPaymentModal'));

const HERO_VIDEOS = [
    comeplayVid,
    ps5Vid,
    vrGamesVid,
    xboxVid,
    ps5ProductsVid,
    carSimVid
];

export default function PlayPage() {
    // State management
    const [selectedCategoryId, setSelectedCategoryId] = useState<StationType | null>(null);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [durationMinutes, setDurationMinutes] = useState<number>(30);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // Performance: Manage video loading prioritization
    const [videosLoaded, setVideosLoaded] = useState(false);

    // Derived State
    const activeCategory = useMemo(() =>
        STATION_CATEGORIES.find(c => c.id === selectedCategoryId) || null,
        [selectedCategoryId]);

    const activeSlot = useMemo(() =>
        activeCategory?.slots?.find(s => s.id === selectedSlotId) || null,
        [activeCategory, selectedSlotId]);

    const activeGame = useMemo(() =>
        ARCADE_GAMES.find(g => g.id === selectedGameId) || null,
        [selectedGameId]);

    const minDuration = selectedCategoryId === 'vr' ? 20 : 30;

    // Effects
    useEffect(() => {
        // Enforce minimum duration when station changes
        if (durationMinutes < minDuration) {
            setDurationMinutes(minDuration);
        }
    }, [minDuration, durationMinutes]);

    useEffect(() => {
        // Deselect game if no longer supported by selected station
        if (activeGame && selectedCategoryId && !activeGame.supportedStations.includes(selectedCategoryId)) {
            setSelectedGameId(null);
        }
    }, [selectedCategoryId, activeGame]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Simple optimization to sequence heavy renderings
        const timer = setTimeout(() => {
            setVideosLoaded(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const isBookingAllowed = Boolean(
        activeSlot && activeGame && selectedDate && selectedTime && durationMinutes >= minDuration
    );

    const handleReset = () => {
        setSelectedCategoryId(null);
        setSelectedSlotId(null);
        setSelectedGameId(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setDurationMinutes(30);
    };

    const handleBook = () => {
        if (!isBookingAllowed) {
            toast.error('Please complete all booking steps.');
            return;
        }
        setIsPaymentModalOpen(true);
    };

    const handlePaymentComplete = (txId: string) => {
        toast.success(`Booking Confirmed! Session ID: ${txId}`, {
            duration: 5000,
            icon: '🔥'
        });
        handleReset();
    };

    // Generic loading fallback for suspense
    const SkeletonCard = () => (
        <div className="w-full h-48 bg-white/5 animate-pulse rounded-2xl border border-white/5"></div>
    );

    return (
        <div className="min-h-screen bg-[#111118] text-white pt-16 font-sans selection:bg-[#ff0055] selection:text-white">
            {/* Page Header */}
            <div className="relative border-b border-white/10 overflow-hidden h-[60vh] min-h-[500px] flex items-end bg-[#0b0b0f]">
                {/* 6 Vertical Video Sections Background */}
                <div className="absolute inset-0 z-0 flex w-full h-full transition-opacity duration-700" style={{ opacity: videosLoaded ? 1 : 0 }}>
                    {HERO_VIDEOS.map((videoSrc, idx) => (
                        <div key={idx} className="flex-1 h-full relative border-r border-white/10 last:border-r-0 overflow-hidden group">
                            {/* Gradient Overlay for bottom blending with the next section */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#111118] via-[#111118]/60 to-transparent z-10 pointer-events-none" />
                            {/* Top dark gradient to ensure text readability if needed */}
                            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#111118]/80 to-transparent z-10 pointer-events-none" />

                            {/* Very subtle Base Overlay to keep things professional, brightens completely on hover */}
                            <div className="absolute inset-0 bg-[#111118]/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

                            {/* Video Element - lazy loaded */}
                            {videosLoaded && (
                                <video
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 brightness-110 saturate-110"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    disablePictureInPicture
                                    disableRemotePlayback
                                    preload="metadata"
                                    src={videoSrc}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Loading State for Hero */}
                {!videosLoaded && (
                    <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="w-10 h-10 border-4 border-[#ff0055] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#ff0055]"></div>
                    </div>
                )}

                {/* Overall Backdrop Blur for readability - reduced for clarity */}
                <div className="absolute inset-0 bg-[#111118]/10 z-0 pointer-events-none" />

                {/* Glowing Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#ff0055]/30 rounded-full blur-[140px] mix-blend-screen pointer-events-none z-0" />

                <div className="container mx-auto max-w-7xl relative z-20 pb-16 px-4 pointer-events-none">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
                        <div className="inline-flex items-center gap-3 mb-6 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            <div className="h-px w-6 bg-[#ff0055]" />
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#ff0055] drop-shadow-[0_0_10px_rgba(255,0,85,0.8)]">Dashboard</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                            BOOK YOUR<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0055] via-[#ff3377] to-[#8b5cf6] drop-shadow-[0_0_20px_rgba(255,0,85,0.5)]">SESSION</span>
                        </h1>
                        <p className="text-white/95 font-medium tracking-wide text-base md:text-lg max-w-xl pl-5 border-l-2 border-[#8b5cf6] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] bg-black/10 backdrop-blur-sm py-2 rounded-r-lg">
                            Choose your game, pick a date and time, and enter <strong className="text-white font-black">THE ARENA</strong>.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Layout */}
            <div className="container mx-auto max-w-7xl px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* LEFT COLUMN: Sticky Dashboard / Summary */}
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        <Suspense fallback={<SkeletonCard />}>
                            <BookingSummary
                                station={activeCategory}
                                slot={activeSlot}
                                game={activeGame}
                                date={selectedDate}
                                time={selectedTime}
                                duration={durationMinutes}
                                onBook={handleBook}
                                onReset={handleReset}
                                isBookingAllowed={isBookingAllowed}
                            />
                        </Suspense>
                    </div>

                    {/* RIGHT COLUMN: Booking Flow Grid */}
                    <div className="lg:col-span-8 space-y-10">

                        <Suspense fallback={<SkeletonCard />}>
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                                <div className="bg-[#1a1a24]/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl">
                                    <GameGrid
                                        games={ARCADE_GAMES}
                                        selectedStation={selectedCategoryId}
                                        selectedGame={selectedGameId}
                                        onSelectGame={setSelectedGameId}
                                    />
                                </div>
                            </motion.div>
                        </Suspense>

                        <Suspense fallback={<SkeletonCard />}>
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                <div className="bg-[#1a1a24]/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl">
                                    <StationSelector
                                        categories={STATION_CATEGORIES}
                                        selectedCategory={selectedCategoryId}
                                        onSelectCategory={setSelectedCategoryId}
                                        selectedSlot={selectedSlotId}
                                        onSelectSlot={setSelectedSlotId}
                                    />
                                </div>
                            </motion.div>
                        </Suspense>

                        <Suspense fallback={<SkeletonCard />}>
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                                <div className="bg-[#1a1a24]/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl">
                                    <SchedulePicker
                                        selectedDate={selectedDate}
                                        onSelectDate={setSelectedDate}
                                        selectedTime={selectedTime}
                                        onSelectTime={setSelectedTime}
                                    />
                                </div>
                            </motion.div>
                        </Suspense>

                        <Suspense fallback={<SkeletonCard />}>
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                                <div className="bg-[#1a1a24]/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl">
                                    <DurationPicker
                                        durationMinutes={durationMinutes}
                                        onChange={setDurationMinutes}
                                        minDuration={minDuration}
                                    />
                                </div>
                            </motion.div>
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <Suspense fallback={null}>
                {activeGame && (
                    <MpesaPaymentModal
                        isOpen={isPaymentModalOpen}
                        onClose={() => setIsPaymentModalOpen(false)}
                        amount={Math.ceil(PRICING_RULES[activeGame.pricingRule].ratePerMin * durationMinutes)}
                        orderId={`SESSION-${Math.random().toString(36).substring(2, 9).toUpperCase()}`}
                        customerName="Gamer"
                        customerPhone=""
                        onPaymentComplete={handlePaymentComplete}
                    />
                )}
            </Suspense>
        </div>
    );
}
