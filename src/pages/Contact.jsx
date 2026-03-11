import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, X, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
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

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            console.error('EmailJS credentials missing. Check your .env file.');
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        const templateParams = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            topic: formData.service,
            message: formData.message.trim(),
            title: `Request for ${formData.service}`
        };

        try {
            console.log('Sending message...');
            const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

            if (result.status === 200) {
                console.log('Message sent successfully!');
                setSubmitStatus('success');
                setFormData({ name: '', email: '', service: 'Consulting Services', message: '' });
                setTimeout(() => setSubmitStatus(null), 5000);
            } else {
                console.error('Failed to send message:', result);
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus(null), 5000);
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 font-body pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Simplified Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-bold text-navy-900 mb-4">Contact Us</h1>
                    <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
                    <p className="text-slate-500 mt-6 max-w-lg mx-auto font-light">
                        Have a question or looking to start a project? Reach out to us and we'll get back to you shortly.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">

                    {/* Left: Contact Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-navy-900 mb-8 lowercase tracking-tight">get in touch</h2>

                            <div className="space-y-8">
                                <a
                                    href="mailto:info@maangroup.so"
                                    className="flex items-center gap-4 group relative z-10"
                                    onClick={(e) => { e.stopPropagation(); }}
                                >
                                    <div className="w-10 h-10 bg-slate-50 text-navy-900 rounded-xl flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Email Address</p>
                                        <p className="text-sm font-medium text-navy-900 group-hover:text-gold-500 transition-colors">info@maangroup.so</p>
                                    </div>
                                </a>

                                <a
                                    href="https://wa.me/252617076666"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 group relative z-10"
                                    onClick={(e) => { e.stopPropagation(); }}
                                >
                                    <div className="w-10 h-10 bg-slate-50 text-navy-900 rounded-xl flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                                        <FaWhatsapp size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">WhatsApp</p>
                                        <p className="text-sm font-medium text-navy-900 group-hover:text-gold-500 transition-colors">+252 61 7076666</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-slate-50 text-navy-900 rounded-xl flex items-center justify-center">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Location</p>
                                        <p className="text-sm font-medium text-navy-900">Mogadishu, Somalia</p>
                                    </div>
                                </div>
                            </div>

                            {/* Socials */}
                            <div className="mt-12 pt-8 border-t border-slate-50 flex gap-4">
                                {[
                                    { icon: FaFacebook, link: "https://www.facebook.com/share/1BrRsTgjCM/" },
                                    { icon: FaTiktok, link: "https://www.tiktok.com/@maangroup" },
                                    { icon: FaLinkedin, link: "#" }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-gold-500 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300 relative z-10"
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: The Form Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-100 min-h-full flex flex-col">
                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mb-8 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 border border-green-100 shadow-sm"
                                    >
                                        <CheckCircle size={20} className="flex-shrink-0" />
                                        <p className="text-sm font-semibold">Message sent! We will contact you shortly.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your name"
                                            className="w-full px-5 py-4 rounded-xl border border-slate-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-slate-50/30 font-medium"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="example@mail.com"
                                            className="w-full px-5 py-4 rounded-xl border border-slate-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all bg-slate-50/30 font-medium"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Service Type</label>
                                    <div className="relative">
                                        <select
                                            className="w-full px-5 py-4 rounded-xl border border-slate-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none cursor-pointer appearance-none bg-slate-50/30 font-medium"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        >
                                            <option>Consulting Services</option>
                                            <option>Training & Development</option>
                                            <option>Capacity Building</option>
                                            <option>Research & Development</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Your Message</label>
                                    <textarea
                                        required
                                        rows="5"
                                        placeholder="How can we help you?"
                                        className="w-full px-5 py-4 rounded-xl border border-slate-100 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all resize-none bg-slate-50/30 font-medium"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="pt-8 mt-auto">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-5 bg-gold-500 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-gold-600 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-gold-500/20 group"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                SEND MESSAGE
                                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {submitStatus === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium text-center border border-red-100"
                                            >
                                                Failed to send message. Please try again or contact us directly.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
