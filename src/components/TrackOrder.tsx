import { useState } from 'react';
import { Package, Search, Clock, CheckCircle, Target } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';

interface TrackOrderProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimelineItem {
  status: string;
  date: string;
  completed: boolean;
}

interface TrackingData {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  timeline: TimelineItem[];
}

export default function TrackOrder({ isOpen, onClose }: TrackOrderProps) {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  const handleTrack = () => {
    // Mock tracking data
    setTrackingData({
      orderNumber: orderNumber || 'ORD-2024-001',
      status: 'IN TRANSIT',
      estimatedDelivery: '2024-01-15',
      timeline: [
        { status: 'MANIFEST CREATED', date: '2024-01-10', completed: true },
        { status: 'PROCESSING AT HQ', date: '2024-01-11', completed: true },
        { status: 'DEPARTED FACILITY', date: '2024-01-12', completed: true },
        { status: 'IN TRANSIT', date: '2024-01-13', completed: true },
        { status: 'DELIVERED TO SECTOR', date: '2024-01-15', completed: false }
      ]
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-zinc-950 border-l border-zinc-800 text-white">
        <SheetHeader className="border-b border-zinc-900 pb-4 sm:pb-6">
          <SheetTitle className="flex items-center gap-3 text-white font-black italic uppercase tracking-tighter text-xl sm:text-2xl">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            TRACK <span className="text-red-600">OPS</span>
          </SheetTitle>
          <p className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Monitor asset deployment in real-time</p>
        </SheetHeader>

        <div className="mt-10 space-y-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">MANIFEST NUMBER</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="ENTER ORDER ID"
                className="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-3 text-white placeholder:text-zinc-700 rounded-none focus:outline-none focus:border-red-600 font-black uppercase text-xs"
              />
              <Button onClick={handleTrack} className="bg-red-600 hover:bg-red-700 rounded-none px-6">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {trackingData && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-red-600/5 border border-red-600/20 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Package className="h-12 w-12 text-red-600" />
                </div>
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest text-white">STATUS: {trackingData.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    <span>ESTIMATED ARRIVAL: {trackingData.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest border-l-2 border-red-600 pl-3">DEPLOYMENT TIMELINE</h3>
                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-zinc-800">
                  {trackingData.timeline.map((item: TimelineItem, index: number) => (
                    <div key={index} className="flex items-start gap-6 relative">
                      <div className={`w-6 h-6 rounded-none flex items-center justify-center z-10 rotate-45 border ${item.completed ? 'bg-red-600 border-red-600' : 'bg-zinc-900 border-zinc-800'
                        }`}>
                        {item.completed && <CheckCircle className="h-3 w-3 text-white -rotate-45" />}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <p className={`text-xs font-black uppercase tracking-widest ${item.completed ? 'text-white' : 'text-zinc-600'}`}>
                          {item.status}
                        </p>
                        <p className="text-[10px] font-bold text-zinc-500 mt-1">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}