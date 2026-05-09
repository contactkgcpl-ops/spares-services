function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 border border-orange-500'
              : 'border border-gray-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50/50 hover:-translate-y-0.5 hover:shadow-md'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
