import { useState, useEffect } from 'react';
import { X, Copy, CheckCircle, Phone, CreditCard, ChevronRight, ShieldCheck, AlertCircle, Smartphone, Wallet } from 'lucide-react';
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
  const [phoneNumber, setPhoneNumber] = useState(customerPhone);
  const [showInstructions, setShowInstructions] = useState(false);
  const [paymentInstructions, setPaymentInstructions] = useState<{
    success: boolean;
    instructions: string;
    tillNumber: string;
    reference: string;
  } | null>(null);
  const [transactionCode, setTransactionCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Restore scrolling
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleGenerateInstructions = async () => {
    if (!phoneNumber || phoneNumber.trim().length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const instructions = mpesaService.generatePaymentInstructions({
        amount,
        phoneNumber,
        orderId,
        customerName
      });

      if (instructions.success) {
        setPaymentInstructions(instructions);
        setShowInstructions(true);
        setCurrentStep(2);
        toast.success('Payment instructions generated successfully');
      } else {
        toast.error(instructions.instructions);
      }
    } catch (error) {
      console.error('Payment instruction error:', error);
      toast.error('Failed to generate payment instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Till number copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast.error('Failed to copy to clipboard');
    });
  };

  const handleConfirmPayment = () => {
    if (!transactionCode.trim() || transactionCode.trim().length < 8) {
      toast.error('Please enter a valid M-Pesa transaction code (minimum 8 characters)');
      return;
    }

    toast.success('Payment verification successful!');
    onPaymentComplete(transactionCode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        // Close modal when clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-zinc-950 border-2 border-zinc-800 w-full sm:max-w-md sm:w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto scrollbar-hide relative rounded-t-2xl sm:rounded-none my-auto"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', ...(window.innerWidth >= 640 && { clipPath: 'polygon(0 0, 96% 0, 100% 4%, 100% 100%, 4% 100%, 0 96%)' }) }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 md:p-6 border-b border-zinc-900 bg-zinc-900/50 sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-red-600/10 border border-red-600/20">
              <CreditCard className="h-5 w-5 sm:h-5 sm:w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black italic uppercase tracking-tighter text-white">M-PESA <span className="text-red-600">GATEWAY</span></h2>
              <p className="text-[9px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest">Secure Tactical Transaction</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 sm:p-2.5 hover:bg-zinc-800 text-zinc-500 hover:text-red-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
            <X className="h-5 w-5 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-4 sm:px-5 md:px-6 pt-4 sm:pt-5 md:pt-6">
          <div className="flex items-center justify-between mb-3">
            {[
              { num: 1, label: 'Phone', icon: Phone },
              { num: 2, label: 'Pay', icon: Wallet },
              { num: 3, label: 'Confirm', icon: CheckCircle }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all ${currentStep >= step.num
                    ? 'border-red-600 bg-red-600/20 text-red-600'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-600'
                    }`}>
                    {currentStep > step.num ? (
                      <CheckCircle className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    ) : (
                      <step.icon className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    )}
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-black uppercase mt-1.5 ${currentStep >= step.num ? 'text-red-600' : 'text-zinc-600'
                    }`}>{step.label}</span>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-0.5 mx-1.5 sm:mx-2 transition-all ${currentStep > step.num ? 'bg-red-600' : 'bg-zinc-800'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Payment Details Card */}
          <div className="bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 border border-zinc-800 p-4 sm:p-5 space-y-3 sm:space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <ShieldCheck className="h-20 w-20 sm:h-24 sm:w-24 text-red-600" />
            </div>
            <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center pb-2.5 sm:pb-3 border-b border-zinc-800/50">
                <span className="text-[11px] sm:text-[12px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
                  <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  AMOUNT TO PAY
                </span>
                <span className="text-3xl sm:text-4xl font-black italic text-red-600">KSh {amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-[11px] font-black text-zinc-600 uppercase tracking-widest">Order ID</span>
                <span className="text-[11px] sm:text-[12px] font-black text-white uppercase font-mono">SESSION-{orderId.slice(0, 8)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-[11px] font-black text-zinc-600 uppercase tracking-widest">Recipient</span>
                <span className="text-[11px] sm:text-[12px] font-black text-white uppercase">{mpesaService.getBusinessName()}</span>
              </div>
            </div>
          </div>

          {!showInstructions ? (
            /* Phone Number Input */
            <div className="space-y-4 sm:space-y-5">
              <div className="bg-zinc-900/30 border border-zinc-800/50 p-4 sm:p-4 rounded-sm">
                <div className="flex items-start gap-2 sm:gap-2.5 mb-3">
                  <AlertCircle className="h-4 w-4 sm:h-4 sm:w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] sm:text-[12px] font-bold text-blue-400 uppercase tracking-wide mb-1">Important</p>
                    <p className="text-[10px] sm:text-[11px] text-zinc-400 leading-relaxed">
                      Enter your M-Pesa registered phone number. You'll receive payment instructions to complete the transaction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                <label className="text-[11px] sm:text-[12px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Smartphone className="h-4 w-4 sm:h-4 sm:w-4 text-red-600" />
                  M-PESA PHONE NUMBER
                </label>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0712345678"
                  maxLength={10}
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 h-14 sm:h-16 font-black text-xl sm:text-2xl tracking-wider text-center"
                />
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 flex-1 rounded-full transition-all ${phoneNumber.length >= 10 ? 'bg-green-600' : phoneNumber.length >= 7 ? 'bg-yellow-600' : 'bg-zinc-800'
                    }`} />
                  <span className="text-[9px] sm:text-[10px] font-bold text-zinc-600 uppercase">
                    {phoneNumber.length}/10
                  </span>
                </div>
              </div>

              <Button
                onClick={handleGenerateInstructions}
                disabled={loading || !phoneNumber || phoneNumber.length < 10}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black uppercase tracking-[0.2em] rounded-none py-6 sm:py-7 shadow-[0_0_20px_rgba(220,38,38,0.2)] group transition-all text-sm sm:text-base min-h-[56px]"
              >
                <span className="group-hover:scale-110 transition-transform flex items-center gap-2 justify-center">
                  {loading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      INITIALIZING...
                    </>
                  ) : (
                    <>
                      GENERATE INSTRUCTIONS <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </span>
              </Button>
            </div>
          ) : (
            /* Payment Instructions */
            <div className="space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-bottom-4">
              {/* Success Alert */}
              <div className="bg-green-600/10 border border-green-600/30 p-4 sm:p-4 rounded-sm">
                <div className="flex items-start gap-2 sm:gap-2.5">
                  <CheckCircle className="h-4 w-4 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[11px] sm:text-[12px] font-bold text-green-400 uppercase tracking-wide mb-1">Instructions Generated</p>
                    <p className="text-[10px] sm:text-[11px] text-green-300/80 leading-relaxed">
                      Follow the steps below to complete your M-Pesa payment
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-3 sm:space-y-3.5">
                <h3 className="text-[12px] sm:text-[13px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <div className="h-0.5 w-6 sm:w-8 bg-red-600" />
                  PAYMENT STEPS
                </h3>

                <div className="space-y-2 sm:space-y-2.5">
                  {[
                    { step: '01', text: 'Open M-Pesa on your phone', icon: Smartphone },
                    { step: '02', text: 'Select "Lipa na M-Pesa"', icon: Phone },
                    { step: '03', text: 'Select "Buy Goods and Services"', icon: Wallet },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-3 sm:gap-3.5 bg-zinc-900/40 border border-zinc-800/50 p-3 sm:p-3.5 group hover:border-zinc-700 transition-colors">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-red-600/20 border border-red-600/30 text-red-600 font-black text-[11px] sm:text-[12px]">
                        {item.step}
                      </div>
                      <item.icon className="h-4 w-4 sm:h-4 sm:w-4 text-zinc-600 group-hover:text-zinc-500 transition-colors flex-shrink-0" />
                      <span className="text-[11px] sm:text-[12px] font-bold text-zinc-300 uppercase tracking-wide">{item.text}</span>
                    </div>
                  ))}

                  {/* Till Number - Highlighted */}
                  <div className="bg-gradient-to-br from-red-600/10 to-red-600/5 border-2 border-red-600/30 p-4 sm:p-5 mt-3">
                    <div className="flex items-center gap-3 sm:gap-3.5 mb-3 sm:mb-4">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-red-600 text-white font-black text-[11px] sm:text-[12px]">
                        04
                      </div>
                      <span className="text-[11px] sm:text-[12px] font-black text-white uppercase tracking-widest">Enter Till Number</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex-1 bg-black border border-red-600/50 px-3 py-4 sm:px-4 sm:py-5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-red-600/5 animate-pulse" />
                        <code className="relative z-10 block text-center font-black text-3xl sm:text-4xl md:text-5xl tracking-[0.3em] text-red-600">
                          {paymentInstructions?.tillNumber}
                        </code>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => paymentInstructions?.tillNumber && copyToClipboard(paymentInstructions.tillNumber)}
                        className="h-auto py-5 sm:py-6 px-4 sm:px-5 border-red-600/30 hover:border-red-600 hover:bg-red-600/10 transition-all min-w-[56px]"
                      >
                        {copied ? (
                          <CheckCircle className="h-6 w-6 sm:h-6 sm:w-6 text-green-500" />
                        ) : (
                          <Copy className="h-6 w-6 sm:h-6 sm:w-6 text-red-600" />
                        )}
                      </Button>
                    </div>
                    {copied && (
                      <p className="text-[9px] sm:text-[10px] text-green-500 font-bold uppercase tracking-wide mt-2 text-center animate-in fade-in">
                        ✓ Copied to clipboard
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 sm:gap-3.5 bg-zinc-900/40 border border-zinc-800/50 p-3 sm:p-3.5">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-red-600/20 border border-red-600/30 text-red-600 font-black text-[11px] sm:text-[12px]">
                      05
                    </div>
                    <Wallet className="h-4 w-4 sm:h-4 sm:w-4 text-zinc-600 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12px] font-bold text-zinc-300 uppercase tracking-wide flex-1">Enter Amount</span>
                    <span className="text-base sm:text-lg font-black text-red-600">KSh {amount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-3.5 bg-zinc-900/40 border border-zinc-800/50 p-3 sm:p-3.5">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-red-600/20 border border-red-600/30 text-red-600 font-black text-[11px] sm:text-[12px]">
                      06
                    </div>
                    <ShieldCheck className="h-4 w-4 sm:h-4 sm:w-4 text-zinc-600 flex-shrink-0" />
                    <span className="text-[11px] sm:text-[12px] font-bold text-zinc-300 uppercase tracking-wide">Enter PIN & Confirm</span>
                  </div>
                </div>
              </div>

              {/* Transaction Code Input */}
              <div className="space-y-4 sm:space-y-4.5 pt-4 sm:pt-5 border-t-2 border-zinc-800">
                <div className="bg-blue-600/10 border border-blue-600/30 p-3 sm:p-3.5 rounded-sm">
                  <div className="flex items-start gap-2 sm:gap-2.5">
                    <AlertCircle className="h-4 w-4 sm:h-4 sm:w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] sm:text-[11px] text-blue-300/90 leading-relaxed">
                      After completing the payment, you'll receive an SMS with a transaction code (e.g., QGH7X8Y9Z1). Enter it below to confirm.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-3.5">
                  <label className="text-[11px] sm:text-[12px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 sm:h-4 sm:w-4 text-red-600" />
                    M-PESA TRANSACTION CODE
                  </label>
                  <Input
                    type="text"
                    value={transactionCode}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      setTransactionCode(value);
                      if (value.length >= 8) {
                        setCurrentStep(3);
                      }
                    }}
                    placeholder="QGH7X8Y9Z1"
                    maxLength={10}
                    className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 h-14 sm:h-16 font-black text-xl sm:text-2xl tracking-[0.3em] text-center uppercase"
                  />
                  <div className="flex items-center gap-2">
                    <div className={`h-1.5 flex-1 rounded-full transition-all ${transactionCode.length >= 10 ? 'bg-green-600' :
                      transactionCode.length >= 8 ? 'bg-yellow-600' :
                        'bg-zinc-800'
                      }`} />
                    <span className="text-[9px] sm:text-[10px] font-bold text-zinc-600 uppercase">
                      {transactionCode.length >= 8 ? '✓ Valid' : `${transactionCode.length}/10`}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:gap-3.5 pt-3 sm:pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowInstructions(false);
                      setCurrentStep(1);
                      setTransactionCode('');
                    }}
                    className="w-full py-5 sm:py-5 text-xs sm:text-sm font-black uppercase tracking-wider border-zinc-700 hover:border-zinc-600 hover:bg-zinc-900 min-h-[56px]"
                  >
                    ← BACK
                  </Button>
                  <Button
                    onClick={handleConfirmPayment}
                    disabled={!transactionCode.trim() || transactionCode.length < 8}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 text-white font-black uppercase tracking-[0.2em] rounded-none py-6 sm:py-7 shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all text-sm sm:text-base min-h-[56px]"
                  >
                    <span className="flex items-center gap-2 justify-center">
                      <CheckCircle className="h-5 w-5 sm:h-5 sm:w-5" />
                      VERIFY & COMPLETE
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="bg-zinc-900/30 border border-zinc-800/50 p-3 sm:p-3.5 rounded-sm">
            <p className="text-[9px] sm:text-[10px] font-bold text-zinc-600 text-center uppercase tracking-widest leading-relaxed">
              Need help? Contact support if you encounter any issues with your payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}