import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { 
    Plus, 
    Search, 
    Edit3, 
    Trash2, 
    Calendar, 
    MapPin, 
    ExternalLink, 
    X, 
    Users,
    LayoutGrid,
    Table as TableIcon,
    Star,
    Download,
    Share2,
    Copy,
    Check,
    MessageCircle,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import { eventsService, DEFAULT_REGISTRATION_FIELDS } from '../services/eventsService';

export const AdminEvents = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') || 'events';
    const initialEventFilter = searchParams.get('event') || 'ALL';

    const [mainTab, setMainTab] = useState(initialTab);
    const [viewMode, setViewMode] = useState('grid');
    
    // Events state
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('ALL');

    // Registrations state
    const [registrations, setRegistrations] = useState([]);
    const [regSearch, setRegSearch] = useState('');
    const [selectedEventId, setSelectedEventId] = useState(initialEventFilter);
    const [editingAttendee, setEditingAttendee] = useState(null);
    const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);

    // Newly Published Event Share Modal
    const [publishedEvent, setPublishedEvent] = useState(null);
    const [copiedEventId, setCopiedEventId] = useState(null);

    const [attendeeForm, setAttendeeForm] = useState({
        eventId: '',
        name: '',
        email: '',
        phone: '',
        organization: '',
        department: 'Computer Application',
        classYear: '2025-2026'
    });

    // Event Create/Edit Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [modalTab, setModalTab] = useState('details');

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
        hashtags: '#MaanGroup, #Somalia',
        registrationEnabled: true,
        customFields: DEFAULT_REGISTRATION_FIELDS
    });

    const [newFieldLabel, setNewFieldLabel] = useState('');
    const [newFieldType, setNewFieldType] = useState('text');
    const [newFieldRequired, setNewFieldRequired] = useState(false);
    const [newFieldOptions, setNewFieldOptions] = useState('');

    const refreshData = () => {
        setEvents(eventsService.getAllEvents());
        setRegistrations(eventsService.getRegistrations());
    };

    useEffect(() => {
        refreshData();
        const handleUpdate = () => refreshData();
        window.addEventListener('events_updated', handleUpdate);
        window.addEventListener('registrations_updated', handleUpdate);
        return () => {
            window.removeEventListener('events_updated', handleUpdate);
            window.removeEventListener('registrations_updated', handleUpdate);
        };
    }, []);

    const getAttendeeCountForEvent = (eventId, eventTitle) => {
        return registrations.filter(r => r.eventId === eventId || r.eventTitle === eventTitle).length;
    };

    const handleSwitchToAttendeesForEvent = (event) => {
        setSelectedEventId(event.title);
        setMainTab('attendees');
        setSearchParams({ tab: 'attendees', event: event.title });
    };

    const handleToggleStar = (id) => {
        eventsService.toggleStarRegistration(id);
    };

    const getShareableLink = (eventId) => {
        const origin = window.location.origin;
        return `${origin}/events/${eventId}?register=true`;
    };

    const handleCopyLink = (event) => {
        const link = getShareableLink(event.id);
        navigator.clipboard.writeText(link).then(() => {
            setCopiedEventId(event.id);
            setTimeout(() => setCopiedEventId(null), 2500);
        });
    };

    const openCreateModal = () => {
        setEditingEvent(null);
        setModalTab('details');
        setFormData({
            title: '',
            category: 'Personal Development',
            status: 'Upcoming',
            date: 'Upcoming',
            location: 'Jamhuuriya University (JUST)',
            duration: 'Full Day',
            excerpt: '',
            description: '### Event Overview\nJoin our strategic session to elevate your professional skills.\n\n### Key Takeaways\n* **Strategy:** Practical frameworks\n* **Networking:** Connect with leaders',
            imageUrl: '/assets/events/ps1.jpeg',
            hashtags: '#MaanGroup, #YouthLeadership, #Somalia',
            registrationEnabled: true,
            customFields: [
                ...DEFAULT_REGISTRATION_FIELDS,
                { id: 'field_' + Date.now(), label: 'Current University / Major', type: 'text', required: true, placeholder: 'e.g. IT, Business, Economics' }
            ]
        });
        setIsModalOpen(true);
    };

    const openEditModal = (event) => {
        setEditingEvent(event);
        setModalTab('details');
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
            hashtags: event.hashtags ? event.hashtags.join(', ') : '',
            registrationEnabled: event.registrationEnabled !== undefined ? event.registrationEnabled : (event.status === 'Upcoming'),
            customFields: event.customFields && event.customFields.length > 0 ? event.customFields : DEFAULT_REGISTRATION_FIELDS
        });
        setIsModalOpen(true);
    };

    const handleAddCustomField = (e) => {
        e.preventDefault();
        if (!newFieldLabel.trim()) return;

        const optionsArray = newFieldOptions
            .split(',')
            .map(o => o.trim())
            .filter(o => o.length > 0);

        const newField = {
            id: 'field_' + Date.now(),
            label: newFieldLabel.trim(),
            type: newFieldType,
            required: newFieldRequired,
            placeholder: `Enter ${newFieldLabel.toLowerCase()}...`,
            options: optionsArray.length > 0 ? optionsArray : undefined
        };

        setFormData({
            ...formData,
            customFields: [...formData.customFields, newField]
        });

        setNewFieldLabel('');
        setNewFieldType('text');
        setNewFieldRequired(false);
        setNewFieldOptions('');
    };

    const handleRemoveCustomField = (fieldId) => {
        if (fieldId === 'name' || fieldId === 'email') {
            alert('Full Name and Email are standard core fields.');
            return;
        }
        setFormData({
            ...formData,
            customFields: formData.customFields.filter(f => f.id !== fieldId)
        });
    };

    const handleSaveEvent = (e) => {
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
            hashtags: hashtagsArray,
            registrationEnabled: formData.status === 'Upcoming' ? formData.registrationEnabled : false,
            customFields: formData.customFields
        };

        let resultEvent = null;
        if (editingEvent) {
            resultEvent = eventsService.updateEvent(editingEvent.id, payload);
            setIsModalOpen(false);
        } else {
            resultEvent = eventsService.createEvent(payload);
            setIsModalOpen(false);
            // Immediately open the Share Link Modal for the newly created event!
            setPublishedEvent(resultEvent);
        }
    };

    const handleDeleteEvent = (id, title) => {
        if (window.confirm(`Delete "${title}"?`)) {
            eventsService.deleteEvent(id);
        }
    };

    const handleDeleteRegistration = (id, name) => {
        if (window.confirm(`Delete registration for ${name}?`)) {
            eventsService.deleteRegistration(id);
        }
    };

    const openInsertAttendeeModal = () => {
        setEditingAttendee(null);
        setAttendeeForm({
            eventId: events[0]?.id || '',
            name: '',
            email: '',
            phone: '',
            organization: 'Jamhuuriya University',
            department: 'Computer Application',
            classYear: '2025-2026'
        });
        setIsInsertModalOpen(true);
    };

    const openEditAttendeeModal = (attendee) => {
        setEditingAttendee(attendee);
        setAttendeeForm({
            eventId: attendee.eventId || events[0]?.id || '',
            name: attendee.name || '',
            email: attendee.email || '',
            phone: attendee.phone || '',
            organization: attendee.organization || '',
            department: attendee.customResponses?.Department || 'Computer Application',
            classYear: attendee.customResponses?.['Class / Year'] || '2025-2026'
        });
        setIsInsertModalOpen(true);
    };

    const handleSaveAttendee = (e) => {
        e.preventDefault();
        const targetEvent = events.find(ev => ev.id === parseInt(attendeeForm.eventId) || ev.id === attendeeForm.eventId);

        if (editingAttendee) {
            eventsService.updateRegistration(editingAttendee.id, {
                name: attendeeForm.name,
                email: attendeeForm.email,
                phone: attendeeForm.phone,
                organization: attendeeForm.organization,
                eventId: targetEvent ? targetEvent.id : editingAttendee.eventId,
                eventTitle: targetEvent ? targetEvent.title : editingAttendee.eventTitle,
                customResponses: {
                    ...(editingAttendee.customResponses || {}),
                    'Department': attendeeForm.department,
                    'Class / Year': attendeeForm.classYear
                }
            });
        } else {
            if (targetEvent && targetEvent.status === 'Past Event') {
                alert('Cannot register attendees for past events.');
                return;
            }

            eventsService.registerAttendee({
                eventId: targetEvent ? targetEvent.id : events[0]?.id,
                name: attendeeForm.name,
                email: attendeeForm.email,
                phone: attendeeForm.phone,
                organization: attendeeForm.organization,
                customResponses: {
                    'Department': attendeeForm.department,
                    'Class / Year': attendeeForm.classYear
                }
            });
        }

        setIsInsertModalOpen(false);
    };

    const handleExportCSV = () => {
        const toExport = filteredRegistrations;
        if (toExport.length === 0) {
            alert('No attendee records to export.');
            return;
        }

        const headers = ['ID', 'Attendee Name', 'Phone', 'Event Title', 'Department / Org', 'Class / Year', 'Status', 'Date'];
        const rows = toExport.map(r => [
            r.id,
            `"${(r.name || '').replace(/"/g, '""')}"`,
            r.phone,
            `"${(r.eventTitle || '').replace(/"/g, '""')}"`,
            `"${(r.customResponses?.Department || r.organization || '').replace(/"/g, '""')}"`,
            `"${(r.customResponses?.['Class / Year'] || '').replace(/"/g, '""')}"`,
            r.status,
            new Date(r.registeredAt).toLocaleDateString()
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `attendees_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const categories = ['ALL', ...new Set(events.map(e => e.category))];
    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.location.toLowerCase().includes(search.toLowerCase()) ||
            (e.excerpt && e.excerpt.toLowerCase().includes(search.toLowerCase()));
        const matchesCategory = categoryFilter === 'ALL' || e.category === categoryFilter;
        const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const eventOptions = ['ALL', ...new Set(events.map(e => e.title))];
    const filteredRegistrations = registrations.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(regSearch.toLowerCase()) ||
            r.phone.toLowerCase().includes(regSearch.toLowerCase()) ||
            r.id.toLowerCase().includes(regSearch.toLowerCase()) ||
            (r.organization && r.organization.toLowerCase().includes(regSearch.toLowerCase()));
        const matchesEvent = selectedEventId === 'ALL' || r.eventTitle === selectedEventId;
        return matchesSearch && matchesEvent;
    });

    return (
        <div className="font-nunito space-y-6 text-slate-700">
            <Helmet>
                <title>Events &amp; Attendees | Maan Group Admin</title>
            </Helmet>

            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Events &amp; Registrations</h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                        Manage events directory and participant rosters
                    </p>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                    {mainTab === 'attendees' ? (
                        <>
                            <button
                                onClick={handleExportCSV}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
                            >
                                <Download size={14} /> Export CSV
                            </button>
                            <button
                                onClick={openInsertAttendeeModal}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                            >
                                <Plus size={15} /> Insert
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-medium transition-colors shadow-xs cursor-pointer"
                        >
                            <Plus size={15} /> Add Event
                        </button>
                    )}
                </div>
            </div>

            {/* Main Tabs Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => { setMainTab('events'); setSearchParams({ tab: 'events' }); }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            mainTab === 'events'
                                ? 'bg-white text-navy-900 shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <Calendar size={14} />
                        <span>Events Directory</span>
                        <span className="ml-1 px-2 py-0.2 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold">
                            {events.length}
                        </span>
                    </button>

                    <button
                        onClick={() => { setMainTab('attendees'); setSearchParams({ tab: 'attendees' }); }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            mainTab === 'attendees'
                                ? 'bg-white text-navy-900 shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <Users size={14} />
                        <span>Attendee Registrations</span>
                        <span className="ml-1 px-2 py-0.2 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold">
                            {registrations.length}
                        </span>
                    </button>
                </div>

                {mainTab === 'events' && (
                    <div className="flex items-center gap-1 bg-white border border-slate-200/80 p-1 rounded-xl self-end sm:self-auto">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                                viewMode === 'grid' ? 'bg-slate-100 text-navy-900 font-semibold' : 'text-slate-400 hover:text-slate-600'
                            }`}
                            title="3-Column Card Grid"
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                                viewMode === 'table' ? 'bg-slate-100 text-navy-900 font-semibold' : 'text-slate-400 hover:text-slate-600'
                            }`}
                            title="Table View"
                        >
                            <TableIcon size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* TAB 1: EVENTS */}
            {mainTab === 'events' && (
                <div className="space-y-5">
                    {/* Modern Filter Bar */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
                        <div className="relative flex-1">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title, venue, or keyword..."
                                className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-navy-900 focus:bg-white transition-all font-medium"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X size={13} />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'ALL' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>

                            <div className="inline-flex bg-slate-100 p-1 rounded-xl">
                                {['ALL', 'Upcoming', 'Past Event'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                            statusFilter === status
                                                ? 'bg-white text-navy-900 shadow-2xs'
                                                : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                    >
                                        {status === 'ALL' ? 'All' : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Events Grid or Table */}
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredEvents.map((event) => {
                                const count = getAttendeeCountForEvent(event.id, event.title);
                                const isCopied = copiedEventId === event.id;
                                return (
                                    <div 
                                        key={event.id} 
                                        className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-xs hover:shadow-sm hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="relative h-48 overflow-hidden bg-slate-100">
                                                <img
                                                    src={event.images?.[0] || '/assets/events/ps1.jpeg'}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-3 left-3">
                                                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/95 backdrop-blur-sm text-navy-900 shadow-2xs">
                                                        {event.category}
                                                    </span>
                                                </div>
                                                <div className="absolute top-3 right-3">
                                                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${
                                                        event.status === 'Upcoming'
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-slate-800/85 text-white backdrop-blur-sm'
                                                    }`}>
                                                        {event.status}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-5 sm:p-6 space-y-3.5">
                                                <h3 className="font-semibold text-navy-900 text-base leading-snug line-clamp-2">
                                                    {event.title}
                                                </h3>
                                                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 font-normal">
                                                    {event.excerpt}
                                                </p>

                                                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500 font-normal">
                                                    <div className="flex items-center gap-2 truncate">
                                                        <Calendar size={13} className="text-slate-400 flex-shrink-0" /> 
                                                        <span className="truncate">{event.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 truncate">
                                                        <MapPin size={13} className="text-slate-400 flex-shrink-0" /> 
                                                        <span className="truncate">{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between pt-1">
                                                        <button
                                                            onClick={() => handleSwitchToAttendeesForEvent(event)}
                                                            className="text-navy-900 font-semibold text-xs hover:underline flex items-center gap-1 cursor-pointer"
                                                        >
                                                            <Users size={13} className="text-slate-400" />
                                                            <span>{count} Attendees Registered</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-5 sm:px-6 py-3.5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
                                            {/* Share / Copy Link button */}
                                            <button
                                                onClick={() => handleCopyLink(event)}
                                                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                                    isCopied
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                                                }`}
                                                title="Copy public registration link"
                                            >
                                                {isCopied ? <Check size={13} /> : <Share2 size={13} />}
                                                <span>{isCopied ? 'Link Copied!' : 'Share Link'}</span>
                                            </button>

                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => openEditModal(event)}
                                                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteEvent(event.id, event.title)}
                                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                                    title="Delete event"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-xs overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#1f377d] text-white text-[11px] font-bold uppercase tracking-wider">
                                        <th className="py-4 px-6">Event</th>
                                        <th className="py-4 px-4">Date &amp; Venue</th>
                                        <th className="py-4 px-4">Status</th>
                                        <th className="py-4 px-4">Attendees</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs">
                                    {filteredEvents.map((event) => {
                                        const count = getAttendeeCountForEvent(event.id, event.title);
                                        const isCopied = copiedEventId === event.id;
                                        return (
                                            <tr key={event.id} className="hover:bg-slate-50/70 transition-colors">
                                                <td className="py-3.5 px-6 font-semibold text-navy-900">
                                                    {event.title}
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-600">
                                                    {event.date} · {event.location}
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                                                        event.status === 'Upcoming' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                        {event.status}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-4">
                                                    <button
                                                        onClick={() => handleSwitchToAttendeesForEvent(event)}
                                                        className="font-semibold text-blue-600 hover:underline"
                                                    >
                                                        {count} Registered
                                                    </button>
                                                </td>
                                                <td className="py-3.5 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => handleCopyLink(event)}
                                                            className={`px-2 py-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                                                                isCopied ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                                            }`}
                                                            title="Copy share link"
                                                        >
                                                            {isCopied ? 'Copied' : 'Share'}
                                                        </button>
                                                        <button
                                                            onClick={() => openEditModal(event)}
                                                            className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteEvent(event.id, event.title)}
                                                            className="p-1 text-slate-400 hover:text-red-600"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {/* TAB 2: ATTENDEE REGISTRATIONS */}
            {mainTab === 'attendees' && (
                <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs">
                        <div className="relative flex-1">
                            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={regSearch}
                                onChange={(e) => setRegSearch(e.target.value)}
                                placeholder="Search attendee name, phone, ID..."
                                className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-navy-900"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Event:</span>
                            <select
                                value={selectedEventId}
                                onChange={(e) => setSelectedEventId(e.target.value)}
                                className="px-3 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer max-w-xs truncate"
                            >
                                {eventOptions.map(t => (
                                    <option key={t} value={t}>{t === 'ALL' ? 'All Events' : t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#1f377d] text-white text-[11px] font-bold uppercase tracking-wider">
                                        <th className="py-4 px-5">ID</th>
                                        <th className="py-4 px-5">NAME</th>
                                        <th className="py-4 px-4">PHONE</th>
                                        <th className="py-4 px-4">EVENT / WORKSHOP</th>
                                        <th className="py-4 px-4">DEPARTMENT</th>
                                        <th className="py-4 px-4">YEAR</th>
                                        <th className="py-4 px-5 text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-xs">
                                    {filteredRegistrations.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="py-14 text-center text-slate-400 font-medium">
                                                No attendee records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredRegistrations.map((r) => (
                                            <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                                                <td className="py-3.5 px-5 font-bold text-navy-900 whitespace-nowrap">
                                                    {r.id}
                                                </td>
                                                <td className="py-3.5 px-5">
                                                    <div className="font-semibold text-slate-900">{r.name}</div>
                                                    <div className="text-slate-400 text-[11px] mt-0.5">{r.email}</div>
                                                </td>
                                                <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                                                    {r.phone}
                                                </td>
                                                <td className="py-3.5 px-4 font-medium text-navy-900 max-w-xs truncate">
                                                    {r.eventTitle}
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-600 font-medium max-w-xs truncate">
                                                    {r.customResponses?.Department || r.organization || 'Computer Application'}
                                                </td>
                                                <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap">
                                                    {r.customResponses?.['Class / Year'] || new Date(r.registeredAt).getFullYear()}
                                                </td>
                                                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => handleToggleStar(r.id)}
                                                            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                                                r.isStarred
                                                                    ? 'border-amber-300 text-amber-500 bg-amber-50'
                                                                    : 'border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200'
                                                            }`}
                                                            title={r.isStarred ? 'Starred' : 'Star'}
                                                        >
                                                            <Star size={14} className={r.isStarred ? 'fill-amber-500' : ''} />
                                                        </button>

                                                        <button
                                                            onClick={() => openEditAttendeeModal(r)}
                                                            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                                            title="Edit"
                                                        >
                                                            <Edit3 size={14} />
                                                        </button>

                                                        <button
                                                            onClick={() => handleDeleteRegistration(r.id, r.name)}
                                                            className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={14} />
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
                </div>
            )}

            {/* EVENT SHARE SUCCESS POPUP MODAL (Gives link immediately after creation) */}
            {publishedEvent && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                                <CheckCircle2 size={18} />
                                <span>Event Published Successfully!</span>
                            </div>
                            <button
                                onClick={() => setPublishedEvent(null)}
                                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-navy-900 leading-snug">
                                {publishedEvent.title}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                Share this direct registration link with your students, attendees, or audience. Anyone with the link can fill out the registration form and their information will immediately appear in your Attendees dashboard.
                            </p>
                        </div>

                        {/* Link Copy Box */}
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
                                Public Registration Link
                            </span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={getShareableLink(publishedEvent.id)}
                                    className="flex-1 bg-white px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 select-all"
                                />
                                <button
                                    onClick={() => handleCopyLink(publishedEvent)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                                        copiedEventId === publishedEvent.id
                                            ? 'bg-emerald-600 text-white shadow-xs'
                                            : 'bg-navy-900 text-white hover:bg-navy-800'
                                    }`}
                                >
                                    {copiedEventId === publishedEvent.id ? (
                                        <>
                                            <Check size={14} /> Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} /> Copy Link
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Quick Share Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Register now for "${publishedEvent.title}": ${getShareableLink(publishedEvent.id)}`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
                            >
                                <MessageCircle size={15} /> WhatsApp
                            </a>
                            <a
                                href={getShareableLink(publishedEvent.id)}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                            >
                                <ExternalLink size={15} /> Preview Form
                            </a>
                        </div>

                        <div className="pt-2">
                            <button
                                onClick={() => setPublishedEvent(null)}
                                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Event Create / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl border border-slate-200 flex flex-col my-6">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg text-navy-900">
                                    {editingEvent ? 'Edit Event' : 'Create Event'}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5">Details and registration form settings</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex border-b border-slate-100 px-6 gap-6 text-xs font-medium">
                            <button
                                type="button"
                                onClick={() => setModalTab('details')}
                                className={`py-3 border-b-2 transition-colors ${
                                    modalTab === 'details'
                                        ? 'border-navy-900 text-navy-900 font-semibold'
                                        : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                1. Event Details
                            </button>
                            <button
                                type="button"
                                onClick={() => setModalTab('form_builder')}
                                className={`py-3 border-b-2 transition-colors ${
                                    modalTab === 'form_builder'
                                        ? 'border-navy-900 text-navy-900 font-semibold'
                                        : 'border-transparent text-slate-400 hover:text-slate-600'
                                }`}
                            >
                                2. Registration Questions ({formData.customFields.length})
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-5">
                            {modalTab === 'details' ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Event Title *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Category *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Status *</label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                                            >
                                                <option value="Upcoming">Upcoming (Registration Open)</option>
                                                <option value="Ongoing">Ongoing</option>
                                                <option value="Past Event">Past Event</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Date *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Location *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-600 mb-1">Duration</label>
                                            <input
                                                type="text"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Cover Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Excerpt *</label>
                                        <textarea
                                            rows="2"
                                            required
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">Description (Markdown)</label>
                                        <textarea
                                            rows="4"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:border-navy-900 focus:bg-white"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <div className="space-y-2.5">
                                        {formData.customFields.map((field, idx) => (
                                            <div key={field.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-slate-400 font-medium">{idx + 1}.</span>
                                                    <div>
                                                        <span className="font-medium text-slate-800">{field.label}</span>
                                                        {field.required && <span className="ml-2 text-[10px] text-slate-500 font-normal">(Required)</span>}
                                                    </div>
                                                </div>
                                                {field.id !== 'name' && field.id !== 'email' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveCustomField(field.id)}
                                                        className="text-slate-400 hover:text-red-500 p-1"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                                        <span className="text-xs font-medium text-slate-700 block">Add Custom Question</span>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={newFieldLabel}
                                                onChange={(e) => setNewFieldLabel(e.target.value)}
                                                placeholder="Question label..."
                                                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                                            />
                                            <select
                                                value={newFieldType}
                                                onChange={(e) => setNewFieldType(e.target.value)}
                                                className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                                            >
                                                <option value="text">Short Text</option>
                                                <option value="select">Dropdown Options</option>
                                                <option value="tel">Phone</option>
                                                <option value="number">Number</option>
                                                <option value="textarea">Paragraph</option>
                                            </select>
                                        </div>

                                        {newFieldType === 'select' && (
                                            <input
                                                type="text"
                                                value={newFieldOptions}
                                                onChange={(e) => setNewFieldOptions(e.target.value)}
                                                placeholder="Options comma separated (e.g. A, B, C)"
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                                            />
                                        )}

                                        <div className="flex items-center justify-between pt-1">
                                            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={newFieldRequired}
                                                    onChange={(e) => setNewFieldRequired(e.target.checked)}
                                                    className="rounded"
                                                />
                                                <span>Required field</span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={handleAddCustomField}
                                                className="px-3 py-1.5 rounded-lg bg-navy-900 text-white text-xs font-medium hover:bg-navy-800"
                                            >
                                                + Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveEvent}
                                className="px-5 py-2 rounded-xl bg-navy-900 text-white text-xs font-medium hover:bg-navy-800"
                            >
                                {editingEvent ? 'Save Changes' : 'Publish Event'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Insert / Edit Attendee Modal */}
            {isInsertModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="font-bold text-base text-navy-900">
                                {editingAttendee ? 'Edit Attendee Record' : 'Insert Attendee Record'}
                            </h3>
                            <button
                                onClick={() => setIsInsertModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveAttendee} className="space-y-3 text-xs">
                            <div>
                                <label className="block text-slate-600 font-semibold mb-1">Select Event *</label>
                                <select
                                    required
                                    value={attendeeForm.eventId}
                                    onChange={(e) => setAttendeeForm({ ...attendeeForm, eventId: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                >
                                    {events.map(e => (
                                        <option key={e.id} value={e.id}>
                                            {e.title} ({e.status})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-slate-600 font-semibold mb-1">Attendee Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={attendeeForm.name}
                                    onChange={(e) => setAttendeeForm({ ...attendeeForm, name: e.target.value })}
                                    placeholder="e.g. A'nasir Omar Mohamed"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-600 font-semibold mb-1">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={attendeeForm.phone}
                                        onChange={(e) => setAttendeeForm({ ...attendeeForm, phone: e.target.value })}
                                        placeholder="613912683"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-600 font-semibold mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={attendeeForm.email}
                                        onChange={(e) => setAttendeeForm({ ...attendeeForm, email: e.target.value })}
                                        placeholder="name@example.com"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-600 font-semibold mb-1">Department</label>
                                <input
                                    type="text"
                                    value={attendeeForm.department}
                                    onChange={(e) => setAttendeeForm({ ...attendeeForm, department: e.target.value })}
                                    placeholder="e.g. Computer Application"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-600 font-semibold mb-1">Class / Year</label>
                                    <input
                                        type="text"
                                        value={attendeeForm.classYear}
                                        onChange={(e) => setAttendeeForm({ ...attendeeForm, classYear: e.target.value })}
                                        placeholder="2025-2026"
                                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-600 font-semibold mb-1">Organization</label>
                                    <input
                                        type="text"
                                        value={attendeeForm.organization}
                                        onChange={(e) => setAttendeeForm({ ...attendeeForm, organization: e.target.value })}
                                        placeholder="Jamhuuriya University"
                                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                    />
                                </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setIsInsertModalOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs"
                                >
                                    {editingAttendee ? 'Save Changes' : 'Insert Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
