import { MdEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { FaMapMarkerAlt, FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa';

const services = [
  'Turnkey Automation',
  'Packaging Lines',
  'Process Engineering',
  'PLC & SCADA Integration',
  'Plant Optimization'
];

const companyLinks = ['About Us', 'Projects', 'Careers', 'Contact'];

function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-[#07182f] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-wide text-white">Salvin Industrial</h2>
            <p className="max-w-lg text-sm leading-relaxed text-slate-300">
              Delivering industrial spare parts, engineering support, and process optimization with clear execution and operational reliability.
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-all duration-300 hover:text-[#f47c20]">
                  <FaMapMarkerAlt className="h-4 w-4" />
                </span>
                <span>123 Industrial Way, Pune, Maharashtra</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-all duration-300 hover:text-[#f47c20]">
                  <FiPhone className="h-4 w-4" />
                </span>
                <a href="tel:+912345678901" className="text-slate-300 transition-all duration-300 hover:text-[#f47c20]">
                  +91 23456 78901
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition-all duration-300 hover:text-[#f47c20]">
                  <MdEmail className="h-4 w-4" />
                </span>
                <a href="mailto:info@salvinindustries.com" className="text-slate-300 transition-all duration-300 hover:text-[#f47c20]">
                  info@salvinindustries.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wide text-white">Services</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {services.map((service) => (
                <li key={service} className="transition-all duration-300 hover:text-[#f47c20]">{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wide text-white">Company</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              {companyLinks.map((link) => (
                <li key={link} className="transition-all duration-300 hover:text-[#f47c20]">{link}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Salvin Industrial. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
