import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wind, Cog, Cpu, Zap, ArrowRight } from 'lucide-react';

import pneumaticImg from '../assets/categories/pneumatic.png';
import mechanicalImg from '../assets/categories/mechanical.png';
import electronicImg from '../assets/categories/electronic.png';
import electricImg from '../assets/categories/electric.png';

const categories = [
  {
    id: 'pneumatic',
    title: 'Pneumatic Systems',
    desc: 'High-performance control valves, cylinders, and air preparation units.',
    icon: Wind,
    image: pneumaticImg,
    linkVal: 'Pneumatic'
  },
  {
    id: 'mechanic',
    title: 'Mechanical Spares',
    desc: 'Durable gearboxes, high-torque couplings, and precision bearings.',
    icon: Cog,
    image: mechanicalImg,
    linkVal: 'Mechanical'
  },
  {
    id: 'electronic',
    title: 'Electronic Drives',
    desc: 'Precision VFD controllers, PLCs, and touch HMI interfaces.',
    icon: Cpu,
    image: electronicImg,
    linkVal: 'Electronic'
  },
  {
    id: 'electric',
    title: 'Electrical Parts',
    desc: 'Industrial heavy-duty contactors, thermal relays, and switchgears.',
    icon: Zap,
    image: electricImg,
    linkVal: 'Electric'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

export default function PremiumCategories() {
  const navigate = useNavigate();

  return (
    <section className="py-10 md:py-12 px-6 md:px-8 lg:px-12 relative bg-[#EEF2F7] overflow-hidden">
      
      {/* Floating particles/background flares */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="max-w-[1500px] mx-auto relative z-10">
        
        {/* COMPACT CENTER-ALIGNED HEADER */}
        <motion.div 
          variants={fadeUp} 
          custom={0} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          className="mb-8 max-w-2xl mx-auto text-center flex flex-col items-center"
        >
          {/* Small Top Centered Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-3 bg-white/90 rounded-full border border-gray-100/80 shadow-sm w-fit">
            <span className="w-1.2 h-1.2 rounded-full bg-blue-600 animate-ping" />
            <span>Our Categories</span>
          </div>
          
          {/* Large Centered Heading with blue gradient last word */}
          <h2 className="text-[1.85rem] md:text-[2.15rem] font-extrabold text-[#0B1527] tracking-tight leading-[1.12] max-w-lg">
            Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Products</span>
          </h2>
        </motion.div>

        {/* 4-COLUMN CARDS GRID WITH DYNAMIC INTERACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            
            return (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                custom={idx * 0.1 + 0.1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                onClick={() => navigate(`/spares-service/products?category=${encodeURIComponent(cat.linkVal)}`)}
                className="group relative bg-white rounded-[2rem] p-4 shadow-[0_10px_30px_rgba(30,42,74,0.02)] border border-gray-100/70 hover:border-blue-500/50 hover:shadow-[0_20px_45px_rgba(37,99,235,0.12)] transition-all duration-500 cursor-pointer flex flex-col hover:-translate-y-2.5 overflow-hidden"
              >
                {/* Image Area with hover zoom */}
                <div className="relative w-full aspect-[4/3.3] rounded-[1.4rem] overflow-hidden bg-gray-50 mb-4">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  
                  {/* Dark gradient overlay over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-85 duration-500" />
                  
                  {/* Floating Icon inside Image Area */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-2xl bg-white/95 border border-gray-100 flex items-center justify-center shadow-md group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all duration-500">
                    <Icon className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="px-1 pb-1 flex flex-col flex-grow">
                  {/* Card Title */}
                  <h3 className="text-[1.05rem] font-bold text-[#0B1527] mb-1.5 group-hover:text-blue-600 transition-colors tracking-tight">
                    {cat.title}
                  </h3>
                  
                  {/* Card Description */}
                  <p className="text-[12.5px] text-[#64748B] leading-relaxed font-semibold mb-4 flex-grow line-clamp-2">
                    {cat.desc}
                  </p>
                  
                  {/* Interactive CTA View Button */}
                  <div className="mt-auto flex items-center gap-2 pt-3 border-t border-gray-100">
                    <span className="text-[11px] font-bold text-blue-600 group-hover:text-blue-700 transition-colors uppercase tracking-wider">
                      Explore Products
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Animated Bottom Border Glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-full scale-x-0 group-hover:scale-x-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  );
}
