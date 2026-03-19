import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowLeft, Share2, Tag, ChevronRight, Clock, Check } from 'lucide-react';
import { eventsData } from '../data/events';

export const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const event = eventsData.find(e => e.id === parseInt(id));
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleShare = async () => {
        const shareData = {
            title: event?.title,
            text: event?.excerpt,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white pt-24">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-navy-900 mb-4">Event Not Found</h2>
                    <Link to="/events" className="text-gold-500 font-bold flex items-center gap-2 justify-center">
                        <ArrowLeft size={18} /> Back to Events
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <Helmet>
                <title>{event.title} | Maan Group Events</title>
                <meta name="description" content={event.excerpt} />
                <meta property="og:title" content={`${event.title} | Maan Group`} />
                <meta property="og:description" content={event.excerpt} />
                <meta property="og:image" content={event.images[0]} />
            </Helmet>
            {/* Header Area */}
            <section className="bg-slate-50 py-12 lg:py-16">
                <div className="container mx-auto px-6 max-w-[1200px]">
                    <Link to="/events" className="inline-flex items-center gap-2 text-slate-500 hover:text-gold-500 transition-colors mb-8 font-bold text-xs uppercase tracking-widest group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to All Events
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            <span className="px-3 md:px-4 py-1 bg-gold-500/10 text-gold-500 text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-widest rounded-full">
                                {event.category}
                            </span>
                            <span className="px-3 md:px-4 py-1 bg-navy-900 text-white text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-widest rounded-full">
                                {event.status}
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-5xl font-medium text-navy-900 leading-[1.2]">
                            {event.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-gold-500" />
                                {event.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-gold-500" />
                                {event.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-gold-500" />
                                Duration: Full Day
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Cover Image Area */}
            <section className="pb-12 lg:pb-16 bg-white">
                <div className="container mx-auto px-6 max-w-[1100px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl overflow-hidden shadow-lg aspect-video w-full"
                    >
                        <img
                            src={event.images[0]}
                            alt="Event Cover"
                            className="w-full h-full object-cover object-top"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-6 max-w-[1200px]">
                    <div className="grid lg:grid-cols-[1fr_300px] gap-16">

                        {/* Post Content */}
                        <article className="space-y-12">
                            <div className="space-y-8">
                                <p className="text-xl lg:text-2xl text-navy-900 font-medium leading-relaxed italic border-l-[6px] border-gold-500 pl-8 py-2">
                                    {event.excerpt}
                                </p>
                                <div className="text-slate-600 leading-[1.8] text-lg space-y-4">
                                    {event.description.split('\n').map((line, index) => {
                                        if (!line.trim()) return <div key={index} className="h-4" />;

                                        // Handle Section Headers (### or ending with :)
                                        if (line.trim().startsWith('### ')) {
                                            const content = line.trim().substring(4).trim();
                                            return (
                                                <h3 key={index} className="text-2xl font-bold text-navy-900 pt-6 mt-6 border-t border-slate-100 mb-4 uppercase tracking-wider text-sm">
                                                    {content}
                                                </h3>
                                            );
                                        } else if (line.trim().endsWith(':')) {
                                            return (
                                                <h3 key={index} className="text-xl pt-4 mb-2 font-medium text-navy-900">
                                                    {line}
                                                </h3>
                                            );
                                        }

                                        // Handle Bullet Points
                                        if (line.trim().startsWith('* ')) {
                                            const content = line.trim().substring(2).trim();
                                            return (
                                                <div key={index} className="flex gap-4 items-start pl-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2.5 flex-shrink-0" />
                                                    <p dangerouslySetInnerHTML={{
                                                        __html: content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-navy-900">$1</strong>')
                                                    }} />
                                                </div>
                                            );
                                        }

                                        // Standard Paragraphs
                                        return (
                                            <p key={index} dangerouslySetInnerHTML={{
                                                __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-navy-900">$1</strong>')
                                            }} />
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Gallery/Article Images */}
                            {event.images.length > 1 && (
                                <div className="space-y-8 pt-8">
                                    <h3 className="text-xl font-bold text-navy-900 uppercase tracking-widest flex items-center gap-3">
                                        <div className="w-8 h-1 bg-gold-500" /> Event Gallery
                                    </h3>
                                    <div className="grid gap-8">
                                        {event.images.slice(1).map((img, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                className="rounded-3xl overflow-hidden shadow-xl"
                                            >
                                                <img src={img} alt={`Gallery ${i}`} className="w-full h-auto object-cover" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-3 pt-10">
                                {event.hashtags.map(tag => (
                                    <span key={tag} className="text-sm font-bold text-gold-500 hover:underline cursor-pointer">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>

                        {/* Sidebar */}
                        <aside className="space-y-12">
                            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 sticky top-32">
                                <h4 className="text-navy-900 font-bold mb-6 text-sm uppercase tracking-widest">Organized by</h4>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2.5 shadow-md border border-slate-200/60 transition-transform hover:scale-105 duration-300">
                                        <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <div className="text-navy-900 font-black text-sm uppercase">MaanGroup</div>
                                        <div className="text-[0.6rem] text-gold-500 font-bold uppercase tracking-tighter">Strategic Advisor</div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed mb-8">
                                    Empowering minds through education and professional exposure. MaanGroup is dedicated to building sustainable bridges for youth success.
                                </p>
                                <button 
                                    onClick={handleShare}
                                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-bold uppercase tracking-widest text-[10px] ${
                                        isCopied 
                                        ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                                        : 'bg-gold-500 text-white shadow-lg shadow-gold-500/20 hover:bg-gold-600'
                                    }`}
                                >
                                    {isCopied ? (
                                        <>
                                            <Check size={16} /> Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Share2 size={16} /> Share Event
                                        </>
                                    )}
                                </button>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>
        </main>
    );
};
