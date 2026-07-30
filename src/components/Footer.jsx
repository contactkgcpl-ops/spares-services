import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { FaMapMarkerAlt, FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/salvin_logo.png';

const machineryCategories = [
  { label: 'Spices Grinding Machinery', to: '/spares-service/machineries' },
  { label: 'Powder Packaging Machines', to: '/spares-service/machineries' },
  { label: 'Liquid & Paste Bottling Lines', to: '/spares-service/machineries' },
  { label: 'Agro Grain & Dal Mill Plants', to: '/spares-service/machineries' },
  { label: 'Pharma & Herbal Pulverizers', to: '/spares-service/machineries' },
  { label: 'Pneumatics & Automation Spares', to: '/spares-service/products' },
];

const navLinks = [
  { label: 'Home', to: '/spares-service/home' },
  { label: 'About Us', to: '/spares-service/about' },
  { label: 'Food Machineries', to: '/spares-service/machineries' },
  { label: 'Industrial Spares', to: '/spares-service/products' },
  { label: 'Contact Us', to: '/spares-service/service' }
];

const seoKeywords = [
  'Spices Grinding Machine Manufacturer',
  'Masala Pulverizer Machine Supplier',
  'Automatic Powder Packaging Machine',
  'Liquid Filling Machine India',
  'Dal Mill Machinery Manufacturer',
  'Turnkey Spice Processing Plant',
  'Turmeric Grinding Pulverizer',
  'Chilli Grinding Machine',
  'Chemical Powder Blender',
  'Herbal Micronizing Mill',
  'Pneumatic Spares & Automation',
  'Food Processing Machinery Ahmedabad',
  'Worldwide Machinery Exporter'
];

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0A1326] text-slate-300 font-sans">
      <div className="mx-auto max-w-[1700px] px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        
        {/* Main Footer Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr_0.7fr_1.1fr]">
          
          {/* Logo and Machinery Company Description */}
          <div className="space-y-4">
            <img
              src={logo}
              alt="Salvin Industries - Food Processing & Packaging Machinery Manufacturer"
              className="h-14 md:h-[3.75rem] lg:h-[4rem] w-auto object-contain transition-transform duration-300 hover:scale-103"
            />
            <p className="max-w-sm text-[12.5px] leading-relaxed text-slate-400 font-medium">
              Salvin Industries is a premier manufacturer and exporter of heavy-duty Food Processing Machinery, Spices Grinding Mills, Masala Pulverizers, Powder Packaging Lines, Liquid Filling Machines, Dal Mill Plants, and Industrial Automation Solutions with 18+ years of technical excellence.
            </p>
          </div>

          {/* Machinery Categories */}
          <div>
            <h3 className="mb-4 text-[13.5px] font-bold uppercase tracking-wider text-white">Machinery & Solutions</h3>
            <ul className="space-y-2.5 text-[13px] text-slate-400 font-semibold">
              {machineryCategories.map((item, idx) => (
                <li key={idx} className="transition-all duration-300 hover:text-blue-400">
                  <Link to={item.to} className="hover:text-blue-400 transition-all duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="mb-4 text-[13.5px] font-bold uppercase tracking-wider text-white">Navigation</h3>
            <ul className="space-y-2.5 text-[13px] text-slate-400 font-semibold">
              {navLinks.map((link) => (
                <li key={link.to} className="transition-all duration-300 hover:text-blue-400">
                  <Link to={link.to} className="hover:text-blue-400 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 text-[13.5px] font-bold uppercase tracking-wider text-white">Head Office</h3>
            <div className="space-y-3.5 text-[13px] text-slate-400 font-semibold">
              <div className="flex items-start gap-3 group">
                <MdEmail className="mt-1 h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <a href="mailto:info.salvinindustries@gmail.com" className="hover:text-blue-400 transition-all duration-300">
                  info.salvinindustries@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3 group">
                <FiPhone className="mt-1 h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <a href="tel:+919898727796" className="hover:text-blue-400 transition-all duration-300">
                  +91 9898727796
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="leading-relaxed">
                  210, Arved Transcube Mall,<br />
                  Ranip, Ahmedabad,<br />
                  Gujarat 382480, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Keywords Hidden for UI but Present for Search Engine Crawlers */}
        <div className="sr-only">
          <h2>Popular Machinery Keywords & Searches</h2>
          <ul>
            {seoKeywords.map((keyword, idx) => (
              <li key={idx}>{keyword}</li>
            ))}
          </ul>
        </div>

        {/* Footer Bottom Copyright & Socials */}
        <div className="mt-8 border-t border-slate-800/80 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[12px] text-slate-400 font-semibold">
              &copy; {new Date().getFullYear()} Salvin Industries - Food Processing & Packaging Machinery Manufacturers. All rights reserved.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-[#0E1B33] text-slate-400 transition-all duration-300 hover:text-blue-400 hover:border-blue-400 hover:bg-[#0A1326] shadow-sm"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-[#0E1B33] text-slate-400 transition-all duration-300 hover:text-blue-400 hover:border-blue-400 hover:bg-[#0A1326] shadow-sm"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-[#0E1B33] text-slate-400 transition-all duration-300 hover:text-blue-400 hover:border-blue-400 hover:bg-[#0A1326] shadow-sm"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
