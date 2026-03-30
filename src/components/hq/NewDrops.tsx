import { ShoppingCart, Eye, Tag, Zap } from 'lucide-react';
import { Button } from '../ui/button';

const DROPS = [
    {
        id: 1,
        title: 'KRYPT ELITE HEADSET V2',
        category: 'AUDIO HARDWARE',
        price: 'KSh 12,500',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
        tags: ['Just Landed', 'Limited Stock'],
        coinValue: '1,250 KC',
        color: 'red'
    },
    {
        id: 2,
        title: 'TACTICAL PRO CONTROLLER',
        category: 'INPUT DEVICE',
        price: 'KSh 8,500',
        image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=800&auto=format&fit=crop',
        tags: ['Exclusive Drop'],
        coinValue: '850 KC',
        color: 'blue'
    },
    {
        id: 3,
        title: 'OPERATOR TEE - MIDNIGHT',
        category: 'APPAREL',
        price: 'KSh 3,500',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop',
        tags: ['New Colorway'],
        coinValue: '350 KC',
        color: 'zinc'
    },
    {
        id: 4,
        title: 'RGB COMMAND PAD',
        category: 'ACCESSORIES',
        price: 'KSh 4,200',
        image: 'https://images.unsplash.com/photo-1527814050087-1547477bfa37?q=80&w=800&auto=format&fit=crop',
        tags: ['Back in Stock'],
        coinValue: '420 KC',
        color: 'emerald'
    }
];

export function NewDrops() {
    return (
        <div className="mb-24 scroll-mt-24" id="drops">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
                <div>
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-8 h-px bg-blue-600/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">THE VAULT INVENTORY</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
                        NEWLY LANDED <span className="text-zinc-500">DROPS</span>
                    </h2>
                </div>

                <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-600 font-black uppercase tracking-widest text-[10px] rounded-none px-6 transition-colors group">
                    ENTER THE VAULT <ShoppingCart className="w-3.5 h-3.5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DROPS.map((product) => {
                    const isRed = product.color === 'red';
                    const isBlue = product.color === 'blue';

                    return (
                        <div key={product.id} className="bg-zinc-950/80 border border-zinc-800 group hover:border-zinc-600 transition-all duration-500">
                            {/* Product Image Area */}
                            <div className="aspect-square bg-zinc-900 relative overflow-hidden flex items-center justify-center p-6">
                                <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity blur-3xl pointer-events-none
                                    ${isRed ? 'bg-red-500' : isBlue ? 'bg-blue-500' : 'bg-zinc-500'}
                                `} />
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover rounded-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700 mix-blend-luminosity hover:mix-blend-normal"
                                />

                                {/* Tags */}
                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                    {product.tags.map((tag, i) => (
                                        <div key={i} className={`text-[8px] font-black px-2 py-1 uppercase tracking-widest border
                                            ${i === 0 && (isRed || isBlue) ?
                                                (isRed ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]')
                                                : 'bg-zinc-950/80 border-zinc-700 text-zinc-300 backdrop-blur-sm'}
                                        `}>
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-5 flex flex-col justify-between">
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                                            <Tag className="w-3 h-3" /> {product.category}
                                        </span>
                                    </div>
                                    <h3 className="text-sm font-black italic uppercase tracking-tighter text-white mb-2 line-clamp-2 leading-snug group-hover:text-zinc-300 transition-colors">
                                        {product.title}
                                    </h3>

                                    <div className="flex items-end justify-between mt-4">
                                        <div className="text-lg font-black italic tracking-tighter tabular-nums text-white">
                                            {product.price}
                                        </div>
                                        <div className="flex items-center gap-1 text-[9px] font-black text-amber-500 uppercase tracking-widest bg-amber-950/30 px-2 py-0.5 border border-amber-900/50">
                                            <Zap className="w-3 h-3" /> +{product.coinValue}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[9px] rounded-none h-9 transition-colors border-0">
                                        SHOP DROP
                                    </Button>
                                    <Button variant="outline" className="shrink-0 w-9 h-9 border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-white rounded-none p-0 transition-colors flex items-center justify-center">
                                        <Eye className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
