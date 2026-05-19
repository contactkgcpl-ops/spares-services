import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wind, Cog, Cpu, Zap } from 'lucide-react';
import showcasePneumatic from '../../assets/about/showcase_pneumatic.png';
import showcaseMechanical from '../../assets/about/showcase_mechanical.png';
// Fallback to fleet images if specific about assets are unavailable for the remaining two
import electronicFleetImg from '../../assets/categories/electronic_fleet.png';
import electricFleetImg from '../../assets/categories/electric_fleet.png';

const showcaseData = [
  {
    id: 'pneumatic',
    title: 'Pneumatic Systems',
    desc: 'High-pressure air systems, cylinders, and automation valves engineered for heavy mechanical operations.',
    icon: Wind,
    image: showcasePneumatic,
  },
  {
    id: 'mechanical',
    title: 'Mechanical Spares',
    desc: 'Heavy-duty alloy gears, bearings, and precision components designed to withstand extreme rotational stress.',
    icon: Cog,
    image: showcaseMechanical,
  },
  {
    id: 'electronic',
    title: 'Electronic Drives',
    desc: 'Intelligent VFDs, responsive PLCs, and touchscreen interface systems for modern automated plants.',
    icon: Cpu,
    image: electronicFleetImg,
  },
  {
    id: 'electric',
    title: 'Electrical Components',
    desc: 'Premium switchgears, overload relays, and industrial power routing panels ensuring factory safety.',
    icon: Zap,
    image: electricFleetImg,
  }
];

export default function AboutShowcase() {
  const [activeTab, setActiveTab] = useState(showcaseData[0].id);
  const activeContent = showcaseData.find(item => item.id === activeTab);

  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-8 md:mb-10">
          <h2 className="text-[#FF7A1A] text-xs font-bold tracking-[0.15em] uppercase mb-3">Core Domains</h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-extrabold text-[#0F1E4A] leading-tight">
            Industrial Expertise
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* Interactive Tabs Menu */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 justify-between h-full">
            {showcaseData.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex items-center gap-4 p-4 md:p-5 rounded-2xl text-left border-2 transition-all duration-300 overflow-hidden flex-1 transform hover:-translate-y-0.5 ${
                  activeTab === item.id
                    ? 'border-blue-600 bg-gradient-to-r from-blue-50/60 to-white shadow-lg shadow-blue-600/10 z-10'
                    : 'border-slate-200 bg-slate-50/40 hover:border-blue-400 hover:bg-white hover:shadow-md hover:shadow-blue-500/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  activeTab === item.id ? 'bg-blue-600' : 'bg-[#EEF2F7] group-hover:bg-blue-100'
                }`}>
                  <item.icon className={`w-4 h-4 transition-colors duration-300 ${
                    activeTab === item.id ? 'text-white' : 'text-[#0F1E4A] group-hover:text-blue-600'
                  }`} />
                </div>
                
                <div>
                  <h4 className={`text-[14px] md:text-[15px] font-bold transition-colors duration-300 ${
                    activeTab === item.id ? 'text-blue-700' : 'text-[#0F1E4A]'
                  }`}>
                    {item.title}
                  </h4>
                </div>

                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeShowcase"
                    className="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Image & Content Area */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-xl group min-h-[400px] lg:h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <img 
                  src={activeContent.image} 
                  alt={activeContent.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E4A]/90 via-[#0F1E4A]/30 to-transparent" />
                
                {/* Overlay Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-3">
                      <activeContent.icon className="w-3.5 h-3.5 text-[#FF7A1A]" />
                      <span className="text-[10px] font-bold tracking-wider text-white uppercase">Premium Supply</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2.5">
                      {activeContent.title}
                    </h3>
                    <p className="text-blue-50 text-[11.5px] md:text-[12.5px] max-w-xl font-medium leading-relaxed mb-4">
                      {activeContent.desc}
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 text-[#FF7A1A] font-bold hover:text-white transition-colors">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
