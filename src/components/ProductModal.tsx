import { useState } from 'react';
import { X, Star, ShoppingCart, ChevronLeft, ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import { Product } from '../types/product';
import { Button } from './ui/button';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-950 border-2 border-zinc-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide relative" style={{ clipPath: 'polygon(0 0, 98% 0, 100% 10%, 100% 100%, 2% 100%, 0 90%)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-zinc-900 bg-zinc-900/50">
          <div>
            <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">GEAR <span className="text-red-600">SPECIFICATIONS</span></h2>
            <p className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Technical Data Sheet</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 text-zinc-500 hover:text-red-600 transition-colors">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Image Gallery */}
            <div className="relative group">
              <div className="absolute -inset-2 border border-red-600/20 group-hover:border-red-600/40 transition-colors -z-10" />
              <div className="aspect-square overflow-hidden border-2 border-zinc-800 bg-black relative" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}>
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* HUD Elements */}
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <div className="h-1 w-8 bg-red-600" />
                  <div className="h-1 w-4 bg-red-600/50" />
                </div>
                <div className="absolute bottom-4 right-4 text-[8px] font-black text-red-600/50 uppercase tracking-widest">
                  SCANNING_ASSET_0{currentImageIndex + 1}
                </div>
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 text-white p-3 border border-zinc-800 hover:border-red-600 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 text-white p-3 border border-zinc-800 hover:border-red-600 transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Image indicators */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-1 transition-all ${index === currentImageIndex ? 'w-8 bg-red-600' : 'w-4 bg-zinc-800 hover:bg-zinc-700'
                          }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Zap className="h-3 w-3 text-red-600" />
                  <p className="text-[10px] text-red-600 font-black uppercase tracking-[0.3em]">
                    {product.category}
                  </p>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black italic text-white uppercase tracking-tighter leading-tight">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-red-600 text-red-600" />
                  <span className="font-black text-white italic">{product.rating}</span>
                </div>
                <div className="h-4 w-px bg-zinc-800" />
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">120+ COMBAT LOGS</span>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-l-2 border-red-600 pl-3">DESCRIPTION:</h3>
                <p className="text-zinc-500 text-sm font-bold leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Compatibility */}
              {product.compatibility && product.compatibility.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-l-2 border-red-600 pl-3">COMPATIBILITY:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.map((item, idx) => (
                      <span key={idx} className="bg-zinc-900 border border-zinc-800 text-white text-xs font-black px-3 py-1.5 uppercase">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* What's in the Box */}
              {product.whatsInBox && product.whatsInBox.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest border-l-2 border-red-600 pl-3">WHAT'S IN THE BOX:</h3>
                  <ul className="space-y-1">
                    {product.whatsInBox.map((item, idx) => (
                      <li key={idx} className="text-sm text-zinc-500 font-bold flex items-center gap-2">
                        <div className="h-1 w-1 bg-red-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trust Signals */}
              <div className="bg-zinc-900/30 border border-zinc-800 p-4 space-y-3">
                <h3 className="text-xs font-black text-white uppercase tracking-wider">TRUST & DELIVERY:</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span className="text-zinc-400 font-bold">Original Product</span>
                  </div>
                  {product.warranty && (
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span className="text-zinc-400 font-bold">{product.warranty}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-purple-500" />
                    <span className="text-zinc-400 font-bold">Pickup at Mall</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-orange-500" />
                    <span className="text-zinc-400 font-bold">Nairobi Delivery</span>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/50 border-2 border-zinc-800 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldCheck className="h-12 w-12 text-red-600" />
                </div>
                <div className="relative z-10">
                  <div className="text-4xl font-black italic text-red-600 tracking-tighter">
                    KSh {product.price.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`h-1.5 w-1.5 rounded-full ${product.inStock ? 'bg-red-600 animate-pulse' : 'bg-zinc-700'}`} />
                    <p className={`text-[10px] font-black uppercase tracking-widest ${product.inStock ? 'text-white' : 'text-zinc-600'}`}>
                      {product.inStock ? 'IN STOCK - READY TO SHIP' : 'OUT OF STOCK'}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-zinc-800">
                    <p className="text-xs text-zinc-400 font-bold flex items-center gap-2">
                      <Zap className="h-3 w-3 text-green-500" />
                      M-Pesa, Card, or Cash on Pickup
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] rounded-none py-8 sm:py-10 text-base sm:text-lg shadow-[0_0_30px_rgba(220,38,38,0.3)] group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="group-hover:scale-110 transition-transform flex items-center gap-3">
                    <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                    {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                  </span>
                </Button>

                {/* WhatsApp Quick Contact */}
                <a
                  href="https://wa.me/254700000000?text=Hi, I'm interested in this product"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-wider rounded-none py-4 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Quick Question? WhatsApp Us
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}