import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ArrowRight, Wind, Cog, Cpu, Zap } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import images
import pneumaticImg from '../../../assets/images/Pneumatic.png';
import mechanicImg from '../../../assets/images/Mechanic.png';
import electronicImg from '../../../assets/images/Electronic.png';
import electricImg from '../../../assets/images/Electric.png';

const slides = [
  {
    id: 0,
    image: pneumaticImg,
    badge: 'PNEUMATIC',
    title: 'Precision Pneumatic Components',
    subtitle: 'Industrial cylinders, valves & automation systems designed for reliable performance.',
    icon: Wind,
  },
  {
    id: 1,
    image: mechanicImg,
    badge: 'MECHANICAL',
    title: 'Industrial Mechanical Solutions',
    subtitle: 'Heavy-duty industrial mechanical products built for long-term durability.',
    icon: Cog,
  },
  {
    id: 2,
    image: electronicImg,
    badge: 'ELECTRONIC',
    title: 'Smart Electronic Automation',
    subtitle: 'Advanced PLCs, relays & industrial electronic control systems.',
    icon: Cpu,
  },
  {
    id: 3,
    image: electricImg,
    badge: 'ELECTRIC',
    title: 'Advanced Electrical Systems',
    subtitle: 'Reliable MCBs, switches & electrical control components.',
    icon: Zap,
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleThumbClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 h-[65vh] md:h-[75vh] lg:h-[85vh]">
      {/* Main Swiper Slider */}
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1200}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full overflow-hidden">
            {/* Background Image with subtle zoom effect */}
            <div className="absolute inset-0 w-full h-full">
              <motion.img
                src={slide.image}
                alt={slide.title}
                initial={{ scale: 1 }}
                animate={{ scale: activeIndex === index ? 1.05 : 1 }}
                transition={{ duration: 6, ease: 'easeOut' }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* LIGHT premium overlay to maintain image brightness and detail while ensuring readability */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/30 to-transparent z-10"
              style={{
                mixBlendMode: 'multiply',
              }}
            />
            <div className="absolute inset-0 bg-slate-950/20 z-10" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Glassmorphic Grid Overlay & Content Layer */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-10 flex justify-between items-center">
          
          {/* LEFT SIDE: Dynamic Slide Information */}
          <div className="max-w-2xl text-left pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 md:gap-5"
              >
                {/* Dynamic Badge */}
                <div className="inline-flex">
                  <span 
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-white backdrop-blur-md border border-white/20"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,107,0,0.85) 0%, rgba(232,93,0,0.85) 100%)',
                      boxShadow: '0 4px 20px rgba(255,107,0,0.35)',
                    }}
                  >
                    {React.createElement(slides[activeIndex].icon, { className: 'w-4 h-4' })}
                    {slides[activeIndex].badge}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                  {slides[activeIndex].title}
                </h1>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-white/90 font-medium leading-relaxed max-w-xl drop-shadow-sm">
                  {slides[activeIndex].subtitle}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-2">
                  <Link
                    to="/spares-service/products"
                    className="inline-flex items-center gap-2 bg-[#ff6b00] hover:bg-[#e85d00] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#ff6b00]/25 text-sm md:text-base"
                  >
                    Explore Products
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/spares-service/service"
                    className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-sm md:text-base backdrop-blur-sm"
                  >
                    Get Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE: Interactive Thumbnail Preview Cards (Desktop/Tablet) */}
          <div className="hidden lg:flex flex-col gap-4 w-[260px] pointer-events-auto">
            {slides.map((slide, idx) => {
              const SlideIcon = slide.icon;
              const isActive = activeIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleThumbClick(idx)}
                  className={`group relative flex items-center gap-3.5 p-3 rounded-2xl text-left border transition-all duration-500 overflow-hidden ${
                    isActive
                      ? 'border-[#ff6b00]/70 bg-white/15 shadow-xl shadow-black/10 scale-105'
                      : 'border-white/10 bg-black/20 hover:bg-white/5 hover:border-white/20'
                  }`}
                  style={{
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Miniature Image & Icon Wrapper */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/20 shadow-inner">
                    <img src={slide.image} alt={slide.badge} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <SlideIcon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-[#ff6b00]' : 'text-white/80'}`} />
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="flex flex-col min-w-0">
                    <span className={`text-[10px] font-black tracking-widest ${isActive ? 'text-[#ff6b00]' : 'text-white/40'}`}>
                      {slide.badge}
                    </span>
                    <span className={`text-sm font-bold truncate transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/70'}`}>
                      {slide.badge.charAt(0) + slide.badge.slice(1).toLowerCase()}
                    </span>
                  </div>

                  {/* High-end interactive indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="thumbIndicator"
                      className="absolute right-0 top-0 bottom-0 w-[4px] bg-[#ff6b00]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Bottom Navigation UI & Autoplay Progress Indicator */}
      <div className="absolute bottom-6 left-6 md:left-10 lg:left-16 right-6 md:right-10 lg:right-16 z-30 flex justify-between items-center select-none">
        
        {/* Navigation Arrows & Counter */}
        <div className="flex items-center gap-3">
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/5 hover:bg-[#ff6b00] hover:border-[#ff6b00] hover:text-white text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-white/5 hover:bg-[#ff6b00] hover:border-[#ff6b00] hover:text-white text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Indicator Number */}
          <div className="hidden sm:flex items-center gap-1.5 ml-4 font-mono font-bold text-sm tracking-widest text-white/50 bg-black/25 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/5">
            <span className="text-white">0{activeIndex + 1}</span>
            <span>/</span>
            <span>04</span>
          </div>
        </div>

        {/* Dynamic Pagination Progress Bar (only on desktop/tablet) */}
        <div className="hidden md:flex items-center gap-2.5 w-[250px] bg-white/10 h-[3px] rounded-full overflow-hidden relative">
          <motion.div
            key={activeIndex}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: 'linear' }}
            className="h-full bg-[#ff6b00]"
          />
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex md:hidden items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleThumbClick(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6 bg-[#ff6b00]' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
