function TechnicalSpecs({ specs }) {
  return (
    <div className="rounded-xl border border-[#D3C2B6] bg-[#FBF7F1] p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-[#14212A]">Technical details</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {specs.map((spec) => (
          <div key={spec.label} className="rounded-lg border border-[#D3C2B6] bg-[#F4ECE4] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{spec.label}</p>
            <p className="mt-2 text-sm font-medium text-slate-700">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnicalSpecs;
