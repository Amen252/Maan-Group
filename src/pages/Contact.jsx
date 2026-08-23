import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin, ArrowRight, ArrowUpRight, Check, Phone } from 'lucide-react';
import { FaWhatsapp, FaTiktok, FaFacebook, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: 'Consulting Services',
        scope: 'Corporate / Business',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const serviceOptions = [
        'Consulting Services',
        'Training & Development',
        'Capacity Building',
        'Research & Policy',
        'Institutional Reform',
        'Leadership Coaching'
    ];

    const scopeOptions = [
        'Corporate / Business',
        'Academic / University',
        'Government / Public Sector',
        'NGO / Community',
        'Individual Leader'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const SERVICE_ID = import.meta.env.VITE_SERVICE_ID || "service_m1paz2p";
        const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID || "template_5ergxt9";
        const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY || "Hhk7exogWwSNjYybL";

        setIsSubmitting(true);
        setSubmitStatus(null);

        const templateParams = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            topic: `${formData.service} (${formData.scope})`,
            message: formData.message.trim(),
            title: `New Inquiry: ${formData.service}`
        };

        try {
            const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

            if (result.status === 200) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    service: 'Consulting Services',
                    scope: 'Corporate / Business',
                    message: ''
                });
                setTimeout(() => setSubmitStatus(null), 6000);
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus(null), 6000);
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 6000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50/70 font-body pt-28 pb-16 relative overflow-hidden flex items-center justify-center">
            <Helmet>
                <title>Contact Us | Maan Group Strategic Partners</title>
                <meta name="description" content="Get in touch with Maan Group for strategic consulting, professional training, and institutional development in Somalia and East Africa." />
                <meta property="og:title" content="Contact Maan Group | Partner With Us" />
            </Helmet>

            {/* Background Ambient Glows */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-b from-gold-500/5 via-navy-900/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-0" />

            <div className="container mx-auto px-4 sm:px-6 max-w-[980px] relative z-10">

                {/* Main Unified Card Container */}
                <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(6,46,121,0.08)] border border-slate-200/80 overflow-hidden grid lg:grid-cols-12 items-stretch">

                    {/* ═══════════ LEFT PANEL: DARK NAVY ═══════════ */}
                    <div className="lg:col-span-5 bg-navy-900 p-6 sm:p-8 lg:p-9 text-white flex flex-col justify-between relative overflow-hidden">
                        {/* Soft Glow in corner */}
                        <div className="absolute -top-20 -left-20 w-56 h-56 bg-gold-500/15 rounded-full blur-[70px] pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-navy-800/80 rounded-full blur-[70px] pointer-events-none" />

                        <div className="relative z-10 space-y-6">
                            {/* Headline */}
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[9px] font-semibold tracking-widest uppercase text-gold-400 backdrop-blur-md">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                                    Get In Touch
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-semibold leading-[1.2] tracking-tight text-white">
                                    Have A Project Idea <br />
                                    <span className="relative inline-block text-white">
                                        In Mind?
                                        {/* Decorative curved brush SVG accent */}
                                        <svg className="absolute -top-2 left-0 w-full h-3.5 text-gold-400 opacity-90 pointer-events-none" viewBox="0 0 100 20" fill="none" preserveAspectRatio="none">
                                            <path d="M5 15 C 30 2, 70 2, 95 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                    <br />
                                    <span className="text-slate-200 font-normal">Let's Get Started</span>
                                </h1>
                            </div>

                            {/* Bullet Features */}
                            <div className="space-y-3 pt-1">
                                {[
                                    'Expect A Response From Us Within 24 Hours',
                                    'Tailored Strategy & Localized Insights For East Africa',
                                    'Access To Dedicated Consultants & Specialists'
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2.5 text-slate-200 text-xs font-light leading-relaxed">
                                        <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-gold-400">
                                            <Check size={11} strokeWidth={2.5} />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Action Pill Button (WhatsApp / Direct Call) */}
                            <div className="pt-1">
                                <a
                                    href="https://wa.me/252618257815"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-gold-400/50 px-4 py-2.5 rounded-full text-white text-[11px] font-semibold backdrop-blur-md transition-all duration-300 group shadow-md"
                                >
                                    <div className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm">
                                        <FaWhatsapp size={12} />
                                    </div>
                                    <span>Chat On WhatsApp Directly</span>
                                    <ArrowRight size={12} className="text-gold-400 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Bottom Info Section */}
                        <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-3">
                            <div className="text-[11px] text-slate-300 font-light">
                                Preferred To Email?{' '}
                                <a
                                    href="mailto:info@maangroup.so"
                                    className="text-gold-400 hover:text-gold-300 font-medium underline underline-offset-4 transition-colors"
                                >
                                    info@maangroup.so
                                </a>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                                <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                                    <MapPin size={13} className="text-gold-400" />
                                    <span>Mogadishu, Somalia</span>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center gap-2">
                                    {[
                                        { icon: FaFacebook, link: "https://www.facebook.com/share/1BrRsTgjCM/", label: "Facebook" },
                                        { icon: FaTiktok, link: "https://www.tiktok.com/@maangroup", label: "TikTok" },
                                        { icon: FaLinkedin, link: "#", label: "LinkedIn" }
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href={social.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={social.label}
                                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-gold-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-300 text-xs"
                                        >
                                            <social.icon size={11} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ═══════════ RIGHT PANEL: CLEAN FORM ═══════════ */}
                    <div className="lg:col-span-7 bg-white p-6 sm:p-8 lg:p-9 flex flex-col justify-between">
                        <div>
                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mb-5 p-3.5 bg-emerald-50 text-emerald-800 rounded-xl flex items-center gap-2.5 border border-emerald-200 shadow-sm"
                                    >
                                        <CheckCircle size={18} className="text-emerald-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs font-semibold">Message sent successfully!</p>
                                            <p className="text-[11px] text-emerald-700">Thank you for reaching out. We will get back to you within 24 hours.</p>
                                        </div>
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mb-5 p-3.5 bg-rose-50 text-rose-800 rounded-xl flex items-center gap-2.5 border border-rose-200 shadow-sm"
                                    >
                                        <p className="text-xs font-semibold">Failed to send message. Please try again or email us directly at info@maangroup.so</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Row 1: Name & Email */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter Your Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition-all text-xs text-slate-800 placeholder:text-slate-400 bg-white"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="Enter Your Email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition-all text-xs text-slate-800 placeholder:text-slate-400 bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: What Do You Need? (Interactive Pills) */}
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
                                        What Do You Need?
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {serviceOptions.map((service) => {
                                            const isSelected = formData.service === service;
                                            return (
                                                <button
                                                    key={service}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, service })}
                                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border cursor-pointer ${
                                                        isSelected
                                                            ? 'bg-navy-900 text-white border-navy-900 shadow-sm scale-[1.01]'
                                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    {service}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Row 3: Organization / Scope (Pills) */}
                                <div className="space-y-2">
                                    <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
                                        Organization Type / Scope
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {scopeOptions.map((scope) => {
                                            const isSelected = formData.scope === scope;
                                            return (
                                                <button
                                                    key={scope}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, scope })}
                                                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 border cursor-pointer ${
                                                        isSelected
                                                            ? 'bg-navy-900 text-white border-navy-900 shadow-sm scale-[1.01]'
                                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    {scope}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Row 4: Project Brief Textarea */}
                                <div className="space-y-1.5">
                                    <label className="block text-[11px] font-semibold text-slate-700 tracking-wide">
                                        Project Brief
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Write Here... Tell us about your goals, timeline, or requirements."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:border-navy-900 focus:ring-1 focus:ring-navy-900 outline-none transition-all text-xs text-slate-800 placeholder:text-slate-400 bg-white resize-none"
                                    />
                                </div>

                                {/* Row 5: Submit Button */}
                                <div className="pt-1">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-gold-500 hover:bg-gold-600 active:scale-95 text-white px-7 py-3 rounded-lg font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-gold-500/20 disabled:opacity-60 cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <ArrowUpRight size={15} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

