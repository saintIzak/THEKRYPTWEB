import { Link } from 'react-router-dom';
import {
    Twitter, Instagram, Facebook, Youtube,
    Send, Shield, Zap, Globe, Cpu,
    ChevronRight, Mail, MapPin, Phone
} from 'lucide-react';
import logo from '../assets/images/logo01.jpg';
import redGridBg from '../assets/images/red-grid-bg.png';

export default function Footer() {
    return (
        <footer className="relative bg-black text-white border-t border-zinc-900 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <img src={redGridBg} alt="" className="w-full h-full object-cover mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            </div>

            <div className="w-full sm:container relative z-10 mx-auto px-0 sm:px-4 pt-12 sm:pt-20 pb-8 sm:pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-red-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg overflow-hidden border border-zinc-800 bg-black">
                                    <img src={logo} alt="THE KRYPT Logo" className="h-full w-full object-cover" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-black italic tracking-tighter uppercase leading-none">
                                    THE <span className="text-red-600">KRYPT</span>
                                </span>
                                <span className="text-[7px] sm:text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em] sm:tracking-[0.4em] mt-1">ELITE_ARENA_GEAR</span>
                            </div>
                        </div>
                        <p className="text-[10px] sm:text-xs text-zinc-500 font-medium uppercase tracking-widest leading-relaxed border-l-2 border-red-600 pl-4">
                            Elite gaming electronics and cutting-edge battle gear. Built for champions, tested in the arena. Dominate the digital landscape with the ultimate arsenal.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <Twitter className="w-4 h-4" />, href: "#" },
                                { icon: <Instagram className="w-4 h-4" />, href: "#" },
                                { icon: <Facebook className="w-4 h-4" />, href: "#" },
                                { icon: <Youtube className="w-4 h-4" />, href: "#" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-8 h-8 flex items-center justify-center border border-zinc-800 hover:border-red-600 hover:text-red-600 transition-all duration-300 bg-zinc-950/50"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)' }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-red-600" />
                            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-white">QUICK_ACCESS</h3>
                        </div>
                        <ul className="grid grid-cols-1 gap-3 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            {[
                                { name: 'Shop All Gear', path: '/shop' },
                                { name: 'Tournament Calendar', path: '/leaderboard' },
                                { name: 'Arcade Pricing', path: '/arcade' },
                                { name: 'Bulk/Wholesale Inquiries', path: '/hq' },
                                { name: 'Command Rank', path: '/leaderboard' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="flex items-center gap-2 hover:text-red-600 transition-colors group">
                                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-red-600" />
                            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-white">COMMS_CENTER</h3>
                        </div>
                        <ul className="space-y-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                                <span>Maiyan Mall, 2nd Floor<br />Nairobi, Kenya</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                                <span>+254 700 000 000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-red-600 shrink-0" />
                                <span>HQ@THEKRYPT.GG</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-red-600" />
                            <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-white">INTEL_SIGNUP</h3>
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-zinc-500 font-black uppercase tracking-widest leading-relaxed">
                            Receive tactical updates and exclusive gear drops directly to your terminal.
                        </p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="ENTER_EMAIL_ADDRESS"
                                className="w-full bg-zinc-950 border border-zinc-800 px-4 py-3 text-[9px] sm:text-[10px] font-black uppercase tracking-widest focus:border-red-600 outline-none transition-colors"
                                style={{ clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)' }}
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-red-600 hover:text-white transition-colors">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-[7px] sm:text-[8px] font-black text-zinc-600 uppercase tracking-widest">
                            <Shield className="w-3 h-3" />
                            <span>ENCRYPTED_CONNECTION_SECURE</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[7px] sm:text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-center sm:text-left">
                        <p>&copy; {new Date().getFullYear()} THE KRYPT. ALL SYSTEMS OPERATIONAL.</p>
                        <div className="hidden sm:flex items-center gap-4">
                            <div className="h-1 w-1 bg-zinc-800 rounded-full" />
                            <span>LATENCY: 0.001MS</span>
                            <div className="h-1 w-1 bg-zinc-800 rounded-full" />
                            <span>STATUS: ACTIVE</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[7px] sm:text-[8px] font-black text-zinc-500 uppercase tracking-widest">
                        <Link to="/hq" className="hover:text-red-600 transition-colors">PRIVACY_POLICY</Link>
                        <Link to="/hq" className="hover:text-red-600 transition-colors">TERMS_OF_ENGAGEMENT</Link>
                        <Link to="/admin" className="opacity-20 hover:opacity-100 transition-opacity">SYS_ADMIN</Link>
                    </div>
                </div>
            </div>

            {/* Tactical HUD Brackets */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-zinc-900/50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-zinc-900/50 pointer-events-none" />
        </footer>
    );
}
