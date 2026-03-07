import React from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
        <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 bg-white/95 backdrop-blur-xl shadow-lg shadow-navy-900/10 border-b border-slate-200/50 ${scrolled ? 'py-2' : 'py-3'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between max-w-[1280px]">

                {/* Logo Image */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/Assets/logo.jpeg"
                        alt="MaanGroup Logo"
                        className="h-12 w-auto object-contain rounded group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="font-heading font-bold text-navy-900 text-xl tracking-tighter uppercase whitespace-nowrap transition-colors duration-300">
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

                                {/* Dropdown Menu */}
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

                {/* Mobile toggle */}
                <button
                    className="lg:hidden focus:outline-none p-1 transition-colors text-navy-900 hover:text-gold-500"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="lg:hidden bg-white w-full overflow-hidden border-t border-slate-100"
            >
                <div className="flex flex-col">
                    {navLinks.map((link) => (
                        <div key={link.name} className="flex flex-col border-b border-slate-50">
                            <Link
                                to={link.path}
                                className="px-8 py-5 font-body font-medium text-navy-900 hover:bg-slate-50 hover:text-gold-500 hover:pl-10 transition-all duration-300 text-[0.95rem] flex justify-between items-center"
                                onClick={() => !link.sublinks && setIsOpen(false)}
                            >
                                {link.name}
                                {link.sublinks && <ChevronDown size={16} className="text-slate-400" />}
                            </Link>

                            {link.sublinks && (
                                <div className="bg-slate-50 flex flex-col py-2 border-t border-slate-100 shadow-inner">
                                    {link.sublinks.map((sublink) => (
                                        <Link
                                            key={sublink.name}
                                            to={sublink.path}
                                            className="px-8 py-3 text-sm font-medium text-slate-600 hover:text-gold-500 hover:pl-12 pl-10 border-l-[3px] border-transparent hover:border-gold-500 transition-all duration-300"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="opacity-60 mr-2 text-xs">└</span> {sublink.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="p-6">
                        <Link
                            to="/contact"
                            className="btn btn-primary w-full !justify-center flex items-center gap-2 group/mbtn"
                            onClick={() => setIsOpen(false)}
                        >
                            Partner With Us
                            <ArrowRight size={16} className="group-hover/mbtn:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </nav>
    );
};
