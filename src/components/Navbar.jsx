import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaSearch } from 'react-icons/fa';

const navItems = [
  { label: 'Home', to: '/spares-service/home' },
  { label: 'Products', to: '/spares-service/products' },
  { label: 'Categories', to: '/spares-service/categories' },
  { label: 'About Us', to: '/spares-service/about' },
  { label: 'Contact Us', to: '/spares-service/service' }
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full flex flex-col font-sans relative z-50">
      {/* Top Bar */}
      <div className="bg-[#1E2A4A] text-white py-2.5 px-6 sm:px-10 lg:px-16 xl:px-24 flex justify-between items-center text-[13px] font-medium">
        <div className="flex items-center gap-6">
          <a href="tel:+919023979663" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <FaPhoneAlt size={11} /> +91 90239 79663
          </a>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <a href="mailto:info@salvinspares.com" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <FaEnvelope size={12} /> info@salvinspares.com
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <a href="#" className="hover:text-blue-300 transition-colors"><FaFacebookF size={13} /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaInstagram size={13} /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaLinkedinIn size={13} /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaWhatsapp size={14} /></a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white shadow-[0_2px_15px_rgba(30,42,74,0.04)]">
        <div className="mx-auto flex max-w-[1700px] items-center justify-between px-6 py-5 sm:px-10 lg:px-16 xl:px-24">
          
          {/* Logo */}
          <Link to="/spares-service/home" className="flex items-center gap-2 text-[#1E2A4A] group">
            <div className="flex flex-col leading-none">
              <span className="text-[26px] font-black tracking-tight text-[#1E2A4A] mb-0.5">SALVIN</span>
              <span className="text-[8px] uppercase font-bold tracking-[0.2em] text-[#536488]">IT SOLUTIONS</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[15px] font-semibold transition-colors duration-200 ${
                    isActive ? 'text-[#1E2A4A]' : 'text-[#536488] hover:text-[#1E2A4A]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="border border-gray-200 rounded-full py-2.5 pl-5 pr-10 text-[14px] w-64 focus:outline-none focus:border-[#1E2A4A] focus:ring-1 focus:ring-[#1E2A4A] transition-all text-[#1E2A4A] placeholder-gray-400"
            />
            <button className="absolute right-4 text-gray-400 hover:text-[#1E2A4A] transition-colors">
              <FaSearch size={14} />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block h-[2px] w-6 bg-[#1E2A4A] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-[2px] w-6 bg-[#1E2A4A] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] w-6 bg-[#1E2A4A] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 space-y-4">
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full border border-gray-200 rounded-lg py-3 px-4 text-[14px] focus:outline-none focus:border-[#1E2A4A]"
            />
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-[15px] font-semibold py-2 ${isActive ? 'text-[#1E2A4A]' : 'text-[#536488]'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
