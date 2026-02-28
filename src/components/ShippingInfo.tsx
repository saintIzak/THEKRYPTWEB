import { Truck, Clock, MapPin, Shield } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

interface ShippingInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShippingInfo({ isOpen, onClose }: ShippingInfoProps) {
  const shippingOptions = [
    {
      name: 'TACTICAL DEPLOYMENT',
      time: '3-5 BUSINESS DAYS',
      cost: 'KSh 200',
      description: 'Standard logistics to your designated sector.'
    },
    {
      name: 'RAPID RESPONSE',
      time: '1-2 BUSINESS DAYS',
      cost: 'KSh 500',
      description: 'High-priority transport for urgent acquisitions.'
    },
    {
      name: 'INSTANT DROP',
      time: 'WITHIN 24 HOURS',
      cost: 'KSh 800',
      description: 'Nairobi Sector only. Immediate gear deployment.'
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-zinc-950 border-l border-zinc-800 text-white">
        <SheetHeader className="border-b border-zinc-900 pb-4 sm:pb-6">
          <SheetTitle className="flex items-center gap-3 text-white font-black italic uppercase tracking-tighter text-xl sm:text-2xl">
            <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            LOGISTICS <span className="text-red-600">INTEL</span>
          </SheetTitle>
          <p className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Asset transport protocols and sectors</p>
        </SheetHeader>

        <div className="mt-10 space-y-8 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 scrollbar-hide">
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest border-l-2 border-red-600 pl-3">AVAILABLE PROTOCOLS</h3>
            <div className="space-y-4">
              {shippingOptions.map((option, index) => (
                <div key={index} className="bg-zinc-900/30 border border-zinc-900 p-6 space-y-3 group hover:border-red-600/50 transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 92% 100%, 0 100%)' }}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white group-hover:text-red-600 transition-colors">{option.name}</h4>
                    <span className="text-sm font-black italic text-red-600">{option.cost}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{option.time}</span>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed">{option.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-600/5 border border-red-600/20 p-6 space-y-4">
            <h3 className="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              OPERATIONAL SECTORS
            </h3>
            <ul className="text-[10px] font-bold text-zinc-400 space-y-2 uppercase tracking-widest">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600" /> NAIROBI: INSTANT DROP AVAILABLE</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600" /> MOMBASA, KISUMU: 1-2 BUSINESS DAYS</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600" /> MAJOR TOWNS: 3-5 BUSINESS DAYS</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-red-600" /> REMOTE SECTORS: 5-7 BUSINESS DAYS</li>
            </ul>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-4">
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
              <Shield className="h-3 w-3 text-red-600" />
              CRITICAL NOTES
            </h3>
            <ul className="text-[10px] font-bold text-zinc-500 space-y-2 uppercase tracking-widest">
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> FREE DEPLOYMENT ON ORDERS ABOVE KSH 5,000</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> TIMELINES MAY VARY DURING HIGH-OPS PERIODS</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> SIGNATURE REQUIRED FOR HIGH-VALUE ASSETS</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> CONTACT COMMAND FOR SPECIAL REQUIREMENTS</li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}