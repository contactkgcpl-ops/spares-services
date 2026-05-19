import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity } from 'lucide-react';
import heroBg from '../../assets/about/hero_bg.png';

export default function AboutHero() {
  return (
    <section className="relative w-full bg-[#0F1E4A] pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF7A1A]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 md:space-y-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF7A1A] animate-pulse" />
              <span className="text-[9px] font-bold tracking-widest text-white uppercase">Salvin Industries Overview</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] font-extrabold text-white leading-tight tracking-tight">
              Engineering Precision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                For Modern Automation
              </span>
            </h1>

            <p className="text-[12.5px] md:text-[13.5px] text-blue-100/80 font-medium max-w-lg leading-relaxed">
              Professional industrial automation solutions, precision engineering spares, and reliable control systems designed for modern manufacturing industries worldwide.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/spares-service/products" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 md:px-6 md:py-3 rounded-[14px] font-bold transition-all duration-300 transform hover:scale-[1.04] shadow-lg shadow-blue-600/30 text-[11.5px] md:text-[12.5px]">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/spares-service/service" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-6 py-2.5 md:px-6 md:py-3 rounded-[14px] font-bold transition-all duration-300 transform hover:scale-[1.04] backdrop-blur-sm text-[11.5px] md:text-[12.5px]">
                Contact Experts
              </Link>
            </div>
          </motion.div>

          {/* Right Image Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] bg-slate-800">
              <img
                src={heroBg}
                alt="Industrial Automation"
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E4A] via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Stat Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -bottom-8 -left-8 md:-left-12 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-black text-white leading-none">99.9%</div>
                <div className="text-xs font-bold text-blue-200 uppercase tracking-wider mt-1">System Uptime</div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
