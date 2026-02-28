import { User, MapPin, Mail, Twitch, Instagram, Twitter } from 'lucide-react';
import { Button } from '../components/ui/button';
import GamifiedSection from '../components/GamifiedSection';

export default function TheHQ() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-20">
            {/* Hero Section */}
            <div className="relative h-[30vh] sm:h-[40vh] flex items-center justify-center overflow-hidden border-b border-zinc-800">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/80 to-zinc-950 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"
                        alt="THE KRYPT HQ"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white uppercase">
                        THE <span className="text-red-600">HQ</span>
                    </h1>
                    <p className="text-[10px] sm:text-xs font-black text-zinc-500 uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-2">Operational Intelligence Center</p>
                </div>
            </div>

            <GamifiedSection className="w-full sm:container mx-auto px-0 sm:px-4 py-12 grid lg:grid-cols-3 gap-12">
                {/* Main Content - Founder's Log */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                            <User className="text-red-600 w-5 h-5 sm:w-6 sm:h-6" />
                            THE COMMANDER'S LOG
                        </h2>

                        <div className="space-y-8">
                            {/* Blog Post 1 */}
                            <article className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-600/50 transition-colors">
                                <img
                                    src="https://images.unsplash.com/photo-1593305841991-05c29736cef7?q=80&w=2070&auto=format&fit=crop"
                                    alt="New Rigs"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-5 sm:p-6">
                                    <div className="flex items-center gap-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">
                                        <span>DEC 15, 2025</span>
                                        <span className="text-red-600">•</span>
                                        <span>GEAR UPDATE</span>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold mb-3">Upgrading the Arena: RTX 5090s Have Arrived</h3>
                                    <p className="text-sm sm:text-base text-gray-400 mb-4">
                                        We just took delivery of the latest hardware for the Pro Zone. Check out the unboxing and installation process.
                                        These beasts are going to push 360Hz on 4K without breaking a sweat.
                                    </p>
                                    <Button variant="link" className="text-red-600 p-0 hover:text-red-500 font-black uppercase tracking-widest text-[10px] sm:text-xs">Read full story →</Button>
                                </div>
                            </article>

                            {/* Blog Post 2 */}
                            <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600/50 transition-colors">
                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">
                                    <span>DEC 10, 2025</span>
                                    <span className="text-red-600">•</span>
                                    <span>COMMUNITY</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3">Winter Championship Recap</h3>
                                <p className="text-gray-400 mb-4">
                                    What a weekend! Over 50 teams competed in our biggest Valorant tournament yet.
                                    Congratulations to Team Vortex for taking home the grand prize.
                                </p>
                                <Button variant="link" className="text-red-600 p-0 hover:text-red-500 font-black uppercase tracking-widest text-xs">Read full story →</Button>
                            </article>
                        </div>
                    </section>
                </div>

                {/* Sidebar - Info & Stream */}
                <div className="space-y-8">
                    {/* Live Stream Embed Placeholder */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Twitch className="text-purple-500" />
                            Live from HQ
                        </h3>
                        <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-purple-900/10 transition-colors" />
                            <div className="text-center">
                                <p className="font-bold text-gray-400 mb-2">Stream Offline</p>
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Visit Channel</Button>
                            </div>
                        </div>
                    </div>

                    {/* Location & Contact */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4">Visit Us</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <MapPin className="text-red-600 shrink-0" />
                                <div>
                                    <p className="font-black text-white uppercase tracking-tighter">THE KRYPT ARENA</p>
                                    <p className="text-zinc-500 text-xs font-bold uppercase">Maaiyan Mall</p>
                                    <p className="text-zinc-500 text-xs font-bold uppercase">Rongai </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Mail className="text-red-600 shrink-0" />
                                <div>
                                    <p className="text-zinc-500 text-xs font-bold uppercase">contact@thekrypt.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-zinc-800">
                            <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Follow Us</h4>
                            <div className="flex gap-4">
                                <Button size="icon" variant="ghost" className="hover:text-pink-500 hover:bg-pink-500/10"><Instagram /></Button>
                                <Button size="icon" variant="ghost" className="hover:text-blue-400 hover:bg-blue-400/10"><Twitter /></Button>
                                <Button size="icon" variant="ghost" className="hover:text-purple-500 hover:bg-purple-500/10"><Twitch /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </GamifiedSection>
        </div>
    );
}
