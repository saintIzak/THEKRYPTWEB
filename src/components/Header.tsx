import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, Menu, X, ChevronRight, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { authService } from '../lib/auth';

import logo from '../assets/images/logo01.jpg';

interface HeaderProps {
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
    const { cartCount, setIsCartOpen } = useCart();
    const { wishlist } = useWishlist();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [signingOut, setSigningOut] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSignOut = async () => {
        setSigningOut(true);
        try {
            await authService.signOut();
            navigate('/');
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            setSigningOut(false);
        }
    };

    const navLinks = [
        { name: 'Play', path: '/arcade' },
        { name: 'The Vault', path: '/shop' },
        { name: 'Community', path: '/leaderboard' },
        { name: 'The HQ', path: '/hq' },
        { name: 'Quest Log', path: '/quest-log' },
        { name: 'About Us', path: '/about' },
    ];

    const isActive = (path: string) => location.pathname === path;

    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        setIsScanning(true);
        const timer = setTimeout(() => setIsScanning(false), 500);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-zinc-950 border-zinc-800 text-white shadow-sm">
            <div className="w-full sm:container mx-auto px-2 sm:px-4">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden shadow-md border border-zinc-700">
                            <img src={logo} alt="THE KRYPT Logo" className="h-full w-full object-cover" />
                        </div>
                        <div className="block">
                            <h1 className="text-base sm:text-xl font-black italic tracking-tighter text-white uppercase">THE <span className="text-red-600">KRYPT</span></h1>
                            <p className="text-[8px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Elite Gaming Hub</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="relative group"
                            >
                                <span className={`text-xs font-black uppercase tracking-widest transition-colors hover:text-red-500 ${isActive(link.path) ? 'text-red-600' : 'text-zinc-400'
                                    }`}>
                                    {link.name}
                                </span>
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                                    />
                                )}
                                <motion.div
                                    className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-red-600/0 group-hover:bg-red-600/30 transition-colors"
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar - Only show on Shop page */}
                    {location.pathname === '/shop' && onSearchChange && (
                        <div className="hidden lg:flex flex-1 max-w-sm">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="SEARCH THE VAULT..."
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-red-600 rounded-none font-bold text-xs uppercase tracking-widest"
                                />
                            </div>
                        </div>
                    )}

                    {/* Auth & Cart Section */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/quest-log" className="hidden sm:inline-block">
                                    <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20">
                                        Lvl 12
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSignOut}
                                    disabled={signingOut}
                                    className="flex items-center gap-1 text-gray-300 hover:text-white hover:bg-zinc-800"
                                >
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <Link to="/auth">
                                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-300 hover:text-white hover:bg-zinc-800">
                                    <User className="h-4 w-4" />
                                    <span className="hidden sm:inline">Sign In</span>
                                </Button>
                            </Link>
                        )}

                        {/* Wishlist Button */}
                        <Link to="/wishlist">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative hover:bg-zinc-900 text-zinc-400 hover:text-red-500 transition-colors"
                            >
                                <Heart className={`h-5 w-5 ${wishlist.length > 0 ? 'fill-red-600 text-red-600' : ''}`} />
                                {wishlist.length > 0 && (
                                    <Badge
                                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-[10px] font-black bg-red-600 text-white border-none rounded-none"
                                    >
                                        {wishlist.length}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        {/* Cart Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsCartOpen(true)}
                            className="relative hover:bg-zinc-900 text-zinc-400 hover:text-red-500 transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <Badge
                                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-[10px] font-black bg-red-600 text-white border-none rounded-none"
                                >
                                    {cartCount}
                                </Badge>
                            )}
                        </Button>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-gray-300"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl md:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg overflow-hidden border border-zinc-700">
                                        <img src={logo} alt="Logo" className="h-full w-full object-cover" />
                                    </div>
                                    <h2 className="text-lg font-black italic tracking-tighter text-white uppercase">THE <span className="text-red-600">KRYPT</span></h2>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-zinc-400 hover:text-white"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-2">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`group relative flex items-center justify-between py-5 px-6 border border-zinc-900 transition-all ${isActive(link.path)
                                                ? 'bg-red-600/10 border-red-600/50 text-red-500'
                                                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                                }`}
                                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%)' }}
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black uppercase tracking-[0.3em]">0{i + 1}. {link.name}</span>
                                                <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">ACCESS_PROTOCOL_V4</span>
                                            </div>
                                            <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isActive(link.path) ? 'text-red-600' : 'text-zinc-800'}`} />

                                            {isActive(link.path) && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="p-8 border-t border-zinc-900 bg-zinc-950/50">
                                {location.pathname === '/shop' && onSearchChange && (
                                    <div className="mb-8">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                                            <Input
                                                type="text"
                                                placeholder="SEARCH THE VAULT..."
                                                value={searchQuery}
                                                onChange={(e) => onSearchChange(e.target.value)}
                                                className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none font-bold text-xs uppercase tracking-widest"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    {!user ? (
                                        <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="col-span-2">
                                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-none py-6">
                                                INITIALIZE_SESSION
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outline"
                                                className="border-zinc-800 text-zinc-400 font-black uppercase tracking-widest rounded-none py-6"
                                                onClick={handleSignOut}
                                            >
                                                TERMINATE
                                            </Button>
                                            <Link to="/quest-log" onClick={() => setIsMobileMenuOpen(false)}>
                                                <Button className="w-full bg-zinc-900 border border-red-600/30 text-red-500 font-black uppercase tracking-widest rounded-none py-6">
                                                    PROFILE
                                                </Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <p className="text-center text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em] mt-8">SECURE_ACCESS_ESTABLISHED_2025</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ left: '-100%' }}
                        animate={{ left: '100%' }}
                        exit={{ left: '100%' }}
                        transition={{ duration: 0.5, ease: "linear" }}
                        className="absolute bottom-0 h-[1px] w-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)] z-50 pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </header>
    );
}

