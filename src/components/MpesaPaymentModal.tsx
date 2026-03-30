import { useState, useEffect } from 'react';
import { X, CheckCircle, Smartphone, CreditCard, ChevronRight, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { mpesaService } from '../lib/mpesa';
import { toast } from 'sonner';

interface MpesaPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  customerName: string;
  customerPhone: string;
  onPaymentComplete: (transactionId: string) => void;
}

export default function MpesaPaymentModal({
  isOpen,
  onClose,
  amount,
  orderId,
  customerName,
  customerPhone,
  onPaymentComplete
}: MpesaPaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState(customerPhone || '');
  const [loading, setLoading] = useState(false);
  const [stkSent, setStkSent] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'PENDING' | 'COMPLETED' | 'FAILED'>('PENDING');
  const [transactionCode, setTransactionCode] = useState('');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleInitiateSTK = async () => {
    if (!phoneNumber || phoneNumber.trim().length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await mpesaService.initiateStkPush({
        amount,
        phoneNumber,
        orderId,
        customerName
      });

      if (response.success && response.checkoutRequestId) {
        setStkSent(true);
        toast.success(response.message);
        pollPaymentStatus(response.checkoutRequestId);
      } else {
        toast.error(response.message || 'Failed to initiate STK push');
      }
    } catch (error) {
      console.error('STK init error:', error);
      toast.error('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (checkoutRequestId: string) => {
    setPaymentStatus('PENDING');

    // In a real app, you would poll your backend or use websockets
    // until Safaricom posts the callback.
    // Here we simulate the callback happening after a few seconds.
    const interval = setInterval(async () => {
      try {
        const statusRes = await mpesaService.checkStkStatus(checkoutRequestId);

        if (statusRes.status === 'COMPLETED') {
          clearInterval(interval);
          setPaymentStatus('COMPLETED');
          const simulatedTxId = `QGH${Math.floor(Math.random() * 1000000)}Z1`;
          setTransactionCode(simulatedTxId);
          toast.success('Payment Received!');

          // Auto close after 3s
          setTimeout(() => {
            onPaymentComplete(simulatedTxId);
            onClose();
          }, 3000);
        } else if (statusRes.status === 'FAILED') {
          clearInterval(interval);
          setPaymentStatus('FAILED');
          toast.error('Payment cancelled or failed.');
        }
      } catch (e) {
        console.error(e);
      }
    }, 2000);

    // Stop polling after 60 seconds (timeout)
    setTimeout(() => {
      clearInterval(interval);
      if (paymentStatus === 'PENDING') {
        setPaymentStatus('FAILED');
        toast.error('Payment request timed out.');
      }
    }, 60000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget && !stkSent) {
          onClose(); // Prevent closing if paying
        }
      }}
    >
      <div
        className="bg-zinc-950 border-2 border-zinc-800 w-full sm:max-w-md sm:w-full overflow-hidden relative rounded-t-2xl sm:rounded-none my-auto"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', ...(window.innerWidth >= 640 && { clipPath: 'polygon(0 0, 96% 0, 100% 4%, 100% 100%, 4% 100%, 0 96%)' }) }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-zinc-900 bg-zinc-900/50 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-green-600/10 border border-green-600/20">
              <CreditCard className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-white">M-PESA <span className="text-green-500">EXPRESS</span></h2>
              <p className="text-[9px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest">STK Push Integration</p>
            </div>
          </div>
          {!stkSent && (
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors flex items-center justify-center">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="p-4 sm:p-5 md:p-6 space-y-6">
          {/* Payment Summary */}
          <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800 p-5 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <ShieldCheck className="h-24 w-24 text-green-500" />
            </div>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800/50">
                <span className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  DUE AMOUNT
                </span>
                <span className="text-3xl font-black italic text-green-500">KSh {amount}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black uppercase">
                <span className="text-zinc-600 tracking-widest">Order ID</span>
                <span className="text-white font-mono opacity-80">{orderId}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-black uppercase">
                <span className="text-zinc-600 tracking-widest">Recipient</span>
                <span className="text-white opacity-80">{mpesaService.getBusinessName()}</span>
              </div>
            </div>
          </div>

          {!stkSent ? (
            /* Step 1: Phone Initiation */
            <div className="space-y-6 animate-in fade-in zoom-in-95">
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-sm flex gap-3">
                <Smartphone className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-green-400 uppercase tracking-wide mb-1">STK Push Warning</p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Enter the M-Pesa number making the payment. A prompt will instantly appear on your phone asking for your PIN.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-green-500" />
                  M-PESA NUMBER
                </label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="07XX XXX XXX"
                  maxLength={10}
                  className="bg-black border-zinc-800 text-green-500 placeholder:text-zinc-800 rounded-none focus:border-green-500 h-16 font-black text-2xl tracking-[0.2em] text-center"
                />
              </div>

              <Button
                onClick={handleInitiateSTK}
                disabled={loading || phoneNumber.length < 10}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-[0.2em] rounded-none py-8 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all min-h-[60px]"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <Loader2 className="animate-spin w-5 h-5" /> INITIATING...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    SEND STK PUSH <ChevronRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </div>
          ) : (
            /* Step 2: Polling & Validation */
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
              {paymentStatus === 'PENDING' && (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-zinc-800 border-t-green-500 animate-spin" />
                    <Smartphone className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-green-500 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Awaiting Payment</h3>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest max-w-[250px] mx-auto leading-relaxed">
                      A prompt has been sent to {phoneNumber}. Please enter your M-Pesa PIN on your device.
                    </p>
                  </div>
                </div>
              )}

              {paymentStatus === 'COMPLETED' && (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-8 animate-in zoom-in">
                  <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-green-500 uppercase tracking-widest italic">Confirmed</h3>
                    <p className="text-white font-bold uppercase tracking-widest text-xs">Transaction ID: {transactionCode}</p>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest pt-2">Redirecting to session...</p>
                  </div>
                </div>
              )}

              {paymentStatus === 'FAILED' && (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border-2 border-red-500 text-red-500">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-red-500 uppercase tracking-widest">Payment Failed</h3>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest max-w-[250px] mx-auto">
                      The request timed out or was cancelled.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setStkSent(false);
                      setPaymentStatus('PENDING');
                    }}
                    variant="outline"
                    className="border-zinc-700 text-white font-black uppercase tracking-widest mt-4"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}