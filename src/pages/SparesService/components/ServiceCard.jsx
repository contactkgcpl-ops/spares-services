function ServiceCard({ title, description, icon }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#D3C2B6] bg-[#FBF7F1] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D87F2A]">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#D87F2A]/10 text-[#D87F2A]">
        <img src={icon} alt="Service icon" className="h-8 w-8 rounded object-cover" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#14212A]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
    </article>
  );
}

export default ServiceCard;
