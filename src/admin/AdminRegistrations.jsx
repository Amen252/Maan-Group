import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
    Download, 
    Search, 
    Trash2, 
    Star, 
    Edit3, 
    Plus, 
    X, 
    RotateCcw,
    Check,
    Building,
    Calendar,
    Phone,
    Mail
} from 'lucide-react';
import { eventsService } from '../services/eventsService';

export const AdminRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [eventFilter, setEventFilter] = useState('ALL');

    // Modals
    const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
    const [editingAttendee, setEditingAttendee] = useState(null);
    const [viewingAttendee, setViewingAttendee] = useState(null);

    const [formData, setFormData] = useState({
        eventId: '',
        name: '',
        email: '',
        phone: '',
        organization: '',
        department: 'Computer Application',
        classYear: '2025-2026'
    });

    const loadData = () => {
        setRegistrations(eventsService.getRegistrations());
        setEvents(eventsService.getAllEvents());
    };

    useEffect(() => {
        loadData();
        const handleUpdate = () => loadData();
        window.addEventListener('registrations_updated', handleUpdate);
        window.addEventListener('events_updated', handleUpdate);
        return () => {
            window.removeEventListener('registrations_updated', handleUpdate);
            window.removeEventListener('events_updated', handleUpdate);
        };
    }, []);

    const handleToggleStar = (id) => {
        eventsService.toggleStarRegistration(id);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete registration for ${name}?`)) {
            eventsService.deleteRegistration(id);
        }
    };

    const openInsertModal = () => {
        setEditingAttendee(null);
        setFormData({
            eventId: events[0]?.id || '',
            name: '',
            email: '',
            phone: '',
            organization: 'Jamhuuriya University (JUST)',
            department: 'Computer Application',
            classYear: '2025-2026'
        });
        setIsInsertModalOpen(true);
    };

    const openEditModal = (attendee) => {
        setEditingAttendee(attendee);
        setFormData({
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
        const targetEvent = events.find(ev => ev.id === parseInt(formData.eventId) || ev.id === formData.eventId);

        if (editingAttendee) {
            eventsService.updateRegistration(editingAttendee.id, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                organization: formData.organization,
                eventId: targetEvent ? targetEvent.id : editingAttendee.eventId,
                eventTitle: targetEvent ? targetEvent.title : editingAttendee.eventTitle,
                customResponses: {
                    ...(editingAttendee.customResponses || {}),
                    'Department': formData.department,
                    'Class / Year': formData.classYear
                }
            });
        } else {
            // Validation: check if past event
            if (targetEvent && targetEvent.status === 'Past Event') {
                alert('Cannot add registration to a past event.');
                return;
            }

            eventsService.registerAttendee({
                eventId: targetEvent ? targetEvent.id : events[0]?.id,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                organization: formData.organization,
                customResponses: {
                    'Department': formData.department,
                    'Class / Year': formData.classYear
                }
            });
        }

        setIsInsertModalOpen(false);
    };

    const handleExportCSV = () => {
        if (filtered.length === 0) {
            alert('No attendee records to export.');
            return;
        }

        const headers = ['ID', 'Attendee Name', 'Phone', 'Event Title', 'Organization', 'Department', 'Year', 'Status', 'Registered Date'];
        const rows = filtered.map(r => [
            r.id,
            `"${(r.name || '').replace(/"/g, '""')}"`,
            r.phone,
            `"${(r.eventTitle || '').replace(/"/g, '""')}"`,
            `"${(r.organization || '').replace(/"/g, '""')}"`,
            `"${(r.customResponses?.Department || '').replace(/"/g, '""')}"`,
            `"${(r.customResponses?.['Class / Year'] || '').replace(/"/g, '""')}"`,
            r.status,
            new Date(r.registeredAt).toLocaleDateString()
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `attendees_roster_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const eventTitles = ['ALL', ...new Set(events.map(e => e.title))];

    const filtered = registrations.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.phone.toLowerCase().includes(search.toLowerCase()) ||
            r.id.toLowerCase().includes(search.toLowerCase()) ||
            (r.organization && r.organization.toLowerCase().includes(search.toLowerCase())) ||
            (r.eventTitle && r.eventTitle.toLowerCase().includes(search.toLowerCase()));
        const matchesEvent = eventFilter === 'ALL' || r.eventTitle === eventFilter;
        return matchesSearch && matchesEvent;
    });

    return (
        <div className="font-nunito space-y-5 text-slate-700">
            <Helmet>
                <title>All Attendees | Maan Group Admin</title>
            </Helmet>

            {/* Top Toolbar matching Template Design */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-navy-900">All Attendees</h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                        Manage participant registrations · monitor and export event roster
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    {/* Search Bar with Icon */}
                    <div className="relative min-w-[220px]">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-navy-900"
                        />
                    </div>

                    {/* Insert Button */}
                    <button
                        onClick={openInsertModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                        <Plus size={15} />
                        <span>Insert</span>
                    </button>

                    {/* Event Filter */}
                    <select
                        value={eventFilter}
                        onChange={(e) => setEventFilter(e.target.value)}
                        className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer max-w-[180px] truncate"
                    >
                        {eventTitles.map(t => (
                            <option key={t} value={t}>{t === 'ALL' ? 'All Events' : t}</option>
                        ))}
                    </select>

                    {/* Export Button */}
                    <button
                        onClick={handleExportCSV}
                        className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs transition-colors"
                        title="Export CSV"
                    >
                        <Download size={15} />
                    </button>
                </div>
            </div>

            {/* Template-Styled Table with Dark Navy Header */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        {/* Dark Navy Table Header */}
                        <thead>
                            <tr className="bg-[#1f377d] text-white text-[11px] font-bold uppercase tracking-wider">
                                <th className="py-4 px-5">ID</th>
                                <th className="py-4 px-5">NAME</th>
                                <th className="py-4 px-4">PHONE</th>
                                <th className="py-4 px-4">EVENT / WORKSHOP</th>
                                <th className="py-4 px-4">DEPARTMENT / ORG</th>
                                <th className="py-4 px-4">YEAR / DATE</th>
                                <th className="py-4 px-5 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="py-14 text-center text-slate-400 font-medium">
                                        No attendee records found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((r) => (
                                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                                        {/* ID */}
                                        <td className="py-3.5 px-5 font-bold text-navy-900 whitespace-nowrap">
                                            {r.id}
                                        </td>

                                        {/* Name */}
                                        <td className="py-3.5 px-5">
                                            <div className="font-semibold text-slate-900">{r.name}</div>
                                            <div className="text-slate-400 text-[11px] mt-0.5">{r.email}</div>
                                        </td>

                                        {/* Phone */}
                                        <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                                            {r.phone}
                                        </td>

                                        {/* Event */}
                                        <td className="py-3.5 px-4 font-medium text-navy-900 max-w-xs truncate">
                                            {r.eventTitle}
                                        </td>

                                        {/* Department / Org */}
                                        <td className="py-3.5 px-4 text-slate-600 font-medium max-w-xs truncate">
                                            {r.customResponses?.Department || r.organization || 'Computer Application'}
                                        </td>

                                        {/* Year / Date */}
                                        <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap">
                                            {r.customResponses?.['Class / Year'] || new Date(r.registeredAt).toLocaleDateString()}
                                        </td>

                                        {/* Actions: Star, Edit, Delete (Matching Template Design) */}
                                        <td className="py-3.5 px-5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {/* Star Button */}
                                                <button
                                                    onClick={() => handleToggleStar(r.id)}
                                                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                                        r.isStarred
                                                            ? 'border-amber-300 text-amber-500 bg-amber-50'
                                                            : 'border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-200 hover:bg-amber-50/50'
                                                    }`}
                                                    title={r.isStarred ? 'Starred attendee' : 'Star attendee'}
                                                >
                                                    <Star size={14} className={r.isStarred ? 'fill-amber-500' : ''} />
                                                </button>

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => openEditModal(r)}
                                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                                                    title="Edit attendee"
                                                >
                                                    <Edit3 size={14} />
                                                </button>

                                                {/* Delete Button (Pink/Red) */}
                                                <button
                                                    onClick={() => handleDelete(r.id, r.name)}
                                                    className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                                                    title="Delete record"
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

            {/* Insert / Edit Attendee Modal */}
            {isInsertModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <h3 className="font-bold text-base text-navy-900">
                                {editingAttendee ? 'Edit Attendee' : 'Insert Attendee Record'}
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
                                    value={formData.eventId}
                                    onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
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
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="613912683"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-600 font-semibold mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="name@example.com"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-600 font-semibold mb-1">Department</label>
                                <input
                                    type="text"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    placeholder="e.g. Computer Application"
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-slate-600 font-semibold mb-1">Class / Year</label>
                                    <input
                                        type="text"
                                        value={formData.classYear}
                                        onChange={(e) => setFormData({ ...formData, classYear: e.target.value })}
                                        placeholder="2025-2026"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-600 font-semibold mb-1">Organization</label>
                                    <input
                                        type="text"
                                        value={formData.organization}
                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                        placeholder="Jamhuuriya University"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-navy-900"
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
