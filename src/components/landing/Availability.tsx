import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Monitor, Shield } from 'lucide-react';

type StationStatus = 'available' | 'booked' | 'maintenance';

interface Station {
    id: string;
    name: string;
    type: string;
    status: StationStatus;
    nextFree?: string;
}

const stations: Station[] = [
    { id: 'ps5-1', name: 'PS5 Station 01', type: 'PS5 / FIFA', status: 'available' },
    { id: 'ps5-2', name: 'PS5 Station 02', type: 'PS5 / All Games', status: 'booked', nextFree: '4:00 PM' },
    { id: 'ps5-3', name: 'PS5 Station 03', type: 'PS5 / All Games', status: 'available' },
    { id: 'ps5-4', name: 'PS5 Station 04', type: 'PS5 / All Games', status: 'available' },
    { id: 'console-1', name: 'Console Station 01', type: 'Xbox / All Games', status: 'available' },
    { id: 'console-2', name: 'Console Station 02', type: 'Xbox / All Games', status: 'booked', nextFree: '5:30 PM' },
    { id: 'vr-1', name: 'VR Station', type: 'VR Experience', status: 'available' },
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

const statusConfig: Record<StationStatus, { label: string; dot: string; text: string; bg: string }> = {
    available: { label: 'Available', dot: 'bg-emerald-500', text: 'text-emerald-400', bg: 'border-emerald-500/20 bg-emerald-500/5' },
    booked: { label: 'Booked', dot: 'bg-red-500', text: 'text-red-400', bg: 'border-red-500/20 bg-red-500/5' },
    maintenance: { label: 'Maintenance', dot: 'bg-amber-500', text: 'text-amber-400', bg: 'border-amber-500/20 bg-amber-500/5' },
};

export default function Availability() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    const available = stations.filter(s => s.status === 'available').length;

    return (
        <section ref={ref} id="availability" className="py-28 bg-zinc-950/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
                >
                    <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-red-500 mb-3">Live Availability</p>
                        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white leading-none">
                            <span className="text-emerald-400">{available} stations</span> ready now
                        </h2>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                        {(['available', 'booked'] as StationStatus[]).map(s => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${statusConfig[s].dot}`} />
                                <span className="text-zinc-500 capitalize text-xs font-bold">{statusConfig[s].label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Stations list */}
                    <div className="lg:col-span-2 space-y-3">
                        {stations.map((station, i) => {
                            const cfg = statusConfig[station.status];
                            return (
                                <motion.div
                                    key={station.id}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: i * 0.07, duration: 0.4 }}
                                    className={`flex items-center justify-between p-4 border ${cfg.bg} transition-all`}
                                >
                                    <div className="flex items-center gap-4">
                                        {station.type.includes('VR') ? (
                                            <Shield className="h-4 w-4 text-violet-400 flex-shrink-0" />
                                        ) : (
                                            <Monitor className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                                        )}
                                        <div>
                                            <p className="text-sm font-black text-white">{station.name}</p>
                                            <p className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold mt-0.5">{station.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {station.nextFree && (
                                            <span className="text-[10px] text-zinc-600 font-bold">Free at {station.nextFree}</span>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2 w-2 rounded-full ${cfg.dot} ${station.status === 'available' ? 'animate-pulse' : ''}`} />
                                            <span className={`text-[11px] font-black uppercase tracking-wide ${cfg.text}`}>{cfg.label}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                        <Link
                            to="/arcade"
                            className="relative group flex items-center justify-center gap-2 mt-2 p-4 bg-red-600 hover:bg-red-500 text-white text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]"
                        >
                            Book a station now
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Today's time slots */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="bg-zinc-950 border border-zinc-800 p-6 h-full"
                        >
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-6">Today's Time Slots</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {timeSlots.map((slot, i) => {
                                    const taken = i < 2 || i === 4;
                                    return (
                                        <button
                                            key={slot}
                                            disabled={taken}
                                            className={`py-3 text-[11px] font-bold uppercase tracking-wider border transition-all
                                                ${taken
                                                    ? 'border-zinc-900 text-zinc-700 bg-zinc-900/50 cursor-not-allowed line-through'
                                                    : 'border-zinc-800 text-zinc-300 hover:border-red-500/50 hover:text-white hover:bg-red-600/5 cursor-pointer'}`}
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="mt-6 text-[10px] text-zinc-700 font-bold uppercase tracking-widest text-center">
                                Open 9AM – 9:30PM daily
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
