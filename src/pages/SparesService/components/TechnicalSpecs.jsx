function TechnicalSpecs({ specs }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-white">Technical details</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {specs.map((spec) => (
          <div key={spec.label} className="rounded-3xl bg-slate-950/80 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{spec.label}</p>
            <p className="mt-2 text-sm font-semibold text-slate-100">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnicalSpecs;
