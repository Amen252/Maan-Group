import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Users, CheckCircle, Rocket, ArrowRight } from 'lucide-react';
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

                        <div className="pt-12 border-t border-slate-100">
                            <h2 className="text-2xl font-bold text-navy-900 mb-12 text-center uppercase tracking-tight">Core Values</h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                                <div className="p-6 bg-slate-50 rounded-2xl">
                                    <h4 className="font-bold text-navy-900 mb-1 text-xs uppercase tracking-wider">Responsiveness</h4>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl">
                                    <h4 className="font-bold text-navy-900 mb-1 text-xs uppercase tracking-wider">Quality</h4>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl">
                                    <h4 className="font-bold text-navy-900 mb-1 text-xs uppercase tracking-wider">Cooperation</h4>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl">
                                    <h4 className="font-bold text-navy-900 mb-1 text-xs uppercase tracking-wider">Initiative</h4>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl col-span-2 md:col-span-1">
                                    <h4 className="font-bold text-navy-900 mb-1 text-xs uppercase tracking-wider text-center">Continuous Improvement</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
