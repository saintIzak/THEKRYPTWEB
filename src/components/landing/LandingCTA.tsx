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

        </>
    );
}
