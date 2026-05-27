import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Clock4, CheckCircle2, Star, Quote, MessageCircle } from 'lucide-react';

import HeroSlider from '../components/HeroSlider';
import PremiumCategories from '../components/PremiumCategories';
import OurFleet from '../components/OurFleet';

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

const SectionLabel = ({ icon: Icon, children }) => (
  <div className="inline-flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-3 bg-white/80 px-3.5 py-1.5 rounded-full border border-gray-200/60 shadow-sm w-fit">
    <span className="w-1.2 h-1.2 rounded-full bg-blue-600 animate-pulse" />
    {Icon && <Icon className="w-3.5 h-3.5 text-blue-600" />}
    <span>{children}</span>
  </div>
);

function PremiumHome() {
  const whatsappLink = 'https://wa.me/919898727796?text=Hello%20Salvin%20Industries%2C%20I%20want%20to%20book%20a%20service.';

  return (
    <div className="bg-[#EEF2F7] min-h-screen text-[#536488] font-sans antialiased overflow-x-hidden relative">
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_35px_rgba(37,211,102,0.35)] transition-shadow hover:shadow-[0_18px_45px_rgba(37,211,102,0.45)]"
        aria-label="Book service on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
        Book Service
      </motion.a>

      {/* ═══════════  1. NEW PREMIUM HERO SLIDER  ═══════════ */}
      <HeroSlider />

      {/* ═══════════  2. OUR CATEGORIES (PREMIUM REDESIGN)  ═══════════ */}
      <PremiumCategories />

      {/* ═══════════  3. OUR INDUSTRY SOLUTIONS (HORIZONTAL SLIDER)  ═══════════ */}
      <OurFleet />

      {/* ═══════════  4. TESTIMONIALS (REDESIGNED)  ═══════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="pt-10 md:pt-12 pb-6 md:pb-8 px-6 md:px-8 lg:px-12 max-w-[1500px] mx-auto relative z-10 border-t border-gray-100"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-6 flex flex-col items-center text-center">
          <SectionLabel icon={Star}>Client Reviews</SectionLabel>
          <h2 className="text-[1.85rem] md:text-[2.15rem] font-extrabold text-[#0B1527] tracking-tight leading-tight">
            Trusted by Industry Leaders
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((review, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              custom={0.1 + idx * 0.1}
              className="bg-white p-7 rounded-[2rem] border border-gray-100/80 shadow-[0_8px_30px_rgb(30,42,74,0.03)] hover:shadow-[0_20px_45px_rgba(30,42,74,0.08)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col relative group"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-gray-100 opacity-60 group-hover:text-blue-50 transition-colors duration-500 z-10" />

              <div className="flex text-amber-400 mb-6 gap-1 relative z-10">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>

              <p className="text-[12.5px] md:text-[13px] leading-relaxed text-[#536488] mb-6 flex-1 font-medium relative z-10">
                "{review.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-gray-100 pt-5 relative z-10">
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

      {/* ═══════════  6. POLICY / WHY CHOOSE US  ═══════════ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="pt-2 pb-12 md:pb-14 px-6 md:px-8 lg:px-12 max-w-[1500px] mx-auto relative z-20"
      >
        <div className="bg-white rounded-[2.5rem] border border-gray-100/80 p-8 shadow-[0_8px_30px_rgb(30,42,74,0.03)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y md:divide-y-0 lg:divide-x divide-gray-100">
            {trustFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  custom={idx * 0.1}
                  className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 px-1.5 lg:px-6 group cursor-default text-center sm:text-left ${idx > 0 ? 'pt-6 md:pt-0' : ''}`}
                >
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#0B1527] group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col justify-center h-full">
                    <h4 className="text-[15px] font-extrabold text-[#0B1527] mb-1">{feature.title}</h4>
                    <p className="text-[12.5px] md:text-[13px] text-[#536488] leading-snug font-medium">{feature.desc}</p>
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
