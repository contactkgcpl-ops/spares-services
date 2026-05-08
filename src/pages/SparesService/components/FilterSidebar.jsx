function FilterSidebar({ categories, selectedCategory, onCategoryChange, resultCount }) {
  return (
    <aside className="rounded-xl border border-[#D3C2B6] bg-[#FBF7F1] p-6 shadow-sm lg:sticky lg:top-24 lg:self-start">
      <h2 className="text-base font-semibold text-[#14212A]">Filter catalog</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">Find the right component by category or search keyword.</p>
      <div className="mt-6 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Category</p>
          <div className="mt-4 grid gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`rounded-lg px-4 py-3 text-left text-sm transition-all duration-300 ${selectedCategory === category
                    ? 'border border-[#D87F2A] bg-[#D87F2A]/10 text-[#D87F2A]'
                    : 'border border-[#D3C2B6] bg-[#FBF7F1] text-slate-700 hover:-translate-y-1 hover:border-[#D87F2A]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-[#D3C2B6] bg-[#F4ECE4] p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Results</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#14212A]">{resultCount}</p>
          <p className="text-sm text-slate-600">items match your current filters</p>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
