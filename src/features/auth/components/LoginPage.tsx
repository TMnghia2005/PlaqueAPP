import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError('Login Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] flex flex-col items-center justify-center p-6 w-full max-w-[420px] mx-auto shadow-2xl border-x border-[#bdc8cf]/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#33b5e5] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#33b5e5]/20">
            <span className="material-symbols-outlined text-white text-4xl">dentistry</span>
          </div>
          <h1 className="text-2xl font-black text-[#181c1e] tracking-tight mt-4">Plaque App</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </motion.div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">person</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-[#bdc8cf] rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#33b5e5]/20 focus:border-[#33b5e5] transition-all"
                placeholder="Username"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">lock</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#bdc8cf] rounded-xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#33b5e5]/20 focus:border-[#33b5e5] transition-all"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#33b5e5] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-md shadow-[#33b5e5]/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <span className="material-symbols-outlined text-lg">login</span>
              </>
            )}
          </button>
        </form>

      </motion.div>
    </div>
  );
};
