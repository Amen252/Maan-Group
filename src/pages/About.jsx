import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Users, CheckCircle, Rocket, ArrowRight, Zap, Handshake, TrendingUp, Quote, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ValueCard = ({ value, idx }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: idx * 0.1 }}
        whileHover={{ y: -4 }}
        className="group relative bg-white p-8 sm:p-9 rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(6,46,121,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(6,46,121,0.12)] hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
        {/* Subtle Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-gold-500 group-hover:to-navy-900 transition-all duration-300" />

        {/* Big Ambient Background Watermark */}
        <span className="absolute -right-2 -bottom-4 text-8xl font-black text-slate-100/70 group-hover:text-gold-500/5 transition-colors duration-500 select-none pointer-events-none font-mono">
            {value.num}
        </span>

        <div>
            {/* Top Row: Icon + Tag & Number */}
            <div className="flex items-center justify-between gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-navy-900 border border-slate-200/80 flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white group-hover:border-navy-900 transition-all duration-300 shadow-sm">
                    <value.icon size={24} strokeWidth={2} />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-slate-500 group-hover:text-navy-900 transition-colors px-3 py-1 rounded-full bg-slate-50 group-hover:bg-slate-100 border border-slate-200/60">
                        {value.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-gold-500 transition-colors px-2.5 py-1 rounded-lg bg-slate-50 group-hover:bg-gold-50 border border-slate-100 group-hover:border-gold-100">
                        {value.num}
                    </span>
                </div>
            </div>

            {/* Title & Description */}
            <div className="mt-7 space-y-3 relative z-10">
                <h3 className="font-bold text-navy-900 text-xl tracking-tight group-hover:text-gold-600 transition-colors">
                    {value.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                    {value.desc}
                </p>
            </div>
        </div>

        {/* Bottom subtle indicator */}
        <div className="relative z-10 pt-6 mt-6 border-t border-slate-100/90 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-navy-900 transition-colors">
            <span>Guiding Principle {value.num}</span>
            <ArrowRight size={14} className="text-gold-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
    </motion.div>
);

export const About = () => {
    return (
        <main className="font-body overflow-x-hidden">
            <Helmet>
                <title>About Maan Group | Mission, Vision & Values</title>
                <meta name="description" content="Discover Maan Group's journey, mission, and core values. We are dedicated to architecting strategic excellence through institutional reform and professional growth." />
                <meta property="og:title" content="About Maan Group | Strategic Excellence" />
                <meta property="og:description" content="Transforming leadership landscapes through innovative, culturally responsive solutions." />
            </Helmet>
            {/* ── HERO SECTION ── */}
            <section className="relative min-h-[50vh] flex items-center bg-navy-900 pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/hero.jpeg"
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
                            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-500"
                        >
                            Our Identity
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-5xl font-medium text-white leading-tight tracking-tight"
                        >
                            Architecting <br />
                            <span className="text-gold-500 font-serif italic font-normal">Strategic Excellence</span>
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
                                <h2 className="text-2xl font-semibold text-navy-900">Purpose & Journey</h2>
                                <div className="w-10 h-1 bg-gold-500 rounded-full" />
                            </div>
                            <div className="space-y-4 text-slate-600 text-[0.95rem] font-light leading-relaxed">
                                <p>At Maan Group, we foster professional excellence and institutional growth through innovative solutions that empower individuals and organizations.</p>
                                <p>Our journey began with a vision to transform the leadership landscape of Somalia through actionable strategies that honor regional dynamics.</p>
                            </div>
                        </div>
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="w-full max-w-[320px] aspect-square flex items-center justify-center p-4">
                                <img 
                                    src="/assets/logo.png" 
                                    alt="Maan Group Logo" 
                                    className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MISSION & VISION (Simple Cards) ── */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-navy-900 p-8 rounded-2xl text-white space-y-6 shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-gold-500">
                                    <Shield size={18} />
                                </div>
                                <h3 className="text-gold-500 font-semibold uppercase text-[10px] tracking-widest">Our Vision</h3>
                            </div>
                            <p className="text-base text-white/90 font-light leading-relaxed">
                                To become the <span className="text-gold-500 font-semibold font-serif italic">leading consultancy and training partner</span> in Somalia, achieving sustainable impact and excellence by empowering transformation and inspiring progress for leaders, organizations, and professionals through innovative, culturally responsive solutions.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-navy-900 text-white rounded-lg flex items-center justify-center">
                                    <Target size={18} />
                                </div>
                                <h3 className="text-gold-600 font-semibold uppercase text-[10px] tracking-widest">Our Mission</h3>
                            </div>
                            <div className="space-y-4 text-base text-slate-700 font-light leading-relaxed">
                                <p className="relative pl-4 border-l border-gold-500/30">
                                    To provide innovative consultancy, training and development services to leaders and organizations in Somalia, rising regionally and internationally with culturally responsive approaches that maintain growth.
                                </p>
                                <p className="relative pl-4 border-l border-gold-500/30">
                                    To maintain integrity, inclusiveness, and excellence, utilizing institutional reform and youth empowerment to serve as a trusted change agent while nurturing a supportive atmosphere for employees.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VALUES SECTION ── */}
            <section className="py-20 lg:py-24 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-600 text-[10px] font-semibold tracking-widest uppercase">
                            <Sparkles size={13} className="text-gold-500" />
                            Our Guiding Principles
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-navy-900 tracking-tight">
                            Core <span className="text-gold-500 font-serif italic font-normal">Values</span> That Drive Our Impact
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                            The foundational commitments shaping every advisory engagement, executive training program, and reform project we lead.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9 max-w-5xl mx-auto">
                        {[
                            { title: 'Responsiveness', icon: Zap, desc: 'Rapid, clear communication addressed with tailored strategic precision.', num: '01', tag: 'Agile Delivery' },
                            { title: 'Quality', icon: Award, desc: 'Precision-engineered programs ensuring sustainable organizational outcomes.', num: '02', tag: 'Proven Standards' },
                            { title: 'Initiative', icon: Rocket, desc: 'Senior experts taking decisive leadership and proactive action.', num: '03', tag: 'Proactive Action' },
                            { title: 'Cooperation', icon: Handshake, desc: 'Synergistic growth fostered through shared regional expertise.', num: '04', tag: 'Collaborative Impact' }
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
                        <h2 className="text-3xl md:text-4xl font-semibold text-navy-900 tracking-tight">
                            Ready to build your <span className="text-gold-500 italic font-normal">future?</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-light font-body">
                            Join the hundreds of leaders transformed by Maan Group.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
                        <Link to="/contact" className="px-10 py-4 bg-gold-500 text-white font-semibold rounded-xl uppercase tracking-widest text-[10px] hover:bg-gold-600 hover:-translate-y-1 transition-all shadow-lg shadow-gold-500/20">
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
