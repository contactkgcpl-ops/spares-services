import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import spicesMachineImg from '../../../assets/images/spices_processing_machine.png';
import powderPackagingImg from '../../../assets/images/powder_packaging_machine.png';

const heroSlides = [
  {
    id: 1,
    title: 'Spices Grinding Machine',
    description: 'Salvin Industries is a leading manufacturer of Spices Grinding Machinery, Masala Grinding Machines, Spice Pulverizers, and complete Turnkey Spice Processing Plants. Our advanced solutions ensure hygienic processing, uniform grinding, high production efficiency, low maintenance, and reliable performance for processing turmeric, chilli, coriander, cumin, black pepper, and blended spices.',
    image: spicesMachineImg,
    alt: 'Spices Grinding Machine - Salvin Industries',
  },
  {
    id: 2,
    title: 'Powder Packaging Machine',
    description: 'Salvin Industries manufactures high-precision Automatic Powder Packaging Machines designed for seamless pouch filling, sealing, and automated packaging of spice powders, turmeric, chilli, flour, and fine powders. Built for high speed, accuracy, hygienic operation, and low downtime.',
    image: powderPackagingImg,
    alt: 'Powder Packaging Machine - Salvin Industries',
  },
];

export default function HeroSlider() {
  const swiperRef = useRef(null);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#EFF6FF] via-[#E2EBF8] to-[#DBEAFE] py-10 lg:py-16">
      {/* Subtle light background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />

      <h1 className="sr-only">Food Processing Machinery Manufacturer in India - KMG Machineries</h1>

      <div className="relative mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-16 xl:px-24">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={800}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          pagination={{ clickable: true }}
          className="hero-swiper-container w-full pb-8"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center py-2">
                
                {/* Left Side: Title & Description Paragraph */}
                <div className="lg:col-span-6 flex flex-col items-start z-10">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B1527] mb-3">
                    {slide.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
                    {slide.description}
                  </p>
                </div>

                {/* Right Side: Machine Image */}
                <div className="lg:col-span-6 flex justify-center lg:justify-end items-center">
                  <div className="w-full flex justify-center lg:justify-end">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="max-h-[420px] sm:max-h-[480px] lg:max-h-[540px] w-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]"
                    />
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-20">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-blue-600 border border-slate-200/80 shadow-md flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-20">
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-blue-600 border border-slate-200/80 shadow-md flex items-center justify-center backdrop-blur-md transition-all active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
