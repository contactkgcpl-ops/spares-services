import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ExperienceSection() {
  return (
    <section className="bg-white py-6 lg:py-10 border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* LEFT PART: 18 Years Concentric Circle Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative flex items-center justify-center">
              {/* Outer Subtle Grey Ring */}
              <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full border-2 border-slate-200/80 absolute transform -translate-x-1.5 translate-y-1.5 pointer-events-none" />
              
              {/* Main Blue Concentric Ring */}
              <div className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full border-[3px] border-blue-600 bg-white flex flex-col items-center justify-center shadow-xl shadow-blue-500/10 transition-transform duration-500 hover:scale-105">
                <span className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight text-blue-600 leading-none select-none">
                  18
                </span>
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-500 mt-2">
                  Years of Excellence
                </span>
              </div>

              {/* Decorative Accent Glow */}
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-2xl -z-10 pointer-events-none" />
            </div>
          </motion.div>

          {/* RIGHT PART: Years of Experience Text & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1527] tracking-tight leading-tight mb-3">
              Years Of Experience
            </h2>

            {/* Paragraph Text */}
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mb-5 max-w-2xl text-justify sm:text-left">
              Welcome to <strong className="text-slate-900 font-bold">Salvin Industries</strong> – Your trusted manufacturer and supplier of comprehensive industrial machinery, food processing plants, pneumatic components, and factory automation solutions. With over <strong className="text-blue-600 font-extrabold">18 years</strong> of technical excellence, engineering innovation, and industry leadership, we specialize not only in <span className="font-semibold text-slate-800">Spices & Masala Grinding Machinery</span>, but also provide complete turnkey solutions for <span className="font-semibold text-slate-800">Powder Processing & Packaging Machines</span>, <span className="font-semibold text-slate-800">Liquid Filling & Liquid Processing Equipment</span>, and <span className="font-semibold text-slate-800">Pulses & Grain Milling Plants (Dal Mill Machinery)</span>. Our extensive product range includes <span className="font-semibold text-slate-800">Spice Pulverizers</span>, <span className="font-semibold text-slate-800">Hammer Mills</span>, <span className="font-semibold text-slate-800">Pin Mills</span>, <span className="font-semibold text-slate-800">Ribbon Blenders</span>, <span className="font-semibold text-slate-800">Vibro Sifters</span>, <span className="font-semibold text-slate-800">Liquid Paste Filling Machines</span>, <span className="font-semibold text-slate-800">Granule & Powder Packaging Machines</span>, <span className="font-semibold text-slate-800">Bucket Elevators</span>, and <span className="font-semibold text-slate-800">Screw Conveyors</span>. Engineered for high-capacity production, uniform quality, hygienic operation, and low maintenance, Salvin Industries serves both domestic and international markets with reliable, customized machinery tailored for food, agri-processing, chemical, and industrial sectors worldwide.
            </p>

            {/* CTA Button in Salvin Blue Theme */}
            <Link
              to="/spares-service/about"
              className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Know More</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
