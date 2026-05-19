import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Factory, Award } from 'lucide-react';

const stats = [
  { id: 1, number: '500+', label: 'Industrial Projects', icon: Factory },
  { id: 2, number: '98%', label: 'Client Satisfaction', icon: Users },
  { id: 3, number: '24/7', label: 'Technical Support', icon: Target },
  { id: 4, number: '1000+', label: 'Components Delivered', icon: Award },
];

export default function AboutStats() {
  return (
    <section className="py-8 bg-[#0F1E4A] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF7A1A] rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center text-center p-3.5 md:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors duration-300"
            >
              <stat.icon className="w-5 h-5 text-[#FF7A1A] mb-1.5" />
              <div className="text-xl md:text-2xl font-extrabold text-white mb-0.5 tracking-tight">
                {stat.number}
              </div>
              <div className="text-[9px] md:text-[10px] font-bold text-blue-200 uppercase tracking-[0.1em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
