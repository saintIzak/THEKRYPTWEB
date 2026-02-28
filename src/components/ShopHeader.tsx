import { ShieldCheck, Truck, MapPin, Zap, Award } from 'lucide-react';
import redGridBg from '../assets/images/red-grid-bg.png';

export default function ShopHeader() {
    const trustChips = [
        { icon: ShieldCheck, label: 'Original Products', color: 'text-green-500' },
        { icon: Award, label: 'Warranty Included', color: 'text-blue-500' },
        { icon: MapPin, label: 'Pickup at Mall', color: 'text-purple-500' },
        { icon: Truck, label: 'Fast Delivery', color: 'text-orange-500' },
    ];

    return (
        <div className="relative py-12 sm:py-20 overflow-hidden border-b border-zinc-800">
            {/* 3D Grid Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={redGridBg}
                    alt=""
                    className="w-full h-full object-cover opacity-30 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
            </div>

            <div className="w-full sm:container relative z-20 mx-auto px-4 sm:px-4">
                {/* Main Title */}
                <div className="mb-6">
                    <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white mb-3">
                        PRO GEAR <span className="text-red-600">SHOP</span>
                    </h1>
                    <p className="text-base sm:text-xl text-gray-300 max-w-3xl font-bold">
                        Authentic gaming gear • Nairobi delivery/pickup • Pay with M-Pesa
                    </p>
                </div>

                {/* Trust Chips */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
                    {trustChips.map((chip, index) => (
                        <div
                            key={index}
                            className="group relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-red-600/50 px-4 py-2.5 transition-all duration-300"
                            style={{ clipPath: 'polygon(0 0, 95% 0, 100% 30%, 100% 100%, 5% 100%, 0 70%)' }}
                        >
                            <div className="flex items-center gap-2">
                                <chip.icon className={`h-4 w-4 ${chip.color} group-hover:scale-110 transition-transform`} />
                                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                                    {chip.label}
                                </span>
                            </div>
                            {/* Glow effect on hover */}
                            <div className="absolute -inset-1 bg-red-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                        </div>
                    ))}
                </div>

                {/* M-Pesa Highlight */}
                <div className="mt-6 inline-flex items-center gap-3 bg-gradient-to-r from-green-600/20 to-transparent border border-green-600/30 px-5 py-3 backdrop-blur-sm">
                    <Zap className="h-5 w-5 text-green-500 animate-pulse" />
                    <span className="text-sm font-black uppercase tracking-wider text-green-400">
                        Instant M-Pesa Checkout Available
                    </span>
                </div>
            </div>
        </div>
    );
}
