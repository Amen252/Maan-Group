import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, X } from 'lucide-react';
import { FaWhatsapp, FaTiktok, FaFacebook, FaLinkedin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

export const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        service: 'Consulting Services',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitStatus, setSubmitStatus] = React.useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

        const templateParams = {
            name: formData.name,
            email: formData.email,
            topic: formData.service,
            message: formData.message,
            title: `Request for ${formData.service}`
        };

        try {
            const result = await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            if (result.status === 200) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', service: 'Consulting Services', message: '' });
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { icon: FaWhatsapp, title: 'WhatsApp', text: '+252 61 7076666', desc: 'Chat with our team directly.', link: 'https://wa.me/252617076666' },
        { icon: FaTiktok, title: 'TikTok', text: '@maangroup', desc: 'Follow our video updates.', link: 'https://www.tiktok.com/@maangroup' },
        { icon: FaFacebook, title: 'Facebook', text: 'Maangroup', desc: 'Connect with our community.', link: 'https://www.facebook.com/share/1BrRsTgjCM/' },
        { icon: FaLinkedin, title: 'LinkedIn', text: 'Coming Soon', desc: 'Professional network.', link: '#' }
    ];

    return (
        <main className="min-h-screen bg-slate-50 font-body pt-32 pb-24 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
                <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-20 items-start">

                    {/* Left Column: Info */}
                    <div className="space-y-12 lg:sticky lg:top-36">
                        {/* Header */}
                        <div className="space-y-4">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 text-gold-500 font-bold tracking-widest uppercase text-[0.65rem] mb-2">
                                Follow & Contact
                            </span>
                            <h1 className="text-3xl lg:text-5xl font-bold text-navy-900 leading-[1.15]">Connect with us.</h1>
                            <p className="text-base max-w-sm font-light leading-relaxed">
                                Whether you have a question about our services or want to follow our journey, our team is always ready to connect.
                            </p>
                        </div>

                        {/* Info Cards (Stacked) */}
                        <div className="space-y-12">
                            {contactInfo.map((info, i) => (
                                <motion.a
                                    key={i}
                                    href={info.link}
                                    target={info.link !== '#' ? "_blank" : "_self"}
                                    rel="noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className={`flex items-start gap-6 group ${info.link === '#' ? 'cursor-default' : 'cursor-pointer'}`}
                                >
                                    <div className="w-12 h-12 bg-white text-navy-900 border border-slate-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-white group-hover:shadow-md transition-all duration-300">
                                        <info.icon size={20} />
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-navy-900 font-bold text-sm mb-1">{info.title}</h3>
                                        <p className="text-slate-500 text-xs mb-1.5">{info.desc}</p>
                                        <p className="text-navy-900 font-semibold text-sm">{info.text}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100 relative"
                    >
                        {/* Success Toast / Small Popup at the Top of Form */}
                        <AnimatePresence>
                            {submitStatus === 'success' && (
                                <div className="absolute top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="bg-white rounded-2xl p-4 max-w-sm w-full shadow-2xl shadow-navy-900/10 border border-slate-100 flex items-center gap-4 pointer-events-auto"
                                    >
                                        <div className="w-10 h-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-navy-900 leading-tight">Success!</h3>
                                            <p className="text-slate-500 text-[13px] mt-0.5 leading-snug">
                                                Your message has been sent. We'll be in touch!
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSubmitStatus(null)}
                                            className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors p-1.5"
                                        >
                                            <X size={16} />
                                        </button>
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy-900 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-slate-50/50"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy-900 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-slate-50/50"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy-900 ml-1">Topic of Interest</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-slate-50/50 appearance-none cursor-pointer"
                                        value={formData.service}
                                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                    >
                                        <option>Consulting Services</option>
                                        <option>Training & Development</option>
                                        <option>Capacity Building</option>
                                        <option>Research & Development</option>
                                    </select>
                                    {/* Custom caret */}
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy-900 ml-1">Your Message</label>
                                <textarea
                                    required
                                    rows="6"
                                    placeholder="How can we help you?"
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-slate-50/50 resize-y"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`btn btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold mt-4 group transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                <Send size={18} className={isSubmitting ? 'animate-bounce' : 'group-hover:animate-pulse'} />
                                {isSubmitting ? 'Sending Message...' : 'Send Message'}
                            </button>

                            {submitStatus === 'error' && (
                                <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200 text-center shadow-sm">
                                    Oops! Something went wrong. Please try again later.
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>

        </main>
    );
};
