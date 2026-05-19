import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Cpu, Factory } from 'lucide-react';

const workflowSteps = [
  { id: 1, title: 'System Analysis', desc: 'Evaluating industrial requirements.', icon: Search },
  { id: 2, title: 'Precision Engineering', desc: 'Custom mechanical modeling.', icon: PenTool },
  { id: 3, title: 'Component Integration', desc: 'Seamless system connection.', icon: Cpu },
  { id: 4, title: 'Industrial Deployment', desc: 'Live operational launch.', icon: Factory },
];

export default function AboutWorkflow() {
  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="text-[#FF7A1A] text-xs font-bold tracking-[0.15em] uppercase mb-3">Engineering Process</h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-extrabold text-[#0F1E4A] leading-tight mb-3">
            Industrial Workflow
          </h3>
          <p className="text-[11.5px] md:text-[12.5px] text-slate-600 font-medium leading-relaxed">
            Our systematic approach ensures that every automation component and mechanical spare is precision-engineered and integrated flawlessly into your existing systems.
          </p>
        </div>

        {/* Workflow Diagram */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-slate-200">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-blue-600"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {workflowSteps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group flex flex-col items-center text-center"
              >
                {/* Node Icon */}
                <div className="w-[100px] h-[100px] rounded-full bg-white border-[6px] border-[#EEF2F7] flex items-center justify-center shadow-lg group-hover:border-blue-100 transition-colors duration-500 relative mb-5">
                  <div className="absolute inset-2 rounded-full bg-slate-50 group-hover:bg-blue-600 transition-colors duration-500 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-[#FF7A1A] rounded-full text-white font-bold flex items-center justify-center text-xs shadow-md">
                    {step.id}
                  </div>
                </div>

                <h4 className="text-base font-bold text-[#0F1E4A] mb-1">{step.title}</h4>
                <p className="text-[11px] md:text-[11.5px] text-slate-500 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
