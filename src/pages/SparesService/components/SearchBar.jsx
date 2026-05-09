import { Search } from 'lucide-react';

function SearchBar({ query, onChange, placeholder = 'Search industrial parts...' }) {
  return (
    <div className="relative">
      <div className="relative rounded-2xl bg-white border border-gray-200 shadow-[0_4px_20px_rgba(30,42,74,0.08)] transition-all duration-300 focus-within:border-orange-400 focus-within:shadow-[0_8px_30px_rgba(251,146,60,0.15)]">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
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
          className="w-full rounded-2xl bg-transparent pl-12 pr-4 py-4 text-base text-slate-900 placeholder:text-gray-400 outline-none transition-all duration-300"
        />
        {query && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Search className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
