import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [openDropdown, setOpenDropdown] = React.useState(null);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when drawer is open
    React.useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const closeDrawer = () => {
        setIsOpen(false);
        setOpenDropdown(null);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'Our Services',
            path: '/services',
            sublinks: [
                { name: 'Consulting', path: '/services/consulting' },
                { name: 'Training & Development', path: '/services/training' },
                { name: 'Capacity Building', path: '/services/capacity-building' },
                { name: 'Research & Development', path: '/services/research' },
            ]
        },
        { name: 'Events', path: '/events' },
        { name: 'About Us', path: '/about' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 bg-white/95 backdrop-blur-xl shadow-lg shadow-navy-900/10 border-b border-slate-200/50 ${scrolled ? 'py-2' : 'py-3'}`}>
                <div className="container mx-auto px-6 flex items-center justify-between max-w-[1280px]">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/Assets/logo.jpeg"
                            alt="MaanGroup Logo"
                            className="h-12 w-auto object-contain rounded group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="font-heading font-semibold text-navy-900 text-xl tracking-tighter uppercase whitespace-nowrap transition-colors duration-300">
                            Maan<span className="text-gold-500">Group</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-24 font-medium">
                        <div className="flex items-center gap-16">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative group flex items-center h-full">
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `font-body text-[0.9rem] tracking-widest transition-all duration-300 relative py-2 flex items-center gap-1.5
                                         after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-navy-900 after:transition-all after:duration-300
                                         ${isActive && !link.sublinks
                                                ? 'text-navy-900 font-bold after:w-full'
                                                : 'text-slate-600 hover:text-navy-900 after:w-0 hover:after:w-full'
                                            }`
                                        }
                                    >
                                        {link.name}
                                        {link.sublinks && (
                                            <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                                        )}
                                    </NavLink>

                                    {/* Desktop Dropdown */}
                                    {link.sublinks && (
                                        <div className="absolute top-[100%] left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                            <div className="w-[300px] bg-white rounded-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col py-3 overflow-hidden">
                                                {link.sublinks.map((sublink) => (
                                                    <NavLink
                                                        key={sublink.name}
                                                        to={sublink.path}
                                                        className={({ isActive }) =>
                                                            `px-6 py-3.5 text-[0.95rem] font-medium transition-colors border-l-2 border-transparent hover:bg-slate-50 hover:text-gold-500 hover:border-gold-500 ${isActive ? 'text-gold-500 bg-slate-50 border-gold-500' : 'text-slate-600'}`
                                                        }
                                                    >
                                                        {sublink.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <Link to="/contact" className="btn btn-primary !px-10 !py-4 !text-xs !rounded-sm shadow-xl rounded-md shadow-gold-500/10 flex items-center gap-2 group/btn">
                            Partner With Us
                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden focus:outline-none p-1 transition-colors text-navy-900 hover:text-gold-500"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={26} />
                    </button>
                </div>
            </nav>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Dark Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[1100] bg-navy-900/60 backdrop-blur-sm lg:hidden"
                            onClick={closeDrawer}
                        />

                        {/* Drawer */}
                        <motion.div
                            key="drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                            className="fixed top-0 right-0 h-full w-[65vw] max-w-[420px] z-[1200] bg-white shadow-2xl flex flex-col lg:hidden overflow-y-auto"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                                <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
                                    <img src="/Assets/logo.jpeg" alt="Logo" className="h-9 w-auto object-contain rounded" />
                                    <span className="font-heading font-semibold text-navy-900 text-lg tracking-tighter uppercase">
                                        Maan<span className="text-gold-500">Group</span>
                                    </span>
                                </Link>
                                <button onClick={closeDrawer} className="p-1.5 text-slate-400 hover:text-navy-900 transition-colors">
                                    <X size={22} />
                                </button>
                            </div>

                            {/* Nav Links */}
                            <div className="flex flex-col flex-1 pt-4 px-4">
                                {navLinks.map((link, idx) => (
                                    <div key={link.name}>
                                        <div className="flex items-center">
                                            <NavLink
                                                to={link.path}
                                                onClick={() => !link.sublinks && closeDrawer()}
                                                className={({ isActive }) =>
                                                    `flex-1 flex items-center justify-between px-4 py-4 rounded-xl text-[0.95rem] font-semibold transition-all duration-200
                                                ${isActive && !link.sublinks
                                                        ? 'text-gold-500 bg-gold-500/5'
                                                        : 'text-navy-900 hover:bg-slate-50 hover:text-gold-500'
                                                    }`
                                                }
                                            >
                                                {link.name}
                                            </NavLink>
                                            {link.sublinks && (
                                                <button
                                                    onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                                                    className="p-3 text-slate-400 hover:text-navy-900 transition-colors"
                                                >
                                                    <ChevronDown
                                                        size={18}
                                                        className={`transition-transform duration-300 ${openDropdown === idx ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                            )}
                                        </div>

                                        {/* Mobile Sublinks */}
                                        <AnimatePresence>
                                            {link.sublinks && openDropdown === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                    className="overflow-hidden ml-4 mb-2"
                                                >
                                                    <div className="border-l-2 border-gold-500/30 pl-4 flex flex-col gap-1 py-2">
                                                        {link.sublinks.map((sublink) => (
                                                            <NavLink
                                                                key={sublink.name}
                                                                to={sublink.path}
                                                                onClick={closeDrawer}
                                                                className={({ isActive }) =>
                                                                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                                                ${isActive
                                                                        ? 'text-gold-500 bg-gold-500/5'
                                                                        : 'text-slate-500 hover:text-gold-500 hover:bg-slate-50'
                                                                    }`
                                                                }
                                                            >
                                                                {sublink.name}
                                                            </NavLink>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            {/* CTA at bottom of drawer */}
                            <div className="p-6 border-t border-slate-100 mt-auto">
                                <Link
                                    to="/contact"
                                    onClick={closeDrawer}
                                    className="btn btn-primary w-full !justify-center flex items-center gap-2 group/mbtn whitespace-nowrap !text-sm"
                                >
                                    Partner With Us
                                    <ArrowRight size={15} className="group-hover/mbtn:translate-x-1 transition-transform duration-300 shrink-0" />
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

