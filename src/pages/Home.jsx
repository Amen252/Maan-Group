import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, ChevronRight, Shield, Rocket, Target,
  Globe, BookOpen, Layers, Users, TrendingUp, Zap, CheckCircle, Search, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── Service card ── */
const ServiceCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="p-8 bg-white rounded-2xl border border-slate-100 transition-all duration-300 shadow-sm hover:shadow-md hover:border-gold-500/40 group flex flex-col gap-5"
  >
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
      style={{ backgroundColor: `${color}12`, color }}
    >
      <Icon size={22} />
    </div>
    <div>
      <h3 className="text-base font-semibold text-navy-900 mb-2 group-hover:text-gold-500 transition-colors">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
    <Link
      to="/services"
      className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-900 uppercase tracking-wider hover:text-gold-500 transition-colors mt-auto group/link"
    >
      Learn more <ChevronRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

export const Home = () => {
  const services = [
    { icon: Globe, title: 'Consulting Services', description: 'Modernizing governance and developing agile leaders with localized insights and global expertise.', color: '#C5A059' },
    { icon: Users, title: 'Training & Development', description: 'Unlocking human potential through tailored leadership and professional readiness programs.', color: '#0A192F' },
    { icon: Target, title: 'Capacity Building', description: 'Strengthening institutions and amplifying unheard voices to foster impactful change.', color: '#C5A059' },
    { icon: Search, title: 'Research & Development', description: 'Turning data and real-world stories into actionable practice and policy.', color: '#0A192F' },
  ];

  const stats = [
    { value: '2019', label: 'Founded' },
    { value: '50+', label: 'Consultants' },
    { value: '30+', label: 'Nations' },
    { value: '100%', label: 'Client Focus' },
  ];

  return (
    <main className="font-body">

      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-screen flex items-center relative overflow-hidden bg-white pt-12">
        <div className="absolute top-[15%] right-[8%] w-72 h-72 bg-gold-500/8 rounded-full blur-[80px] z-0 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1280px] relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 lg:py-16">

            {/* Left — content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="space-y-8"
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-gold-500 bg-gold-500/8 border border-gold-500/20 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                Est. 2019 · Strategic Consulting & Training
              </span>

              {/* Headline — normal weight, no extrabold */}
              <h1 className="text-4xl lg:text-[3.6rem] font-bold text-navy-900 leading-[1.12] tracking-tight">
                Empowering Minds. <br />
                <span className="text-gold-500">Building Future.</span>
              </h1>

              <p className="text-base text-slate-500 leading-relaxed max-w-lg font-normal">
                Maan Group is a premier consultancy and training firm in Somalia, specialized in leadership development, organizational strategy, and professional excellence through localized, results-driven solutions.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/contact"
                  className="btn btn-primary px-8 py-4 rounded-xl flex items-center gap-2 text-sm group"
                >
                  Request a Consultation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="btn btn-outline px-8 py-4 rounded-xl text-sm"
                >
                  Our Services
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-5 pt-4">
                {[
                  'Consulting Services',
                  'Training & Development',
                  'Capacity Building',
                  'Research & Development',
                ].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <CheckCircle size={14} className="text-gold-500 flex-shrink-0" />
                    {tag}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — image + floating stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="relative w-full lg:h-[800px] flex items-center justify-center p-0 lg:p-4 mt-8 lg:mt-0"
            >
              {/* MOBILE VIEW — Single premium focus */}
              <div className="block lg:hidden w-full px-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="rounded-[3rem] overflow-hidden shadow-[0_45px_100px_-20px_rgba(0,0,0,0.2)] border-4 border-white aspect-[4/5] relative"
                >
                  <img
                    src="/Assets/Hero.jpeg"
                    alt="MaanGroup Innovation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl border border-gold-500/20 flex items-center gap-4">
                    <img src="/Assets/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-xl object-contain" />
                    <div>
                      <div className="text-xs font-black text-navy-900 uppercase tracking-widest">MaanGroup</div>
                      <div className="text-[0.6rem] text-gold-500 font-bold uppercase tracking-tight">Lead Your Industry</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* DESKTOP VIEW — High-end 3-image Mosaic composition */}
              <div className="hidden lg:flex relative w-full h-[600px] max-w-[650px] items-center justify-center">
                {/* Visual Flair: Background orbs */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.06)_0%,_transparent_70%)] -z-10" />

                {/* Image 1: Bottom Left (Activity) */}
                <motion.div
                  initial={{ opacity: 0, x: -60, y: 60 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, zIndex: 30 }}
                  className="absolute bottom-4 left-0 w-[60%] h-[55%] rounded-[3rem] overflow-hidden shadow-2xl z-10 border-[10px] border-white"
                >
                  <img
                    src="/Assets/activity.jpeg"
                    alt="Institutional Activity"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-navy-900/10" />
                </motion.div>

                {/* Image 2: Top Right Focus (Hero) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 60 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="absolute top-4 right-0 w-[65%] h-[60%] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(197,160,89,0.3)] z-20 border-[12px] border-white"
                >
                  <img
                    src="/Assets/Hero.jpeg"
                    alt="MaanGroup Excellence"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-navy-900/5" />
                </motion.div>

                {/* Centered Premium Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: 'spring', stiffness: 150 }}
                  className="absolute bottom-[5%] -left-12 z-30 bg-navy-900 text-white px-8 py-6 rounded-[2rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-md min-w-[240px]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-inner">
                      <img src="/Assets/logo.jpeg" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-widest text-gold-400">Institutional</div>
                      <div className="text-xs font-light tracking-tighter text-slate-300 italic leading-none">Global Advisory</div>
                    </div>
                  </div>
                  <div className="h-px w-full bg-white/10 my-4" />
                  <div className="flex justify-between items-center">
                    <div className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-slate-100">Establish 2019</div>
                    <ArrowRight size={14} className="text-gold-500 animate-pulse" />
                  </div>
                </motion.div>

                {/* Animated Ornament */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-10 -left-20 w-48 h-48 border-[0.5px] border-gold-500/20 rounded-full flex items-center justify-center -z-10"
                >
                  <div className="w-[85%] h-[85%] border-[0.5px] border-gold-500/5 rounded-full border-dashed" />
                </motion.div>
              </div>
            </motion.div>
          </div>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.55 }}
              >
                <ServiceCard {...s} />
              </motion.div>
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
