import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Factory,
  Gauge,
  MessageCircle,
  ShieldCheck,
  Settings2,
  Wrench,
  Zap,
} from 'lucide-react';

import serviceHero from '../assets/hero-img.jpeg';
import amcImage from '../assets/about/showcase_pneumatic.png';
import bdsImage from '../assets/img10.jpeg';
import installImage from '../assets/about/workflow_bg.png';

const whatsappLink = 'https://wa.me/919023979663?text=Hello%20Salvin%20Industries%2C%20I%20want%20to%20book%20a%20service.';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const services = [
  {
    title: 'AMC - Annual Maintenance Contract',
    short: 'Planned care for machines, panels, pneumatics, and automation systems.',
    image: amcImage,
    icon: CalendarCheck,
    points: ['Preventive maintenance visits', 'Health checks and reports', 'Priority technical support'],
  },
  {
    title: 'BDS - Break Down Service',
    short: 'Quick fault finding and repair support when production stops.',
    image: bdsImage,
    icon: Wrench,
    points: ['Emergency troubleshooting', 'Spare identification support', 'On-site corrective action'],
  },
  {
    title: 'Machine Commissioning / Installation',
    short: 'Professional setup, testing, and handover for new or relocated machines.',
    image: installImage,
    icon: Settings2,
    points: ['Machine installation support', 'System testing and calibration', 'Operator handover guidance'],
  },
];

const processSteps = [
  { label: 'Inspect', icon: Gauge },
  { label: 'Diagnose', icon: Zap },
  { label: 'Repair', icon: Wrench },
  { label: 'Verify', icon: CheckCircle2 },
];

function ServicesPage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#EEF2F7] font-sans text-[#536488]">
      <section className="relative bg-white px-6 py-16 md:px-8 md:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div initial="hidden" animate="visible" className="relative z-10">
            <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Industrial Service Support
            </motion.div>
            <motion.h1 variants={fadeUp} custom={0.08} className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[#0B1527] md:text-5xl">
              Reliable machine service for smooth factory uptime
            </motion.h1>
            <motion.p variants={fadeUp} custom={0.16} className="mt-5 max-w-2xl text-sm font-medium leading-7 text-[#536488] md:text-base">
              Salvin Industries supports maintenance, breakdown repair, and machine commissioning with practical technical help for industrial equipment and automation.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.24} className="mt-7 flex flex-wrap gap-3">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#FF7A1A] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#e66a12]">
                <MessageCircle className="h-4 w-4" />
                Book Service
              </a>
              <Link to="/spares-service/products" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-[#0F1E4A] transition-colors hover:border-[#0F1E4A]">
                View Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative min-h-[360px]">
            <div className="absolute inset-4 rounded-[2rem] bg-[#0F1E4A]" />
            <img src={serviceHero} alt="Industrial machine service" className="relative h-[360px] w-full rounded-[2rem] object-cover shadow-2xl md:h-[460px]" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF2F7] text-[#FF7A1A]">
                  <Factory className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Focus</p>
                  <p className="text-sm font-extrabold text-[#0F1E4A]">Less downtime</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-8 md:py-16 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-8 text-center">
            <motion.p variants={fadeUp} className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Main Services</motion.p>
            <motion.h2 variants={fadeUp} custom={0.08} className="mt-3 text-2xl font-extrabold text-[#0B1527] md:text-4xl">Service coverage built for production teams</motion.h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  custom={index * 0.1}
                  whileHover={{ y: -8 }}
                  className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(30,42,74,0.04)] transition-shadow hover:shadow-[0_20px_45px_rgba(30,42,74,0.12)]"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#FF7A1A] shadow-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-extrabold leading-snug text-[#0B1527]">{service.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-[#536488]">{service.short}</p>
                    <div className="mt-5 space-y-3">
                      {service.points.map((point) => (
                        <div key={point} className="flex items-center gap-2.5 text-sm font-bold text-[#0F1E4A]">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-blue-600" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-14 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">Service Flow</p>
            <h2 className="mt-3 text-2xl font-extrabold text-[#0B1527] md:text-3xl">Clear steps from issue to stable running</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="rounded-2xl border border-slate-200 bg-[#EEF2F7] p-5 text-center"
                >
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#0F1E4A] shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-extrabold text-[#0F1E4A]">{step.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 rounded-[1.75rem] bg-[#0F1E4A] p-7 text-center shadow-lg md:flex-row md:p-9 md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Need service support today?</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-blue-100">Send machine details on WhatsApp. Our team will guide next step.</p>
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-1">
            <MessageCircle className="h-4 w-4" />
            Book Service
          </a>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
