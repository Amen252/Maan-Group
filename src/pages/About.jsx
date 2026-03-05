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
                            <span className="text-gold-500">Building the Future.</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed font-light">
                            Maan Group is a multidisciplinary organization dedicated to fostering growth,
                            innovation, and professional excellence through strategic advisory and
                            educational initiatives.
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
                                We believe that the biggest challenges require a combination of strategic
                                foresight and human connection. Our mission is to bridge the gap between
                                academic theory and practical professional success, especially for the
                                Somali youth and emerging professionals.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h3 className="text-navy-900 font-bold uppercase text-sm tracking-widest">Our Mission</h3>
                                <p className="leading-relaxed">
                                    To provide organizations and individuals with the tools and insights
                                    necessary to navigate a rapidly changing global landscape with
                                    integrity and professional excellence.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-navy-900 font-bold uppercase text-sm tracking-widest">Our Vision</h3>
                                <p className="leading-relaxed">
                                    To be the standard for institutional capacity building and
                                    strategic development, recognized for our positive impact on the
                                    communities we serve.
                                </p>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-slate-100">
                            <h2 className="text-2xl font-bold text-navy-900 mb-12 text-center uppercase tracking-tight">Core Values</h2>
                            <div className="grid sm:grid-cols-2 gap-8 text-center">
                                <div className="p-8 bg-slate-50 rounded-3xl">
                                    <h4 className="font-bold text-navy-900 mb-2">Excellence</h4>
                                    <p className="text-sm">Highest standards in every project.</p>
                                </div>
                                <div className="p-8 bg-slate-50 rounded-3xl">
                                    <h4 className="font-bold text-navy-900 mb-2">Integrity</h4>
                                    <p className="text-sm">Trust and transparency.</p>
                                </div>
                                <div className="p-8 bg-slate-50 rounded-3xl">
                                    <div className="font-bold text-navy-900 mb-2">Collaboration</div>
                                    <p className="text-sm">Building success together.</p>
                                </div>
                                <div className="p-8 bg-slate-50 rounded-3xl">
                                    <div className="font-bold text-navy-900 mb-2">Impact</div>
                                    <p className="text-sm">Driving real, lasting change.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
