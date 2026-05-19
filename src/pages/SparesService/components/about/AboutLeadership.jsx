import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Building2, FlaskConical } from 'lucide-react';
import kevalGandhiImg from '../../../../assets/images/keval-gandhi.jpg';

export default function AboutLeadership() {
  const highlights = [
    {
      icon: User,
      title: 'Industrial Consultant',
      desc: 'He provides expert consulting for the food and pharmaceutical industries, specializing in production planning, control, and process optimization.',
    },
    {
      icon: Building2,
      title: 'Founder of Salvin Industries',
      desc: 'He established Salvin Industries, which offers complete, sustainable, and high-output industrial solutions for startups and large corporates alike.',
    },
    {
      icon: FlaskConical,
      title: 'Lead at Salvin Pharma',
      desc: 'He is also associated with Salvin Pharma and Packaging Industries, which deals in organic spices, chocolates, and automatic packaging plants.',
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        {/* Symmetrical Grid - Exactly Matches Reference Layout */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDE: Portrait Image Card with Bottom-Left Floating Badge */}
          <div className="md:col-span-5 relative">
            <div className="relative w-full max-w-[370px] mx-auto md:mx-0 aspect-[1/1.1] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
              <img 
                src={kevalGandhiImg} 
                alt="Er. Keval Gandhi" 
                className="w-full h-full object-cover object-top"
              />
              {/* Subtle bottom gradient to enrich image separation */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Info Badge - Exactly Bottom-Left as in Reference */}
            <div className="absolute bottom-6 -left-4 p-3.5 pr-6 rounded-xl bg-white border border-slate-100 shadow-xl shadow-slate-900/5 backdrop-blur-md flex items-center gap-3 z-20">
              <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-extrabold text-[#0F1E4A] tracking-wide leading-tight">
                  Er. Keval Gandhi
                </h4>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Narrative, Section Underline, Roles & Full-Width Button */}
          <div className="md:col-span-7 flex flex-col justify-start">
            
            {/* Title & Orange Accent Bar */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-[#0F1E4A] leading-tight mb-2">
                Managing Director
              </h2>
              {/* Orange Accent Bar Underline */}
              <div className="w-14 h-[3.5px] bg-[#FF7A1A] rounded-full" />
            </div>

            {/* Short Professional Narrative */}
            <p className="text-[12.5px] text-slate-600 font-semibold leading-relaxed mb-6">
              Keval Gandhi is the Founder and Managing Director of Salvin Industries, a leading engineering and consulting firm based in Ahmedabad, Gujarat. Under his leadership since 2008, the company has grown into a global provider of turnkey plant solutions and industrial consulting.
            </p>

            {/* Sub-Header */}
            <h3 className="text-[13px] font-extrabold text-[#0F1E4A] tracking-wider uppercase mb-5">
              Professional Roles & Expertise
            </h3>

            {/* Compact Roles List */}
            <div className="flex flex-col gap-5.5 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  {/* Left Column Blue Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  {/* Title & Description */}
                  <div className="flex flex-col">
                    <h4 className="text-[13px] font-extrabold text-[#0F1E4A] leading-snug mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Outline Button - Spans full width of the right column exactly as in the reference */}
            <div className="w-full">
              <Link 
                to="/spares-service/service" 
                className="flex items-center justify-center w-full border border-blue-600 hover:bg-blue-600/5 text-blue-600 py-3.5 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.01] text-[12.5px] tracking-wide shadow-sm"
              >
                For More Info..
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
