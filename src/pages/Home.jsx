import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowRight, ChevronRight, Shield, Rocket, Target,
  Globe, BookOpen, Layers, Users, TrendingUp, Zap, CheckCircle, Search, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';

/* ── Service card ── */
const ServiceCard = ({ id, image, title, subtitle, description, bullets, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.55 }}
    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
  >
    {/* Image Banner with Overlay Title */}
    <div className="relative h-72 overflow-hidden flex-shrink-0">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-5">
        <h3 className="text-white font-bold text-xl leading-tight">{title}</h3>
        <p className="text-gold-400 text-xs font-medium mt-0.5 tracking-wide">{subtitle}</p>
      </div>
    </div>

    {/* Card Body */}
    <div className="p-6 flex flex-col gap-5 flex-1">
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>

      {/* Bullet Points — 2 columns */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle size={14} className="text-gold-500 flex-shrink-0" />
            <span>{b}</span>
          </div>
        ))}
      </div>

      {/* Learn More */}
      <Link
        to={`/services/${id}`}
        className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-navy-900 border border-navy-900/20 px-4 py-2.5 rounded-md hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-all duration-300 w-fit"
      >
        Learn More <ArrowRight size={13} />
      </Link>
    </div>
  </motion.div>
);

export const Home = () => {
  const services = servicesData;

  const stats = [
    { value: '2019', label: 'Founded' },
    { value: '50+', label: 'Consultants' },
    { value: '30+', label: 'Nations' },
    { value: '100%', label: 'Client Focus' },
  ];

  return (
    <main className="font-body">
      <Helmet>
        <title>Maan Group | Strategic Consulting & Professional Training</title>
        <meta name="description" content="Maan Group is a premier consultancy and training firm specializing in leadership development, organizational strategy, and professional excellence." />
        <meta name="keywords" content="Maan Group, Strategy, Training, Leadership Development, Organizational Strategy, Somalia, Consultancy" />
        <link rel="preload" as="image" href="/Assets/Hero.jpeg" />
      </Helmet>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-navy-900 pt-20">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/Assets/Hero.jpeg"
            alt="Maan Group Leadership Strategy and Training"
            fetchPriority="high"
            className="w-full h-full object-cover object-top"
          />
          {/* Very Lightened luxury overlay so image pops */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 via-transparent to-navy-900/50" />
          <div className="absolute inset-0 bg-navy-900/10" />
        </div>

        <div className="container mx-auto px-6 max-w-[1280px] relative z-10 flex flex-col items-center text-center pt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.3em] text-white bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-full shadow-2xl">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                Est. 2019 · Strategic Consulting & Training
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-white leading-[1.05] tracking-tight drop-shadow-2xl">
              Empowering Minds. <br />
              <span className="text-gold-500 font-serif italic tracking-normal">Building Future.</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              We are a premier consultancy and training firm specializing in leadership development, organizational strategy, and professional excellence through localized, results-driven solutions.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
              <Link
                to="/contact"
                className="btn bg-gold-500 text-white hover:bg-gold-400 px-10 py-4.5 rounded-xl flex items-center gap-2 text-sm font-semibold group shadow-[0_10px_40px_-10px_rgba(197,160,89,0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                Request a Consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="btn bg-white/5 border border-white/20 text-white hover:bg-white/15 px-10 py-4.5 rounded-xl text-sm font-semibold backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
              >
                Explore Our Services
              </Link>
            </div>

            {/* Trust Indicators Row */}
            <div className="w-full grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-8 pt-8 md:pt-12 mt-8 md:mt-12 border-t border-white/10">
              {[
                { label: 'Consulting', icon: Globe },
                { label: 'Training & Dev', icon: Users },
                { label: 'Capacity Building', icon: Target },
                { label: 'R&D', icon: Search },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.1em] sm:tracking-widest text-white font-medium bg-white/5 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-white/10 md:border-transparent p-3 sm:p-4 md:p-0 rounded-xl md:rounded-none hover:bg-white/10 md:hover:bg-transparent transition-all">
                  <item.icon size={16} className="text-white opacity-90 sm:mb-0" />
                  <span className="text-center">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="py-28 bg-white relative">
        <div className="container mx-auto px-6 max-w-[1280px]">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3 block">
                Our Services
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 leading-tight">
                Five Core Pillars of Expertise
              </h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Each service is precision-engineered to address your most complex institutional challenges.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s, idx) => (
              <ServiceCard key={idx} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FOUNDER SECTION ═══════════ */}
      <section className="py-28 lg:py-40 bg-navy-900 relative overflow-hidden z-10">
        {/* Deep Background Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] lg:text-[25rem] font-black text-white/[0.02] tracking-tighter whitespace-nowrap pointer-events-none select-none z-0">
          VISIONARY
        </div>

        <div className="container mx-auto px-6 max-w-[1280px] relative z-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
            {/* Founder Image Wrapper (Overlapping) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full lg:w-5/12 lg:z-30"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 group aspect-[4/5] bg-navy-800">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent opacity-90 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-70" />
                <img
                  src="/Assets/Owner.jpeg"
                  alt="Mohamed Salad - Founder & CEO of Maan Group"
                  loading="lazy"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-[1.5s] ease-out grayscale-[20%] group-hover:grayscale-0"
                />

                {/* Overlay Name Tag */}
                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 z-20">
                  <div className="bg-[#3b4e6d] rounded-xl px-7 py-5 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-500" />
                    <h3 className="text-2xl font-bold text-white mb-1.5 drop-shadow-md tracking-tight">Mohamed <span className="text-gold-500">Salad</span></h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#a0aab8] font-bold drop-shadow-md">Founder & CEO</p>
                  </div>
                </div>
              </div>

              {/* Decorative Animated Accents */}
              <div className="hidden lg:block absolute -top-12 -left-12 w-48 h-48 border border-gold-500/20 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
              <div className="hidden lg:block absolute -top-12 -left-12 w-48 h-48 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse] scale-110 pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold-500/20 rounded-full blur-[50px] pointer-events-none -z-10" />
            </motion.div>

            {/* Founder Content Panel (Right Side Glass Card) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-8/12 lg:-ml-12 z-20"
            >
              <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 lg:p-16 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] relative overflow-hidden group">
                {/* Glowing orb inside panel */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3 transition-all duration-1000 group-hover:bg-gold-500/20" />

                <div className="relative z-10 space-y-10">
                  {/* Quote Section */}
                  <div className="relative">
                    <Quote size={56} strokeWidth={1} className="text-gold-500/20 absolute -top-6 -left-6 z-0" />
                    <h2 className="text-2xl lg:text-4xl lg:leading-[1.3] font-bold text-white relative z-10 tracking-tight">
                      "We are all here for a special reason. Stop being a prisoner of your past. <span className="text-gold-500 font-serif italic font-light drop-shadow-sm">Become the architect of your future.</span>"
                    </h2>
                  </div>

                  <div className="w-24 h-[2px] bg-gradient-to-r from-gold-500 to-transparent" />

                  {/* Bio Paragraphs */}
                  <div className="space-y-6 text-slate-300 leading-relaxed font-light text-[0.95rem] lg:text-[1.05rem]">
                    <p>
                      Mohamed Salad Ibrahim is a visionary consultant, researcher, and academic leader specializing in institutional reform, youth empowerment, and human resource development.
                    </p>
                    <p>
                      Currently serving as Head of Department and Faculty Research Coordinator at Jamhuriya University, and a PhD candidate (DBA) at INTI International University, Malaysia, he consistently bridges the gap between rigorous academia and actionable corporate strategy. Under his leadership, Maan Group has successfully transformed institutions across Somalia and East Africa.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-4xl lg:text-5xl font-light text-white mb-2 tracking-tighter">
                        9<span className="text-gold-500 font-bold text-2xl lg:text-3xl">+</span>
                      </span>
                      <span className="text-[9px] lg:text-[11px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
                        Years of<br />Impact
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-4xl lg:text-5xl font-light text-white mb-2 tracking-tighter">
                        Top<span className="text-gold-500 font-bold text-2xl lg:text-3xl ml-1">Tier</span>
                      </span>
                      <span className="text-[9px] lg:text-[11px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
                        Academic &<br />Corporate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ UNIQUE APPROACH SECTION (TRANSPARENT / NO BG) ═══════════ */}
      <section className="py-16 lg:py-28 relative bg-white">
        <div className="container mx-auto px-6 max-w-[1200px] relative z-20">

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-6 bg-slate-50"
              >
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-[pulse_2s_ease-in-out_infinite]" />
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-navy-900">Why Maan Group</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-6 leading-[1.15] tracking-tight">
                Expertise that drives <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700 font-serif italic text-4xl sm:text-5xl lg:text-6xl">Transformation</span>
              </h2>
              <p className="text-slate-500 text-[0.95rem] leading-relaxed max-w-sm">
                We move beyond generic theories to provide solutions that are culturally relevant, relatable, and ready for immediate implementation.
              </p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-12 gap-y-10 sm:gap-y-16 pl-0 lg:pl-10">
              {[
                {
                  title: 'Innovative Training',
                  desc: 'We integrate modern teaching techniques, behavioral psychology, and corporate strategy into highly engaging workshops.',
                  icon: BookOpen
                },
                {
                  title: 'Global & Local Synergy',
                  desc: 'Bridging international best practices with regional business dynamics for relevant, actionable consulting solutions.',
                  icon: Globe
                },
                {
                  title: 'Holistic Development',
                  desc: 'A perfectly balanced focus on individual growth, professional advancement, and long-term organizational success.',
                  icon: Target
                },
                {
                  title: 'Strategic Architecture',
                  desc: 'Tailored insights specifically applied to organizational structure, market positioning, and top-tier leadership effectiveness.',
                  icon: Layers
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="w-14 h-14 mb-6 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-navy-900 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-white group-hover:-translate-y-2 group-hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)] transition-all duration-500 ease-out border border-slate-100">
                    <item.icon size={26} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors duration-300 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════ R&D FEATURE ═══════════ */}
      <section className="py-20 lg:py-28 bg-navy-900 relative overflow-hidden mb-20 lg:mb-40">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative order-2 lg:order-1"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3]">
                <img
                  src="/Assets/Hero.jpeg"
                  alt="R&D Innovation at Maan Group"
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[1500ms]"
                />
                <div className="absolute inset-0 bg-navy-900/20" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-gold-500 rounded-xl px-6 py-4 shadow-lg shadow-gold-500/20">
                <div className="text-xl font-bold text-white">R&D</div>
                <div className="text-[0.6rem] text-white/70 uppercase tracking-widest font-medium">Future-Ready</div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="space-y-7 order-1 lg:order-2"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-400 block">
                Research & Innovation
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Preparing You for the Disruptions of Tomorrow
              </h2>
              <p className="text-slate-400 text-[0.95rem] leading-relaxed font-normal">
                Our R&D division is dedicated to predictive modeling and industrial research — ensuring your institution is always one step ahead of market shifts and technological changes.
              </p>

              <ul className="space-y-6 my-10">
                {[
                  { icon: TrendingUp, label: 'Market Trend Analysis & Forecasting' },
                  { icon: Zap, label: 'Innovation Strategy Frameworks' },
                  { icon: Layers, label: 'Technical Feasibility Studies' },
                  { icon: Shield, label: 'Risk Assessment & Mitigation' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-white flex-shrink-0 transition-all duration-300">
                      <item.icon size={15} />
                    </div>
                    <span className="text-slate-300 text-sm font-normal group-hover:text-white transition-colors">{item.label}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="btn btn-primary px-8 py-4 rounded-xl inline-flex items-center gap-2 text-sm group"
                >
                  Discover Our Vision
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom-right,_rgba(197,160,89,0.05)_0%,_transparent_60%)] pointer-events-none" />
      </section>



    </main>
  );
};
