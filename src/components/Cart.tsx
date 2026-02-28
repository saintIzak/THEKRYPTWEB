import { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Package, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent } from './ui/sheet';
import { Button } from './ui/button';
import { CartItem } from '../types/product';
import { toast } from 'sonner';
import CheckoutForm from './CheckoutForm';
import TrackOrder from './TrackOrder';
import ShippingInfo from './ShippingInfo';
import Returns from './Returns';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (productId: string, quantity: number) => void;
    onRemoveItem: (productId: string) => void;
    onCheckout: () => void;
}

export default function Cart({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
}: CartProps) {
    const [showCheckout, setShowCheckout] = useState(false);
    const [showTrackOrder, setShowTrackOrder] = useState(false);
    const [showShippingInfo, setShowShippingInfo] = useState(false);
    const [showReturns, setShowReturns] = useState(false);
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handleOrderComplete = () => {
        onCheckout();
        toast.success('Order placed successfully!');
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="right" className="flex flex-col p-0 bg-zinc-950 border-l border-zinc-800 w-full sm:max-w-md">
                {/* Header */}
                <div className="bg-red-600 px-4 sm:px-6 py-4 sm:py-6 text-white">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="p-1.5 sm:p-2 bg-white/20 rounded-none">
                            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-black italic uppercase tracking-tighter">THE VAULT</h2>
                            <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest opacity-80">{cartItems.length} ITEMS SECURED</p>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {cartItems.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-zinc-950">
                        <div className="relative mb-6">
                            <ShoppingBag className="h-20 w-20 text-zinc-800" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <X className="h-8 w-8 text-red-600/50" />
                            </div>
                        </div>
                        <p className="text-lg font-black italic uppercase tracking-tighter text-white">VAULT IS EMPTY</p>
                        <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">No tactical gear detected in your current loadout.</p>
                        <Button
                            onClick={onClose}
                            className="mt-8 bg-zinc-900 border border-zinc-800 text-white hover:border-red-600 rounded-none font-black uppercase tracking-widest text-xs"
                        >
                            RETURN TO SHOP
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className="flex-1 space-y-4 overflow-y-auto bg-black p-6 scrollbar-hide">
                            {cartItems.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex gap-4 bg-zinc-900/50 border border-zinc-800 p-4 group hover:border-red-600/50 transition-colors"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}
                                >
                                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden border border-zinc-800">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-black italic uppercase tracking-tighter text-white text-sm leading-tight">{item.product.name}</h3>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">{item.product.category}</p>
                                            </div>
                                            <button
                                                onClick={() => onRemoveItem(item.product.id)}
                                                className="p-1 text-zinc-600 hover:text-red-600 transition-colors"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center bg-black border border-zinc-800">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="p-1.5 text-zinc-500 hover:text-white disabled:opacity-30"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-black text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                                    className="p-1.5 text-zinc-500 hover:text-white"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <span className="font-black italic text-red-600 text-sm">
                                                KSh {(item.product.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="border-t border-zinc-900 bg-zinc-950 px-6 py-4">
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {[
                                    { icon: Package, label: 'TRACK OPS', action: () => setShowTrackOrder(true) },
                                    { icon: Truck, label: 'LOGISTICS', action: () => setShowShippingInfo(true) },
                                    { icon: RotateCcw, label: 'RECALL', action: () => setShowReturns(true) }
                                ].map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={item.action}
                                        className="flex flex-shrink-0 items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-600 hover:border-red-600 transition-all"
                                    >
                                        <item.icon className="h-3 w-3" />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="border-t border-zinc-800 bg-zinc-950 px-6 sm:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6">
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex justify-between text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-zinc-500">SUBTOTAL</span>
                                    <span className="text-white">KSh {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-zinc-500">TAX (10%)</span>
                                    <span className="text-white">KSh {tax.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between pt-3 sm:pt-4 border-t border-zinc-900">
                                    <span className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-white">TOTAL</span>
                                    <span className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-red-600">KSh {total.toLocaleString()}</span>
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    setShowCheckout(true);
                                    onClose();
                                }}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] rounded-none py-8 text-base shadow-[0_0_30px_rgba(220,38,38,0.3)] group"
                            >
                                <span className="group-hover:scale-110 transition-transform flex items-center gap-2">
                                    INITIALIZE CHECKOUT <ChevronRight className="w-5 h-5" />
                                </span>
                            </Button>
                        </div>
                    </>
                )}
            </SheetContent>
            <CheckoutForm
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
                cartItems={cartItems}
                onOrderComplete={handleOrderComplete}
            />
            <TrackOrder
                isOpen={showTrackOrder}
                onClose={() => setShowTrackOrder(false)}
            />
            <ShippingInfo
                isOpen={showShippingInfo}
                onClose={() => setShowShippingInfo(false)}
            />
            <Returns
                isOpen={showReturns}
                onClose={() => setShowReturns(false)}
            />
        </Sheet>
    );
}
