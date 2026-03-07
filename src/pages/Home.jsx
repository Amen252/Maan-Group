import React from 'react';
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

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-navy-900 pt-20">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/Assets/Hero.jpeg"
            alt="Maan Group Leadership"
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
            <div className="flex flex-wrap items-center justify-center gap-8 pt-12 mt-12 border-t border-white/10">
              {[
                { label: 'Consulting', icon: Globe },
                { label: 'Training & Dev', icon: Users },
                { label: 'Capacity Building', icon: Target },
                { label: 'R&D', icon: Search },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-300 font-medium">
                  <item.icon size={15} className="text-gold-500 opacity-80" />
                  {item.label}
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
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Founder Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full lg:w-1/2"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/Assets/Owner.jpeg"
                  alt="Mohamed Salad - Founder"
                  className="w-full h-auto object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl -z-0" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-navy-900/5 rounded-full blur-3xl -z-0" />

              <div className="absolute bottom-8 right-8 z-20 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[240px]">
                <Quote size={32} className="text-gold-500 mb-4 opacity-50" />
                <p className="text-sm font-medium text-navy-900 leading-relaxed italic">
                  "Success is not just about intelligence; it's about the courage to transform and the discipline to evolve."
                </p>
              </div>
            </motion.div>

            {/* Founder Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-500 mb-3 block">
                  Our Founder
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 leading-tight mb-4">
                  Mohamed <span className="text-gold-500">Salad</span>
                </h2>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Founder & CEO · Motivational Speaker · Corporate Trainer
                </p>
              </div>

              <div className="space-y-6 text-slate-600 leading-relaxed text-[1.05rem]">
                <p>
                  As a leading voice in corporate training and professional development, Mohamed Salad has dedicated his career to unlocking the human potential within Somalia's emerging institutions.
                </p>
                <p>
                  His approach combines high-level strategic insight with a deep understanding of local cultural dynamics, ensuring that every workshop and consulting session delivers more than just theory—it delivers lasting, measurable change.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <div className="text-2xl font-bold text-navy-900 mb-1">Expert</div>
                  <div className="text-xs uppercase tracking-widest text-gold-500 font-bold">Leadership Coaching</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-navy-900 mb-1">Global</div>
                  <div className="text-xs uppercase tracking-widest text-gold-500 font-bold">Strategic Insight</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ UNIQUE APPROACH SECTION ═══════════ */}
      <section className="py-28 bg-slate-50 relative">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold-500 mb-4 block">
              Why Maan Group
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-6">
              A Unique Approach Rooted in <span className="text-gold-500">Reality</span>
            </h2>
            <p className="text-slate-500 text-[0.95rem] leading-relaxed">
              We move beyond generic foreign theories to provide solutions that are culturally relevant, Relatable, and ready for immediate implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Localized Insights',
                desc: 'Every strategy is filtered through Somalia’s unique socio-economic landscape, ensuring it works in practice, not just on paper.',
                icon: Globe
              },
              {
                title: 'Practical Impact',
                desc: 'We focus on results. Our training sessions are high-energy workshops where skills are built and tested in real-time.',
                icon: Zap
              },
              {
                title: 'Tailored Excellence',
                desc: 'No "one-size-fits-all". We customize our consultancy frameworks to the specific maturity and goals of your institution.',
                icon: Target
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-gold-500/20 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-navy-900 text-gold-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                  <item.icon size={26} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ R&D FEATURE ═══════════ */}
      <section className="py-28 bg-navy-900 relative overflow-hidden mb-40">
        <div className="container mx-auto px-6 max-w-[1280px]">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
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
                  alt="R&D Innovation"
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
