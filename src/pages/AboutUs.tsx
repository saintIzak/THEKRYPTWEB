import { motion } from 'framer-motion';
import { Zap, Shield, Users, Target, MapPin, Mail, Phone, Clock } from 'lucide-react';
import redGridBg from '../assets/images/red-grid-bg.png';
import arcadeImg from '../assets/images/nairobi_gaming_arcade_maiyan_mall.png';

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src={redGridBg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-4">
                            <div className="h-px w-12 bg-red-600" />
                            <span className="text-xs font-black text-red-600 uppercase tracking-[0.5em]">ABOUT_US</span>
                            <div className="h-px w-12 bg-red-600" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-tight">
                            WELCOME TO <span className="text-red-600">THE KRYPT</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto">
                            Nairobi's premier gaming destination where passion meets performance
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="relative py-24 bg-black overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <img src={redGridBg} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="inline-flex items-center gap-4">
                            <div className="h-px w-12 bg-red-600" />
                            <span className="text-xs font-black text-red-600 uppercase tracking-[0.5em]">OUR_MISSION</span>
                            <div className="h-px w-12 bg-red-600" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-tight">
                            GAMING SHOULDN'T BE A <span className="text-red-600">LUXURY</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-zinc-400 font-medium uppercase tracking-widest leading-relaxed border-l-4 border-red-600 pl-8 text-left">
                            We founded <span className="text-white">THE KRYPT</span> to break the barrier of high costs in Kenya.
                            By offering affordable, high-performance hardware and a world-class physical space at Maiyan Mall,
                            we are building the future of Kenyan Esports.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
                            {[
                                { label: 'AFFORDABLE', icon: Zap },
                                { label: 'PRO-GRADE', icon: Shield },
                                { label: 'COMMUNITY', icon: Users },
                                { label: 'ELITE OPS', icon: Target }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center gap-3 group"
                                >
                                    <div className="p-4 bg-red-600/10 border border-red-600/20 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                                        <item.icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-red-600 transition-colors">{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 bg-zinc-950 border-y border-zinc-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-3">
                                <div className="h-px w-8 bg-red-600" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">OUR_STORY</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase">
                                BUILT BY GAMERS, <span className="text-red-600">FOR GAMERS</span>
                            </h2>
                            <div className="space-y-4 text-zinc-400 font-medium leading-relaxed">
                                <p>
                                    The Krypt was born from a simple observation: gaming in Kenya was expensive, inaccessible, and lacked the community spirit that makes gaming truly special.
                                </p>
                                <p>
                                    We set out to change that. Located in the heart of Maiyan Mall, Nairobi, we've created a space where gamers of all levels can access high-end gaming hardware, compete in tournaments, and connect with like-minded individuals.
                                </p>
                                <p>
                                    Our mission goes beyond just providing gaming stations. We're building Kenya's esports ecosystem, one player at a time.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-video overflow-hidden border-2 border-zinc-800 group"
                            style={{ clipPath: 'polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)' }}
                        >
                            <img
                                src={arcadeImg}
                                alt="The Krypt Gaming Arena"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Location & Contact Section */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-4 mb-4">
                                <div className="h-px w-12 bg-red-600" />
                                <span className="text-xs font-black text-red-600 uppercase tracking-[0.5em]">FIND_US</span>
                                <div className="h-px w-12 bg-red-600" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase">
                                VISIT <span className="text-red-600">THE KRYPT</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-zinc-900/50 border border-zinc-800 p-8 space-y-6 hover:border-red-600/50 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-red-600/10 border border-red-600/20">
                                        <MapPin className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">LOCATION</h3>
                                        <p className="text-zinc-400 text-sm font-medium">
                                            Maiyan Mall<br />
                                            Nairobi, Kenya
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-red-600/10 border border-red-600/20">
                                        <Clock className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">HOURS</h3>
                                        <p className="text-zinc-400 text-sm font-medium">
                                            Mon - Sun: 10:00 AM - 10:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 p-8 space-y-6 hover:border-red-600/50 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-red-600/10 border border-red-600/20">
                                        <Phone className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">PHONE</h3>
                                        <p className="text-zinc-400 text-sm font-medium">
                                            +254 XXX XXX XXX
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-red-600/10 border border-red-600/20">
                                        <Mail className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">EMAIL</h3>
                                        <p className="text-zinc-400 text-sm font-medium">
                                            info@thekrypt.ke
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
