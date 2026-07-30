import React from 'react';
import { motion } from 'framer-motion';

const chooseFeatures = [
  {
    step: '01',
    title: 'Industry expertise',
    text: 'We have 18+ years of experience in serving the food industry with quality machinery.',
  },
  {
    step: '02',
    title: 'Customization',
    text: 'Our SS 304 machines fit perfect with your production requirements.',
  },
  {
    step: '03',
    title: 'Innovation',
    text: 'Our manufacturers use the latest technologies to manufacture machines and ensure that industry operations remain up to date.',
  },
  {
    step: '04',
    title: 'Customer support',
    text: 'We offer full support from installation to maintenance, ensuring your machines run smoothly and efficiently in your industrial unit.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-12 lg:py-16 border-t border-slate-100 overflow-hidden font-sans">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-16">
        
        {/* Header Section (2-Column Layout matching reference image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center mb-12">
          
          {/* Left Title */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold text-[#1E293B] tracking-tight leading-tight">
              Why choose our Food Processing Machine Suppliers
            </h2>
          </div>

          {/* Right Subtitle */}
          <div className="lg:col-span-5">
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              When you partner with us, you not only get the quality machines but also contribute to your business success. Here's why you should choose us
            </p>
          </div>

        </div>

        {/* 4 Overlapping Circular Cards Row matching exact reference screenshot with Salvin Brand Color Badges */}
        <div className="flex flex-col lg:flex-row items-center justify-center -space-y-4 lg:space-y-0 lg:-space-x-6 xl:-space-x-8 max-w-6xl mx-auto my-10">
          {chooseFeatures.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative w-64 h-64 sm:w-68 sm:h-68 lg:w-72 lg:h-72 rounded-full border border-slate-200/90 bg-white flex flex-col items-center justify-center text-center p-6 shrink-0 shadow-sm hover:shadow-lg hover:border-blue-300 hover:z-20 transition-all duration-300 group"
            >
              {/* Salvin Blue Brand Number Badge Pill on Top Left matching screenshot */}
              <div className="absolute top-4 left-6 sm:left-8 bg-blue-600 group-hover:bg-blue-700 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm transition-colors">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-[#1E293B] mb-2.5 mt-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>

              {/* Text */}
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Paragraph Summary matching reference image */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto text-center text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mt-10 pt-4"
        >
          <p>
            We work closely with our clients and work according to their industry requirements. As the food processing machines manufacturer in India, we work to shape the future of industry by fostering collaboration and partnerships with our clients. We aim to drive innovation and enhance efficiency in the food processing industry. We are dedicated to providing you with quality machines and the best customer service, and keeping the food processing industries ahead of the competition.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
