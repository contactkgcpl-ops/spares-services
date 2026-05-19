import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

export default function AboutCTA() {
  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F1E4A] to-blue-900 border border-blue-500/20 shadow-2xl shadow-blue-900/20"
        >
          {/* Glowing Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF7A1A] rounded-full blur-[80px] opacity-20"></div>
          
          <div className="relative z-10 p-8 md:p-12 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              Powering Industrial Automation <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#FF7A1A]">
                With Precision Engineering
              </span>
            </h2>
            <p className="text-blue-100/80 font-medium max-w-2xl mx-auto mb-6 text-[11.5px] md:text-[12.5px]">
              Connect with our team of technical experts to discover how our premium automation and mechanical components can revolutionize your manufacturing floor.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/spares-service/service" className="inline-flex items-center gap-2 bg-[#FF7A1A] hover:bg-[#e66a12] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.04] shadow-lg shadow-[#FF7A1A]/30 text-[11px] md:text-[12px]">
                <Mail className="w-4 h-4" />
                Get Quote
              </Link>
              <Link to="/spares-service/products" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.04] backdrop-blur-md text-[11px] md:text-[12px]">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
