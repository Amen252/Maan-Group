import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-navy-900 border-t border-white/5 pt-20 pb-12 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1280px] grid lg:grid-cols-4 md:grid-cols-2 gap-x-32 gap-y-12 relative z-10 pb-16 border-b border-white/10 mb-10">
                <div className="space-y-10 order-1 pr-12">
                    <Link to="/" className="text-3xl font-heading font-bold text-white tracking-tighter hover:text-gold-500 transition-colors">
                        MAAN<span className="text-gold-500 font-light">GROUP</span>
                    </Link>
                    <p className="text-slate-400 text-sm leading-normal max-w-xs opacity-70">
                        Empowering minds and building the future through leadership development, organizational strategy, and professional excellence.
                    </p>
                    <div className="flex gap-6 items-center">
                        <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300">
                            <Linkedin size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-all duration-300">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>

                <div className="order-2 lg:order-2 space-y-8">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-500 border-b border-gold-500/20 pb-4 w-fit">Expertise</h3>
                    <ul className="space-y-4">
                        <li><Link to="/services" className="text-slate-400 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Consulting Services</Link></li>
                        <li><Link to="/services" className="text-slate-400 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Training & Development</Link></li>
                        <li><Link to="/services" className="text-slate-400 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Capacity Building</Link></li>
                        <li><Link to="/services" className="text-slate-400 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Research & Development</Link></li>
                    </ul>
                </div>

                <div className="order-3 lg:order-3 space-y-8">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-500 border-b border-gold-500/20 pb-4 w-fit">Company</h3>
                    <ul className="space-y-4">
                        <li><Link to="/about" className="text-slate-400 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Our Identity/About</Link></li>
                        <li><Link to="/events" className="text-slate-400 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Events</Link></li>
                        <li><Link to="/contact" className="text-slate-400 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Connect/Contact</Link></li>
                        <li><Link to="#" className="text-slate-400 hover:text-white hover:translate-x-2 transition-all block text-base font-medium">Project Careers</Link></li>
                    </ul>
                </div>

                <div className="order-4 lg:order-4 space-y-10">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-500 border-b border-gold-500/20 pb-4 w-fit">Stay Informed</h3>
                    <p className="text-slate-400 text-base leading-relaxed">Join our inner circle for the latest organizational strategy insights and innovation breakthroughs.</p>
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="Institutional Email"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-5 pl-7 pr-16 text-white text-base focus:outline-none focus:border-gold-500 focus:bg-white/10 transition-all font-medium placeholder:text-slate-600 tracking-tight"
                        />
                        <button className="absolute right-2 top-2 bottom-2 aspect-square rounded-lg bg-gold-500 text-white flex items-center justify-center hover:scale-105 hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20">
                            <ArrowRight size={22} />
                        </button>
                    </div>
                    <div className="pt-4 space-y-3">
                        <div className="flex items-center gap-3 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
                            <Mail size={16} className="text-gold-500" />
                            <span className="text-sm">info@maangroup.so</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
                            <Phone size={16} className="text-gold-500" />
                            <span className="text-sm">+252 61 7076666</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-[1280px] flex flex-col md:flex-row justify-between items-center text-[0.8rem] font-bold uppercase tracking-[0.15em] text-slate-600 gap-8">
                <p>&copy; 2025 Maan Group Professional Services. Empowering Minds. Building Future.</p>
                <div className="flex gap-10">
                    <Link to="#" className="hover:text-gold-500 transition-colors">Digital Privacy</Link>
                    <Link to="#" className="hover:text-gold-500 transition-colors">Terms of Engagement</Link>
                    <Link to="#" className="hover:text-gold-500 transition-colors">Site Compliance</Link>
                </div>
            </div>

            {/* Background glow flourish */}
            <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] bg-gold-500/5 rounded-full blur-[100px] -z-0"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[25vw] h-[25vw] bg-navy-800 rounded-full blur-[80px] -z-0 opacity-40"></div>
        </footer>
    );
};
