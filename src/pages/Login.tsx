import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, Chrome } from 'lucide-react';
import { loginWithGoogle } from '../firebase';

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 pt-32 pb-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-[2rem] shadow-2xl border border-slate-100 text-center relative z-10"
      >
        <div className="bg-brand-primary/10 text-brand-primary w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-brand-primary/10">
          <Lock size={40} />
        </div>
        
        <h1 className="text-3xl font-bold text-brand-primary mb-4">Admin Access</h1>
        <p className="text-slate-500 mb-10">
          Please sign in with your authorized Google account to access the dashboard.
        </p>

        <div className="space-y-6">
          {error && (
            <p className="text-red-500 text-sm font-medium flex items-center justify-center gap-2 bg-red-50 py-3 rounded-xl border border-red-100">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              {error}
            </p>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-lg shadow-lg group"
          >
            {isLoggingIn ? (
              <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Chrome size={20} className="group-hover:rotate-12 transition-transform" />
                Sign in with Google
              </>
            )}
          </button>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-bold">
          <ShieldCheck size={14} className="text-brand-accent" />
          Secure Admin Portal
        </div>
      </motion.div>
    </main>
  );
}
