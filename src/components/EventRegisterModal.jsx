import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, User, Mail, Phone, Building } from 'lucide-react';
import { eventsService } from '../services/eventsService';

export const EventRegisterModal = ({ isOpen, onClose, event }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [organization, setOrganization] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isOpen || !event) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            eventsService.registerAttendee({
                eventId: event.id,
                name,
                email,
                phone,
                organization
            });
            setLoading(false);
            setSubmitted(true);
        }, 400);
    };

    const handleClose = () => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setPhone('');
        setOrganization('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 relative">
                {/* Header */}
                <div className="p-6 bg-navy-900 text-white relative">
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <X size={16} />
                    </button>
                    <span className="text-gold-500 font-semibold uppercase tracking-[0.2em] text-[10px] block mb-1">
                        Event Registration
                    </span>
                    <h3 className="font-bold text-lg text-white leading-snug line-clamp-2">
                        {event.title}
                    </h3>
                </div>

                {submitted ? (
                    <div className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                            <CheckCircle size={32} />
                        </div>
                        <h4 className="text-xl font-bold text-navy-900">Registration Confirmed!</h4>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                            Thank you, <strong className="text-navy-900">{name}</strong>. Your seat has been reserved. Our team will contact you at <span className="text-navy-900">{email}</span> with event schedules.
                        </p>
                        <button
                            onClick={handleClose}
                            className="mt-4 px-6 py-3 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-gold-500 transition-colors w-full cursor-pointer"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Full Name *
                            </label>
                            <div className="relative">
                                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Mohamed Salad"
                                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Email Address *
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="mohamed@example.com"
                                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                                Phone Number (WhatsApp) *
                            </label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+252 61 XXX XXXX"
                                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                                University / Organization
                            </label>
                            <div className="relative">
                                <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    value={organization}
                                    onChange={(e) => setOrganization(e.target.value)}
                                    placeholder="e.g. Jamhuuriya University / Freelance"
                                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-gold-500 text-white font-semibold text-xs uppercase tracking-wider hover:bg-gold-600 active:scale-[0.99] transition-all duration-200 shadow-md shadow-gold-500/20 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loading ? 'Processing...' : 'Confirm Registration'}
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
