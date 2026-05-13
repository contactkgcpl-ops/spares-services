import { Search } from 'lucide-react';

function SearchBar({ query, onChange, placeholder = 'Search industrial parts...' }) {
  return (
    <div className="relative">
      <div className="relative rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300 focus-within:border-orange-400 focus-within:shadow-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <label className="sr-only" htmlFor="search-query">
          Search products
        </label>
        <input
          id="search-query"
          type="search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl bg-transparent pl-9 pr-4 py-2.5 text-[13px] text-slate-900 placeholder:text-gray-400 outline-none transition-all duration-300"
        />
        {query && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
