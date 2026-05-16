import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Box, Star, Quote, Clock4, CreditCard, CheckCircle2, Wind, Cog, Cpu, Zap } from 'lucide-react';

import heroGraphic from '../assets/hero-img.jpeg';
import pumpImage from '../assets/img2.jpg';
import tubeImage from '../assets/img12.jpeg';
import valveImage from '../assets/Valves.jpeg';

// Category images
import pneumaticImg from '../assets/categories/pneumatic.png';
import mechanicalImg from '../assets/categories/mechanical.png';
import electronicImg from '../assets/categories/electronic.png';
import electricImg from '../assets/categories/electric.png';

import heroMain from "../assets/heromain-removebg-preview.jpg";
import menuImg from "../assets/1m-removebg-preview.jpg";
import robotImg from "../assets/2m-removebg-preview.jpg";

const categories = [
  {
    name: 'Pneumatic',
    image: pneumaticImg,
    icon: Wind,
    description: 'Cylinders, valves, fittings & air preparation',
    gradient: 'from-blue-600 to-cyan-500',
    hoverGlow: 'rgba(59, 130, 246, 0.3)',
  },
  {
    name: 'Mechanical',
    image: mechanicalImg,
    icon: Cog,
    description: 'Bearings, couplings, valves & hardware',
    gradient: 'from-slate-600 to-zinc-500',
    hoverGlow: 'rgba(100, 116, 139, 0.3)',
  },
  {
    name: 'Electronic',
    image: electronicImg,
    icon: Cpu,
    description: 'PLCs, controllers, sensors & relays',
    gradient: 'from-emerald-600 to-teal-500',
    hoverGlow: 'rgba(16, 185, 129, 0.3)',
  },
  {
    name: 'Electric',
    image: electricImg,
    icon: Zap,
    description: 'Power supplies, MCBs, switches & push buttons',
    gradient: 'from-orange-500 to-amber-500',
    hoverGlow: 'rgba(249, 115, 22, 0.3)',
  },
];

const trustFeatures = [
  { title: 'Fast Delivery', desc: 'Nationwide industrial dispatch', icon: Truck },
  { title: 'Secure Service', desc: 'Protected transactions & data', icon: ShieldCheck },
  { title: '24/7 Support', desc: 'Dedicated engineering team', icon: Clock4 },
  { title: 'Quality Assurance', desc: '100% genuine guaranteed', icon: CheckCircle2 },
];

const testimonials = [
  { 
    name: 'Rajesh Sharma', 
    role: 'Operations Head',
    company: 'TechFlow Industries', 
    text: 'Salvin has completely transformed our spare parts sourcing. Their fast delivery and technical support are unmatched in the industry. Highly recommended for heavy automation.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  { 
    name: 'Vikram Singh', 
    role: 'Chief Engineer',
    company: 'Prime Manufacturing', 
    text: 'High quality pneumatic spares and reliable PLCs. We trust Salvin for all our critical plant automation and modernization needs. The engineering depth they provide is excellent.',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
  },
  { 
    name: 'Anita Desai', 
    role: 'Plant Manager',
    company: 'Apex Process Systems', 
    text: 'The engineering team at Salvin is exceptional. They understand our requirements perfectly and deliver genuine parts right on time, every time. A true industrial partner.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
];

/* ── animation presets ─────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

/* ── reusable section label ────────────────────── */
const SectionLabel = ({ icon: Icon, children }) => (
  <div className="inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#1E2A4A] mb-4 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200/60 shadow-sm">
    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
    {Icon && <Icon className="w-3.5 h-3.5 text-blue-600" />}
    <span>{children}</span>
  </div>
);

function PremiumHome() {
  return (
    <div className="bg-[#EEF2F7] min-h-screen text-[#536488] font-sans antialiased overflow-x-hidden relative">
      


      {/* ═══════════  1. HERO SECTION  ═══════════ */}
      <section className="bg-[#EEF2F7] px-6 py-5 lg:px-10 xl:px-12 pb-8">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-5 lg:gap-6 lg:grid-cols-[1.25fr_1fr]">

          {/* LEFT BIG CARD */}
          <div className="flex min-h-[410px] items-center justify-between rounded-[24px] bg-white p-6 md:p-7 lg:p-8 shadow-[0_8px_30px_rgba(30,42,74,0.04)] border border-white">
            <div className="max-w-xl flex flex-col justify-center">
              <span className="mb-3 inline-flex w-fit rounded-full bg-[#EEF2F7] px-4 py-1.5 text-xs font-bold tracking-wide text-[#1E2A4A]">
                Premium Industrial Partner
              </span>

              <h1 className="text-[2rem] font-extrabold leading-[1.04] text-[#1E2A4A] md:text-[2.25rem] lg:text-[2.65rem] tracking-tight">
                High-Quality
                <br />
                Pneumatic Spares &
                <br />
                Industrial Parts
              </h1>

              <p className="mt-4 max-w-lg text-[15px] leading-6 text-[#536488] font-medium pr-4 md:text-base">
                Easy to find quality pneumatic parts with quick delivery
                and dependable engineering service.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="rounded-xl bg-[#1E2A4A] px-6 py-3 text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(30,42,74,0.15)] transition hover:bg-blue-600">
                  Shop Now →
                </button>

                <button className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-[13px] font-bold text-[#1E2A4A] transition hover:bg-[#EEF2F7]">
                  Explore Catalog
                </button>
              </div>
            </div>

            {/* MAIN IMAGE */}
            <div className="relative flex items-center justify-center bg-transparent">
              <img
                src={heroMain}
                alt="Industrial Product"
                className="w-[360px] lg:w-[430px] object-contain"
              />
            </div>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="flex flex-col gap-5 lg:gap-6">

            {/* CARD 1 */}
            <div className="flex min-h-[190px] flex-1 items-center justify-between rounded-[24px] bg-white p-6 md:p-7 shadow-[0_8px_30px_rgba(30,42,74,0.04)] border border-white transition hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,42,74,0.08)] group cursor-pointer">
              <div className="flex flex-col h-full justify-center">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">
                  Featured Item
                </p>

                <h3 className="text-xl md:text-[1.35rem] font-extrabold leading-tight text-[#1E2A4A]">
                  Pick & Place
                  <br />
                  System
                </h3>
              </div>

              <div className="relative flex items-center justify-center bg-transparent">
                <img
                  src={menuImg}
                  alt="Pick & Place"
                  className="w-[160px] object-contain"
                />
              </div>
            </div>

            {/* CARD 2 */}
            <div className="flex min-h-[190px] flex-1 items-center justify-between rounded-[24px] bg-white p-6 md:p-7 shadow-[0_8px_30px_rgba(30,42,74,0.04)] border border-white transition hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,42,74,0.08)] group cursor-pointer">
              <div className="flex flex-col h-full justify-center">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-blue-600">
                  Automation
                </p>

                <h3 className="text-xl md:text-[1.35rem] font-extrabold leading-tight text-[#1E2A4A]">
                  Robotic Arm
                </h3>
              </div>

              <div className="relative flex items-center justify-center bg-transparent">
                <img
                  src={robotImg}
                  alt="Robotic Arm"
                  className="w-[160px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════  2. OUR CATEGORIES (PREMIUM REDESIGN)  ═══════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-12 md:py-16 px-6 md:px-8 lg:px-10 max-w-7xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-12 flex flex-col items-center text-center">
          <SectionLabel icon={Box}>Our Categories</SectionLabel>
          <h2 className="text-[1.6rem] md:text-[2rem] font-extrabold text-[#0B1527] tracking-tight">Built for demanding environments</h2>
          <p className="mt-3 text-sm md:text-base text-[#536488] max-w-xl font-medium">
            Explore our comprehensive range of industrial components across four core product families.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                variants={fadeUp}
                custom={0.1 + idx * 0.1}
              >
                <Link
                  to={`/spares-service/products?category=${encodeURIComponent(category.name)}`}
                  className="group relative block rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
                  style={{
                    boxShadow: '0 8px 32px rgba(30, 42, 74, 0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 50px ${category.hoverGlow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(30, 42, 74, 0.06)';
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-[220px] md:h-[260px] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-500`} />
                    
                    {/* Top-right Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/25 group-hover:scale-110 transition-all duration-500">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-1.5 drop-shadow-lg">
                        {category.name}
                      </h3>
                      <p className="text-[13px] text-white/85 font-medium leading-relaxed">
                        {category.description}
                      </p>

                      {/* Explore Button */}
                      <div className="mt-3 inline-flex items-center gap-2 text-[12px] font-bold text-white/90 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 group-hover:bg-white/25 group-hover:gap-3 transition-all duration-500">
                        <span>Explore</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ═══════════  3. TESTIMONIALS (REDESIGNED)  ═══════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-10 md:py-12 px-6 md:px-8 lg:px-10 max-w-7xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-10 flex flex-col items-center text-center">
          <SectionLabel icon={Star}>Client Reviews</SectionLabel>
          <h2 className="text-[1.6rem] md:text-[1.9rem] font-extrabold text-[#0B1527] tracking-tight">Trusted by industry leaders</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((review, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              custom={0.1 + idx * 0.1}
              className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(30,42,74,0.03)] hover:shadow-[0_20px_40px_rgba(30,42,74,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col relative group"
            >
              <div className="absolute top-0 right-10 w-20 h-24 bg-gradient-to-b from-blue-50/50 to-transparent rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              
              <Quote className="absolute top-8 right-8 w-10 h-10 text-[#EEF2F7] opacity-60 group-hover:text-blue-100 transition-colors duration-500 z-10" />
              
              <div className="flex text-amber-400 mb-6 gap-1 relative z-10">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              
              <p className="text-[13.5px] leading-[1.6] text-[#536488] mb-5 flex-1 font-medium relative z-10">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-gray-100 pt-3 relative z-10">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover shadow-[0_4px_10px_rgba(0,0,0,0.08)] border-2 border-white group-hover:scale-105 transition-transform duration-300" />
                <div>
                  <h4 className="font-extrabold text-[#0B1527] text-sm">{review.name}</h4>
                  <p className="text-xs font-semibold text-[#536488]">{review.role}, <span className="text-blue-600">{review.company}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ═══════════  4. POLICY / WHY CHOOSE US  ═══════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mt-4 pt-4 pb-10 md:pb-12 px-6 md:px-8 lg:px-10 max-w-7xl mx-auto relative z-20"
      >
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(30,42,74,0.03)] border border-gray-100/80 p-4 md:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {trustFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={feature.title}
                  variants={fadeUp}
                  custom={idx * 0.1}
                  className={`flex flex-col sm:flex-row items-center sm:items-start gap-3.5 px-1.5 lg:px-6 group cursor-default text-center sm:text-left ${idx > 1 ? 'pt-4 lg:pt-0' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#EEF2F7] text-[#1E2A4A] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#1E2A4A] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col justify-center h-full">
                    <h4 className="text-[15px] font-extrabold text-[#0B1527] mb-1">{feature.title}</h4>
                    <p className="text-[13px] text-[#536488] leading-snug font-medium">{feature.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

    </div>
  );
}

export default PremiumHome;
