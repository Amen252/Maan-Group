import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        service: 'Consulting Services',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting MaanGroup. We will reach out to you shortly.');
    };

    const contactInfo = [
        { icon: Mail, title: 'Email Us', text: 'info@maangroup.so', desc: 'Our friendly team is here to help.' },
        { icon: Phone, title: 'Call Us', text: '+252 61 7076666', desc: 'Mon-Sat from 8am to 5pm.' },
        { icon: MapPin, title: 'Visit Us', text: 'Mogadishu, Somalia', desc: 'Come say hello at our office.' }
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
                                Contact Us
                            </span>
                            <h1 className="text-3xl lg:text-5xl font-bold text-navy-900 leading-[1.15]">We'd love to hear from you.</h1>
                            <p className="text-base max-w-sm font-light leading-relaxed">
                                Whether you have a question about our services or pricing, our expert team is ready to answer all your questions.
                            </p>
                        </div>

                        {/* Info Cards (Stacked) */}
                        <div className="space-y-8">
                            {contactInfo.map((info, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="flex items-start gap-5 group"
                                >
                                    <div className="w-12 h-12 bg-white text-navy-900 border border-slate-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-white group-hover:shadow-md transition-all duration-300">
                                        <info.icon size={20} />
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-navy-900 font-bold text-sm mb-1">{info.title}</h3>
                                        <p className="text-slate-500 text-xs mb-1.5">{info.desc}</p>
                                        <p className="text-navy-900 font-semibold text-sm">{info.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100"
                    >
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
                                className="btn btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold mt-4 group"
                            >
                                <Send size={18} className="group-hover:animate-pulse" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};
