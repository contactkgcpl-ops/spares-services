import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/api';
import { updateContactPageSEO } from '../../../utils/seoHelper';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

function ServicePage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    updateContactPageSEO();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      setFormStatus('');
      setFormError('');
      await api.post('/contact', formData);
      setFormStatus('Inquiry submitted successfully. Our engineering team will contact you shortly.');
      setFormData({ fullName: '', companyName: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setFormError(error?.response?.data?.message || 'Failed to submit inquiry. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white font-sans antialiased text-slate-700 overflow-x-hidden">
      
      {/* 1. TOP TITLE BAR & BREADCRUMB BANNER (Matching Envitro Technomech) */}
      <section className="bg-[#0B1527] text-white py-12 md:py-16 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-white mb-2">
              Contact Us
            </h1>
            <p className="text-xs sm:text-sm text-blue-200/80 font-medium">
              Salvin Industries – Reach Our Food Processing & Packaging Machinery Experts
            </p>
          </div>
          
          {/* Breadcrumb */}
          <div className="text-xs font-semibold text-slate-400 flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Link to="/spares-service/home" className="hover:text-blue-400 transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-blue-400">Contact Us</span>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTACT SECTION (2-COL MATCHING ENVITRO TECHNOMECH) */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* LEFT COL: Contact Info & Details */}
            <div className="lg:col-span-5 space-y-6">
              
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-2 block">
                  01. CONTACT US NOW
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-extrabold text-[#0B1527] tracking-tight leading-tight mb-4">
                  Happy to Answer All Your Machinery Questions
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Reach out to our dedicated engineering support team. Whether you need machine specifications, plant layout design, spice pulverizer customization, powder packaging lines, or turnkey dal mill inquiries, we are here to help.
                </p>
              </div>

              {/* Contact Info Cards Grid */}
              <div className="space-y-4 pt-2">
                
                {/* Office & Factory */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 flex items-start gap-4 hover:border-blue-300 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1527] mb-1">Head Office</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      210, Arved Transcube Mall, Ranip, Ahmedabad, Gujarat 382480, India.
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 flex items-start gap-4 hover:border-blue-300 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1527] mb-1">Email Us</h3>
                    <a href="mailto:info.salvinindustries@gmail.com" className="text-xs text-slate-600 hover:text-blue-600 font-medium transition-colors">
                      info.salvinindustries@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 flex items-start gap-4 hover:border-blue-300 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1527] mb-1">Phone & WhatsApp</h3>
                    <a href="tel:+919898727796" className="text-xs text-slate-600 hover:text-blue-600 font-semibold transition-colors">
                      +91 9898727796
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/90 flex items-start gap-4 hover:border-blue-300 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B1527] mb-1">Working Hours</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Monday to Saturday: 09:00 AM – 07:00 PM
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COL: Interactive Inquiry Form (Matching Envitro Technomech Form) */}
            <div className="lg:col-span-7" id="contact-form">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
                    PROJECT INQUIRY FORM
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1527]">
                    Send Us a Message
                  </h3>
                </div>

                {formStatus && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{formStatus}</span>
                  </div>
                )}

                {formError && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1527] mb-1.5">
                        Your Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1527] mb-1.5">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company Ltd."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1527] mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0B1527] mb-1.5">
                        Phone / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 9898727796"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1527] mb-1.5">
                      Interested Machinery / Subject <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Spice Grinding Machine / Powder Packaging Plant"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1527] mb-1.5">
                      Your Message / Capacity Requirement <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please describe your required machine capacity, food product, or plant specifications..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting Inquiry...' : 'Submit Inquiry Now'}</span>
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. EMBEDDED GOOGLE MAP SECTION */}
      <section className="w-full bg-slate-100 py-1">
        <div className="w-full h-[400px] bg-slate-200 relative overflow-hidden">
          <iframe
            title="Salvin Industries Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3662283929424!2d72.5804561!3d23.0837042!2m3!1f0!40!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e839e55555555%3A0x5555555555555555!2sArved%20Transcube%20Mall!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* 4. CALL TO ACTION CONSULTATION BAR */}
      <section className="py-12 bg-[#0B1527] text-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
            Looking for Custom Spice Mills, Packaging Lines or Turnkey Food Plant Design?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
            Our engineering consultants are ready to assist you with complete plant planning and machinery quotes.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919898727796"
              className="inline-flex items-center gap-2 bg-[#FF7A1A] hover:bg-[#e66a12] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us: +91 9898727796</span>
            </a>
            <a
              href="https://wa.me/919898727796?text=Hello%20Salvin%20Industries%2C%20I%20want%20to%20inquire%20about%20food%20processing%20machinery."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ServicePage;
