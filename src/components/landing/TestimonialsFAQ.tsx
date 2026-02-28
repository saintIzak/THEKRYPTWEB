import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';

const testimonials = [
    {
        name: 'Jayden M.',
        handle: '@jayden_nrb',
        rating: 5,
        text: 'Genuinely the best gaming spot in Nairobi. The PS5 setup is immaculate, and the staff actually know their games. Book your slot in advance though — it fills up fast.',
        badge: 'Arena Regular',
    },
    {
        name: 'Amina K.',
        handle: '@aminak_plays',
        rating: 5,
        text: 'Bought my Razer headset from The Vault and it was the most seamless M-Pesa experience ever. Legit gear, great prices. Will always come back here first.',
        badge: 'Vault Shopper',
    },
    {
        name: 'Brian O.',
        handle: '@brian_forzafan',
        rating: 5,
        text: 'The VR experience is worth every shilling. I did 40 minutes and did not want to leave. The staff guidance makes it super easy even if it\'s your first time. 10/10.',
        badge: 'VR Explorer',
    },
];

const faqs = [
    {
        q: 'Do I need to book in advance?',
        a: 'Booking in advance is strongly recommended, especially on weekends and evenings. Walk-ins are welcome if stations are available, but prior booking guarantees your slot.',
    },
    {
        q: 'What\'s the minimum session time?',
        a: 'Standard PS5/Xbox sessions start at 30 minutes (KSh 200). VR Experience starts at 20 minutes (KSh 250). There\'s no upper limit — you can book as long as you want!',
    },
    {
        q: 'How does payment work?',
        a: 'We accept M-Pesa, cash, and card. For online bookings, you\'ll pay via our M-Pesa gateway. In-person, you can pay at the counter using any method.',
    },
    {
        q: 'Can I cancel or reschedule my booking?',
        a: 'Yes — cancellations made more than 2 hours before your session are fully refunded. Rescheduling is free with at least 1 hour notice.',
    },
    {
        q: 'Are there membership or loyalty benefits?',
        a: 'Absolutely. Every session and purchase earns XP. Reach Elite tier and unlock 5% tactical discounts, priority booking, and tournament access. Check your Quest Log.',
    },
    {
        q: 'Can I bring my own controller or headset?',
        a: 'Yes, you\'re welcome to use your own gear. We provide controllers and headsets as standard anyway, all sanitized between sessions.',
    },
];

function FAQItem({ faq, i }: { faq: typeof faqs[0]; i: number }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="border-b border-zinc-800/60 last:border-0"
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                aria-expanded={open}
            >
                <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug pr-4">
                    {faq.q}
                </span>
                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                    <ChevronDown className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function TestimonialsFAQ() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section ref={ref} className="py-28 bg-black relative overflow-hidden">
            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-red-600/4 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-4">Reviews</p>
                    <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white">
                        What players <span className="text-red-500">say</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-28">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.12, duration: 0.5 }}
                            className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col gap-5 hover:border-zinc-700 transition-colors"
                        >
                            {/* Stars */}
                            <div className="flex gap-1">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} className="h-4 w-4 fill-amber-500 text-amber-500" />
                                ))}
                            </div>

                            <p className="text-sm text-zinc-300 leading-relaxed flex-1">"{t.text}"</p>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div>
                                    <p className="text-sm font-black text-white">{t.name}</p>
                                    <p className="text-[10px] text-zinc-600 font-bold">{t.handle}</p>
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-red-500 bg-red-600/10 border border-red-500/20 px-2 py-1">
                                    {t.badge}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ */}
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-4">FAQ</p>
                        <h2 className="text-4xl font-black italic tracking-tighter text-white">
                            Common <span className="text-red-500">questions</span>
                        </h2>
                    </motion.div>

                    <div className="bg-zinc-950 border border-zinc-800 px-6">
                        {faqs.map((faq, i) => <FAQItem key={i} faq={faq} i={i} />)}
                    </div>
                </div>
            </div>
        </section>
    );
}
