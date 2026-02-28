import { useState } from 'react';
import { Button } from '../components/ui/button';
import {
    CheckCircle2, Trophy, Shield, Gamepad2,
    ChevronRight, Info, Star, TrendingUp, Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MpesaPaymentModal from '../components/MpesaPaymentModal';
import { toast } from 'sonner';

// Session Packages (Revenue-optimized)
const experiences = [
    {
        id: 'fifa',
        name: 'PS5 FIFA Session',
        icon: Gamepad2,
        color: 'blue',
        minTime: 30,
        available: 3,
        packages: [
            { duration: 30, price: 200, label: 'Quick Match', popular: false },
            { duration: 60, price: 350, label: 'Standard', popular: true, savings: 50 },
            { duration: 90, price: 480, label: 'Extended', popular: false, savings: 120 }
        ]
    },
    {
        id: 'console',
        name: 'Other Console Games',
        icon: Trophy,
        color: 'purple',
        minTime: 30,
        available: 2,
        packages: [
            { duration: 30, price: 200, label: 'Trial', popular: false },
            { duration: 60, price: 350, label: 'Standard', popular: true, savings: 50 },
            { duration: 120, price: 600, label: 'Marathon', popular: false, savings: 200 }
        ]
    },
    {
        id: 'vr',
        name: 'VR Experience',
        icon: Shield,
        color: 'red',
        minTime: 20,
        available: 1,
        packages: [
            { duration: 20, price: 250, label: 'Intro', popular: false },
            { duration: 40, price: 450, label: 'Immersive', popular: true, savings: 50 }
        ]
    }
];

// Station Availability (Smart Grid)
const stations = [
    { id: 'ps5-1', name: 'PS5 Station 1', type: 'fifa', status: 'available', nextAvailable: null },
    { id: 'ps5-2', name: 'PS5 Station 2', type: 'fifa', status: 'booked', nextAvailable: '4:00 PM' },
    { id: 'ps5-3', name: 'PS5 Station 3', type: 'fifa', status: 'available', nextAvailable: null },
    { id: 'ps5-4', name: 'PS5 Station 4', type: 'fifa', status: 'available', nextAvailable: null },
    { id: 'console-1', name: 'Console Station 1', type: 'console', status: 'available', nextAvailable: null },
    { id: 'console-2', name: 'Console Station 2', type: 'console', status: 'booked', nextAvailable: '5:30 PM' },
    { id: 'vr-1', name: 'VR Station', type: 'vr', status: 'available', nextAvailable: null }
];

// Time Slots (9:00 AM - 9:30 PM)
const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM'
];

// Passes & Memberships
const passes = [
    { id: 'daily', name: 'Daily Pass', duration: '2 hours anytime', price: 500, savings: 100, badge: 'Popular' },
    { id: 'weekly', name: 'Weekly Pass', duration: '1 hour per day', price: 1500, savings: 400, badge: 'Best Value' },
    { id: 'weekend', name: 'Weekend Pass', duration: 'Unlimited (time windows)', price: 800, savings: 200, badge: null }
];

interface ArcadePackage {
    duration: number;
    price: number;
    label: string;
    popular: boolean;
    savings?: number;
}

export default function Arcade() {
    const [step, setStep] = useState<'experience' | 'package' | 'time' | 'station'>('experience');
    const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<ArcadePackage | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedStation, setSelectedStation] = useState<string | null>(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const currentExperience = experiences.find(e => e.id === selectedExperience);
    const availableStations = stations.filter(s => s.type === selectedExperience && s.status === 'available');

    const handleExperienceSelect = (id: string) => {
        setSelectedExperience(id);
        setStep('package');
    };

    const handlePackageSelect = (pkg: ArcadePackage) => {
        setSelectedPackage(pkg);
        setStep('time');
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setStep('station');
    };

    const handleStationSelect = (stationId: string) => {
        setSelectedStation(stationId);
    };

    const handleBooking = () => {
        if (!selectedStation || !selectedTime || !selectedPackage) {
            toast.error('Please complete all booking steps');
            return;
        }
        setIsPaymentModalOpen(true);
    };

    const handlePaymentComplete = (transactionId: string) => {
        toast.success(`Booking confirmed! Session Code: ${transactionId}`);
        // Reset
        setStep('experience');
        setSelectedExperience(null);
        setSelectedPackage(null);
        setSelectedTime(null);
        setSelectedStation(null);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-0">
            {/* Hero Section with Dynamic Video Grid Background */}
            <div className="relative h-[85vh] min-h-[600px] overflow-hidden border-b border-zinc-900 pt-16">
                {/* Dynamic Video Grid Background */}
                <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 bg-zinc-950">
                    {[
                        { src: '/src/assets/videos/ps5vid.mp4', label: 'PS5_ARENA', color: 'blue' },
                        { src: '/src/assets/videos/xbox.mp4', label: 'XBOX_ZONE', color: 'green' },
                        { src: '/src/assets/videos/vrgame.mp4', label: 'VR_IMMERSION', color: 'purple' },
                        { src: '/src/assets/videos/carsim.mp4', label: 'SIM_RACING', color: 'red' },
                        { src: '/src/assets/videos/vivi.mp4', label: 'ELITE_GAMING', color: 'amber' },
                        { src: '/src/assets/videos/comeplay.mp4', label: 'COME_PLAY', color: 'cyan' },
                        { src: '/src/assets/videos/FIFATIMEBUD.mp4', label: 'FIFA_TIME', color: 'green' },
                        { src: '/src/assets/videos/playgame.mp4', label: 'PLAY_GAME', color: 'blue' },
                        { src: '/src/assets/videos/vrexperience.mp4', label: 'VR_EXPERIENCE', color: 'purple' },
                        { src: '/src/assets/videos/VRrollercoster.mp4', label: 'VR_COASTER', color: 'red' }
                    ].map((video, index) => (
                        <motion.div
                            key={index}
                            className="relative h-full w-full overflow-hidden group/video"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <video
                                src={video.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-all duration-700 group-hover/video:scale-110 brightness-110"
                            />

                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

                            {/* Scanline effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

                            {/* Video label - appears on hover */}
                            <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover/video:translate-y-0 group-hover/video:opacity-100 transition-all duration-300">
                                <p className="text-[8px] font-black text-red-600 uppercase tracking-[0.3em] mb-1">STATION_{index + 1}</p>
                                <h3 className="text-sm font-black italic text-white uppercase tracking-tighter">{video.label}</h3>
                                <div className="mt-2 h-0.5 w-0 group-hover/video:w-full bg-red-600 transition-all duration-500 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                            </div>

                            {/* Corner brackets */}
                            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-red-600/30 opacity-0 group-hover/video:opacity-100 transition-opacity" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-red-600/30 opacity-0 group-hover/video:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>

                {/* Overlay gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

                {/* Tactical HUD overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_50%,rgba(0,0,0,0.3)_100%)]" />

                    {/* Corner HUD brackets */}
                    <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-red-600/30" />
                    <div className="absolute top-10 right-10 w-24 h-24 border-t-2 border-r-2 border-red-600/30" />
                    <div className="absolute bottom-10 left-10 w-24 h-24 border-b-2 border-l-2 border-red-600/30" />
                    <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-red-600/30" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {/* Live indicator */}
                            <div className="inline-flex items-center gap-3 mb-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-red-600/30">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                                </span>
                                <div className="h-px w-12 bg-red-600" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">BOOK_A_SESSION</span>
                                <div className="h-px w-12 bg-red-600" />
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase leading-tight mb-6 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                                Reserve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">Gaming Station</span>
                            </h1>

                            <p className="text-zinc-300 text-lg md:text-xl font-bold uppercase tracking-widest max-w-3xl mx-auto mb-8 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                                Choose your experience. Pick your time. Pay & Play.
                            </p>

                            {/* Stats bar */}
                            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                                <div className="bg-black/60 backdrop-blur-md px-6 py-3 border border-zinc-800/50">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">STATIONS</p>
                                    <p className="text-2xl font-black text-red-600">7 ACTIVE</p>
                                </div>
                                <div className="bg-black/60 backdrop-blur-md px-6 py-3 border border-zinc-800/50">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">AVAILABLE</p>
                                    <p className="text-2xl font-black text-green-500">5 NOW</p>
                                </div>
                                <div className="bg-black/60 backdrop-blur-md px-6 py-3 border border-zinc-800/50">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">SESSIONS</p>
                                    <p className="text-2xl font-black text-white">26 SLOTS</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Progress Tracker */}
            <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-xl border-b border-zinc-900 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center gap-8">
                        {[
                            { id: 'experience', label: 'EXPERIENCE', active: step === 'experience' || !!selectedExperience },
                            { id: 'package', label: 'PACKAGE', active: step === 'package' || !!selectedPackage },
                            { id: 'time', label: 'TIME', active: step === 'time' || !!selectedTime },
                            { id: 'station', label: 'STATION', active: step === 'station' || !!selectedStation }
                        ].map((s, index) => (
                            <div key={s.id} className="flex items-center gap-4">
                                <div className="flex flex-col items-center gap-2">
                                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm transition-all duration-300 ${s.active ? 'border-red-600 bg-red-600 text-white' : 'border-zinc-700 text-zinc-600'
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${s.active ? 'text-red-600' : 'text-zinc-600'
                                        }`}>
                                        {s.label}
                                    </span>
                                </div>
                                {index < 3 && (
                                    <div className={`h-0.5 w-16 transition-colors ${s.active ? 'bg-red-600' : 'bg-zinc-800'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <AnimatePresence mode="wait">
                    {/* STEP 1: Choose Experience */}
                    {step === 'experience' && (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">
                                    Choose Your <span className="text-red-600">Experience</span>
                                </h2>
                                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
                                    Select the type of gaming session you want
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {experiences.map((exp) => {
                                    const Icon = exp.icon;
                                    return (
                                        <motion.button
                                            key={exp.id}
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleExperienceSelect(exp.id)}
                                            className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-zinc-800 hover:border-red-600 p-8 text-left transition-all duration-300 group"
                                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)' }}
                                        >
                                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-600/20 px-3 py-1 rounded-full border border-green-600/40">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">{exp.available} Available</span>
                                            </div>

                                            <div className="mb-6">
                                                <div className="w-16 h-16 bg-red-600/10 border-2 border-red-600/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                                                    <Icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
                                                </div>
                                                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{exp.name}</h3>
                                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Minimum {exp.minTime} minutes</p>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-zinc-500 font-bold uppercase tracking-wide">Starting from</span>
                                                    <span className="text-2xl font-black text-red-600">KSh {exp.packages[0].price}</span>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-wider">
                                                SELECT <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Passes Section */}
                            <div className="mt-24 pt-16 border-t border-zinc-900">
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center gap-3 mb-4">
                                        <Star className="w-5 h-5 text-amber-500" />
                                        <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase">
                                            Save with <span className="text-amber-500">Passes</span>
                                        </h3>
                                        <Star className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
                                        Prepaid packages for consistent gaming
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {passes.map((pass) => (
                                        <div
                                            key={pass.id}
                                            className="relative bg-zinc-900/50 border-2 border-zinc-800 p-6 hover:border-amber-500/50 transition-all group"
                                        >
                                            {pass.badge && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 px-4 py-1 text-[8px] font-black text-black uppercase tracking-widest">
                                                    {pass.badge}
                                                </div>
                                            )}
                                            <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">{pass.name}</h4>
                                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-wide mb-4">{pass.duration}</p>
                                            <div className="flex items-end gap-2 mb-4">
                                                <span className="text-3xl font-black text-white">KSh {pass.price}</span>
                                                <span className="text-sm font-bold text-green-500 mb-1">Save KSh {pass.savings}</span>
                                            </div>
                                            <Button className="w-full bg-zinc-800 hover:bg-amber-500 hover:text-black text-white font-black uppercase tracking-widest text-xs py-6 rounded-none transition-all">
                                                Purchase Pass
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Choose Package */}
                    {step === 'package' && currentExperience && (
                        <motion.div
                            key="package"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="text-center mb-16">
                                <button
                                    onClick={() => setStep('experience')}
                                    className="text-zinc-500 hover:text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 mx-auto"
                                >
                                    ← Back to Experiences
                                </button>
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">
                                    Choose Your <span className="text-red-600">Package</span>
                                </h2>
                                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
                                    {currentExperience.name} - Select duration
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                {currentExperience.packages.map((pkg) => (
                                    <motion.button
                                        key={pkg.duration}
                                        whileHover={{ scale: 1.05, y: -8 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handlePackageSelect(pkg)}
                                        className={`relative bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 p-8 text-center transition-all duration-300 ${pkg.popular ? 'border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.3)]' : 'border-zinc-800 hover:border-red-600/50'
                                            }`}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 px-4 py-1 text-[8px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                <Crown className="w-3 h-3" /> Most Popular
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <div className="text-5xl font-black text-white mb-2">{pkg.duration}</div>
                                            <div className="text-xs font-black text-zinc-500 uppercase tracking-widest">Minutes</div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="text-3xl font-black text-red-600 mb-2">KSh {pkg.price}</div>
                                            {pkg.savings && (
                                                <div className="text-sm font-bold text-green-500">Save KSh {pkg.savings}</div>
                                            )}
                                        </div>

                                        <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">{pkg.label}</div>

                                        <div className="flex items-center justify-center gap-2 text-red-600 font-black text-xs uppercase tracking-wider">
                                            SELECT <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Upsell Suggestion */}
                            <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-900/20 to-transparent border-l-4 border-amber-500 p-6">
                                <div className="flex items-start gap-4">
                                    <TrendingUp className="w-6 h-6 text-amber-500 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-2">Pro Tip</h4>
                                        <p className="text-zinc-400 text-xs font-medium">
                                            Extend to 60 minutes and save KSh 50! Longer sessions = better value.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Choose Time */}
                    {step === 'time' && selectedPackage && (
                        <motion.div
                            key="time"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="text-center mb-16">
                                <button
                                    onClick={() => setStep('package')}
                                    className="text-zinc-500 hover:text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 mx-auto"
                                >
                                    ← Back to Packages
                                </button>
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">
                                    Choose Your <span className="text-red-600">Time</span>
                                </h2>
                                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
                                    {selectedPackage.duration} minutes session
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className={`py-6 border-2 font-black text-sm uppercase tracking-widest transition-all ${selectedTime === time
                                            ? 'bg-red-600 border-red-600 text-white'
                                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-red-600/50 hover:text-white'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: Choose Station */}
                    {step === 'station' && selectedTime && (
                        <motion.div
                            key="station"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-12"
                        >
                            <div className="text-center mb-16">
                                <button
                                    onClick={() => setStep('time')}
                                    className="text-zinc-500 hover:text-white font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 mx-auto"
                                >
                                    ← Back to Time Selection
                                </button>
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">
                                    Choose Your <span className="text-red-600">Station</span>
                                </h2>
                                <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
                                    Available stations for {selectedTime}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {availableStations.map((station) => (
                                    <button
                                        key={station.id}
                                        onClick={() => handleStationSelect(station.id)}
                                        className={`p-6 border-2 text-left transition-all ${selectedStation === station.id
                                            ? 'bg-red-600/10 border-red-600'
                                            : 'bg-zinc-900 border-zinc-800 hover:border-red-600/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-black uppercase tracking-tight text-white">{station.name}</h3>
                                            {selectedStation === station.id && (
                                                <CheckCircle2 className="w-6 h-6 text-red-600" />
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs font-black text-green-500 uppercase tracking-widest">Available Now</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {selectedStation && (
                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-zinc-900 border-2 border-red-600 p-8 mb-6">
                                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-6 flex items-center gap-3">
                                            <Info className="w-5 h-5 text-red-600" /> Booking Summary
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-zinc-500 font-bold uppercase text-sm">Experience</span>
                                                <span className="text-white font-black uppercase text-sm">{currentExperience?.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-zinc-500 font-bold uppercase text-sm">Duration</span>
                                                <span className="text-white font-black uppercase text-sm">{selectedPackage?.duration} min</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-zinc-500 font-bold uppercase text-sm">Time</span>
                                                <span className="text-white font-black uppercase text-sm">{selectedTime}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-zinc-500 font-bold uppercase text-sm">Station</span>
                                                <span className="text-white font-black uppercase text-sm">{stations.find(s => s.id === selectedStation)?.name}</span>
                                            </div>
                                            <div className="pt-4 border-t border-zinc-800 flex justify-between items-end">
                                                <span className="text-zinc-500 font-bold uppercase text-sm">Total</span>
                                                <span className="text-3xl font-black text-red-600">KSh {selectedPackage?.price}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleBooking}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-black uppercase tracking-widest py-8 rounded-none shadow-[0_0_40px_rgba(220,38,38,0.3)]"
                                    >
                                        <span className="flex items-center gap-3">
                                            Pay & Confirm <ChevronRight className="w-6 h-6" />
                                        </span>
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* M-Pesa Payment Modal */}
            <MpesaPaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                amount={selectedPackage?.price || 0}
                orderId={`SESSION-${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
                customerName="Gamer"
                customerPhone=""
                onPaymentComplete={handlePaymentComplete}
            />
        </div>
    );
}
