function ServiceCard({ title, description, icon }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-brand/40 hover:bg-slate-900 shadow-soft">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <img src={icon} alt="Service icon" className="h-8 w-8" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </article>
  );
}

export default ServiceCard;
