import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

import HeroSlider from '../components/HeroSlider';
import ExperienceSection from '../components/ExperienceSection';
import IndustriesWeServe from '../components/IndustriesWeServe';
import WhyChooseUs from '../components/WhyChooseUs';
import GlobalPresence from '../components/GlobalPresence';
import { updateHomePageSEO } from '../../../utils/seoHelper';

function PremiumHome() {
  const whatsappLink = 'https://wa.me/919898727796?text=Hello%20Salvin%20Industries%2C%20I%20want%20to%20book%20a%20service.';

  useEffect(() => {
    updateHomePageSEO();
  }, []);

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

      {/* ═══════════  2. YEARS OF EXPERIENCE SECTION  ═══════════ */}
      <ExperienceSection />

      {/* ═══════════  2.5 INDUSTRIES WE SERVE SECTION  ═══════════ */}
      <IndustriesWeServe />

      {/* ═══════════  2.8 WHY CHOOSE US SECTION  ═══════════ */}
      <WhyChooseUs />

      {/* ═══════════  3. GLOBAL PRESENCE / EXPORT NETWORK  ═══════════ */}
      <GlobalPresence />

    </div>
  );
}

export default PremiumHome;
