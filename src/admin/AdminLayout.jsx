import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Calendar, 
    Users, 
    User, 
    LogOut, 
    ExternalLink, 
    Menu, 
    X, 
    Plus,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { eventsService } from '../services/eventsService';

export const AdminLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [profile, setProfile] = useState(eventsService.getAdminProfile());
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!eventsService.isAuthenticated()) {
            navigate('/admin/login');
        }
        const handleProfile = () => setProfile(eventsService.getAdminProfile());
        window.addEventListener('profile_updated', handleProfile);
        return () => window.removeEventListener('profile_updated', handleProfile);
    }, [navigate]);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        eventsService.logout();
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
        { path: '/admin/events', label: 'Events & Forms', icon: Calendar },
        { path: '/admin/registrations', label: 'Registrations', icon: Users },
        { path: '/admin/profile', label: 'Profile & Security', icon: User },
    ];

    return (
        <div className="min-h-screen bg-slate-50/70 flex font-nunito text-slate-700 antialiased">
            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen bg-navy-900 text-slate-300 flex flex-col justify-between z-50 transition-all duration-300 ease-in-out border-r border-navy-800/80 ${
                    mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
                } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
            >
                <div className="flex flex-col">
                    {/* Brand */}
                    <div className={`p-5 flex items-center border-b border-navy-800/60 ${
                        isCollapsed ? 'justify-center' : 'justify-between'
                    }`}>
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-xs flex-shrink-0">
                                <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            {!isCollapsed && (
                                <div className="min-w-0">
                                    <h1 className="font-semibold text-sm text-white leading-tight truncate">Maan Group</h1>
                                    <span className="text-[11px] text-slate-400 font-normal">Dashboard</span>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setMobileOpen(false)}
                            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Nav Items with Light Active State */}
                    <div className="p-3">
                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={item.exact}
                                        title={isCollapsed ? item.label : undefined}
                                        className={({ isActive }) =>
                                            `flex items-center rounded-xl text-xs font-medium transition-all duration-200 ${
                                                isCollapsed 
                                                    ? 'justify-center p-3' 
                                                    : 'gap-3 px-3.5 py-2.5'
                                            } ${
                                                isActive
                                                    ? 'bg-white text-navy-900 shadow-xs font-semibold'
                                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                            }`
                                        }
                                    >
                                        <Icon size={17} className="flex-shrink-0" />
                                        {!isCollapsed && <span>{item.label}</span>}
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-3 border-t border-navy-800/60 space-y-2">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex items-center justify-center gap-2 w-full p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors cursor-pointer"
                    >
                        {isCollapsed ? <ChevronRight size={15} /> : (
                            <>
                                <ChevronLeft size={15} />
                                <span>Collapse</span>
                            </>
                        )}
                    </button>

                    <div className={`rounded-xl bg-white/5 flex items-center ${
                        isCollapsed ? 'p-2 justify-center' : 'p-2.5 justify-between gap-2'
                    }`}>
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center font-medium text-xs flex-shrink-0">
                                {profile.name ? profile.name.charAt(0) : 'A'}
                            </div>
                            {!isCollapsed && (
                                <div className="min-w-0">
                                    <div className="text-xs font-medium text-white truncate">{profile.name}</div>
                                    <div className="text-[10px] text-slate-400 truncate">{profile.email}</div>
                                </div>
                            )}
                        </div>

                        {!isCollapsed && (
                            <button
                                onClick={handleLogout}
                                title="Sign out"
                                className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                            >
                                <LogOut size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="bg-white sticky top-0 z-30 border-b border-slate-200/70 px-6 py-3.5 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                        >
                            <Menu size={18} />
                        </button>
                        <div>
                            <h2 className="text-sm font-semibold text-slate-800">Admin Workspace</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="/events"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                        >
                            <span>Live Site</span>
                            <ExternalLink size={12} />
                        </a>
                        <NavLink
                            to="/admin/events"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-navy-900 hover:bg-navy-800 transition-colors shadow-xs"
                        >
                            <Plus size={14} />
                            <span>New Event</span>
                        </NavLink>
                    </div>
                </header>

                <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
