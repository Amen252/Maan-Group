import React from 'react';
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
            icon: Lightbulb,
            title: "Consulting",
            description: "Expert strategic advisory to help organizations navigate complex challenges, optimize operations, and achieve sustainable growth in a competitive landscape.",
            delay: 0.1
        },
        {
            icon: Users,
            title: "Training",
            description: "Customized professional development programs and workshops designed to bridge the skills gap and empower the next generation of leaders.",
            delay: 0.2
        },
        {
            icon: BarChart,
            title: "Capacity Building",
            description: "Strengthening the foundations of institutions and communities through targeted initiatives that enhance long-term resilience and effectiveness.",
            delay: 0.3
        },
        {
            icon: Search,
            title: "Research & Development",
            description: "Utilizing data-driven insights and rigorous analysis to provide forward-thinking solutions and strategic roadmaps for future success.",
            delay: 0.4
        }
    ];

    return (
        <main className="pt-20 bg-white min-h-screen">
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
                            Specialized <span className="text-gold-500 italic font-serif">Solutions</span> <br />
                            for Growth.
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                            We provide a comprehensive suite of professional services tailored to meet
                            the unique needs of organizations and individuals in a changing world.
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
