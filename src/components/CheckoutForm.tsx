import { useState } from 'react';
import { X, Shield, ChevronRight, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CartItem } from '../types/product';
import { supabase } from '../lib/supabase';
import MpesaPaymentModal from './MpesaPaymentModal';
import { mpesaService } from '../lib/mpesa';
import { toast } from 'sonner';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

export default function CheckoutForm({ isOpen, onClose, cartItems, onOrderComplete }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    orderNotes: '',
  });
  const [shippingMethod, setShippingMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const getShippingCost = () => {
    switch (shippingMethod) {
      case 'nairobi-county': return 300;
      case 'outside-nairobi': return 500;
      case 'nairobi-cbd': return 100;
      case 'shop-pickup': return 0;
      default: return 0;
    }
  };

  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;

  const isOutsideNairobi = formData.city.toLowerCase().includes('outside') ||
    !formData.city.toLowerCase().includes('nairobi');

  const sendVerificationEmail = async () => {
    if (!formData.email) return;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);
    setLoading(true);

    try {
      const response = await fetch('/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          code: code
        })
      });

      if (response.ok) {
        setShowCodeInput(true);
        toast.success('Verification code sent to your email!');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.log('Verification code:', code);
      setShowCodeInput(true);
      toast.info(`Email service unavailable. Your code is: ${code}`);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = () => {
    if (verificationCode === sentCode) {
      setEmailVerified(true);
      setShowCodeInput(false);
      toast.success('Email verified successfully!');
    } else {
      toast.error('Invalid verification code. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailVerified) {
      toast.error('Please verify your email address first.');
      return;
    }

    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions.');
      return;
    }

    if (!shippingMethod) {
      toast.error('Please select a delivery method.');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    setLoading(true);

    try {
      // Save customer information
      const { error: customerError } = await supabase
        .from('customers')
        .upsert({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          city: formData.city,
        }, {
          onConflict: 'email'
        });

      if (customerError) {
        console.error('Customer save error:', customerError);
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          customer_phone: formData.phone,
          delivery_address: `${formData.city}${formData.orderNotes ? ' - ' + formData.orderNotes : ''}`,
          shipping_method: shippingMethod,
          payment_method: paymentMethod,
          shipping_cost: shippingCost,
          total_amount: total,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw orderError;
      }

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Handle different payment methods
      if (paymentMethod === 'mpesa-till') {
        setPendingOrderId(order.id);
        setShowMpesaModal(true);
      } else {
        toast.success(`Order placed successfully! Order ID: ${order.id.slice(0, 8)}`);
        onOrderComplete();
        onClose();
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(`Failed to place order: ${(error as Error).message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMpesaPaymentComplete = async (transactionId: string) => {
    if (!pendingOrderId) return;

    try {
      // Update order with M-Pesa transaction details
      const { error } = await supabase
        .from('orders')
        .update({
          payment_status: 'completed',
          transaction_id: transactionId,
          payment_completed_at: new Date().toISOString()
        })
        .eq('id', pendingOrderId);

      if (error) throw error;

      toast.success(`Payment successful! Transaction ID: ${transactionId}`);
      onOrderComplete();
      onClose();
    } catch (error) {
      console.error('Error updating payment:', error);
      toast.error('Payment recorded but failed to update order. Please contact support.');
    } finally {
      setShowMpesaModal(false);
      setPendingOrderId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-950 border-2 border-zinc-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide relative" style={{ clipPath: 'polygon(0 0, 96% 0, 100% 4%, 100% 100%, 4% 100%, 0 96%)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-zinc-900 bg-zinc-900/50">
          <div>
            <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-white">PAY & <span className="text-red-600">CONFIRM</span></h2>
            <p className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Complete your order</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 text-zinc-500 hover:text-red-600 transition-colors">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="px-6 sm:px-8 py-3 sm:py-4 border-b border-zinc-900 bg-red-600/5">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-600" />
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-red-600">SECURE ENCRYPTION</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-600" />
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-red-600">AUTHORIZED ACCESS</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          {/* Customer Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-red-600" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white">CUSTOMER INFORMATION</h3>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">FIRST NAME</label>
                <Input
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="OPERATOR NAME"
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">LAST NAME</label>
                <Input
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="SURNAME"
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">EMAIL ADDRESS</label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="OPERATOR@THEKRYPT.COM"
                    className="flex-1 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={sendVerificationEmail}
                    disabled={!formData.email || emailVerified || showCodeInput}
                    className="h-auto px-6"
                  >
                    {emailVerified ? 'VERIFIED' : 'SEND CODE'}
                  </Button>
                </div>
                {showCodeInput && (
                  <div className="flex gap-2 animate-in slide-in-from-top-2">
                    <Input
                      type="text"
                      placeholder="ENTER 6-DIGIT CODE"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      maxLength={6}
                      className="flex-1 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={verifyCode}
                      disabled={verificationCode.length !== 6}
                      className="h-auto px-6"
                    >
                      VERIFY
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">PHONE NUMBER</label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+254 7XX XXX XXX"
                  className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CITY / LOCATION</label>
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full h-10 px-3 bg-zinc-900 border border-zinc-800 text-white text-sm rounded-none focus:outline-none focus:border-red-600 uppercase font-black"
                >
                  <option value="">SELECT SECTOR</option>
                  <option value="Nairobi CBD">NAIROBI CBD</option>
                  <option value="Nairobi County">NAIROBI COUNTY</option>
                  <option value="Outside Nairobi">OUTSIDE NAIROBI</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">ORDER NOTES (OPTIONAL)</label>
                <textarea
                  rows={3}
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  placeholder="DELIVERY INSTRUCTIONS..."
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:outline-none focus:border-red-600 text-sm font-black uppercase"
                />
              </div>
            </div>
          </div>

          {/* Your Order */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-red-600" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white">YOUR ORDER</h3>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-900 p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-zinc-400">{item.product.name} <span className="text-red-600 ml-2">x{item.quantity}</span></span>
                  <span className="text-xs font-black text-white">KSh {(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-zinc-800 pt-4 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  <span>SUBTOTAL</span>
                  <span>KSh {subtotal.toLocaleString()}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <span>SHIPPING</span>
                    <span>KSh {shippingCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-4 border-t border-zinc-800">
                  <span className="text-xl font-black italic uppercase tracking-tighter text-white">TOTAL PAYABLE</span>
                  <span className="text-xl font-black italic uppercase tracking-tighter text-red-600">KSh {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-red-600" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white">DELIVERY METHOD</h3>
            </div>
            <div className="grid gap-4">
              {[
                { id: 'nairobi-cbd', label: 'NAIROBI CBD', desc: 'SAME DAY DELIVERY', cost: 100 },
                { id: 'nairobi-county', label: 'NAIROBI COUNTY', desc: '1-2 BUSINESS DAYS', cost: 300 },
                { id: 'outside-nairobi', label: 'OUTSIDE NAIROBI', desc: '3-5 BUSINESS DAYS', cost: 500 },
                { id: 'shop-pickup', label: 'STORE PICKUP', desc: 'COLLECT FROM SHOP', cost: 0 }
              ].map((method) => (
                <label key={method.id} className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${shippingMethod === method.id ? 'border-red-600 bg-red-600/5' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'}`}>
                  <input
                    type="radio"
                    name="shipping"
                    value={method.id}
                    checked={shippingMethod === method.id}
                    onChange={(e) => setShippingMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 flex items-center justify-center ${shippingMethod === method.id ? 'border-red-600' : 'border-zinc-700'}`}>
                    {shippingMethod === method.id && <div className="w-2 h-2 bg-red-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-black uppercase tracking-widest text-white">{method.label}</div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{method.desc}</div>
                  </div>
                  <div className="text-xs font-black text-red-600 uppercase">{method.cost === 0 ? 'FREE' : `KSh ${method.cost}`}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-red-600" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white">PAYMENT METHOD</h3>
            </div>
            <div className="grid gap-4">
              <label className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${paymentMethod === 'cash-on-delivery' ? 'border-red-600 bg-red-600/5' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'} ${(isOutsideNairobi && !!formData.city) ? 'opacity-30 cursor-not-allowed' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cash-on-delivery"
                  checked={paymentMethod === 'cash-on-delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="sr-only"
                  disabled={isOutsideNairobi && !!formData.city}
                />
                <div className={`w-4 h-4 border-2 flex items-center justify-center ${paymentMethod === 'cash-on-delivery' ? 'border-red-600' : 'border-zinc-700'}`}>
                  {paymentMethod === 'cash-on-delivery' && <div className="w-2 h-2 bg-red-600" />}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black uppercase tracking-widest text-white">CASH ON DELIVERY</div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    {isOutsideNairobi && formData.city ? 'UNAVAILABLE OUTSIDE NAIROBI' : 'PAY WHEN YOU RECEIVE'}
                  </div>
                </div>
              </label>

              <label className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${paymentMethod === 'pay-on-order' ? 'border-red-600 bg-red-600/5' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'}`}>
                <input
                  type="radio"
                  name="payment"
                  value="pay-on-order"
                  checked={paymentMethod === 'pay-on-order'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border-2 flex items-center justify-center ${paymentMethod === 'pay-on-order' ? 'border-red-600' : 'border-zinc-700'}`}>
                  {paymentMethod === 'pay-on-order' && <div className="w-2 h-2 bg-red-600" />}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-black uppercase tracking-widest text-white">PAY NOW</div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">BANK TRANSFER</div>
                </div>
              </label>

              {mpesaService.isConfigured() && (
                <label className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${paymentMethod === 'mpesa-till' ? 'border-red-600 bg-red-600/10' : 'border-zinc-900 bg-zinc-900/30 hover:border-zinc-800'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="mpesa-till"
                    checked={paymentMethod === 'mpesa-till'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 flex items-center justify-center ${paymentMethod === 'mpesa-till' ? 'border-red-600' : 'border-zinc-700'}`}>
                    {paymentMethod === 'mpesa-till' && <div className="w-2 h-2 bg-red-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2">
                      M-PESA <span className="bg-red-600 text-white text-[8px] px-2 py-0.5">FASTEST</span>
                    </div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">TILL NUMBER: {mpesaService.getTillNumber()}</div>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-4 p-4 bg-zinc-900/30 border border-zinc-900">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 bg-zinc-900 border-zinc-800 text-red-600 focus:ring-red-600 rounded-none"
            />
            <label htmlFor="terms" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
              I AGREE TO THE <a href="#" className="text-red-600 hover:underline">TERMS & CONDITIONS</a> AND <a href="#" className="text-red-600 hover:underline">PRIVACY POLICY</a>
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:flex-1 py-6 sm:py-8 text-sm sm:text-base"
            >
              ABORT
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-[2] bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] rounded-none py-6 sm:py-8 text-sm sm:text-base shadow-[0_0_30px_rgba(220,38,38,0.3)] group"
            >
              <span className="group-hover:scale-110 transition-transform flex items-center justify-center gap-2">
                {loading ? 'PROCESSING...' : `PAY & CONFIRM - KSh ${total.toLocaleString()}`} <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </Button>
          </div>
        </form>
      </div>

      {/* M-Pesa Payment Modal */}
      {showMpesaModal && pendingOrderId && (
        <MpesaPaymentModal
          isOpen={showMpesaModal}
          onClose={() => {
            setShowMpesaModal(false);
            setPendingOrderId(null);
          }}
          amount={total}
          orderId={pendingOrderId}
          customerName={`${formData.firstName} ${formData.lastName}`}
          customerPhone={formData.phone}
          onPaymentComplete={handleMpesaPaymentComplete}
        />
      )}
    </div>
  );
}