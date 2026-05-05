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

const industries = [
  'Food Processing',
  'Pharmaceutical',
  'Beverage',
  'Cosmetics',
  'FMCG Manufacturing'
];

const companyLinks = [
  'About Us',
  'Our Journey',
  'Projects',
  'Careers',
  'Contact'
];

function Footer() {
  return (
    <footer className="bg-[#07182f] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Salvin Industries
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Delivering robust industrial automation, process engineering, and plant optimization solutions with a focus on efficiency, quality, and safety.
            </p>

            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 p-2 transition-all duration-300 hover:scale-105 hover:bg-[#f47c20]">
                  <FaMapMarkerAlt className="h-4 w-4 text-slate-300" />
                </div>
                <p>123 Industrial Way, Pune, Maharashtra</p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 p-2 transition-all duration-300 hover:scale-105 hover:bg-[#f47c20]">
                  <FiPhone className="h-4 w-4 text-slate-300" />
                </div>
                <a href="tel:+912345678901" className="text-slate-200 hover:text-[#f47c20] transition-colors">
                  +91 23456 78901
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 p-2 transition-all duration-300 hover:scale-105 hover:bg-[#f47c20]">
                  <MdEmail className="h-4 w-4 text-slate-300" />
                </div>
                <a href="mailto:info@salvinindustries.com" className="text-slate-200 hover:text-[#f47c20] transition-colors">
                  info@salvinindustries.com
                </a>
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0077b5] transition-all duration-300 hover:scale-105 hover:bg-[#f47c20] hover:text-white">
                <FaLinkedinIn className="h-5 w-5 text-white" />
              </a>

              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 hover:scale-105 hover:bg-[#f47c20] hover:text-white">
                <FaInstagram className="h-5 w-5 text-white" />
              </a>

              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] transition-all duration-300 hover:scale-105 hover:bg-[#f47c20] hover:text-white">
                <FaFacebookF className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Services</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {services.map((service) => (
                <li key={service}>
                  <a href="#" className="leading-6 hover:text-[#f47c20] transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Industries</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {industries.map((industry) => (
                <li key={industry}>
                  <a href="#" className="leading-6 hover:text-[#f47c20] transition-colors">
                    {industry}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="leading-6 hover:text-[#f47c20] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Salvin Industries. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;