import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wind, Cog, Cpu, Zap, Settings, ShieldCheck, Activity, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

import pneumaticFleetImg from '../assets/categories/pneumatic_fleet.png';
import mechanicalFleetImg from '../assets/categories/mechanical_fleet.png';
import electronicFleetImg from '../assets/categories/electronic_fleet.png';
import electricFleetImg from '../assets/categories/electric_fleet.png';

const solutionData = [
  {
    id: 'pneumatic',
    title: 'Pneumatic Systems',
    tag: '01 / 04',
    icon: Wind,
    image: pneumaticFleetImg,
    productImage: pneumaticFleetImg,
    linkVal: 'Pneumatic',
    desc: 'High-performance control valves, air preparation modules, and cylinders designed to power industrial automation lines.',
    features: [
      'Industrial Grade Reliability',
      'Precision Engineered Components',
      'Long Operational Life',
      'High Performance Systems',
      'Low Maintenance Design'
    ]
  },
  {
    id: 'mechanic',
    title: 'Mechanical Spares',
    tag: '02 / 04',
    icon: Cog,
    image: mechanicalFleetImg,
    productImage: mechanicalFleetImg,
    linkVal: 'Mechanical',
    desc: 'Heavy-duty alloy gearboxes, bearings, couplings, and power transmission shafts designed for extreme operational stress.',
    features: [
      'Industrial Grade Reliability',
      'Precision Engineered Components',
      'Long Operational Life',
      'High Performance Systems',
      'Low Maintenance Design'
    ]
  },
  {
    id: 'electronic',
    title: 'Electronic Drives',
    desc: 'Intelligent controllers, variable frequency drives, responsive PLCs, and touchscreen operator interface HMI systems.',
    tag: '03 / 04',
    icon: Cpu,
    image: electronicFleetImg,
    productImage: electronicFleetImg,
    linkVal: 'Electronic',
    features: [
      'Industrial Grade Reliability',
      'Precision Engineered Components',
      'Long Operational Life',
      'High Performance Systems',
      'Low Maintenance Design'
    ]
  },
  {
    id: 'electric',
    title: 'Electrical Parts',
    desc: 'Premium electromagnetic switchgears, thermal overload relays, industrial cabling, and safe power routing panels.',
    tag: '04 / 04',
    icon: Zap,
    image: electricFleetImg,
    productImage: electricFleetImg,
    linkVal: 'Electric',
    features: [
      'Industrial Grade Reliability',
      'Precision Engineered Components',
      'Long Operational Life',
      'High Performance Systems',
      'Low Maintenance Design'
    ]
  }
];

const featureIcons = [Settings, ShieldCheck, Activity, CheckCircle2, ShieldCheck];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

export default function OurFleet() {
  const [activeId, setActiveId] = useState(solutionData[0].id);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Mouse Drag functionality for horizontal scrolling
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftStart.current = sliderRef.current.scrollLeft;
    setIsHovered(true); // pause auto slide on drag
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    isDown.current = false;
    setIsHovered(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed coefficient
    sliderRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  // Auto-sliding interval (5 seconds)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveId(prev => {
        const currentIndex = solutionData.findIndex(item => item.id === prev);
        const nextIndex = (currentIndex + 1) % solutionData.length;
        return solutionData[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Center active card in scroll container
  useEffect(() => {
    const activeElement = sliderRef.current?.querySelector('[data-active="true"]');
    if (activeElement && sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      const elementWidth = activeElement.clientWidth;
      const elementOffset = activeElement.offsetLeft;
      sliderRef.current.scrollTo({
        left: elementOffset - containerWidth / 2 + elementWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeId]);

  const activeData = solutionData.find(item => item.id === activeId);

  const handlePrev = () => {
    setIsHovered(true);
    const currentIndex = solutionData.findIndex(item => item.id === activeId);
    const prevIndex = (currentIndex - 1 + solutionData.length) % solutionData.length;
    setActiveId(solutionData[prevIndex].id);
    setTimeout(() => setIsHovered(false), 2000);
  };

  const handleNext = () => {
    setIsHovered(true);
    const currentIndex = solutionData.findIndex(item => item.id === activeId);
    const nextIndex = (currentIndex + 1) % solutionData.length;
    setActiveId(solutionData[nextIndex].id);
    setTimeout(() => setIsHovered(false), 2000);
  };

  return (
    <section className="py-10 md:py-12 px-6 md:px-8 lg:px-12 relative bg-white overflow-hidden border-t border-gray-100">
      
      {/* Decorative background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto relative z-10 flex flex-col gap-8">
        
        {/* COMPACT CENTER-ALIGNED HEADER */}
        <motion.div 
          variants={fadeUp} 
          custom={0} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          className="mb-4 max-w-2xl mx-auto text-center flex flex-col items-center"
        >
          {/* Small Top Centered Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm w-fit">
            <span className="w-1.2 h-1.2 rounded-full bg-blue-600 animate-pulse" />
            <span>Our Fleet</span>
          </div>
          
          {/* Large Centered Heading */}
          <h2 className="text-[1.85rem] md:text-[2.15rem] font-extrabold tracking-tight leading-[1.15] mb-3 max-w-xl">
            <span className="text-[#0B1527]">Precision Spares</span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Powering Automation</span>
          </h2>
        </motion.div>

        {/* WIDE INTERACTIVE ACCORDION SLIDER */}
        <div 
          className="w-full flex flex-row h-[320px] md:h-[350px] gap-3 lg:gap-4 overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing snap-x snap-mandatory pb-2 select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
        >
          {solutionData.map((item) => {
            const isActive = activeId === item.id;
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.id}
                layout
                data-active={isActive}
                onClick={() => setActiveId(item.id)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 snap-center ${
                  isActive 
                    ? 'w-[280px] sm:w-[320px] lg:w-[380px] lg:flex-grow-[3] shadow-[0_15px_30px_rgba(59,130,246,0.12)] border border-blue-500/40 z-10' 
                    : 'w-[85px] sm:w-[100px] lg:w-auto lg:flex-grow-[1] border border-gray-100 opacity-60 hover:opacity-100 hover:border-blue-500/20 z-0'
                }`}
              >
                {/* Card Background image and gradients */}
                <div className="absolute inset-0 bg-[#0A1326] pointer-events-none">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-110 grayscale-[20%]'}`}
                    draggable="false"
                  />
                  <div className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive 
                      ? 'bg-gradient-to-t from-black/95 via-black/45 to-transparent' 
                      : 'bg-gradient-to-t from-black/90 via-black/60 to-black/35'
                  }`} />
                </div>

                {/* Top / Bottom details overlay */}
                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-10 pointer-events-none">
                  
                  {/* Top row: Icon circle and indicator */}
                  <div className={`flex items-start ${isActive ? 'justify-between' : 'justify-center'}`}>
                    <div className={`rounded-2xl flex items-center justify-center backdrop-blur-md transition-all duration-500 ${
                      isActive ? 'w-9 h-9 bg-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.3)]' : 'w-8 h-8 bg-white/10 border border-white/20'
                    }`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-black tracking-widest bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                      >
                        {item.tag}
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom row: Heading placement */}
                  <div className={`transition-all duration-500 flex ${isActive ? 'items-end pb-2' : 'items-center justify-center h-full pb-4'}`}>
                    <h3 className={`font-bold whitespace-nowrap transition-all duration-500 ${
                      isActive 
                        ? 'text-white text-[16px] lg:text-lg leading-tight tracking-tight shadow-sm' 
                        : 'text-gray-200 text-[13px] -rotate-90 origin-center absolute bottom-20 tracking-wider font-bold'
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* COMPACT CENTERED CONTROLS ROW */}
        <div className="flex items-center justify-center gap-4 mt-1 mb-1">
          <button 
            onClick={() => navigate('/spares-service/products')}
            className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#0B1527] px-7 py-3 text-[13.5px] font-bold text-white shadow-[0_4px_16px_rgba(11,21,39,0.12)] transition-all hover:bg-blue-600 w-fit flex-shrink-0"
          >
            <span className="relative z-10">Explore All Products</span>
            <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
          </button>
          
          {/* SLIDER NAVIGATION CHEVRONS */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrev}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#0B1527] hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition-all shadow-sm hover:scale-105"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#0B1527] hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition-all shadow-sm hover:scale-105"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* ROW 3: COMPACT EQUALIZED ACTIVE CONTENT DISPLAY AREA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgba(30,42,74,0.03)] p-5 md:p-6 lg:p-7 flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-[1000px] mx-auto w-full relative overflow-hidden"
          >
            {/* Clickable preview image triggering redirect - Balanced 1/2 Column */}
            <div 
              onClick={() => navigate(`/spares-service/products?category=${encodeURIComponent(activeData.linkVal)}`)}
              className="w-full lg:w-1/2 rounded-2.5xl overflow-hidden relative border border-gray-100 bg-[#0A1326] aspect-[4/3] group shadow-sm shrink-0 cursor-pointer flex items-center justify-center self-center"
            >
              <img 
                src={activeData.productImage} 
                alt={activeData.title}
                className="w-full h-full object-cover group-hover:scale-106 transition-all duration-[1s] ease-[cubic-bezier(0.25,1,0.5,1)]" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent pointer-events-none" />
              
              {/* status indicator */}
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-[#0B1527] border border-gray-100 text-[8px] font-black tracking-widest uppercase shadow-sm">
                <span className="w-1 h-1 rounded-full bg-blue-600 animate-pulse" />
                Active Category
              </div>
            </div>

            {/* Content details on the right - Balanced 1/2 Column */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center py-0.5">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-black tracking-widest uppercase">
                  Technical Specifications
                </span>
                <span className="text-gray-400 font-extrabold tracking-widest text-[10px]">
                  {activeData.tag}
                </span>
              </div>

              <h3 className="text-lg lg:text-xl font-extrabold text-[#0B1527] mb-2.5 tracking-tight leading-tight">
                {activeData.title}
              </h3>
              
              <p className="text-[#536488] text-[13px] leading-relaxed font-semibold mb-4 max-w-md">
                {activeData.desc}
              </p>

              {/* Specifications points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-1">
                {activeData.features.map((feature, idx) => {
                  const Icon = featureIcons[idx % featureIcons.length];
                  return (
                    <motion.div 
                      key={`${activeId}-spec-${idx}`}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.06 * idx, ease: "easeOut" }}
                      onClick={() => navigate(`/spares-service/products?category=${encodeURIComponent(activeData.linkVal)}`)}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <div className="w-6.5 h-6.5 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                        <Icon className="w-3 h-3 text-blue-600 group-hover:text-white" />
                      </div>
                      <span className="text-[12.5px] font-bold text-[#536488] leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {feature}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
