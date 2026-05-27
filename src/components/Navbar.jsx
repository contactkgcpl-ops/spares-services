import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import logo from '../assets/salvin-spares-logo.png';
import { API_BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

const navItems = [
  { label: 'Home', to: '/spares-service/home' },
  { label: 'About Us', to: '/spares-service/about' },
  { label: 'Products', to: '/spares-service/products' },
  { label: 'Services', to: '/spares-service/services' },
  { label: 'Contact Us', to: '/spares-service/service' }
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Scroll listener for sticky header behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProductsForSearch = async () => {
    if (allProducts.length === 0) {
      try {
        const response = await api.get('/products');
        setAllProducts(response.data?.data || []);
      } catch (error) {
        console.error("Failed to load products for search");
      }
    }
  };

  const handleSearchFocus = () => {
    setShowDropdown(true);
    fetchProductsForSearch();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/spares-service/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
      setMobileOpen(false);
    }
  };

  const handleSuggestionClick = (productName) => {
    setSearchQuery(productName);
    navigate(`/spares-service/products?search=${encodeURIComponent(productName)}`);
    setShowDropdown(false);
    setMobileOpen(false);
  };

  const filteredSuggestions = allProducts
    .filter(p => {
      const name = p.title || p.name || '';
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .slice(0, 5);

  return (
    <header className={`w-full flex flex-col font-sans transition-all duration-300 z-50 ${
      scrolled 
        ? 'sticky top-0 bg-white/80 backdrop-blur-md shadow-[0_10px_30px_rgba(15,30,74,0.06)] border-b border-slate-200/50' 
        : 'relative bg-[#F7F9FC]/95 border-b border-slate-200/80'
    }`}>
      
      {/* Top Bar (Hidden on sticky scroll to maintain compact premium header) */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#1E2A4A] text-white py-2 px-6 sm:px-10 lg:px-16 xl:px-24 flex justify-between items-center text-[11px] font-medium overflow-hidden border-b border-slate-800"
          >
            <div className="flex items-center gap-5">
              <a href="tel:+919898727796" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
                <FaPhoneAlt size={10} /> +91 9898727796
              </a>
              <span className="text-gray-500 hidden sm:inline">|</span>
              <a href="mailto:info.salvinindustries@gmail.com" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
                <FaEnvelope size={11} /> info.salvinindustries@gmail.com
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-3.5">
              <a href="#" className="hover:text-blue-300 transition-colors"><FaFacebookF size={12} /></a>
              <a href="#" className="hover:text-blue-300 transition-colors"><FaInstagram size={12} /></a>
              <a href="#" className="hover:text-blue-300 transition-colors"><FaLinkedinIn size={12} /></a>
              <a href="#" className="hover:text-blue-300 transition-colors"><FaWhatsapp size={13} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <div className={`transition-all duration-300 ${scrolled ? 'py-2.5 shadow-sm bg-transparent' : 'py-4'}`}>
        <div className="mx-auto flex max-w-[1700px] items-center justify-between px-6 sm:px-10 lg:px-16 xl:px-24">

          {/* Logo */}
          <Link to="/spares-service/home" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Salvin Spares"
              className="h-12 md:h-[3.25rem] lg:h-[3.5rem] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Navigation Links with custom sliding bottom underline active line */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative text-[13.5px] font-bold py-1.5 px-0.5 transition-colors duration-300 ${
                    isActive ? 'text-[#0B1527]' : 'text-[#536488] hover:text-[#0B1527]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="border border-slate-200 rounded-full py-1.5 pl-4 pr-9 text-[12.5px] w-56 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-[#0F1E4A] placeholder-gray-400 shadow-sm"
              />
              <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors">
                <FaSearch size={11} />
              </button>
            </form>

            {/* Dropdown Suggestions */}
            <AnimatePresence>
              {showDropdown && searchQuery.trim().length > 0 && filteredSuggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 w-64 mt-2 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl shadow-xl overflow-hidden z-50"
                >
                  <div className="p-2">
                    <p className="text-[10px] font-black text-slate-400 px-3 py-1.5 uppercase tracking-widest">Suggestions</p>
                    {filteredSuggestions.map((product) => {
                      const name = product.title || product.name || '';
                      return (
                        <button
                          key={product._id || product.id}
                          onClick={() => handleSuggestionClick(name)}
                          className="w-full text-left px-3 py-2 text-[12.5px] font-bold text-[#0F1E4A] hover:bg-[#EEF2F7] rounded-lg transition-colors truncate"
                        >
                          {name}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors relative z-50 ml-auto"
            aria-label="Toggle mobile menu"
          >
            <span className={`block h-[2px] w-6 bg-[#0B1527] transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-[2px] w-6 bg-[#0B1527] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] w-6 bg-[#0B1527] transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile drawer menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-t border-slate-200/60 py-4 px-6 space-y-4 z-40 overflow-hidden"
          >
            <div className="relative mb-2" ref={mobileSearchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  className="w-full border border-slate-200 rounded-full py-2 px-4 text-[13px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-[#0F1E4A] transition-all"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                  <FaSearch size={12} />
                </button>
              </form>

              {/* Mobile Dropdown Suggestions */}
              {showDropdown && searchQuery.trim().length > 0 && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-lg overflow-hidden z-50">
                  <div className="p-2">
                    <p className="text-[10px] font-black text-slate-400 px-3 py-1.5 uppercase tracking-widest">Suggestions</p>
                    {filteredSuggestions.map((product) => {
                      const name = product.title || product.name || '';
                      return (
                        <button
                          key={product._id || product.id}
                          onClick={() => handleSuggestionClick(name)}
                          className="w-full text-left px-3 py-2 text-[12.5px] font-bold text-[#0F1E4A] hover:bg-[#EEF2F7] rounded-lg transition-colors truncate"
                        >
                          {name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block text-[14px] font-bold py-2 border-b border-slate-100 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-[#536488] hover:text-[#0B1527]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
