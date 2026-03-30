import { useState } from 'react';
import { Button } from '../ui/button';
import { CalendarDays, MapPin, Clock, Users, ShieldAlert, ChevronRight } from 'lucide-react';

const CATEGORIES = ['All Events', 'This Week', 'Tournaments', 'Community', 'VIP Access'];

const EVENTS = [
    {
        id: 1,
        title: 'KRYPT INVITATIONAL: VALORANT',
        date: 'DEC 15, 2026',
        time: '18:00 EAT',
        location: 'NAIROBI HQ ARENA',
        category: 'Tournaments',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
        status: 'FILLING FAST',
        eligibility: 'ELITE TIER & ABOVE',
        description: 'The pinnacle of tactical combat. 16 squads, double elimination, massive KSh 250,000 prize pool. Spectators welcome.',
        color: 'red'
    },
    {
        id: 2,
        title: 'FIFA 27 WEEKEND LEAGUE',
        date: 'DEC 18, 2026',
        time: '14:00 EAT',
        location: 'NAIROBI HQ ARENA',
        category: 'This Week',
        image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1000&auto=format&fit=crop',
        status: 'REGISTRATION OPEN',
        eligibility: 'ALL OPERATORS',
        description: 'Compete in our weekly FIFA showdown. Bring your squad, test your skills, and earn KRYPT COIN multipliers for every win.',
        color: 'blue'
    },
    {
        id: 3,
        title: 'FOUNDERS VIP NIGHT',
        date: 'DEC 22, 2026',
        time: '20:00 EAT',
        location: 'THE VAULT LOUNGE',
        category: 'VIP Access',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop',
        status: 'INVITE ONLY',
        eligibility: 'KRYPT BLACK EXCLUSIVE',
        description: 'An exclusive end-of-year gathering for our founding operators. Includes open bar, early access to new gear, and a private tournament.',
        color: 'amber'
    },
    {
        id: 4,
        title: 'SQUAD SCRIMS: APEX LEGENDS',
        date: 'DEC 26, 2026',
        time: '16:00 EAT',
        location: 'ONLINE & ARENA',
        category: 'Community',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop',
        status: 'OPEN',
        eligibility: 'ALL OPERATORS',
        description: 'Drop in with your squad to test new tactics against top local teams. Perfect for practice and community building.',
        color: 'zinc'
    }
];

export function UpcomingEvents() {
    const [activeTab, setActiveTab] = useState('All Events');

    const filteredEvents = EVENTS.filter(event =>
        activeTab === 'All Events' ? true : event.category === activeTab || (activeTab === 'This Week' && event.id === 2)
    );

    return (
        <div className="mb-24 scroll-mt-24" id="events">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
                <div>
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-8 h-px bg-red-600/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">MISSION BRIEFING</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-white">
                        UPCOMING <span className="text-zinc-500">OPERATIONS</span>
                    </h2>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveTab(category)}
                            className={`px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all
                                ${activeTab === category
                                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'}
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredEvents.map((event) => {
                    const isRed = event.color === 'red';
                    const isAmber = event.color === 'amber';
                    const isBlue = event.color === 'blue';

                    return (
                        <div key={event.id} className="bg-zinc-950/80 border border-zinc-800 group hover:border-zinc-600 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row">
                            {/* Image Section */}
                            <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden shrink-0">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />

                                <div className={`absolute top-4 left-4 text-[9px] font-black px-2.5 py-1 uppercase tracking-widest border backdrop-blur-sm
                                    ${isRed ? 'bg-red-950/50 border-red-900 text-red-500' :
                                        isAmber ? 'bg-amber-950/50 border-amber-900 text-amber-500' :
                                            isBlue ? 'bg-blue-950/50 border-blue-900 text-blue-500' :
                                                'bg-emerald-950/50 border-emerald-900 text-emerald-500'}
                                `}>
                                    {event.status}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 sm:w-3/5 flex flex-col justify-between relative z-10">
                                {/* Eligibility Badge */}
                                <div className="flex items-center gap-2 mb-4 w-fit px-2 py-0.5 border border-zinc-800 bg-zinc-900/50">
                                    <ShieldAlert className={`w-3 h-3 ${isAmber ? 'text-amber-500' : 'text-zinc-500'}`} />
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${isAmber ? 'text-amber-500' : 'text-zinc-400'}`}>
                                        REQ: {event.eligibility}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white mb-2 group-hover:text-red-500 transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-relaxed mb-6 line-clamp-2">
                                        {event.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-3 pb-5 border-b border-zinc-900">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="w-3.5 h-3.5 text-zinc-500" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-3.5 h-3.5 text-zinc-500" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 col-span-2">
                                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-300">{event.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Button className="flex-1 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-[10px] rounded-none h-10 transition-colors">
                                            RESERVE SPOT
                                        </Button>
                                        <Button variant="outline" className="shrink-0 w-10 h-10 border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-white rounded-none p-0 transition-colors flex items-center justify-center">
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
