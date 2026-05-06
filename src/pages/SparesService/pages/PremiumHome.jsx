import { Link } from 'react-router-dom';
import heroGraphic from '../assets/hero-graphic.svg';
import pumpImage from '../assets/product-pump.svg';
import filterImage from '../assets/product-filter.svg';
import controlImage from '../assets/product-control.svg';
import motorImage from '../assets/product-motor.svg';
import bearingImage from '../assets/product-bearing.svg';
import valveImage from '../assets/product-valve.svg';
import serviceImage from '../assets/service-graphic.svg';

const companyStats = [
  { label: 'Years Experience', value: '18+' },
  { label: 'Projects', value: '420+' },
  { label: 'Industries Served', value: '28' },
  { label: 'Technical Support', value: '24/7' },
];

const categories = [
  { name: 'Pump Systems', image: pumpImage },
  { name: 'Filters', image: filterImage },
  { name: 'PLC & Controls', image: controlImage },
  { name: 'Industrial Motors', image: motorImage },
  { name: 'Bearings', image: bearingImage },
  { name: 'Filtration Systems', image: filterImage },
  { name: 'Valves', image: valveImage },
  { name: 'Spare Parts', image: bearingImage },
];

const reasons = [
  'Fast Delivery',
  'Industrial Expertise',
  'Genuine Spare Parts',
  'Technical Support',
  'Custom Solutions',
  'Nationwide Supply',
];

const workflow = ['Inquiry', 'Consultation', 'Sourcing', 'Quality Check', 'Dispatch', 'Support'];

function PremiumHome() {
  return (
    <div className="space-y-20 pb-8">
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="grid gap-8 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#f47c20]">Industrial Engineering Excellence</p>
            <h1 className="text-3xl font-semibold tracking-tight text-[#0f172a] md:text-5xl">
              Advanced Industrial Spare & Process Solutions
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600">
              Delivering dependable components, automation expertise, and lifecycle support for critical plant operations
              across manufacturing and process industries.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/spares-service/products"
                className="rounded-lg bg-[#f47c20] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
              >
                Explore Products
              </Link>
              <a
                href="mailto:info@salvinindustries.com"
                className="rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20] hover:text-[#f47c20]"
              >
                Contact Team
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
            <img src={heroGraphic} alt="Industrial operations and engineering systems" className="h-[360px] w-full rounded-xl object-cover" />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-[#f8fafc] px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-[#f47c20]">Who We Are</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a] md:text-4xl">Engineering-first industrial partner</h2>
            <p className="text-slate-600 leading-relaxed">
              We support plant reliability with integrated spare sourcing, process system understanding, and automation-backed
              service. Our team works directly with operations and maintenance units to maintain uptime and improve process
              performance through practical, field-ready solutions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {companyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]"
              >
                <p className="text-2xl font-semibold tracking-tight text-[#0f172a]">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-[#f47c20]">Product Categories</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a] md:text-4xl">Built for demanding industrial environments</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, idx) => (
            <article
              key={`${category.name}-${idx}`}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]"
            >
              <img src={category.image} alt={category.name} className="h-40 w-full rounded-xl bg-[#f8fafc] object-cover p-4" />
              <h3 className="mt-4 text-lg font-semibold text-[#0f172a]">{category.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-[#f8fafc] px-6 py-16 lg:px-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-[#f47c20]">Why Choose Us</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a] md:text-4xl">Performance with accountability</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]"
            >
              <p className="text-base font-medium text-slate-700">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-[#f47c20]">Industrial Solutions</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a] md:text-4xl">Solutions aligned to plant lifecycle needs</h2>
        </div>
        <div className="space-y-8">
          <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5 lg:grid-cols-2 lg:items-center">
            <img src={controlImage} alt="PLC panel and control automation systems" className="h-64 w-full rounded-xl bg-[#f8fafc] object-cover p-4" />
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight text-[#0f172a]">Automation and control modernization</h3>
              <p className="text-slate-600 leading-relaxed">
                From PLC integration to control panel optimization, we help plants improve process consistency and reduce
                intervention through engineered control strategies.
              </p>
            </div>
          </div>
          <div className="grid gap-6 rounded-xl border border-slate-200 bg-[#f8fafc] p-5 lg:grid-cols-2 lg:items-center">
            <div className="order-2 space-y-3 lg:order-1">
              <h3 className="text-2xl font-semibold tracking-tight text-[#0f172a]">Filtration and process reliability packages</h3>
              <p className="text-slate-600 leading-relaxed">
                We design dependable filtration and spare replacement programs to secure process quality and minimize
                contamination-related downtime.
              </p>
            </div>
            <img src={filterImage} alt="Industrial filtration systems and process equipment" className="order-1 h-64 w-full rounded-xl bg-white object-cover p-4 lg:order-2" />
          </div>
          <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5 lg:grid-cols-2 lg:items-center">
            <img src={serviceImage} alt="Industrial logistics and nationwide technical support" className="h-64 w-full rounded-xl bg-[#f8fafc] object-cover p-4" />
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight text-[#0f172a]">Delivery, commissioning, and field support</h3>
              <p className="text-slate-600 leading-relaxed">
                Our coordinated supply and service teams ensure dependable dispatch, commissioning guidance, and quick support
                response across critical operating zones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white px-6 py-16 lg:px-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-[#f47c20]">Workflow</p>
          <h2 className="text-3xl font-semibold tracking-tight text-[#0f172a] md:text-4xl">How we execute every requirement</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {workflow.map((step, index) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Step {index + 1}</p>
              <p className="mt-2 text-sm font-medium text-[#0f172a]">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#07182f] px-6 py-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-[#f47c20]">Ready to Scale Operations?</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Partner with a team built for high-performance industrial supply and support
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Share your technical requirement and operating constraints. We will map the right spare and process solution with
              speed, quality focus, and engineering clarity.
            </p>
            <a
              href="mailto:info@salvinindustries.com"
              className="inline-flex rounded-lg bg-[#f47c20] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#dc6e19]"
            >
              Connect with Engineering Team
            </a>
          </div>
          <img src={pumpImage} alt="Industrial process equipment and engineering infrastructure" className="h-64 w-full rounded-xl bg-white/5 object-cover p-4" />
        </div>
      </section>
    </div>
  );
}

export default PremiumHome;
