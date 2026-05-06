function ServiceCard({ title, description, icon }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f47c20]">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#f47c20]/10 text-[#f47c20]">
        <img src={icon} alt="Service icon" className="h-8 w-8 rounded object-cover" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
    </article>
  );
}

export default ServiceCard;
