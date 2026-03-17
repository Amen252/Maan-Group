import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { eventsData } from '../data/events';

export const Events = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = React.useState(1);
    const eventsPerPage = 4;

    const events = eventsData;
    
    // Pagination Logic
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="pt-24 min-h-screen bg-slate-50/50">
            <Helmet>
                <title>Events & Insights | Maan Group</title>
                <meta name="description" content="Stay updated with Maan Group's latest seminars, workshops, and community initiatives in Somalia and East Africa." />
                <meta property="og:title" content="Latest Events & Insights | Maan Group" />
            </Helmet>
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
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <div className="grid sm:grid-cols-2 gap-6">
                        {currentEvents.map((event) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55 }}
                                onClick={() => navigate(`/events/${event.id}`)}
                                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transition-all duration-300 flex flex-col group cursor-pointer"
                            >
                                {/* Image Banner with Overlay Title */}
                                <div className="relative h-48 md:h-72 overflow-hidden flex-shrink-0">
                                    <img
                                        src={event.images[0]}
                                        alt={event.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-4 md:p-5">
                                        <h3 className="text-white font-semibold text-lg md:text-xl leading-tight">{event.title}</h3>
                                        <p className="text-gold-400 text-[10px] md:text-xs font-medium mt-0.5 tracking-wide">{event.category}</p>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-5 flex-1">
                                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-2">{event.excerpt}</p>

                                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">
                                        <Calendar size={12} className="text-gold-500" />
                                        {event.date}
                                    </div>

                                    {/* Learn More */}
                                    <div
                                        className="mt-auto inline-flex items-center gap-2 text-[10px] md:text-xs font-semibold text-navy-900 border border-navy-900/20 px-3 md:px-4 py-2 md:py-2.5 rounded-md transition-all duration-300 w-fit"
                                    >
                                        Read More <ArrowRight size={12} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-20 flex justify-center items-center gap-3">
                            <button
                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all duration-300 ${currentPage === 1 ? 'border-slate-100 text-slate-300 cursor-not-allowed' : 'border-navy-900/10 text-navy-900 hover:bg-navy-900 hover:text-white'}`}
                            >
                                Previous
                            </button>
                            
                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-300 ${currentPage === i + 1 ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20' : 'bg-white border border-slate-100 text-slate-600 hover:border-gold-500 hover:text-gold-500'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all duration-300 ${currentPage === totalPages ? 'border-slate-100 text-slate-300 cursor-not-allowed' : 'border-navy-900/10 text-navy-900 hover:bg-navy-900 hover:text-white'}`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>

        </main>
    );
};
