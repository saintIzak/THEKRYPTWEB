import { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Header from './components/Header';
import Cart from './components/Cart';
import CustomerSupport from './components/CustomerSupport';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';
import { AuthForm } from './components/AuthForm';
import { AuthCallback } from './components/AuthCallback';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import './styles/globals.css';

// Lazy loaded Pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Arcade = lazy(() => import('./pages/Arcade'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Loyalty = lazy(() => import('./pages/Loyalty'));
const TheHQ = lazy(() => import('./pages/TheHQ'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Wishlist = lazy(() => import('./pages/Wishlist'));

// Loading Fallback
const LoadingScreen = () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-t-2 border-red-600 rounded-full animate-spin" />
            <div className="absolute inset-2 border-b-2 border-red-600/30 rounded-full animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[8px] font-black text-red-600 animate-pulse tracking-widest">LOADING</span>
            </div>
        </div>
    </div>
);

// Layout Component
function Layout({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (q: string) => void }) {
    const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const location = useLocation();

    const handleCheckout = () => {
        clearCart();
        setIsCartOpen(false);
        // In a real app, this would redirect to a checkout page
    };

    return (
        <div className="min-h-screen flex flex-col bg-zinc-950">
            <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <main className="flex-1">
                <PageTransition>
                    <Outlet />
                </PageTransition>
            </main>
            <Footer />
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onCheckout={handleCheckout}
            />
            {location.pathname === '/shop' && <CustomerSupport />}
        </div>
    );
}

// Auth Page Component
function AuthPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center py-12 px-0 sm:px-6 lg:px-8">
            <AuthForm />
        </div>
    );
}

// Main App Component
function App() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <Router>
                        <ScrollToTop />
                        <Toaster position="top-center" />
                        <Suspense fallback={<LoadingScreen />}>
                            <Routes>
                                <Route element={<Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/shop" element={<Shop searchQuery={searchQuery} />} />
                                    <Route path="/wishlist" element={<Wishlist />} />
                                    <Route path="/arcade" element={<Arcade />} />
                                    <Route path="/leaderboard" element={<Leaderboard />} />
                                    <Route path="/quest-log" element={<Loyalty />} />
                                    <Route path="/hq" element={<TheHQ />} />
                                    <Route path="/about" element={<AboutUs />} />
                                </Route>

                                <Route path="/auth" element={<AuthPage />} />
                                <Route path="/auth/callback" element={<AuthCallback />} />
                                <Route path="/admin" element={<AdminPanel />} />
                            </Routes>
                        </Suspense>
                    </Router>
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
