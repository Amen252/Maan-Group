import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Lightbulb, Users, BarChart, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-gold-500/30 transition-all duration-300 group"
    >
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-navy-900 mb-3 uppercase tracking-tight">{title}</h3>
        <p className="text-slate-600 text-[0.9rem] leading-relaxed mb-6">
            {description}
        </p>
        <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-gold-500 uppercase tracking-widest hover:underline">
            Learn More <ArrowRight size={14} />
        </Link>
    </motion.div>
);

export const Services = () => {
    const services = [
        {
            icon: BarChart,
            title: "Consulting Services",
            description: "Modernizing public and private-sector governance, developing agile leaders, and building organizational resilience through localized insights and global expertise.",
            delay: 0.1
        },
        {
            icon: Users,
            title: "Training & Development",
            description: "Unlocking human potential and igniting confidence through tailored leadership and professional readiness programs designed for the Somali context.",
            delay: 0.2
        },
        {
            icon: Lightbulb,
            title: "Capacity Building",
            description: "Strengthening foundations of institutions and amplifying unheard voices to foster impactful, long-term change within communities.",
            delay: 0.3
        },
        {
            icon: Search,
            title: "Research & Development",
            description: "Turning data and real-world stories into actionable practice and policy to provide forward-thinking solutions and strategic roadmaps.",
            delay: 0.4
        }
    ];

    return (
        <main className="pt-20 bg-white min-h-screen">
            <Helmet>
                <title>Services | Our Expertise in Strategy & Development</title>
                <meta name="description" content="Explore our core services: Consulting, Training, Capacity Building, and R&D. Helping your business grow through strategic excellence." />
                <meta property="og:title" content="Our Strategic Services | Maan Group" />
            </Helmet>
            {/* Simple Hero */}
            <section className="py-24 border-b border-slate-50">
                <div className="container mx-auto px-6 max-w-[1000px] text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-xs">
                            Our Expertise
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-bold text-navy-900 leading-tight">
                            Impact-Driven <span className="text-gold-500 italic font-serif">Solutions</span> <br />
                            for a Better Future.
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                            We offer a comprehensive range of consultancy and training services designed to
                            empower professionals and entrepreneurs in Somalia and beyond.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-[1000px]">
                    <div className="grid md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
};
