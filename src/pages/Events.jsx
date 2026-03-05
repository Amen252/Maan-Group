import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { eventsData } from '../data/events';

export const Events = () => {
    const navigate = useNavigate();

    const events = eventsData;

    return (
        <main className="pt-24 min-h-screen bg-slate-50/50">
            {/* Hero Section */}
            <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1280px] relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-[0.7rem] block mb-4">
                            Our Journey
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                            Latest <span className="text-gold-500 font-serif italic">Events</span> & Insights
                        </h1>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Explore our recent seminars, workshops, and community initiatives designed to empower and inspire.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                onClick={() => navigate(`/events/${event.id}`)}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-slate-100 flex flex-col h-full"
                            >
                                {/* Image fits precisely in an aspect-video container */}
                                <div className="aspect-[16/10] w-full overflow-hidden relative">
                                    <img
                                        src={event.images[0]}
                                        alt={event.title}
                                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-5 left-5">
                                        <span className="px-5 py-2 bg-navy-900/90 backdrop-blur-md text-white text-[0.6rem] font-black uppercase tracking-[0.2em] rounded-full">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-[0.65rem] text-slate-400 font-bold uppercase tracking-[0.15em] mb-4">
                                        <span className="flex items-center gap-2">
                                            <Calendar size={12} className="text-gold-500" />
                                            {event.date}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <MapPin size={12} className="text-gold-500" />
                                            {event.location}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-navy-900 mb-3 group-hover:text-gold-500 transition-colors leading-snug line-clamp-2">
                                        {event.title}
                                    </h3>

                                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-6">
                                        {event.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-navy-900 group-hover:text-gold-500 transition-colors flex items-center gap-2">
                                            Read Story <ChevronRight size={14} />
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[0.6rem] font-black text-navy-900 border-2 border-white shadow-sm">MG</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
};
