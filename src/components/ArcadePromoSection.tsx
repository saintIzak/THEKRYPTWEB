import { Gamepad2, Zap, Gift, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export default function ArcadePromoSection() {
    const navigate = useNavigate();

    const promos = [
        {
            icon: Gamepad2,
            title: 'Buy Gear + Get Play Time',
            description: 'Purchase any gaming gear and receive discounted arcade sessions',
            cta: 'Shop Now',
            color: 'from-purple-600/20 to-transparent',
            borderColor: 'border-purple-600/30',
            iconColor: 'text-purple-500',
            action: () => { },
        },
        {
            icon: Zap,
            title: 'Top Up Arcade Credits',
            description: 'KSh 1,000 → 1,150 credits • Get 15% bonus on every top-up',
            cta: 'Top Up Now',
            color: 'from-blue-600/20 to-transparent',
            borderColor: 'border-blue-600/30',
            iconColor: 'text-blue-500',
            action: () => navigate('/play'),
        },
        {
            icon: Gift,
            title: 'Monthly Membership',
            description: 'Unlimited play time + 20% off all shop purchases',
            cta: 'Join Now',
            color: 'from-red-600/20 to-transparent',
            borderColor: 'border-red-600/30',
            iconColor: 'text-red-500',
            action: () => navigate('/play'),
        },
    ];

    return (
        <div className="my-12 space-y-4">
            <div className="flex items-center gap-3 mb-6">
                <Zap className="h-5 w-5 text-red-600" />
                <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">
                    BOOST YOUR <span className="text-red-600">GAMING</span>
                </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {promos.map((promo, index) => {
                    const Icon = promo.icon;
                    return (
                        <div
                            key={index}
                            className={`group relative bg-gradient-to-r ${promo.color} backdrop-blur-sm border ${promo.borderColor} p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
                            style={{ clipPath: 'polygon(0 0, 97% 0, 100% 15%, 100% 100%, 3% 100%, 0 85%)' }}
                            onClick={promo.action}
                        >
                            {/* Icon */}
                            <div className="mb-4">
                                <div className="inline-flex p-3 bg-zinc-900/50 border border-zinc-800 group-hover:border-red-600 transition-colors">
                                    <Icon className={`h-6 w-6 ${promo.iconColor} group-hover:scale-110 transition-transform`} />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white mb-2">
                                {promo.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-400 font-bold mb-4 leading-relaxed">
                                {promo.description}
                            </p>

                            {/* CTA */}
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    promo.action();
                                }}
                                className="w-full bg-transparent border border-zinc-800 text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 rounded-none text-xs font-black uppercase tracking-widest group"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    {promo.cta}
                                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>

                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-red-600/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
