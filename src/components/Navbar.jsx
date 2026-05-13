import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import logo from '../assets/logo.jpg';
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
  { label: 'Contact Us', to: '/spares-service/service' }
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

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
    <header className="w-full flex flex-col font-sans relative z-50">
      {/* Top Bar */}
      <div className="bg-[#1E2A4A] text-white py-2 px-6 sm:px-10 lg:px-16 xl:px-24 flex justify-between items-center text-[12px] font-medium">
        <div className="flex items-center gap-5">
          <a href="tel:+919023979663" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <FaPhoneAlt size={11} /> +91 90239 79663
          </a>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <a href="mailto:info.salvinindustries@gmail.com" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <FaEnvelope size={12} /> info.salvinindustries@gmail.com
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-3.5">
          <a href="#" className="hover:text-blue-300 transition-colors"><FaFacebookF size={13} /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaInstagram size={13} /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaLinkedinIn size={13} /></a>
          <a href="#" className="hover:text-blue-300 transition-colors"><FaWhatsapp size={14} /></a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#F7F9FC]/95 backdrop-blur-sm border-b border-slate-200/80 shadow-[0_4px_14px_rgba(15,30,74,0.08)]">
        <div className="mx-auto flex max-w-[1700px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16 xl:px-24">

          {/* Logo */}
          <Link to="/spares-service/home" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Salvin Spares"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[14px] font-semibold transition-colors duration-200 ${isActive ? 'text-[#1E2A4A]' : 'text-[#536488] hover:text-[#1E2A4A]'
                  }`
                }
              >
                {item.label}
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
                className="border border-gray-200 rounded-full py-2 pl-4 pr-9 text-[13px] w-60 focus:outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/30 transition-all text-[#0F1E4A] placeholder-gray-400 shadow-sm"
              />
              <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF7A1A] transition-colors">
                <FaSearch size={13} />
              </button>
            </form>

            {/* Dropdown Suggestions */}
            {showDropdown && searchQuery.trim().length > 0 && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="p-2">
                  <p className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-widest">Suggestions</p>
                  {filteredSuggestions.map((product) => {
                    const name = product.title || product.name || '';
                    return (
                      <button
                        key={product._id || product.id}
                        onClick={() => handleSuggestionClick(name)}
                        className="w-full text-left px-3 py-2 text-[13px] font-semibold text-[#0F1E4A] hover:bg-[#EEF2F7] rounded-lg transition-colors truncate"
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#F7F9FC]/95 backdrop-blur-sm shadow-[0_10px_24px_rgba(15,30,74,0.08)] border-t border-slate-200/80 py-3.5 px-5 space-y-3.5">
          <div className="relative mb-3" ref={mobileSearchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                className="w-full border border-gray-200 rounded-full py-2.5 px-4 text-[13px] focus:outline-none focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/30 text-[#0F1E4A] transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF7A1A]">
                <FaSearch size={13} />
              </button>
            </form>

            {/* Mobile Dropdown Suggestions */}
            {showDropdown && searchQuery.trim().length > 0 && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-lg overflow-hidden z-50">
                <div className="p-2">
                  <p className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-widest">Suggestions</p>
                  {filteredSuggestions.map((product) => {
                    const name = product.title || product.name || '';
                    return (
                      <button
                        key={product._id || product.id}
                        onClick={() => handleSuggestionClick(name)}
                        className="w-full text-left px-3 py-2 text-[13px] font-semibold text-[#0F1E4A] hover:bg-[#EEF2F7] rounded-lg transition-colors truncate"
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-[14px] font-semibold py-1.5 ${isActive ? 'text-[#1E2A4A]' : 'text-[#536488]'}`
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
