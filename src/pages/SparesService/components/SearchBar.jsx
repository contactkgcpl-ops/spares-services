function SearchBar({ query, onChange, placeholder = 'Search product name...' }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-3 shadow-soft">
      <label className="sr-only" htmlFor="search-query">
        Search products
      </label>
      <input
        id="search-query"
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}

export default SearchBar;
