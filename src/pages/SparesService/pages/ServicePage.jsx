import ServiceCard from '../components/ServiceCard';
import serviceGraphic from '../assets/service-graphic.svg';

const serviceOptions = [
  {
    title: 'Preventive Maintenance',
    description: 'Scheduled inspections, part audits and calibration to keep operations running without surprises.',
    icon: serviceGraphic
  },
  {
    title: 'Repair & Retrofit',
    description: 'Fast response repair teams and upgrade plans for older equipment with new performance metrics.',
    icon: serviceGraphic
  },
  {
    title: 'Remote Support',
    description: 'Online diagnostics, process optimization and technical advisory for maintenance teams.',
    icon: serviceGraphic
  }
];

function ServicePage() {
  return (
    <section className="space-y-12 py-20">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-[#f47c20]">Service portfolio</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">End-to-end spares support for your machinery.</h1>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600">
              We combine part sourcing, expert repair, and preventive service to extend the life of your production assets.
            </p>
          </div>
          <img src={serviceGraphic} alt="Industrial service team and facility" className="rounded-lg border border-slate-200 bg-[#f8fafc] p-6 object-cover" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {serviceOptions.map((service) => (
          <ServiceCard key={service.title} title={service.title} description={service.description} icon={service.icon} />
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-8 shadow-sm">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Industrial service designed for uptime</h2>
        <p className="mt-4 text-slate-600 leading-relaxed">
          Our support teams align with production schedules, perform rapid turnarounds, and provide transparent reporting for every job.
          From part replacement to commissioning, each service package is tailored to minimize risk and maximize productivity.
        </p>
      </div>
    </section>
  );
}

export default ServicePage;
