import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { eventsService, DEFAULT_REGISTRATION_FIELDS } from '../services/eventsService';

export const EventRegisterModal = ({ isOpen, onClose, event }) => {
    const [formValues, setFormValues] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    if (!isOpen || !event) return null;

    if (event.status === 'Past Event' || event.registrationEnabled === false) {
        return (
            <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900">Registration Closed</h3>
                    <p className="text-xs text-slate-500">
                        This event has already concluded or registration is not open.
                    </p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const fields = event.customFields && event.customFields.length > 0
        ? event.customFields
        : DEFAULT_REGISTRATION_FIELDS;

    const handleChange = (fieldId, value) => {
        setFormValues(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const name = formValues.name || 'Anonymous Attendee';
            const email = formValues.email || '';
            const phone = formValues.phone || '';
            const organization = formValues.organization || '';

            const customResponses = {};
            fields.forEach(f => {
                if (f.id !== 'name' && f.id !== 'email' && f.id !== 'phone' && f.id !== 'organization') {
                    customResponses[f.label] = formValues[f.id] || '';
                }
            });

            eventsService.registerAttendee({
                eventId: event.id,
                name,
                email,
                phone,
                organization,
                customResponses
            });

            setLoading(false);
            setSubmitted(true);
        } catch (err) {
            setLoading(false);
            setErrorMessage(err.message || 'Registration failed.');
        }
    };

    const handleClose = () => {
        setSubmitted(false);
        setFormValues({});
        setErrorMessage('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-nunito animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 relative">
                <div className="p-6 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white relative">
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                    <span className="inline-flex items-center gap-1 text-gold-500 font-extrabold uppercase tracking-widest text-[10px] mb-1">
                        <Sparkles size={11} /> Registration Open
                    </span>
                    <h3 className="font-extrabold text-lg text-white leading-snug line-clamp-2">
                        {event.title}
                    </h3>
                </div>

                {submitted ? (
                    <div className="p-8 text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                            <CheckCircle size={36} />
                        </div>
                        <h4 className="text-2xl font-black text-navy-900">Registration Confirmed!</h4>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto font-semibold">
                            Thank you! Your seat is reserved for this seminar. We look forward to seeing you at <strong className="text-navy-900">{event.location}</strong>.
                        </p>
                        <button
                            onClick={handleClose}
                            className="mt-4 px-6 py-3 rounded-2xl bg-navy-900 text-white text-xs font-black uppercase tracking-wider hover:bg-gold-500 transition-colors w-full cursor-pointer"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                        {errorMessage && (
                            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-2 border border-red-200">
                                <AlertCircle size={15} /> {errorMessage}
                            </div>
                        )}

                        {fields.map((field) => {
                            const value = formValues[field.id] || '';

                            if (field.type === 'select' && field.options) {
                                return (
                                    <div key={field.id}>
                                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </label>
                                        <select
                                            required={field.required}
                                            value={value}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:border-gold-500 focus:bg-white"
                                        >
                                            <option value="">-- Please select an option --</option>
                                            {field.options.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            }

                            if (field.type === 'textarea') {
                                return (
                                    <div key={field.id}>
                                        <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                                            {field.label} {field.required && <span className="text-red-500">*</span>}
                                        </label>
                                        <textarea
                                            rows="3"
                                            required={field.required}
                                            value={value}
                                            onChange={(e) => handleChange(field.id, e.target.value)}
                                            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-gold-500 focus:bg-white"
                                        />
                                    </div>
                                );
                            }

                            return (
                                <div key={field.id}>
                                    <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                                        {field.label} {field.required && <span className="text-red-500">*</span>}
                                    </label>
                                    <input
                                        type={field.type || 'text'}
                                        required={field.required}
                                        value={value}
                                        onChange={(e) => handleChange(field.id, e.target.value)}
                                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                                    />
                                </div>
                            );
                        })}

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-2xl bg-gold-500 text-white font-black text-xs uppercase tracking-wider hover:bg-gold-600 active:scale-[0.99] transition-all duration-200 shadow-md shadow-gold-500/25 flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loading ? 'Processing...' : 'Submit Registration'}
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
