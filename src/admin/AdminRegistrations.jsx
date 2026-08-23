import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Download, Search, Trash2, Calendar, Mail, Phone, Building } from 'lucide-react';
import { eventsService } from '../services/eventsService';

export const AdminRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [search, setSearch] = useState('');
    const [eventFilter, setEventFilter] = useState('ALL');

    const loadRegs = () => {
        setRegistrations(eventsService.getRegistrations());
    };

    useEffect(() => {
        loadRegs();
        const handleUpdate = () => loadRegs();
        window.addEventListener('registrations_updated', handleUpdate);
        return () => window.removeEventListener('registrations_updated', handleUpdate);
    }, []);

    const handleDelete = (id, name) => {
        if (window.confirm(`Delete registration for ${name}?`)) {
            eventsService.deleteRegistration(id);
        }
    };

    const handleExportCSV = () => {
        if (registrations.length === 0) {
            alert('No registrations to export.');
            return;
        }

        const headers = ['ID', 'Event Title', 'Attendee Name', 'Email', 'Phone', 'Organization', 'Registered At', 'Status'];
        const rows = registrations.map(r => [
            r.id,
            `"${(r.eventTitle || '').replace(/"/g, '""')}"`,
            `"${(r.name || '').replace(/"/g, '""')}"`,
            r.email,
            r.phone,
            `"${(r.organization || '').replace(/"/g, '""')}"`,
            new Date(r.registeredAt).toLocaleString(),
            r.status
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `maan_event_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const eventTitles = ['ALL', ...new Set(registrations.map(r => r.eventTitle))];

    const filtered = registrations.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase()) ||
            (r.organization && r.organization.toLowerCase().includes(search.toLowerCase())) ||
            (r.eventTitle && r.eventTitle.toLowerCase().includes(search.toLowerCase()));
        const matchesEvent = eventFilter === 'ALL' || r.eventTitle === eventFilter;
        return matchesSearch && matchesEvent;
    });

    return (
        <div>
            <Helmet>
                <title>Attendee Registrations | Maan Group Admin</title>
            </Helmet>

            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900 tracking-tight">Event Registrations</h1>
                    <p className="text-slate-500 text-xs mt-1">Review attendees signed up for Maan Group workshops and seminars</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-navy-900 text-xs font-semibold tracking-wide hover:border-gold-500 hover:text-gold-600 transition-all duration-200 shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                        <Download size={15} /> Export to Excel / CSV
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
                        placeholder="Search attendee by name, email, university..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-gold-500 focus:bg-white transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Filter Event:</span>
                    <select
                        value={eventFilter}
                        onChange={(e) => setEventFilter(e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-gold-500"
                    >
                        {eventTitles.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                <th className="py-3.5 px-6">Attendee</th>
                                <th className="py-3.5 px-4">Contact</th>
                                <th className="py-3.5 px-4">Event</th>
                                <th className="py-3.5 px-4">Registered Date</th>
                                <th className="py-3.5 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-slate-400 text-xs">
                                        No registrations found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((r) => (
                                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-semibold text-navy-900">{r.name}</div>
                                            <div className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                                                <Building size={11} /> {r.organization || 'Individual'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                                                <Mail size={12} className="text-slate-400" /> {r.email}
                                            </div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                                                <Phone size={12} className="text-gold-500" /> {r.phone}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-xs font-medium text-navy-900 max-w-xs line-clamp-2">
                                                {r.eventTitle}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-xs text-slate-500">
                                            {new Date(r.registeredAt).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => handleDelete(r.id, r.name)}
                                                title="Delete Registration"
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
