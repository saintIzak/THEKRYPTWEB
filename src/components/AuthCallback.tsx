import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShieldCheck, AlertCircle, Zap } from 'lucide-react';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('VERIFYING OPERATOR CREDENTIALS...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback from the URL
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          setStatus('error');
          setMessage('CREDENTIAL VERIFICATION FAILED. ABORTING.');
          setTimeout(() => navigate('/auth'), 3000);
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('CREDENTIALS VERIFIED. REDIRECTING TO COMMAND CENTER...');
          setTimeout(() => navigate('/'), 2000);
        } else {
          // Check if there's an error in the URL params
          const errorDescription = searchParams.get('error_description');
          if (errorDescription) {
            setStatus('error');
            setMessage(errorDescription.toUpperCase());
          } else {
            setStatus('error');
            setMessage('VERIFICATION FAILED. RE-AUTHORIZATION REQUIRED.');
          }
          setTimeout(() => navigate('/auth'), 3000);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setStatus('error');
        setMessage('SYSTEM INTERFERENCE DETECTED.');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="max-w-md w-full bg-zinc-950 border-2 border-zinc-800 p-6 sm:p-10 text-center relative overflow-hidden" style={{ clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)' }}>
        {status === 'loading' && (
          <div className="space-y-6">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent animate-spin mx-auto" />
            <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] animate-pulse">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 mx-auto bg-red-600/10 border border-red-600/20 flex items-center justify-center">
              <ShieldCheck className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs font-black text-white uppercase tracking-widest">{message}</p>
            <div className="h-1 w-full bg-zinc-900 overflow-hidden">
              <div className="h-full bg-red-600 animate-progress" style={{ width: '100%' }} />
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 mx-auto bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs font-black text-red-600 uppercase tracking-widest">{message}</p>
            <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">REDIRECTING TO AUTHORIZATION INTERFACE...</p>
          </div>
        )}

        {/* HUD Elements */}
        <div className="absolute top-4 left-4 opacity-10">
          <Zap className="h-4 w-4 text-red-600" />
        </div>
        <div className="absolute bottom-4 right-4 text-[6px] font-black text-zinc-800 uppercase tracking-widest">
          AUTH_SEQUENCE_0x7F
        </div>
      </div>
    </div>
  );
}