import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventsData } from '../data/events';

const EVENTS_PER_PAGE = 6;

export const Events = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(eventsData.length / EVENTS_PER_PAGE);
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const paginatedEvents = eventsData.slice(startIndex, startIndex + EVENTS_PER_PAGE);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    return (
        <main className="pt-24 min-h-screen bg-slate-50/40">
            <Helmet>
                <title>Events and Insights | Maan Group</title>
                <meta name="description" content="Stay updated with Maan Group latest seminars, workshops, and community initiatives." />
            </Helmet>

            {/* Hero */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="text-gold-500 font-semibold uppercase tracking-[0.3em] text-[0.7rem] block mb-4">Our Journey</span>
                        <h1 className="text-4xl lg:text-5xl font-medium text-navy-900 mb-4 leading-tight">
                            Latest <span className="text-gold-500 font-serif italic font-normal">Events</span> &amp; Insights
                        </h1>
                        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">
                            Explore our recent seminars, workshops, and community initiatives designed to empower and inspire.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Cards Grid */}
            <section className="py-14">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">
                        {paginatedEvents.map((event, i) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                <Link to={'/events/' + event.id} className="group block bg-white rounded-2xl overflow-hidden border border-slate-100/60 shadow-sm hover:shadow-lg hover:shadow-navy-900/6 hover:-translate-y-1 transition-all duration-300">
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={event.images[0]}
                                            alt={event.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {startIndex + i === 0 && (
                                            <div className="absolute top-3 right-3 z-10">
                                                <span className="bg-gold-500 text-white text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full">
                                                    Recent
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="font-semibold text-navy-900 text-base leading-snug mb-3 line-clamp-2 group-hover:text-gold-600 transition-colors duration-200">
                                            {event.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
                                            {event.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5 text-slate-400 text-[11px] font-medium">
                                            <span className="flex items-center gap-1"><Calendar size={11} className="text-gold-500" />{event.date}</span>
                                            <span className="flex items-center gap-1"><MapPin size={11} className="text-gold-500" />{event.location}</span>
                                            <span className="flex items-center gap-1"><Clock size={11} className="text-gold-500" />{event.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-navy-900 group-hover:text-gold-600 transition-colors duration-200">
                                            <span>Read More</span>
                                            <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-14 flex items-center justify-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                                    currentPage === 1
                                        ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                                        : 'border-slate-200 bg-white text-navy-900 hover:border-gold-500 hover:text-gold-500 shadow-sm'
                                }`}
                                aria-label="Previous page"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                        currentPage === pageNum
                                            ? 'bg-navy-900 text-white shadow-md shadow-navy-900/20'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:border-gold-500 hover:text-gold-500 shadow-sm'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                                    currentPage === totalPages
                                        ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                                        : 'border-slate-200 bg-white text-navy-900 hover:border-gold-500 hover:text-gold-500 shadow-sm'
                                }`}
                                aria-label="Next page"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

