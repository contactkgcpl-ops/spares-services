import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import indSpices from '../../../assets/images/ind_spices.png';
import indPowder from '../../../assets/images/ind_powder.png';
import indDalMill from '../../../assets/images/ind_dal_mill.png';
import indPharma from '../../../assets/images/ind_pharma.png';
import indBeverages from '../../../assets/images/ind_beverages.png';
import indDairy from '../../../assets/images/ind_dairy.png';
import indBakery from '../../../assets/images/ind_bakery.png';
import indSnacks from '../../../assets/images/ind_snacks.png';
import indChemical from '../../../assets/images/ind_chemical.png';
import indSpares from '../../../assets/images/ind_spares.png';

const industries = [
  {
    id: 1,
    title: 'Spices & Condiments',
    description: 'Complete pulverizing, micro-grinding, batch roasting, and blending plants for chilli, turmeric, coriander & spices.',
    image: indSpices,
  },
  {
    id: 2,
    title: 'Powder Packaging',
    description: 'High-speed automatic powder packaging, pouch filling, auger dosing, and automated sealing machinery.',
    image: indPowder,
  },
  {
    id: 3,
    title: 'Agro & Dal Mills',
    description: 'Turnkey dal mill plants, grain cleaning, destoning, vibratory sifting, and grain sorting machinery lines.',
    image: indDalMill,
  },
  {
    id: 4,
    title: 'Pharma & Herbal',
    description: 'Hygienic stainless-steel fine grinding pulverizers, vibro sifters, and herbal powder processing systems.',
    image: indPharma,
  },
  {
    id: 5,
    title: 'Beverages & Bottling',
    description: 'Precision liquid filling machines, paste dosing equipment, mixing tanks, and bottling line automation.',
    image: indBeverages,
  },
  {
    id: 6,
    title: 'Dairy & Milk Processing',
    description: 'Industrial pasteurization plants, milk processing tanks, homogenization, and liquid dairy machinery.',
    image: indDairy,
  },
  {
    id: 7,
    title: 'Bakery & Confectionery',
    description: 'Industrial dough mixers, biscuit forming machinery, ovens, and automated bakery processing lines.',
    image: indBakery,
  },
  {
    id: 8,
    title: 'Snacks & Namkeen',
    description: 'Continuous automatic snack fryers, seasoning drums, extrusion, and potato chip processing machines.',
    image: indSnacks,
  },
  {
    id: 9,
    title: 'Chemical & Minerals',
    description: 'Heavy-duty impact pulverizers, ribbon blenders, chemical mixers, and pneumatic dust collection systems.',
    image: indChemical,
  },
  {
    id: 10,
    title: 'Industrial Spares & Automation',
    description: 'Precision pneumatic valves, cylinders, solenoids, actuators, PLC panels, and machinery spares.',
    image: indSpares,
  },
];

export default function IndustriesWeServe() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="bg-white py-12 lg:py-16 border-t border-slate-100 overflow-hidden font-sans">
      <div className="mx-auto max-w-[1650px] px-4 sm:px-8 lg:px-12 text-center">
        
        {/* Subtitle Badge matching reference image */}
        <div className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[#059669] mb-2">
          INDUSTRIES WE SERVE
        </div>

        {/* Main Title matching reference image */}
        <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold text-[#111827] tracking-tight mb-10">
          Diverse Expertise Across Food & Processing Sectors
        </h2>

        {/* 10 Cards Grid (5 cards per row on desktop layout xl:grid-cols-5) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 max-w-[1600px] mx-auto">
          {industries.map((item) => {
            const isHovered = hoveredId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative h-[350px] sm:h-[370px] rounded-lg overflow-hidden cursor-pointer shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-slate-200/90 bg-white"
              >
                {/* DEFAULT STATE: Image on top + Dark Emerald Title Bar at Bottom */}
                <div
                  className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${
                    isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  {/* Top Image Box */}
                  <div className="flex-1 bg-slate-900 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={`${item.title} - Food Processing Machinery KMG Machineries`}
                      title={`${item.title} Plant - KMG Machineries`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-108"
                    />
                  </div>

                  {/* Bottom Dark Emerald Title Banner */}
                  <div className="bg-[#1B4D3E] text-white py-3.5 px-3 text-center flex items-center justify-center min-h-[60px]">
                    <h3 className="text-xs sm:text-sm font-extrabold tracking-wide truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* HOVERED STATE: Clean White Card with Description & Learn More */}
                <div
                  className={`absolute inset-0 bg-white p-5 flex flex-col justify-between items-center text-center transition-all duration-300 border-2 border-[#1B4D3E] rounded-lg ${
                    isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  {/* Top Title */}
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1B4D3E] mt-2">
                    {item.title}
                  </h3>

                  {/* Middle Description Paragraph */}
                  <p className="text-xs text-slate-600 font-medium leading-relaxed my-auto">
                    {item.description}
                  </p>

                  {/* Bottom Learn More Link */}
                  <Link
                    to="/spares-service/machineries"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4D3E] hover:text-emerald-700 transition-colors mb-2 group"
                    title={`Explore ${item.title} Machineries`}
                  >
                    <span>Explore {item.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
