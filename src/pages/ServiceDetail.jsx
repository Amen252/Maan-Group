import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { servicesData } from '../data/services';

export const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        // Find service by ID from our data
        const foundService = servicesData.find(s => s.id === id);
        setService(foundService);
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-navy-900 mb-4">Service Not Found</h2>
                    <Link to="/services" className="btn btn-primary px-6 py-3 rounded-lg flex items-center gap-2 mx-auto w-fit">
                        <ArrowLeft size={16} /> Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="font-body pt-24 pb-20">
            <Helmet>
                <title>{service.title} | Maan Group Strategic Services</title>
                <meta name="description" content={service.description} />
                <meta property="og:title" content={`${service.title} | Maan Group`} />
                <meta property="og:description" content={service.description} />
                <meta property="og:image" content={service.image} />
            </Helmet>
            <div className="container mx-auto px-6 max-w-[1000px]">
                {/* Back Link */}
                <Link to="/services" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gold-500 transition-colors mb-10">
                    <ArrowLeft size={16} /> All Services
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-500/10 text-gold-500 mb-6">
                        <service.icon size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4 leading-tight">
                        {service.title}
                    </h1>
                    <p className="text-lg text-gold-500 font-medium tracking-wide">
                        {service.subtitle}
                    </p>
                </motion.div>

                {/* Main Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl mb-16 relative"
                >
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-navy-900/10" />
                </motion.div>

                {/* Content */}
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Main Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:col-span-2 space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-navy-900 mb-4">Overview</h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {service.fullDescription}
                        </p>
                    </motion.div>

                    {/* Sidebar / Key offerings */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-fit"
                    >
                        <h3 className="text-xl font-bold text-navy-900 mb-6">Key Offerings</h3>
                        <ul className="space-y-4">
                            {service.bullets.map((bullet, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-600">
                                    <CheckCircle size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                                    <span className="font-medium">{bullet}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 pt-8 border-t border-slate-200">
                            <p className="text-sm text-slate-500 mb-4 text-center">Ready to discuss how we can help?</p>
                            <Link to="/contact" className="btn btn-primary w-full justify-center py-3 rounded-lg shadow-lg shadow-gold-500/20">
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};
