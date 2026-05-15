import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Box, Star, Quote, Clock4, CreditCard, CheckCircle2 } from 'lucide-react';

import heroGraphic from '../assets/hero-img.jpeg';
import pumpImage from '../assets/img2.jpg';
import tubeImage from '../assets/img12.jpeg';
import valveImage from '../assets/Valves.jpeg';
import actuatorImg from '../assets/actuator.png';
import airPrepImg from '../assets/air-prep.png';
import fittingsImg from '../assets/fittings.png';
import pValveImg from '../assets/pneumatic-valve.png';
import mValveImg from '../assets/manual-valve.png';
import vacuumImg from '../assets/vacuum.png';
import accessoriesImg from '../assets/accessories.png';
import automationImg from '../assets/automation-control.png';
import sensorImg from '../assets/sensors.png';

import pickPlaceImg from '../assets/img8.jpeg';
import roboticArmImg from '../assets/img5.jpeg';

import heroMain from "../assets/heromain-removebg-preview.jpg";
import menuImg from "../assets/1m-removebg-preview.jpg";
import robotImg from "../assets/2m-removebg-preview.jpg";

const categories = [
  { name: 'Pneumatic Actuators', image: actuatorImg },
  { name: 'Air Preparation Units', image: airPrepImg },
  { name: 'Pneumatic Fittings', image: fittingsImg },
  { name: 'Pneumatic Valves', image: pValveImg },
  { name: 'Automation Control Systems', image: automationImg },
  { name: 'Pneumatic Sensors', image: sensorImg },
  { name: 'Manual Valves', image: mValveImg },
  { name: 'Vacuum Products', image: vacuumImg },
  { name: 'Pneumatic Tubes', image: tubeImage },
  { name: 'Pneumatic Accessories', image: accessoriesImg },
  { name: 'Pneumatic Switches', image: pValveImg },
  { name: 'Pneumatic Cylinders', image: actuatorImg },
  { name: 'Hydraulic Flow Control', image: mValveImg },
  { name: 'Pneumatic Grippers', image: actuatorImg },
  { name: 'Pneumatic Motors', image: actuatorImg },
  { name: 'Automation Interface Systems', image: automationImg },
  { name: 'Flow Control Valves', image: mValveImg },
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

      {/* ═══════════  2. OUR CATEGORIES  ═══════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-10 md:py-12 px-6 md:px-8 lg:px-10 max-w-7xl mx-auto relative z-10"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-10 flex flex-col items-center text-center">
          <SectionLabel icon={Box}>Our Categories</SectionLabel>
          <h2 className="text-[1.6rem] md:text-[1.9rem] font-extrabold text-[#0B1527] tracking-tight">Built for demanding environments</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={`${category.name}-${idx}`}
              variants={fadeUp}
              custom={0.05 + idx * 0.05}
              className="bg-white rounded-[20px] border border-gray-100 shadow-[0_4px_20px_rgba(30,42,74,0.02)] overflow-hidden group hover:border-blue-200 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] transition-all duration-500 cursor-pointer flex flex-col"
            >
              <div className="p-4 flex justify-center items-center bg-gradient-to-b from-white to-gray-50/50 h-[160px] md:h-[170px] relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/[0.02] transition-colors duration-500"></div>
                <img src={category.image} alt={category.name} className="relative z-10 max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply drop-shadow-sm" />
              </div>
              <div className="px-3.5 py-2.5 border-t border-gray-50 bg-white text-center flex-1 flex items-center justify-center">
                <h3 className="text-[15px] font-semibold text-[#1E2A4A] group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
              </div>
            </motion.div>
          ))}
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

