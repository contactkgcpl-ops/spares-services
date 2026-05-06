function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-[#f47c20] text-white'
              : 'border border-slate-200 bg-white text-slate-600 hover:-translate-y-1 hover:border-[#f47c20]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
