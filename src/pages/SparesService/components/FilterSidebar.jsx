function FilterSidebar({ categories, selectedCategory, onCategoryChange, resultCount }) {
  return (
    <aside className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft lg:sticky lg:top-24 lg:self-start">
      <h2 className="text-base font-semibold text-white">Filter catalog</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">Find the right component by category or search keyword.</p>
      <div className="mt-6 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Category</p>
          <div className="mt-4 grid gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`rounded-2xl px-4 py-3 text-left text-sm transition ${
                  selectedCategory === category
                    ? 'border border-brand bg-brand/10 text-brand'
                    : 'border border-slate-800 bg-slate-950 text-slate-300 hover:border-brand/40 hover:bg-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Results</p>
          <p className="mt-2 text-3xl font-semibold text-white">{resultCount}</p>
          <p className="text-sm text-slate-400">items match your current filters</p>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
