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
    <section className="space-y-10">
      <div className="rounded-[2.5rem] border border-slate-800 bg-slate-950/90 p-8 shadow-soft">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-brand">Service portfolio</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">End-to-end spares support for your machinery.</h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300">
              We combine part sourcing, expert repair, and preventive service to extend the life of your production assets.
            </p>
          </div>
          <img src={serviceGraphic} alt="Service illustration" className="rounded-[2rem] border border-slate-800 bg-slate-950/80 p-6" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {serviceOptions.map((service) => (
          <ServiceCard key={service.title} title={service.title} description={service.description} icon={service.icon} />
        ))}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-soft">
        <h2 className="text-2xl font-semibold text-white">Industrial service designed for uptime</h2>
        <p className="mt-4 text-slate-300 leading-8">
          Our support teams align with production schedules, perform rapid turnarounds, and provide transparent reporting for every job.
          From part replacement to commissioning, each service package is tailored to minimize risk and maximize productivity.
        </p>
      </div>
    </section>
  );
}

export default ServicePage;
