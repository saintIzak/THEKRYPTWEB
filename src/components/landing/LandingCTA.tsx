import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Clock, Instagram, Twitter, Facebook } from 'lucide-react';

export default function LandingCTA() {
    return (
        <>
            {/* CTA strip */}
            <section className="relative py-24 overflow-hidden bg-red-600">
                {/* Grain */}
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: '200px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-red-700" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                    >
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-100/70 mb-5">Nairobi's Elite Gaming Hub</p>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter text-white leading-[0.95] mb-6">
                            Explore & Experience<br />The Krypt
                        </h2>
                        <p className="text-red-100/70 text-base max-w-lg mx-auto mb-10 leading-relaxed">
                            Book a gaming session, gear up in The Vault, or join the community. One destination, every gaming need.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/arcade"
                                className="group bg-white text-red-600 font-black text-sm uppercase tracking-widest px-10 py-4 flex items-center gap-3 hover:bg-red-50 transition-colors"
                            >
                                Book a Session
                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/shop"
                                className="group border-2 border-white/30 text-white font-black text-sm uppercase tracking-widest px-10 py-4 flex items-center gap-3 hover:border-white/60 hover:bg-white/10 transition-all"
                            >
                                Enter the Shop
                                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Site footer */}
            <footer className="bg-zinc-950 border-t border-zinc-800/60">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
                        {/* Brand */}
                        <div className="lg:col-span-1">
                            <h3 className="text-2xl font-black italic tracking-tighter text-white mb-2">
                                THE <span className="text-red-500">KRYPT</span>
                            </h3>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-5">Elite Gaming Hub · Nairobi</p>
                            <p className="text-sm text-zinc-500 leading-relaxed mb-6">
                                Gaming sessions, premium gear, and a community of dedicated players. All under one roof in Maiyan Mall.
                            </p>
                            <div className="flex items-center gap-4">
                                {[
                                    { icon: Instagram, href: '#', label: 'Instagram' },
                                    { icon: Twitter, href: '#', label: 'Twitter / X' },
                                    { icon: Facebook, href: '#', label: 'Facebook' },
                                ].map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="h-9 w-9 flex items-center justify-center border border-zinc-800 hover:border-red-500/50 hover:bg-red-600/10 text-zinc-500 hover:text-white transition-all"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-5">Navigate</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: 'The Arena (Play)', to: '/arcade' },
                                    { label: 'The Vault (Shop)', to: '/shop' },
                                    { label: 'Community', to: '/leaderboard' },
                                    { label: 'The HQ', to: '/hq' },
                                    { label: 'Quest Log', to: '/quest-log' },
                                    { label: 'About Us', to: '/about' },
                                ].map(({ label, to }) => (
                                    <li key={to}>
                                        <Link to={to} className="text-sm text-zinc-500 hover:text-white transition-colors font-medium">
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Sessions */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-5">Sessions</h4>
                            <ul className="space-y-3">
                                {[
                                    'PS5 Gaming — KSh 200/30min',
                                    'Xbox Gaming — KSh 200/30min',
                                    'VR Experience — KSh 250/20min',
                                    'Daily Pass — KSh 500',
                                    'Weekly Pass — KSh 1,500',
                                    'Tournament Entry',
                                ].map(item => (
                                    <li key={item} className="text-sm text-zinc-600 font-medium">{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Location & Hours */}
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-5">Find Us</h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 text-sm text-zinc-500">
                                    <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-bold mb-0.5">Maiyan Mall, Nairobi</p>
                                        <p>Ground Floor, Shop B7</p>
                                        <p>Westlands, Nairobi 00100</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-zinc-500">
                                    <Clock className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-white font-bold mb-0.5">Opening Hours</p>
                                        <p>Mon – Fri: 9:00am – 9:30pm</p>
                                        <p>Sat – Sun: 8:00am – 10:00pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-[11px] text-zinc-700 font-bold uppercase tracking-widest">
                            © {new Date().getFullYear()} The Krypt. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(item => (
                                <Link key={item} to="#" className="text-[11px] text-zinc-700 hover:text-zinc-400 font-bold uppercase tracking-wider transition-colors">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
