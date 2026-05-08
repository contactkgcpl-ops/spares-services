import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Factory, ShieldCheck, Truck, Sparkles, SlidersHorizontal, MapPin, Box, Globe, Clock4 } from 'lucide-react';
import heroGraphic from '../assets/hero-img.jpeg';
import pumpImage from '../assets/img2.jpg';
import filterImage from '../assets/img3.png';
import controlImage from '../assets/img4.jpeg';
import motorImage from '../assets/img5.jpeg';
import bearingImage from '../assets/img6.jpeg';
import valveImage from '../assets/Valves.jpeg';
import serviceImage from '../assets/img7.jpeg';
import automationImage from '../assets/img8.jpeg';
import processImage from '../assets/img9.jpeg';
import deliveryImage from '../assets/img10.jpeg';
import manufacturingImage from '../assets/img11.jpeg';
import facilityImage from '../assets/img12.jpeg';

const companyStats = [
  { label: 'Years Experience', value: '18+', icon: Factory },
  { label: 'Projects', value: '420+', icon: Box },
  { label: 'Industries Served', value: '28', icon: Globe },
  { label: 'Technical Support', value: '24/7', icon: ShieldCheck },
];

const categories = [
  { name: 'Pump Systems', image: pumpImage },
  { name: 'Filters', image: filterImage },
  { name: 'PLC & Controls', image: controlImage },
  { name: 'Industrial Motors', image: motorImage },
  { name: 'Bearings', image: bearingImage },
  { name: 'Filtration Systems', image: filterImage },
  { name: 'Valves', image: valveImage },
  { name: 'Spare Parts', image: manufacturingImage },
];

const reasons = [
  { title: 'Fast Delivery', icon: Truck },
  { title: 'Industrial Expertise', icon: Factory },
  { title: 'Genuine Spare Parts', icon: Box },
  { title: 'Technical Support', icon: ShieldCheck },
  { title: 'Custom Solutions', icon: SlidersHorizontal },
  { title: 'Nationwide Supply', icon: Globe },
];

const workflow = [
  { label: 'Inquiry', icon: MapPin },
  { label: 'Consultation', icon: ShieldCheck },
  { label: 'Sourcing', icon: Box },
  { label: 'Quality Check', icon: Sparkles },
  { label: 'Dispatch', icon: Truck },
  { label: 'Support', icon: Clock4 },
];

function PremiumHome() {
  return (
    <div className="space-y-20 pb-8">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-2xl border border-[#D3C2B6]/60 bg-gradient-to-br from-[#FBF7F1] via-[#FBF7F1] to-[#F4ECE4]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 top-12 h-96 w-96 rounded-full bg-[#D87F2A]/8 blur-3xl" />
          <div className="absolute -left-28 -bottom-12 h-80 w-80 rounded-full bg-[#D87F2A]/5 blur-3xl" />
          <div className="absolute right-1/3 top-1/2 h-48 w-48 rounded-full bg-[#122136]/3 blur-2xl" />
        </div>
        <div className="relative grid gap-12 px-8 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-14 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-3 rounded-full border border-[#D87F2A]/30 bg-gradient-to-r from-[#D87F2A]/15 to-[#D87F2A]/5 px-5 py-3 text-sm font-semibold text-[#D87F2A] shadow-sm backdrop-blur-sm"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#D87F2A]/30 blur-sm" />
                <Factory className="relative h-5 w-5" />
              </div>
              Industrial Engineering Excellence
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="text-3xl font-bold tracking-tight text-[#14212A] lg:text-5xl xl:text-6xl leading-tight"
            >
              Advanced Industrial Spare & Process Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-700"
            >
              Delivering dependable components, automation expertise, and lifecycle support for critical plant operations
              across manufacturing and process industries.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                to="/spares-service/products"
                className="group relative inline-flex items-center gap-3 rounded-xl bg-gradient-to-br from-[#D87F2A] to-[#B95F1C] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#D87F2A]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D87F2A]/35 active:translate-y-0"
              >
                <span>Explore Products</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
              <a
                href="mailto:info@salvinindustries.com"
                className="group inline-flex items-center gap-3 rounded-xl border-2 border-[#D87F2A] bg-white/50 px-8 py-4 text-base font-semibold text-[#14212A] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#B95F1C] hover:bg-white hover:text-[#D87F2A] hover:shadow-lg hover:shadow-[#D87F2A]/15"
              >
                <span>Contact Team</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-5 w-5 text-[#D87F2A]" />
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#D87F2A]/20 via-transparent to-[#D87F2A]/10 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative rounded-2xl border-2 border-[#D3C2B6] bg-gradient-to-br from-white to-[#F4ECE4] p-4 shadow-xl shadow-[#D87F2A]/10 transition-all duration-500 group-hover:border-[#D87F2A]/30 group-hover:shadow-2xl group-hover:shadow-[#D87F2A]/15">
              <img
                src={heroGraphic}
                alt="Industrial operations and engineering systems"
                className="h-72 w-full rounded-xl object-cover ring-4 ring-[#F6F3F0] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="rounded-2xl border border-[#D3C2B6]/60 bg-gradient-to-br from-[#F4ECE4] via-white to-[#FBF7F1] px-8 py-20 lg:px-14 lg:py-24"
      >
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] font-semibold text-[#D87F2A]">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#D87F2A]/30 blur-sm" />
                <Sparkles className="relative h-5 w-5" />
              </div>
              Who We Are
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#14212A] lg:text-5xl leading-tight">
              Engineering-first industrial partner
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-xl">
              We support plant reliability with integrated spare sourcing, process system understanding, and automation-backed
              service. Our team works directly with operations and maintenance units to maintain uptime and improve process
              performance through practical, field-ready solutions.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="grid grid-cols-2 gap-6"
          >
            {companyStats.map((stat, index) => {
              const StatIcon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl border border-[#D3C2B6] bg-gradient-to-br from-white to-[#FBF7F1] p-6 shadow-lg shadow-[#D87F2A]/5 transition-all duration-300 hover:border-[#D87F2A]/40 hover:shadow-xl hover:shadow-[#D87F2A]/12"
                >
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#D87F2A]/10 to-transparent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D87F2A]/15 to-[#D87F2A]/5 text-[#D87F2A] shadow-md shadow-[#D87F2A]/10 transition-all duration-300 group-hover:from-[#D87F2A]/25 group-hover:to-[#D87F2A]/10 group-hover:shadow-lg group-hover:shadow-[#D87F2A]/15">
                    <StatIcon className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-3xl font-bold tracking-tight text-[#14212A]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-600 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="space-y-8"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D87F2A]">
            <SlidersHorizontal className="h-4 w-4" />
            Product Categories
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#14212A] md:text-4xl">Built for demanding industrial environments</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, idx) => (
            <motion.article
              key={`${category.name}-${idx}`}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-[#D3C2B6] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#D87F2A]"
            >
              <img src={category.image} alt={category.name} className="h-40 w-full rounded-xl bg-[#F4ECE4] object-cover p-4" />
              <h3 className="mt-4 text-lg font-semibold text-[#14212A]">{category.name}</h3>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="rounded-xl border border-[#D3C2B6] bg-[#F4ECE4] px-6 py-16 lg:px-10"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D87F2A]">
            <ShieldCheck className="h-4 w-4" />
            Why Choose Us
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#14212A] md:text-4xl">Performance with accountability</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => {
            const ReasonIcon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-[#D3C2B6] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#D87F2A]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D87F2A]/10 text-[#D87F2A] shadow-sm">
                  <ReasonIcon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-base font-medium text-[#14212A]">{reason.title}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <section className="space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D87F2A]">
            <Factory className="h-4 w-4" />
            Industrial Solutions
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#14212A] md:text-4xl">Solutions aligned to plant lifecycle needs</h2>
        </div>
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid gap-6 rounded-xl border border-[#D3C2B6] bg-white p-5 lg:grid-cols-2 lg:items-center shadow-sm"
          >
            <img src={automationImage} alt="PLC panel and control automation systems" className="h-64 w-full rounded-xl bg-[#F4ECE4] object-cover p-4" />
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D87F2A]">
                <SlidersHorizontal className="h-4 w-4" />
                Automation and control modernization
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#14212A]">Automation and control modernization</h3>
              <p className="text-slate-700 leading-relaxed">
                From PLC integration to control panel optimization, we help plants improve process consistency and reduce
                intervention through engineered control strategies.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
            className="grid gap-6 rounded-xl border border-[#D3C2B6] bg-[#F4ECE4] p-5 lg:grid-cols-2 lg:items-center shadow-sm"
          >
            <div className="order-2 space-y-3 lg:order-1">
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D87F2A]">
                <Sparkles className="h-4 w-4" />
                Filtration and process reliability packages
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#14212A]">Filtration and process reliability packages</h3>
              <p className="text-slate-700 leading-relaxed">
                We design dependable filtration and spare replacement programs to secure process quality and minimize
                contamination-related downtime.
              </p>
            </div>
            <img src={processImage} alt="Industrial filtration systems and process equipment" className="order-1 h-64 w-full rounded-xl bg-white object-cover p-4 lg:order-2" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="grid gap-6 rounded-xl border border-[#D3C2B6] bg-white p-5 lg:grid-cols-2 lg:items-center shadow-sm"
          >
            <img src={deliveryImage} alt="Industrial logistics and nationwide technical support" className="h-64 w-full rounded-xl bg-[#F4ECE4] object-cover p-4" />
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#D87F2A]">
                <Truck className="h-4 w-4" />
                Delivery, commissioning, and field support
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-[#14212A]">Delivery, commissioning, and field support</h3>
              <p className="text-slate-700 leading-relaxed">
                Our coordinated supply and service teams ensure dependable dispatch, commissioning guidance, and quick support
                response across critical operating zones.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="rounded-xl border border-[#D3C2B6] bg-white px-6 py-16 lg:px-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D87F2A]">
            <MapPin className="h-4 w-4" />
            Workflow
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-[#14212A] md:text-4xl">How we execute every requirement</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {workflow.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div key={step.label} className="rounded-xl border border-[#D3C2B6] bg-[#F4ECE4] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D87F2A]">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-[#D87F2A] shadow-sm">
                  <StepIcon className="h-4 w-4" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-500">Step {index + 1}</p>
                <p className="mt-2 text-sm font-medium text-[#14212A]">{step.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#07182f] px-6 py-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-[#f47c20]">Ready to Scale Operations?</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Partner with a team built for high-performance industrial supply and support
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Share your technical requirement and operating constraints. We will map the right spare and process solution with
              speed, quality focus, and engineering clarity.
            </p>
            <a
              href="mailto:info@salvinindustries.com"
              className="inline-flex rounded-lg bg-[#f47c20] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
            >
              Connect with Engineering Team
            </a>
          </div>
          <img src={facilityImage} alt="Industrial facility and engineering infrastructure" className="h-64 w-full rounded-xl bg-white/5 object-cover p-4" />
        </div>
      </section>
    </div>
  );
}

export default PremiumHome;
