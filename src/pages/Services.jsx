import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Globe, Users, Target, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceModule = ({ id, icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="p-10 border border-slate-100 rounded-[2rem] bg-white hover:bg-slate-50 transition-all duration-300 flex flex-col justify-between group h-full shadow-sm hover:shadow-xl hover:shadow-slate-200/40"
    >
        <div className="space-y-6">
            <div className="w-12 h-12 flex items-center justify-center text-navy-900 group-hover:text-gold-500 transition-colors duration-500">
                <Icon size={32} strokeWidth={1} />
            </div>
            
            <div className="space-y-3">
                <h3 className="text-xl font-semibold text-navy-900 leading-tight">
                    {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                    {description}
                </p>
            </div>
        </div>

        <Link 
            to={`/services/${id}`}
            className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-500 mt-10 hover:gap-4 transition-all"
        >
            Service Detail
            <ChevronRight size={14} />
        </Link>
    </motion.div>
);

export const Services = () => {
    const services = [
        {
            id: 'consulting',
            icon: Globe,
            title: 'Consulting Services',
            description: 'Strategic advisory for leaders and institutions aiming to navigate complex sectors and build organizational resilience.',
            delay: 0.1
        },
        {
            id: 'training',
            icon: Users,
            title: 'Training & Development',
            description: 'Unlocking human potential through professional readiness programs and executive-level coaching designed for the Somali context.',
            delay: 0.2
        },
        {
            id: 'capacity-building',
            icon: Target,
            title: 'Capacity Building',
            description: 'Strengthening the structural foundations of organizations to foster long-term community impact and sustainable growth.',
            delay: 0.3
        },
        {
            id: 'research',
            icon: Search,
            title: 'Research & Policy',
            description: 'Translating field data into actionable practice and comprehensive policy roadmaps for successful governance and success.',
            delay: 0.4
        }
    ];

    return (
        <main className="font-body bg-white min-h-screen">
            <Helmet>
                <title>Services | Maan Group Strategic Consulting</title>
                <meta name="description" content="Explore our strategic modules in a curated 2x2 grid designed for clarity and professional excellence." />
            </Helmet>

            {/* ═══════════ SIMPLE HERO ═══════════ */}
            <section className="pt-40 pb-16">
                <div className="container mx-auto px-6 max-w-[1240px]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl space-y-4"
                    >
                        <span className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.3em]">
                            Our Specialized Focus
                        </span>
                        <h1 className="text-4xl md:text-5xl font-medium text-navy-900 leading-[1.2] tracking-tight">
                            Strategic modules <br /> for <span className="text-gold-500 italic font-serif">transformation.</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-light leading-relaxed">
                            We bridge the gap between academic theory and excellence 
                            with meticulously crafted strategic modules.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════ 2x2 GRID ═══════════ */}
            <section className="pb-32">
                <div className="container mx-auto px-6 max-w-[1240px]">
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
                        {services.map((service) => (
                            <ServiceModule key={service.id} {...service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ REFINED CTA ═══════════ */}
            <section className="py-24 border-t border-slate-50 text-center">
                <div className="container mx-auto px-6 max-w-[1240px] space-y-8">
                    <h2 className="text-3xl font-medium text-navy-900">Start your journey today</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/contact" className="px-10 py-4 bg-navy-900 text-white font-medium rounded-2xl hover:bg-gold-500 shadow-xl shadow-navy-900/10 transition-all duration-300">
                            Partner with Us
                        </Link>
                        <Link to="/about" className="px-10 py-4 border border-slate-200 text-navy-900 font-medium rounded-2xl hover:bg-slate-50 transition-all">
                            More Details
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};
