import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { eventsService } from '../services/eventsService';

export const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            const res = eventsService.login(email, password);
            setLoading(false);
            if (res.success) {
                navigate('/admin');
            } else {
                setError(res.message);
            }
        }, 300);
    };

    return (
        <main className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
            <Helmet>
                <title>Admin Portal Login | Maan Group</title>
            </Helmet>

            <div className="absolute -top-40 -left-40 w-96 h-96 bg-navy-800/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center p-3 border border-white/10 shadow-2xl mb-4">
                        <img src="/assets/logo.png" alt="Maan Group" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Maan Group Portal</h1>
                    <p className="text-slate-400 text-sm mt-1">Sign in to manage events & registrations</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium flex items-center gap-2">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Admin Email
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@maangroup.so"
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl bg-gold-500 text-white font-semibold text-sm uppercase tracking-wider hover:bg-gold-600 active:scale-[0.99] transition-all duration-200 shadow-lg shadow-gold-500/25 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                        >
                            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
                            <ArrowRight size={16} />
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                            <ShieldCheck size={14} className="text-gold-500" />
                            Default access: <span className="text-slate-300 font-mono">admin@maangroup.so</span> / <span className="text-slate-300 font-mono">admin123</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
