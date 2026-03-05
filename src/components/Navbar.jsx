import React from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
        { name: 'Our Services', path: '/services' },
        { name: 'Events', path: '/events' },
        { name: 'About Us', path: '/about' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-navy-900/5 py-3' : 'bg-white/80 backdrop-blur-md py-4'
            } border-b border-slate-100/80`}>
            <div className="container mx-auto px-6 flex items-center justify-between max-w-[1280px]">

                {/* Logo Image */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/Assets/logo.jpeg"
                        alt="MaanGroup Logo"
                        className="h-12 w-auto object-contain rounded group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="font-heading font-bold text-navy-900 text-xl tracking-tighter uppercase whitespace-nowrap">
                        Maan<span className="text-gold-500">Group</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-24 font-medium">
                    <div className="flex items-center gap-16">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `font-body text-[0.9rem] tracking-widest transition-all duration-300 relative py-2
                     after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-gold-500 after:transition-all after:duration-300
                     hover:text-gold-500 hover:after:w-full
                     ${isActive ? 'text-gold-500 after:w-full' : 'text-navy-900 after:w-0'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                    <Link to="/contact" className="btn btn-primary !px-10 !py-4 !text-xs !rounded-sm shadow-xl shadow-gold-500/10">
                        Partner With Us
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="lg:hidden text-navy-900 focus:outline-none p-1 hover:text-gold-500 transition-colors"
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
                        <Link
                            key={link.name}
                            to={link.path}
                            className="px-8 py-5 border-b border-slate-50 font-body font-medium text-navy-900 hover:bg-slate-50 hover:text-gold-500 hover:pl-10 transition-all duration-300 text-[0.95rem]"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="p-6">
                        <Link
                            to="/contact"
                            className="btn btn-primary w-full !justify-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Partner With Us
                        </Link>
                    </div>
                </div>
            </motion.div>
        </nav>
    );
};
