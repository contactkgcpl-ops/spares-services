import { MdEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { FaMapMarkerAlt, FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/salvin-spares-logo.png';

const productCategories = [
  'Pneumatic',
  'Mechanical',
  'Electronic',
  'Electric',
];

const navLinks = [
  { label: 'Home', to: '/spares-service/home' },
  { label: 'About Us', to: '/spares-service/about' },
  { label: 'Products', to: '/spares-service/products' },
  { label: 'Contact Us', to: '/spares-service/service' }
];

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0A1326] text-slate-300 font-sans">
      <div className="mx-auto max-w-[1700px] px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <img
              src={logo}
              alt="Salvin Spares"
              className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-103"
            />
            <p className="max-w-xs text-[12.5px] leading-relaxed text-slate-400 font-medium">
              Delivering high-performance industrial components, premium spares, and process optimization with technical precision and operations excellence.
            </p>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="mb-4 text-[13.5px] font-bold uppercase tracking-wider text-white">Categories</h3>
            <ul className="space-y-2.5 text-[13px] text-slate-400 font-semibold">
              {productCategories.map((category) => (
                <li key={category} className="transition-all duration-300 hover:text-blue-500">
                  <Link to={`/spares-service/products?category=${encodeURIComponent(category)}`} className="hover:text-blue-500 transition-all duration-300">
                    {category} Systems
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
                <li key={link.to} className="transition-all duration-300 hover:text-blue-500">
                  <Link to={link.to} className="hover:text-blue-500 transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-4 text-[13.5px] font-bold uppercase tracking-wider text-white">Contact Us</h3>
            <div className="space-y-3.5 text-[13px] text-slate-400 font-semibold">
              <div className="flex items-start gap-3 group">
                <MdEmail className="mt-1 h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <a href="mailto:info.salvinindustries@gmail.com" className="hover:text-blue-500 transition-all duration-300">
                  info.salvinindustries@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3 group">
                <FiPhone className="mt-1 h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <a href="tel:+919023979663" className="hover:text-blue-500 transition-all duration-300">
                  +91 90239 79663
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="leading-relaxed">
                  210, Arved Transcube Mall,<br />
                  Ranip, Ahmedabad,<br />
                  Gujarat 382480
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright & Socials */}
        <div className="mt-10 border-t border-slate-800/80 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[12px] text-slate-500 font-semibold">&copy; {new Date().getFullYear()} Salvin Spares. All rights reserved.</p>
            
            {/* Elegant Social Icons */}
            <div className="flex gap-2.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-[#0E1B33] text-slate-400 transition-all duration-300 hover:text-blue-500 hover:border-blue-500 hover:bg-[#0A1326] shadow-sm"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-[#0E1B33] text-slate-400 transition-all duration-300 hover:text-blue-500 hover:border-blue-500 hover:bg-[#0A1326] shadow-sm"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-[#0E1B33] text-slate-400 transition-all duration-300 hover:text-blue-500 hover:border-blue-500 hover:bg-[#0A1326] shadow-sm"
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
