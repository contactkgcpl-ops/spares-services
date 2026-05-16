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
  { label: 'About', to: '/spares-service/about' },
  { label: 'Products', to: '/spares-service/products' },
  { label: 'Contact Us', to: '/spares-service/service' }
];

function Footer() {
  return (
    <footer className="border-t border-[#2D3A4A] bg-[#122136] text-slate-300">
      <div className="mx-auto max-w-[1700px] px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
          <div className="space-y-5">
            <img
              src={logo}
              alt="Salvin Spares"
              className="h-20 w-auto object-contain"
            />
            <p className="max-w-lg text-[13px] leading-6 text-slate-300">
              Delivering industrial spare parts, engineering support, and process optimization with clear execution and operational reliability.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-[15px] font-semibold tracking-wide text-white">Categories</h3>
            <ul className="space-y-2.5 text-[13px] text-slate-300">
              {productCategories.map((category) => (
                <li key={category} className="transition-all duration-300 hover:text-[#D87F2A]">
                  <Link to={`/spares-service/products?category=${encodeURIComponent(category)}`} className="hover:text-[#D87F2A] transition-all duration-300">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[15px] font-semibold tracking-wide text-white">Navigation</h3>
            <ul className="space-y-2.5 text-[13px] text-slate-300">
              {navLinks.map((link) => (
                <li key={link.to} className="transition-all duration-300 hover:text-[#D87F2A]">
                  <Link to={link.to} className="hover:text-[#D87F2A] transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[15px] font-semibold tracking-wide text-white">Contact Us</h3>
            <div className="space-y-3 text-[13px] text-slate-300">
              <div className="flex items-start gap-3">
                <MdEmail className="mt-1 h-4 w-4 text-[#D87F2A]" />
                <a href="mailto:info.salvinindustries@gmail.com" className="hover:text-[#D87F2A] transition-all duration-300">
                  info.salvinindustries@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="mt-1 h-4 w-4 text-[#D87F2A]" />
                <a href="tel:+919023979663" className="hover:text-[#D87F2A] transition-all duration-300">
                  +91 90239 79663
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 h-4 w-4 text-[#D87F2A]" />
                <span className="leading-6">
                  210, Arved Transcube Mall,<br />
                  Ranip, Ahmedabad,<br />
                  Gujarat 382480
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#2D3A4A] pt-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-[13px] text-slate-400">&copy; {new Date().getFullYear()} Salvin Industrial. All rights reserved.</p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2D3A4A] bg-[#1F2C39] text-slate-300 transition-all duration-300 hover:text-[#D87F2A] hover:border-[#D87F2A]"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2D3A4A] bg-[#1F2C39] text-slate-300 transition-all duration-300 hover:text-[#D87F2A] hover:border-[#D87F2A]"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#2D3A4A] bg-[#1F2C39] text-slate-300 transition-all duration-300 hover:text-[#D87F2A] hover:border-[#D87F2A]"
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
