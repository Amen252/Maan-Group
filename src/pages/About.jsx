import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Users, CheckCircle, Rocket, ArrowRight, Zap, Handshake, TrendingUp, Quote, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ValueCard = ({ value, idx }) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        whileHover={{ y: -3 }}
        className="group relative bg-white p-6 rounded-2xl border border-slate-100 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
        <span className="absolute -right-2 -bottom-4 text-6xl font-black text-slate-50 group-hover:text-gold-500/5 transition-colors duration-500 select-none pointer-events-none">
            {value.num}
        </span>

        <div className="relative z-10 flex flex-col gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-navy-900 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                <value.icon size={18} strokeWidth={2} />
            </div>

            <div className="space-y-1">
                <h4 className="font-bold text-navy-900 text-base tracking-tight group-hover:text-gold-600 transition-colors">
                    {value.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed font-light">
                    {value.desc}
                </p>
            </div>
        </div>
    </motion.div>
);

export const About = () => {
    return (
        <main className="font-body overflow-x-hidden">
            {/* ── HERO SECTION ── */}
            <section className="relative min-h-[50vh] flex items-center bg-navy-900 pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/Assets/Hero.jpeg"
                        alt="About Maan Group"
                        className="w-full h-full object-cover opacity-20 grayscale-[20%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/60 to-transparent" />
                </div>

                <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
                    <div className="max-w-2xl space-y-4">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500"
                        >
                            Our Identity
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-semibold text-white leading-tight tracking-tight"
                        >
                            Architecting <br />
                            <span className="text-gold-500 font-serif italic">Strategic Excellence</span>
                        </motion.h1>
                    </div>
                </div>
            </section>

            {/* ── STORY SECTION ── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-navy-900">Purpose & Journey</h2>
                                <div className="w-10 h-1 bg-gold-500 rounded-full" />
                            </div>
                            <div className="space-y-4 text-slate-600 text-[0.95rem] font-light leading-relaxed">
                                <p>At Maan Group, we foster professional excellence and institutional growth through innovative solutions that empower individuals and organizations.</p>
                                <p>Our journey began with a vision to transform the leadership landscape of Somalia through actionable strategies that honor regional dynamics.</p>
                            </div>
                        </div>
                        <div className="relative">
                            <img src="/Assets/about.jpeg" alt="Vision" className="w-full rounded-2xl shadow-lg aspect-[16/9] object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MISSION & VISION (Simple Cards) ── */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-navy-900 p-8 rounded-2xl text-white space-y-4 shadow-md">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-gold-500">
                                <Target size={18} />
                            </div>
                            <h3 className="text-gold-500 font-bold uppercase text-[10px] tracking-widest">Our Mission</h3>
                            <p className="text-lg font-light leading-snug">To educate and empower professionals through transformational mentorship and strategic consulting.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                            <div className="w-8 h-8 bg-navy-900 text-white rounded-lg flex items-center justify-center">
                                <Shield size={18} />
                            </div>
                            <h3 className="text-gold-600 font-bold uppercase text-[10px] tracking-widest">Our Vision</h3>
                            <p className="text-lg text-navy-900 font-light leading-snug">To be the leading architectural firm of leadership across East Africa, creating impact-driven solutions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VALUES SECTION ── */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <div className="text-center mb-10">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500 block">Principles</span>
                        <h2 className="text-2xl font-bold text-navy-900 mt-1">Core <span className="text-gold-500 font-serif italic">Values</span></h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'Responsiveness', icon: Zap, desc: 'Rapid, clear communication addressed with precision.', num: '01' },
                            { title: 'Quality', icon: Award, desc: 'Precision-engineered programs ensuring outcomes.', num: '02' },
                            { title: 'Initiative', icon: Rocket, desc: 'Experts taking decisive leadership action.', num: '03' },
                            { title: 'Cooperation', icon: Handshake, desc: 'Synergistic growth through shared expertise.', num: '04' }
                        ].map((value, idx) => (
                            <ValueCard key={idx} value={value} idx={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA (Simplified) ── */}
            <section className="py-24 bg-white text-center border-t border-slate-50">
                <div className="container mx-auto px-6 max-w-2xl space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 tracking-tight">
                            Ready to build your <span className="text-gold-500 italic">future?</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-light font-body">
                            Join the hundreds of leaders transformed by Maan Group.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
                        <Link to="/contact" className="px-10 py-4 bg-gold-500 text-white font-bold rounded-xl uppercase tracking-widest text-[10px] hover:bg-gold-600 hover:-translate-y-1 transition-all shadow-lg shadow-gold-500/20">
                            Consult With Us
                        </Link>
                        <Link to="/services" className="text-navy-900 font-bold uppercase tracking-widest text-[10px] hover:text-gold-600 transition-colors flex items-center gap-2 group">
                            Our Services <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};
