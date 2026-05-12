function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={`rounded-lg px-3 py-1.5 text-[13px] font-bold transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/20 border border-orange-500'
              : 'border border-gray-100 bg-white text-slate-600 hover:border-orange-300 hover:bg-orange-50/50 hover:-translate-y-0.5'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
