import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Settings, Award, Headphones, Shield, Activity } from 'lucide-react';

const features = [
  { title: 'Industrial Expertise', desc: 'Over a decade of specialized industrial supply experience.', icon: Settings },
  { title: 'Reliable Components', desc: 'Sourced from the best manufacturers globally.', icon: ShieldCheck },
  { title: 'Precision Engineering', desc: 'Exact tolerances for critical automation tasks.', icon: Activity },
  { title: 'Technical Support', desc: '24/7 engineering assistance for seamless operation.', icon: Headphones },
  { title: 'Quality Assurance', desc: '100% verified genuine parts and systems.', icon: Award },
  { title: 'Performance Reliability', desc: 'Built for extreme industrial environments.', icon: Shield },
];

export default function AboutFeatures() {
  return (
    <section className="py-16 md:py-20 bg-[#EEF2F7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="text-[#FF7A1A] text-xs font-bold tracking-[0.15em] uppercase mb-3">Our Strengths</h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-extrabold text-[#0F1E4A] leading-tight">
            Why Industries Trust Us
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Glow Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-[40px] group-hover:bg-blue-100 transition-colors duration-500 -mr-10 -mt-10" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-5 border border-slate-100 group-hover:scale-110 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all duration-500">
                  <feature.icon className="w-6 h-6 text-[#FF7A1A] group-hover:text-blue-600 transition-colors duration-500" />
                </div>
                
                <h4 className="text-[15px] md:text-base font-bold text-[#0F1E4A] mb-1.5 group-hover:text-blue-700 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-[11.5px] md:text-[12.5px] text-slate-500 font-medium leading-relaxed flex-grow">
                  {feature.desc}
                </p>
              </div>

              {/* Subtle gradient border effect on hover (placed at card root for proper spacing) */}
              <div className="absolute bottom-0 left-0 h-[4px] w-0 bg-gradient-to-r from-blue-500 to-[#FF7A1A] group-hover:w-full transition-all duration-700 ease-out" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
