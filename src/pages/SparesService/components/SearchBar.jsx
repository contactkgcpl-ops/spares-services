function SearchBar({ query, onChange, placeholder = 'Search product name...' }) {
  return (
    <div className="rounded-xl border border-[#D3C2B6] bg-[#FBF7F1] p-3 shadow-sm">
      <label className="sr-only" htmlFor="search-query">
        Search products
      </label>
      <input
        id="search-query"
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-transparent px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D87F2A]/20"
      />
    </div>
  );
}

export default SearchBar;
