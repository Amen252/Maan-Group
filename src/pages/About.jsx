import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Users, CheckCircle, Rocket, ArrowRight, Zap, Handshake, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ValueCard = ({ icon: Icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-10 bg-white border border-slate-100 rounded-xl transition-all duration-300 shadow-sm hover:shadow-xl hover:border-gold-500/30 group"
    >
        <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-8 bg-gold-500/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
            <Icon size={28} />
        </div>
        <h3 className="mb-4 text-xl font-heading font-bold text-navy-900 group-hover:text-gold-500 transition-colors uppercase tracking-wider">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-[0.95rem]">{description}</p>
    </motion.div>
);

export const About = () => {
    return (
        <main className="pt-20 bg-white min-h-screen">
            {/* Simple Hero */}
            <section className="py-24 border-b border-slate-50">
                <div className="container mx-auto px-6 max-w-[900px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <span className="text-gold-500 font-bold uppercase tracking-widest text-xs">
                            About Maan Group
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-bold text-navy-900 leading-[1.1]">
                            Empowering Minds. <br />
                            <span className="text-gold-500">Building Future.</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed font-light">
                            Established in 2019 in Mogadishu, Somalia, Maan Group is a leading consultancy
                            and training firm dedicated to leadership development, organizational strategy,
                            and professional excellence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Simple Content */}
            <section className="py-24 text-slate-600">
                <div className="container mx-auto px-6 max-w-[900px]">
                    <div className="grid gap-20">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-navy-900 uppercase tracking-tight">Our Purpose</h2>
                            <p className="text-lg leading-relaxed">
                                At Maan Group, we are dedicated to fostering professional excellence and
                                institutional growth. We believe in providing innovative solutions that
                                empower individuals and organizations to navigate complex challenges with
                                confidence and strategic foresight.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-navy-900 font-bold uppercase text-sm tracking-widest text-gold-500">Our Mission</h3>
                                <p className="leading-relaxed">
                                    To educate, inspire, and empower professionals and entrepreneurs by providing
                                    comprehensive training programs, strategic consulting services, and
                                    transformational mentorship that drive success.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-navy-900 font-bold uppercase text-sm tracking-widest text-gold-500">Our Vision</h3>
                                <p className="leading-relaxed">
                                    To be the leading consultancy and training firm in leadership development,
                                    organizational strategy, and professional excellence, creating impact-driven
                                    solutions for individuals and businesses.
                                </p>
                            </div>
                        </div>

                        <div className="pt-20 border-t border-slate-100">
                            <div className="text-center max-w-2xl mx-auto mb-16">
                                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3 block">
                                    Our Principles
                                </span>
                                <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 leading-tight">
                                    Core <span className="text-gold-500 font-serif italic">Values</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: 'Responsiveness', icon: Zap, desc: 'Our goal is to reply to messages within minutes — not hours or days. Speed and clarity are non-negotiable.', num: '01' },
                                    { title: 'Quality', icon: Award, desc: 'All of our programs have been extensively tested to ensure a predictable, impactful outcome every time.', num: '02' },
                                    { title: 'Initiative', icon: Rocket, desc: 'Our qualified experts make autonomous decisions with proven judgment, initiative, and professional confidence.', num: '03' },
                                    { title: 'Cooperation', icon: Handshake, desc: 'A team-oriented atmosphere where it is easy for clients to gain help quickly from a variety of qualified sources.', num: '04' }
                                ].map((value, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -6 }}
                                        className="group relative flex items-start gap-6 p-8 bg-white rounded-3xl border border-slate-100 hover:border-gold-500/20 hover:shadow-xl hover:shadow-navy-900/5 transition-all duration-400 overflow-hidden"
                                    >
                                        {/* Gold left border on hover */}
                                        <div className="absolute left-0 top-0 h-0 w-1 group-hover:h-full bg-gold-500 transition-all duration-500 rounded-l-3xl" />

                                        {/* Left: Number + Icon stacked */}
                                        <div className="flex flex-col items-center gap-3 shrink-0">
                                            <span className="text-4xl font-black text-slate-100 group-hover:text-gold-500/20 transition-colors duration-400 leading-none select-none">
                                                {value.num}
                                            </span>
                                            <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-400 shadow-md">
                                                <value.icon className="w-5 h-5" strokeWidth={2} />
                                            </div>
                                        </div>

                                        {/* Right: Content */}
                                        <div className="flex-1 pt-1">
                                            <h4 className="font-bold text-navy-900 text-lg mb-2 group-hover:text-gold-600 transition-colors duration-300">
                                                {value.title}
                                            </h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">
                                                {value.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
