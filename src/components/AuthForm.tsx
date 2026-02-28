import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { ShieldCheck, Lock, Mail, User, ChevronRight, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showResendButton, setShowResendButton] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    checkAuth();

    // Check for error messages from URL params
    const errorParam = searchParams.get('error');
    if (errorParam === 'verification_failed') {
      setError('Email verification failed. Please try again.');
    }
  }, [navigate, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setShowResendButton(false);

    try {
      if (isSignUp) {
        const { error } = await authService.signUp(email, password, { name });
        if (error) {
          if (error.message.includes('already registered')) {
            setError('This email is already registered. Please sign in instead.');
          } else {
            throw error;
          }
        } else {
          setMessage('Check your email for verification link!');
          setShowResendButton(true);
        }
      } else {
        const { error } = await authService.signIn(email, password);
        if (error) {
          if (error.message.includes('Email not confirmed')) {
            setError('Please verify your email before signing in.');
            setShowResendButton(true);
          } else if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password.');
          } else {
            throw error;
          }
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { error } = await authService.resendVerification(email);
      if (error) throw error;
      setMessage('Verification email sent! Check your inbox.');
      setShowResendButton(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-950 border-2 border-zinc-800 p-6 sm:p-10 relative overflow-hidden" style={{ clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)' }}>
      {/* HUD Elements */}
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <ShieldCheck className="h-12 w-12 sm:h-16 sm:w-16 text-red-600" />
      </div>

      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-3xl font-black italic uppercase tracking-tighter text-white">
          {isSignUp ? (
            <>RECRUIT <span className="text-red-600">ENROLLMENT</span></>
          ) : (
            <>OPERATOR <span className="text-red-600">ACCESS</span></>
          )}
        </h2>
        <p className="text-[8px] sm:text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">
          {isSignUp ? 'Join the elite ranks of THE KRYPT' : 'Authorized personnel only'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {isSignUp && (
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <User className="h-3 w-3 text-red-600" />
              OPERATOR NAME
            </label>
            <Input
              type="text"
              placeholder="FULL NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 font-black uppercase"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Mail className="h-3 w-3 text-red-600" />
            IDENTIFICATION (EMAIL)
          </label>
          <Input
            type="email"
            placeholder="OPERATOR@THEKRYPT.COM"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 font-black uppercase"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Lock className="h-3 w-3 text-red-600" />
            ACCESS CODE (PASSWORD)
          </label>
          <Input
            type="password"
            placeholder="MIN. 6 CHARACTERS"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-700 rounded-none focus:border-red-600 font-black uppercase"
            minLength={6}
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] rounded-none py-6 sm:py-8 text-sm sm:text-base shadow-[0_0_20px_rgba(220,38,38,0.2)] group"
        >
          <span className="group-hover:scale-110 transition-transform flex items-center gap-2">
            {loading ? 'PROCESSING...' : (isSignUp ? 'INITIALIZE ENROLLMENT' : 'AUTHORIZE ACCESS')} <ChevronRight className="h-4 w-4" />
          </span>
        </Button>
      </form>

      {message && (
        <div className="mt-6 p-4 bg-red-600/10 border border-red-600/20 text-red-600 animate-in fade-in slide-in-from-top-2">
          <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            {message}
          </p>
          {showResendButton && (
            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="mt-2 text-[10px] font-black uppercase tracking-widest underline hover:no-underline disabled:opacity-50"
            >
              RESEND VERIFICATION PROTOCOL
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 text-zinc-500 animate-in fade-in slide-in-from-top-2">
          <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            {error}
          </p>
          {showResendButton && (
            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="mt-2 text-[10px] font-black uppercase tracking-widest underline hover:no-underline disabled:opacity-50 text-red-600"
            >
              RESEND VERIFICATION PROTOCOL
            </button>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
          {isSignUp ? 'ALREADY REGISTERED?' : "NEW OPERATOR?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 text-red-600 hover:underline"
          >
            {isSignUp ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </p>
      </div>
    </div>
  );
}