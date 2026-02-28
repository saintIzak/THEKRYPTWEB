import { RotateCcw, CheckCircle, Clock, Shield } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

interface ReturnsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Returns({ isOpen, onClose }: ReturnsProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-zinc-950 border-l border-zinc-800 text-white">
        <SheetHeader className="border-b border-zinc-900 pb-4 sm:pb-6">
          <SheetTitle className="flex items-center gap-3 text-white font-black italic uppercase tracking-tighter text-xl sm:text-2xl">
            <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
            RECALL <span className="text-red-600">PROTOCOL</span>
          </SheetTitle>
          <p className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Asset return and credit restoration</p>
        </SheetHeader>

        <div className="mt-10 space-y-8 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 scrollbar-hide">
          <div className="bg-red-600/5 border border-red-600/20 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CheckCircle className="h-12 w-12 text-red-600" />
            </div>
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <CheckCircle className="h-5 w-5 text-red-600" />
              <h3 className="text-xs font-black uppercase tracking-widest text-white">30-DAY RECALL WINDOW</h3>
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed relative z-10">
              Return assets within 30 days of deployment for full credit restoration.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest border-l-2 border-red-600 pl-3">RECALL PROCESS</h3>
            <div className="space-y-4">
              {[
                { step: '01', title: 'CONTACT COMMAND', desc: 'Email returns@thekrypt.com with your manifest ID.' },
                { step: '02', title: 'RECEIVE LABEL', desc: 'Authorized return shipping label will be issued.' },
                { step: '03', title: 'SECURE ASSET', desc: 'Package gear securely with original tactical casing.' },
                { step: '04', title: 'CREDIT RESTORED', desc: 'Refund processed within 3-5 cycles after inspection.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-zinc-900/30 border border-zinc-900 p-4 group hover:border-red-600/50 transition-colors">
                  <div className="text-sm font-black text-red-600 italic">{item.step}</div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-red-600 transition-colors">{item.title}</p>
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest border-l-2 border-red-600 pl-3">ASSET CONDITIONS</h3>
            <div className="space-y-3">
              {[
                'ASSET MUST BE IN ORIGINAL OPERATIONAL STATE',
                'ALL TACTICAL ACCESSORIES & PACKAGING INCLUDED',
                'NO SIGNS OF COMBAT DAMAGE OR MISUSE'
              ].map((condition, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  <CheckCircle className="h-3 w-3 text-red-600" />
                  <span>{condition}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-[10px] font-black text-white uppercase tracking-widest">NON-RECALLABLE ASSETS</h3>
                <ul className="text-[10px] font-bold text-zinc-600 mt-3 space-y-2 uppercase tracking-widest">
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> DIGITAL CREDITS & GIFT CARDS</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> CUSTOMIZED TACTICAL GEAR</li>
                  <li className="flex items-center gap-2"><div className="w-1 h-1 bg-zinc-700" /> ASSETS DAMAGED BY OPERATOR ERROR</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-600/5 border border-red-600/20 p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="h-4 w-4 text-red-600" />
              <h3 className="text-[10px] font-black text-white uppercase tracking-widest">RESTORATION TIMELINE</h3>
            </div>
            <ul className="text-[10px] font-bold text-zinc-500 space-y-2 uppercase tracking-widest">
              <li className="flex justify-between"><span>CREDIT CARDS:</span> <span className="text-white">3-5 CYCLES</span></li>
              <li className="flex justify-between"><span>M-PESA:</span> <span className="text-white">1-2 CYCLES</span></li>
              <li className="flex justify-between"><span>BANK TRANSFER:</span> <span className="text-white">5-7 CYCLES</span></li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}