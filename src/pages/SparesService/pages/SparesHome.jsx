import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useProductFilter from '../hooks/useProductFilter';
import heroGraphic from '../assets/hero-img.jpeg';
import { ShieldCheck, Cog, Zap, Users, Factory, Briefcase, ArrowRight, Target, Award, Lightbulb, CheckCircle2 } from 'lucide-react';
import { API_BASE_URL } from '../../../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

function SparesHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { filteredProducts } = useProductFilter(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get('/products');
        const apiProducts = response.data?.data || [];
        const normalizedProducts = apiProducts.map((product) => ({
          ...product,
          id: product._id || product.id,
          name: product.title || product.name || '',
        }));
        setProducts(normalizedProducts);
      } catch (error) {
        setError(error?.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white overflow-x-hidden font-sans">
      
      {/* 1. CORPORATE HERO SECTION */}
      <section className="relative bg-[#EEF2F7] pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white rounded-l-full opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-5 md:space-y-6">
            <h2 className="text-[#FF7A1A] text-sm font-bold tracking-[0.2em] uppercase">About Salvin Industries</h2>
            <h1 className="text-3xl md:text-[2.2rem] lg:text-[2.7rem] font-extrabold text-[#0F1E4A] leading-tight">
              Driving Industrial Excellence Forward
            </h1>
            <p className="text-[15px] md:text-base text-slate-600 font-medium max-w-lg leading-7">
              We deliver premium mechanical solutions, reliable automation components, and expert support tailored for modern manufacturing.
            </p>
            <div>
              <Link to="/spares-service/products" className="inline-flex items-center gap-2 bg-[#0F1E4A] text-white px-7 py-3.5 text-sm rounded-lg font-bold hover:bg-[#162B68] transition-colors duration-300">
                Explore Our Solutions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-8 -bottom-8 w-56 h-56 bg-[#FF7A1A]/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" alt="Corporate Facility" className="relative z-10 w-full h-[390px] md:h-[420px] object-cover rounded-tr-[4rem] rounded-bl-[4rem] shadow-xl" />
          </div>
        </div>
      </section>

      {/* 2. COMPANY STORY (ALTERNATING LAYOUTS) */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
          
          {/* Block 1: Who We Are (Image Left, Text Right) */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="w-full h-[340px] md:h-[360px] bg-[#EEF2F7] rounded-3xl p-3.5">
                 <img src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=800&q=80" alt="Who We Are" className="w-full h-full object-cover rounded-2xl shadow-sm" />
               </div>
            </div>
            <div className="order-1 lg:order-2 space-y-4 md:space-y-5">
              <h3 className="text-[1.65rem] md:text-[1.95rem] font-extrabold text-[#0F1E4A]">Who We Are</h3>
              <p className="text-[15px] md:text-base text-slate-600 font-medium leading-7">
                Salvin Industries is a leading provider of industrial spare parts and automated systems. Founded on the principle of uncompromised quality, we have spent years building a robust supply chain that heavy industries rely on daily.
              </p>
              <p className="text-[15px] md:text-base text-slate-600 font-medium leading-7">
                Our team consists of seasoned engineers and dedicated support staff who understand that in modern manufacturing, every second of downtime counts.
              </p>
            </div>
          </div>

          {/* Block 2: Our Mission (Text Left, Image Right) */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="space-y-4 md:space-y-5">
              <h3 className="text-[1.65rem] md:text-[1.95rem] font-extrabold text-[#0F1E4A]">Our Mission</h3>
              <p className="text-[15px] md:text-base text-slate-600 font-medium leading-7">
                Our mission is to empower industrial facilities globally by providing top-tier mechanical components and smart automation solutions. We strive to be the invisible force that keeps your operations running at peak efficiency.
              </p>
              <ul className="space-y-3 pt-1">
                {[
                  'Minimize operational downtime',
                  'Provide highly durable engineering components',
                  'Deliver continuous technical support'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FF7A1A]" />
                    <span className="font-bold text-[#0F1E4A] text-[15px] md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
               <div className="w-full h-[390px] md:h-[420px] bg-[#0F1E4A] rounded-3xl p-3.5">
                 <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1200&q=80" alt="Our Mission" className="w-full h-full object-cover rounded-2xl opacity-90 shadow-sm" />
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHY COMPANIES TRUST US (HORIZONTAL ICONS) */}
      <section className="py-16 md:py-20 px-6 bg-[#EEF2F7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[1.65rem] md:text-[1.95rem] font-extrabold text-[#0F1E4A]">Why Companies Trust Us</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { title: 'Reliable Solutions', icon: ShieldCheck },
              { title: 'Fast Support', icon: Zap },
              { title: 'Industrial Experience', icon: Factory },
              { title: 'Quality Products', icon: Award }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-4 md:p-5 rounded-xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 flex-shrink-0 bg-[#EEF2F7] rounded-full flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-[#FF7A1A]" />
                </div>
                <h4 className="text-lg md:text-[1.15rem] font-semibold text-[#0F1E4A]">{feature.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 5. INDUSTRIES WE SERVE (LARGE IMAGE CARDS) */}
      <section className="py-20 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-12">
            <h2 className="text-[#FF7A1A] text-sm font-bold tracking-[0.2em] uppercase mb-4">Core Focus</h2>
            <h3 className="text-[1.65rem] md:text-[1.95rem] font-extrabold text-[#0F1E4A]">Industries We Serve</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6">
            {[
              { title: 'Automation', desc: 'Advanced control systems and integration for modern manufacturing.', img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80' },
              { title: 'Pneumatic Systems', desc: 'High-pressure air systems driving heavy mechanical operations.', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80' },
              { title: 'Robotics', desc: 'Precision robotic arms and intelligent assembly line components.', img: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80' },
              { title: 'Processing Machinery', desc: 'Durable components engineered for continuous material processing.', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80' }
            ].map((industry, i) => (
              <div key={i} className="group relative h-[260px] md:h-[280px] rounded-2xl overflow-hidden shadow-sm">
                <img src={industry.img} alt={industry.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E4A] via-[#0F1E4A]/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h4 className="text-xl md:text-2xl font-extrabold text-white mb-1.5">{industry.title}</h4>
                  <p className="text-blue-100 text-[14px] md:text-[15px] font-medium max-w-sm">{industry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-16 md:py-20 px-6 bg-[#EEF2F7] mb-0">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-7">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F1E4A] leading-tight">
            Ready to Upgrade Your Industrial Supply Chain?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="mailto:info.salvinindustries@gmail.com" className="inline-flex items-center gap-2 bg-[#FF7A1A] text-white px-8 py-3.5 text-sm rounded-lg font-bold hover:bg-[#e66a12] transition-colors duration-300">
              Partner With Us
            </a>
            <Link to="/spares-service/products" className="inline-flex items-center gap-2 border-2 border-[#0F1E4A] text-[#0F1E4A] px-8 py-3.5 text-sm rounded-lg font-bold hover:bg-[#0F1E4A] hover:text-white transition-colors duration-300">
              View Product Catalog
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default SparesHome;
