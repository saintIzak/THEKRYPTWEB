import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserCheck, CalendarCheck, Gamepad2 } from 'lucide-react';

const steps = [
    {
        num: '01',
        icon: UserCheck,
        title: 'Create Your Profile',
        body: 'Sign up in seconds. No friction — just your name and number to unlock The Krypt experience.',
        accent: 'text-red-500',
        border: 'border-red-500/20',
        glow: 'group-hover:shadow-[0_0_40px_rgba(220,38,38,0.12)]',
    },
    {
        num: '02',
        icon: CalendarCheck,
        title: 'Book or Browse',
        body: 'Reserve an Arena station for a session, or explore The Vault for premium gear you can\'t find anywhere else in Nairobi.',
        accent: 'text-white',
        border: 'border-white/10',
        glow: 'group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]',
    },
    {
        num: '03',
        icon: Gamepad2,
        title: 'Play & Earn',
        body: 'Every session and purchase earns XP. Level up your Operator rank, unlock exclusive discounts, and dominate the leaderboard.',
        accent: 'text-red-500',
        border: 'border-red-500/20',
        glow: 'group-hover:shadow-[0_0_40px_rgba(220,38,38,0.12)]',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function HowItWorks() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="how-it-works" className="py-28 bg-black relative overflow-hidden">
            {/* Subtle grid bg */}
            <div className="absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: 'linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
            }} />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-4">How It Works</p>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white">
                        Three steps to your <span className="text-red-500">best session</span>
                    </h2>
                </motion.div>

                {/* Steps grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
                >
                    {/* Connecting line on desktop */}
                    <div className="hidden md:block absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent pointer-events-none" />

                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className={`group relative bg-zinc-950 border ${step.border} p-8 transition-all duration-500 ${step.glow} hover:-translate-y-1`}
                            >
                                {/* Step number */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`w-12 h-12 rounded-full border ${step.border} flex items-center justify-center relative z-10 bg-black`}>
                                        <Icon className={`h-5 w-5 ${step.accent}`} />
                                    </div>
                                    <span className="text-5xl font-black italic text-white/5 select-none">{step.num}</span>
                                </div>

                                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{step.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">{step.body}</p>

                                {/* Bottom accent bar */}
                                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${i === 1 ? 'from-transparent via-white/10 to-transparent' : 'from-transparent via-red-500/30 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
