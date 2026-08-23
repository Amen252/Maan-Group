import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';

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
                                <div key={link.name} className="relative group flex items-center h-full py-2">
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
                                        <span>{link.name}</span>
                                        {link.sublinks && (
                                            <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180 text-slate-400 group-hover:text-navy-900" />
                                        )}
                                    </NavLink>

                                    {/* Desktop Dropdown */}
                                    {link.sublinks && (
                                        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                                            <div className="w-[290px] bg-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(6,46,121,0.15)] border border-slate-100/90 p-2.5 overflow-hidden flex flex-col gap-1 ring-1 ring-black/5">
                                                {link.sublinks.map((sublink) => (
                                                    <NavLink
                                                        key={sublink.name}
                                                        to={sublink.path}
                                                        className={({ isActive }) =>
                                                            `group/item flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[0.82rem] font-medium transition-all duration-200 ${
                                                                isActive
                                                                    ? 'bg-navy-900 text-white font-semibold shadow-sm'
                                                                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                                                            }`
                                                        }
                                                    >
                                                        {({ isActive }) => (
                                                            <>
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className={`w-1.5 h-1.5 rounded-full transition-transform duration-200 group-hover/item:scale-125 ${isActive ? 'bg-gold-400' : 'bg-gold-500'}`} />
                                                                    <span>{sublink.name}</span>
                                                                </div>
                                                                <ArrowRight size={13} className={`transition-all duration-200 ${isActive ? 'text-gold-400 opacity-100' : 'text-gold-500 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0'}`} />
                                                            </>
                                                        )}
                                                    </NavLink>
                                                ))}

                                                <div className="pt-2 mt-1 border-t border-slate-100 px-2 flex items-center justify-between">
                                                    <Link
                                                        to="/services"
                                                        className="text-[11px] font-semibold text-gold-500 hover:text-gold-600 flex items-center gap-1 transition-colors py-1"
                                                    >
                                                        <span>View All Services</span>
                                                        <ChevronRight size={12} />
                                                    </Link>
                                                </div>
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
                            className="fixed top-0 right-0 h-full w-[82%] max-w-xs bg-white z-[1200] lg:hidden flex flex-col shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.25)]"
                        >
                            <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/60">
                                <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
                                    <img src="/assets/logo.png" alt="Logo" className="h-8 w-auto" />
                                    <span className="font-heading font-semibold text-navy-900 text-base tracking-tight uppercase">Maan<span className="text-gold-500">Group</span></span>
                                </Link>
                                <button
                                    className="p-1.5 text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors"
                                    onClick={closeDrawer}
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 py-5">
                                <div className="flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <div key={link.name} className="flex flex-col">
                                            {link.sublinks ? (
                                                <>
                                                    <button
                                                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                                        className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${openDropdown === link.name ? 'bg-navy-900 text-white shadow-md shadow-navy-900/15' : 'text-navy-900 active:bg-slate-50 hover:bg-slate-50'}`}
                                                    >
                                                        <span>{link.name}</span>
                                                        <ChevronDown size={16} className={`opacity-60 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180 text-white opacity-100' : ''}`} />
                                                    </button>
                                                    <AnimatePresence>
                                                        {openDropdown === link.name && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                className="overflow-hidden bg-slate-50/90 rounded-xl mt-1 mx-1 border border-slate-100/90 shadow-inner"
                                                            >
                                                                <div className="p-2 flex flex-col gap-1">
                                                                    {link.sublinks.map((sublink) => (
                                                                        <Link
                                                                            key={sublink.name}
                                                                            to={sublink.path}
                                                                            onClick={closeDrawer}
                                                                            className="py-2 px-3 text-xs font-medium text-slate-600 active:text-gold-500 hover:text-navy-900 flex items-center justify-between rounded-lg hover:bg-white active:bg-white transition-colors"
                                                                        >
                                                                            <div className="flex items-center gap-2">
                                                                                <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                                                                <span>{sublink.name}</span>
                                                                            </div>
                                                                            <ChevronRight size={12} className="text-slate-400" />
                                                                        </Link>
                                                                    ))}

                                                                    <div className="pt-1.5 mt-0.5 border-t border-slate-200/50 px-2">
                                                                        <Link
                                                                            to="/services"
                                                                            onClick={closeDrawer}
                                                                            className="text-[11px] font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1 py-1"
                                                                        >
                                                                            <span>All Services</span>
                                                                            <ArrowRight size={11} />
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </>
                                            ) : (
                                                <Link
                                                    to={link.path}
                                                    onClick={closeDrawer}
                                                    className="py-2.5 px-3 rounded-lg text-sm font-semibold text-navy-900 active:bg-slate-50 hover:bg-slate-50 transition-colors"
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-5 border-t border-slate-100 bg-slate-50/60">
                                <Link
                                    to="/contact"
                                    onClick={closeDrawer}
                                    className="w-full bg-navy-900 text-white py-3 rounded-lg font-semibold text-xs uppercase tracking-wider shadow-lg shadow-navy-900/15 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                                >
                                    GET IN TOUCH
                                    <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                                <p className="text-center text-slate-400 text-[11px] mt-3 font-medium">Empowering Minds. Building Future.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
