import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Calendar, 
    Users, 
    ArrowUpRight, 
    Plus, 
    MapPin, 
    CheckCircle2, 
    ArrowRight
} from 'lucide-react';
import { eventsService } from '../services/eventsService';

const getAvatarColor = (name = '') => {
    const colors = [
        'bg-slate-100 text-slate-700',
        'bg-blue-50 text-blue-700',
        'bg-emerald-50 text-emerald-700',
        'bg-purple-50 text-purple-700'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name = '') => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return 'A';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const AdminOverview = () => {
    const [stats, setStats] = useState(eventsService.getStats());
    const [events, setEvents] = useState(eventsService.getAllEvents());
    const [registrations, setRegistrations] = useState(eventsService.getRegistrations());
    const navigate = useNavigate();

    const refreshData = () => {
        setStats(eventsService.getStats());
        setEvents(eventsService.getAllEvents());
        setRegistrations(eventsService.getRegistrations());
    };

    useEffect(() => {
        refreshData();
        window.addEventListener('events_updated', refreshData);
        window.addEventListener('registrations_updated', refreshData);
        return () => {
            window.removeEventListener('events_updated', refreshData);
            window.removeEventListener('registrations_updated', refreshData);
        };
    }, []);

    const statCards = [
        {
            title: 'Total Events',
            value: stats.totalEvents,
            note: `${stats.pastEvents} completed`,
            icon: Calendar,
            link: '/admin/events'
        },
        {
            title: 'Upcoming Events',
            value: stats.upcomingEvents,
            note: stats.upcomingEvents > 0 ? 'Open for registration' : 'None scheduled',
            icon: Calendar,
            link: '/admin/events'
        },
        {
            title: 'Total Registrations',
            value: stats.totalRegistrations,
            note: 'All recorded attendees',
            icon: Users,
            link: '/admin/registrations'
        },
        {
            title: 'Recent Signups',
            value: stats.recentRegistrations,
            note: 'In the last 7 days',
            icon: Users,
            link: '/admin/registrations'
        }
    ];

    return (
        <div className="space-y-8 font-nunito text-slate-700">
            <Helmet>
                <title>Overview | Maan Group Admin</title>
            </Helmet>

            {/* Calm, refined header banner */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/70 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-navy-900">Events &amp; Registrations</h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">Manage public events, registration forms, and attendee participant lists.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/admin/events"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-medium transition-colors shadow-xs"
                    >
                        <Plus size={15} /> Add Event
                    </Link>
                    <Link
                        to="/admin/registrations"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                    >
                        View Roster
                    </Link>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {statCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={i}
                            onClick={() => navigate(card.link)}
                            className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-200 cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-medium text-slate-500">
                                        {card.title}
                                    </span>
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center">
                                        <Icon size={16} />
                                    </div>
                                </div>
                                <div className="text-2xl font-semibold text-navy-900 mb-1">
                                    {card.value}
                                </div>
                            </div>
                            <div className="text-xs text-slate-400 font-normal pt-2 border-t border-slate-100 flex items-center justify-between">
                                <span>{card.note}</span>
                                <ArrowUpRight size={13} className="text-slate-300" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Panels with generous breathing room */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                {/* Events */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                            <h3 className="font-semibold text-base text-navy-900">Recent Events</h3>
                            <p className="text-xs text-slate-400">Events on website</p>
                        </div>
                        <Link to="/admin/events" className="text-xs font-medium text-navy-900 hover:text-slate-600 flex items-center gap-1">
                            View all <ArrowUpRight size={13} />
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {events.slice(0, 4).map((e) => (
                            <Link
                                key={e.id}
                                to="/admin/events"
                                className="p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/70 border border-slate-100 flex items-center justify-between gap-3 transition-colors"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <img src={e.images?.[0] || '/assets/events/ps1.jpeg'} alt="" className="w-11 h-11 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
                                    <div className="min-w-0">
                                        <h4 className="font-medium text-xs text-navy-900 truncate">{e.title}</h4>
                                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                                            <span className="flex items-center gap-1"><Calendar size={11} /> {e.date}</span>
                                            <span className="truncate flex items-center gap-1"><MapPin size={11} /> {e.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${
                                    e.status === 'Upcoming'
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                        : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {e.status}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Registrations */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                            <h3 className="font-semibold text-base text-navy-900">Latest Registrations</h3>
                            <p className="text-xs text-slate-400">Recent participant signups</p>
                        </div>
                        <Link to="/admin/registrations" className="text-xs font-medium text-navy-900 hover:text-slate-600 flex items-center gap-1">
                            View roster <ArrowUpRight size={13} />
                        </Link>
                    </div>

                    {registrations.length === 0 ? (
                        <div className="py-10 text-center text-slate-400 text-xs font-medium">
                            No attendee registrations yet.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {registrations.slice(0, 4).map((r) => (
                                <Link
                                    key={r.id}
                                    to="/admin/registrations"
                                    className="p-3.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/70 border border-slate-100 flex items-center justify-between gap-3 transition-colors"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className={`w-9 h-9 rounded-lg ${getAvatarColor(r.name)} flex items-center justify-center font-semibold text-xs flex-shrink-0`}>
                                            {getInitials(r.name)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-medium text-xs text-navy-900 truncate">{r.name}</div>
                                            <div className="text-[11px] text-slate-500 truncate">{r.eventTitle}</div>
                                            <div className="text-[10px] text-slate-400">{r.email}</div>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 text-[11px] text-slate-400 font-medium">
                                        {new Date(r.registeredAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
