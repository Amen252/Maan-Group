import React, { useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { Calendar, Users, LogOut, ExternalLink } from 'lucide-react';
import { eventsService } from '../services/eventsService';

export const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!eventsService.isAuthenticated()) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        eventsService.logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <header className="bg-navy-900 text-white border-b border-white/10 sticky top-0 z-40 shadow-md">
                <div className="container mx-auto px-6 max-w-7xl h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center p-1.5 shadow">
                            <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <div className="font-bold text-sm leading-tight text-white">Maan Group</div>
                            <div className="text-[10px] text-gold-500 font-semibold tracking-wider uppercase">Admin Portal</div>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-2">
                        <NavLink
                            to="/admin"
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                                    isActive
                                        ? 'bg-white/15 text-white shadow-inner'
                                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <Calendar size={15} /> Events Manager
                        </NavLink>

                        <NavLink
                            to="/admin/registrations"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                                    isActive
                                        ? 'bg-white/15 text-white shadow-inner'
                                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`
                            }
                        >
                            <Users size={15} /> Registrations
                        </NavLink>
                    </nav>

                    <div className="flex items-center gap-3">
                        <a
                            href="/events"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <span>Live Site</span>
                            <ExternalLink size={13} />
                        </a>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer"
                        >
                            <LogOut size={14} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>

                <div className="md:hidden flex border-t border-white/10 px-4 py-2 gap-2 bg-navy-900/95">
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) =>
                            `flex-1 text-center py-2 rounded-lg text-xs font-semibold ${
                                isActive ? 'bg-white/20 text-white' : 'text-slate-300'
                            }`
                        }
                    >
                        Events
                    </NavLink>
                    <NavLink
                        to="/admin/registrations"
                        className={({ isActive }) =>
                            `flex-1 text-center py-2 rounded-lg text-xs font-semibold ${
                                isActive ? 'bg-white/20 text-white' : 'text-slate-300'
                            }`
                        }
                    >
                        Registrations
                    </NavLink>
                </div>
            </header>

            <div className="flex-1 py-8">
                <div className="container mx-auto px-6 max-w-7xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
