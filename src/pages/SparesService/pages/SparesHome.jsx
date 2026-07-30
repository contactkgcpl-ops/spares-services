import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Award, ShieldCheck, Zap, Globe, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';

import spicesImg from '../../../assets/images/spices_processing_machine.png';
import powderImg from '../../../assets/images/powder_packaging_machine.png';
import dalMillImg from '../../../assets/images/ind_dal_mill.png';
import pharmaImg from '../../../assets/images/ind_pharma.png';
import beveragesImg from '../../../assets/images/ind_beverages.png';
import kevalGandhiImg from '../../../assets/images/keval-gandhi.jpg';

import { updateAboutPageSEO } from '../../../utils/seoHelper';

const carouselImages = [
  { img: spicesImg, title: 'Spices Grinding Machine & Pulverizer Plant' },
  { img: powderImg, title: 'Automatic Powder Packaging Machine' },
  { img: dalMillImg, title: 'Agro Grain & Dal Mill Processing Machinery' },
  { img: pharmaImg, title: 'Pharma & Herbal Fine Micronizing Mill' },
  { img: beveragesImg, title: 'Liquid & Paste Filling Bottling Plant' },
];

function SparesHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    updateAboutPageSEO();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div className="w-full bg-white text-slate-700 font-sans antialiased overflow-x-hidden">
      
      {/* 1. TOP TITLE BAR & BREADCRUMB (Matching Envitro Technomech Title Bar) */}
      <section className="bg-[#0B1527] text-white py-12 md:py-16 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-white mb-2">
              About Us
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/80 font-medium">
              Salvin Industries – Engineering Excellence & Innovation in Food Machinery
            </p>
          </div>
          
          {/* Breadcrumb */}
          <div className="text-xs font-semibold text-slate-400 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Link to="/spares-service/home" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-blue-400">About Us</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN OVERVIEW HEADING */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-2 block">
              SINCE 2008
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[2.35rem] font-extrabold text-[#0B1527] tracking-tight leading-tight">
              Engineering Excellence Guaranteed at Salvin Industries
            </h2>
          </motion.div>
        </div>
      </section>

      {/* 3. SLIDER & CONTENT SECTION (2-COL MATCHING ENVITRO TECHNOMECH) */}
      <section className="pb-14 md:pb-20 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Col: Image Carousel Slider */}
            <div className="lg:col-span-6 relative group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-xl border border-slate-200">
                <img
                  src={carouselImages[currentSlide].img}
                  alt={carouselImages[currentSlide].title}
                  className="w-full h-full object-contain p-4 transition-all duration-700"
                />
                
                {/* Overlay Caption */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5">
                  <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    {carouselImages[currentSlide].title}
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md text-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md text-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Col: Detailed Corporate Overview */}
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                <strong className="text-blue-600 font-bold">Salvin Industries</strong> is driven by innovation and manufactures top-class food processing, packaging, and industrial automation solutions. With 18+ years of experience in the food processing industry, we provide excellence in our machinery and systems. Our dedicated team of food technologists, mechanical engineers, and production experts handles everything from manufacturing to the delivery and commissioning of these machines to your doorstep.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                The food processing machinery delivered by us adheres to USFDA, FSSAI, MoFPI, PMFME, and ISO standards, ensuring maximum sanitary food safety and improving your industrial productivity. We specialize in spice grinding mills, masala pulverizers, automatic powder packaging machines, liquid filling bottling lines, and turnkey dal mill plants.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                We work to provide you best-in-class innovative solutions and help clients achieve high output performance without affecting machine safety. Adhering to core values including quality, responsibility, certifications, and reliability, we deliver highly efficient machines to customers across domestic and international markets.
              </p>

              <div className="pt-2">
                <Link
                  to="/spares-service/machineries"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-300"
                >
                  <span>Explore Machinery Line</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. 3 CIRCULAR PILLARS (INNOVATION, PRECISION, CLIENT COMMITMENT) */}
      <section className="py-12 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            
            {/* Pillar 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-emerald-500 bg-emerald-50 flex items-center justify-center mb-4">
                <span className="text-2xl font-black text-emerald-600">100%</span>
              </div>
              <h3 className="text-base font-extrabold text-[#0B1527] mb-1">Innovation</h3>
              <p className="text-xs text-slate-500 font-medium">Advanced SS 304 automated food technology</p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-blue-600 bg-blue-50 flex items-center justify-center mb-4">
                <span className="text-2xl font-black text-blue-600">100%</span>
              </div>
              <h3 className="text-base font-extrabold text-[#0B1527] mb-1">Precision</h3>
              <p className="text-xs text-slate-500 font-medium">Exact micron grinding fineness & dosing accuracy</p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-amber-500 bg-amber-50 flex items-center justify-center mb-4">
                <span className="text-2xl font-black text-amber-600">100%</span>
              </div>
              <h3 className="text-base font-extrabold text-[#0B1527] mb-1">Client Commitment</h3>
              <p className="text-xs text-slate-500 font-medium">End-to-end installation, trial & lifetime spares support</p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. OUR VISION & OUR MISSION BOXES (MATCHING ENVITRO TECHNOMECH CUSTOM-BOX) */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Our Vision */}
            <div className="bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1527] mb-4 pb-2 border-b border-slate-100 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span>Our Vision</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                Our vision is to become the leader of the food processing and packaging machine manufacturing industry worldwide. We innovate and manufacture high-quality food processing machines, spice pulverizers, powder packaging lines, liquid bottling plants, and turnkey dal mills for diverse industrial sectors.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Our equipment range includes machines for turmeric, chilli, coriander, mixed spices, powders, food granules, paste, sauces, dairy processing, juices, and agricultural crops. We exceed customer expectations and improve the sustainability and efficiency of the food processing industry.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-white p-8 lg:p-10 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1527] mb-4 pb-2 border-b border-slate-100 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#FF7A1A]" />
                <span>Our Mission</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
                Salvin Industries is on a mission to improve unparalleled service to our clients. We deliver superior SS 304 food-grade processing machines to customers worldwide. Our engineers utilize cutting-edge manufacturing technology to manufacture these machines and industrial turnkey plants.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                It improves our manufacturing processes and products while strictly adhering to FSSAI, USFDA, and ISO quality standards. We ensure minimal maintenance downtime, maximum production output, and dedicated technical support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. MANAGING DIRECTOR PROFILE */}
      <section className="py-14 md:py-18 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Image */}
            <div className="md:col-span-4">
              <div className="relative aspect-[3/4] max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <img src={kevalGandhiImg} alt="Er. Keval Gandhi" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-extrabold text-base">Er. Keval Gandhi</h4>
                  <p className="text-xs text-blue-200 font-semibold">Managing Director</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">MANAGEMENT LEADERSHIP</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1527]">
                Over 18 Years of Engineering Excellence
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Er. Keval Gandhi is the Founder and Managing Director of Salvin Industries. Under his vision, the company has transformed into a leading manufacturer and exporter of heavy spice grinding mills, pulverizers, powder packaging machines, liquid filling plants, dal mill machinery, and pneumatic automation spares serving domestic and global markets across 100+ countries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Industrial Food Machinery Consultant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Turnkey Spice & Dal Mill Plants</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>FSSAI & USFDA Machinery Standards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Global Export & Commissioning</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="py-12 bg-[#0B1527] text-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-5">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
            Have Any Questions About Our Food Processing Machinery?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Contact our engineering experts today for customized machinery quotations, plant layout planning, and technical consultation.
          </p>
          <div className="pt-2">
            <Link
              to="/spares-service/service"
              className="inline-flex items-center gap-2 bg-[#FF7A1A] hover:bg-[#e66a12] text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-lg transition-colors"
            >
              <span>Get A Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default SparesHome;
