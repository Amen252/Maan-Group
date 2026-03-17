import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Github } from 'lucide-react';
import { FaWhatsapp, FaTiktok, FaFacebook, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-navy-900 border-t border-white/5 pt-20 pb-12 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1280px] grid lg:grid-cols-[2.5fr_1fr_1fr_1fr] md:grid-cols-2 gap-x-12 gap-y-12 relative z-10 pb-16 border-b border-white/10 mb-10">
                <div className="space-y-10 order-1 lg:pr-12">
                    <Link to="/" className="text-2xl font-heading font-semibold text-white tracking-tighter hover:text-gold-500 transition-colors">
                        MAAN<span className="text-gold-500 font-light">GROUP</span>
                    </Link>
                    <p className="text-slate-200 text-sm leading-normal max-w-sm opacity-80">
                        Empowering minds and building the future through leadership development, organizational strategy, and professional excellence.
                    </p>
                    <div className="flex flex-wrap gap-5 items-center">
                        <a href="https://wa.me/252618257815" target="_blank" rel="noreferrer" className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 text-slate-200 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300" title="WhatsApp">
                            <FaWhatsapp size={22} />
                        </a>
                        <a href="https://www.tiktok.com/@maangroup" target="_blank" rel="noreferrer" className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 text-slate-200 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300" title="TikTok">
                            <FaTiktok size={20} />
                        </a>
                        <a href="https://www.facebook.com/share/1BrRsTgjCM/" target="_blank" rel="noreferrer" className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 text-slate-200 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300" title="Facebook">
                            <FaFacebook size={20} />
                        </a>
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 text-slate-200 flex items-center justify-center cursor-default hover:bg-slate-800 transition-all duration-300" title="LinkedIn: Coming Soon">
                            <FaLinkedin size={20} />
                        </div>
                    </div>
                </div>

                <div className="order-2 lg:order-2 space-y-8">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 border-b border-gold-500/20 pb-4 w-fit">Expertise</h3>
                    <ul className="space-y-4">
                        <li><Link to="/services" className="text-slate-200 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Consulting Services</Link></li>
                        <li><Link to="/services" className="text-slate-200 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Training & Development</Link></li>
                        <li><Link to="/services" className="text-slate-200 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Capacity Building</Link></li>
                        <li><Link to="/services" className="text-slate-200 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Research & Development</Link></li>
                    </ul>
                </div>

                <div className="order-3 lg:order-3 space-y-8">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 border-b border-gold-500/20 pb-4 w-fit">Company</h3>
                    <ul className="space-y-4">
                        <li><Link to="/about" className="text-slate-200 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Our Identity/About</Link></li>
                        <li><Link to="/events" className="text-slate-200 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Events</Link></li>
                        <li><Link to="/contact" className="text-slate-200 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Connect/Contact</Link></li>
                        <li><Link to="#" className="text-slate-200 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Project Careers</Link></li>
                    </ul>
                </div>

                <div className="order-4 lg:order-4 space-y-8">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500 border-b border-gold-500/20 pb-4 w-fit">Get In Touch</h3>
                    <div className="pt-2 space-y-4">
                        <a href="mailto:info@maangroup.so" className="flex items-center gap-3 text-slate-200 hover:text-white cursor-pointer transition-colors w-fit">
                            <Mail size={16} className="text-gold-500" />
                            <span className="text-sm font-medium">info@maangroup.so</span>
                        </a>
                        <a href="tel:+252618257815" className="flex items-center gap-3 text-slate-200 hover:text-white cursor-pointer transition-colors w-fit">
                            <Phone size={16} className="text-gold-500" />
                            <span className="text-sm font-medium">+252 61 8257815</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-[1280px] flex flex-col items-center gap-2 text-sm text-slate-400 text-center font-normal">
                <p>&copy; 2025 Maan Group Professional Services. Empowering Minds. Building Future.</p>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                    Developed by
                    <a href="https://github.com/Amen252" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-slate-300 hover:text-gold-500 transition-all duration-300 group">
                        <Github size={14} className="group-hover:rotate-12 transition-transform" />
                        <span className="font-bold tracking-tight">Amen252</span>
                    </a>
                </p>
            </div>

            {/* Background glow flourish */}
            <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] bg-gold-500/5 rounded-full blur-[100px] -z-0"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[25vw] h-[25vw] bg-navy-800 rounded-full blur-[80px] -z-0 opacity-40"></div>
        </footer>
    );
};
