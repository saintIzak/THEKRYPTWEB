import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ps5Img from '../../assets/images/PS5.jpg';
import fifaImg from '../../assets/images/fifa-bg.png';
import codImg from '../../assets/images/callofceeeee.jpg';
import racingImg from '../../assets/images/cardriving.jpg';
import mortalImg from '../../assets/images/mortalcombat.jpg';
import vrImg from '../../assets/images/VRmodel.jpg';
import fortniteImg from '../../assets/images/fortnite.jpg';
import gta5Img from '../../assets/images/gta5-bg.png';

type Filter = 'All' | 'FIFA' | 'Racing' | 'Fighting' | 'VR' | 'Action';

const games = [
    { name: 'FIFA 25', category: 'FIFA', img: fifaImg, price: 200, per: '30 min', badge: 'Trending' },
    { name: 'Call of Duty', category: 'Action', img: codImg, price: 200, per: '30 min' },
    { name: 'Sim Racing', category: 'Racing', img: racingImg, price: 200, per: '30 min' },
    { name: 'Mortal Kombat', category: 'Fighting', img: mortalImg, price: 200, per: '30 min' },
    { name: 'VR Experience', category: 'VR', img: vrImg, price: 250, per: '20 min', badge: 'Premium' },
    { name: 'Fortnite', category: 'Action', img: fortniteImg, price: 200, per: '30 min' },
    { name: 'GTA V', category: 'Action', img: gta5Img, price: 200, per: '30 min', badge: 'Popular' },
    { name: 'PS5 Station', category: 'Action', img: ps5Img, price: 200, per: '30 min' },
];

const filters: Filter[] = ['All', 'FIFA', 'Racing', 'Fighting', 'VR', 'Action'];

const cardVariants = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
};

export default function GamesGrid() {
    const [active, setActive] = useState<Filter>('All');
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const visible = active === 'All' ? games : games.filter(g => g.category === active);

    return (
        <section ref={ref} id="games" className="py-28 bg-black relative overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
                >
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-3">Games Grid</p>
                        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none">
                            Pick your <span className="text-red-500">weapon</span>
                        </h2>
                    </div>
                    {/* Filter chips */}
                    <div className="flex flex-wrap gap-2">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setActive(f)}
                                className={`px-4 py-2 text-[11px] font-black uppercase tracking-widest border transition-all duration-200
                                    ${active === f
                                        ? 'bg-red-600 border-red-600 text-white'
                                        : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence mode="popLayout">
                        {visible.map((game) => (
                            <motion.div
                                key={game.name}
                                layout
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="group relative overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-colors duration-300 cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative aspect-[5/4] overflow-hidden">
                                    <img
                                        src={game.img}
                                        alt={game.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                    {game.badge && (
                                        <div className="absolute top-3 left-3 bg-red-600 px-2.5 py-1 text-[9px] font-black text-white uppercase tracking-widest">
                                            {game.badge}
                                        </div>
                                    )}

                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-[9px] font-bold text-white/50 uppercase tracking-wider mb-0.5">{game.category}</p>
                                        <h3 className="text-sm font-black text-white leading-none">{game.name}</h3>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-3 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">From</p>
                                        <p className="text-sm font-black text-white">KSh {game.price}<span className="text-zinc-600 font-normal text-xs"> / {game.per}</span></p>
                                    </div>
                                    <Link to="/arcade" className="p-2 border border-zinc-800 hover:border-red-500 hover:bg-red-600/10 transition-all">
                                        <ChevronRight className="h-3.5 w-3.5 text-zinc-500 hover:text-white" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/arcade"
                        className="relative group inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]"
                    >
                        Book any game
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
