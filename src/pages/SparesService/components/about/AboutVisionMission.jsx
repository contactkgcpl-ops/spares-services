import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutVisionMission() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-b border-slate-200/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 border border-blue-200 mb-3 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Pillars</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1E4A] tracking-tight">
            Our Vision & Mission
          </h2>
        </div>

        {/* 2 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-blue-100">
                <Eye className="w-7 h-7" />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1E4A] mb-4">
                Our Vision
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6">
                Our vision is to become the global leader in the food processing machinery manufacturing industry. We continuously innovate and manufacture high-efficiency machinery for spice grinding, masala pulverizing, powder packaging, liquid filling, dal mills, and beverage processing.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Exceed customer expectations with high-output machinery</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Improve productivity and sustainability in food processing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Expand turnkey processing plants across 100+ countries</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>LEADERSHIP & INNOVATION</span>
              <span>EST. 2008</span>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF7A1A] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#FF7A1A] group-hover:text-white transition-all duration-300 border border-orange-100">
                <Target className="w-7 h-7" />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1E4A] mb-4">
                Our Mission
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6">
                Salvin Industries is on a mission to deliver unparalleled service and superior SS 304 food-grade processing machinery to customers worldwide. Our engineers utilize cutting-edge manufacturing technology to maintain rigorous quality standards.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A1A] shrink-0" />
                  <span>Strict adherence to FSSAI, USFDA, ISO & food safety norms</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A1A] shrink-0" />
                  <span>Precision engineering with minimal maintenance downtime</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7A1A] shrink-0" />
                  <span>End-to-end technical consultation & after-sales support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#FF7A1A]">
              <span>QUALITY & RELIABILITY</span>
              <span>18+ YEARS EXCELLENCE</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
