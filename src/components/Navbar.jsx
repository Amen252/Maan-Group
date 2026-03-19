import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when drawer is open
    useEffect(() => {
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
                            src="/assets/logo.png"
                            alt="MaanGroup Logo"
                            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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

                        {/* CTA */}
                        <Link
                            to="/contact"
                            className="bg-gold-500 text-white px-8 py-3 rounded-md font-semibold text-sm tracking-widest hover:bg-gold-600 transition-all duration-300 shadow-xl shadow-gold-500/20 active:scale-95 flex items-center gap-2 group"
                        >
                            PARTNER WITH US
                            <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-navy-900 hover:bg-slate-100 rounded-xl transition-colors"
                        onClick={() => setIsOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={28} />
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
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[1200] lg:hidden flex flex-col shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.3)]"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                                <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
                                    <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto" />
                                    <span className="font-heading font-semibold text-navy-900 text-lg tracking-tight uppercase">Maan<span className="text-gold-500">Group</span></span>
                                </Link>
                                <button
                                    className="p-2 text-navy-900 hover:bg-slate-200 rounded-lg transition-colors"
                                    onClick={closeDrawer}
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-8">
                                <div className="flex flex-col gap-2">
                                    {navLinks.map((link) => (
                                        <div key={link.name} className="flex flex-col">
                                            {link.sublinks ? (
                                                <>
                                                    <button
                                                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                                        className={`flex items-center justify-between py-4 px-4 rounded-xl text-lg font-bold transition-colors ${openDropdown === link.name ? 'bg-navy-900 text-white shadow-xl shadow-navy-900/20' : 'text-navy-900 active:bg-slate-50'}`}
                                                    >
                                                        {link.name}
                                                        <ChevronDown size={20} className={`opacity-50 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180 text-white' : ''}`} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {openDropdown === link.name && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden bg-slate-50/80 rounded-xl mt-2 mx-2"
                                                            >
                                                                <div className="p-4 flex flex-col gap-1">
                                                                    {link.sublinks.map((sublink) => (
                                                                        <Link
                                                                            key={sublink.name}
                                                                            to={sublink.path}
                                                                            onClick={closeDrawer}
                                                                            className="py-4 px-4 text-[0.95rem] font-medium text-slate-600 active:text-gold-500 flex items-center gap-3"
                                                                        >
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                                                            {sublink.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                <Link
                                                    to={link.path}
                                                    onClick={closeDrawer}
                                                    className="py-4 px-4 rounded-xl text-lg font-semibold text-navy-900 active:bg-slate-50 active:text-gold-500"
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                                <Link
                                    to="/contact"
                                    onClick={closeDrawer}
                                    className="w-full bg-navy-900 text-white py-4 rounded-xl font-semibold text-base tracking-widest shadow-2xl shadow-navy-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                                >
                                    GET IN TOUCH
                                    <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                                <p className="text-center text-slate-400 text-xs mt-6 font-medium">Empowering Minds. Building Future.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
