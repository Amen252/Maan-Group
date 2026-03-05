import React from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from 'lucide-react';

export const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        service: 'Consulting',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for contacting MaanGroup. We will reach out to you shortly.');
    };

    return (
        <main className="pt-20 bg-slate-50/30 min-h-screen font-body">
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-20 items-stretch">

                        {/* Left Column: Content */}
                        <div className="flex flex-col justify-center space-y-12">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 mb-2 px-4 py-2 bg-gold-500/10 rounded-full border border-gold-500/20">
                                    Connect With Us
                                </span>
                                <h1 className="text-5xl lg:text-7xl font-semibold text-navy-900 leading-[1.1] tracking-tight">
                                    Partner With <span className="text-gold-500 italic font-serif">MaanGroup.</span>
                                </h1>
                                <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-light">
                                    Ready to grow your organization? Reach out to our team of experts for a practical consultation tailored to your needs.
                                </p>
                            </motion.div>

                            <div className="space-y-8">
                                {[
                                    { icon: Mail, title: "Email Us", text: "info@maangroup.com" },
                                    { icon: Phone, title: "Support", text: "+1 (555) 342-9900" },
                                    { icon: MapPin, title: "Location", text: "Global Advisory Center" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-6 group cursor-default">
                                        <div className="w-14 h-14 rounded-xl bg-navy-900 text-gold-500 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300 shadow-lg">
                                            <item.icon size={24} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-1">{item.title}</h3>
                                            <p className="text-lg font-medium text-navy-900">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-10 flex gap-6 text-navy-900/60 transition-opacity">
                                <Linkedin size={24} className="hover:text-gold-500 cursor-pointer transition-colors" />
                                <Twitter size={24} className="hover:text-gold-500 cursor-pointer transition-colors" />
                                <Facebook size={24} className="hover:text-gold-500 cursor-pointer transition-colors" />
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="lg:mt-0 mt-16"
                        >
                            <form
                                className="bg-white p-12 lg:p-16 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden group"
                                onSubmit={handleSubmit}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl group-hover:bg-gold-500/20 transition-all"></div>

                                <h2 className="text-3xl font-semibold text-navy-900 mb-10 tracking-tight text-center lg:text-left uppercase">Consultation Request</h2>

                                <div className="space-y-8">
                                    <div className="grid sm:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="block text-xs font-semibold uppercase tracking-widest text-navy-900 ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                required
                                                className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-gold-500 transition-all font-light"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="block text-xs font-semibold uppercase tracking-widest text-navy-900 ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                placeholder="email@example.com"
                                                required
                                                className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-gold-500 transition-all font-light"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-xs font-semibold uppercase tracking-widest text-navy-900 ml-1">Service Interest</label>
                                        <select
                                            className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-gold-500 transition-all font-light appearance-none cursor-pointer"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        >
                                            <option>Consulting</option>
                                            <option>Training</option>
                                            <option>Capacity Building</option>
                                            <option>Research & Development</option>
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="block text-xs font-semibold uppercase tracking-widest text-navy-900 ml-1">Message</label>
                                        <textarea
                                            rows="5"
                                            placeholder="Tell us about your goals..."
                                            required
                                            className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-gold-500 transition-all font-light resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-12 w-full btn btn-primary py-5 rounded-sm flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-gold-500/20 group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                        Start Your Partnership <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-gold-500/5 rounded-full blur-[120px] -z-10"></div>
            </section>
        </main>
    );
};
