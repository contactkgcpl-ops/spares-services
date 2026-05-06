function FilterSidebar({ categories, selectedCategory, onCategoryChange, resultCount }) {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24 lg:self-start">
      <h2 className="text-base font-semibold text-slate-900">Filter catalog</h2>
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
                className={`rounded-lg px-4 py-3 text-left text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? 'border border-[#f47c20] bg-[#f47c20]/10 text-[#f47c20]'
                    : 'border border-slate-200 bg-white text-slate-600 hover:-translate-y-1 hover:border-[#f47c20]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Results</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{resultCount}</p>
          <p className="text-sm text-slate-600">items match your current filters</p>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
