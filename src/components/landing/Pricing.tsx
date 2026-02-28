import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, ChevronRight } from 'lucide-react';

interface PlanProps {
    name: string;
    tag: string;
    duration: string;
    price: number;
    perMin?: string;
    features: string[];
    popular?: boolean;
    cta: string;
    to: string;
}

const plans: PlanProps[] = [
    {
        name: 'Quick Match',
        tag: 'Standard',
        duration: '30 min',
        price: 200,
        features: [
            'Any PS5 / Xbox station',
            'All available game titles',
            'Complimentary snack',
        ],
        cta: 'Book Now',
        to: '/arcade',
    },
    {
        name: 'Standard',
        tag: 'Most Popular',
        duration: '60 min',
        price: 350,
        features: [
            'Any PS5 / Xbox station',
            'All available game titles',
            'Priority seat selection',
            'Save KSh 50 vs quick match',
        ],
        popular: true,
        cta: 'Book Now',
        to: '/arcade',
    },
    {
        name: 'Marathon',
        tag: 'Best Value',
        duration: '120 min',
        price: 600,
        features: [
            'Any PS5 / Xbox station',
            'All available game titles',
            'Priority seat selection',
            'Save KSh 200 total',
            'Snack & drink included',
        ],
        cta: 'Book Now',
        to: '/arcade',
    },
    {
        name: 'VR Intro',
        tag: 'VR Experience',
        duration: '20 min',
        price: 250,
        features: [
            'Full VR headset included',
            'Guided VR intro session',
            'Min. age 12 years',
        ],
        cta: 'Try VR',
        to: '/arcade',
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    }),
};

function PlanCard({ plan, i }: { plan: PlanProps; i: number }) {
    return (
        <motion.div
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className={`relative flex flex-col bg-zinc-950 border transition-all duration-500 group hover:-translate-y-1
                ${plan.popular
                    ? 'border-red-500/50 shadow-[0_0_60px_rgba(220,38,38,0.1)]'
                    : 'border-zinc-800/60 hover:border-zinc-700'}`}
        >
            {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-red-600 px-4 py-1 text-[10px] font-black text-white uppercase tracking-widest">
                    <Crown className="h-3 w-3" />
                    Most Popular
                </div>
            )}

            <div className="p-6 border-b border-zinc-800/50">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">{plan.tag}</p>
                <h3 className="text-xl font-black text-white mb-3">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white">KSh {plan.price}</span>
                    <span className="text-sm text-zinc-500">/ {plan.duration}</span>
                </div>
            </div>

            <ul className="p-6 space-y-3 flex-1">
                {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-zinc-400">
                        <span className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded-full flex items-center justify-center ${plan.popular ? 'bg-red-600' : 'bg-zinc-800'}`}>
                            <ChevronRight className="h-2 w-2 text-white" />
                        </span>
                        {f}
                    </li>
                ))}
            </ul>

            <div className="p-6 pt-0">
                <Link
                    to={plan.to}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-black uppercase tracking-widest transition-all duration-300
                        ${plan.popular
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-600'}`}
                >
                    {plan.cta}
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
}

export default function Pricing() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section ref={ref} id="pricing" className="py-28 bg-zinc-950/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

            {/* Glow accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/4 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-4">Packages & Pricing</p>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-4">
                        Choose your <span className="text-red-500">session</span>
                    </h2>
                    <p className="text-zinc-500 text-sm max-w-md mx-auto">
                        Minimum 30-min standard session. VR minimum 20 mins. Bundle packs for regular players coming soon.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {plans.map((plan, i) => <PlanCard key={i} plan={plan} i={i} />)}
                </div>
            </div>
        </section>
    );
}
