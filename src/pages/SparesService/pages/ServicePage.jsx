import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Zap, Factory, Award, ArrowRight } from 'lucide-react';
import axios from 'axios';
import heroGraphic from '../assets/hero-img.jpeg';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
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
      await api.post('/api/contact', formData);
      setFormStatus('Inquiry submitted successfully.');
      setFormData({ fullName: '', companyName: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setFormError(error?.response?.data?.message || 'Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white overflow-x-hidden font-sans pb-20 mb-0">
      
      {/* 1. NEW PREMIUM HERO SECTION */}
      <section className="w-full bg-white pt-24 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-r from-[#0F1E4A] to-[#162B68] rounded-[2.5rem] overflow-hidden p-8 lg:p-16 grid lg:grid-cols-2 gap-12 items-center shadow-2xl">
            
            {/* Background shapes for depth */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF7A1A]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Left: Content */}
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#FF7A1A] animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-white">Contact Salvin Industries</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                Let’s Build Better <span className="text-[#FF7A1A]">Industrial Solutions</span> Together
              </h1>
              
              <p className="text-lg text-blue-100 font-medium max-w-lg leading-relaxed">
                Get in touch with our dedicated engineering support team. From specialized components to fully automated systems, we provide the expertise to keep your manufacturing operations at peak performance.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a href="#contact-form" className="inline-flex items-center gap-2 bg-[#FF7A1A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#e66a12] transition-colors shadow-lg">
                  Send Inquiry
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link to="/spares-service/products" className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors">
                  Explore Products
                </Link>
              </div>
            </div>
            
            {/* Right: Visual */}
            <div className="relative z-10 lg:h-[450px] flex items-center justify-center mt-10 lg:mt-0">
              {/* Main Image Base */}
              <div className="relative w-full max-w-[350px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-white/20">
                <img src={heroGraphic} alt="Industrial Facility" className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E4A] via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Floating Element 1 */}
              <div className="absolute -left-6 sm:left-4 lg:-left-12 bottom-16 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#FF7A1A]/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#FF7A1A]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Fast Technical</p>
                  <p className="text-sm font-bold text-white">Support</p>
                </div>
              </div>

              {/* Floating Element 2 */}
              <div className="absolute -right-6 sm:right-4 lg:-right-8 top-16 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#0F1E4A]/50 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">24/7 Industrial</p>
                  <p className="text-sm font-bold text-white">Assistance</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION SECTION */}
      <section className="py-20 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Phone, title: 'Phone Number', detail: '+91 90239 79663', subDetail: 'Mon-Sat, 9AM-6PM' },
            { icon: Mail, title: 'Email Address', detail: 'info.salvinindustries@gmail.com', subDetail: 'Online support 24/7' },
            { icon: MapPin, title: 'Office Address', detail: 'Phase-1, Vatva GIDC', subDetail: 'Ahmedabad, Gujarat 382445' },
            { icon: Clock, title: 'Business Hours', detail: 'Monday - Saturday', subDetail: '9:00 AM - 6:00 PM' }
          ].map((info, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 bg-[#EEF2F7] rounded-full flex items-center justify-center mb-2">
                <info.icon className="w-6 h-6 text-[#FF7A1A]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0F1E4A] mb-1">{info.title}</h4>
                <p className="text-slate-700 font-semibold">{info.detail}</p>
                <p className="text-slate-500 text-sm mt-1">{info.subDetail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CONTACT FORM */}
      <section id="contact-form" className="py-24 px-6 bg-[#EEF2F7]">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-12 border border-slate-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0F1E4A] mb-4">Send Us a Message</h2>
            <p className="text-slate-600 font-medium">Fill out the form below and our technical team will get back to you shortly.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F1E4A] ml-1">Full Name</label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder="John Doe" className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/50 focus:border-[#FF7A1A] transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F1E4A] ml-1">Company Name</label>
                <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="Your Company Ltd." className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/50 focus:border-[#FF7A1A] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F1E4A] ml-1">Email Address</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@company.com" className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/50 focus:border-[#FF7A1A] transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0F1E4A] ml-1">Phone Number</label>
                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 98765 43210" className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/50 focus:border-[#FF7A1A] transition-all" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F1E4A] ml-1">Subject</label>
              <input name="subject" value={formData.subject} onChange={handleChange} type="text" placeholder="Inquiry about Pneumatic Systems" className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/50 focus:border-[#FF7A1A] transition-all" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#0F1E4A] ml-1">Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Please describe your requirements..." className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/50 focus:border-[#FF7A1A] transition-all resize-none" required></textarea>
            </div>

            {formStatus && <p className="text-center text-sm font-semibold text-green-600">{formStatus}</p>}
            {formError && <p className="text-center text-sm font-semibold text-red-600">{formError}</p>}

            <div className="pt-4 text-center">
              <button type="submit" disabled={submitting} className="inline-flex items-center justify-center bg-[#FF7A1A] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#e66a12] transition-colors duration-300 w-full sm:w-auto min-w-[200px] disabled:cursor-not-allowed disabled:opacity-70">
                {submitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4. GOOGLE MAP / LOCATION SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 lg:pr-10">
            <h2 className="text-3xl font-extrabold text-[#0F1E4A]">Visit Our Corporate Office</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              We welcome clients to visit our facility to discuss engineering projects, view our product catalogs, and consult with our technical experts in person.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#EEF2F7] rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-6 h-6 text-[#0F1E4A]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#0F1E4A]">Salvin Headquarters</h4>
                  <p className="text-slate-600 mt-1">Phase-1, Vatva GIDC,<br/>Ahmedabad, Gujarat 382445, India</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[400px] bg-[#EEF2F7] rounded-3xl overflow-hidden border border-slate-200 flex items-center justify-center relative">
            {/* Simple Map Placeholder for visual layout */}
            <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center">
               <MapPin className="w-12 h-12 text-[#FF7A1A] mb-4 opacity-50" />
               <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">Interactive Map</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CONTACT US SECTION */}
      <section className="py-16 px-6 bg-[#EEF2F7] border-y border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: Zap, label: 'Fast Technical Support' },
            { icon: Factory, label: 'Industrial Expertise' },
            { icon: ShieldCheck, label: 'Reliable Service' },
            { icon: Award, label: 'Quick Response' }
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <feature.icon className="w-6 h-6 text-[#FF7A1A]" />
              <span className="font-bold text-[#0F1E4A]">{feature.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto bg-[#0F1E4A] rounded-3xl p-12 text-center shadow-lg">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">
            Need Industrial Solutions?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="tel:+919023979663" className="inline-flex items-center justify-center gap-2 bg-[#FF7A1A] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#e66a12] transition-colors">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <Link to="/spares-service/products" className="inline-flex items-center justify-center gap-2 bg-white text-[#0F1E4A] px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ServicePage;
