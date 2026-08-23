import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Search, Edit3, Trash2, Calendar, MapPin, Tag, ExternalLink, X, Image as ImageIcon } from 'lucide-react';
import { eventsService } from '../services/eventsService';

export const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('ALL');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        category: 'Personal Development',
        status: 'Upcoming',
        date: '',
        location: 'Mogadishu, Somalia',
        duration: 'Full Day',
        excerpt: '',
        description: '',
        imageUrl: '/assets/events/ps1.jpeg',
        hashtags: '#MaanGroup, #Somalia'
    });

    const loadEvents = () => {
        setEvents(eventsService.getAllEvents());
    };

    useEffect(() => {
        loadEvents();
        const handleUpdate = () => loadEvents();
        window.addEventListener('events_updated', handleUpdate);
        return () => window.removeEventListener('events_updated', handleUpdate);
    }, []);

    const openCreateModal = () => {
        setEditingEvent(null);
        setFormData({
            title: '',
            category: 'Personal Development',
            status: 'Upcoming',
            date: 'Coming Soon',
            location: 'Mogadishu, Somalia',
            duration: 'Full Day',
            excerpt: '',
            description: '### Event Overview\nJoin us for an inspiring session...\n\n### Key Highlights\n* **Topic 1:** Details here\n* **Topic 2:** Details here',
            imageUrl: '/assets/events/ps1.jpeg',
            hashtags: '#MaanGroup, #YouthEmpowerment, #Somalia'
        });
        setIsModalOpen(true);
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title || '',
            category: event.category || 'Personal Development',
            status: event.status || 'Upcoming',
            date: event.date || '',
            location: event.location || '',
            duration: event.duration || 'Full Day',
            excerpt: event.excerpt || '',
            description: event.description || '',
            imageUrl: event.images && event.images.length > 0 ? event.images[0] : '/assets/events/ps1.jpeg',
            hashtags: event.hashtags ? event.hashtags.join(', ') : ''
        });
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const hashtagsArray = formData.hashtags
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0)
            .map(t => (t.startsWith('#') ? t : `#${t}`));

        const payload = {
            title: formData.title,
            category: formData.category,
            status: formData.status,
            date: formData.date,
            location: formData.location,
            duration: formData.duration,
            excerpt: formData.excerpt,
            description: formData.description,
            images: [formData.imageUrl],
            hashtags: hashtagsArray
        };

        if (editingEvent) {
            eventsService.updateEvent(editingEvent.id, payload);
        } else {
            eventsService.createEvent(payload);
        }

        setIsModalOpen(false);
    };

    const handleDelete = (id, title) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            eventsService.deleteEvent(id);
        }
    };

    const categories = ['ALL', ...new Set(events.map(e => e.category))];

    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.location.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === 'ALL' || e.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <Helmet>
                <title>Events Manager | Maan Group Admin</title>
            </Helmet>

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Events Management</h1>
                    <p className="text-slate-500 text-xs mt-1">Create, update, and manage all events shown on the website</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={openCreateModal}
                        className="px-5 py-2.5 rounded-xl bg-gold-500 text-white text-xs font-semibold tracking-wide hover:bg-gold-600 transition-all duration-200 shadow-md shadow-gold-500/20 flex items-center gap-2 cursor-pointer"
                    >
                        <Plus size={16} /> Add New Event
                    </button>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search events by title or venue..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Category:</span>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                                categoryFilter === cat
                                    ? 'bg-navy-900 text-white shadow-sm'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Events Table / Cards */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                <th className="py-3.5 px-6">Event</th>
                                <th className="py-3.5 px-4">Category</th>
                                <th className="py-3.5 px-4">Date & Venue</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredEvents.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-slate-400 text-xs">
                                        No events found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredEvents.map((event) => (
                                    <tr key={event.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={event.images && event.images[0] ? event.images[0] : '/assets/events/ps1.jpeg'}
                                                    alt=""
                                                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                                                />
                                                <div>
                                                    <div className="font-semibold text-navy-900 text-sm line-clamp-1">{event.title}</div>
                                                    <div className="text-slate-400 text-xs line-clamp-1">{event.excerpt}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-navy-900/5 text-navy-900">
                                                <Tag size={10} /> {event.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-xs text-slate-700 font-medium flex items-center gap-1"><Calendar size={11} className="text-gold-500" /> {event.date}</div>
                                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5"><MapPin size={11} /> {event.location}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                event.status === 'Upcoming'
                                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`/events/${event.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="View Public Page"
                                                    className="p-2 text-slate-400 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition-colors"
                                                >
                                                    <ExternalLink size={15} />
                                                </a>
                                                <button
                                                    onClick={() => openEditModal(event)}
                                                    title="Edit Event"
                                                    className="p-2 text-slate-500 hover:text-gold-600 hover:bg-gold-50 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Edit3 size={15} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(event.id, event.title)}
                                                    title="Delete Event"
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 my-8">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="font-bold text-lg text-navy-900">
                                    {editingEvent ? 'Edit Event Details' : 'Create New Event'}
                                </h3>
                                <p className="text-xs text-slate-400">Fill in details to publish onto the live website</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Event Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Masterclass on Entrepreneurial Strategy"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                                />
                            </div>

                            {/* Category & Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Category *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g. Personal Development, Technology"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Status *
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                                    >
                                        <option value="Upcoming">Upcoming (Registration Open)</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Past Event">Past Event</option>
                                    </select>
                                </div>
                            </div>

                            {/* Date, Location, Duration */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Date Display *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        placeholder="e.g. Oct 25, 2026 or Recent"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="e.g. Jamhuuriya University"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                        Duration
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        placeholder="e.g. Full Day or 2 Hours"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Cover Image */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Cover Image URL
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        placeholder="/assets/events/ps1.jpeg or https://..."
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                                    />
                                    {formData.imageUrl && (
                                        <img src={formData.imageUrl} alt="" className="w-11 h-11 rounded-xl object-cover border border-slate-200 flex-shrink-0" />
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="text-[10px] text-slate-400">Quick select assets:</span>
                                    {['/assets/events/ps1.jpeg', '/assets/events/empowering-somali-youth.jpeg', '/assets/events/communication-skills.jpeg', '/assets/events/digital-skills.jpeg'].map(img => (
                                        <button
                                            type="button"
                                            key={img}
                                            onClick={() => setFormData({ ...formData, imageUrl: img })}
                                            className="text-[10px] text-navy-900 bg-slate-100 hover:bg-gold-500 hover:text-white px-2 py-0.5 rounded transition-colors"
                                        >
                                            {img.split('/').pop()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Short Summary (Excerpt) *
                                </label>
                                <textarea
                                    rows="2"
                                    required
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief 1-2 sentence overview for the card summary..."
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                                />
                            </div>

                            {/* Full Markdown Description */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Full Story & Description (Supports Markdown)
                                </label>
                                <textarea
                                    rows="6"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="### Overview

Full details here...

* Highlight 1
* Highlight 2"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono text-xs focus:outline-none focus:border-gold-500 focus:bg-white"
                                />
                            </div>

                            {/* Hashtags */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                    Hashtags (Comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.hashtags}
                                    onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                                    placeholder="#MaanGroup, #Education, #Somalia"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-semibold hover:bg-gold-500 transition-all duration-200 shadow-md shadow-navy-900/10 cursor-pointer"
                                >
                                    {editingEvent ? 'Save Changes' : 'Publish Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
